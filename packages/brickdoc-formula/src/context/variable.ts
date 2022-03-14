import {
  BlockSpreadsheetLoaded,
  BrickdocEventBus,
  EventSubscribed,
  FormulaInnerRefresh,
  FormulaTickViaId,
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
  InterpretContext,
  Definition,
  Formula,
  BaseFormula,
  FormulaSourceType,
  ErrorMessage,
  NamespaceId
} from '../types'
import { parse, innerInterpret, interpretAsync } from '../grammar/core'
import { dumpValue, loadValue } from './persist'
import { block2name, variable2name, variableKey } from '../grammar/convert'
import { BlockClass } from '../controls/block'
import { v4 as uuidv4 } from 'uuid'

export const errorIsFatal = (t: VariableData): boolean => {
  if (t.async) {
    return false
  }

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

export const fetchResult = (t: VariableData): AnyTypeResult => {
  if (t.async) {
    const duration = new Date().getTime() - t.execStartTime.getTime()
    if (duration > 5000) {
      return { type: 'Pending', result: '[5s] Loading...' }
    }
    return { type: 'Pending', result: 'Loading...' }
  }

  return t.variableValue.result
}

export const castVariable = (
  oldVariable: VariableInterface | undefined,
  formulaContext: ContextInterface,
  { name, definition, cacheValue, version, blockId, id, type: unknownType }: BaseFormula
): VariableInterface => {
  // const oldVariable = formulaContext.findVariableById(blockId, id)
  const namespaceId = blockId
  const variableId = id
  const type = unknownType as FormulaSourceType
  const meta: VariableMetadata = { namespaceId, variableId, name, input: definition, position: 0, type }
  const ctx = { formulaContext, meta, interpretContext: { ctx: {}, arguments: [] } }
  const castedValue: AnyTypeResult = loadValue(ctx, cacheValue)
  const parseResult = parse({ ctx })

  const newVariable = interpretAsync({
    variable: oldVariable,
    ctx,
    cachedVariableValue: { success: true, result: castedValue },
    parseResult,
    skipAsync: false
  })
  return newVariable
}

const errorMessages = (t: VariableData): ErrorMessage[] => {
  if (t.async) return []
  if (t.variableValue.result.type === 'Error' && !t.variableValue.success) {
    return [{ message: t.variableValue.result.result, type: t.variableValue.result.errorKind }]
  } else {
    return []
  }
}

export class VariableClass implements VariableInterface {
  t: VariableData
  isNew: boolean
  isDirty: boolean
  tickTimeout: number = 1000
  formulaContext: ContextInterface
  eventListeners: EventSubscribed[] = []
  reparsing: boolean = false
  uuid: string

  constructor({ t, formulaContext }: { t: VariableData; formulaContext: ContextInterface }) {
    this.t = t
    this.formulaContext = formulaContext
    this.uuid = uuidv4()
    this.isNew = true
    this.isDirty = true

    const result = BrickdocEventBus.subscribe(
      FormulaTickViaId,
      e => {
        void this.tick(e.payload.uuid)
      },
      {
        eventId: `${t.namespaceId},${t.variableId}`,
        subscribeId: `Dependency#${t.namespaceId},${t.variableId}`
      }
    )
    this.eventListeners.push(result)
  }

  public cloneVariable(): VariableInterface {
    return new VariableClass({ t: this.t, formulaContext: this.formulaContext })
  }

  private dispatchVariableValueChanged(): void {
    this.isDirty = true
    this.trackDirty()
    BrickdocEventBus.dispatch(FormulaUpdatedViaId(this))
  }

  public onUpdate(): void {
    // console.log('after update', this.t.name, this.t.variableId, this.t.namespaceId)
    BrickdocEventBus.dispatch(FormulaUpdatedViaId(this))
    BrickdocEventBus.dispatch(FormulaUpdatedViaName(this))
    this.trackDirty()
  }

  public trackDirty(): void {
    if (!this.isDirty) return
    if (this.isNew) return
    this.formulaContext.dirtyFormulas[variableKey(this.t.namespaceId, this.t.variableId)] = {
      updatedAt: new Date()
    }
  }

  public onCommitDirty(): void {
    if (!this.isDirty) return
    this.isDirty = false
  }

  private async tick(uuid: string): Promise<void> {
    if (this.uuid !== uuid) return
    if (!this.t.async) {
      return
    }
    BrickdocEventBus.dispatch(FormulaUpdatedViaId(this))
    await new Promise(resolve => setTimeout(resolve, this.tickTimeout))
    BrickdocEventBus.dispatch(
      FormulaTickViaId({ uuid: this.uuid, variableId: this.t.variableId, namespaceId: this.t.namespaceId })
    )
  }

  public subscribePromise(): void {
    const id = uuidv4()
    this.uuid = id
    if (!this.t.async) {
      return
    }
    void this.tick(id)
    void this.t.variableValue.then(result => {
      if (this.uuid === id) {
        this.t = { ...this.t, variableValue: result, async: false, execEndTime: new Date() }
        this.dispatchVariableValueChanged()
      }
    })
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
    this.subscribePromise()

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
        ...this.formulaContext.reverseVariableDependencies[dependencyKey].filter(
          ({ namespaceId, variableId }) => !(namespaceId === this.t.namespaceId && variableId === this.t.variableId)
        ),
        { namespaceId: this.t.namespaceId, variableId: this.t.variableId }
      ]
    })

    this.t.functionDependencies.forEach(dependency => {
      const dependencyKey = dependency.key
      this.formulaContext.reverseFunctionDependencies[dependencyKey] ||= []
      this.formulaContext.reverseFunctionDependencies[dependencyKey] = [
        ...this.formulaContext.reverseFunctionDependencies[dependencyKey].filter(
          ({ namespaceId, variableId }) => !(namespaceId === this.t.namespaceId && variableId === this.t.variableId)
        ),
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

  save(): void {
    this.formulaContext.commitVariable({ variable: this })
  }

  public buildFormula(): Formula {
    return {
      blockId: this.t.namespaceId,
      definition: this.t.definition,
      id: this.t.variableId,
      name: this.t.name,
      version: this.t.version,
      type: this.t.type,
      cacheValue: dumpValue(fetchResult(this.t))
    }
  }

  private async maybeReparseAndPersist(): Promise<void> {
    // console.log('reparse', this.t.variableId, this.t.name)
    if (this.reparsing) {
      return
    }
    this.reparsing = true
    const formula = this.buildFormula()
    this.clearDependency()
    this.t = castVariable(this, this.formulaContext, formula).t
    this.trackDependency()
    await this.refresh({ ctx: {}, arguments: [] })
    this.reparsing = false
  }

  public async reinterpret(): Promise<void> {
    const formula = this.buildFormula()
    this.t = castVariable(this, this.formulaContext, formula).t
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
    this.onUpdate()
  }

  public async interpret(interpretContext: InterpretContext): Promise<void> {
    const execStartTime = new Date()
    const variableValue = await innerInterpret({
      parseResult: {
        cst: this.t.cst!,
        kind: this.t.kind,
        async: false,
        errorMessages: errorMessages(this.t)
      },
      ctx: {
        formulaContext: this.formulaContext,
        meta: this.meta(),
        interpretContext
      }
    })

    this.t = { ...this.t, async: false, variableValue, execStartTime, execEndTime: new Date() }
  }

  private subscripeEvents(): void {
    const t = this.t
    const innerRefreshSubscription = BrickdocEventBus.subscribe(
      FormulaInnerRefresh,
      e => {
        this.onUpdate()
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
