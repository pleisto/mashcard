import { CstNode, ILexingResult, IRecognitionException } from 'chevrotain'
import {
  ErrorMessage,
  ContextInterface,
  VariableData,
  VariableValue,
  VariableInterface,
  Completion,
  AnyTypeResult,
  ParseErrorType,
  CodeFragmentResult,
  FunctionContext,
  BaseFormula,
  VariableTask,
  VariableParseResult,
  FormulaCheckType,
  CodeFragment,
  VariableMetadata
} from '../type'
import { VariableClass, castVariable } from '../context/variable'
import { FormulaLexer } from './lexer'
import { FORMULA_PARSER_VERSION } from '../version'
import { FormulaParser } from './parser'
import { getCompletion } from './completer'
import { FormulaInterpreter } from './interpreter'
import { CodeFragmentVisitor } from './codeFragment'
import { parseErrorMessage, shouldReturnEarly } from './util'
import { createVariableTask } from '../context'
import { addSpaceStep } from './steps'
import { devWarning } from '@mashcard/design-system'

interface BaseParseResult {
  meta: VariableMetadata
  variableParseResult: VariableParseResult
  success: boolean
  inputImage: string
  parseImage: string
  expressionType: FormulaCheckType
  errorType?: ParseErrorType
  errorMessages: ErrorMessage[]
  completions: Completion[]
}

interface SuccessParseResult extends BaseParseResult {
  success: true
  errorMessages: []
  variableParseResult: VariableParseResult & {
    valid: true
    kind: 'constant' | 'expression'
    cst: CstNode
  }
}

interface LiteralParseResult extends BaseParseResult {
  success: true
  errorMessages: []
  variableParseResult: VariableParseResult & {
    valid: true
    kind: 'literal'
    cst: undefined
  }
}

interface BlankParseResult extends BaseParseResult {
  success: true
  errorMessages: []
  variableParseResult: VariableParseResult & {
    valid: true
    kind: 'blank'
    cst: undefined
  }
}

interface ErrorParseResult extends BaseParseResult {
  success: false
  errorMessages: [ErrorMessage, ...ErrorMessage[]]
  errorType: ParseErrorType
  variableParseResult: VariableParseResult & {
    kind: 'unknown'
    cst: CstNode | undefined
  }
}

export type ParseResult = SuccessParseResult | ErrorParseResult | LiteralParseResult | BlankParseResult

export const parse = (ctx: FunctionContext): ParseResult => {
  const {
    formulaContext,
    meta: { name, namespaceId, variableId }
  } = ctx
  const parseResult = parse1(ctx)
  const nameError = formulaContext.checkName(name, namespaceId, variableId)
  if (!nameError) return parseResult

  return {
    ...parseResult,
    success: false,
    errorType: 'syntax',
    errorMessages: [nameError, ...parseResult.errorMessages],
    variableParseResult: {
      ...parseResult.variableParseResult,
      kind: 'unknown'
    }
  }
}

