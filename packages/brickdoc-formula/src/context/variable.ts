import {
  BlockSpreadsheetLoaded,
  BrickdocEventBus,
  EventSubscribed,
  FormulaInnerRefresh,
  FormulaUpdatedViaId,
  FormulaUpdatedViaName
} from '@brickdoc/schema'
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
  ErrorMessage,
  NamespaceId
} from '../types'
import { parse, interpret } from '../grammar/core'
import { dumpValue, loadValue } from './persist'
import { block2name, variable2name, variableKey } from '../grammar/convert'
import { BlockClass } from '../controls/block'

export const errorIsFatal = (t: VariableData): boolean => {
  const { success, result } = t.variableValue
  if (
    !success &&
    result.type === 'Error' &&
    ['name_unique', 'name_check', 'name_invalid', 'fatal'].includes(result.errorKind)
  ) {
    return true
  }

  return false
}

export const castVariable = (
  formulaContext: ContextInterface,
  { name, definition, cacheValue, version, blockId, id, type: unknownType }: BaseFormula
): VariableData => {
  const namespaceId = blockId
  const variableId = id
  const type = unknownType as FormulaSourceType
  const meta: VariableMetadata = { namespaceId, variableId, name, input: definition, position: 0, type }
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
    variableNameDependencies,
    flattenVariableDependencies,
    codeFragments,
    functionDependencies
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
    kind: kind ?? 'constant',
    type,
    blockDependencies,
    variableDependencies,
    variableNameDependencies,
    flattenVariableDependencies,
    functionDependencies,
    dirty: true
  }
}

export class VariableClass implements VariableInterface {
  t: VariableData
  formulaContext: ContextInterface
  eventListeners: EventSubscribed[] = []
  reparsing: boolean = false

  constructor({ t, formulaContext }: { t: VariableData; formulaContext: ContextInterface }) {
    this.t = t
    this.formulaContext = formulaContext
  }

  public afterUpdate(): void {
    // console.log('after update', this.t.name, this.t.variableId, this.t.namespaceId)
    BrickdocEventBus.dispatch(FormulaUpdatedViaId(this))
    BrickdocEventBus.dispatch(FormulaUpdatedViaName(this))
  }

  public clone(): VariableInterface {
    return new VariableClass({ t: this.t, formulaContext: this.formulaContext })
  }

  public clearDependency(): void {
    this.unsubscripeEvents()

    this.t.variableDependencies.forEach(dependency => {
      const dependencyKey = variableKey(dependency.namespaceId, dependency.variableId)
      const variableDependencies = this.formulaContext.reverseVariableDependencies[dependencyKey]
        ? this.formulaContext.reverseVariableDependencies[dependencyKey].filter(
            x => !(x.namespaceId === this.t.namespaceId && x.variableId === this.t.variableId)
          )
        : []
      this.formulaContext.reverseVariableDependencies[dependencyKey] = [...variableDependencies]
    })

    this.t.functionDependencies.forEach(dependency => {
      const dependencyKey = dependency.key
      const functionDependencies = this.formulaContext.reverseFunctionDependencies[dependencyKey]
        ? this.formulaContext.reverseFunctionDependencies[dependencyKey].filter(
            x => !(x.namespaceId === this.t.namespaceId && x.variableId === this.t.variableId)
          )
        : []
      this.formulaContext.reverseFunctionDependencies[dependencyKey] = [...functionDependencies]
    })
  }

  public trackDependency(): void {
    this.subscripeEvents()

    this.formulaContext.formulaNames = this.formulaContext.formulaNames
      .filter(n => !(n.kind === 'Variable' && n.key === this.t.variableId))
      .concat(variable2name(this))

    if (
      !this.formulaContext.formulaNames.find(n => n.kind === 'Block' && n.key === this.t.namespaceId) &&
      this.t.type === 'normal'
    ) {
      const block = new BlockClass(this.formulaContext, { id: this.t.namespaceId })
      this.formulaContext.formulaNames.push({ ...block2name(block), name: 'Untitled' })
    }

    this.t.variableDependencies.forEach(dependency => {
      const dependencyKey = variableKey(dependency.namespaceId, dependency.variableId)
      this.formulaContext.reverseVariableDependencies[dependencyKey] ||= []
      this.formulaContext.reverseVariableDependencies[dependencyKey] = [
        ...this.formulaContext.reverseVariableDependencies[dependencyKey],
        { namespaceId: this.t.namespaceId, variableId: this.t.variableId }
      ]
    })

    this.t.functionDependencies.forEach(dependency => {
      const dependencyKey = dependency.key
      this.formulaContext.reverseFunctionDependencies[dependencyKey] ||= []
      this.formulaContext.reverseFunctionDependencies[dependencyKey] = [
        ...this.formulaContext.reverseFunctionDependencies[dependencyKey],
        { namespaceId: this.t.namespaceId, variableId: this.t.variableId }
      ]
    })
  }

