import { CstNode, ILexingResult, IRecognitionException, IToken } from 'chevrotain'
import {
  CodeFragment,
  ErrorMessage,
  ContextInterface,
  FunctionClause,
  VariableData,
  VariableDependency,
  VariableKind,
  VariableMetadata,
  VariableValue,
  VariableInterface,
  Completion,
  AnyTypeResult,
  ParseErrorType,
  CodeFragmentResult,
  NamespaceId,
  FunctionContext,
  BlockKey,
  StringResult,
  BaseFormula,
  ErrorResult,
  VariableNameDependency
} from '../types'
import { VariableClass, castVariable } from '../context/variable'
import { FormulaLexer } from './lexer'
import { FORMULA_PARSER_VERSION } from '../version'
import { FormulaParser } from './parser'
import { complete } from './completer'
import { FormulaInterpreter } from './interpreter'
import { addSpace, CodeFragmentVisitor, hideDot } from './codeFragment'
import { blockKey } from './convert'
import { parseString } from './util'
import { devWarning } from '@brickdoc/design-system'
export interface BaseParseResult {
  success: boolean
  valid: boolean
  input: string
  version: number
  position: number
  inputImage: string
  parseImage: string
  cst?: CstNode
  errorType?: ParseErrorType
  kind: VariableKind
  errorMessages: ErrorMessage[]
  variableDependencies: VariableDependency[]
  variableNameDependencies: VariableNameDependency[]
  functionDependencies: Array<FunctionClause<any>>
  blockDependencies: NamespaceId[]
  codeFragments: CodeFragment[]
  flattenVariableDependencies: VariableDependency[]
  completions: Completion[]
}

export interface SuccessParseResult extends BaseParseResult {
  success: true
  valid: true
  errorMessages: []
  kind: Exclude<VariableKind, 'literal'>
  cst: CstNode
}

export interface LiteralParseResult extends BaseParseResult {
  success: true
  valid: true
  errorMessages: []
  kind: 'literal'
  cst: undefined
}

export interface ErrorParseResult extends BaseParseResult {
  success: false
  kind: 'unknown'
  errorType: ParseErrorType
  errorMessages: [ErrorMessage, ...ErrorMessage[]]
}

export type ParseResult = SuccessParseResult | ErrorParseResult | LiteralParseResult
export interface InterpretResult {
  readonly variableValue: VariableValue
  readonly lazy: boolean
}

const abbrev = ({
  ctx: { formulaContext },
  namespaceId,
  input,
  position
}: {
  namespaceId: NamespaceId
  ctx: FunctionContext
  input: string
  position: number
}): { lexResult: ILexingResult; newInput: string; newPosition: number } => {
  const lexer = FormulaLexer
  const lexResult: ILexingResult = lexer.tokenize(input)
  const tokens = lexResult.tokens
  let modified = false
  let restInput = input
  let newInput = ''
  let newPosition = position
  const newTokens: IToken[] = []

  tokens.forEach((token, index) => {
    newTokens.push(token)

    if (restInput.startsWith(' ')) {
      const prefixSpaceCount = restInput.length - restInput.trimStart().length
      const spaceValue = ' '.repeat(prefixSpaceCount)
      newInput = newInput.concat(spaceValue)
      restInput = restInput.substring(prefixSpaceCount)
    }

    if (restInput.startsWith(token.image)) {
      restInput = restInput.substring(token.image.length)
    }

    if (!['FunctionName', 'StringLiteral'].includes(token.tokenType.name)) {
      newInput = newInput.concat(token.image)
      return
    }

    const nextToken = tokens[index + 1]

    // Foo(
    // foo:
    if (nextToken && ['LParen', 'Colon'].includes(nextToken.tokenType.name)) {
      newInput = newInput.concat(token.image)
      return
    }

    const newIndex = newTokens.length - 1
    const prevToken = newTokens[newIndex - 1]

    let variableNamespace = blockKey(namespaceId)
    let namespaceIsExist = false

    // foo.bar
    if (prevToken && ['Dot'].includes(prevToken.tokenType.name)) {
      const prev2Token = newTokens[newIndex - 2]

      if (prev2Token && prev2Token.tokenType.name !== 'UUID') {
        newInput = newInput.concat(token.image)
        return
      }

      variableNamespace = prev2Token.image.startsWith('#') ? (prev2Token.image as BlockKey) : blockKey(prev2Token.image)
      namespaceIsExist = true
    }

    const match = token.tokenType.name === 'StringLiteral' ? parseString(token.image) : token.image

    const formulaName = formulaContext.formulaNames.find(
      n => n.name === match && (n.kind !== 'Variable' || blockKey(n.namespaceId) === variableNamespace)
    )

    // devLog({ formulaNames: formulaContext.formulaNames, variableNamespace, token: token.image, formulaName })

    if (!formulaName) {
      newInput = newInput.concat(token.image)
      return
    }

    const renderTokens = formulaName.renderTokens(namespaceIsExist)

    newTokens.pop()
    newTokens.push(
      ...renderTokens.map(({ image, type }) => ({ ...token, image, tokenType: { ...token.tokenType, name: type } }))
    )

    const value = renderTokens.map(t => t.image).join('')
    newInput = newInput.concat(value)
    newPosition += value.length - token.image.length
    modified = true
  })

  // NOTE tail space
  if (restInput.startsWith(' ')) {
    const prefixSpaceCount = restInput.length - restInput.trimStart().length
    const spaceValue = ' '.repeat(prefixSpaceCount)
    newInput = newInput.concat(spaceValue)
    restInput = restInput.substring(prefixSpaceCount)
  }

  if (restInput !== '') {
    console.error('abbrev error', { restInput, input, tokens, newInput })
  }
  // console.log('abbrev', { newInput, input, tokens, position, newPosition })

  if (modified) {
    return { lexResult: lexer.tokenize(newInput), newInput, newPosition }
  } else {
    return { lexResult, newInput: input, newPosition }
  }
}

