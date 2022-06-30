import { Node, ResolvedPos, Slice, Fragment } from 'prosemirror-model'
import { Selection, SelectionBookmark, SelectionRange, Transaction } from 'prosemirror-state'
import { Mappable } from 'prosemirror-transform'
import { MultipleNodeBookmark } from './MultipleNodeBookmark'

/**
 * JSON format for Multiple Node Selection
 */
interface MultipleNodeJson {
  /**
   * type always be 'multiple-node'
   */
  type: 'multiple-node'
  /**
   * anchor position
   */
  anchor: number
  /**
   * head position
   */
  head: number
}

/**
 * A prosemirror selection for multiple nodes selection
 */
export class MultipleNodeSelection extends Selection {
  public $anchorPos: ResolvedPos
  public $headPos: ResolvedPos

  constructor($anchorPos: ResolvedPos, $headPos: ResolvedPos = $anchorPos) {
    const doc = $anchorPos.node(0)
    const ranges: SelectionRange[] = []

    const from = Math.min($anchorPos.pos, $headPos.pos)
    const to = Math.max($anchorPos.pos, $headPos.pos)

    doc.nodesBetween(from, to, (node, pos) => {
      ranges.push(new SelectionRange(doc.resolve(pos), doc.resolve(pos + node.nodeSize)))
      return false
    })

    super(ranges[0].$from, ranges[0].$to, ranges)

    this.$anchorPos = $anchorPos
    this.$headPos = $headPos
  }

  /**
   * checks if selection is equal to current selection
   * @param selection to compared Selection
   * @returns boolean value if input selection equals to current selection
   */
  eq(selection: Selection): boolean {
    if (!(selection instanceof MultipleNodeSelection)) return false
    if (this.ranges.length !== selection.ranges.length) return false

    for (let index = 0; index < this.ranges.length; index++) {
      if (this.ranges[index].$from !== selection.ranges[index].$from) return false
      if (this.ranges[index].$to !== selection.ranges[index].$to) return false
    }

    return true
  }

  /**
   * map to a new selection
   * @param doc Document node
   * @param mapping  Mappable object
   * @returns
   */
  map(doc: Node, mapping: Mappable): MultipleNodeSelection {
    const $anchorPos = doc.resolve(mapping.map(this.$anchorPos.pos))
    const $headPos = doc.resolve(mapping.map(this.$headPos.pos))

    return new MultipleNodeSelection($anchorPos, $headPos)
  }

  /**
   * returns a slice of selected nodes
   */
  override content(): Slice {
    return new Slice(Fragment.from(this.ranges.map(range => range.$from.nodeAfter!).filter(node => !!node)), 1, 1)
  }

  /**
   * replace the the content of current selection.
   * @param tr transaction object
   * @param content the slice used to replace
   */
  override replace(tr: Transaction, content?: Slice | undefined): void {
    const mapFrom = tr.steps.length
    for (let i = 0; i < this.ranges.length; i++) {
      const { $from, $to } = this.ranges[i]
      const mapping = tr.mapping.slice(mapFrom)

      const replacedContent = i ? Slice.empty : content
      tr.replace(mapping.map($from.pos), mapping.map($to.pos), replacedContent)
    }
    const selection = Selection.findFrom(tr.doc.resolve(tr.mapping.slice(mapFrom).map(this.to)), -1)
    if (selection) tr.setSelection(selection)
  }

  /**
   * replace the the content of current selection by specified node.
   * @param tr transaction object.
   * @param node  the node used to replace
   */
  override replaceWith(tr: Transaction, node: Node): void {
    this.replace(tr, new Slice(Fragment.from(node), 0, 0))
  }

  override getBookmark(): SelectionBookmark {
    return new MultipleNodeBookmark(this.$anchorPos.pos, this.$headPos.pos)
  }

  /**
   * converts MultipleNodeSelection to JSON object
   * @returns
   */
  toJSON(): MultipleNodeJson {
    return {
      type: 'multiple-node',
      anchor: this.$anchorPos.pos,
      head: this.$headPos.pos
    }
  }

  /**
   * converts JSON object to MultipleNodeSelection
   * @param doc Document node
   * @param json
   * @returns
   */
  static override fromJSON(doc: Node, json: MultipleNodeJson): MultipleNodeSelection {
    return new MultipleNodeSelection(doc.resolve(json.anchor), doc.resolve(json.head))
  }

  /**
   * creates a new MultipleNodeSelection
   * @param doc Document node
   * @param anchor anchor position
   * @param head head position
   * @returns
   */
  static create(doc: Node, anchor: number, head: number = anchor): MultipleNodeSelection {
    return new MultipleNodeSelection(doc.resolve(anchor), doc.resolve(head))
  }
}

MultipleNodeSelection.prototype.visible = false

Selection.jsonID('multipleNode', MultipleNodeSelection)
