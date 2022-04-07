import {
  BlockNameLoad,
  BrickdocEventBus,
  EventSubscribed,
  FormulaContextNameChanged,
  FormulaContextNameRemove,
  FormulaInnerRefresh,
  FormulaTaskCompleted,
  FormulaTaskStarted,
  FormulaTickViaId,
  FormulaUpdatedViaId
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
  NamespaceId,
  VariableTask,
  NameDependencyWithKind,
  VariableRichType
} from '../types'
import { parse, interpret } from '../grammar/core'
import { dumpValue } from './persist'
import { codeFragments2definition, variableKey } from '../grammar/convert'
import { v4 as uuid } from 'uuid'
import { maybeEncodeString, shouldReceiveEvent } from '../grammar'

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

export const castVariable = async (
  oldVariable: VariableInterface | undefined,
  formulaContext: ContextInterface,
  { name, definition, cacheValue, version, blockId, id, type: unknownType, meta: unknownMeta }: BaseFormula
): Promise<VariableInterface> => {
  const meta: Omit<VariableMetadata, 'richType'> = {
    namespaceId: blockId,
    variableId: id,
    name,
    input: definition,
    position: 0
  }
  const richType = { type: unknownType, meta: unknownMeta ?? {} } as unknown as VariableRichType

  const ctx = {
    formulaContext,
    meta: { ...meta, richType },
    interpretContext: { ctx: {}, arguments: [] }
  }
  const parseResult = parse({ ctx })

  const variable = await interpret({ variable: oldVariable, isLoad: true, ctx, parseResult })
  return variable
}

export class VariableClass implements VariableInterface {
  t: VariableData
  savedT: VariableData | undefined
  isNew: boolean
  isReadyT: boolean
  isReadySavedT: boolean
  formulaContext: ContextInterface

  tickTimeout: number = 1000
  eventListeners: EventSubscribed[] = []
  currentUUID: string = uuid()
  builtinEventListeners: EventSubscribed[] = []

