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
  SpreadsheetResult
} from '../types'
import {
  function2completion,
  spreadsheet2completion,
  variable2completion,
  variableKey,
  blockKey,
  column2completion,
  block2completion
} from './util'
import { FORMULA_PARSER_VERSION } from '../version'
import { buildFunctionKey, BUILTIN_CLAUSES } from '../functions'
import { CodeFragmentVisitor } from '../grammar/codeFragment'
import { FormulaParser } from '../grammar/parser'
import { FormulaLexer } from '../grammar/lexer'
import { BlockNameLoad, BlockSpreadsheetLoaded, BrickdocEventBus, FormulaInnerRefresh } from '@brickdoc/schema'
import { FORMULA_FEATURE_CONTROL } from './features'

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
  blocks: Record<NamespaceId, 'Block' | 'Spreadsheet'> = {}
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

  public invoke = async (name: string, ctx: FunctionContext, ...args: any[]): Promise<AnyTypeResult> => {
    const clause = this.functionClausesMap[name]
    if (!clause) {
      return { type: 'Error', result: `Function ${name} not found`, errorKind: 'fatal' }
    }

    return await clause.reference(ctx, ...args)
  }

  public completions = (namespaceId: NamespaceId, variableId: VariableId | undefined): Completion[] => {
    const functions: FunctionCompletion[] = Object.entries(this.functionClausesMap).map(([key, f]) => {
      const weight: number = this.functionWeights[key as FunctionKey] || 0
      return function2completion(f, weight)
    })
    const completionVariables: Array<[string, VariableInterface]> = Object.entries(this.context).filter(
      ([key, c]) => c.t.variableId !== variableId
    )
    const variables: VariableCompletion[] = completionVariables.map(([key, v]) => {
      const weight: number = this.variableWeights[key as VariableKey] || 0
      return variable2completion(v, v.t.namespaceId === namespaceId ? weight + 1 : weight - 1)
    })
    const spreadsheets: SpreadsheetCompletion[] = Object.entries(this.spreadsheets).map(([key, spreadsheet]) => {
      return spreadsheet2completion(spreadsheet)
    })

    const blocks: BlockCompletion[] = this.formulaNames
      .filter(f => f.kind === 'Block')
      .map(f => {
        return block2completion(this, f as BlockFormulaName, f.key === namespaceId ? 1 : -1)
      })

    const columns: ColumnCompletion[] = Object.entries(this.spreadsheets).flatMap(([key, spreadsheet]) => {
      return spreadsheet.listColumns().map(column => column2completion({ ...column, spreadsheet }))
    })

    const dynamicColumns: ColumnCompletion[] = completionVariables
      .filter(([key, v]) => {
        return v.t.variableValue.result.type === 'Spreadsheet' && v.t.variableValue.result.result.dynamic
      })
      .flatMap(([key, v]) => {
        const result = v.t.variableValue.result as SpreadsheetResult
        return result.result
          .listColumns()
          .map((column: ColumnInitializer) => column2completion({ ...column, spreadsheet: result.result }))
      })
    return [...functions, ...variables, ...blocks, ...spreadsheets, ...columns, ...dynamicColumns].sort(
      (a, b) => b.weight - a.weight
    )
  }

  public getDefaultVariableName = (namespaceId: NamespaceId, type: FormulaType): DefaultVariableName => {
    const oldCounter = this.variableNameCounter[type][namespaceId] || 0
    return `${FormulaTypeCastName[type]}${oldCounter + 1}`
  }

  public variableCount = (): number => {
    return Object.keys(this.context).length
  }

  public findSpreadsheet = (namespaceId: NamespaceId): SpreadsheetType | undefined => {
    return this.spreadsheets[namespaceId]
  }

  public findColumn = (namespaceId: NamespaceId, variableId: VariableId): ColumnType | undefined => {
    const spreadsheet = this.findSpreadsheet(namespaceId)
    if (!spreadsheet) {
      return undefined
    }

    const column = spreadsheet.getColumn(variableId)

    if (!column) {
      return undefined
    }

    return new ColumnClass(spreadsheet, column)
  }

  public setSpreadsheet = (spreadsheet: SpreadsheetType): void => {
    this.formulaNames = this.formulaNames
      .filter(n => !(n.kind === 'Spreadsheet' && n.key === spreadsheet.blockId))
      .concat({
        kind: 'Spreadsheet',
        namespaceId: spreadsheet.blockId,
        name: spreadsheet.name(),
        value: blockKey(spreadsheet.blockId),
        render: () => blockKey(spreadsheet.blockId),
        prefixLength: () => 0,
        key: spreadsheet.blockId
      })
    this.blocks[spreadsheet.blockId] = 'Spreadsheet'
    this.spreadsheets[spreadsheet.blockId] = spreadsheet
  }

  public removeSpreadsheet = (namespaceId: NamespaceId): void => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.spreadsheets[namespaceId]
  }

  public findVariable = (namespaceId: NamespaceId, variableId: VariableId): VariableInterface | undefined => {
    return this.context[variableKey(namespaceId, variableId)]
  }

  public listVariables = (namespaceId: NamespaceId): VariableInterface[] => {
    return Object.values(this.context).filter(v => v.t.namespaceId === namespaceId)
  }

  // TODO flattenVariableDependencies
  public clearDependency = (namespaceId: NamespaceId, variableId: VariableId): void => {
    const variable = this.findVariable(namespaceId, variableId)
    if (variable) {
      variable.t.variableDependencies.forEach(dependency => {
        const dependencyKey = variableKey(dependency.namespaceId, dependency.variableId)
        const variableDependencies = this.reverseVariableDependencies[dependencyKey]
          ? this.reverseVariableDependencies[dependencyKey].filter(
              x => !(x.namespaceId === namespaceId && x.variableId === variableId)
            )
          : []
        this.reverseVariableDependencies[dependencyKey] = [...variableDependencies]
      })

      variable.t.functionDependencies.forEach(dependency => {
        const dependencyKey = dependency.key
        const functionDependencies = this.reverseFunctionDependencies[dependencyKey]
          ? this.reverseFunctionDependencies[dependencyKey].filter(
              x => !(x.namespaceId === namespaceId && x.variableId === variableId)
            )
          : []
        this.reverseFunctionDependencies[dependencyKey] = [...functionDependencies]
      })
    }
  }

  // TODO refresh flattenVariableDependencies
  // TODO update other variable's level
  public trackDependency = (variable: VariableInterface): void => {
    const {
      t: { variableDependencies, blockDependencies, namespaceId, name, variableId, functionDependencies }
    } = variable
    BrickdocEventBus.subscribe(
      BlockNameLoad,
      e => {
        const name = e.payload.name || 'Untitled'
        this.formulaNames = this.formulaNames
          .filter(n => !(n.kind === 'Block' && n.key === namespaceId))
          .concat({
            kind: 'Block',
            name,
            namespaceId,
            value: blockKey(namespaceId),
            render: () => blockKey(namespaceId),
            prefixLength: () => 0,
            key: namespaceId
          })
      },
      { eventId: namespaceId, subscribeId: variableId }
    )

    const render = (exist: boolean): string => (exist ? variableId : variableKey(namespaceId, variableId))
    const key = variableId
    const value = variableKey(namespaceId, variableId)
    this.formulaNames = this.formulaNames
      .filter(n => !(n.kind === 'Variable' && n.key === key))
      .concat({
        kind: 'Variable',
        name,
        render,
        key,
        value,
        namespaceId,
        prefixLength: exist => (exist ? 0 : variable.namespaceName().length + 1)
      })
    if (!this.formulaNames.find(n => n.kind === 'Block' && n.key === namespaceId)) {
      this.formulaNames.push({
        kind: 'Block',
        name: 'Untitled',
        namespaceId,
        value: blockKey(namespaceId),
        render: () => blockKey(namespaceId),
        prefixLength: () => 0,
        key: namespaceId
      })
    }
    this.blocks[namespaceId] = 'Block'

    BrickdocEventBus.subscribe(
      FormulaInnerRefresh,
      e => {
        void variable.updateAndPersist()
      },
      { eventId: `${namespaceId},${variableId}`, subscribeId: variableId }
    )

    blockDependencies.forEach(blockId => {
      BrickdocEventBus.subscribe(
        BlockSpreadsheetLoaded,
        e => {
          variable.reparse()
        },
        { eventId: blockId, subscribeId: variableId }
      )
    })

    variableDependencies.forEach(dependency => {
      const dependencyKey = variableKey(dependency.namespaceId, dependency.variableId)
      this.reverseVariableDependencies[dependencyKey] ||= []
      this.reverseVariableDependencies[dependencyKey] = [
        ...this.reverseVariableDependencies[dependencyKey],
        { namespaceId, variableId }
      ]
    })

    functionDependencies.forEach(dependency => {
      const dependencyKey = dependency.key
      this.reverseFunctionDependencies[dependencyKey] ||= []
      this.reverseFunctionDependencies[dependencyKey] = [
        ...this.reverseFunctionDependencies[dependencyKey],
        { namespaceId, variableId }
      ]
    })
  }

  public handleBroadcast = (variable: VariableInterface): void => {
    const dependencyKey = variableKey(variable.t.namespaceId, variable.t.variableId)
    // console.log('handleBroadcast', dependencyKey, this.reverseVariableDependencies[dependencyKey])
    this.reverseVariableDependencies[dependencyKey]?.forEach(({ namespaceId, variableId }) => {
      const childrenVariable = this.context[variableKey(namespaceId, variableId)]!
      void childrenVariable.refresh({ ctx: {}, arguments: [] })
    })
  }

  // TODO update dependencies and check circular references
  public commitVariable = async ({
    variable,
    skipCreate
  }: {
    variable: VariableInterface
    skipCreate?: boolean
  }): Promise<void> => {
    const { namespaceId, variableId } = variable.t
    const isNew = !this.context[variableKey(namespaceId, variableId)]

    // 1. clear old dependencies
    if (!isNew) {
      // Update
      this.clearDependency(namespaceId, variableId)
    }

    // 2. replace variable object
    this.context[variableKey(namespaceId, variableId)] = variable

    // 3. update name counter
    const match = variable.t.name.match(matchRegex)
    if (match) {
      const [, defaultName, count] = match
      const realName = ReverseCastName[defaultName as SpecialDefaultVariableName]
      this.variableNameCounter[realName][namespaceId] = Math.max(
        this.variableNameCounter[realName][namespaceId] || 0,
        Number(count)
      )
    }

    // 4. track dependencies
    this.trackDependency(variable)

    // 5. persist
    if (isNew) {
      if (!skipCreate) {
        void variable.invokeBackendCreate()
      }

      if (variable.t.version < FORMULA_PARSER_VERSION) {
        void variable.interpret({ ctx: {}, arguments: [] })
      }
    } else {
      void variable.invokeBackendUpdate()
    }

    void variable.afterUpdate()

    // 6. broadcast update
    void this.handleBroadcast(variable)
  }

  public removeVariable = async (namespaceId: NamespaceId, variableId: VariableId): Promise<void> => {
    const key = variableKey(namespaceId, variableId)
    const variable = this.context[key]
    if (variable) {
      void this.clearDependency(namespaceId, variableId)
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this.context[key]

      if (this.backendActions) {
        await this.backendActions.deleteVariable(variable.buildFormula())
      }
    }
  }

  public findFunctionClause = (group: FunctionGroup, name: FunctionNameType): FunctionClause<any> | undefined => {
    return this.functionClausesMap[buildFunctionKey(group, name)]
  }

  public resetFormula = (): void => {
    this.context = {}
    this.formulaNames = []
    this.reverseVariableDependencies = {}
    this.reverseFunctionDependencies = {}
  }

  private readonly parseCodeFragments = (input: string): CodeFragment[] => {
    const lexResult: ILexingResult = FormulaLexer.tokenize(input)
    if (lexResult.errors.length > 0) {
      return []
    }
    const parser = new FormulaParser()
    const codeFragmentVisitor = new CodeFragmentVisitor({
      ctx: {
        formulaContext: this,
        meta: { name: 'unknown', input, namespaceId: '', variableId: '' },
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
