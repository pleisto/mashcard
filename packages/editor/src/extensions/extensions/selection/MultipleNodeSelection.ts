import { Node } from 'prosemirror-model'
import { Selection } from 'prosemirror-state'
import { Mappable } from 'prosemirror-transform'

export class MultipleNodeSelection extends Selection {
  eq(selection: Selection): boolean {
    throw new Error('Method not implemented.')
  }

  map(doc: Node, mapping: Mappable): Selection {
    throw new Error('Method not implemented.')
  }

  toJSON() {
    throw new Error('Method not implemented.')
  }
}