  constructor({ t, formulaContext }: { t: VariableData; formulaContext: ContextInterface }) {
    this.t = t
    this.formulaContext = formulaContext
    this.isNew = true
    this.isReadyT = false
    this.isReadySavedT = false

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

  public onUpdate({
    skipPersist,
    tNotMatched,
    savedTNotMatched
  }: {
    skipPersist?: boolean
    tNotMatched?: boolean
    savedTNotMatched?: boolean
  }): void {
    if (!savedTNotMatched) {
      BrickdocEventBus.dispatch(FormulaUpdatedViaId(this))
    }
    if (!skipPersist) {
      this.trackDirty()
    }

    if (!this.t.task.async) {
      const { result, success } = this.t.task.variableValue
      this.isReadyT = success && result.type !== 'Error'
    }

    if (this.savedT) {
      if (!this.savedT.task.async) {
        const { result, success } = this.savedT.task.variableValue
        this.isReadySavedT = success && result.type !== 'Error'
      }
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

    this.onUpdate({ skipPersist: true, tNotMatched: !tMatched, savedTNotMatched: !savedTMatched })
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

    this.onUpdate({ savedTNotMatched: !savedTMatched, tNotMatched: !tMatched })
  }

  public cleanup(hard: boolean): void {
    if (hard) this.formulaContext.removeName(this.t.variableId)
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

    if (hard) this.onUpdate({})
  }

  public trackDependency(): void {
    this.subscripeEvents()
    this.formulaContext.setBlock(this.t.namespaceId, '')

    this.formulaContext.setName(this.nameDependency())

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
    const block = this.formulaContext.findBlockById(this.t.namespaceId)
    if (block) {
      return block.name(pageId)
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
      richType: this.t.richType
    }
  }

  nameDependency(): NameDependencyWithKind {
    const nameToken = { image: maybeEncodeString(this.t.name)[1], type: 'StringLiteral' }
    return {
      id: this.t.variableId,
      namespaceId: this.t.namespaceId,
      name: this.t.name,
      kind: 'Variable',
      renderTokens: (namespaceIsExist: boolean, pageId: NamespaceId) => {
        if (namespaceIsExist) {
          return [nameToken]
        }

        const namespaceToken =
          pageId === this.t.namespaceId
            ? { image: 'CurrentBlock', type: 'CurrentBlock' }
            : { image: this.t.namespaceId, type: 'UUID' }

        return [{ image: '#', type: 'Sharp' }, namespaceToken, { image: '.', type: 'Dot' }, nameToken]
      }
    }
  }

  save(): void {
    this.formulaContext.commitVariable({ variable: this })
  }

  public buildFormula(definition?: string): Formula {
    const formula: Omit<Formula, 'type' | 'meta'> = {
      blockId: this.t.namespaceId,
      definition: definition ?? this.t.definition,
      id: this.t.variableId,
      name: this.t.name,
      version: this.t.version,
      cacheValue: dumpValue(fetchResult(this.t), this.t)
    }

    const richType = {
      ...this.t.richType,
      meta: this.t.richType.meta ?? {}
    } as unknown as { type: Formula['type']; meta: Formula['meta'] }

    return { ...formula, ...richType }
  }

  private async maybeReparseAndPersist(source: string, sourceUuid: string, definition?: string): Promise<void> {
    if (sourceUuid && this.currentUUID === sourceUuid) {
      return
    }
    // console.debug('reparse', source, sourceUuid, this.currentUUID, definition)

    this.currentUUID = sourceUuid

    const formula = this.buildFormula(definition)
    this.cleanup(false)
    await castVariable(this, this.formulaContext, formula)

    this.trackDependency()
    this.currentUUID = uuid()
    if (this.savedT?.task.async === false) {
      this.onUpdate({ savedTNotMatched: false })
    }
  }

  public updateDefinition(definition: Definition): void {
    void this.maybeReparseAndPersist('updateDefinition', uuid(), definition)
  }

  private subscripeEvents(): void {
    const t = this.t
    const innerRefreshSubscription = BrickdocEventBus.subscribe(
      FormulaInnerRefresh,
      e => {
        this.onUpdate({})
      },
      { eventId: `${t.namespaceId},${t.variableId}`, subscribeId: `InnerRefresh#${t.variableId}` }
    )
    this.eventListeners.push(innerRefreshSubscription)

    t.eventDependencies.forEach(dependency => {
      const eventSubscription = BrickdocEventBus.subscribe(
        dependency.event,
        e => {
          // console.log('event', this.currentUUID, { type: e.type, payload: e.payload, dependency })
          if (!shouldReceiveEvent(dependency.scope, e.payload.scope)) return
          const definition = dependency.definitionHandler?.(dependency, this, e.payload)
          void this.maybeReparseAndPersist(
            `${dependency.event.eventType}_${dependency.eventId}`,
            e.payload.key,
            definition
          )
        },
        {
          eventId: dependency.eventId,
          subscribeId: `EventDependency#${t.namespaceId},${t.variableId}#${dependency.kind}#${dependency.eventId}`
        }
      )
      this.eventListeners.push(eventSubscription)
    })

    t.blockDependencies.forEach(blockId => {
      const blockNameSubscription = BrickdocEventBus.subscribe(
        BlockNameLoad,
        e => {
          if (this.isReadySavedT) return
          void this.maybeReparseAndPersist(`BlockNameLoad_${blockId}`, blockId)
        },
        { subscribeId: `Variable#${this.t.variableId}`, eventId: blockId }
      )
      this.eventListeners.push(blockNameSubscription)
    })

    t.variableDependencies.forEach(({ variableId, namespaceId }) => {
      const variableIdSubscription = BrickdocEventBus.subscribe(
        FormulaUpdatedViaId,
        e => {
          if (e.payload.isNew) return
          const newCodeFragments = this.t.codeFragments.map(c => {
            if (c.code !== 'Variable') return c
            if (c.attrs.id !== variableId) return c
            return { ...c, attrs: { ...c.attrs, name: e.payload.t.name } }
          })
          const definition = codeFragments2definition(newCodeFragments, this.t.namespaceId)
          void this.maybeReparseAndPersist(`FormulaUpdatedViaId_${variableId}`, e.payload.t.currentUUID, definition)
        },
        {
          eventId: `${namespaceId},${variableId}`,
          subscribeId: `Dependency#${t.namespaceId},${t.variableId}`
        }
      )
      this.eventListeners.push(variableIdSubscription)
    })

    t.nameDependencies.forEach(({ name, namespaceId }) => {
      const nameSubscription = BrickdocEventBus.subscribe(
        FormulaContextNameChanged,
        e => {
          if (this.isReadySavedT) return
          void this.maybeReparseAndPersist(`FormulaContextNameChanged_${name}_${namespaceId}`, e.payload.id)
        },
        { eventId: `${namespaceId}#${name}`, subscribeId: `NameSetDependency#${t.variableId}` }
      )
      this.eventListeners.push(nameSubscription)

      const nameRemoveSubscription = BrickdocEventBus.subscribe(
        FormulaContextNameRemove,
        e => {
          void this.maybeReparseAndPersist(`FormulaContextNameRemove_${name}_${namespaceId}`, e.payload.id)
        },
        { eventId: `${namespaceId}#${name}`, subscribeId: `NameRemoveDependency#${t.variableId}` }
      )
      this.eventListeners.push(nameRemoveSubscription)
    })
  }

  private unsubscripeEvents(): void {
    this.eventListeners.forEach(listener => {
      listener.unsubscribe()
    })
    this.eventListeners = []
  }
}
