import { MashcardEventBus, EventSubscribed, EventType } from '@mashcard/schema'
import {
  ContextInterface,
  VariableData,
  VariableInterface,
  VariableMetadata,
  AnyTypeResult,
  Formula,
  BaseFormula,
  NamespaceId,
  VariableTask,
  NameDependencyWithKind,
  VariableRichType,
  EventDependency,
  VariableParseResult,
  FormulaDefinition,
  ErrorMessage,
  VariableDependency
} from '../type'
import { parse, interpret, generateVariable } from '../grammar/core'
import { dumpValue } from './persist'
import { codeFragments2definition, variableKey } from '../grammar/convert'
import { uuid } from '@mashcard/active-support'
import { cleanupEventDependency, columnDisplayIndex, maybeEncodeString, shouldReceiveEvent } from '../grammar'
import {
  FormulaBlockNameDeletedTrigger,
  FormulaBlockNameChangedTrigger,
  FormulaContextNameChanged,
  FormulaContextNameRemove,
  FormulaTaskCompleted,
  FormulaTickViaId,
  FormulaUpdatedViaId,
  FormulaVariableDependencyUpdated,
  SpreadsheetReloadViaId
} from '../events'
import { devWarning } from '@mashcard/design-system'

const MAX_LEVEL = 8

export const fetchVariableTError = ({ task }: VariableData): ErrorMessage | undefined => {
  if (task.async) return undefined
  if (task.variableValue.success) return undefined
  return task.variableValue.result.result
}

