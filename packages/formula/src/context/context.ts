import { CstNode, ILexingResult } from 'chevrotain'
import { ColumnType, SpreadsheetType, BlockType, RowType } from '../controls'
import {
  ContextInterface,
  NamespaceId,
  VariableDependency,
  VariableId,
  BackendActions,
  VariableInterface,
  FormulaType,
  SpecialDefaultVariableName,
  Completion,
  FunctionNameType,
  FunctionGroup,
  FunctionKey,
  VariableKey,
  DefaultVariableName,
  CodeFragment,
  AnyFunctionClause,
  FunctionCompletion,
  VariableCompletion,
  SpreadsheetCompletion,
  Features,
  AnyTypeResult,
  FunctionContext,
  BlockCompletion,
  ViewType,
  ViewRender,
  View,
  DirtyFormulaInfo,
  Formula,
  DeleteFormula,
  SpreadsheetId,
  NameDependencyWithKind,
  FindKey,
  AnyFunctionClauseWithKeyAndExample,
  VariableDisplayData
} from '../types'
import { variableKey } from '../grammar/convert'
import { buildFunctionKey, BUILTIN_CLAUSES } from '../functions'
import { CodeFragmentVisitor } from '../grammar/codeFragment'
import { FormulaParser } from '../grammar/parser'
import { FormulaLexer } from '../grammar/lexer'
import { MashcardEventBus, EventSubscribed } from '@mashcard/schema'
import { FORMULA_FEATURE_CONTROL } from './features'
import { BlockClass } from '../controls/block'
import { DEFAULT_VIEWS } from '../render'
import {
  FormulaContextTickTrigger,
  FormulaContextNameChanged,
  FormulaContextNameRemove,
  SpreadsheetReloadViaId,
  FormulaBlockNameModifiedWithUsername
} from '../events'
import {
  function2completion,
  block2completion,
  variable2completion,
  spreadsheet2completion
} from '../grammar/completer'
import { dumpDisplayResultForDisplay } from './persist'

export interface FormulaContextArgs {
  domain: string
  tickTimeout?: number
  functionClauses?: AnyFunctionClause[]
  backendActions?: BackendActions
  features?: string[]
}

export type ContextState = any

const matchRegex =
  // eslint-disable-next-line max-len
  /(str|num|bool|record|blank|cst|array|null|date|predicate|reference|literal|spreadsheet|function|column|row|cell|range|button|switch|error|block|var)([0-9]+)$/
export const FormulaTypeCastName: Record<FormulaType, SpecialDefaultVariableName> = {
  string: 'str',
  literal: 'str',
  number: 'num',
  boolean: 'bool',
  void: 'void',
  Blank: 'blank',
  Cst: 'cst',
  Switch: 'switch',
  Button: 'button',
  Predicate: 'predicate',
  Pending: 'pending',
  Waiting: 'waiting',
  NoPersist: 'noPersist',
  Function: 'function',
  Reference: 'reference',
  null: 'null',
  Record: 'record',
  Array: 'array',
  Date: 'date',
  Error: 'error',
  Spreadsheet: 'spreadsheet',
  Column: 'column',
  Range: 'range',
  Row: 'row',
  Cell: 'cell',
  Block: 'block',
  any: 'var'
}

const ReverseCastName = Object.entries(FormulaTypeCastName).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [value]: key
  }),
  {}
) as Record<SpecialDefaultVariableName, FormulaType>

export class FormulaContext implements ContextInterface {
  private static instance?: FormulaContext
  domain: string
  tickKey: string
  tickTimeout: number
  features: Features
  dirtyFormulas: Record<VariableKey, DirtyFormulaInfo> = {}
  variables: Record<VariableKey, VariableInterface> = {}
  viewRenders: Record<ViewType, ViewRender> = {}
  functionWeights: Record<FunctionKey, number> = {}
  variableWeights: Record<VariableKey, number> = {}
  spreadsheets: Record<string, SpreadsheetType> = {}
  names: Record<string, NameDependencyWithKind> = {}
  blocks: Record<string, BlockType> = {}
  variableNameCounter: Record<FormulaType, Record<NamespaceId, number>> = {
    string: {},
    number: {},
    Button: {},
    Switch: {},
    literal: {},
    void: {},
    Function: {},
    boolean: {},
    Blank: {},
    Record: {},
    Predicate: {},
    Cst: {},
    Reference: {},
    Error: {},
    Spreadsheet: {},
    Array: {},
    null: {},
    Date: {},
    Column: {},
    Row: {},
    Cell: {},
    Range: {},
    Block: {},
    Pending: {},
    Waiting: {},
    NoPersist: {},
    any: {}
  }