  namespaceName(pageId: NamespaceId): string {
    // if (this.t.namespaceId === pageId) {
    //   return 'Current Page'
    // }
    const formulaName = this.formulaContext.formulaNames.find(n => n.key === this.t.namespaceId && n.kind === 'Block')
    if (formulaName) {
      return formulaName.name
    }

    return 'Unknown'
  }

  isDraft(): boolean {
    return !this.formulaContext.findVariableById(this.t.namespaceId, this.t.variableId)
  }

  meta(): VariableMetadata {
    return {
      namespaceId: this.t.namespaceId,
      variableId: this.t.variableId,
      name: this.t.name,
      position: 0,
      input: this.t.definition,
      type: this.t.type
    }
  }

  async destroy(): Promise<void> {
    await this.formulaContext.removeVariable(this.t.namespaceId, this.t.variableId)
  }

  async save(): Promise<void> {
    await this.formulaContext.commitVariable({ variable: this })
  }

  public buildFormula(): Formula {
    return {
      blockId: this.t.namespaceId,
      definition: this.t.definition,
      id: this.t.variableId,
      name: this.t.name,
      version: this.t.version,
      type: this.t.type,
      // updatedAt: new Date().toISOString(),
      // createdAt: new Date().getTime(),
      cacheValue: dumpValue(this.t.variableValue.cacheValue)
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

  private async updateAndPersist(): Promise<void> {
    await this.invokeBackendUpdate()
    this.afterUpdate()
  }

  private async maybeReparseAndPersist(): Promise<void> {
    // console.log('reparse', this.t.variableId, this.t.name)
    if (this.reparsing) {
      return
    }
    this.reparsing = true
    const formula = this.buildFormula()
    this.clearDependency()
    this.t = castVariable(this.formulaContext, formula)
    this.trackDependency()
    await this.refresh({ ctx: {}, arguments: [] })
    this.reparsing = false
  }

  public async reinterpret(): Promise<void> {
    const formula = this.buildFormula()
    this.t = castVariable(this.formulaContext, formula)
    await this.interpret({ ctx: {}, arguments: [] })
  }

  public updateCst(cst: CstNode, interpretContext: InterpretContext): void {
    this.t.cst = cst
    void this.refresh(interpretContext)
  }

  public async updateDefinition(definition: Definition): Promise<void> {
    this.t.definition = definition
    await this.maybeReparseAndPersist()
  }

  private async refresh(interpretContext: InterpretContext): Promise<void> {
    await this.interpret(interpretContext)
    await this.invokeBackendUpdate()
    this.afterUpdate()
  }

  private errorMessages(): ErrorMessage[] {
    const { result, success } = this.t.variableValue
    if (result.type === 'Error' && !success) {
      return [{ message: result.result, type: result.errorKind }]
    } else {
      return []
    }
  }

  public async interpret(interpretContext: InterpretContext): Promise<void> {
    const { variableValue } = await interpret({
      parseResult: { cst: this.t.cst!, kind: this.t.kind, errorMessages: this.errorMessages() },
      ctx: {
        formulaContext: this.formulaContext,
        meta: this.meta(),
        interpretContext
      }
    })

    this.t = { ...this.t, variableValue }
  }

  private subscripeEvents(): void {
    const t = this.t
    const innerRefreshSubscription = BrickdocEventBus.subscribe(
      FormulaInnerRefresh,
      e => {
        void this.updateAndPersist()
      },
      { eventId: `${t.namespaceId},${t.variableId}`, subscribeId: `InnerRefresh#${t.variableId}` }
    )
    this.eventListeners.push(innerRefreshSubscription)

    t.blockDependencies.forEach(blockId => {
      const result = BrickdocEventBus.subscribe(
        BlockSpreadsheetLoaded,
        e => {
          void this.maybeReparseAndPersist()
        },
        { eventId: blockId, subscribeId: `SpreadsheetDependency#${t.variableId}` }
      )
      this.eventListeners.push(result)
    })

    t.variableDependencies.forEach(({ variableId, namespaceId }) => {
      const result = BrickdocEventBus.subscribe(
        FormulaUpdatedViaId,
        e => {
          void this.maybeReparseAndPersist()
        },
        {
          eventId: `${namespaceId},${variableId}`,
          subscribeId: `Dependency#${t.namespaceId},${t.variableId}`
        }
      )
      this.eventListeners.push(result)
    })

    t.variableNameDependencies.forEach(({ name, namespaceId }) => {
      const result = BrickdocEventBus.subscribe(
        FormulaUpdatedViaName,
        e => {
          void this.maybeReparseAndPersist()
        },
        {
          eventId: `${namespaceId}#${name}`,
          subscribeId: `Dependency#${t.namespaceId},${t.variableId}`
        }
      )
      this.eventListeners.push(result)
    })
  }

  private unsubscripeEvents(): void {
    this.eventListeners.forEach(listener => {
      listener.unsubscribe()
    })
    this.eventListeners = []
  }
}
