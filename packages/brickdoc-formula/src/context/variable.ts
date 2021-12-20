import { BrickdocEventBus, FormulaUpdated } from '@brickdoc/schema'
import {
  ContextInterface,
  interpret,
  VariableData,
  VariableInterface,
  VariableMetadata,
  Formula,
  AnyTypeValue,
  DatabaseFactory,
  DatabasePersistence,
  VariableValue
} from '..'
import { parse } from '../grammar'

export const displayValue = (v: AnyTypeValue): string => {
  switch (v.type) {
    case 'number':
    case 'boolean':
      return String(v.result)
    case 'string':
      return `"${v.result}"`
    case 'Date':
      return v.result.toISOString()
    case 'Error':
      return `#<Error> ${v.result}`
    case 'Spreadsheet':
      return `#<Spreadsheet> ${v.result.name()}`
    case 'Column':
      return `#<Column> ${v.result.spreadsheetName}.${v.result.name}`
    case 'Predicate':
      return `[${v.operator}] ${displayValue(v.result)}`
    case 'Record':
      return `{ ${Object.entries(v.result)
        .map(([key, value]) => `${key}: ${displayValue(value as AnyTypeValue)}`)
        .join(', ')} }`
    case 'Array':
      return `[${v.result.map((v: AnyTypeValue) => displayValue(v)).join(', ')}]`
    case 'Button':
      return `#<Button> ${v.result.name}`
  }

  return JSON.stringify(v.result)
}

const parseCacheValue = (formulaContext: ContextInterface, cacheValue: AnyTypeValue): AnyTypeValue => {
  if (cacheValue.type === 'Date' && !(cacheValue.result instanceof Date)) {
    return {
      type: 'Date',
      result: new Date(cacheValue.result)
    }
  }

  if (cacheValue.type === 'Spreadsheet' && !(cacheValue.result instanceof DatabaseFactory)) {
    if (cacheValue.result.dynamic) {
      const { blockId, tableName, columns, rows }: DatabasePersistence = cacheValue.result.persistence
      return {
        type: 'Spreadsheet',
        result: new DatabaseFactory({
          blockId,
          dynamic: true,
          name: () => tableName,
          listColumns: () => columns,
          listRows: () => rows
        })
      }
    } else {
      const database = formulaContext.findDatabase(cacheValue.result.blockId)
      if (database) {
        return { type: 'Spreadsheet', result: database }
      } else {
        return { type: 'Error', result: `Database ${cacheValue.result.blockId} not found`, errorKind: 'deps' }
      }
    }
  }

  // console.log({ cacheValue })

  return cacheValue
}

export const castVariable = (
  formulaContext: ContextInterface,
  { name, definition, cacheValue, blockId, id, view }: Formula
): VariableData => {
  const namespaceId = blockId
  const variableId = id
  const castedValue: AnyTypeValue = parseCacheValue(formulaContext, cacheValue)
  const parseInput = { formulaContext, meta: { namespaceId, variableId, name, input: definition } }
  const {
    success,
    cst,
    kind,
    valid,
    errorMessages,
    blockDependencies,
    variableDependencies,
    flattenVariableDependencies,
    codeFragments,
    functionDependencies,
    level
  } = parse(parseInput)

  const variableValue: VariableValue = success
    ? {
        updatedAt: new Date(),
        success: true,
        result: castedValue,
        cacheValue
      }
    : {
        updatedAt: new Date(),
        success: false,
        result: { type: 'Error', result: errorMessages[0]!.message, errorKind: errorMessages[0]!.type },
        cacheValue
      }

  return {
    namespaceId,
    variableId,
    variableValue,
    name,
    cst,
    view,
    valid,
    definition,
    codeFragments,
    level,
    kind: kind ?? 'constant',
    blockDependencies,
    variableDependencies,
    flattenVariableDependencies,
    functionDependencies,
    dirty: false
  }
}

export class VariableClass implements VariableInterface {
  t: VariableData
  formulaContext: ContextInterface

  constructor({ t, formulaContext }: { t: VariableData; formulaContext: ContextInterface }) {
    this.t = t
    this.formulaContext = formulaContext
  }

  public namespaceName = () => this.formulaContext.blockNameMap[this.t.namespaceId] || 'Untitled'

  public meta = (): VariableMetadata => {
    return {
      namespaceId: this.t.namespaceId,
      variableId: this.t.variableId,
      name: this.t.name,
      input: this.t.definition
    }
  }

  public buildFormula = (): Formula => {
    return {
      blockId: this.t.namespaceId,
      definition: this.t.definition,
      id: this.t.variableId,
      name: this.t.name,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().getTime(),
      cacheValue: this.t.variableValue.cacheValue,
      view: this.t.view
    }
  }

  public invokeBackendCreate = async (): Promise<void> => {
    if (this.formulaContext.backendActions) {
      await this.formulaContext.backendActions.createVariable(this)
    }
  }

  public invokeBackendUpdate = async (): Promise<void> => {
    if (this.formulaContext.backendActions) {
      await this.formulaContext.backendActions.updateVariable(this)
    }
  }

  public afterUpdate = (): void => {
    BrickdocEventBus.dispatch(FormulaUpdated(this))
  }

  public reparse = (): void => {
    const formula = this.buildFormula()
    this.t = castVariable(this.formulaContext, formula)
    this.afterUpdate()
  }

  public refresh = async (): Promise<void> => {
    const { variableValue } = await interpret({
      cst: this.t.cst,
      formulaContext: this.formulaContext,
      meta: this.meta()
    })

    this.t = { ...this.t, variableValue }
    this.afterUpdate()
    await this.invokeBackendUpdate()
  }
}