  reverseVariableDependencies: Record<VariableKey, VariableDependency[]> = {}
  reverseFunctionDependencies: Record<FunctionKey, VariableDependency[]> = {}
  functionClausesMap: Record<FunctionKey, AnyFunctionClauseWithKeyAndExample> = {}
  backendActions: BackendActions | undefined
  reservedNames: string[] = []
  eventListeners: EventSubscribed[] = []

  constructor({
    domain,
    tickTimeout,
    functionClauses = [],
    backendActions,
    features = [FORMULA_FEATURE_CONTROL]
  }: FormulaContextArgs) {
    this.domain = domain
    this.tickTimeout = tickTimeout ?? 1000
    this.tickKey = `FormulaContext#${domain}`
    this.features = features
    if (backendActions) {
      this.backendActions = backendActions
    }

    this.viewRenders = DEFAULT_VIEWS.reduce((o: Record<ViewType, ViewRender>, acc: View) => {
      o[acc.type] = acc.render
      return o
    }, {})

    const blockNameSubscription = MashcardEventBus.subscribe(
      FormulaBlockNameModifiedWithUsername,
      async e => {
        await this.setBlock(e.payload.id, e.payload.meta)
      },
      { subscribeId: `Domain#${this.domain}`, eventId: this.domain }
    )

    this.eventListeners.push(blockNameSubscription)

    const tickSubscription = MashcardEventBus.subscribe(
      FormulaContextTickTrigger,
      async e => {
        await this.tick(e.payload.state)
      },
      {
        eventId: this.tickKey,
        subscribeId: `Domain#${this.domain}`
      }
    )

    this.eventListeners.push(tickSubscription)

    void this.tick(undefined as ContextState)

    const baseFunctionClauses: AnyFunctionClause[] = [...BUILTIN_CLAUSES, ...functionClauses].filter(
      f => !f.feature || this.features.includes(f.feature)
    )

    this.reservedNames = baseFunctionClauses.map(({ name }) => name.toUpperCase())
    this.functionClausesMap = baseFunctionClauses.reduce<Record<FunctionKey, AnyFunctionClauseWithKeyAndExample>>(
      (o, acc) => {
        const clause = { ...acc, key: buildFunctionKey(acc.group, acc.name) }
        o[clause.key] = clause
        return o
      },
      {}
    )
    this.functionClausesMap = baseFunctionClauses.reduce<Record<FunctionKey, AnyFunctionClauseWithKeyAndExample>>(
      (o, acc) => {
        const clause = {
          ...acc,
          key: buildFunctionKey(acc.group, acc.name),
          examples: acc.examples.map(e => ({
            ...e,
            codeFragments: this.parseCodeFragments(e.input)
          })) as AnyFunctionClause['examples']
        }
        o[clause.key] = clause
        return o
      },
      {}
    )
  }

  public cleanup(): void {
    this.eventListeners.forEach(listener => {
      listener.unsubscribe()
    })
    this.eventListeners = []
  }

  public async invoke(name: string, ctx: FunctionContext, ...args: any[]): Promise<AnyTypeResult> {
    const clause = this.functionClausesMap[name]
    if (!clause) {
      return { type: 'Error', result: `Function ${name} not found`, errorKind: 'fatal' }
    }

    return await (clause.reference as (ctx: FunctionContext, ...args: any[]) => Promise<any>)(ctx, ...args)
  }

  public completions(namespaceId: NamespaceId, variableId: VariableId | undefined): Completion[] {
    const functions: FunctionCompletion[] = Object.entries(this.functionClausesMap).map(([key, f]) => {
      const weight: number = this.functionWeights[key as FunctionKey] || 0
      return function2completion(f, weight)
    })
    const completionVariables: Array<[string, VariableInterface]> = Object.entries(this.variables).filter(
      ([key, c]) => c.t.meta.variableId !== variableId && c.t.meta.richType.type === 'normal'
    )
    const variables: VariableCompletion[] = completionVariables.map(([key, v]) => {
      return variable2completion(v, namespaceId)
    })
    const spreadsheets: SpreadsheetCompletion[] = Object.values(this.spreadsheets).map(spreadsheet => {
      return spreadsheet2completion(spreadsheet!, namespaceId)
    })

    const blocks: BlockCompletion[] = Object.values(this.blocks).map(b => {
      return block2completion(this, b, namespaceId)
    })

    return [...functions, ...variables, ...blocks, ...spreadsheets].sort((a, b) => b.weight - a.weight)
  }

  public getDefaultVariableName(namespaceId: NamespaceId, type: FormulaType): DefaultVariableName {
    const oldCounter = this.variableNameCounter[type][namespaceId] || 0
    return `${FormulaTypeCastName[type]}${oldCounter + 1}`
  }

