import { Node } from 'prosemirror-model'
import { Mappable } from 'prosemirror-transform'
import { MultipleNodeSelection } from './MultipleNodeSelection'

export class MultipleNodeBookmark {
  public anchor: number
  public head: number

  constructor(anchor: number, head: number) {
    this.anchor = anchor
    this.head = head
  }

  map(mapping: Mappable): MultipleNodeBookmark {
    return new MultipleNodeBookmark(mapping.map(this.anchor), mapping.map(this.head))
  }

  resolve(doc: Node): MultipleNodeSelection {
    const $anchorPos = doc.resolve(this.anchor)
    const $headPos = doc.resolve(this.head)

    return new MultipleNodeSelection($anchorPos, $headPos)
  }
}
