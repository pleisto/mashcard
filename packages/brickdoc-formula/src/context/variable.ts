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
  Formula,
  BaseFormula,
  FormulaSourceType,
  VariableResult
} from '../types'
import { parse, interpret } from '../grammar/core'
import { dumpValue, loadValue } from './persist'

export const displayValue = (v: AnyTypeResult): string => {
  switch (v.type) {
    case 'number':
    case 'boolean':
      return String(v.result)
    case 'string':
      return v.result
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
  { name, definition, cacheValue, version, blockId, id, type: unknownType }: BaseFormula
): VariableData => {
  const namespaceId = blockId
  const variableId = id
  const type = unknownType as FormulaSourceType
  const meta: VariableMetadata = { namespaceId, variableId, name, input: definition, type }
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
    valid,
    version,
    definition,
    codeFragments,
    level,
    kind: kind ?? 'constant',
    type,
    blockDependencies,
    variableDependencies,
    flattenVariableDependencies,
    functionDependencies,
    dirty: true
  }
}

export class VariableClass implements VariableInterface {
  t: VariableData
  formulaContext: ContextInterface

  constructor({ t, formulaContext }: { t: VariableData; formulaContext: ContextInterface }) {
    this.t = t
    this.formulaContext = formulaContext
  }

  namespaceName(): string {
    const formulaName = this.formulaContext.formulaNames.find(n => n.key === this.t.namespaceId && n.kind === 'Block')
    if (formulaName) {
      return formulaName.name
    }

    return 'Unknown'
  }

  isDraft(): boolean {
    return !this.formulaContext.findVariable(this.t.namespaceId, this.t.variableId)
  }

  meta(): VariableMetadata {
    return {
      namespaceId: this.t.namespaceId,
      variableId: this.t.variableId,
      name: this.t.name,
      input: this.t.definition,
      type: this.t.type
    }
  }

  result(): VariableResult {
    return {
      definition: this.t.definition,
      variableValue: this.t.variableValue,
      type: this.t.type,
      kind: this.t.kind
    }
  }

  async destroy(): Promise<void> {
    await this.formulaContext.removeVariable(this.t.namespaceId, this.t.variableId)
  }

  async save(): Promise<void> {
    await this.formulaContext.commitVariable({ variable: this })
  }

  public buildFormula(): Formula {
    const ctx = { formulaContext: this.formulaContext, meta: this.meta(), interpretContext: { ctx: {}, arguments: [] } }
    return {
      blockId: this.t.namespaceId,
      definition: this.t.definition,
      id: this.t.variableId,
      name: this.t.name,
      version: this.t.version,
      level: this.t.level,
      type: this.t.type,
      // updatedAt: new Date().toISOString(),
      // createdAt: new Date().getTime(),
      cacheValue: dumpValue(ctx, this.t.variableValue.cacheValue)
    }
  }

  public async invokeBackendCreate(): Promise<void> {
    if (!this.t.dirty) {
      return
    }
    if (this.formulaContext.backendActions) {
      await this.formulaContext.backendActions.createVariable(this.buildFormula())
    }
    this.t.dirty = false
  }

  public async invokeBackendUpdate(): Promise<void> {
    if (!this.t.dirty) {
      return
    }
    if (this.formulaContext.backendActions) {
      await this.formulaContext.backendActions.updateVariable(this.buildFormula())
    }
    this.t.dirty = false
  }

  public afterUpdate(): void {
    // console.log('after update', this.t.name, this.t.variableId)
    BrickdocEventBus.dispatch(FormulaUpdated(this))
  }

  public async updateAndPersist(): Promise<void> {
    await this.invokeBackendUpdate()
    this.afterUpdate()
  }

  public reparse(): void {
    const formula = this.buildFormula()
    this.t = castVariable(this.formulaContext, formula)
    this.afterUpdate()
  }

  public updateCst(cst: CstNode, interpretContext: InterpretContext): void {
    this.t.cst = cst
    void this.refresh(interpretContext)
  }

  public async updateDefinition(definition: Definition): Promise<void> {
    this.t.definition = definition
    const formula = this.buildFormula()
    this.t = castVariable(this.formulaContext, formula)
    await this.refresh({ ctx: {}, arguments: [] })
  }

  public async refresh(interpretContext: InterpretContext): Promise<void> {
    await this.interpret(interpretContext)
    await this.invokeBackendUpdate()
    this.formulaContext.handleBroadcast(this)
  }

  public async interpret(interpretContext: InterpretContext): Promise<void> {
    const { variableValue } = await interpret({
      parseResult: { cst: this.t.cst!, kind: this.t.kind },
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
