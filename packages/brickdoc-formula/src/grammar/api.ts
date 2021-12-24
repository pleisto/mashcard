import { CstNode, ILexingResult, IRecognitionException } from 'chevrotain'
import {
  CodeFragment,
  ErrorMessage,
  Formula,
  ContextInterface,
  FunctionClause,
  VariableClass,
  VariableData,
  VariableDependency,
  VariableKind,
  VariableMetadata,
  VariableValue,
  View,
  VariableInterface,
  Completion,
  AnyTypeResult,
  ParseErrorType,
  CodeFragmentResult,
  NamespaceId,
  castVariable,
  FormulaLexer,
  FORMULA_PARSER_VERSION,
  FunctionContext
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
  readonly version: number
  readonly inputImage: string
  readonly parseImage: string
  readonly cst?: CstNode
  readonly errorType?: ParseErrorType
  readonly kind?: VariableKind
  readonly level: number
  readonly errorMessages: ErrorMessage[]
  readonly variableDependencies: VariableDependency[]
  readonly functionDependencies: Array<FunctionClause<any>>
  readonly blockDependencies: NamespaceId[]
  readonly codeFragments: CodeFragment[]
  readonly flattenVariableDependencies: VariableDependency[]
  readonly completions: Completion[]
}

export interface SuccessParseResult extends BaseParseResult {
  readonly success: true
  readonly valid: true
  readonly errorMessages: []
  readonly cst: CstNode
  readonly kind: VariableKind
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
  readonly ctx: FunctionContext
}

export interface InterpretResult {
  readonly variableValue: VariableValue
  readonly lazy: boolean
}

// eslint-disable-next-line complexity
export const parse = ({
  formulaContext,
  meta: { namespaceId, variableId, input, name },
  activeCompletion
}: ParseInput): ParseResult => {
  let level = 0
  let variableDependencies: VariableDependency[] = []
  let functionDependencies: Array<FunctionClause<any>> = []
  let blockDependencies: NamespaceId[] = []
  let flattenVariableDependencies: VariableDependency[] = []
  let newInput = input
  const version = FORMULA_PARSER_VERSION
  if (!variableId) {
    return {
      success: false,
      inputImage: '',
      parseImage: '',
      valid: false,
      cst: undefined,
      input: newInput,
      version,
      level,
      errorType: 'parse',
      completions: [],
      errorMessages: [{ message: 'Miss variableId', type: 'fatal' }],
      codeFragments: [],
      variableDependencies,
      functionDependencies,
      blockDependencies,
      flattenVariableDependencies
    }
  }
  const baseCompletion = formulaContext?.completions(namespaceId, variableId) ?? []
  let completions: Completion[] = baseCompletion

  const parser = new FormulaParser({ formulaContext })
  const codeFragmentVisitor = new CodeFragmentVisitor({ formulaContext })

  const lexer = FormulaLexer

  let lexResult: ILexingResult = lexer.tokenize(input)
  let tokens = lexResult.tokens

  const endChar = input[input.length - 1]

  const specialChars = ['.', ' ', ',', '(', ')', '+', '-', '*', '/', '=', '>', '<', '[', ']', '{', '}']
  const endCharIsSpecial = specialChars.includes(endChar)

  const index = endCharIsSpecial ? tokens.length - 2 : tokens.length - 1
  const lastToken = tokens[index]

  const currentCompletion = activeCompletion

  // console.log({ endChar, lastToken, input, tokens, currentCompletion })
  if (
    lastToken &&
    currentCompletion &&
    lastToken.image.length > 2 &&
    currentCompletion.replacements.find(replacement => replacement.toUpperCase() === lastToken.image.toUpperCase())
  ) {
    // TODO spreadsheet && column completion (should in same codefragment)

    let image = lastToken.image
    let firstReplacement

    if (endCharIsSpecial) {
      firstReplacement = currentCompletion.replacements.find(replacement => input.endsWith(replacement.concat(endChar)))
      if (firstReplacement) {
        image = firstReplacement
      } else {
        console.error('replacement not found', { currentCompletion, lastToken, input, endChar })
      }

      newInput = input
        .slice(0, input.length - image.length - 1)
        .concat(currentCompletion.value)
        .concat(endChar)
    } else {
      newInput = input.slice(0, input.length - image.length).concat(currentCompletion.value)
    }

    // console.log({ input, image, currentCompletion, lastToken })

    lexResult = lexer.tokenize(newInput)
    tokens = lexResult.tokens
  }

  parser.input = tokens
  const inputImage = tokens.map(t => t.image).join('')

  const cst: CstNode = parser.startExpression()
  const { codeFragments, image }: CodeFragmentResult = codeFragmentVisitor.visit(cst, {
    type: 'any'
  })

  const finalCodeFragments: CodeFragment[] = codeFragments
  const errorCodeFragment = codeFragments.find(f => f.errors.length)
  const finalErrorMessages: ErrorMessage[] = errorCodeFragment ? errorCodeFragment.errors : []

  level = codeFragmentVisitor.level
  variableDependencies = codeFragmentVisitor.variableDependencies
  functionDependencies = codeFragmentVisitor.functionDependencies
  blockDependencies = codeFragmentVisitor.blockDependencies
  flattenVariableDependencies = codeFragmentVisitor.flattenVariableDependencies

  const parseErrors: IRecognitionException[] = parser.errors

  if (lexResult.errors.length > 0 || parseErrors.length > 0) {
    const errorMessages = (lexResult.errors.length ? lexResult.errors : parseErrors).map(e => ({
      message: e.message,
      type: 'syntax'
    })) as [ErrorMessage, ...ErrorMessage[]]

    finalErrorMessages.push(...errorMessages)

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
  }

  const spaceCount = input.length - input.trimEnd().length
  if (spaceCount) {
    finalCodeFragments.push({
      code: 'Space',
      name: Array(spaceCount).fill(' ').join(''),
      spaceAfter: false,
      spaceBefore: false,
      type: 'any',
      meta: undefined,
      errors: []
    })
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

  if (finalErrorMessages.length) {
    return {
      success: false,
      valid: codeFragments.length > 0,
      input: newInput,
      inputImage,
      parseImage: image,
      version,
      cst,
      level,
      errorType: 'syntax',
      completions,
      errorMessages: finalErrorMessages as [ErrorMessage, ...ErrorMessage[]],
      codeFragments: finalCodeFragments,
      variableDependencies,
      functionDependencies,
      blockDependencies,
      flattenVariableDependencies
    }
  }

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
      version,
      completions,
      cst,
      flattenVariableDependencies,
      variableDependencies,
      functionDependencies,
      blockDependencies,
      codeFragments: finalCodeFragments
    }
  }

  if (formulaContext?.reservedNames.includes(name.toUpperCase())) {
    return {
      success: false,
      valid: true,
      input: newInput,
      inputImage,
      parseImage: image,
      cst,
      level,
      version,
      errorType: 'syntax',
      completions,
      errorMessages: [{ message: 'Variable name is reserved', type: 'name_check' }],
      flattenVariableDependencies,
      blockDependencies,
      variableDependencies,
      functionDependencies,
      codeFragments: finalCodeFragments
    }
  }

  const sameNameVariable = formulaContext
    ?.listVariables(namespaceId)
    .find(v => v.t.variableId !== variableId && v.t.name.toUpperCase() === name.toUpperCase())

  if (sameNameVariable) {
    return {
      success: false,
      valid: true,
      input: newInput,
      inputImage,
      parseImage: image,
      cst,
      level,
      version,
      errorType: 'syntax',
      completions,
      errorMessages: [{ message: 'Variable name exist in same namespace', type: 'name_unique' }],
      flattenVariableDependencies,
      blockDependencies,
      variableDependencies,
      functionDependencies,
      codeFragments: finalCodeFragments
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
    version,
    errorMessages: [],
    completions,
    kind: codeFragmentVisitor.kind,
    flattenVariableDependencies,
    blockDependencies,
    variableDependencies,
    functionDependencies,
    codeFragments: finalCodeFragments
  }
}

