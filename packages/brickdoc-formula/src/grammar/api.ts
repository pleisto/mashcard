import { CstNode, ILexingResult, IRecognitionException } from 'chevrotain'
import {
  CodeFragment,
  ErrorMessage,
  ErrorVariableValue,
  Formula,
  ContextInterface,
  FormulaLexer,
  FunctionClause,
  SuccessVariableValue,
  VariableClass,
  VariableData,
  VariableDependency,
  VariableKind,
  VariableMetadata,
  VariableValue,
  View,
  VariableInterface,
  Completion,
  AnyTypeValue,
  ParseErrorType,
  CodeFragmentResult
} from '..'
import { FormulaParser } from './parser'
import { complete } from './completer'
import { FormulaInterpreter } from './interpreter'
import { CodeFragmentVisitor } from './code_fragment'
export interface ParseInput {
  readonly meta: VariableMetadata
  readonly activeCompletion?: Completion
  readonly formulaContext?: ContextInterface
}

export interface BaseParseResult {
  readonly success: boolean
  readonly valid: boolean
  readonly input: string
  readonly inputImage: string
  readonly parseImage: string
  readonly cst?: CstNode
  readonly errorType?: ParseErrorType
  readonly kind?: VariableKind
  readonly level: number
  readonly errorMessages: ErrorMessage[]
  readonly variableDependencies?: VariableDependency[]
  readonly functionDependencies?: Array<FunctionClause<any>>
  readonly codeFragments: CodeFragment[]
  readonly flattenVariableDependencies?: Set<VariableDependency>
  readonly completions: Completion[]
}

export interface SuccessParseResult extends BaseParseResult {
  readonly success: true
  readonly valid: true
  readonly errorMessages: []
  readonly cst: CstNode
  readonly kind: VariableKind
  readonly variableDependencies: VariableDependency[]
  readonly functionDependencies: Array<FunctionClause<any>>
  readonly flattenVariableDependencies: Set<VariableDependency>
}

export interface ErrorParseResult extends BaseParseResult {
  readonly success: false
  readonly cst?: CstNode
  readonly errorType: ParseErrorType
  readonly errorMessages: [ErrorMessage, ...ErrorMessage[]]
}

export type ParseResult = SuccessParseResult | ErrorParseResult

export interface InterpretInput {
  readonly cst?: CstNode
  readonly meta: VariableMetadata
  readonly formulaContext: ContextInterface
}

export interface BaseInterpretResult {
  readonly success: boolean
  readonly errorMessages: ErrorMessage[]
  readonly variableValue: VariableValue
}

export interface SuccessInterpretResult extends BaseInterpretResult {
  readonly success: true
  readonly errorMessages: []
  readonly variableValue: SuccessVariableValue
}

export interface ErrorInterpretResult extends BaseInterpretResult {
  readonly success: false
  readonly errorMessages: [ErrorMessage, ...ErrorMessage[]]
  readonly variableValue: ErrorVariableValue
}

export type InterpretResult = SuccessInterpretResult | ErrorInterpretResult

