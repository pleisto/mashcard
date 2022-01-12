import { CstNode, ILexingResult, IRecognitionException } from 'chevrotain'
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
  Formula,
  BlockKey
} from '../types'
import { VariableClass, castVariable } from '../context/variable'
import { FormulaLexer } from './lexer'
import { FORMULA_PARSER_VERSION } from '../version'
import { FormulaParser } from './parser'
import { complete } from './completer'
import { FormulaInterpreter } from './interpreter'
import { CodeFragmentVisitor } from './codeFragment'
import { blockKey, variableKey } from '..'
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
  level: number
  errorMessages: ErrorMessage[]
  variableDependencies: VariableDependency[]
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
  cst: CstNode
}

export interface ErrorParseResult extends BaseParseResult {
  success: false
  errorType: ParseErrorType
  errorMessages: [ErrorMessage, ...ErrorMessage[]]
}

export type ParseResult = SuccessParseResult | ErrorParseResult
export interface InterpretResult {
  readonly variableValue: VariableValue
  readonly lazy: boolean
}

export const abbrev = ({
  ctx: { formulaContext },
  position,
  namespaceId,
  input
}: {
  namespaceId: NamespaceId
  ctx: FunctionContext
  position: number
  input: string
}): { lexResult: ILexingResult; newInput: string; newPosition: number } => {
  const lexer = FormulaLexer
  const lexResult: ILexingResult = lexer.tokenize(input)
  const tokens = lexResult.tokens
  let image = ''
  let modified = false
  let newInput = ''
  let newPosition: number = position

  tokens.forEach((token, index) => {
    image = image.concat(token.image)
    if (token.tokenType.name !== 'FunctionName') {
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

    const prevToken = tokens[index - 1]

    let variableNamespace = blockKey(namespaceId)
    let namespaceIsExist = false

    // foo.bar
    if (prevToken && ['Dot'].includes(prevToken.tokenType.name)) {
      const prev2Token = tokens[index - 2]

      if (prev2Token && prev2Token.tokenType.name !== 'UUID') {
        newInput = newInput.concat(token.image)
        return
      }

      namespaceIsExist = true
      variableNamespace = prev2Token.image as BlockKey
    }

    const formulaName = formulaContext.formulaNames.find(
      n => n.name === token.image && (n.kind !== 'Variable' || blockKey(n.namespaceId) === variableNamespace)
    )

    console.log({ formulaNames: formulaContext.formulaNames, variableNamespace, token: token.image, formulaName })

    if (!formulaName) {
      newInput = newInput.concat(token.image)
      return
    }

    newPosition += formulaName.prefixLength(namespaceIsExist)
    const render = formulaName.render(namespaceIsExist)
    newInput = newInput.concat(render)
    tokens[index] = { ...token, image: render, tokenType: { ...token.tokenType, name: 'UUID' } }
    modified = true
  })

  // console.log({ newInput, input })

  if (modified) {
    return { lexResult: lexer.tokenize(newInput), newInput, newPosition }
  } else {
    return { lexResult, newInput: input, newPosition }
  }
}

export const parse = ({ ctx, position: pos }: { ctx: FunctionContext; position?: number }): ParseResult => {
  const {
    formulaContext,
    meta: { namespaceId, variableId, input, name }
  } = ctx
  const position = pos ?? 0
  const level = 0
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
    level,
    kind: 'constant',
    errorType: 'parse',
    errorMessages: [{ type: 'parse', message: '' }],
    completions: [],
    codeFragments: [],
    variableDependencies: [],
    functionDependencies: [],
    blockDependencies: [],
    flattenVariableDependencies: []
  }

  if (!variableId) {
    return {
      ...returnValue,
      valid: false,
      success: false,
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
    newInput,
    newPosition
  } = abbrev({ ctx, input, position, namespaceId })

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

  returnValue.level = codeFragmentVisitor.level
  returnValue.kind = codeFragmentVisitor.kind
  returnValue.variableDependencies = codeFragmentVisitor.variableDependencies
  returnValue.functionDependencies = codeFragmentVisitor.functionDependencies
  returnValue.blockDependencies = codeFragmentVisitor.blockDependencies
  returnValue.flattenVariableDependencies = codeFragmentVisitor.flattenVariableDependencies
  returnValue.inputImage = inputImage

  returnValue.cst = cst
  returnValue.input = newInput
  returnValue.position = newPosition
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
          name: restImages,
          spaceAfter: false,
          hidden: false,
          spaceBefore: false,
          type: 'any',
          display: () => restImages,
          errors: errorMessages
        })
      }
    } else {
      console.error('ParseErrorTODO', {
        input,
        codeFragments,
        newInput,
        inputImagesWithoutSpace: inputImage,
        codeFragmentImage: image
      })
    }
  }

  const finalCodeFragments: CodeFragment[] = []

  const spaceCodeFragment: CodeFragment = {
    code: 'Space',
    name: ' ',
    hidden: false,
    spaceAfter: false,
    spaceBefore: false,
    type: 'any',
    display: () => ' ',
    errors: []
  }

  // TODO support space
  // let lastSpace = false
  codeFragments.forEach(codeFragment => {
    // if (codeFragment.spaceBefore && !lastSpace) {
    //   finalCodeFragments.push(spaceCodeFragment)
    // }

    finalCodeFragments.push(codeFragment)

    // if (codeFragment.spaceAfter) {
    //   finalCodeFragments.push(spaceCodeFragment)
    //   position += 1
    //   lastSpace = true
    // } else {
    //   lastSpace = false
    // }
  })

  const spaceCount = input.length - input.trimEnd().length
  if (spaceCount) {
    finalCodeFragments.push({ ...spaceCodeFragment, name: ' '.repeat(spaceCount) })
  }

  returnValue.codeFragments = finalCodeFragments

  if (finalErrorMessages.length) {
    return {
      ...returnValue,
      success: false,
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
      errorType: 'syntax',
      errorMessages: [{ message: 'Circular dependency found', type: 'circular_dependency' }]
    }
  }

  if (formulaContext.reservedNames.includes(name.toUpperCase())) {
    return {
      ...returnValue,
      success: false,
      errorType: 'syntax',
      errorMessages: [{ message: 'Variable name is reserved', type: 'name_check' }]
    }
  }

  const sameNameVariable = formulaContext.formulaNames.find(
    v =>
      v.name.toUpperCase() === name.toUpperCase() &&
      v.key !== variableId &&
      v.value !== variableKey(namespaceId, variableId)
  )

  if (sameNameVariable) {
    return {
      ...returnValue,
      success: false,
      errorType: 'syntax',
      errorMessages: [{ message: 'Name exist in same namespace', type: 'name_unique' }]
    }
  }

  return {
    ...returnValue,
    cst: cst!,
    errorType: undefined,
    valid: true,
    success: true,
    errorMessages: []
  }
}

export const interpret = async ({ cst, ctx }: { cst: CstNode; ctx: FunctionContext }): Promise<InterpretResult> => {
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
  meta: { name, input, namespaceId, variableId },
  parseResult: {
    valid,
    cst,
    kind,
    codeFragments,
    version,
    variableDependencies,
    functionDependencies,
    blockDependencies,
    level,
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
    version: lazy ? -1 : version,
    codeFragments,
    definition: input,
    dirty: false,
    variableValue,
    valid,
    level,
    kind: kind ?? 'constant',
    variableDependencies,
    flattenVariableDependencies,
    blockDependencies,
    functionDependencies
  }

  const oldVariable = formulaContext.findVariable(namespaceId, variableId)
  if (oldVariable) {
    oldVariable.t = t
    return oldVariable
  } else {
    return new VariableClass({ t, formulaContext })
  }
}

export const appendFormulas = (formulaContext: ContextInterface, formulas: Formula[]): void => {
  const dupFormulas = [...formulas]
  dupFormulas
    .sort((a, b) => a.level - b.level)
    .forEach(formula => {
      const variable = castVariable(formulaContext, formula)

      void formulaContext.commitVariable({
        variable: new VariableClass({ t: variable, formulaContext }),
        skipCreate: true
      })
    })
}
