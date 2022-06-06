import { BrickdocEventBus, EventSubscribed, EventType } from '@brickdoc/schema'
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
  VariableRichType,
  EventDependency,
  VariableParseResult
} from '../types'
import { parse, interpret, generateVariable } from '../grammar/core'
import { dumpValue } from './persist'
import { codeFragments2definition, variableKey } from '../grammar/convert'
import { uuid } from '@brickdoc/active-support'
import { cleanupEventDependency, maybeEncodeString, shouldReceiveEvent } from '../grammar'
import {
  FormulaBlockNameChangedOrDeleted,
  FormulaContextNameChanged,
  FormulaContextNameRemove,
  FormulaInnerRefresh,
  FormulaTaskCompleted,
  FormulaTaskStarted,
  FormulaTickViaId,
  FormulaUpdatedViaId
} from '../events'

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
  const parseResult = parse(ctx)

  // console.log('debug parseResult', name, { parseResult })

  const tempT = await interpret({ variable: oldVariable, ctx, parseResult })
  const variable = generateVariable({
    formulaContext,
    variable: oldVariable,
    t: tempT,
    isLoad: true
  })
  return variable
}

export class VariableClass implements VariableInterface {
  t: VariableData
  isNew: boolean
  isReadyT: boolean
  formulaContext: ContextInterface

  tickTimeout: number = 100000
  eventListeners: EventSubscribed[] = []
  currentUUID: string = uuid()
  builtinEventListeners: EventSubscribed[] = []
  eventDependencies: VariableParseResult['eventDependencies'] = []

  constructor({ t, formulaContext }: { t: VariableData; formulaContext: ContextInterface }) {
    this.t = t
    this.formulaContext = formulaContext
    this.isNew = true
    this.isReadyT = false

    const tickSubscription = BrickdocEventBus.subscribe(
      FormulaTickViaId,
      e => {
        void this.tick(e.payload.uuid)
      },
      {
        eventId: `${t.meta.namespaceId},${t.meta.variableId}`,
        subscribeId: `Tick#${t.meta.namespaceId},${t.meta.variableId}`
      }
    )
    this.builtinEventListeners.push(tickSubscription)

    const taskStartSubscription = BrickdocEventBus.subscribe(
      FormulaTaskStarted,
      e => {
        this.startTask(e.payload)
      },
      {
        eventId: `${t.meta.namespaceId},${t.meta.variableId}`,
        subscribeId: `Task#${t.meta.namespaceId},${t.meta.variableId}`
      }
    )
    this.builtinEventListeners.push(taskStartSubscription)

    const taskCompleteSubscription = BrickdocEventBus.subscribe(
      FormulaTaskCompleted,
      e => {
        this.completeTask(e.payload)
      },
      {
        eventId: `${t.meta.namespaceId},${t.meta.variableId}`,
        subscribeId: `Task#${t.meta.namespaceId},${t.meta.variableId}`
      }
    )
    this.builtinEventListeners.push(taskCompleteSubscription)

    const innerRefreshEventSubscription = BrickdocEventBus.subscribe(
      FormulaInnerRefresh,
      e => {
        this.onUpdate({})
      },
      { eventId: `${t.meta.namespaceId},${t.meta.variableId}`, subscribeId: `InnerRefresh#${t.meta.variableId}` }
    )
    this.builtinEventListeners.push(innerRefreshEventSubscription)
  }

  public onUpdate({ skipPersist }: { skipPersist?: boolean }): void {
    BrickdocEventBus.dispatch(
      FormulaUpdatedViaId({
        meta: this,
        scope: null,
        key: this.currentUUID,
        namespaceId: this.t.meta.namespaceId,
        id: this.t.meta.variableId
      })
    )
    if (!skipPersist) {
      this.trackDirty()
    }

    if (!this.t.task.async) {
      const { result, success } = this.t.task.variableValue
      this.isReadyT = success && result.type !== 'Error'
    }
  }

  public trackDirty(): void {
    if (this.isNew) return
    this.formulaContext.dirtyFormulas[variableKey(this.t.meta.namespaceId, this.t.meta.variableId)] = {
      updatedAt: new Date()
    }
  }

