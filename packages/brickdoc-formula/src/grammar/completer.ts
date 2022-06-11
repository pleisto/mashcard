import { fetchResult } from '../context'
import { BlockType, ColumnClass, ColumnType, SpreadsheetType } from '../controls'
import {
  AnyFunctionClause,
  BlockCompletion,
  CodeFragment,
  CodeFragmentAttrs,
  ColumnCompletion,
  Completion,
  CompletionFlag,
  ContextInterface,
  FormulaCheckType,
  FormulaType,
  FunctionCompletion,
  FunctionContext,
  NamespaceId,
  SpreadsheetCompletion,
  VariableCompletion,
  VariableInterface
} from '../types'
import { codeFragment2value } from './convert'
import { parse } from './core'
import { maybeEncodeString, reverseTraversalString } from './util'

interface GetCompletionInput {
  readonly position: number
  readonly ctx: FunctionContext
  readonly codeFragments: CodeFragment[]
  readonly completions: Completion[]
}

interface CompleteResult {
  readonly position: number
  readonly definition: string
}

const getWeight = (flag: CompletionFlag): number => {
  switch (flag) {
    case 'nameEqual':
      return 1000
    case 'nameStartsWith':
      return 500
    case 'nameIncludes':
      return 200
    case 'compareTypeMatched':
      return 50
    case 'compareTypeNotMatched':
      return -100
    case 'chainTypeMatched':
      return 50
    case 'chainTypeNotMatched':
      return -100
    case 'contextNamespace':
      return 100
    case 'chainNamespace':
      return 100
    case 'defaultNamespace':
      return 50
    case 'blockNamespace':
      return 20
    case 'variable':
      return 10
    case 'block':
    case 'column':
    case 'spreadsheet':
    case 'function':
    case 'name':
      return 0
  }
}

const matchTypeFlags = (type1: FormulaType, type2: FormulaCheckType): CompletionFlag[] => {
  if (type1 === 'any') return []
  if (typeof type2 === 'string') {
    return [type1 === type2 ? 'chainTypeMatched' : 'chainTypeNotMatched']
  }
  return [type2.includes(type1) ? 'chainTypeMatched' : 'chainTypeNotMatched']
}

export const handleComplete = (ctx: FunctionContext, completion: Completion): CompleteResult => {
  const {
    meta: { input: definition, position: oldPosition }
  } = ctx

  const {
    variableParseResult: { codeFragments }
  } = parse(ctx)

  const prevCodeFragments = getPrevCodeFragments(codeFragments, oldPosition)
  const position1 = prevCodeFragments.map(i => i.display).join('').length

  const result1 = tryComplete(completion, definition, position1)
  if (result1) return result1

  const lastCodeFragment = prevCodeFragments[prevCodeFragments.length - 1]
  if (lastCodeFragment && lastCodeFragment.code === 'Space') {
    // Remove tail space
    const position2 = prevCodeFragments
      .slice(0, -1)
      .map(i => i.display)
      .join('').length
    const result2 = tryComplete(completion, definition, position2)
    if (result2) return { ...result2, position: result2.position + lastCodeFragment.display.length }
  }

  const prev = definition.slice(0, position1)
  const next = definition.slice(position1)

  return {
    definition: `${prev}${completion.fallbackValue}${next}`,
    position: position1 + completion.fallbackValue.length
  }
}

const tryComplete = (completion: Completion, definition: string, position: number): CompleteResult | undefined => {
  const prev = definition.slice(0, position)
  const next = definition.slice(position)

  const replacement = completion.replacements.find(r => prev.toUpperCase().endsWith(r.matcher.toUpperCase()))
  // console.log('handleComplete', completion, definition, position, { prev, next }, replacement)

  if (replacement) {
    const newPrev = prev.slice(0, prev.length - replacement.matcher.length)
    const value = replacement.value
    return {
      definition: `${newPrev}${value}${next}`,
      position: newPrev.length + value.length
    }
  }
  return undefined
}