export const interpret = async ({ cst, ctx }: InterpretInput): Promise<InterpretResult> => {
  if (!cst) {
    const message = 'CST is undefined'
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
  try {
    const interpreter = new FormulaInterpreter({ ctx })
    const result: AnyTypeResult = await interpreter.visit(cst)
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
  view,
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
  // TODO sort by dependency
  const dupFormulas = [...formulas]
  dupFormulas
    .sort((a, b) => a.createdAt - b.createdAt)
    .forEach(formula => {
      const variable = castVariable(formulaContext, formula)

      void formulaContext.commitVariable({
        variable: new VariableClass({ t: variable, formulaContext }),
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
  const view: View = {}

  const parseInput = { formulaContext, meta }
  const {
    success,
    cst,
    codeFragments,
    kind,
    level,
    version,
    errorMessages,
    variableDependencies,
    functionDependencies,
    blockDependencies,
    flattenVariableDependencies
  } = parse(parseInput)

  if (!success) {
    throw new Error(errorMessages[0]!.message)
  }

  const { variableValue, lazy } = await interpret({
    cst,
    ctx: {
      formulaContext,
      meta,
      interpretContext: { ctx: {}, arguments: [] }
    }
  })

  const variable: VariableData = {
    namespaceId,
    variableId,
    name,
    dirty: false,
    valid: true,
    view,
    definition: input,
    cst,
    version: lazy ? -1 : version,
    kind: kind ?? 'constant',
    codeFragments,
    variableValue,
    level,
    blockDependencies,
    variableDependencies,
    functionDependencies,
    flattenVariableDependencies
  }
  // return new VariableClass({ t: variable, backendActions: formulaContext.backendActions })
  void (await formulaContext.commitVariable({
    variable: new VariableClass({ t: variable, formulaContext })
  }))
}