const parse1 = (ctx: FunctionContext): ParseResult => {
  const { meta } = ctx
  const { input, position } = meta
  const version = FORMULA_PARSER_VERSION
  const equalCodeFragment: CodeFragment = {
    code: 'Equal',
    type: 'any',
    display: '=',
    meta: undefined,
    errors: [],
    attrs: undefined
  }

  const returnValue: BaseParseResult = {
    success: false,
    meta,
    inputImage: '',
    parseImage: '',
    expressionType: 'any',
    errorType: 'parse',
    errorMessages: [{ type: 'parse', message: '' }],
    completions: [],
    variableParseResult: {
      valid: true,
      async: false,
      effect: false,
      persist: false,
      pure: true,
      cst: undefined,
      definition: input,
      position,
      version,
      kind: 'unknown',
      codeFragments: [],
      variableDependencies: [],
      nameDependencies: [],
      functionDependencies: [],
      eventDependencies: [],
      blockDependencies: [],
      flattenVariableDependencies: []
    }
  }

  if (!input.startsWith('=')) {
    return {
      ...returnValue,
      errorType: undefined,
      success: true,
      errorMessages: [],
      variableParseResult: {
        ...returnValue.variableParseResult,
        valid: true,
        kind: 'literal',
        cst: undefined,
        codeFragments: [
          {
            code: 'literal',
            type: 'any',
            display: input,
            errors: [],
            attrs: undefined,
            index: 0
          }
        ]
      }
    }
  }

  if (input.trim() === '=') {
    const rest = input.substring(1)
    const restCodeFragments: CodeFragment[] = rest
      ? [{ code: 'Space', display: rest, type: 'any', errors: [], attrs: undefined }]
      : []
    return {
      ...returnValue,
      errorType: undefined,
      success: true,
      errorMessages: [],
      variableParseResult: {
        ...returnValue.variableParseResult,
        valid: true,
        kind: 'blank',
        cst: undefined,
        codeFragments: [equalCodeFragment, ...restCodeFragments].map((c, index) => ({ ...c, index }))
      }
    }
  }

  const newInput = input.substring(1)
  const isHead = position === 0
  const newPosition = Math.max(position - 1, 0)
  const { inputImage, parseImage, variableParseResult, ...rest } = parse2({
    ...ctx,
    meta: { ...meta, input: newInput, position: newPosition }
  })

  const newVariableParseResult: ParseResult['variableParseResult'] = {
    ...variableParseResult,
    definition: `=${variableParseResult.definition}`,
    position: isHead && variableParseResult.position === 0 ? 0 : variableParseResult.position + 1,
    codeFragments: [equalCodeFragment, ...variableParseResult.codeFragments].map((c, index) => ({ ...c, index }))
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const parseResult = {
    ...rest,
    inputImage: `=${inputImage}`,
    parseImage: `=${parseImage}`,
    variableParseResult: newVariableParseResult
  } as ParseResult

  return parseResult
}

const parse2 = (ctx: FunctionContext): ParseResult => {
  const { formulaContext, meta } = ctx
  const { namespaceId, variableId, input, position } = meta
  const version = FORMULA_PARSER_VERSION

  const returnValue: BaseParseResult = {
    success: false,
    meta,
    inputImage: '',
    parseImage: '',
    expressionType: 'any',
    errorType: 'parse',
    errorMessages: [{ type: 'parse', message: '' }],
    completions: [],
    variableParseResult: {
      valid: true,
      async: false,
      effect: false,
      persist: false,
      pure: true,
      cst: undefined,
      definition: input,
      position,
      version,
      kind: 'unknown',
      codeFragments: [],
      variableDependencies: [],
      nameDependencies: [],
      functionDependencies: [],
      eventDependencies: [],
      blockDependencies: [],
      flattenVariableDependencies: []
    }
  }

  const baseCompletion = formulaContext.completions(namespaceId, variableId)
  let completions: Completion[] = baseCompletion

  const parser = new FormulaParser()
  const codeFragmentVisitor = new CodeFragmentVisitor({ ctx })
  const { tokens, errors: lexErrors }: ILexingResult = FormulaLexer.tokenize(input)

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
  returnValue.variableParseResult.async = codeFragmentVisitor.async
  returnValue.variableParseResult.effect = codeFragmentVisitor.effect
  returnValue.variableParseResult.persist = codeFragmentVisitor.persist
  returnValue.variableParseResult.pure = codeFragmentVisitor.pure
  returnValue.variableParseResult.kind = codeFragmentVisitor.kind
  returnValue.variableParseResult.variableDependencies = [
    ...new Map(codeFragmentVisitor.variableDependencies.map(item => [item.variableId, item])).values()
  ]
  returnValue.variableParseResult.nameDependencies = [
    ...new Map(codeFragmentVisitor.nameDependencies.map(item => [`${item.namespaceId},${item.name}`, item])).values()
  ]
  returnValue.variableParseResult.functionDependencies = codeFragmentVisitor.functionDependencies
  returnValue.variableParseResult.blockDependencies = [
    ...new Map(codeFragmentVisitor.blockDependencies.map(item => [item, item])).values()
  ]

  returnValue.variableParseResult.eventDependencies = [
    ...new Map(
      codeFragmentVisitor.eventDependencies.map(item => [
        `${item.kind},${item.event.eventType},${item.eventId},${item.key}`,
        item
      ])
    ).values()
  ]
  returnValue.variableParseResult.flattenVariableDependencies = [
    ...new Map(codeFragmentVisitor.flattenVariableDependencies.map(item => [item.variableId, item])).values()
  ]

  returnValue.inputImage = inputImage

  returnValue.variableParseResult.cst = cst
  returnValue.parseImage = image

  const parseErrors: IRecognitionException[] = parser.errors
  let parseError = false

  if (lexErrors.length > 0 || parseErrors.length > 0) {
    const errorMessages = (lexErrors.length ? lexErrors : parseErrors).map(e => ({
      message: parseErrorMessage(e.message),
      type: 'parse'
    })) as [ErrorMessage, ...ErrorMessage[]]

    finalErrorMessages.push(...errorMessages)

    if (inputImage.startsWith(image)) {
      const restImages = inputImage.slice(image.length)
      if (restImages.length > 0) {
        codeFragments.push({
          code: 'parseErrorOther1',
          type: 'any',
          display: restImages,
          errors: errorMessages,
          attrs: undefined
        })
      }
    } else {
      parseError = true
    }
  }

  let parseCodeFragments = codeFragments
  if (parseError) {
    parseCodeFragments = [
      {
        code: 'parseErrorOther2',
        type: 'any',
        display: input,
        errors: finalErrorMessages,
        attrs: undefined
      }
    ]
  }

  const newPosition = position
  const { codeFragments: finalCodeFragments } = [addSpaceStep].reduce(
    (prev, step) => step({ input: prev, meta: { ...ctx.meta, input } }),
    { codeFragments: parseCodeFragments }
  )

  completions = getCompletion({
    position: newPosition,
    completions,
    errorMessages: finalErrorMessages,
    codeFragments: finalCodeFragments,
    ctx
  })

  returnValue.variableParseResult.codeFragments = finalCodeFragments.map((c, index) => ({ ...c, index }))
  returnValue.variableParseResult.definition = finalCodeFragments.map(f => f.display).join('')
  returnValue.variableParseResult.position = newPosition
  returnValue.completions = completions

  if (finalErrorMessages.length) {
    return {
      ...returnValue,
      success: false,
      errorType: 'syntax',
      errorMessages: finalErrorMessages as [ErrorMessage, ...ErrorMessage[]],
      variableParseResult: {
        ...returnValue.variableParseResult,
        kind: 'unknown',
        valid: finalErrorMessages[0].type !== 'parse' && finalCodeFragments.length > 0
      }
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
      errorMessages: [{ message: 'errors.parse.circular_dependency.variable', type: 'circular_dependency' }],
      variableParseResult: {
        ...returnValue.variableParseResult,
        kind: 'unknown'
      }
    }
  }

  return {
    ...returnValue,
    errorType: undefined,
    success: true,
    errorMessages: [],
    variableParseResult: {
      ...returnValue.variableParseResult,
      valid: true,
      cst: cst!,
      kind: codeFragmentVisitor.kind
    }
  }
}

const innerInterpretFirst = ({
  parseResult: {
    errorMessages,
    variableParseResult: { cst, kind, async }
  },
  ctx
}: {
  parseResult: {
    errorMessages: ErrorMessage[]
    variableParseResult: Pick<VariableParseResult, 'cst' | 'kind' | 'async'>
  }
  ctx: FunctionContext
}): VariableValue | undefined => {
  if (errorMessages.length > 0) {
    const result: AnyTypeResult<'Error'> = {
      type: 'Error',
      result: { message: errorMessages[0].message, type: errorMessages[0].type }
    }
    return { success: false, result }
  }

  if (kind === 'literal') {
    return {
      success: true,
      result: { type: 'literal', result: ctx.meta.input },
      runtimeEventDependencies: [],
      runtimeVariableDependencies: [],
      runtimeFlattenVariableDependencies: []
    }
  }
  if (kind === 'blank') {
    return {
      success: true,
      result: { type: 'Blank', result: 'Blank' },
      runtimeEventDependencies: [],
      runtimeVariableDependencies: [],
      runtimeFlattenVariableDependencies: []
    }
  }
  if (!cst) {
    return {
      success: true,
      result: { type: 'string', result: ctx.meta.input },
      runtimeEventDependencies: [],
      runtimeVariableDependencies: [],
      runtimeFlattenVariableDependencies: []
    }
  }
  return undefined
}

export const innerInterpret = async ({
  parseResult: { errorMessages, variableParseResult },
  ctx
}: {
  parseResult: {
    errorMessages: ErrorMessage[]
    variableParseResult: Pick<VariableParseResult, 'cst' | 'kind' | 'async'>
  }
  ctx: FunctionContext
}): Promise<VariableValue> => {
  const result = innerInterpretFirst({ parseResult: { variableParseResult, errorMessages }, ctx })
  if (result) return result
  try {
    const interpreter = new FormulaInterpreter({ ctx })
    const result: AnyTypeResult = await interpreter.visit(variableParseResult.cst!, { type: 'any', finalTypes: [] })
    // const lazy = interpreter.lazy

    if (
      interpreter.runtimeFlattenVariableDependencies.find(
        v => v.namespaceId === ctx.meta.namespaceId && v.variableId === ctx.meta.variableId
      )
    ) {
      return {
        success: false,
        result: {
          type: 'Error',
          result: { message: 'errors.interpret.circular_dependency.variable', type: 'circular_dependency' }
        }
      }
    }

    return {
      success: true,
      result,
      runtimeEventDependencies: interpreter.runtimeEventDependencies,
      runtimeVariableDependencies: interpreter.runtimeVariableDependencies,
      runtimeFlattenVariableDependencies: interpreter.runtimeFlattenVariableDependencies
    }
  } catch (e) {
    devWarning(true, e)
    const message = `[FATAL] ${(e as any).message as string}`
    return { success: false, result: { result: { message, type: 'fatal' }, type: 'Error' } }
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
  if (!parseResult.variableParseResult.async) {
    const interpretResult = await innerInterpret({ parseResult, ctx })
    return createVariableTask({
      async: false,
      variableValue: interpretResult,
      ctx,
      parseResult
    })
  }

  // 2. Async
  return createVariableTask({
    async: true,
    variableValue: innerInterpret({ parseResult, ctx }),
    ctx,
    parseResult
  })
}

export const interpret = async ({
  variable,
  ctx,
  skipExecute,
  parseResult
}: {
  variable?: VariableInterface
  skipExecute?: boolean
  ctx: FunctionContext
  parseResult: ParseResult
}): Promise<VariableData> => {
  const {
    meta: { name, namespaceId, variableId, richType }
  } = ctx
  const task = await generateTask({ variable, ctx, skipExecute, parseResult })

  return {
    meta: { name, namespaceId, variableId, richType },
    variableParseResult: parseResult.variableParseResult,
    task
  }
}

export const generateVariable = ({
  formulaContext,
  t,
  isLoad,
  skipExecute
}: {
  formulaContext: ContextInterface
  t: VariableData
  isLoad?: boolean
  skipExecute?: boolean
}): VariableInterface => {
  const newVariable = new VariableClass({ t, formulaContext })

  if (!skipExecute) {
    newVariable.isNew = !isLoad
  }

  return newVariable
}

export const appendFormulas = async (formulaContext: ContextInterface, formulas: BaseFormula[]): Promise<void> => {
  for (const formula of formulas) {
    const oldVariable = formulaContext.findVariableById(formula.blockId, formula.id)
    const variable = await castVariable(oldVariable, formulaContext, formula)
    await variable.save()
  }
}
