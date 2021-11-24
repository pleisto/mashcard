import { CstNode, ILexingResult, IRecognitionException } from 'chevrotain'
import {
  ArgumentType,
  CodeFragment,
  ErrorMessage,
  ErrorType,
  ErrorVariableValue,
  Formula,
  ContextInterface,
  FormulaLexer,
  FunctionClause,
  Result,
  SuccessVariableValue,
  VariableClass,
  VariableData,
  VariableDependency,
  VariableKind,
  VariableMetadata,
  VariableTypeMeta,
  VariableValue,
  View,
  VariableInterface
} from '..'
import { FormulaParser } from './parser'
import { FormulaInterpreter } from './interpreter'
import { CodeFragmentVisitor } from './code_fragment'

export interface ParseInput {
  readonly meta: VariableMetadata
  readonly formulaContext: ContextInterface
}

export interface BaseParseResult {
  readonly success: boolean
  readonly cst?: CstNode
  readonly errorType?: 'lex' | 'parse'
  readonly kind?: VariableKind
  readonly errorMessages: ErrorMessage[]
  readonly variableDependencies?: VariableDependency[]
  readonly functionDependencies?: FunctionClause[]
  readonly codeFragments?: CodeFragment[]
}

export interface SuccessParseResult extends BaseParseResult {
  readonly success: true
  readonly errorMessages: []
  readonly cst: CstNode
  readonly kind: VariableKind
  readonly variableDependencies: VariableDependency[]
  readonly functionDependencies: FunctionClause[]
  readonly codeFragments: CodeFragment[]
}

export interface ErrorParseResult extends BaseParseResult {
  readonly success: false
  readonly cst?: CstNode
  readonly codeFragments?: CodeFragment[]
  readonly errorType: 'lex' | 'parse'
  readonly errorMessages: [ErrorMessage, ...ErrorMessage[]]
}

export type ParseResult = SuccessParseResult | ErrorParseResult

export interface InterpretInput {
  readonly cst: CstNode
  readonly meta: VariableMetadata
  readonly formulaContext: ContextInterface
}

export interface BaseInterpretResult {
  readonly success: boolean
  readonly errorMessages: ErrorMessage[]
  readonly result: VariableValue
}

export interface SuccessInterpretResult extends BaseInterpretResult {
  readonly success: true
  readonly errorMessages: []
  readonly result: SuccessVariableValue
}

export interface ErrorInterpretResult extends BaseInterpretResult {
  readonly success: false
  readonly errorMessages: [ErrorMessage, ...ErrorMessage[]]
  readonly result: ErrorVariableValue
}

export type InterpretResult = SuccessInterpretResult | ErrorInterpretResult

export const parse = ({ formulaContext, meta: { namespaceId, variableId, input } }: ParseInput): ParseResult => {
  const lexResult: ILexingResult = FormulaLexer.tokenize(input)

  if (lexResult.errors.length > 0) {
    return {
      success: false,
      errorType: 'lex',
      errorMessages: lexResult.errors.map(e => ({ message: e.message, type: 'syntax' })) as [ErrorMessage, ...ErrorMessage[]]
    }
  }

  const parser = new FormulaParser({ formulaContext })
  const codeFragmentVisitor = new CodeFragmentVisitor({ formulaContext })

  parser.input = lexResult.tokens
  try {
    const cst: CstNode = parser.startExpression()
    const codeFragments: CodeFragment[] = codeFragmentVisitor.visit(cst)

    const parseErrors: IRecognitionException[] = parser.errors

    if (parseErrors.length > 0) {
      return {
        success: false,
        errorType: 'parse',
        errorMessages: parseErrors.map(e => ({ message: e.message, type: 'syntax' })) as [ErrorMessage, ...ErrorMessage[]],
        cst,
        codeFragments
      }
    }

    // const flattenVariableDependencies = parser.flattenVariableDependencies
    // if (flattenVariableDependencies.find(d => d.namespaceId === namespaceId && d.variableId === variableId)) {
    //   return {
    //     success: false,
    //     errorType: 'parse',
    //     errorMessages: [{ message: 'Circular dependency found', type: 'circular_dependency' }],
    //     cst,
    //     codeFragments
    //   }
    // }

    const errorCodeFragment = codeFragments.find(f => !!f.error)

    if (errorCodeFragment) {
      return {
        success: false,
        cst,
        errorType: 'parse',
        errorMessages: [errorCodeFragment.error],
        codeFragments
      }
    }

    return {
      success: true,
      cst,
      errorMessages: [],
      kind: parser.kind,
      variableDependencies: parser.variableDependencies,
      functionDependencies: parser.functionDependencies,
      codeFragments
    }
  } catch (e) {
    // console.error(e)
    let type: ErrorType = 'fatal'
    if (e instanceof TypeError) {
      type = 'type'
    }

    const message = (e as any).message

    return {
      success: false,
      errorType: 'parse',
      errorMessages: [{ message, type }]
    }
  }
}

