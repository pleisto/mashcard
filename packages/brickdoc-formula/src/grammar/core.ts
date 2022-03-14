import { CstNode, ILexingResult, IRecognitionException, IToken } from 'chevrotain'
import {
  CodeFragment,
  ErrorMessage,
  ContextInterface,
  FunctionClause,
  VariableData,
  VariableDependency,
  VariableKind,
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
  VariableNameDependency,
  AsyncVariableData,
  SyncVariableData,
  FormulaType
} from '../types'
import { VariableClass, castVariable } from '../context/variable'
import { FormulaLexer } from './lexer'
import { FORMULA_PARSER_VERSION } from '../version'
import { FormulaParser } from './parser'
import { complete } from './completer'
import { FormulaInterpreter } from './interpreter'
import { addSpace, CodeFragmentVisitor, hideDot } from './codeFragment'
import { blockKey } from './convert'
import { checkValidName, parseString, shouldReturnEarly } from './util'
import { devWarning } from '@brickdoc/design-system'
export interface BaseParseResult {
  success: boolean
  valid: boolean
  async: boolean
  input: string
  version: number
  position: number
  inputImage: string
  parseImage: string
  expressionType: FormulaType
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
  cst: CstNode | undefined
  errorType: ParseErrorType
  errorMessages: [ErrorMessage, ...ErrorMessage[]]
}

export type ParseResult = SuccessParseResult | ErrorParseResult | LiteralParseResult

export interface PositionFragment {
  readonly tokenIndex: number
  readonly offset: number
}

