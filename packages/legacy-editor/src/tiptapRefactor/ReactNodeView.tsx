import {
  Decoration,
  Node,
  NodePortalStore,
  NodeSelection,
  ReactNodeView as EditorReactNodeView
} from '@mashcard/editor'
import { NodeViewRendererProps, NodeViewProps, Editor } from '@tiptap/core'
import { ComponentType } from 'react'
import { ReactNodeViewRendererOptions } from './ReactNodeViewRenderer'

function isiOS(): boolean {
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  )
}

export class ReactNodeView extends EditorReactNodeView<NodeViewProps> {
  options: Partial<ReactNodeViewRendererOptions>
  isDragging: boolean = false
  selected: boolean = false

  private componentProps: NodeViewProps

  // eslint-disable-next-line max-params
  constructor(
    editor: Editor,
    props: NodeViewRendererProps,
    options: Partial<ReactNodeViewRendererOptions>,
    component: ComponentType<NodeViewProps>,
    nodePortalStore: NodePortalStore
  ) {
    // Super call must be the first statement.
    // So componentProps have to defined twice.
    super({
      component,
      componentProps: {
        editor,
        extension: props.extension,
        node: props.node,
        decorations: props.decorations,
        getPos: props.getPos as () => number,
        selected: false,
        updateAttributes(attributes: Record<string, any>): void {
          const { editor, getPos, node } = props
          editor.commands.command(({ tr }) => {
            const pos = (getPos as () => number)()

            tr.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              ...attributes
            })

            return true
          })
        },
        deleteNode(): void {
          const { getPos, node, editor } = props

          const from = (getPos as () => number)()
          const to = from + node.nodeSize

          editor.commands.deleteRange({ from, to })
        }
      },
      editorView: editor.view,
      nodePortalStore,
      asContainer: options.as as keyof HTMLElementTagNameMap
    })

    this.container.setAttribute('contenteditable', String(options.contentEditable ?? true))

    this.componentProps = {
      editor,
      extension: props.extension,
      node: props.node,
      decorations: props.decorations,
      getPos: props.getPos as () => number,
      selected: false,
      updateAttributes: this.updateAttributes.bind(this),
      deleteNode: this.deleteNode.bind(this)
    }

    this.options = {
      stopEvent: null,
      ignoreMutation: null,
      ...options
    }
    ;(this.dom as HTMLElement).addEventListener('dragstart', this.onDragStart.bind(this))
  }

  private onDragStart(event: DragEvent): void {
    const view = this.editorView
    const target = event.target as HTMLElement

    // get the drag handle element
    // `closest` is not available for text nodes so we may have to use its parent
    const dragHandle =
      target.nodeType === 3 ? target.parentElement?.closest('[data-drag-handle]') : target.closest('[data-drag-handle]')

    if (
      !this.dom ||
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      this.contentDOM?.contains(target) ||
      !dragHandle
    ) {
      return
    }

    let x = 0
    let y = 0

    // calculate offset for drag element if we use a different drag handle element
    if (this.dom !== dragHandle) {
      const domBox = this.dom.getBoundingClientRect()
      const handleBox = dragHandle.getBoundingClientRect()

      const offsetX = event.offsetX
      const offsetY = event.offsetY

      x = handleBox.x - domBox.x + offsetX
      y = handleBox.y - domBox.y + offsetY
    }

    event.dataTransfer?.setDragImage(this.dom, x, y)

    // we need to tell ProseMirror that we want to move the whole node
    // so we create a NodeSelection
    const selection = NodeSelection.create(view.state.doc, this.componentProps.getPos())
    const transaction = view.state.tr.setSelection(selection)

    view.dispatch(transaction)
  }

  // fork from Tiptap NodeView
  // eslint-disable-next-line complexity
  public stopEvent(event: Event): boolean {
    if (!this.dom) {
      return false
    }

    if (typeof this.options.stopEvent === 'function') {
      return this.options.stopEvent({ event })
    }

    const target = event.target as HTMLElement
    const isInElement = this.dom.contains(target) && !this.contentDOM?.contains(target)

    // any event from child nodes should be handled by ProseMirror
    if (!isInElement) {
      return false
    }

    const isDropEvent = event.type === 'drop'
    const isInput = ['INPUT', 'BUTTON', 'SELECT', 'TEXTAREA'].includes(target.tagName) || target.isContentEditable

    // any input event within node views should be ignored by ProseMirror
    if (isInput && !isDropEvent) {
      return true
    }

    const { isEditable } = this.componentProps.editor
    const { isDragging } = this
    const isDraggable = !!this.componentProps.node.type.spec.draggable
    const isSelectable = NodeSelection.isSelectable(this.componentProps.node)
    const isCopyEvent = event.type === 'copy'
    const isPasteEvent = event.type === 'paste'
    const isCutEvent = event.type === 'cut'
    const isClickEvent = event.type === 'mousedown'
    const isDragEvent = event.type.startsWith('drag')

    // ProseMirror tries to drag selectable nodes
    // even if `draggable` is set to `false`
    // this fix prevents that
    if (!isDraggable && isSelectable && isDragEvent) {
      event.preventDefault()
    }

    if (isDraggable && isDragEvent && !isDragging) {
      event.preventDefault()
      return false
    }

    // we have to store that dragging started
    if (isDraggable && isEditable && !isDragging && isClickEvent) {
      const dragHandle = target.closest('[data-drag-handle]')
      const isValidDragHandle = dragHandle && (this.dom === dragHandle || this.dom.contains(dragHandle))

      if (isValidDragHandle) {
        this.isDragging = true

        document.addEventListener(
          'dragend',
          () => {
            this.isDragging = false
          },
          { once: true }
        )

        document.addEventListener(
          'mouseup',
          () => {
            this.isDragging = false
          },
          { once: true }
        )
      }
    }

    // these events are handled by prosemirror
    if (isDragging || isDropEvent || isCopyEvent || isPasteEvent || isCutEvent || (isClickEvent && isSelectable)) {
      return false
    }

    return true
  }

  public ignoreMutation(mutation: MutationRecord | { type: 'selection'; target: Element }): boolean {
    if (!this.dom || !this.contentDOM) {
      return true
    }

    if (typeof this.options.ignoreMutation === 'function') {
      return this.options.ignoreMutation({ mutation })
    }

    // a leaf/atom node is like a black box for ProseMirror
    // and should be fully handled by the node view
    if (this.componentProps.node.isLeaf || this.componentProps.node.isAtom) {
      return true
    }

    // ProseMirror should handle any selections
    if (mutation.type === 'selection') {
      return false
    }

    // try to prevent a bug on iOS that will break node views on enter
    // this is because ProseMirror can’t preventDispatch on enter
    // this will lead to a re-render of the node view on enter
    // see: https://github.com/ueberdosis/tiptap/issues/1214
    if (
      this.dom.contains(mutation.target) &&
      mutation.type === 'childList' &&
      isiOS() &&
      this.componentProps.editor.isFocused
    ) {
      const changedNodes = [...Array.from(mutation.addedNodes), ...Array.from(mutation.removedNodes)] as HTMLElement[]

      // we’ll check if every changed node is contentEditable
      // to make sure it’s probably mutated by ProseMirror
      if (changedNodes.every(node => node.isContentEditable)) {
        return false
      }
    }

    // we will allow mutation contentDOM with attributes
    // so we can for example adding classes within our node view
    if (this.contentDOM === mutation.target && mutation.type === 'attributes') {
      return true
    }

    // ProseMirror should handle any changes within contentDOM
    if (this.contentDOM.contains(mutation.target)) {
      return false
    }

    return true
  }

  public update(node: Node, decorations: Decoration[]): boolean {
    const updateProps = (props?: Partial<NodeViewProps>): void => {
      this.updateComponentProps(props)
    }

    if (node.type !== this.componentProps.node.type) {
      return false
    }

    if (typeof this.options.update === 'function') {
      const oldNode = this.componentProps.node
      const oldDecorations = this.componentProps.decorations

      this.componentProps.node = node
      this.componentProps.decorations = decorations

      return this.options.update({
        oldNode,
        oldDecorations,
        newNode: node,
        newDecorations: decorations,
        updateProps: () => updateProps({ node, decorations })
      })
    }

    if (node === this.componentProps.node && this.componentProps.decorations === decorations) {
      return true
    }

    this.componentProps.node = node
    this.componentProps.decorations = decorations

    updateProps({ node, decorations })

    return true
  }

  public selectNode(): void {
    this.updateComponentProps({ selected: true })
  }

  public deselectNode(): void {
    this.updateComponentProps({ selected: false })
  }

  public override destroy(): void {
    this.nodePortalStore.remove(this.id)
    this.contentDOM = null
  }

  private updateAttributes(attributes: Record<string, any>): void {
    const { editor, getPos, node } = this.componentProps
    editor.commands.command(({ tr }) => {
      const pos = getPos()

      tr.setNodeMarkup(pos, undefined, {
        ...node.attrs,
        ...attributes
      })

      return true
    })
  }

  private deleteNode(): void {
    const { getPos, node, editor } = this.componentProps

    const from = getPos()
    const to = from + node.nodeSize

    editor.commands.deleteRange({ from, to })
  }

  private updateComponentProps(props?: Partial<NodeViewProps>): void {
    this.componentProps = {
      ...this.componentProps,
      ...props
    }

    this.renderComponent(this.componentProps)
  }
}