const castValue = (value: any, type: any): any => {
  switch (type) {
    case 'number':
      return Number(value)
    case 'boolean':
      return Boolean(value)
    // TODO date
    default:
      return value
  }
}

const fetchType = (result: any): ArgumentType => {
  const type = typeof result
  if (['string', 'boolean', 'number'].includes(type)) {
    return type as 'string' | 'boolean' | 'number'
  }

  if (result instanceof Date) {
    return 'Date'
  }

  return 'any'
}

export const displayValue = (result: Result): string => {
  const type = typeof result

  if (type === 'string') {
    return `"${result}"`
  }

  if (['boolean', 'number'].includes(type)) {
    return String(result)
  }

  if (result instanceof Date) {
    return result.toISOString()
  }

  if (result instanceof Array) {
    return JSON.stringify(result)
  }

  if (result instanceof Object) {
    return JSON.stringify(result)
  }

  return String(result)
}

export const interpret = async ({ cst, formulaContext, meta }: InterpretInput): Promise<InterpretResult> => {
  try {
    const interpreter = new FormulaInterpreter({ formulaContext })
    const result = await interpreter.visit(cst)
    return {
      success: true,
      result: { success: true, value: result, display: displayValue(result), type: fetchType(result), updatedAt: new Date() },
      errorMessages: []
    }
  } catch (e) {
    // console.error(e)
    const errorMessage: ErrorMessage = { message: (e as any).message as string, type: 'runtime' }
    return {
      success: false,
      result: { updatedAt: new Date(), success: false, errorMessages: [errorMessage] },
      errorMessages: [errorMessage]
    }
  }
}

export const buildVariable = ({
  formulaContext,
  meta: { name, input, namespaceId, variableId },
  view,
  parseResult: { cst, kind, variableDependencies, functionDependencies },
  interpretResult: { result }
}: {
  formulaContext: ContextInterface
  meta: VariableMetadata
  view: View
  parseResult: SuccessParseResult
  interpretResult: SuccessInterpretResult
}): VariableInterface => {
  const t: VariableData = {
    namespaceId,
    variableId,
    name,
    cst,
    kind,
    view,
    definition: input,
    dirty: false,
    variableValue: result,
    variableDependencies,
    functionDependencies
  }

  const oldVariable = formulaContext.findVariable(namespaceId, variableId)

  if (oldVariable) {
    oldVariable.t = t
    return oldVariable
  } else {
    return new VariableClass({ t })
  }
}

export const castVariable = (
  formulaContext: ContextInterface,
  { name, definition, cacheValue, updatedAt, blockId, id, view }: Formula
): VariableData => {
  const namespaceId = blockId
  const variableId = id
  const { type, value } = cacheValue as any
  const parseInput = { formulaContext, meta: { namespaceId, variableId, name, input: definition } }
  const { success, cst, kind, errorMessages, variableDependencies, codeFragments, functionDependencies } = parse(parseInput)

  const variableValue: VariableValue = success
    ? {
        updatedAt: new Date(),
        success: true,
        display: displayValue(castValue(value, type)),
        type,
        value: castValue(value, type)
      }
    : {
        updatedAt: new Date(),
        success: false,
        type: 'any',
        errorMessages: errorMessages as [ErrorMessage, ...ErrorMessage[]]
      }

  return {
    namespaceId,
    variableId,
    variableValue,
    name,
    cst,
    kind,
    view,
    definition,
    codeFragments,
    variableDependencies,
    functionDependencies,
    dirty: false
  }
}

export const variableTypeMeta = (t: VariableData): VariableTypeMeta => {
  if (t.variableValue.success) {
    return `success_${t.kind}_${t.variableValue.type}`
  }

  return `error_${t.kind}`
}

export const appendFormulas = (formulaContext: ContextInterface, formulas: Formula[]): void => {
  // TODO sort by dependency
  const dupFormulas = [...formulas]
  dupFormulas
    .sort((a, b) => a.createdAt - b.createdAt)
    .forEach(formula => {
      const variable = castVariable(formulaContext, formula)

      void formulaContext.commitVariable({ variable: new VariableClass({ t: variable }), skipCreate: true })
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
  const { success, cst, kind, errorMessages, variableDependencies, functionDependencies } = parse(parseInput)

  if (!success) {
    throw new Error(errorMessages[0].message)
  }

  const { result } = await interpret({ cst, formulaContext, meta })

  const variable = {
    namespaceId,
    variableId,
    name,
    dirty: false,
    definition: input,
    cst,
    kind,
    variableValue: result,
    variableDependencies,
    functionDependencies
  }

  void formulaContext.commitVariable({ variable: new VariableClass({ t: variable }) })
}