  public variableCount(): number {
    return Object.keys(this.variables).length
  }

  public findViewRender(viewType: ViewType): ViewRender | undefined {
    return this.viewRenders[viewType]
  }

  public findBlockById(blockId: NamespaceId): BlockType | undefined {
    return this.blocks[blockId]
  }

  public findReference(namespaceId: NamespaceId, variableId: VariableId): VariableDependency[] {
    const dependencyKey = variableKey(namespaceId, variableId)
    return this.reverseVariableDependencies[dependencyKey] ?? []
  }

  private async setBlock(blockId: NamespaceId, name: string): Promise<void> {
    if (this.blocks[blockId]) return
    const block = new BlockClass(this, { id: blockId, name })
    this.blocks[blockId] = block
    await this.setName(block.nameDependency())
  }

  public async removeBlock(blockId: NamespaceId): Promise<void> {
    const block = this.blocks[blockId]
    if (!block) return
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.blocks[blockId]

    await block.cleanup()
  }

  public findNames(namespaceId: NamespaceId, name: string): NameDependencyWithKind[] {
    if (!name) return []
    return Object.values(this.names).filter(
      n => n.name.toUpperCase() === name.toUpperCase() && (n.kind === 'Block' || n.namespaceId === namespaceId)
    )
  }

  public async setName(nameDependency: NameDependencyWithKind): Promise<void> {
    const oldName = this.names[nameDependency.id]
    this.names[nameDependency.id] = nameDependency
    if (oldName && oldName.name === nameDependency.name) return

    const result = MashcardEventBus.dispatch(
      FormulaContextNameChanged({
        id: nameDependency.id,
        namespaceId: nameDependency.namespaceId,
        key: nameDependency.id,
        username: this.domain,
        scope: null,
        meta: {
          name: nameDependency.name,
          kind: nameDependency.kind
        }
      })
    )
    await Promise.all(result)
  }

  public async removeName(id: NamespaceId): Promise<void> {
    const oldName = this.names[id]
    if (!oldName) return
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.names[id]

    const result = MashcardEventBus.dispatch(
      FormulaContextNameRemove({
        id: oldName.id,
        namespaceId: oldName.namespaceId,
        key: oldName.id,
        username: this.domain,
        scope: null,
        meta: {
          name: oldName.name,
          kind: oldName.kind
        }
      })
    )
    await Promise.all(result)
  }

  public findSpreadsheet({ namespaceId, type, value }: FindKey): SpreadsheetType | undefined {
    if (type === 'id') {
      return this.spreadsheets[value]
    } else {
      return Object.values(this.spreadsheets).find(
        s => s!.namespaceId === namespaceId && s!.name().toUpperCase() === value.toUpperCase()
      )
    }
  }

  public findColumn(spreadsheetId: SpreadsheetId, key: FindKey): ColumnType | undefined {
    const spreadsheet = this.findSpreadsheet({ namespaceId: key.namespaceId, type: 'id', value: spreadsheetId })
    if (!spreadsheet) return undefined
    return spreadsheet.findColumn(key)
  }

  public findRow(spreadsheetId: SpreadsheetId, key: FindKey): RowType | undefined {
    const spreadsheet = this.findSpreadsheet({ namespaceId: key.namespaceId, type: 'id', value: spreadsheetId })
    if (!spreadsheet) return undefined
    return spreadsheet.findRow(key)
  }

  public async setSpreadsheet(spreadsheet: SpreadsheetType): Promise<void> {
    if (this.spreadsheets[spreadsheet.spreadsheetId]) return

    this.spreadsheets[spreadsheet.spreadsheetId] = spreadsheet
    // this.setBlock(spreadsheet.namespaceId, '')
    await this.setName(spreadsheet.nameDependency())
    const result = MashcardEventBus.dispatch(
      SpreadsheetReloadViaId({
        id: spreadsheet.spreadsheetId,
        namespaceId: spreadsheet.namespaceId,
        username: this.domain,
        scope: null,
        meta: null,
        key: spreadsheet.spreadsheetId
      })
    )
    await Promise.all(result)
  }

  public async removeSpreadsheet(spreadsheetId: SpreadsheetId): Promise<void> {
    if (!this.spreadsheets[spreadsheetId]) return
    this.spreadsheets[spreadsheetId].cleanup()
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.spreadsheets[spreadsheetId]
    await this.removeName(spreadsheetId)
  }

  public findVariableById(namespaceId: NamespaceId, variableId: VariableId): VariableInterface | undefined {
    return this.variables[variableKey(namespaceId, variableId)]
  }

  public findVariableDisplayDataById(
    namespaceId: NamespaceId,
    variableId: VariableId
  ): VariableDisplayData | undefined {
    const variable = this.findVariableById(namespaceId, variableId)
    if (!variable) return undefined
    return dumpDisplayResultForDisplay(variable.t)
  }

