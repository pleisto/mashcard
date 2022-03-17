import {
  BlockSpreadsheetLoaded,
  BrickdocEventBus,
  EventSubscribed,
  FormulaInnerRefresh,
  FormulaTaskCompleted,
  FormulaTaskStarted,
  FormulaTickViaId,
  FormulaUpdatedViaId,
  FormulaUpdatedViaName
} from '@brickdoc/schema'
import {
  ContextInterface,
  VariableData,
  VariableInterface,
  VariableMetadata,
  AnyTypeResult,
  Definition,
  Formula,
  BaseFormula,
  FormulaSourceType,
  NamespaceId,
  VariableTask
} from '../types'
import { parse, interpret } from '../grammar/core'
import { dumpValue } from './persist'
import { block2name, variable2name, variableKey } from '../grammar/convert'
import { BlockClass } from '../controls/block'
import { v4 as uuid } from 'uuid'

export const errorIsFatal = ({ task }: VariableData): boolean => {
  if (task.async) {
    return false
  }

  const { success, result } = task.variableValue
  if (
    !success &&
    result.type === 'Error' &&
    ['name_unique', 'name_check', 'name_invalid', 'fatal'].includes(result.errorKind)
  ) {
    return true
  }

  return false
}

export const fetchResult = ({ task }: VariableData): AnyTypeResult => {
  if (task.async) {
    const duration = new Date().getTime() - task.execStartTime.getTime()
    if (duration > 5000) {
      return { type: 'Pending', result: '[5s] Loading...' }
    }
    return { type: 'Pending', result: 'Loading...' }
  }

  return task.variableValue.result
}

export const castVariable = (
  oldVariable: VariableInterface | undefined,
  formulaContext: ContextInterface,
  { name, definition, cacheValue, version, blockId, id, type: unknownType }: BaseFormula
): VariableInterface => {
  const type = unknownType as FormulaSourceType
  const meta: VariableMetadata = { namespaceId: blockId, variableId: id, name, input: definition, position: 0, type }
  const ctx = { formulaContext, meta, interpretContext: { ctx: {}, arguments: [] } }
  const parseResult = parse({ ctx })

  return interpret({ variable: oldVariable, isLoad: true, ctx, parseResult })
}

export class VariableClass implements VariableInterface {
  t: VariableData
  savedT: VariableData | undefined
  isNew: boolean
  formulaContext: ContextInterface

  tickTimeout: number = 1000
  eventListeners: EventSubscribed[] = []
  currentUUID: string | undefined
  builtinEventListeners: EventSubscribed[] = []

  constructor({ t, formulaContext }: { t: VariableData; formulaContext: ContextInterface }) {
    this.t = t
    this.formulaContext = formulaContext
    this.isNew = true

    const tickSubscription = BrickdocEventBus.subscribe(
      FormulaTickViaId,
      e => {
        void this.tick(e.payload.uuid)
      },
      {
        eventId: `${t.namespaceId},${t.variableId}`,
        subscribeId: `Tick#${t.namespaceId},${t.variableId}`
      }
    )
    this.builtinEventListeners.push(tickSubscription)

    const taskStartSubscription = BrickdocEventBus.subscribe(
      FormulaTaskStarted,
      e => {
        this.startTask(e.payload)
      },
      {
        eventId: `${t.namespaceId},${t.variableId}`,
        subscribeId: `Task#${t.namespaceId},${t.variableId}`
      }
    )
    this.builtinEventListeners.push(taskStartSubscription)

    const taskCompleteSubscription = BrickdocEventBus.subscribe(
      FormulaTaskCompleted,
      e => {
        this.completeTask(e.payload)
      },
      {
        eventId: `${t.namespaceId},${t.variableId}`,
        subscribeId: `Task#${t.namespaceId},${t.variableId}`
      }
    )
    this.builtinEventListeners.push(taskCompleteSubscription)
  }

  public onUpdate(skipPersist?: boolean): void {
    BrickdocEventBus.dispatch(FormulaUpdatedViaId(this))
    BrickdocEventBus.dispatch(FormulaUpdatedViaName(this))
    if (!skipPersist) {
      this.trackDirty()
    }
  }

  public trackDirty(): void {
    if (this.isNew) return
    this.formulaContext.dirtyFormulas[variableKey(this.t.namespaceId, this.t.variableId)] = {
      updatedAt: new Date()
    }
  }

  private async tick(uuid: string): Promise<void> {
    const tMatched = uuid === this.t.task.uuid
    const savedTMatched = uuid === this.savedT?.task.uuid

    if (!tMatched && !savedTMatched) return
    const async = tMatched ? this.t.task.async : this.savedT?.task.async
    if (!async) return

    this.onUpdate(true)
    await new Promise(resolve => setTimeout(resolve, this.tickTimeout))
    BrickdocEventBus.dispatch(
      FormulaTickViaId({ uuid, variableId: this.t.variableId, namespaceId: this.t.namespaceId })
    )
  }

  private startTask({ task }: { task: VariableTask }): void {
    const tMatched = task.uuid === this.t.task.uuid
    const savedTMatched = task.uuid === this.savedT?.task.uuid

    if (!tMatched && !savedTMatched) return

    void this.tick(task.uuid)
  }

  private completeTask({ task }: { task: VariableTask }): void {
    const tMatched = task.uuid === this.t.task.uuid
    const savedTMatched = task.uuid === this.savedT?.task.uuid

    if (!tMatched && !savedTMatched) return

    if (tMatched) {
      this.t.task = task
    }

    if (savedTMatched) {
      this.savedT!.task = task
    }

    this.onUpdate()
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

  private maybeReparseAndPersist(sourceUuid: string): void {
    if (this.currentUUID === sourceUuid) {
      return
    }
    this.currentUUID = sourceUuid

    const formula = this.buildFormula()
    this.clearDependency()
    castVariable(this, this.formulaContext, formula)
    this.trackDependency()
    this.currentUUID = undefined
    if (this.savedT?.task.async === false) {
      this.onUpdate()
    }
  }

  public updateDefinition(definition: Definition): void {
    this.t.definition = definition
    this.maybeReparseAndPersist(uuid())
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
          void this.maybeReparseAndPersist(e.payload.id)
        },
        { eventId: blockId, subscribeId: `SpreadsheetDependency#${t.variableId}` }
      )
      this.eventListeners.push(result)
    })

    t.variableDependencies.forEach(({ variableId, namespaceId }) => {
      const result = BrickdocEventBus.subscribe(
        FormulaUpdatedViaId,
        e => {
          if (e.payload.isNew) return
          void this.maybeReparseAndPersist(e.payload.t.variableId)
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
          if (e.payload.isNew) return
          void this.maybeReparseAndPersist(e.payload.t.variableId)
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
