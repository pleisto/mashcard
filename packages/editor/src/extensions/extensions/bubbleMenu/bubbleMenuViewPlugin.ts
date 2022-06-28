// https://github.com/ueberdosis/tiptap/tree/main/packages/extension-bubble-menu
import { Editor, posToDOMRect } from '@tiptap/core'
import { EditorState, Plugin, PluginKey, Selection } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import tippy, { Instance, Props } from 'tippy.js'

export interface BubbleMenuViewPluginProps {
  pluginKey: PluginKey | string
  editor: Editor
  element: HTMLElement
  tippyOptions?: Partial<Props>
  shouldShow?: ((props: { editor: Editor; from: number; to: number }) => boolean) | null
}

export type BubbleMenuViewProps = BubbleMenuViewPluginProps & {
  view: EditorView
}

export class BubbleMenuView {
  public editor: Editor

  public element: HTMLElement

  public view: EditorView

  public preventHide = false

  public maybeSelecting = false

  public tippy: Instance | undefined

  public tippyOptions?: Partial<Props>

  public shouldShow: Exclude<BubbleMenuViewPluginProps['shouldShow'], null>

  constructor({ editor, element, view, tippyOptions = {}, shouldShow }: BubbleMenuViewProps) {
    this.editor = editor
    this.element = element
    this.view = view

    if (shouldShow) {
      this.shouldShow = shouldShow
    }

    this.element.addEventListener('mousedown', this.elementMousedownHandler, { capture: true })
    window.addEventListener('mousedown', this.mousedownHandler)
    window.addEventListener('mouseup', this.mouseupHandler)
    this.view.dom.addEventListener('dragstart', this.dragstartHandler)
    this.editor.on('focus', this.focusHandler)
    this.editor.on('blur', this.blurHandler)
    this.tippyOptions = tippyOptions
    // Detaches menu content from its current parent
    this.element.remove()
    this.element.style.visibility = 'visible'
  }

  elementMousedownHandler = () => {
    this.preventHide = true
  }

  mousedownHandler = () => {
    this.maybeSelecting = true
  }

  mouseupHandler = () => {
    this.maybeSelecting = false
    this.createBubbleMenuPopover(this.editor.view, this.editor.state.selection)
  }

  dragstartHandler = () => {
    this.hide()
  }

  focusHandler = () => {
    // we use `setTimeout` to make sure `selection` is already updated
    setTimeout(() => this.update(this.editor.view))
  }

  blurHandler = ({ event }: { event: FocusEvent }) => {
    if (this.preventHide) {
      this.preventHide = false

      return
    }

    if (event?.relatedTarget && this.element.parentNode?.contains(event.relatedTarget as Node)) {
      return
    }

    this.hide()
  }

  createTooltip(): void {
    const { element: editorElement } = this.editor.options
    const editorIsAttached = !!editorElement.parentElement

    if (this.tippy ?? !editorIsAttached) {
      return
    }

    this.tippy = tippy(editorElement, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: true,
      trigger: 'manual',
      placement: 'top',
      hideOnClick: 'toggle',
      ...this.tippyOptions
    })

    // maybe we have to hide tippy on its own blur event as well
    if (this.tippy.popper.firstChild) {
      ;(this.tippy.popper.firstChild as HTMLElement).addEventListener('blur', event => {
        this.blurHandler({ event })
      })
    }
  }

  createBubbleMenuPopover(view: EditorView, selection: Selection): void {
    this.createTooltip()

    // support for CellSelections
    const { ranges } = selection
    const from = Math.min(...ranges.map(range => range.$from.pos))
    const to = Math.max(...ranges.map(range => range.$to.pos))

    const shouldShow = this.shouldShow?.({
      editor: this.editor,
      from,
      to
    })

    if (!shouldShow || this.maybeSelecting) {
      this.hide()

      return
    }

    this.tippy?.setProps({
      getReferenceClientRect:
        this.tippyOptions?.getReferenceClientRect ??
        (() => {
          return posToDOMRect(view, from, to)
        })
    })

    this.show()
  }

  update(view: EditorView, oldState?: EditorState): void {
    const { state, composing } = view
    const { doc, selection } = state as EditorState
    const isSame = oldState?.doc.eq(doc) && oldState.selection.eq(selection)

    if (composing || isSame) {
      return
    }

    this.createBubbleMenuPopover(view, selection)
  }

  show(): void {
    this.tippy?.show()
  }

  hide(): void {
    this.tippy?.hide()
  }

  destroy(): void {
    this.tippy?.destroy()
    this.element.removeEventListener('mousedown', this.elementMousedownHandler, { capture: true })
    window.removeEventListener('mousedown', this.mouseupHandler)
    window.removeEventListener('mouseup', this.mouseupHandler)
    this.view.dom.removeEventListener('dragstart', this.dragstartHandler)
    this.editor.off('focus', this.focusHandler)
    this.editor.off('blur', this.blurHandler)
  }
}

export const BubbleMenuViewPlugin = (options: BubbleMenuViewPluginProps): Plugin => {
  return new Plugin({
    key: typeof options.pluginKey === 'string' ? new PluginKey(options.pluginKey) : options.pluginKey,
    view: view => new BubbleMenuView({ view, ...options })
  })
}
