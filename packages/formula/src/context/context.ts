import { devWarning } from '@mashcard/design-system'
import { EventSubscribed, MashcardEventBus } from '@mashcard/schema'
import { CstNode, ILexingResult } from 'chevrotain'
import { BlockType, ColumnType, RowType, SpreadsheetType } from '../controls'
import { BlockClass } from '../controls/block'
import {
  FormulaBlockNameModifiedWithUsername,
  FormulaContextNameChanged,
  FormulaContextNameRemove,
  FormulaContextTickTrigger,
  SpreadsheetReloadViaId
} from '../events'
import { buildFunctionKey, BUILTIN_CLAUSES } from '../functions'
import { defaultI18n } from '../grammar'
import { CodeFragmentVisitor } from '../grammar/codeFragment'
import {
  block2completion,
  function2completion,
  spreadsheet2completion,
  variable2completion
} from '../grammar/completer'
import { variableKey } from '../grammar/convert'
import { checkValidName, FormulaLexer } from '../grammar/lexer'
import { FormulaParser } from '../grammar/parser'
import { DEFAULT_VIEWS } from '../render'
import { variableNameStore } from '../states'
import {
  AnyFunctionClause,
  AnyFunctionClauseWithKeyAndExample,
  AnyTypeResult,
  BackendActions,
  BlockCompletion,
  CodeFragment,
  CodeFragmentWithIndex,
  Completion,
  ContextInterface,
  DeleteFormula,
  DirtyFormulaInfo,
  ErrorMessage,
  Features,
  FindKey,
  Formula,
  FormulaType,
  FunctionCompletion,
  FunctionContext,
  FunctionGroup,
  FunctionKey,
  FunctionNameType,
  I18N,
  NameDependencyWithKind,
  NamespaceId,
  SpreadsheetCompletion,
  SpreadsheetId,
  VariableCompletion,
  VariableDependency,
  VariableDisplayData,
  VariableId,
  VariableInterface,
  VariableKey,
  VariableRichType,
  View,
  ViewRender,
  ViewType
} from '../type'
import { FORMULA_FEATURE_CONTROL } from './features'
import { dumpDisplayResultForDisplay } from './persist'

export interface FormulaContextArgs {
  username: string
  i18n?: I18N
  tickTimeout?: number
  functionClauses?: AnyFunctionClause[]
  backendActions?: BackendActions
  features?: string[]
}

export type ContextState = any

export class FormulaContext implements ContextInterface {
  private static instance?: FormulaContext
  options: FormulaContextArgs
  username: string
  i18n: I18N
  tickKey: string
  features: Features
  dirtyFormulas: Record<VariableKey, DirtyFormulaInfo> = {}
  variables: Record<VariableKey, VariableInterface> = {}
  viewRenders: Record<ViewType, ViewRender> = {}
  functionWeights: Record<FunctionKey, number> = {}
  variableWeights: Record<VariableKey, number> = {}
  spreadsheets: Record<string, SpreadsheetType> = {}
  names: Record<string, NameDependencyWithKind> = {}
  blocks: Record<string, BlockType> = {}

  reverseVariableDependencies: Record<VariableKey, VariableDependency[]> = {}
  reverseFunctionDependencies: Record<FunctionKey, VariableDependency[]> = {}
  functionClausesMap: Record<FunctionKey, AnyFunctionClauseWithKeyAndExample> = {}
  reservedNames: string[] = []
  eventListeners: EventSubscribed[] = []
  variableNameStore: typeof variableNameStore = variableNameStore

  constructor(options: FormulaContextArgs) {
    this.options = options

    const { username, i18n, functionClauses = [], features = [FORMULA_FEATURE_CONTROL] } = options

    this.username = username
    this.tickKey = `FormulaContext#${username}`
    this.features = features

    this.i18n = i18n ?? defaultI18n

    this.viewRenders = DEFAULT_VIEWS.reduce((o: Record<ViewType, ViewRender>, acc: View) => {
      o[acc.type] = acc.render
      return o
    }, {})

    const blockNameSubscription = MashcardEventBus.subscribe(
      FormulaBlockNameModifiedWithUsername,
      async e => {
        await this.setBlock(e.payload.id, e.payload.meta)
      },
      { subscribeId: `Domain#${this.username}`, eventId: this.username }
    )

    this.eventListeners.push(blockNameSubscription)

    const tickSubscription = MashcardEventBus.subscribe(
      FormulaContextTickTrigger,
      async e => {
        await this.tick(e.payload.state)
      },
      { eventId: this.tickKey, subscribeId: `Domain#${this.username}` }
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
      return {
        type: 'Error',
        result: { message: ['errors.parse.not_found.function', { key: name }], type: 'fatal' }
      }
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

  public getDefaultVariableName(namespaceId: NamespaceId, type: FormulaType): string {
    return this.variableNameStore.getState().getDefaultVariableName(namespaceId, type)
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

  public checkName(name: string, namespaceId: NamespaceId, variableId: VariableId): ErrorMessage | undefined {
    if (!checkValidName(name)) {
      return { message: 'errors.parse.name.invalid', type: 'name_invalid' }
    }
    if (this.reservedNames.includes(name.toUpperCase())) {
      return { message: 'errors.parse.name.reserved', type: 'name_check' }
    }
    const sameNameVariable = this.findNames(namespaceId, name).filter(v => v.id !== variableId)[0]

    if (sameNameVariable) {
      return { message: 'errors.parse.name.duplicated', type: 'name_unique' }
    }
    return undefined
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
        username: this.username,
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
        username: this.username,
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
    await this.setName(spreadsheet.nameDependency())
    const result = MashcardEventBus.dispatch(
      SpreadsheetReloadViaId({
        id: spreadsheet.spreadsheetId,
        namespaceId: spreadsheet.namespaceId,
        username: this.username,
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

  public findVariableByCellMeta(
    meta: Extract<VariableRichType, { type: 'spreadsheet' }>['meta']
  ): VariableInterface | undefined {
    return Object.values(this.variables).find(
      v => v.t.meta.richType.type === 'spreadsheet' && JSON.stringify(v.t.meta.richType.meta) === JSON.stringify(meta)
    )
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
    this.variableNameStore.getState().maybeAddVariableName(variable.t.meta.name, namespaceId)

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
    await new Promise(resolve => setTimeout(resolve, this.options.tickTimeout))
    MashcardEventBus.dispatch(FormulaContextTickTrigger({ username: this.username, state: newState }))
  }

  private async commitDirty(): Promise<void> {
    if (!this.options.backendActions) {
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
      // console.log('commit dirty', commitFormulas, deleteFormulas, this.options.backendActions)
      const { success } = await this.options.backendActions.commit(commitFormulas, deleteFormulas)
      if (success) {
        this.dirtyFormulas = {}
      } else {
        devWarning(true, 'commit dirty failed')
      }
    }
  }

  private parseCodeFragments(input: string): CodeFragmentWithIndex[] {
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

    return codeFragments.map((c, index) => ({ ...c, index }))
  }

  public static getFormulaInstance(args: FormulaContextArgs): FormulaContext {
    if (this.instance === undefined) {
      this.instance = new FormulaContext(args)
    }
    return this.instance
  }
}