  public findVariableByName(namespaceId: NamespaceId, name: string): VariableInterface | undefined {
    const v = Object.values(this.variables).find(
      v => v.t.meta.namespaceId === namespaceId && v.t.meta.name.toUpperCase() === name.toUpperCase()
    )
    return v
  }

  public listVariables(namespaceId: NamespaceId): VariableInterface[] {
    return Object.values(this.variables).filter(v => v.t.meta.namespaceId === namespaceId)
  }

  public async commitVariable({ variable }: { variable: VariableInterface }): Promise<void> {
    const { namespaceId, variableId } = variable.t.meta
    const oldVariable = this.findVariableById(namespaceId, variableId)

    // 1. clear old dependencies
    if (oldVariable) {
      await oldVariable.cleanup()
    }

    variable.isNew = false

    // 2. replace variable object
    this.variables[variableKey(namespaceId, variableId)] = variable

    // 3. update name counter
    const match = variable.t.meta.name.match(matchRegex)
    if (match) {
      const [, defaultName, count] = match
      const realName = ReverseCastName[defaultName as SpecialDefaultVariableName]
      this.variableNameCounter[realName][namespaceId] = Math.max(
        this.variableNameCounter[realName][namespaceId] || 0,
        Number(count)
      )
    }

    // 4. track dependencies
    await variable.trackDependency()

    // 5. Persist
    await variable.onUpdate({})
  }

  public async removeVariable(namespaceId: NamespaceId, variableId: VariableId): Promise<void> {
    const key = variableKey(namespaceId, variableId)
    if (!this.variables[key]) return
    await this.removeName(variableId)
    const variable = this.variables[key]
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.variables[key]
    await variable.cleanup()
    await variable.onUpdate({})
  }

  public findFunctionClause(
    group: FunctionGroup,
    name: FunctionNameType
  ): AnyFunctionClauseWithKeyAndExample | undefined {
    return this.functionClausesMap[buildFunctionKey(group, name)]
  }

  public resetFormula(): void {
    this.variables = {}
    this.spreadsheets = {}
    this.blocks = {}
    this.reverseVariableDependencies = {}
    this.reverseFunctionDependencies = {}
  }

  private async tick(state: ContextState): Promise<void> {
    await this.commitDirty()
    const newState = state
    await new Promise(resolve => setTimeout(resolve, this.tickTimeout))
    MashcardEventBus.dispatch(FormulaContextTickTrigger({ domain: this.domain, state: newState }))
  }

  private async commitDirty(): Promise<void> {
    if (!this.backendActions) {
      this.dirtyFormulas = {}
      return
    }
    const commitFormulas: Formula[] = []
    const deleteFormulas: DeleteFormula[] = []
    const commitVariables: VariableInterface[] = []
    Object.entries(this.dirtyFormulas).forEach(([key, value]) => {
      const [namespaceId, variableId] = key.slice(1).split('.')
      const variable = this.findVariableById(namespaceId, variableId)
      if (variable) {
        commitFormulas.push(variable.buildFormula())
        commitVariables.push(variable)
      } else {
        deleteFormulas.push({ blockId: namespaceId, id: variableId })
      }
    })
    if (commitFormulas.length > 0 || deleteFormulas.length > 0) {
      // console.log('commit dirty', commitFormulas, deleteFormulas, this.backendActions)
      const { success } = await this.backendActions.commit(commitFormulas, deleteFormulas)
      if (success) {
        this.dirtyFormulas = {}
      } else {
        console.error('commit dirty failed')
      }
    }
  }

  private parseCodeFragments(input: string): CodeFragment[] {
    const lexResult: ILexingResult = FormulaLexer.tokenize(input)
    if (lexResult.errors.length > 0) {
      return []
    }
    const parser = new FormulaParser()
    const codeFragmentVisitor = new CodeFragmentVisitor({
      ctx: {
        formulaContext: this,
        meta: { name: 'unknown', input, namespaceId: '', variableId: '', position: 0, richType: { type: 'normal' } },
        interpretContext: { ctx: {}, arguments: [] }
      }
    })
    const tokens = lexResult.tokens
    parser.input = tokens

    const cst: CstNode = parser.startExpression()
    const { codeFragments }: { codeFragments: CodeFragment[] } = codeFragmentVisitor.visit(cst, { type: 'any' }) ?? {
      codeFragments: []
    }

    return codeFragments
  }

  public static getInstance(args: FormulaContextArgs): FormulaContext {
    if (this.instance === undefined) {
      this.instance = new FormulaContext(args)
    }
    return this.instance
  }
}