const getPrevCodeFragments = (codeFragments: CodeFragment[], position: number): CodeFragment[] => {
  const prevCodeFragments: CodeFragment[] = []
  codeFragments.forEach(codeFragment => {
    const prevLength = prevCodeFragments.map(i => i.display).join('').length
    if (prevLength >= position) return

    if (prevLength + codeFragment.display.length > position && codeFragment.code === 'Space') {
      prevCodeFragments.push({ ...codeFragment, display: codeFragment.display.slice(0, position - prevLength) })
    } else {
      prevCodeFragments.push(codeFragment)
    }
  })

  return prevCodeFragments
}

const lastNonSpaceCodeFragment = (codeFragments: CodeFragment[]): [CodeFragment | undefined, CodeFragment[]] => {
  const reverseCodeFragments = codeFragments.reverse()
  const first = reverseCodeFragments[0]
  if (!first) return [undefined, reverseCodeFragments.reverse()]
  if (first.code !== 'Space') return [first, reverseCodeFragments.slice(1).reverse()]
  const second = reverseCodeFragments[1]
  if (!second) return [first, reverseCodeFragments.slice(1).reverse()]
  return [{ ...second, display: second.display + first.display }, reverseCodeFragments.slice(2).reverse()]
}

export const getLastCodeFragment = (
  codeFragments: CodeFragment[],
  position: number
): [CodeFragment | undefined, CodeFragment | undefined] => {
  const prevCodeFragments = getPrevCodeFragments(codeFragments, position)
  const [prev1, restCodeFragments] = lastNonSpaceCodeFragment(prevCodeFragments)
  const [prev2] = lastNonSpaceCodeFragment(restCodeFragments)

  return [prev1, prev2]
}

interface CompleterInput {
  readonly completion: Completion
  // readonly extraCompletions: Completion[]
  readonly codeFragment: CodeFragment
  readonly prevCodeFragment: CodeFragment | undefined
  readonly ctx: FunctionContext
}

type ExpandCompleter = (input: CompleterInput) => Completion[]

type FlagCompleter = (input: CompleterInput) => CompletionFlag[]

const generateColumnCompletions = (ctx: FunctionContext, spreadsheet: SpreadsheetType): ColumnCompletion[] => {
  return spreadsheet.listColumns().map(column =>
    column2completion(
      new ColumnClass(spreadsheet, column, false, {
        namespaceId: spreadsheet.namespaceId,
        type: 'id',
        value: column.columnId
      }),
      ctx.meta.namespaceId
    )
  )
}

const thisRecordExpandCompleter: ExpandCompleter = ({ ctx }) => {
  if (ctx.meta.richType.type === 'normal') return []

  const spreadsheet = ctx.formulaContext.findSpreadsheet({
    namespaceId: ctx.meta.namespaceId,
    type: 'id',
    value: ctx.meta.richType.meta.spreadsheetId
  })
  if (!spreadsheet) return []
  return generateColumnCompletions(ctx, spreadsheet)
}

const dotSpreadsheetExpandCompleter: ExpandCompleter = ({ codeFragment, prevCodeFragment, ctx }) => {
  if (codeFragment.code !== 'Dot') return []
  if (!prevCodeFragment) return []
  if (prevCodeFragment.type !== 'Spreadsheet') return []

  const spreadsheet = ctx.formulaContext.findSpreadsheet({
    namespaceId: prevCodeFragment.attrs!.namespaceId,
    type: 'id',
    value: prevCodeFragment.attrs!.id
  })
  if (!spreadsheet) return []
  return generateColumnCompletions(ctx, spreadsheet)
}

const dotCompleter: FlagCompleter = ({ codeFragment, completion, prevCodeFragment }) => {
  if (codeFragment.code !== 'Dot') return []
  if (!prevCodeFragment) return []

  if (completion.kind === 'function' && completion.preview.chain) {
    const matchType = prevCodeFragment.type
    const firstArgsType = completion.preview.args[0].type
    return matchTypeFlags(matchType, firstArgsType)
  }

  if (prevCodeFragment.type === 'Block') {
    const namespaceId = prevCodeFragment.namespaceId
    if (completion.namespaceId !== namespaceId) return []
    return ['chainNamespace']
  }

  return []
}

