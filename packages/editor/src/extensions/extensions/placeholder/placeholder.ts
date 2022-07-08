import { Editor } from '@tiptap/core'
import { Node as ProsemirrorNode } from 'prosemirror-model'
import { Paragraph } from '../../blocks'
import { createExtension } from '../../common'
import { findWrapper } from './findWrapper'
import { meta, PlaceholderAttributes, PlaceholderOptions } from './meta'

const findParagraphDom = (node: HTMLElement): HTMLElement | null => {
  if (node.tagName === 'P') return node

  const parent = node.parentElement

  if (!parent) return null

  return findParagraphDom(parent)
}

const getPlaceholderText = (node: ProsemirrorNode, options: PlaceholderOptions): string => {
  if (typeof options.placeholder === 'function') {
    return options.placeholder({ node })
  }

  return options.placeholder ?? ''
}

export const updatePlaceholder = (editor: Editor, options: PlaceholderOptions, storage: any): void => {
  if (!editor.isEditable) return

  const { $anchor, anchor } = editor.state.selection
  const node = $anchor.node()

  if (node.type.name === Paragraph.name) {
    const { node: dom } = editor.view.domAtPos(anchor)
    const paragraphElement = findParagraphDom(dom as HTMLElement)

    // store the latest focused element
    // so we can clear placeholder when anchor changed next time
    storage.latestFocusedElement?.setAttribute('data-placeholder', '')

    const isEmpty = !node.isLeaf && !node.childCount

    const wrapperNode = findWrapper($anchor)

    if (wrapperNode) return

    paragraphElement?.setAttribute('data-placeholder', isEmpty ? getPlaceholderText(node, options) : '')
    storage.latestFocusedElement = paragraphElement
  } else {
    storage.latestFocusedElement?.setAttribute('data-placeholder', '')
    storage.latestFocusedElement = null
  }
}

export const Placeholder = createExtension<PlaceholderOptions, PlaceholderAttributes>({
  name: meta.name,

  addOptions() {
    return {
      placeholder: 'Write something …'
    }
  },

  addStorage() {
    return {
      latestFocusedElement: null
    }
  },

  onSelectionUpdate() {
    updatePlaceholder(this.editor, this.options, this.storage)
  },

  onFocus() {
    updatePlaceholder(this.editor, this.options, this.storage)
  }
})