export const parse = ({ ctx, position: pos }: { ctx: FunctionContext; position?: number }): ParseResult => {
  const {
    formulaContext,
    meta: { namespaceId, variableId, input, name, type }
  } = ctx
  const position = pos ?? 0
  const version = FORMULA_PARSER_VERSION

  const returnValue: BaseParseResult = {
    success: false,
    inputImage: '',
    parseImage: '',
    valid: true,
    cst: undefined,
    input,
    position,
    version,
    kind: 'unknown',
    errorType: 'parse',
    errorMessages: [{ type: 'parse', message: '' }],
    completions: [],
    codeFragments: [],
    variableDependencies: [],
    variableNameDependencies: [],
    functionDependencies: [],
    blockDependencies: [],
    flattenVariableDependencies: []
  }

  if (!input.startsWith('=') || (type !== 'normal' && input.trim() === '=')) {
    return {
      ...returnValue,
      valid: true,
      kind: 'literal',
      cst: undefined,
      errorType: undefined,
      success: true,
      errorMessages: [],
      codeFragments: [
        {
          code: 'other',
          value: input,
          type: 'any',
          renderText: undefined,
          hide: false,
          display: input,
          errors: [],
          attrs: undefined
        }
      ]
    }
  }

  if (!variableId) {
    return {
      ...returnValue,
      valid: false,
      success: false,
      kind: 'unknown',
      errorType: 'parse',
      errorMessages: [{ message: 'Miss variableId', type: 'fatal' }]
    }
  }
  const baseCompletion = formulaContext.completions(namespaceId, variableId)
  let completions: Completion[] = baseCompletion

  const parser = new FormulaParser()
  const codeFragmentVisitor = new CodeFragmentVisitor({ ctx })

  const {
    lexResult: { tokens, errors: lexErrors },
    newPosition,
    newInput
  } = abbrev({ ctx, input, namespaceId, position })

  parser.input = tokens
  const inputImage = tokens.map(t => t.image).join('')

  const cst: CstNode = parser.startExpression()
  const { codeFragments, image }: CodeFragmentResult = codeFragmentVisitor.visit(cst, { type: 'any' })

  const errorCodeFragment = codeFragments.find(f => f.errors.length)
  const finalErrorMessages: ErrorMessage[] = errorCodeFragment ? errorCodeFragment.errors : []

  completions = complete({
    position: newPosition,
    cacheCompletions: baseCompletion,
    codeFragments,
    tokens,
    ctx
  })

  returnValue.kind = codeFragmentVisitor.kind
  returnValue.variableDependencies = codeFragmentVisitor.variableDependencies
  returnValue.variableNameDependencies = codeFragmentVisitor.variableNameDependencies
  returnValue.functionDependencies = codeFragmentVisitor.functionDependencies
  returnValue.blockDependencies = codeFragmentVisitor.blockDependencies
  returnValue.flattenVariableDependencies = codeFragmentVisitor.flattenVariableDependencies
  returnValue.inputImage = inputImage

  returnValue.cst = cst
  returnValue.input = newInput
  returnValue.parseImage = image
  returnValue.completions = completions

  const parseErrors: IRecognitionException[] = parser.errors

  if (lexErrors.length > 0 || parseErrors.length > 0) {
    const errorMessages = (lexErrors.length ? lexErrors : parseErrors).map(e => ({
      message: e.message,
      type: 'parse'
    })) as [ErrorMessage, ...ErrorMessage[]]

    finalErrorMessages.push(...errorMessages)

    if (inputImage.startsWith(image)) {
      const restImages = inputImage.slice(image.length)
      if (restImages.length > 0) {
        codeFragments.push({
          code: 'other',
          value: restImages,
          type: 'any',
          renderText: undefined,
          hide: false,
          display: restImages,
          errors: errorMessages,
          attrs: undefined
        })
      }
    } else {
      devWarning(true, 'Parse Error', {
        input,
        tokens,
        codeFragments,
        newInput,
        inputImagesWithoutSpace: inputImage,
        codeFragmentImage: image
      })
    }
  }

  const { finalCodeFragments, newPositionAfterHide } = hideDot(addSpace(codeFragments, newInput), newPosition)
  returnValue.codeFragments = finalCodeFragments
  returnValue.position = newPositionAfterHide

  if (finalErrorMessages.length) {
    return {
      ...returnValue,
      success: false,
      kind: 'unknown',
      valid: finalErrorMessages[0].type !== 'parse' && codeFragments.length > 0,
      errorType: 'syntax',
      errorMessages: finalErrorMessages as [ErrorMessage, ...ErrorMessage[]]
    }
  }

  if (
    codeFragmentVisitor.flattenVariableDependencies.find(
      v => v.namespaceId === namespaceId && v.variableId === variableId
    )
  ) {
    return {
      ...returnValue,
      success: false,
      kind: 'unknown',
      errorType: 'syntax',
      errorMessages: [{ message: 'Circular dependency found', type: 'circular_dependency' }]
    }
  }

  if (formulaContext.reservedNames.includes(name.toUpperCase())) {
    return {
      ...returnValue,
      success: false,
      kind: 'unknown',
      errorType: 'syntax',
      errorMessages: [{ message: 'Variable name is reserved', type: 'name_check' }]
    }
  }

  const sameNameVariable = formulaContext.formulaNames.find(
    v => v.name.toUpperCase() === name.toUpperCase() && v.namespaceId === namespaceId && v.key !== variableId
  )

  if (sameNameVariable) {
    return {
      ...returnValue,
      success: false,
      kind: 'unknown',
      errorType: 'syntax',
      errorMessages: [{ message: 'Name exist in same namespace', type: 'name_unique' }]
    }
  }

  return {
    ...returnValue,
    cst: cst!,
    kind: codeFragmentVisitor.kind,
    errorType: undefined,
    valid: true,
    success: true,
    errorMessages: []
  }
}

