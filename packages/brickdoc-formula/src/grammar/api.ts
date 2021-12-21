import { CstNode, ILexingResult, IRecognitionException } from 'chevrotain'
import {
  CodeFragment,
  ErrorMessage,
  ErrorVariableValue,
  Formula,
  ContextInterface,
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
  CodeFragmentResult,
  NamespaceId,
  castVariable,
  FormulaLexer
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
  readonly variableDependencies: VariableDependency[]
  readonly functionDependencies: Array<FunctionClause<any>>
  readonly blockDependencies: NamespaceId[]
  readonly codeFragments: CodeFragment[]
  readonly flattenVariableDependencies: Set<VariableDependency>
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
  let flattenVariableDependencies: Set<VariableDependency> = new Set()
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
  // console.log({ endChar, input })

  const specialChars = ['.', ' ', ',', '(', ')', '+', '-', '*', '/', '=', '>', '<', '[', ']', '{', '}']

  const index = specialChars.includes(endChar) ? tokens.length - 2 : tokens.length - 1
  const lastToken = tokens[index]

  const currentCompletion = activeCompletion
  // const currentCompletion = completions.find(completion => completion.name === lastToken.image)

  // console.log({ endChar, lastToken, input, tokens, currentCompletion })
  if (
    lastToken &&
    currentCompletion &&
    lastToken.image.length > 2 &&
    currentCompletion.replacements.find(replacement => replacement.toUpperCase() === lastToken.image.toUpperCase())
  ) {
    // console.log('start replace', lastToken.image, currentCompletion)
    // TODO spreadsheet && column completion (should in same codefragment)
    const firstReplacement = currentCompletion.replacements.find(replacement =>
      input.endsWith(replacement.concat(endChar))
    )
    let image = lastToken.image

    if (firstReplacement) {
      image = firstReplacement
    } else {
      console.error('replacement not found', { currentCompletion, lastToken, input })
    }

    newInput = input.slice(0, input.length - image.length - 1).concat(currentCompletion.value)

    // if (firstReplacement && endChar === '(') {
    //   // console.log()
    // } else {
    //   newInput = newInput.concat(endChar)
    // }
    if (specialChars.includes(endChar)) {
      newInput = newInput.concat(endChar)
    }

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
        cacheValue: { result: message, type: 'Error', errorKind: 'fatal' },
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
        updatedAt: new Date(),
        cacheValue: result,
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
    variableDependencies,
    functionDependencies,
    blockDependencies,
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
    errorMessages,
    variableDependencies,
    functionDependencies,
    blockDependencies,
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
    view,
    definition: input,
    cst,
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
