import {
  Column,
  Context,
  Database,
  ContextInterface,
  FunctionClause,
  namespaceId,
  VariableData,
  VariableDependency,
  variableId,
  BackendActions,
  VariableInterface
} from '..'
import { BUILTIN_CLAUSES } from '../functions'

export interface FormulaContextArgs {
  functionClauses: FunctionClause[]
  backendActions?: BackendActions
}

export class FormulaContext implements ContextInterface {
  context: Context
  databases: { [key: string]: Database } = {}
  reverseVariableDependencies: { [key: string]: VariableDependency[] }
  reverseFunctionDependencies: { [key: string]: VariableDependency[] }
  functionClausesMap: { [key: string]: FunctionClause }
  backendActions: BackendActions

  constructor({ functionClauses, backendActions }: FormulaContextArgs = { functionClauses: [] }) {
    this.context = {}
    this.reverseVariableDependencies = {}
    this.reverseFunctionDependencies = {}
    if (backendActions) {
      this.backendActions = backendActions
    }
    this.functionClausesMap = [...BUILTIN_CLAUSES, ...functionClauses].reduce((o, acc) => {
      o[`${acc.group}${acc.name}`] = acc
      return o
    }, {})
  }

  public variableCount = (): number => {
    return Object.keys(this.context).length
  }

  public findDatabase = (namespaceId: namespaceId): Database | undefined => {
    return this.databases[namespaceId]
  }

  public findColumn = (namespaceId: namespaceId, variableId: variableId): Column | undefined => {
    const database = this.findDatabase(namespaceId)
    if (!database) {
      return undefined
    }

    return database.getColumn(variableId)
  }

  public setDatabase = (namespaceId: namespaceId, database: Database): void => {
    this.databases[namespaceId] = database
  }

  public removeDatabase = (namespaceId: namespaceId): void => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.databases[namespaceId]
  }

  public findVariable = (namespaceId: namespaceId, variableId: variableId): VariableInterface | undefined => {
    return this.context[this.variableKey(namespaceId, variableId)]
  }

  public findVariableByName = (namespaceId: namespaceId, name: string): VariableInterface | undefined => {
    return Object.values(this.context).find((v: VariableInterface) => v.t.namespaceId === namespaceId && v.t.name === name)
  }

  public clearDependency = (namespaceId: namespaceId, variableId: variableId): void => {
    const variable = this.findVariable(namespaceId, variableId)
    if (variable) {
      variable.t.variableDependencies?.forEach(dependency => {
        const dependencyKey = this.variableKey(dependency.namespaceId, dependency.variableId)
        const variableDependencies = this.reverseVariableDependencies[dependencyKey]
          ? this.reverseVariableDependencies[dependencyKey].filter(x => !(x.namespaceId === namespaceId && x.variableId === variableId))
          : []
        this.reverseVariableDependencies[dependencyKey] = [...variableDependencies]
      })

      variable.t.functionDependencies?.forEach(dependency => {
        const dependencyKey = this.functionKey(dependency.group, dependency.name)
        const functionDependencies = this.reverseFunctionDependencies[dependencyKey]
          ? this.reverseFunctionDependencies[dependencyKey].filter(x => !(x.namespaceId === namespaceId && x.variableId === variableId))
          : []
        this.reverseFunctionDependencies[dependencyKey] = [...functionDependencies]
      })
    }
  }

  public trackDependency = ({ variableDependencies, namespaceId, variableId, functionDependencies }: VariableData): void => {
    variableDependencies?.forEach(dependency => {
      const dependencyKey = this.variableKey(dependency.namespaceId, dependency.variableId)
      this.reverseVariableDependencies[dependencyKey] ||= []
      this.reverseVariableDependencies[dependencyKey] = [...this.reverseVariableDependencies[dependencyKey], { namespaceId, variableId }]
    })

    functionDependencies?.forEach(dependency => {
      const dependencyKey = this.functionKey(dependency.group, dependency.name)
      this.reverseFunctionDependencies[dependencyKey] ||= []
      this.reverseFunctionDependencies[dependencyKey] = [...this.reverseFunctionDependencies[dependencyKey], { namespaceId, variableId }]
    })
  }

  public handleBroadcast = (variable: VariableInterface): void => {
    const dependencyKey = this.variableKey(variable.t.namespaceId, variable.t.variableId)
    this.reverseVariableDependencies[dependencyKey]?.forEach(({ namespaceId, variableId }) => {
      void this.context[this.variableKey(namespaceId, variableId)]!.refresh(this)
    })
  }

  // TODO update dependencies and check circular references
  public commitVariable = async ({ variable, skipCreate }: { variable: VariableInterface; skipCreate?: boolean }): Promise<void> => {
    const { namespaceId, variableId } = variable.t
    const isNew = !this.context[this.variableKey(namespaceId, variableId)]
    let shouldBroadcast = false
    if (isNew) {
      variable.backendActions = this.backendActions
    } else {
      void this.clearDependency(namespaceId, variableId)
      shouldBroadcast = true
    }
    this.context[this.variableKey(namespaceId, variableId)] = variable
    void this.trackDependency(variable.t)

    if (isNew) {
      if (!skipCreate) {
        void variable.invokeBackendCreate()
      }
    } else {
      void variable.invokeBackendUpdate()
    }

    void variable.afterUpdate()

    if (shouldBroadcast) {
      void this.handleBroadcast(variable)
    }
  }

  public removeVariable = async (namespaceId: namespaceId, variableId: variableId): Promise<void> => {
    const key = this.variableKey(namespaceId, variableId)
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

  public findFunctionClause = (group: string, name: string): FunctionClause | undefined => {
    return this.functionClausesMap[`${group}${name}`]
  }

  public reset = (): void => {
    this.context = {}
    this.reverseVariableDependencies = {}
    this.reverseFunctionDependencies = {}
  }

  public variableKey = (namespaceId: namespaceId, variableId: variableId): string => {
    return `$${namespaceId}@${variableId}`
  }

  public functionKey = (group: string, name: string): string => {
    return `&${group}::${name}`
  }
}