const greater1Completer: FlagCompleter = ({ completion, codeFragment }) => {
  if (!['GreaterThan', 'GreaterThanEqual', 'LessThan', 'LessThanEqual'].includes(codeFragment.code)) return []
  if (completion.kind !== 'variable') return []
  const matched = fetchResult(completion.preview.t).type === 'number'

  return [matched ? 'compareTypeMatched' : 'compareTypeNotMatched']
}

const greater2Completer: FlagCompleter = args => {
  if (!args.prevCodeFragment) return []
  if (!['FunctionName', 'Function'].includes(args.codeFragment.code)) return []

  return greater1Completer({ ...args, codeFragment: args.prevCodeFragment, prevCodeFragment: undefined })
}

const defaultNamespaceCompleter: FlagCompleter = ({ completion, ctx }) => {
  const namespaceId = ctx.meta.namespaceId
  if (!namespaceId) return []
  if (completion.namespaceId !== namespaceId) return []
  return ['defaultNamespace']
}

const contextNamespaceCompleter: FlagCompleter = ({ codeFragment, completion }) => {
  const namespaceId = codeFragment.namespaceId
  if (!namespaceId) return []
  if (completion.namespaceId !== namespaceId) return []
  return ['contextNamespace']
}

const variableExactCompleter: FlagCompleter = ({ codeFragment, completion }) => {
  if (codeFragment.code !== 'Variable') return []
  if (completion.kind !== 'variable') return []
  if (completion.preview.t.meta.variableId !== codeFragment.attrs.id) return []

  return ['variable']
}

const blockCompleter: FlagCompleter = ({ codeFragment, completion }) => {
  if (codeFragment.code !== 'Block') return []
  if (completion.namespaceId !== codeFragment.namespaceId) return []

  return ['blockNamespace']
}

const kindCompleter: FlagCompleter = ({ completion }) => {
  return [completion.kind]
}

const nameCompleter: FlagCompleter = ({ codeFragment, completion, ctx }) => {
  const namespaceId = ctx.meta.namespaceId
  if (!['FunctionName', 'Function'].includes(codeFragment.code)) return []

  const value = codeFragment2value(codeFragment, namespaceId)
  const tokenLowerCase = value.toLowerCase()

  const completionNameLowerCase = completion.name.toLowerCase()
  if (completionNameLowerCase === tokenLowerCase) return ['name', 'nameEqual']
  if (completionNameLowerCase.startsWith(tokenLowerCase)) return ['name', 'nameStartsWith']
  if (completionNameLowerCase.includes(tokenLowerCase)) return ['name', 'nameIncludes']
  return ['name']
}

const EXPAND_COMPLETERS: ExpandCompleter[] = [thisRecordExpandCompleter, dotSpreadsheetExpandCompleter]

const FLAG_COMPLETERS: FlagCompleter[] = [
  dotCompleter,
  greater1Completer,
  greater2Completer,
  nameCompleter,
  contextNamespaceCompleter,
  defaultNamespaceCompleter,
  variableExactCompleter,
  blockCompleter,
  kindCompleter
]

export const getCompletion = ({ position, ctx, codeFragments, completions }: GetCompletionInput): Completion[] => {
  const [firstNonSpaceCodeFragment, secondNonSpaceCodeFragment] = getLastCodeFragment(codeFragments, position)
  if (!firstNonSpaceCodeFragment) return completions

  const args = { codeFragment: firstNonSpaceCodeFragment, prevCodeFragment: secondNonSpaceCodeFragment, ctx }

  return completions
    .flatMap(c => {
      const { extraCompletions } = EXPAND_COMPLETERS.reduce<CompleterInput & { extraCompletions: Completion[] }>(
        (acc, completer) => ({ ...acc, extraCompletions: [...acc.extraCompletions, ...completer(acc)] }),
        { ...args, completion: c, extraCompletions: [] }
      )
      return [...extraCompletions, c]
    })
    .map(c => {
      const { extraFlags } = FLAG_COMPLETERS.reduce<CompleterInput & { extraFlags: CompletionFlag[] }>(
        (acc, completer) => ({ ...acc, extraFlags: [...acc.extraFlags, ...completer(acc)] }),
        { ...args, completion: c, extraFlags: [] }
      )
      return { ...c, flags: extraFlags }
    })
    .map(c => ({ ...c, weight: c.flags.reduce((acc, flag) => acc + getWeight(flag), 0) }))
    .sort((a, b) => b.weight - a.weight)
}

