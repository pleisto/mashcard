import { BlockInitializer, BlockType } from './types'
import { ContextInterface, NamespaceId } from '../types'

export class BlockClass implements BlockType {
  _formulaContext: ContextInterface
  name: () => string
  id: NamespaceId

  constructor(_formulaContext: ContextInterface, { id }: BlockInitializer) {
    this._formulaContext = _formulaContext
    this.id = id
    this.name = () => {
      const formulaName = this._formulaContext.formulaNames.find(n => n.key === id && n.kind === 'Block')
      if (formulaName) {
        return formulaName.name
      }

      return 'Unknown'
    }
  }

  persistence(): BlockInitializer {
    return {
      id: this.id
    }
  }
}