  private async tick(uuid: string): Promise<void> {
    const tMatched = uuid === this.t.task.uuid

    if (!tMatched) return
    const async = this.t.task.async
    if (!async) return

    this.onUpdate({ skipPersist: true })
    await new Promise(resolve => setTimeout(resolve, this.tickTimeout))
    BrickdocEventBus.dispatch(
      FormulaTickViaId({ uuid, variableId: this.t.meta.variableId, namespaceId: this.t.meta.namespaceId })
    )
  }

  private startTask({ task }: { task: VariableTask }): void {
    const tMatched = task.uuid === this.t.task.uuid
    if (!tMatched) return

    void this.tick(task.uuid)
  }

  private completeTask({ task }: { task: VariableTask }): void {
    const tMatched = task.uuid === this.t.task.uuid
    if (!tMatched) return

    this.t.task = task

    this.subscribeDependencies()
    this.onUpdate({})
  }

  public cleanup(hard: boolean): void {
    if (hard) this.formulaContext.removeName(this.t.meta.variableId)
    this.unsubscripeEvents()

    this.t.variableParseResult.variableDependencies.forEach(dependency => {
      const dependencyKey = variableKey(dependency.namespaceId, dependency.variableId)
      const variableDependencies = this.formulaContext.reverseVariableDependencies[dependencyKey]
        ? this.formulaContext.reverseVariableDependencies[dependencyKey].filter(
            x => !(x.namespaceId === this.t.meta.namespaceId && x.variableId === this.t.meta.variableId)
          )
        : []
      this.formulaContext.reverseVariableDependencies[dependencyKey] = [...variableDependencies]
    })

    this.t.variableParseResult.functionDependencies.forEach(dependency => {
      const dependencyKey = dependency.key
      const functionDependencies = this.formulaContext.reverseFunctionDependencies[dependencyKey]
        ? this.formulaContext.reverseFunctionDependencies[dependencyKey].filter(
            x => !(x.namespaceId === this.t.meta.namespaceId && x.variableId === this.t.meta.variableId)
          )
        : []
      this.formulaContext.reverseFunctionDependencies[dependencyKey] = [...functionDependencies]
    })

    if (hard) this.onUpdate({})
  }

  public trackDependency(): void {
    this.subscribeDependencies()
    // this.formulaContext.setBlock(this.t.meta.namespaceId, '')

    this.formulaContext.setName(this.nameDependency())

    this.t.variableParseResult.variableDependencies.forEach(dependency => {
      const dependencyKey = variableKey(dependency.namespaceId, dependency.variableId)
      this.formulaContext.reverseVariableDependencies[dependencyKey] ||= []
      this.formulaContext.reverseVariableDependencies[dependencyKey] = [
        ...this.formulaContext.reverseVariableDependencies[dependencyKey].filter(
          ({ namespaceId, variableId }) =>
            !(namespaceId === this.t.meta.namespaceId && variableId === this.t.meta.variableId)
        ),
        { namespaceId: this.t.meta.namespaceId, variableId: this.t.meta.variableId }
      ]
    })

    this.t.variableParseResult.functionDependencies.forEach(dependency => {
      const dependencyKey = dependency.key!
      this.formulaContext.reverseFunctionDependencies[dependencyKey] ||= []
      this.formulaContext.reverseFunctionDependencies[dependencyKey] = [
        ...this.formulaContext.reverseFunctionDependencies[dependencyKey].filter(
          ({ namespaceId, variableId }) =>
            !(namespaceId === this.t.meta.namespaceId && variableId === this.t.meta.variableId)
        ),
        { namespaceId: this.t.meta.namespaceId, variableId: this.t.meta.variableId }
      ]
    })
  }

  namespaceName(pageId: NamespaceId): string {
    const block = this.formulaContext.findBlockById(this.t.meta.namespaceId)
    if (block) {
      return block.name(pageId)
    }

    return 'Unknown'
  }

  meta(): VariableMetadata {
    return {
      namespaceId: this.t.meta.namespaceId,
      variableId: this.t.meta.variableId,
      name: this.t.meta.name,
      position: this.t.variableParseResult.position,
      input: this.t.variableParseResult.definition,
      richType: this.t.meta.richType
    }
  }

