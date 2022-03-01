import { CstNode, ILexingResult } from 'chevrotain'
import { ColumnType, SpreadsheetType, ColumnClass, ColumnInitializer } from '../controls'
import {
  ContextInterface,
  FunctionClause,
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
  ExampleWithCodeFragments,
  BaseFunctionClause,
  BaseFunctionClauseWithKey,
  FunctionCompletion,
  VariableCompletion,
  SpreadsheetCompletion,
  ColumnCompletion,
  Features,
  FormulaName,
  AnyTypeResult,
  FunctionContext,
  BlockCompletion,
  BlockFormulaName,
  SpreadsheetResult,
  ColumnName
} from '../types'
import {
  function2completion,
  spreadsheet2completion,
  variable2completion,
  variableKey,
  column2completion,
  block2completion,
  block2name,
  spreadsheet2name
} from '../grammar/convert'
import { FORMULA_PARSER_VERSION } from '../version'
import { buildFunctionKey, BUILTIN_CLAUSES } from '../functions'
import { CodeFragmentVisitor } from '../grammar/codeFragment'
import { FormulaParser } from '../grammar/parser'
import { FormulaLexer } from '../grammar/lexer'
import { BlockNameLoad, BlockSpreadsheetLoaded, BrickdocEventBus } from '@brickdoc/schema'
import { FORMULA_FEATURE_CONTROL } from './features'
import { BlockClass } from '../controls/block'

export interface FormulaContextArgs {
  functionClauses?: Array<BaseFunctionClause<any>>
  backendActions?: BackendActions
  formulaNames?: FormulaName[]
  features?: string[]
}

const matchRegex =
  // eslint-disable-next-line max-len
  /(str|num|bool|record|blank|cst|array|null|void|date|predicate|reference|spreadsheet|function|column|button|switch|select|slider|input|radio|rate|error|block|var)([0-9]+)$/
