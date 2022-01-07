import { BrickdocEventBus, FormulaUpdated } from '@brickdoc/schema'
import { CstNode } from 'chevrotain'
import {
  ContextInterface,
  VariableData,
  VariableInterface,
  VariableMetadata,
  AnyTypeResult,
  VariableValue,
  InterpretContext,
  Definition,
  Formula
} from '../types'
import { parse, interpret } from '../grammar/core'
import { castValue, loadValue } from './persist'

export const displayValue = (v: AnyTypeResult): string => {
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
    case 'Block':
      return `#<Block> ${v.result.name()}`
    case 'Column':
      return `#<Column> ${v.result.spreadsheet.name()}.${v.result.name}`
    case 'Predicate':
      return `[${v.operator}] ${displayValue(v.result)}`
    case 'Record':
      return `{ ${Object.entries(v.result)
        .map(([key, value]) => `${key}: ${displayValue(value as AnyTypeResult)}`)
        .join(', ')} }`
    case 'Array':
      return `[${v.result.map((v: AnyTypeResult) => displayValue(v)).join(', ')}]`
    case 'Button':
      return `#<${v.type}> ${v.result.name}`
    case 'Switch':
      return `#<${v.type}> ${v.result.checked}`
    case 'Select':
      return `#<${v.type}> ${JSON.stringify(v.result.options)}`
    case 'Reference':
      return `#<Reference> ${JSON.stringify(v.result)}`
    case 'Function':
      return `#<Function> ${v.result.map(({ name, args }) => `${name} ${args.map(a => displayValue(a)).join(', ')}`)}`
    case 'Cst':
      return '#<Cst>'
    case 'Blank':
      return `#N/A`
  }

  return JSON.stringify(v.result)
}

export const castVariable = (
  formulaContext: ContextInterface,
  { name, definition, cacheValue, version, blockId, id, view }: Formula
): VariableData => {
  const namespaceId = blockId
  const variableId = id
  const meta = { namespaceId, variableId, name, input: definition }
  const ctx = { formulaContext, meta, interpretContext: { ctx: {}, arguments: [] } }
  const castedValue: AnyTypeResult = loadValue(ctx, cacheValue)
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
  } = parse({ ctx })

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
    version,
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

  public namespaceName = () => {
    const formulaName = this.formulaContext.formulaNames.find(n => n.key === this.t.namespaceId && n.kind === 'Block')
    if (formulaName) {
      return formulaName.name
    }

    return 'Unknown'
  }

  public isDraft = () => {
    return !this.formulaContext.findVariable(this.t.namespaceId, this.t.variableId)
  }

  public meta = (): VariableMetadata => {
    return {
      namespaceId: this.t.namespaceId,
      variableId: this.t.variableId,
      name: this.t.name,
      input: this.t.definition
    }
  }

  public destroy = async (): Promise<void> => {
    await this.formulaContext.removeVariable(this.t.namespaceId, this.t.variableId)
  }

  public save = async (): Promise<void> => {
    await this.formulaContext.commitVariable({ variable: this })
  }

  public buildFormula = (): Formula => {
    const ctx = { formulaContext: this.formulaContext, meta: this.meta(), interpretContext: { ctx: {}, arguments: [] } }
    return {
      blockId: this.t.namespaceId,
      definition: this.t.definition,
      id: this.t.variableId,
      name: this.t.name,
      version: this.t.version,
      kind: this.t.kind,
      level: this.t.level,
      // updatedAt: new Date().toISOString(),
      // createdAt: new Date().getTime(),
      cacheValue: castValue(ctx, this.t.variableValue.cacheValue),
      view: this.t.view,
      dependencyIds: this.t.variableDependencies.map(dependency => dependency.variableId)
    }
  }

  public invokeBackendCreate = async (): Promise<void> => {
    if (this.formulaContext.backendActions) {
      await this.formulaContext.backendActions.createVariable(this.buildFormula())
    }
  }

  public invokeBackendUpdate = async (): Promise<void> => {
    if (this.formulaContext.backendActions) {
      await this.formulaContext.backendActions.updateVariable(this.buildFormula())
    }
  }

  public afterUpdate = (): void => {
    // console.log('after update', this.t.name, this.t.variableId)
    BrickdocEventBus.dispatch(FormulaUpdated(this))
  }

  public updateAndPersist = async (): Promise<void> => {
    await this.invokeBackendUpdate()
    this.afterUpdate()
  }

  public reparse = (): void => {
    const formula = this.buildFormula()
    this.t = castVariable(this.formulaContext, formula)
    this.afterUpdate()
  }

  public updateCst = (cst: CstNode, interpretContext: InterpretContext): void => {
    this.t.cst = cst
    void this.refresh(interpretContext)
  }

  public updateDefinition = async (definition: Definition): Promise<void> => {
    this.t.definition = definition
    const formula = this.buildFormula()
    this.t = castVariable(this.formulaContext, formula)
    await this.refresh({ ctx: {}, arguments: [] })
  }

  public refresh = async (interpretContext: InterpretContext): Promise<void> => {
    await this.interpret(interpretContext)
    await this.invokeBackendUpdate()
    this.formulaContext.handleBroadcast(this)
  }

  public interpret = async (interpretContext: InterpretContext): Promise<void> => {
    const { variableValue } = await interpret({
      cst: this.t.cst!,
      ctx: {
        formulaContext: this.formulaContext,
        meta: this.meta(),
        interpretContext
      }
    })

    this.t = { ...this.t, variableValue }

    this.afterUpdate()
  }
}