export const errorIsFatal = ({ task }: VariableData): boolean => {
  if (task.async) {
    return false
  }

  const { success, result } = task.variableValue
  if (
    !success &&
    result.type === 'Error' &&
    ['name_unique', 'name_check', 'name_invalid', 'fatal'].includes(result.result.type)
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
    position: definition.length
  }
  const richType = { type: unknownType, meta: unknownMeta ?? {} } as unknown as VariableRichType

  const ctx = {
    formulaContext,
    meta: { ...meta, richType },
    interpretContext: { ctx: {}, arguments: [] }
  }

  const parseResult = parse(ctx)
  const tempT = await interpret({ variable: oldVariable, ctx, parseResult })
  const variable = generateVariable({
    formulaContext,
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
  id: string = uuid()

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

    const tickSubscription = MashcardEventBus.subscribe(
      FormulaTickViaId,
      async e => {
        await this.tick(e.payload.uuid)
      },
      {
        eventId: `${t.meta.namespaceId},${t.meta.variableId}`,
        subscribeId: `Tick#${t.meta.namespaceId},${t.meta.variableId}`
      }
    )
    this.builtinEventListeners.push(tickSubscription)

    const taskCompleteSubscription = MashcardEventBus.subscribe(
      FormulaTaskCompleted,
      async e => {
        await this.completeTask(e.payload)
      },
      {
        eventId: `${formulaContext.username}#${t.meta.namespaceId},${t.meta.variableId}`,
        subscribeId: `Task#${t.meta.namespaceId},${t.meta.variableId}`
      }
    )
    this.builtinEventListeners.push(taskCompleteSubscription)
  }

  public async onUpdate({
    skipPersist,
    level,
    uuid
  }: {
    skipPersist?: boolean
    level?: number
    uuid?: string
  }): Promise<void> {
    const result = MashcardEventBus.dispatch(
      FormulaUpdatedViaId({
        meta: this,
        scope: null,
        key: uuid ?? this.id,
        username: this.formulaContext.username,
        level,
        namespaceId: this.t.meta.namespaceId,
        id: this.t.meta.variableId
      })
    )
    await Promise.all(result)
    if (!skipPersist) {
      this.trackDirty()
    }

    if (!this.t.task.async) {
      const { result, success } = this.t.task.variableValue
      this.isReadyT = success && result.type !== 'Error'
    }

    if (this.t.meta.richType.type === 'spreadsheet') {
      const { spreadsheetId, columnId, rowId } = this.t.meta.richType.meta
      const spreadsheet = this.formulaContext.findSpreadsheet({
        namespaceId: this.t.meta.namespaceId,
        type: 'id',
        value: spreadsheetId
      })
      if (spreadsheet) {
        const cell = spreadsheet.listCells({ rowId, columnId })[0]
        const column = spreadsheet.findColumn({ type: 'id', value: columnId, namespaceId: spreadsheet.namespaceId })
        if (cell && column) {
          const result = MashcardEventBus.dispatch(
            SpreadsheetReloadViaId({
              id: spreadsheetId,
              scope: {
                rows: [String(cell.rowIndex + 1), rowId],
                columns: [columnId, columnDisplayIndex(cell.columnIndex), ...(column ? [column.display()] : [])]
              },
              meta: null,
              level,
              namespaceId: this.t.meta.namespaceId,
              username: this.formulaContext.username,
              key: uuid ?? this.id
            })
          )
          await Promise.all(result)
        }
      }
    }
  }

  public trackDirty(): void {
    if (this.isNew) return
    this.formulaContext.dirtyFormulas[variableKey(this.t.meta.namespaceId, this.t.meta.variableId)] = {
      updatedAt: new Date()
    }
  }

  private async tick(uuid: string): Promise<void> {
    if (uuid !== this.t.task.uuid) return
    const async = this.t.task.async
    if (!async) return

    await this.onUpdate({ skipPersist: true })
    await new Promise(resolve => setTimeout(resolve, this.tickTimeout))
    MashcardEventBus.dispatch(
      FormulaTickViaId({ uuid, variableId: this.t.meta.variableId, namespaceId: this.t.meta.namespaceId })
    )
  }

  private async completeTask({ task }: { task: VariableTask }): Promise<void> {
    if (task.uuid !== this.t.task.uuid) return

    this.t.task = task
    this.subscribeDependencies()
    await this.onUpdate({})
  }

  public async cleanup(): Promise<void> {
    this.unsubscripeEvents()

    const promises = []

    for (const dependency of this.wholeVariableDependencies()) {
      const dependencyKey = variableKey(dependency.namespaceId, dependency.variableId)
      if (
        !this.formulaContext.reverseVariableDependencies[dependencyKey]?.some(
          x => x.namespaceId === this.t.meta.namespaceId && x.variableId === this.t.meta.variableId
        )
      ) {
        return
      }

      const newVariableDependencies = this.formulaContext.reverseVariableDependencies[dependencyKey].filter(
        x => !(x.namespaceId === this.t.meta.namespaceId && x.variableId === this.t.meta.variableId)
      )

      this.formulaContext.reverseVariableDependencies[dependencyKey] = newVariableDependencies

      const result = MashcardEventBus.dispatch(
        FormulaVariableDependencyUpdated({
          meta: newVariableDependencies,
          scope: null,
          key: this.id,
          username: this.formulaContext.username,
          level: 0,
          namespaceId: dependency.namespaceId,
          id: dependency.variableId
        })
      )

      promises.push(...result)
    }

    for (const dependency of this.t.variableParseResult.functionDependencies) {
      const dependencyKey = dependency.key
      const functionDependencies = this.formulaContext.reverseFunctionDependencies[dependencyKey]

      if (
        !functionDependencies?.some(
          x => x.namespaceId === this.t.meta.namespaceId && x.variableId === this.t.meta.variableId
        )
      ) {
        return
      }

      const newFunctionDependencies = functionDependencies.filter(
        x => !(x.namespaceId === this.t.meta.namespaceId && x.variableId === this.t.meta.variableId)
      )

      this.formulaContext.reverseFunctionDependencies[dependencyKey] = newFunctionDependencies
    }

    await Promise.all(promises)
  }

  public async trackDependency(): Promise<void> {
    this.subscribeDependencies()

    const promises = []

    for (const dependency of this.wholeVariableDependencies()) {
      const dependencyKey = variableKey(dependency.namespaceId, dependency.variableId)
      if (
        this.formulaContext.reverseVariableDependencies[dependencyKey]?.some(
          x => x.namespaceId === this.t.meta.namespaceId && x.variableId === this.t.meta.variableId
        )
      ) {
        return
      }

      const newVariableDependencies = [
        ...(this.formulaContext.reverseVariableDependencies[dependencyKey] ?? []),
        { namespaceId: this.t.meta.namespaceId, variableId: this.t.meta.variableId }
      ]

      this.formulaContext.reverseVariableDependencies[dependencyKey] = newVariableDependencies

      const result = MashcardEventBus.dispatch(
        FormulaVariableDependencyUpdated({
          meta: newVariableDependencies,
          scope: null,
          key: this.id,
          username: this.formulaContext.username,
          level: 0,
          namespaceId: dependency.namespaceId,
          id: dependency.variableId
        })
      )

      promises.push(...result)
    }

    this.t.variableParseResult.functionDependencies.forEach(dependency => {
      const dependencyKey = dependency.key!
      if (
        this.formulaContext.reverseFunctionDependencies[dependencyKey]?.some(
          x => x.namespaceId === this.t.meta.namespaceId && x.variableId === this.t.meta.variableId
        )
      ) {
        return
      }

      const newFunctionDependencies = [
        ...(this.formulaContext.reverseFunctionDependencies[dependencyKey] ?? []),
        { namespaceId: this.t.meta.namespaceId, variableId: this.t.meta.variableId }
      ]

      this.formulaContext.reverseFunctionDependencies[dependencyKey] = newFunctionDependencies
    })

    await Promise.all(promises)
    await this.formulaContext.setName(this.nameDependency())
  }

  namespaceName(pageId: NamespaceId): string {
    const block = this.formulaContext.findBlockById(this.t.meta.namespaceId)
    if (block) {
      return block.name(pageId)
    }

    return 'UnknownPage'
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

  public wholeFlattenVariableDependencies(): VariableDependency[] {
    const dependencies: VariableDependency[] = []

    if (!this.t.task.async) {
      dependencies.push(...(this.t.task.variableValue.runtimeFlattenVariableDependencies ?? []))
    }

    dependencies.push(...this.t.variableParseResult.flattenVariableDependencies)

    return [...new Map(dependencies.map(item => [item.variableId, item])).values()]
  }

  public wholeVariableDependencies(): VariableDependency[] {
    const dependencies: VariableDependency[] = []
    if (!this.t.task.async) {
      dependencies.push(...(this.t.task.variableValue.runtimeVariableDependencies ?? []))
    }

    dependencies.push(...this.t.variableParseResult.variableDependencies)
    return [...new Map(dependencies.map(item => [item.variableId, item])).values()]
  }

  public buildFormula(input?: FormulaDefinition): Formula {
    const formula: Omit<Formula, 'type' | 'meta'> = {
      blockId: this.t.meta.namespaceId,
      definition: input?.definition ?? this.t.variableParseResult.definition,
      id: this.t.meta.variableId,
      name: input?.name ?? this.t.meta.name,
      version: this.t.variableParseResult.version,
      cacheValue: dumpValue(fetchResult(this.t), this.t)
    }

    const richType = {
      ...this.t.meta.richType,
      meta: this.t.meta.richType.meta ?? {}
    } as unknown as { type: Formula['type']; meta: Formula['meta'] }

    return { ...formula, ...richType }
  }

  private async maybeReparseAndPersist(
    source: string,
    sourceUuid: string,
    level: number,
    input?: FormulaDefinition
  ): Promise<void> {
    // console.log('reparse', [sourceUuid, this.currentUUID, this.id], [this.t.meta.name, source, level, input])

    if (level > MAX_LEVEL) {
      devWarning(true, 'reparse: max level reached', source, sourceUuid)
      return
    }

    if (sourceUuid === this.id) return
    if (sourceUuid === this.currentUUID) return

    this.currentUUID = sourceUuid

    const formula = this.buildFormula(input)

    const meta: VariableMetadata = {
      namespaceId: formula.blockId,
      variableId: formula.id,
      name: formula.name,
      input: formula.definition,
      position: formula.definition.length,
      richType: this.t.meta.richType
    }

    const ctx = {
      formulaContext: this.formulaContext,
      meta,
      interpretContext: { ctx: {}, arguments: [] }
    }

    const parseResult = parse(ctx)
    if (parseResult.errorMessages[0]?.type === 'circular_dependency') {
      if (
        !this.t.task.async &&
        this.t.task.variableValue.result.type === 'Error' &&
        this.t.task.variableValue.result.result.type === 'circular_dependency'
      ) {
        // Skip circular dependency
        return
      }
    }
    const tempT = await interpret({ variable: this, ctx, parseResult })

    await this.cleanup()
    this.t = tempT

    await this.trackDependency()
    this.currentUUID = uuid()
    if (!this.t.task.async) {
      await this.onUpdate({ level: level + 1, uuid: sourceUuid })
    }
  }

  public async updateDefinition(input: FormulaDefinition): Promise<void> {
    await this.maybeReparseAndPersist('updateDefinition', uuid(), 0, input)
  }

  private setupEventDependencies(): void {
    const {
      task,
      variableParseResult: { eventDependencies, blockDependencies, nameDependencies }
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
    this.wholeVariableDependencies().forEach(({ variableId, namespaceId }) => {
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
      const blockNameChangedEventDependency: EventDependency<
        typeof FormulaBlockNameChangedTrigger extends EventType<infer X> ? X : never
      > = {
        kind: 'BlockRename',
        event: FormulaBlockNameChangedTrigger,
        eventId: `${this.formulaContext.username}#${blockId}`,
        scope: {},
        key: `BlockRename#${blockId}`,
        definitionHandler: (deps, variable, payload) => {
          const newCodeFragments = this.t.variableParseResult.codeFragments.map(c => {
            if (c.code !== 'Block') return c
            if (c.attrs.id !== blockId) return c
            return { ...c, attrs: { ...c.attrs, name: payload.meta } }
          })
          return codeFragments2definition(newCodeFragments, this.t.meta.namespaceId)
        }
      }
      const blockNameDeleteEventDependency: EventDependency<
        typeof FormulaBlockNameDeletedTrigger extends EventType<infer X> ? X : never
      > = {
        kind: 'BlockDelete',
        event: FormulaBlockNameDeletedTrigger,
        eventId: `${this.formulaContext.username}#${blockId}`,
        scope: {},
        key: `BlockDelete#${blockId}`
      }
      this.eventDependencies.push(blockNameChangedEventDependency, blockNameDeleteEventDependency)
    })

    nameDependencies.forEach(({ name, namespaceId }) => {
      // 1. Variable or Spreadsheet name
      const nameChangeEventDependency: EventDependency<
        typeof FormulaContextNameChanged extends EventType<infer X> ? X : never
      > = {
        kind: 'NameChange',
        event: FormulaContextNameChanged,
        eventId: `${this.formulaContext.username}#${namespaceId}#${name}`,
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
        eventId: `${this.formulaContext.username}#$Block#${name}`,
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
        eventId: `${this.formulaContext.username}#${namespaceId}#${name}`,
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
      const eventSubscription = MashcardEventBus.subscribe(
        dependency.event,
        async e => {
          // console.log('event', dependency.event.eventType, this.currentUUID, e.payload.key, e.payload.level, {
          //   type: e.type,
          //   payload: e.payload,
          //   dependency
          // })
          if (!shouldReceiveEvent(dependency.scope, e.payload.scope)) return
          if (dependency.skipIf?.(this, e.payload)) return
          const definition = dependency.definitionHandler?.(dependency, this, e.payload)
          await this.maybeReparseAndPersist(
            `${dependency.event.eventType}_${dependency.eventId}`,
            e.payload.key,
            e.payload.level ?? 0,
            { definition }
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