  nameDependency(): NameDependencyWithKind {
    const nameToken = { image: maybeEncodeString(this.t.meta.name)[1], type: 'StringLiteral' }
    return {
      id: this.t.meta.variableId,
      namespaceId: this.t.meta.namespaceId,
      name: this.t.meta.name,
      kind: 'Variable',
      renderTokens: (namespaceIsExist: boolean, pageId: NamespaceId) => {
        if (namespaceIsExist) {
          return [nameToken]
        }

        const namespaceToken =
          pageId === this.t.meta.namespaceId
            ? { image: 'CurrentBlock', type: 'CurrentBlock' }
            : { image: this.t.meta.namespaceId, type: 'UUID' }

        return [{ image: '#', type: 'Sharp' }, namespaceToken, { image: '.', type: 'Dot' }, nameToken]
      }
    }
  }

  async save(): Promise<void> {
    await this.formulaContext.commitVariable({ variable: this })
  }

  public buildFormula(definition?: string): Formula {
    const formula: Omit<Formula, 'type' | 'meta'> = {
      blockId: this.t.meta.namespaceId,
      definition: definition ?? this.t.variableParseResult.definition,
      id: this.t.meta.variableId,
      name: this.t.meta.name,
      version: this.t.variableParseResult.version,
      cacheValue: dumpValue(fetchResult(this.t), this.t)
    }

    const richType = {
      ...this.t.meta.richType,
      meta: this.t.meta.richType.meta ?? {}
    } as unknown as { type: Formula['type']; meta: Formula['meta'] }

    return { ...formula, ...richType }
  }

  private async maybeReparseAndPersist(source: string, sourceUuid: string, definition?: string): Promise<void> {
    // console.debug(`reparse: ${sourceUuid && this.currentUUID === sourceUuid}`, this.t.meta.name, source, definition)

    if (sourceUuid && this.currentUUID === sourceUuid) {
      return
    }

    this.currentUUID = sourceUuid

    const formula = this.buildFormula(definition)
    this.cleanup(false)
    await castVariable(this, this.formulaContext, formula)

    this.trackDependency()
    this.currentUUID = uuid()
    if (!this.t.task.async) {
      this.onUpdate({})
    }
  }

  public async updateDefinition(definition: Definition): Promise<void> {
    await this.maybeReparseAndPersist('updateDefinition', uuid(), definition)
  }