export const spreadsheet2completion = (spreadsheet: SpreadsheetType, pageId: NamespaceId): SpreadsheetCompletion => {
  const name = spreadsheet.name()
  return {
    kind: 'spreadsheet',
    flags: [],
    replacements: [],
    fallbackValue: '',
    weight: 0,
    name,
    preview: spreadsheet,
    namespaceId: spreadsheet.namespaceId
  }
}

const column2completion = (column: ColumnType, pageId: NamespaceId): ColumnCompletion => {
  return {
    kind: 'column',
    replacements: [],
    flags: [],
    fallbackValue: '',
    weight: 0,
    name: column.name,
    preview: column,
    namespaceId: column.namespaceId
  }
}

export const block2completion = (ctx: ContextInterface, block: BlockType, pageId: NamespaceId): BlockCompletion => {
  const name = block.name(pageId)
  const nameWithEncoded = maybeEncodeString(name)[1]
  const replacements: Completion['replacements'] = reverseTraversalString(name).map(m => ({
    matcher: m,
    value: nameWithEncoded
  }))

  return {
    kind: 'block',
    flags: [],
    weight: 0,
    replacements,
    fallbackValue: nameWithEncoded,
    name,
    namespaceId: block.id,
    preview: block
  }
}

export const variable2completion = (variable: VariableInterface, pageId: NamespaceId): VariableCompletion => {
  const name = variable.t.meta.name
  const namespaceName = variable.namespaceName(pageId)
  const fullName = `${namespaceName}.${name}`
  const fallbackValue = pageId === variable.t.meta.namespaceId ? name : fullName

  const baseReplacements: Completion['replacements'] = [
    ...reverseTraversalString(fullName, namespaceName.length).map(m => ({ matcher: m, value: fullName })),
    ...reverseTraversalString(name).map(m => ({ matcher: m, value: fallbackValue }))
  ]

  const currentBlockFullName = `#CurrentBlock.${name}`
  const currentBlockReplacements: Completion['replacements'] = reverseTraversalString(
    currentBlockFullName,
    '#CurrentBlock'.length
  ).map(m => ({ matcher: m, value: currentBlockFullName }))

  // Support `CurrentBlock`
  const replacements =
    pageId === variable.t.meta.namespaceId ? [...currentBlockReplacements, ...baseReplacements] : baseReplacements

  return {
    namespaceId: variable.t.meta.namespaceId,
    kind: 'variable',
    flags: [],
    replacements,
    fallbackValue,
    weight: 0,
    name: variable.t.meta.name,
    preview: variable
  }
}

export const function2completion = (functionClause: AnyFunctionClause, weight: number): FunctionCompletion => {
  // const value: `${FunctionKey}()` = `${functionClause.key}()`
  return {
    kind: 'function',
    // replacements: reverseTraversalString(value),
    replacements: [],
    flags: [],
    fallbackValue: '',
    weight,
    name: functionClause.name,
    preview: functionClause
  }
}

export const attrs2completion = (
  formulaContext: ContextInterface,
  { kind, id, namespaceId }: CodeFragmentAttrs,
  pageId: string
): Completion | undefined => {
  if (kind === 'Variable') {
    const variable = formulaContext.findVariableById(namespaceId, id)
    if (!variable) return undefined
    return variable2completion(variable, pageId)
  }

  return undefined
}