export const parse = ({
  formulaContext,
  meta: { namespaceId, variableId, input, name },
  activeCompletion
}: ParseInput): ParseResult => {
  let level = 0
  let newInput = input
  if (!variableId) {
    return {
      success: false,
      inputImage: '',
      parseImage: '',
      valid: false,
      cst: undefined,
      input: newInput,
      level,
      errorType: 'parse',
      completions: [],
      errorMessages: [{ message: 'Miss variableId', type: 'fatal' }],
      codeFragments: []
    }
  }
  const baseCompletion = formulaContext?.completions(namespaceId, variableId) ?? []
  let completions: Completion[] = baseCompletion

  const parser = new FormulaParser({ formulaContext })
  const codeFragmentVisitor = new CodeFragmentVisitor({ formulaContext })

  let lexResult: ILexingResult = FormulaLexer.tokenize(input)
  let tokens = lexResult.tokens

  const endChar = input[input.length - 1]
  // console.log({ endChar, input })

  if (['.', ' ', ','].includes(endChar)) {
    const index = endChar === '.' ? tokens.length - 2 : tokens.length - 1
    const lastToken = tokens[index]

    const currentCompletion = activeCompletion

    // console.log({ endChar, lastToken, input, tokens, currentCompletion })
    if (lastToken && currentCompletion && currentCompletion.name === lastToken.image) {
      // console.log('start replace', lastToken.image, currentCompletion)
      newInput = input
        .slice(0, input.length - lastToken.image.length - 1)
        .concat(currentCompletion.value)
        .concat(endChar)

      lexResult = FormulaLexer.tokenize(newInput)
      tokens = lexResult.tokens
    }
  }

  parser.input = tokens
  const inputImage = tokens.map(t => t.image).join('')

  const cst: CstNode = parser.startExpression()
  const { codeFragments, image }: CodeFragmentResult = codeFragmentVisitor.visit(cst, {
    type: 'any'
  })

  level = codeFragmentVisitor.level
  const parseErrors: IRecognitionException[] = parser.errors

  if (lexResult.errors.length > 0 || parseErrors.length > 0) {
    const finalCodeFragments: CodeFragment[] = codeFragments
    const errorMessages = (lexResult.errors.length ? lexResult.errors : parseErrors).map(e => ({
      message: e.message,
      type: 'syntax'
    })) as [ErrorMessage, ...ErrorMessage[]]

    const errorCodeFragment = codeFragments.find(f => f.errors.length)
    const finalErrorMessages: [ErrorMessage, ...ErrorMessage[]] = errorCodeFragment
      ? [errorCodeFragment.errors[0]]
      : errorMessages

    if (inputImage.startsWith(image)) {
      const restImages = inputImage.slice(image.length)
      if (restImages.length > 0) {
        finalCodeFragments.push({
          code: 'other',
          name: restImages,
          spaceAfter: false,
          spaceBefore: false,
          type: 'any',
          meta: undefined,
          errors: errorMessages
        })
      }
    } else {
      console.error({ ParseErrorTODO: { input, newInput, inputImages: inputImage, image } })
    }

    completions = complete({
      input,
      cacheCompletions: baseCompletion,
      codeFragments,
      tokens,
      formulaContext,
      namespaceId,
      variableId
    })

    return {
      success: false,
      valid: finalCodeFragments.length > 0,
      errorType: 'parse',
      input: newInput,
      inputImage,
      parseImage: image,
      completions,
      level,
      errorMessages: finalErrorMessages,
      cst,
      codeFragments: finalCodeFragments
    }
  }

  completions = complete({
    input,
    cacheCompletions: baseCompletion,
    codeFragments,
    tokens,
    formulaContext,
    namespaceId,
    variableId
  })

  const errorCodeFragment = codeFragments.find(f => f.errors.length)

  if (errorCodeFragment) {
    return {
      success: false,
      valid: true,
      input: newInput,
      inputImage,
      parseImage: image,
      cst,
      level,
      errorType: 'syntax',
      completions,
      errorMessages: [errorCodeFragment.errors[0]],
      codeFragments
    }
  }

  const flattenVariableDependencies = codeFragmentVisitor.flattenVariableDependencies
  if ([...flattenVariableDependencies].find(v => v.namespaceId === namespaceId && v.variableId === variableId)) {
    return {
      success: false,
      valid: true,
      input: newInput,
      inputImage,
      parseImage: image,
      errorType: 'syntax',
      errorMessages: [{ message: 'Circular dependency found', type: 'circular_dependency' }],
      level,
      completions,
      cst,
      flattenVariableDependencies,
      variableDependencies: codeFragmentVisitor.variableDependencies,
      functionDependencies: codeFragmentVisitor.functionDependencies,
      codeFragments
    }
  }

  const sameNameVariable = formulaContext
    ?.listVariables(namespaceId)
    .find(v => v.t.variableId !== variableId && v.t.name === name)

  if (sameNameVariable) {
    return {
      success: false,
      valid: true,
      input: newInput,
      inputImage,
      parseImage: image,
      cst,
      level,
      errorType: 'syntax',
      completions,
      errorMessages: [{ message: 'Variable name exist in same namespace', type: 'name_unique' }],
      flattenVariableDependencies,
      variableDependencies: codeFragmentVisitor.variableDependencies,
      functionDependencies: codeFragmentVisitor.functionDependencies,
      codeFragments
    }
  }

  return {
    success: true,
    valid: true,
    input: newInput,
    inputImage,
    parseImage: image,
    cst,
    level,
    errorMessages: [],
    completions,
    kind: codeFragmentVisitor.kind,
    flattenVariableDependencies,
    variableDependencies: codeFragmentVisitor.variableDependencies,
    functionDependencies: codeFragmentVisitor.functionDependencies,
    codeFragments
  }
}

export const displayValue = (v: AnyTypeValue): string => {
  switch (v.type) {
    case 'number':
    case 'boolean':
      return String(v.result)
    case 'string':
      return `"${v.result}"`
    case 'Date':
      return v.result.toISOString()
    case 'Error':
      return `#<Error> ${v.result}`
    case 'Spreadsheet':
      return `#<Spreadsheet> ${v.result.name()}`
    case 'Column':
      return `#<Column> ${v.result.spreadsheetName} - ${v.result.name}`
    case 'Predicate':
      return `#<Predicate> [${v.operator}] ${displayValue(v.result)}`
  }

  return JSON.stringify(v.result)
}

