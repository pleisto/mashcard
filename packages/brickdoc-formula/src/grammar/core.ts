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
  NameDependency,
  FormulaType,
  VariableTask,
  EventDependency
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
import { createVariableTask } from '../context'

export interface BaseParseResult {
  success: boolean
  valid: boolean
  async: boolean
  pure: boolean
  effect: boolean
  persist: boolean
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
  nameDependencies: NameDependency[]
  functionDependencies: Array<FunctionClause<any>>
  blockDependencies: NamespaceId[]
  eventDependencies: EventDependency[]
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

    const name = formulaContext.findNames(variableNamespace.slice(1), match)[0]

    if (!name) {
      newInput = newInput.concat(token.image)
      return
    }

    const renderTokens = name.renderTokens(namespaceIsExist, namespaceId)

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

    if (codeFragment.display === '') {
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
    effect: false,
    persist: false,
    pure: true,
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
    nameDependencies: [],
    functionDependencies: [],
    eventDependencies: [],
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
          code: 'literal',
          type: 'any',
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
  returnValue.effect = codeFragmentVisitor.effect
  returnValue.persist = codeFragmentVisitor.persist
  returnValue.pure = codeFragmentVisitor.pure
  returnValue.kind = codeFragmentVisitor.kind
  returnValue.variableDependencies = [
    ...new Map(codeFragmentVisitor.variableDependencies.map(item => [item.variableId, item])).values()
  ]
  returnValue.nameDependencies = [
    ...new Map(codeFragmentVisitor.nameDependencies.map(item => [`${item.namespaceId},${item.name}`, item])).values()
  ]
  returnValue.functionDependencies = codeFragmentVisitor.functionDependencies
  returnValue.blockDependencies = [...new Map(codeFragmentVisitor.blockDependencies.map(item => [item, item])).values()]

  returnValue.eventDependencies = [
    ...new Map(
      codeFragmentVisitor.eventDependencies.map(item => [`${item.kind},${item.event.eventType},${item.eventId}`, item])
    ).values()
  ]
  returnValue.flattenVariableDependencies = [
    ...new Map(codeFragmentVisitor.flattenVariableDependencies.map(item => [item.variableId, item])).values()
  ]

  returnValue.inputImage = inputImage

  returnValue.cst = cst
  returnValue.input = newInput
  returnValue.parseImage = image

  const parseErrors: IRecognitionException[] = parser.errors
  let parseError = false

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
          code: 'parseErrorOther',
          type: 'any',
          hide: false,
          display: restImages,
          errors: errorMessages,
          attrs: undefined
        })
      }
    } else {
      parseError = true
      // devWarning(true, 'Parse Error', {
      //   input,
      //   tokens,
      //   codeFragments,
      //   newInput,
      //   inputImagesWithoutSpace: inputImage,
      //   codeFragmentImage: image
      // })
    }
  }

  let parseCodeFragments = codeFragments
  if (parseError) {
    const restImages = newInput.slice(1)
    parseCodeFragments = [
      codeFragments[0],
      {
        code: 'parseErrorOther',
        type: 'any',
        hide: false,
        display: restImages,
        errors: finalErrorMessages,
        attrs: undefined
      }
    ]
  }

  const { finalCodeFragments: addSpaceCodeFragment, finalPositionFragment: addSpacePositionFragment } = addSpace(
    parseCodeFragments,
    newInput,
    positionFragment,
    namespaceId
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
      valid: finalErrorMessages[0].type !== 'parse' && finalCodeFragments.length > 0,
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

  const sameNameVariable = formulaContext.findNames(namespaceId, name).filter(v => v.id !== variableId)[0]

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
    const result: AnyTypeResult = await interpreter.visit(cst!, { type: 'any', finalTypes: [] })
    // const lazy = interpreter.lazy

    return { success: true, result }
  } catch (e) {
    console.error(e)
    const message = `[FATAL] ${(e as any).message as string}`
    return { success: false, result: { result: message, type: 'Error', errorKind: 'fatal' } }
  }
}

const generateTask = async ({
  variable,
  ctx,
  skipExecute,
  parseResult
}: {
  variable?: VariableInterface
  skipExecute?: boolean
  ctx: FunctionContext
  parseResult: ParseResult
}): Promise<VariableTask> => {
  const result = innerInterpretFirst({ parseResult, ctx })
  // Fail fast
  if (result) {
    return createVariableTask({ async: false, variableValue: result, ctx, parseResult })
  }

  if (skipExecute && variable) {
    // SkipExecute and async
    if (variable.t.task.async) {
      return variable.t.task
    }

    // SkipExecute and normal
    if (!shouldReturnEarly(variable.t.task.variableValue.result)) {
      return variable.t.task
    }
  }

  // TODO effect check isChanged

  // Execute
  // 1. Non async
  if (!parseResult.async) {
    const interpretResult = await innerInterpret({ parseResult, ctx })
    return createVariableTask({ async: parseResult.async, variableValue: interpretResult, ctx, parseResult })
  }

  // 2. Async
  return createVariableTask({
    async: parseResult.async,
    variableValue: innerInterpret({ parseResult, ctx }),
    ctx,
    parseResult
  })
}

export const interpret = async ({
  variable,
  ctx,
  skipExecute,
  isLoad,
  parseResult
}: {
  isLoad?: boolean
  variable?: VariableInterface
  skipExecute?: boolean
  ctx: FunctionContext
  parseResult: ParseResult
}): Promise<VariableInterface> => {
  const {
    valid,
    cst,
    kind,
    codeFragments,
    version,
    async,
    effect,
    persist,
    pure,
    variableDependencies,
    nameDependencies,
    functionDependencies,
    blockDependencies,
    eventDependencies,
    flattenVariableDependencies
  } = parseResult
  const {
    formulaContext,
    meta: { name, input, namespaceId, variableId, type }
  } = ctx
  const task = await generateTask({ variable, ctx, skipExecute, parseResult })

  const t: VariableData = {
    namespaceId,
    variableId,
    name,
    cst,
    type,
    version,
    isAsync: async,
    isEffect: effect,
    isPure: pure,
    isPersist: persist,
    codeFragments,
    definition: input,
    valid,
    kind: kind ?? 'constant',
    variableDependencies,
    nameDependencies,
    flattenVariableDependencies,
    blockDependencies,
    eventDependencies,
    functionDependencies,
    task
  }

  return generateVariable({ formulaContext, t, variable, isLoad, skipExecute })
}

const generateVariable = ({
  formulaContext,
  t,
  variable,
  isLoad,
  skipExecute
}: {
  formulaContext: ContextInterface
  t: VariableData
  variable: VariableInterface | undefined
  isLoad: boolean | undefined
  skipExecute: boolean | undefined
}): VariableInterface => {
  let newVariable: VariableInterface
  if (variable) {
    newVariable = variable
    newVariable.t = t
  } else {
    newVariable = new VariableClass({ t, formulaContext })
  }

  if (!skipExecute) {
    if (isLoad) {
      newVariable.isNew = false
      newVariable.savedT = newVariable.t
    } else {
      newVariable.isNew = true
    }
  }

  return newVariable
}

export const appendFormulas = async (formulaContext: ContextInterface, formulas: BaseFormula[]): Promise<void> => {
  for (const formula of formulas) {
    const oldVariable = formulaContext.findVariableById(formula.blockId, formula.id)
    const variable = await castVariable(oldVariable, formulaContext, formula)
    variable.save()
  }
}