export const FormulaTypeCastName: Record<FormulaType, SpecialDefaultVariableName> = {
  string: 'str',
  number: 'num',
  boolean: 'bool',
  void: 'void',
  Blank: 'blank',
  Cst: 'cst',
  Switch: 'switch',
  Select: 'select',
  Slider: 'slider',
  Input: 'input',
  Radio: 'radio',
  Rate: 'rate',
  Button: 'button',
  Predicate: 'predicate',
  Function: 'function',
  Reference: 'reference',
  null: 'null',
  Record: 'record',
  Array: 'array',
  Date: 'date',
  Error: 'error',
  Spreadsheet: 'spreadsheet',
  Column: 'column',
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
  features: Features
  context: Record<VariableKey, VariableInterface> = {}
  functionWeights: Record<FunctionKey, number> = {}
  variableWeights: Record<VariableKey, number> = {}
  spreadsheets: Record<NamespaceId, SpreadsheetType> = {}
  variableNameCounter: Record<FormulaType, Record<NamespaceId, number>> = {
    string: {},
    number: {},
    Button: {},
    Switch: {},
    void: {},
    Select: {},
    Slider: {},
    Input: {},
    Radio: {},
    Rate: {},
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
    Block: {},
    any: {}
  }

  reverseVariableDependencies: Record<VariableKey, VariableDependency[]> = {}
  reverseFunctionDependencies: Record<FunctionKey, VariableDependency[]> = {}
  functionClausesMap: Record<FunctionKey, FunctionClause<any>>
  backendActions: BackendActions | undefined
  reservedNames: string[] = []
  formulaNames: FormulaName[] = []

  constructor({
    functionClauses = [],
    backendActions,
    formulaNames,
    features = [FORMULA_FEATURE_CONTROL]
  }: FormulaContextArgs) {
    this.features = features
    if (backendActions) {
      this.backendActions = backendActions
    }

    if (formulaNames) {
      this.formulaNames = formulaNames
    }

    BrickdocEventBus.subscribe(BlockNameLoad, e => {
      const namespaceId = e.payload.id
      const name = e.payload.name || 'Untitled'
      const block = new BlockClass(this, { id: namespaceId })
      this.formulaNames = this.formulaNames
        .filter(n => !(n.kind === 'Block' && n.key === namespaceId))
        .concat({ ...block2name(block), name })
    })

    const baseFunctionClauses: Array<BaseFunctionClause<any>> = [...BUILTIN_CLAUSES, ...functionClauses].filter(
      f => !f.feature || this.features.includes(f.feature)
    )

    this.reservedNames = baseFunctionClauses.map(({ name }) => name.toUpperCase())
    this.functionClausesMap = baseFunctionClauses.reduce(
      (o: Record<FunctionKey, BaseFunctionClauseWithKey<any>>, acc: BaseFunctionClause<any>) => {
        const clause: BaseFunctionClauseWithKey<any> = {
          ...acc,
          key: buildFunctionKey(acc.group, acc.name)
        }
        o[clause.key] = clause
        return o
      },
      {}
    ) as Record<FunctionKey, FunctionClause<any>>

    this.functionClausesMap = Object.values(this.functionClausesMap).reduce(
      (o: Record<FunctionKey, FunctionClause<any>>, acc: FunctionClause<any>) => {
        o[acc.key] = {
          ...acc,
          examples: acc.examples.map(e => ({ ...e, codeFragments: this.parseCodeFragments(e.input) })) as [
            ExampleWithCodeFragments<any>,
            ...Array<ExampleWithCodeFragments<any>>
          ]
        }
        return o
      },
      {}
    )
  }

  public async invoke(name: string, ctx: FunctionContext, ...args: any[]): Promise<AnyTypeResult> {
    const clause = this.functionClausesMap[name]
    if (!clause) {
      return { type: 'Error', result: `Function ${name} not found`, errorKind: 'fatal' }
    }

    return await clause.reference(ctx, ...args)
  }

  public completions(namespaceId: NamespaceId, variableId: VariableId | undefined): Completion[] {
    const functions: FunctionCompletion[] = Object.entries(this.functionClausesMap).map(([key, f]) => {
      const weight: number = this.functionWeights[key as FunctionKey] || 0
      return function2completion(f, weight)
    })
    const completionVariables: Array<[string, VariableInterface]> = Object.entries(this.context).filter(
      ([key, c]) => c.t.variableId !== variableId && c.t.type === 'normal'
    )
    const variables: VariableCompletion[] = completionVariables.map(([key, v]) => {
      return variable2completion(v, namespaceId)
    })
    const spreadsheets: SpreadsheetCompletion[] = Object.entries(this.spreadsheets).map(([key, spreadsheet]) => {
      return spreadsheet2completion(spreadsheet, namespaceId)
    })

    const blocks: BlockCompletion[] = this.formulaNames
      .filter(f => f.kind === 'Block')
      .map(f => {
        return block2completion(this, f as BlockFormulaName, namespaceId)
      })

    const columns: ColumnCompletion[] = Object.entries(this.spreadsheets).flatMap(([key, spreadsheet]) => {
      return spreadsheet
        .listColumns()
        .map(column => column2completion(new ColumnClass(spreadsheet, column), namespaceId))
    })

    const dynamicColumns: ColumnCompletion[] = completionVariables
      .filter(([key, v]) => {
        return v.t.variableValue.result.type === 'Spreadsheet' && v.t.variableValue.result.result.dynamic
      })
      .flatMap(([key, v]) => {
        const result = v.t.variableValue.result as SpreadsheetResult
        return result.result
          .listColumns()
          .map((column: ColumnInitializer) => column2completion(new ColumnClass(result.result, column), namespaceId))
      })
    return [...functions, ...variables, ...blocks, ...spreadsheets, ...columns, ...dynamicColumns].sort(
      (a, b) => b.weight - a.weight
    )
  }

  public getDefaultVariableName(namespaceId: NamespaceId, type: FormulaType): DefaultVariableName {
    const oldCounter = this.variableNameCounter[type][namespaceId] || 0
    return `${FormulaTypeCastName[type]}${oldCounter + 1}`
  }

  public variableCount(): number {
    return Object.keys(this.context).length
  }

  public findSpreadsheet(namespaceId: NamespaceId): SpreadsheetType | undefined {
    return this.spreadsheets[namespaceId]
  }

  public findFormulaName(namespaceId: NamespaceId): FormulaName | undefined {
    return this.formulaNames.find(f => f.key === namespaceId)
  }

  public findColumnById(namespaceId: NamespaceId, variableId: VariableId): ColumnType | undefined {
    const spreadsheet = this.findSpreadsheet(namespaceId)
    if (!spreadsheet) {
      return undefined
    }

    const column = spreadsheet.getColumnById(variableId)

    if (!column) {
      return undefined
    }

    return new ColumnClass(spreadsheet, column)
  }

  public findColumnByName(namespaceId: NamespaceId, name: ColumnName): ColumnType | undefined {
    const spreadsheet = this.findSpreadsheet(namespaceId)
    if (!spreadsheet) {
      return undefined
    }

    const column = spreadsheet.getColumnByName(name)

    if (!column) {
      return undefined
    }

    return new ColumnClass(spreadsheet, column)
  }

  public setSpreadsheet(spreadsheet: SpreadsheetType): void {
    this.spreadsheets[spreadsheet.blockId] = spreadsheet
    this.formulaNames = this.formulaNames
      .filter(n => !(n.kind === 'Spreadsheet' && n.key === spreadsheet.blockId))
      .concat(spreadsheet2name(spreadsheet))
    BrickdocEventBus.dispatch(BlockSpreadsheetLoaded({ id: spreadsheet.blockId }))
  }

  public removeSpreadsheet(namespaceId: NamespaceId): void {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.spreadsheets[namespaceId]
  }

  public findVariable(namespaceId: NamespaceId, variableId: VariableId): VariableInterface | undefined {
    return this.context[variableKey(namespaceId, variableId)]
  }

  public findVariableByName(namespaceId: NamespaceId, name: string): VariableInterface | undefined {
    return Object.values(this.context).find(v => v.t.namespaceId === namespaceId && v.t.name === name)
  }

  public listVariables(namespaceId: NamespaceId): VariableInterface[] {
    return Object.values(this.context).filter(v => v.t.namespaceId === namespaceId)
  }

  public async commitVariable({ variable }: { variable: VariableInterface }): Promise<void> {
    const { namespaceId, variableId } = variable.t
    const oldVariable = this.findVariable(namespaceId, variableId)

    // 1. clear old dependencies
    if (oldVariable) {
      oldVariable.clearDependency()
    }

    // 2. replace variable object
    this.context[variableKey(namespaceId, variableId)] = variable

    // 3. track dependencies
    variable.trackDependency()

    // 4. update name counter
    const match = variable.t.name.match(matchRegex)
    if (match) {
      const [, defaultName, count] = match
      const realName = ReverseCastName[defaultName as SpecialDefaultVariableName]
      this.variableNameCounter[realName][namespaceId] = Math.max(
        this.variableNameCounter[realName][namespaceId] || 0,
        Number(count)
      )
    }

    // 5. persist
    if (oldVariable) {
      await variable.invokeBackendUpdate()
    } else {
      if (variable.t.version < FORMULA_PARSER_VERSION) {
        await variable.interpret({ ctx: {}, arguments: [] })
      }
      await variable.invokeBackendCreate()
    }

    // 6. broadcast update
    variable.afterUpdate()
  }

  public async removeVariable(namespaceId: NamespaceId, variableId: VariableId): Promise<void> {
    const key = variableKey(namespaceId, variableId)
    const variable = this.context[key]
    if (variable) {
      variable.clearDependency()
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this.context[key]

      this.formulaNames = this.formulaNames.filter(n => !(n.kind === 'Variable' && n.key === variableId))

      if (this.backendActions) {
        await this.backendActions.deleteVariable(variable.buildFormula())
      }

      variable.afterUpdate()
    }
  }

  public findFunctionClause(group: FunctionGroup, name: FunctionNameType): FunctionClause<any> | undefined {
    return this.functionClausesMap[buildFunctionKey(group, name)]
  }

  public resetFormula(): void {
    this.context = {}
    this.formulaNames = []
    this.reverseVariableDependencies = {}
    this.reverseFunctionDependencies = {}
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
        meta: { name: 'unknown', input, namespaceId: '', variableId: '', position: 0, type: 'normal' },
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
}
