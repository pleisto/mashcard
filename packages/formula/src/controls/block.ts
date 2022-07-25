import { BlockInitializer, BlockType } from './types'
import {
  AnyTypeResult,
  CodeFragment,
  ContextInterface,
  ErrorMessage,
  FormulaType,
  NameDependencyWithKind,
  NamespaceId
} from '../type'
import {
  CodeFragmentVisitor,
  FormulaInterpreter,
  isKey,
  spreadsheet2codeFragment,
  variable2codeFragment
} from '../grammar'
import { fetchResult } from '../context/variable'
import { MashcardEventBus, EventSubscribed } from '@mashcard/schema'
import { FormulaBlockNameChangedTrigger, FormulaBlockNameDeletedTrigger, FormulaDocSoftDeleted } from '../events'
import { parseTrackName, parseTrackSpreadsheet, parseTrackVariable } from '../grammar/dependency'

export class BlockClass implements BlockType {
  _formulaContext: ContextInterface
  name: (pageId: NamespaceId) => string
  id: NamespaceId
  _name: string
  eventListeners: EventSubscribed[] = []

  constructor(_formulaContext: ContextInterface, { id, name }: BlockInitializer) {
    this._formulaContext = _formulaContext
    this.id = id
    this._name = name
    this.name = (pageId: NamespaceId) => {
      return this._name
    }

    const blockNameSubscription = MashcardEventBus.subscribe(
      FormulaBlockNameChangedTrigger,
      async e => {
        this._name = e.payload.meta
        await this._formulaContext.setName(this.nameDependency())
      },
      { subscribeId: `Block#${this.id}`, eventId: `${this._formulaContext.username}#${this.id}` }
    )

    const blockDeleteSubcription = MashcardEventBus.subscribe(
      FormulaDocSoftDeleted,
      async e => {
        await this._formulaContext.removeBlock(this.id)
      },
      { subscribeId: `Block#${this.id}`, eventId: `${this._formulaContext.username}#${this.id}` }
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
    const result = MashcardEventBus.dispatch(
      FormulaBlockNameDeletedTrigger({
        id: this.id,
        namespaceId: this.id,
        source: [{ id: this.id, type: 'blockDelete' }],
        username: this._formulaContext.username,
        scope: null,
        meta: this._name
      })
    )
    await Promise.all(result)
  }

  async handleInterpret(interpreter: FormulaInterpreter, name: string): Promise<AnyTypeResult> {
    const spreadsheet = this._formulaContext.findSpreadsheet({ namespaceId: this.id, value: name, type: 'name' })
    if (spreadsheet) {
      return { type: 'Spreadsheet', result: spreadsheet }
    }

    const variable = this._formulaContext.findVariableByName(this.id, name)
    if (!variable) {
      return { type: 'Error', result: { message: `"${name}" not found`, type: 'runtime' } }
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
    oldCodeFragments: CodeFragment[]
  ): {
    errors: ErrorMessage[]
    firstArgumentType: FormulaType | undefined
    codeFragments: CodeFragment[]
  } {
    const codeFragments: CodeFragment[] = oldCodeFragments.map(c => ({ ...c, namespaceId: this.id }))
    const spreadsheet = this._formulaContext.findSpreadsheet({ namespaceId: this.id, value: name, type: 'name' })
    if (spreadsheet) {
      let finalCodeFragments = codeFragments

      if (isKey(codeFragments[0])) {
        finalCodeFragments = [spreadsheet2codeFragment(spreadsheet, visitor.ctx.meta.namespaceId)]
      }

      parseTrackSpreadsheet(visitor, spreadsheet)

      return {
        errors: [],
        firstArgumentType: 'Spreadsheet',
        codeFragments: finalCodeFragments
      }
    }

    const variable = this._formulaContext.findVariableByName(this.id, name)
    const errors: ErrorMessage[] = []

    if (!variable) {
      parseTrackName(visitor, name, this.id)
      errors.push({ type: 'deps', message: `"${name}" not found` })
      return {
        errors,
        firstArgumentType: undefined,
        codeFragments
      }
    }

    const firstArgumentType = fetchResult(variable.t).type

    parseTrackVariable(visitor, variable)

    let finalCodeFragments = codeFragments

    if (isKey(codeFragments[0])) {
      finalCodeFragments = [variable2codeFragment(variable, visitor.ctx.meta.namespaceId)]
    }

    return {
      errors,
      firstArgumentType,
      codeFragments: finalCodeFragments
    }
  }
}
