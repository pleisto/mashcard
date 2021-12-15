import { CstNode, ILexingResult } from 'chevrotain'
import {
  Column,
  Database,
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
  FunctionName,
  FunctionGroup,
  FunctionKey,
  VariableKey,
  VariableName,
  buildFunctionKey,
  DefaultVariableName,
  CodeFragment,
  FormulaParser,
  ExampleWithCodeFragments,
  BaseFunctionClause,
  BaseFunctionClauseWithKey,
  FunctionCompletion,
  VariableCompletion,
  SpreadsheetCompletion,
  function2completion,
  database2completion,
  variable2completion,
  variableKey,
  ColumnCompletion,
  column2completion
} from '..'
import { BUILTIN_CLAUSES } from '../functions'
import { CodeFragmentVisitor, lexerByMode } from '../grammar'

export interface FormulaContextArgs {
  functionClauses?: Array<BaseFunctionClause<any>>
  backendActions?: BackendActions
}

const matchRegex = /(str|num|bool|obj|array|null|date|predicate|spreadsheet|column|error|block|var)([0-9]+)$/
export const FormulaTypeCastName: { [key in FormulaType]: SpecialDefaultVariableName } = {
  string: 'str',
  number: 'num',
  boolean: 'bool',
  Predicate: 'predicate',
  null: 'null',
  Object: 'obj',
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
) as { [key in SpecialDefaultVariableName]: FormulaType }

export class FormulaContext implements ContextInterface {
  context: { [key: VariableKey]: VariableInterface } = {}
  functionWeights: { [key: FunctionKey]: number } = {}
  variableWeights: { [key: VariableKey]: number } = {}
  databases: { [key: NamespaceId]: Database } = {}
  variableNameCounter: { [key in FormulaType]: { [n: NamespaceId]: number } } = {
    string: {},
    number: {},
    boolean: {},
    Object: {},
    Predicate: {},
    Error: {},
    Spreadsheet: {},
    Array: {},
    null: {},
    Date: {},
    Column: {},
    Block: {},
    any: {}
  }

  reverseVariableDependencies: { [key: VariableKey]: VariableDependency[] } = {}
  reverseFunctionDependencies: { [key: FunctionKey]: VariableDependency[] } = {}
  functionClausesMap: { [key: FunctionKey]: FunctionClause<any> }
  backendActions: BackendActions | undefined

