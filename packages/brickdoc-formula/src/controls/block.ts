import { BlockInitializer, BlockType } from './types'
import {
  AnyTypeResult,
  CodeFragment,
  ContextInterface,
  ErrorMessage,
  EventDependency,
  FormulaType,
  NameDependencyWithKind,
  NamespaceId
} from '../types'
import {
  codeFragments2definition,
  CodeFragmentVisitor,
  FormulaInterpreter,
  isKey,
  spreadsheet2codeFragment,
  variable2codeFragment
} from '../grammar'
import { fetchResult } from '../context/variable'
import { BrickdocEventBus, EventSubscribed, EventType, DocSoftDeleted } from '@brickdoc/schema'
import {
  SpreadsheetUpdateNameViaId,
  FormulaBlockNameChangedOrDeleted,
  dispatchFormulaBlockNameChangeOrDelete
} from '../events'

export class BlockClass implements BlockType {
  _formulaContext: ContextInterface
  name: (pageId: NamespaceId) => string
  id: NamespaceId
  _name: string
  eventListeners: EventSubscribed[] = []

  constructor(_formulaContext: ContextInterface, { id, name }: BlockInitializer) {
    this._formulaContext = _formulaContext
    this.id = id
    this._name = name || 'Untitled'
    this.name = (pageId: NamespaceId) => {
      return this._name
    }

    const blockNameSubscription = BrickdocEventBus.subscribe(
      FormulaBlockNameChangedOrDeleted,
      async e => {
        if (!e.payload.meta.deleted) {
          this._name = e.payload.meta.name || 'Untitled'
          await this._formulaContext.setName(this.nameDependency())
        }
      },
      { subscribeId: `Block#${this.id}`, eventId: this.id }
    )

    const blockDeleteSubcription = BrickdocEventBus.subscribe(
      DocSoftDeleted,
      e => {
        void this._formulaContext.removeBlock(this.id)
      },
      {
        subscribeId: `Block#${this.id}`,
        eventId: this.id
      }
    )

    this.eventListeners.push(blockNameSubscription, blockDeleteSubcription)
  }

  persistence(): BlockInitializer {
    return {
      id: this.id,
      name: this._name
    }
  }

  public nameDependency(): NameDependencyWithKind {
    return {
      kind: 'Block',
      id: this.id,
      namespaceId: '$Block',
      name: this._name,
      renderTokens: (exist, pageId) => [
        { image: '#', type: 'Sharp' },
        pageId === this.id ? { image: 'CurrentBlock', type: 'CurrentBlock' } : { image: this.id, type: 'UUID' }
      ]
    }
  }

  public async cleanup(): Promise<void> {
    this.eventListeners.forEach(listener => {
      listener.unsubscribe()
    })
    this.eventListeners = []
    await this._formulaContext.removeName(this.id)
    await dispatchFormulaBlockNameChangeOrDelete({ id: this.id, name: this._name, deleted: true })
  }

  async handleInterpret(interpreter: FormulaInterpreter, name: string): Promise<AnyTypeResult> {
    const spreadsheet = this._formulaContext.findSpreadsheet({ namespaceId: this.id, value: name, type: 'name' })
    if (spreadsheet) {
      return { type: 'Spreadsheet', result: spreadsheet }
    }

    const variable = this._formulaContext.findVariableByName(this.id, name)
    if (!variable) {
      return { type: 'Error', result: `"${name}" not found`, errorKind: 'runtime' }
    }

    if (variable.t.task.async) {
      return (await variable.t.task.variableValue).result
    } else {
      return variable.t.task.variableValue.result
    }
  }

  handleCodeFragments(
    visitor: CodeFragmentVisitor,
    name: string,
    codeFragments: CodeFragment[]
  ): {
    errors: ErrorMessage[]
    firstArgumentType: FormulaType | undefined
    codeFragments: CodeFragment[]
  } {
    visitor.nameDependencies.push({ namespaceId: this.id, name })

    const spreadsheet = this._formulaContext.findSpreadsheet({ namespaceId: this.id, value: name, type: 'name' })
    if (spreadsheet) {
      let finalCodeFragments = codeFragments

      if (isKey(codeFragments[0])) {
        finalCodeFragments = [spreadsheet2codeFragment(spreadsheet, visitor.ctx.meta.namespaceId)]
      }

      const spreadsheetNameEventDependency: EventDependency<
        typeof SpreadsheetUpdateNameViaId extends EventType<infer X> ? X : never
      > = {
        eventId: `${spreadsheet.namespaceId},${spreadsheet.spreadsheetId}`,
        event: SpreadsheetUpdateNameViaId,
        kind: 'SpreadsheetName',
        key: `SpreadsheetName#${spreadsheet.spreadsheetId}`,
        scope: {},
        definitionHandler: (deps, variable, payload) => {
          const newCodeFragments = variable.t.variableParseResult.codeFragments.map(c => {
            if (c.code !== 'Spreadsheet') return c
            if (c.attrs.id !== payload.id) return c
            return { ...c, attrs: { ...c.attrs, name: payload.meta } }
          })
          return codeFragments2definition(newCodeFragments, variable.t.meta.namespaceId)
        }
      }

      visitor.eventDependencies.push(spreadsheetNameEventDependency, spreadsheet.eventDependency({}))

      return {
        errors: [],
        firstArgumentType: 'Spreadsheet',
        codeFragments: finalCodeFragments
      }
    }

    const variable = this._formulaContext.findVariableByName(this.id, name)
    const errors: ErrorMessage[] = []

    if (!variable) {
      errors.push({ type: 'deps', message: `"${name}" not found` })
      return {
        errors,
        firstArgumentType: undefined,
        codeFragments
      }
    }

    const firstArgumentType = fetchResult(variable.t).type

    if (variable.t.variableParseResult.async) {
      visitor.async = true
    }
    if (variable.t.variableParseResult.effect) {
      visitor.effect = true
    }
    if (variable.t.variableParseResult.persist) {
      visitor.persist = true
    }
    if (!variable.t.variableParseResult.pure) {
      visitor.pure = false
    }

    let finalCodeFragments = codeFragments

    if (isKey(codeFragments[0])) {
      finalCodeFragments = [variable2codeFragment(variable, visitor.ctx.meta.namespaceId)]
    }

    visitor.variableDependencies.push({ namespaceId: this.id, variableId: variable.t.meta.variableId })
    visitor.flattenVariableDependencies.push(...variable.t.variableParseResult.flattenVariableDependencies, {
      namespaceId: this.id,
      variableId: variable.t.meta.variableId
    })

    return {
      errors,
      firstArgumentType,
      codeFragments: finalCodeFragments
    }
  }
}