export const interpret = async ({
  parseResult: { cst, kind, errorMessages },
  ctx
}: {
  parseResult: { cst: CstNode | undefined; kind: VariableKind; errorMessages: ErrorMessage[] }
  ctx: FunctionContext
}): Promise<InterpretResult> => {
  if (errorMessages.length > 0) {
    const result: ErrorResult = { result: errorMessages[0].message, type: 'Error', errorKind: errorMessages[0].type }
    return {
      lazy: false,
      variableValue: {
        success: true,
        updatedAt: new Date(),
        cacheValue: result,
        result
      }
    }
  }
  if (!cst || kind === 'literal') {
    const result: StringResult = { type: 'string', result: ctx.meta.input }
    return {
      lazy: false,
      variableValue: {
        success: true,
        updatedAt: new Date(),
        cacheValue: result,
        result
      }
    }
  }

  try {
    const interpreter = new FormulaInterpreter({ ctx })
    const result: AnyTypeResult = await interpreter.visit(cst, { type: 'any' })
    const lazy = interpreter.lazy

    return {
      lazy,
      variableValue: {
        success: true,
        updatedAt: new Date(),
        cacheValue: result,
        result
      }
    }
  } catch (e) {
    console.error(e)
    const message = `[FATAL] ${(e as any).message as string}`
    return {
      lazy: false,
      variableValue: {
        updatedAt: new Date(),
        success: false,
        cacheValue: { result: message, type: 'Error', errorKind: 'fatal' },
        result: { result: message, type: 'Error', errorKind: 'fatal' }
      }
    }
  }
}

export const buildVariable = ({
  formulaContext,
  meta: { name, input, namespaceId, variableId, type },
  parseResult: {
    valid,
    cst,
    kind,
    codeFragments,
    version,
    variableDependencies,
    variableNameDependencies,
    functionDependencies,
    blockDependencies,
    flattenVariableDependencies
  },
  interpretResult: { variableValue, lazy }
}: {
  formulaContext: ContextInterface
  meta: VariableMetadata
  parseResult: ParseResult
  interpretResult: InterpretResult
}): VariableInterface => {
  const t: VariableData = {
    namespaceId,
    variableId,
    name,
    cst,
    type,
    version: lazy ? -1 : version,
    codeFragments,
    definition: input,
    dirty: true,
    variableValue,
    valid,
    kind: kind ?? 'constant',
    variableDependencies,
    variableNameDependencies,
    flattenVariableDependencies,
    blockDependencies,
    functionDependencies
  }

  const oldVariable = formulaContext.findVariable(namespaceId, variableId)
  if (oldVariable) {
    oldVariable.t = t
    return oldVariable.clone()
  } else {
    return new VariableClass({ t, formulaContext })
  }
}

export const appendFormulas = (formulaContext: ContextInterface, formulas: BaseFormula[]): void => {
  const dupFormulas = [...formulas]
  dupFormulas.forEach(formula => {
    const variable = castVariable(formulaContext, formula)
    void new VariableClass({ t: { ...variable, dirty: false }, formulaContext }).save()
  })
}