  private setupEventDependencies(): void {
    const {
      task,
      variableParseResult: { eventDependencies, variableDependencies, blockDependencies, nameDependencies }
    } = this.t
    this.eventDependencies = []

    const finalEventDependencies = task.async
      ? cleanupEventDependency('parse', eventDependencies)
      : [
          ...new Map(
            [
              ...cleanupEventDependency('parse', eventDependencies),
              ...cleanupEventDependency('runtime', task.variableValue.runtimeEventDependencies ?? [])
            ].map(item => [`${item.kind},${item.event.eventType},${item.eventId},${item.key}`, item])
          ).values()
        ]

    this.eventDependencies.push(...finalEventDependencies)

    // Variable Dependency Update
    variableDependencies.forEach(({ variableId, namespaceId }) => {
      const variableEventDependency: EventDependency<
        typeof FormulaUpdatedViaId extends EventType<infer X> ? X : never
      > = {
        kind: 'Variable',
        event: FormulaUpdatedViaId,
        eventId: `${namespaceId},${variableId}`,
        scope: {},
        key: `Variable#${variableId}`,
        skipIf: (variable, payload) => payload.meta.isNew,
        definitionHandler: (deps, variable, payload) => {
          const newCodeFragments = this.t.variableParseResult.codeFragments.map(c => {
            if (c.code !== 'Variable') return c
            if (c.attrs.id !== variableId) return c
            return { ...c, attrs: { ...c.attrs, name: payload.meta.t.meta.name } }
          })
          return codeFragments2definition(newCodeFragments, this.t.meta.namespaceId)
        }
      }
      this.eventDependencies.push(variableEventDependency)
    })

    // Block rename or delete
    blockDependencies.forEach(blockId => {
      const blockNameEventDependency: EventDependency<
        typeof FormulaBlockNameChangedOrDeleted extends EventType<infer X> ? X : never
      > = {
        kind: 'BlockRenameOrDelete',
        event: FormulaBlockNameChangedOrDeleted,
        eventId: blockId,
        scope: {},
        key: `BlockRenameOrDelete#${blockId}`,
        definitionHandler: (deps, variable, payload) => {
          if (payload.meta.deleted) return undefined
          const newCodeFragments = this.t.variableParseResult.codeFragments.map(c => {
            if (c.code !== 'Block') return c
            if (c.attrs.id !== blockId) return c
            return { ...c, attrs: { ...c.attrs, name: payload.meta.name } }
          })
          return codeFragments2definition(newCodeFragments, this.t.meta.namespaceId)
        }
      }
      this.eventDependencies.push(blockNameEventDependency)
    })

    nameDependencies.forEach(({ name, namespaceId }) => {
      // 1. Variable or Spreadsheet name
      const nameChangeEventDependency: EventDependency<
        typeof FormulaContextNameChanged extends EventType<infer X> ? X : never
      > = {
        kind: 'NameChange',
        event: FormulaContextNameChanged,
        eventId: `${namespaceId}#${name}`,
        scope: {},
        key: `OtherNameChange#${namespaceId}#${name}`,
        skipIf: (variable, payload) => variable.isReadyT
      }

      // 2. Block name
      const blockNameChangeEventDependency: EventDependency<
        typeof FormulaContextNameChanged extends EventType<infer X> ? X : never
      > = {
        kind: 'NameChange',
        event: FormulaContextNameChanged,
        eventId: `$Block#${name}`,
        scope: {},
        key: `BlockNameChange#${namespaceId}#${name}`,
        skipIf: (variable, payload) => variable.isReadyT
      }
      this.eventDependencies.push(blockNameChangeEventDependency)

      // 3. Variable or Spreadsheet delete
      const nameRemoveEventDependency: EventDependency<
        typeof FormulaContextNameRemove extends EventType<infer X> ? X : never
      > = {
        kind: 'NameRemove',
        event: FormulaContextNameRemove,
        eventId: `${namespaceId}#${name}`,
        scope: {},
        key: `OtherNameRemove#${namespaceId}#${name}`,
        skipIf: (variable, payload) => !variable.isReadyT
      }

      // 4. Block delete
      // const blockNameRemoveEventDependency: EventDependency<
      //   typeof FormulaContextNameRemove extends EventType<infer X> ? X : never
      // > = {
      //   kind: 'NameRemove',
      //   event: FormulaContextNameRemove,
      //   eventId: `$Block#${name}`,
      //   scope: {},
      //   key: `BlockNameRemove#${namespaceId}#${name}`
      // }

      this.eventDependencies.push(
        nameChangeEventDependency,
        blockNameChangeEventDependency,
        nameRemoveEventDependency
        // blockNameRemoveEventDependency
      )
    })
  }

  private subscribeDependencies(): void {
    this.unsubscripeEvents()

    this.setupEventDependencies()
    this.eventDependencies.forEach(dependency => {
      const eventSubscription = BrickdocEventBus.subscribe(
        dependency.event,
        e => {
          // console.log('event', dependency.event.eventType, this.formulaContext, this, this.currentUUID, {
          //   type: e.type,
          //   payload: e.payload,
          //   dependency
          // })
          if (!shouldReceiveEvent(dependency.scope, e.payload.scope)) return
          if (dependency.skipIf?.(this, e.payload)) return
          const definition = dependency.definitionHandler?.(dependency, this, e.payload)
          void this.maybeReparseAndPersist(
            `${dependency.event.eventType}_${dependency.eventId}`,
            e.payload.key,
            definition
          )
        },
        {
          eventId: dependency.eventId,
          subscribeId: `EventDependency#${this.t.meta.namespaceId},${this.t.meta.variableId}#${dependency.kind}#${dependency.eventId}`
        }
      )
      this.eventListeners.push(eventSubscription)
    })
  }

  private unsubscripeEvents(): void {
    this.eventListeners.forEach(listener => {
      listener.unsubscribe()
    })
    this.eventListeners = []
  }
}