const abbrev = ({
  ctx: { formulaContext },
  namespaceId,
  position,
  input
}: {
  namespaceId: NamespaceId
  ctx: FunctionContext
  input: string
  position: number
}): { lexResult: ILexingResult; newInput: string; positionFragment: PositionFragment } => {
  const oldLexResult: ILexingResult = FormulaLexer.tokenize(input)
  const tokens = oldLexResult.tokens
  let modified = false
  let restInput = input
  let newInput = ''
  const newTokens: IToken[] = []
  let inputImage = ''
  let positionMatched = false
  let tokenIndex = 0
  let offset = 0
  let renderTokenNumberChange = 0

  // eslint-disable-next-line complexity
  tokens.forEach((token, index) => {
    newTokens.push(token)

    const prefixSpaceCount = restInput.length - restInput.trimStart().length
    if (prefixSpaceCount > 0) {
      const spaceValue = ' '.repeat(prefixSpaceCount)
      newInput = newInput.concat(spaceValue)
      restInput = restInput.substring(prefixSpaceCount)
      inputImage = inputImage.concat(spaceValue)
      if (!positionMatched && inputImage.length < position) {
        renderTokenNumberChange += 1
      }
      if (!positionMatched && inputImage.length >= position) {
        positionMatched = true
        tokenIndex = index
        offset = position - inputImage.length
        // console.log('match space', { offset, tokenIndex, position, inputImage, renderTokenNumberChange, tokens })
      }
    }

    if (restInput.startsWith(token.image)) {
      restInput = restInput.substring(token.image.length)
      inputImage = inputImage.concat(token.image)
      if (!positionMatched && inputImage.length >= position) {
        positionMatched = true
        tokenIndex = index
        offset = position - inputImage.length
      }
    }

    const tokenTypeName = token.tokenType.name

    if (tokenTypeName === 'UUID') {
      if (token.image === namespaceId) {
        newInput = newInput.concat('CurrentBlock')
        newTokens.pop()
        newTokens.push({ ...token, image: 'CurrentBlock', tokenType: { ...token.tokenType, name: 'CurrentBlock' } })
        modified = true
        return
      } else {
        newInput = newInput.concat(token.image)
        return
      }
    }

    if (!['FunctionName', 'StringLiteral'].includes(tokenTypeName)) {
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

      if (prev2Token && !['UUID', 'CurrentBlock'].includes(prev2Token.tokenType.name)) {
        newInput = newInput.concat(token.image)
        return
      }

      variableNamespace = prev2Token.image.startsWith('#') ? (prev2Token.image as BlockKey) : blockKey(prev2Token.image)
      namespaceIsExist = true
    }

    if (variableNamespace === '#CurrentBlock') {
      variableNamespace = blockKey(namespaceId)
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

    const renderTokens = formulaName.renderTokens(namespaceIsExist, namespaceId)

    newTokens.pop()
    const newRenderTokens = renderTokens.map(({ image, type }) => ({
      ...token,
      image,
      tokenType: { ...token.tokenType, name: type }
    }))
    newTokens.push(...newRenderTokens)
    renderTokenNumberChange += newRenderTokens.length - 1

    const value = renderTokens.map(t => t.image).join('')
    newInput = newInput.concat(value)
    // newPosition += value.length - token.image.length
    modified = true
  })

  // NOTE tail space
  const prefixSpaceCount = restInput.length - restInput.trimStart().length
  if (prefixSpaceCount > 0) {
    const spaceValue = ' '.repeat(prefixSpaceCount)
    newInput = newInput.concat(spaceValue)
    restInput = restInput.substring(prefixSpaceCount)
    inputImage = inputImage.concat(spaceValue)
    if (!positionMatched && inputImage.length >= position) {
      positionMatched = true
      tokenIndex = tokens.length
      offset = position - inputImage.length
    }
  }

  if (restInput !== '') {
    console.error('abbrev error', { restInput, input, tokens, newInput })
  }

  const positionFragment = { tokenIndex: tokenIndex + renderTokenNumberChange, offset }
  // console.log('abbrev', { newInput, input, tokens, position, newTokens, positionFragment })

  if (modified) {
    return { lexResult: FormulaLexer.tokenize(newInput), newInput, positionFragment }
  } else {
    return { lexResult: oldLexResult, newInput: input, positionFragment }
  }
}

const changePosition = (
  codeFragments: CodeFragment[],
  position: number,
  input: string,
  { offset, tokenIndex }: PositionFragment
): number => {
  let newPosition: number = 0
  let specialCodeFragmentCount = 0

  codeFragments.forEach((codeFragment, idx) => {
    if (codeFragment.code === 'Block') {
      specialCodeFragmentCount += 1
    }

    if (codeFragment.value === '') {
      specialCodeFragmentCount -= 1
    }
    if (idx <= tokenIndex - specialCodeFragmentCount) {
      newPosition += Number(codeFragment.display.length)
    }
  })

  newPosition += offset

  // console.log('change position', { codeFragments, input, position, offset, tokenIndex, newPosition })
  return newPosition
}

// eslint-disable-next-line complexity
export const parse = ({ ctx }: { ctx: FunctionContext; position?: number }): ParseResult => {
  const {
    formulaContext,
    meta: { namespaceId, variableId, input, name, type, position }
  } = ctx
  const version = FORMULA_PARSER_VERSION

  const returnValue: BaseParseResult = {
    success: false,
    inputImage: '',
    parseImage: '',
    expressionType: 'any',
    valid: true,
    async: false,
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

  const baseCompletion = formulaContext.completions(namespaceId, variableId)
  let completions: Completion[] = baseCompletion

  const parser = new FormulaParser()
  const codeFragmentVisitor = new CodeFragmentVisitor({ ctx })
  const positionWithEqual = type === 'normal' ? position + 1 : position

  const {
    lexResult: { tokens, errors: lexErrors },
    newInput,
    positionFragment
  } = abbrev({ ctx, input, namespaceId, position: positionWithEqual })

  parser.input = tokens
  const inputImage = tokens.map(t => t.image).join('')

  const cst: CstNode = parser.startExpression()
  const {
    codeFragments,
    image,
    type: expressionType
  }: CodeFragmentResult = codeFragmentVisitor.visit(cst, { type: 'any' })

  const errorCodeFragment = codeFragments.find(f => f.errors.length)
  const finalErrorMessages: ErrorMessage[] = errorCodeFragment ? errorCodeFragment.errors : []

  returnValue.expressionType = expressionType
  returnValue.async = codeFragmentVisitor.async
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

  const { finalCodeFragments: addSpaceCodeFragment, finalPositionFragment: addSpacePositionFragment } = addSpace(
    codeFragments,
    newInput,
    positionFragment
  )

  const { finalCodeFragments, finalPositionFragment } = hideDot(addSpaceCodeFragment, addSpacePositionFragment)
  const newPosition = changePosition(finalCodeFragments, position, input, finalPositionFragment)
  const newPositionWithoutEqual = type === 'normal' ? newPosition - 1 : newPosition

  completions = complete({
    position: newPositionWithoutEqual,
    cacheCompletions: baseCompletion,
    codeFragments: finalCodeFragments,
    tokens,
    ctx
  })

  returnValue.codeFragments = finalCodeFragments
  returnValue.position = newPositionWithoutEqual
  returnValue.completions = completions

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

  if (type === 'normal' && !checkValidName(name)) {
    return {
      ...returnValue,
      success: false,
      kind: 'unknown',
      errorType: 'syntax',
      errorMessages: [{ message: 'Variable name is not valid', type: 'name_invalid' }]
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

  if (type === 'normal' && sameNameVariable) {
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

const innerInterpretFirst = ({
  parseResult: { cst, kind, errorMessages, async },
  ctx
}: {
  parseResult: {
    cst: CstNode | undefined
    kind: VariableKind
    errorMessages: ErrorMessage[]
    async: boolean
  }
  ctx: FunctionContext
}): VariableValue | undefined => {
  if (errorMessages.length > 0) {
    const result: ErrorResult = { result: errorMessages[0].message, type: 'Error', errorKind: errorMessages[0].type }
    return { success: false, result }
  }

  // if (async) {
  //   const result: PendingResult = { type: 'Pending', result: `Pending: ${ctx.meta.input}` }
  //   return {
  //     success: true,
  //     result
  //   }
  // }
  if (!cst || kind === 'literal') {
    const result: StringResult = { type: 'string', result: ctx.meta.input }
    return { success: true, result }
  }
  return undefined
}

export const innerInterpret = async ({
  parseResult: { cst, kind, errorMessages, async },
  ctx
}: {
  parseResult: {
    cst: CstNode | undefined
    kind: VariableKind
    errorMessages: ErrorMessage[]
    async: boolean
  }
  ctx: FunctionContext
}): Promise<VariableValue> => {
  const result = innerInterpretFirst({ parseResult: { cst, kind, errorMessages, async }, ctx })
  if (result) return result
  try {
    const interpreter = new FormulaInterpreter({ ctx })
    const result: AnyTypeResult = await interpreter.visit(cst!, { type: 'any' })
    // const lazy = interpreter.lazy

    return { success: true, result }
  } catch (e) {
    console.error(e)
    const message = `[FATAL] ${(e as any).message as string}`
    return { success: false, result: { result: message, type: 'Error', errorKind: 'fatal' } }
  }
}

export const interpretSync = async ({
  variable,
  ctx,
  parseResult
}: {
  variable?: VariableInterface
  ctx: FunctionContext
  parseResult: ParseResult
}): Promise<VariableInterface> => {
  const {
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
  } = parseResult
  const {
    formulaContext,
    meta: { name, input, namespaceId, variableId, type }
  } = ctx
  const execStartTime = new Date()
  const interpretResult = await innerInterpret({ parseResult, ctx })
  const execEndTime = new Date()

  const t: VariableData = {
    namespaceId,
    variableId,
    execStartTime,
    execEndTime,
    name,
    cst,
    type,
    version,
    codeFragments,
    definition: input,
    async: false,
    isAsync: false,
    variableValue: interpretResult,
    valid,
    kind: kind ?? 'constant',
    variableDependencies,
    variableNameDependencies,
    flattenVariableDependencies,
    blockDependencies,
    functionDependencies
  }
  return generateVariable(formulaContext, t, variable)
}

export const interpretAsync = ({
  variable,
  ctx,
  skipAsync,
  cachedVariableValue,
  parseResult
}: {
  variable?: VariableInterface
  cachedVariableValue?: VariableValue
  skipAsync: boolean
  ctx: FunctionContext
  parseResult: ParseResult
}): VariableInterface => {
  const {
    valid,
    cst,
    kind,
    codeFragments,
    version,
    async,
    variableDependencies,
    variableNameDependencies,
    functionDependencies,
    blockDependencies,
    flattenVariableDependencies
  } = parseResult
  const {
    formulaContext,
    meta: { name, input, namespaceId, variableId, type }
  } = ctx
  const t: Omit<VariableData, 'variableValue' | 'async' | 'execStartTime' | 'execEndTime'> = {
    namespaceId,
    variableId,
    name,
    cst,
    type,
    version,
    isAsync: async,
    codeFragments,
    definition: input,
    valid,
    kind: kind ?? 'constant',
    variableDependencies,
    variableNameDependencies,
    flattenVariableDependencies,
    blockDependencies,
    functionDependencies
  }

  const result = innerInterpretFirst({ parseResult, ctx })
  if (result) {
    const restAttrs: Pick<SyncVariableData, 'async' | 'execStartTime' | 'execEndTime' | 'variableValue'> = {
      async: false,
      execStartTime: new Date(),
      execEndTime: new Date(),
      variableValue: result
    }

    return generateVariable(formulaContext, { ...t, ...restAttrs }, variable)
  }

  if (!async) {
    if (cachedVariableValue) {
      const restAttrs: Pick<SyncVariableData, 'async' | 'execStartTime' | 'execEndTime' | 'variableValue'> = {
        async: false,
        execStartTime: new Date(),
        execEndTime: new Date(),
        variableValue: cachedVariableValue
      }

      return generateVariable(formulaContext, { ...t, ...restAttrs }, variable)
    }
  }

  if (skipAsync && variable) {
    if (variable.t.async) {
      const restAttrs: Pick<AsyncVariableData, 'async' | 'execStartTime' | 'execEndTime' | 'variableValue'> = {
        async: variable.t.async,
        execStartTime: variable.t.execStartTime,
        execEndTime: variable.t.execEndTime,
        variableValue: variable.t.variableValue
      }
      return generateVariable(formulaContext, { ...t, ...restAttrs }, variable)
    }

    if (!shouldReturnEarly(variable.t.variableValue.result)) {
      const restAttrs: Pick<SyncVariableData, 'async' | 'execStartTime' | 'execEndTime' | 'variableValue'> = {
        async: variable.t.async,
        execStartTime: variable.t.execStartTime,
        execEndTime: variable.t.execEndTime,
        variableValue: variable.t.variableValue
      }
      return generateVariable(formulaContext, { ...t, ...restAttrs }, variable)
    }
  }

  const execStartTime = new Date()
  const interpretResult = innerInterpret({ parseResult, ctx })
  const restAttrs: Pick<AsyncVariableData, 'async' | 'execStartTime' | 'execEndTime' | 'variableValue'> = {
    async: true,
    execStartTime,
    execEndTime: undefined,
    variableValue: interpretResult
  }

  return generateVariable(formulaContext, { ...t, ...restAttrs }, variable)
}

const generateVariable = (
  formulaContext: ContextInterface,
  t: VariableData,
  variable: VariableInterface | undefined
): VariableInterface => {
  let newVariable: VariableInterface
  if (variable) {
    newVariable = variable
    newVariable.t = t
  } else {
    newVariable = new VariableClass({ t, formulaContext })
  }
  newVariable.subscribePromise()

  return newVariable
}

export const appendFormulas = (formulaContext: ContextInterface, formulas: BaseFormula[]): void => {
  const dupFormulas = [...formulas]
  dupFormulas.forEach(formula => {
    const oldVariable = formulaContext.findVariableById(formula.blockId, formula.id)
    const variable = castVariable(oldVariable, formulaContext, formula)
    variable.isDirty = false
    variable.save()
  })
}