export const interpret = async ({ cst, formulaContext, meta }: InterpretInput): Promise<InterpretResult> => {
  if (!cst) {
    const message = 'CST is undefined'
    const errorMessage: ErrorMessage = { message, type: 'fatal' }
    return {
      success: false,
      errorMessages: [errorMessage],
      variableValue: {
        updatedAt: new Date(),
        success: false,
        display: message,
        result: { result: message, type: 'Error', errorKind: 'fatal' }
      }
    }
  }
  try {
    const interpreter = new FormulaInterpreter({ formulaContext })
    const result: AnyTypeValue = await interpreter.visit(cst)

    return {
      success: true,
      variableValue: {
        success: true,
        display: displayValue(result),
        updatedAt: new Date(),
        result
      },
      errorMessages: []
    }
  } catch (e) {
    console.error(e)
    const message = `[FATAL] ${(e as any).message as string}`
    const errorMessage: ErrorMessage = { message, type: 'fatal' }
    return {
      success: false,
      errorMessages: [errorMessage],
      variableValue: {
        display: message,
        updatedAt: new Date(),
        success: false,
        result: { result: message, type: 'Error', errorKind: 'fatal' }
      }
    }
  }
}

export const buildVariable = ({
  formulaContext,
  meta: { name, input, namespaceId, variableId },
  view,
  parseResult: {
    valid,
    cst,
    kind,
    codeFragments,
    variableDependencies,
    functionDependencies,
    level,
    flattenVariableDependencies
  },
  interpretResult: { variableValue }
}: {
  formulaContext: ContextInterface
  meta: VariableMetadata
  view: View
  parseResult: ParseResult
  interpretResult: InterpretResult
}): VariableInterface => {
  const t: VariableData = {
    namespaceId,
    variableId,
    name,
    cst,
    view,
    codeFragments,
    definition: input,
    dirty: false,
    variableValue,
    valid,
    level,
    kind: kind ?? 'constant',
    variableDependencies: variableDependencies ?? [],
    flattenVariableDependencies: flattenVariableDependencies ?? new Set(),
    functionDependencies: functionDependencies ?? []
  }

  const oldVariable = formulaContext.findVariable(namespaceId, variableId)

  if (oldVariable) {
    oldVariable.t = t
    return oldVariable
  } else {
    return new VariableClass({ t, backendActions: formulaContext.backendActions })
  }
}

export const castVariable = (
  formulaContext: ContextInterface,
  { name, definition, cacheValue, blockId, id, view }: Formula
): VariableData => {
  const namespaceId = blockId
  const variableId = id
  const castedValue: AnyTypeValue = cacheValue as unknown as AnyTypeValue
  const parseInput = { formulaContext, meta: { namespaceId, variableId, name, input: definition } }
  const {
    success,
    cst,
    kind,
    valid,
    errorMessages,
    variableDependencies,
    flattenVariableDependencies,
    codeFragments,
    functionDependencies,
    level
  } = parse(parseInput)

  const variableValue: VariableValue = success
    ? {
        updatedAt: new Date(),
        success: true,
        display: displayValue(castedValue),
        result: castedValue
      }
    : {
        updatedAt: new Date(),
        success: false,
        display: errorMessages[0]!.message,
        result: { type: 'Error', result: errorMessages[0]!.message, errorKind: errorMessages[0]!.type }
      }

  return {
    namespaceId,
    variableId,
    variableValue,
    name,
    cst,
    view,
    valid,
    definition,
    codeFragments,
    level,
    kind: kind ?? 'constant',
    variableDependencies: variableDependencies ?? [],
    flattenVariableDependencies: flattenVariableDependencies ?? new Set(),
    functionDependencies: functionDependencies ?? [],
    dirty: false
  }
}

export const appendFormulas = (formulaContext: ContextInterface, formulas: Formula[]): void => {
  // TODO sort by dependency
  const dupFormulas = [...formulas]
  dupFormulas
    .sort((a, b) => a.createdAt - b.createdAt)
    .forEach(formula => {
      const variable = castVariable(formulaContext, formula)

      void formulaContext.commitVariable({
        variable: new VariableClass({ t: variable, backendActions: formulaContext.backendActions }),
        skipCreate: true
      })
    })
}

// NOTE: only for test
export const quickInsert = async ({
  formulaContext,
  meta: { namespaceId, variableId, name, input }
}: {
  meta: VariableMetadata
  formulaContext: ContextInterface
}): Promise<void> => {
  const meta = { namespaceId, variableId, name, input }

  const parseInput = { formulaContext, meta }
  const {
    success,
    cst,
    codeFragments,
    kind,
    level,
    errorMessages,
    variableDependencies,
    functionDependencies,
    flattenVariableDependencies
  } = parse(parseInput)

  if (!success) {
    throw new Error(errorMessages[0]!.message)
  }

  const { variableValue } = await interpret({ cst, formulaContext, meta })

  const variable: VariableData = {
    namespaceId,
    variableId,
    name,
    dirty: false,
    valid: true,
    definition: input,
    cst,
    kind: kind ?? 'constant',
    codeFragments,
    variableValue,
    level,
    variableDependencies: variableDependencies ?? [],
    functionDependencies: functionDependencies ?? [],
    flattenVariableDependencies: flattenVariableDependencies ?? new Set()
  }
  // return new VariableClass({ t: variable, backendActions: formulaContext.backendActions })
  void (await formulaContext.commitVariable({
    variable: new VariableClass({ t: variable, backendActions: formulaContext.backendActions })
  }))
}