  constructor({ functionClauses = [], backendActions }: FormulaContextArgs) {
    if (backendActions) {
      this.backendActions = backendActions
    }
    const baseFunctionClauses: Array<BaseFunctionClause<any>> = [...BUILTIN_CLAUSES, ...functionClauses]
    this.functionClausesMap = baseFunctionClauses.reduce(
      (o: { [key: FunctionKey]: BaseFunctionClauseWithKey<any> }, acc: BaseFunctionClause<any>) => {
        const clause: BaseFunctionClauseWithKey<any> = {
          ...acc,
          key: buildFunctionKey(acc.group, acc.name)
        }
        o[clause.key] = clause
        return o
      },
      {}
    ) as { [key: FunctionKey]: FunctionClause<any> }

    this.functionClausesMap = Object.values(this.functionClausesMap).reduce(
      (o: { [key: FunctionKey]: FunctionClause<any> }, acc: FunctionClause<any>) => {
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

  public completions = (namespaceId: NamespaceId, variableId: VariableId | undefined): Completion[] => {
    const functions: FunctionCompletion[] = Object.entries(this.functionClausesMap).map(([key, f]) => {
      const weight: number = this.functionWeights[key as FunctionKey] || 0
      return function2completion(f, weight)
    })
    const variables: VariableCompletion[] = Object.entries(this.context)
      .filter(([key, c]) => c.t.variableId !== variableId)
      .map(([key, v]) => {
        const weight: number = this.variableWeights[key as VariableKey] || 0
        return variable2completion(v, v.t.namespaceId === namespaceId ? weight + 1 : weight - 1)
      })
    const spreadsheets: SpreadsheetCompletion[] = Object.entries(this.databases).map(([key, database]) => {
      return database2completion(database)
    })

    const columns: ColumnCompletion[] = Object.entries(this.databases).flatMap(([key, database]) => {
      return database.listColumns().map(column => column2completion(column))
    })
    return [...functions, ...variables, ...spreadsheets, ...columns].sort((a, b) => b.weight - a.weight)
  }

  public getDefaultVariableName = (namespaceId: NamespaceId, type: FormulaType): DefaultVariableName => {
    const oldCounter = this.variableNameCounter[type][namespaceId] || 0
    return `${FormulaTypeCastName[type]}${oldCounter + 1}`
  }

  public variableCount = (): number => {
    return Object.keys(this.context).length
  }

  public findDatabase = (namespaceId: NamespaceId): Database | undefined => {
    return this.databases[namespaceId]
  }

  public findColumn = (namespaceId: NamespaceId, variableId: VariableId): Column | undefined => {
    const database = this.findDatabase(namespaceId)
    if (!database) {
      return undefined
    }

    return database.getColumn(variableId)
  }

  public setDatabase = (namespaceId: NamespaceId, database: Database): void => {
    this.databases[namespaceId] = database
  }

  public removeDatabase = (namespaceId: NamespaceId): void => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.databases[namespaceId]
  }

  public findVariable = (namespaceId: NamespaceId, variableId: VariableId): VariableInterface | undefined => {
    return this.context[variableKey(namespaceId, variableId)]
  }

  public listVariables = (namespaceId: NamespaceId): VariableInterface[] => {
    return Object.values(this.context).filter(v => v.t.namespaceId === namespaceId)
  }

  public findVariableByName = (namespaceId: NamespaceId, name: VariableName): VariableInterface | undefined => {
    return Object.values(this.context).find(
      (v: VariableInterface) => v.t.namespaceId === namespaceId && v.t.name === name
    )
  }

  // TODO flattenVariableDependencies
  public clearDependency = (namespaceId: NamespaceId, variableId: VariableId): void => {
    const variable = this.findVariable(namespaceId, variableId)
    if (variable) {
      variable.t.variableDependencies?.forEach(dependency => {
        const dependencyKey = variableKey(dependency.namespaceId, dependency.variableId)
        const variableDependencies = this.reverseVariableDependencies[dependencyKey]
          ? this.reverseVariableDependencies[dependencyKey].filter(
              x => !(x.namespaceId === namespaceId && x.variableId === variableId)
            )
          : []
        this.reverseVariableDependencies[dependencyKey] = [...variableDependencies]
      })

      variable.t.functionDependencies?.forEach(dependency => {
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

  // TODO flattenVariableDependencies
  // TODO update level
  public trackDependency = ({
    t: { variableDependencies, namespaceId, variableId, functionDependencies }
  }: VariableInterface): void => {
    variableDependencies?.forEach(dependency => {
      const dependencyKey = variableKey(dependency.namespaceId, dependency.variableId)
      this.reverseVariableDependencies[dependencyKey] ||= []
      this.reverseVariableDependencies[dependencyKey] = [
        ...this.reverseVariableDependencies[dependencyKey],
        { namespaceId, variableId }
      ]
    })

    functionDependencies?.forEach(dependency => {
      const dependencyKey = dependency.key
      this.reverseFunctionDependencies[dependencyKey] ||= []
      this.reverseFunctionDependencies[dependencyKey] = [
        ...this.reverseFunctionDependencies[dependencyKey],
        { namespaceId, variableId }
      ]
    })
  }

  public handleBroadcast = (variable: VariableInterface): void => {
    void variable.afterUpdate()
    const dependencyKey = variableKey(variable.t.namespaceId, variable.t.variableId)
    this.reverseVariableDependencies[dependencyKey]?.forEach(({ namespaceId, variableId }) => {
      void this.context[variableKey(namespaceId, variableId)]!.refresh(this)
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
    } else {
      void variable.invokeBackendUpdate()
    }

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
        await this.backendActions.deleteVariable(variable)
      }
    }
  }

  public findFunctionClause = (group: FunctionGroup, name: FunctionName): FunctionClause<any> | undefined => {
    return this.functionClausesMap[buildFunctionKey(group, name)]
  }

  public reset = (): void => {
    this.context = {}
    this.reverseVariableDependencies = {}
    this.reverseFunctionDependencies = {}
  }

  private readonly parseCodeFragments = (input: string): CodeFragment[] => {
    const lexResult: ILexingResult = lexerByMode('oneline').tokenize(input)
    if (lexResult.errors.length > 0) {
      return []
    }
    const parser = new FormulaParser({ formulaContext: this })
    const codeFragmentVisitor = new CodeFragmentVisitor({ formulaContext: this })
    const tokens = lexResult.tokens
    parser.input = tokens

    const cst: CstNode = parser.startExpression()
    const { codeFragments }: { codeFragments: CodeFragment[] } = codeFragmentVisitor.visit(cst, { type: 'any' }) ?? {
      codeFragments: []
    }

    return codeFragments
  }
}
