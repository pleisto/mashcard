import { Editor } from '@tiptap/core'
import { Node as ProsemirrorNode } from 'prosemirror-model'
import { CodeBlock, Heading, Paragraph } from '../../blocks'
import { createExtension } from '../../common'
import { findWrapper } from './findWrapper'
import { meta, PlaceholderAttributes, PlaceholderOptions } from './meta'

const findHeadingDom = (node: HTMLElement): HTMLElement | null => {
  if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(node.tagName)) return node

  const parent = node.parentElement

  if (!parent) return null

  return findHeadingDom(parent)
}

const findParagraphDom = (node: HTMLElement): HTMLElement | null => {
  if (node.tagName === 'P') return node

  const parent = node.parentElement

  if (!parent) return null

  return findParagraphDom(parent)
}

const findCodeDom = (node: HTMLElement): HTMLElement | null => {
  if (node.tagName === 'CODE') return node

  const parent = node.parentElement

  if (!parent) return null

  return findCodeDom(parent)
}

const getPlaceholderText = (
  node: ProsemirrorNode,
  wrapperNode: ProsemirrorNode | null,
  options: PlaceholderOptions
): string => {
  if (typeof options.placeholder === 'function') {
    return options.placeholder({ node, wrapperNode })
  }

  return options.placeholder ?? ''
}

export const updatePlaceholder = (editor: Editor, options: PlaceholderOptions, storage: any): void => {
  if (!editor.isEditable) return

  const { $anchor, anchor } = editor.state.selection
  const node = $anchor.node()

  if (node.type.name === CodeBlock.name) {
    const { node: dom } = editor.view.domAtPos(anchor)
    const codeElement = findCodeDom(dom as HTMLElement)

    // store the latest focused element
    // so we can clear placeholder when anchor changed next time
    storage.latestFocusedElement?.setAttribute('data-placeholder', '')

    const isEmpty = !node.isLeaf && !node.childCount

    const wrapperNode = isEmpty ? findWrapper($anchor) ?? null : null
    codeElement?.setAttribute('data-placeholder', isEmpty ? getPlaceholderText(node, wrapperNode, options) : '')
    storage.latestFocusedElement = codeElement
  } else if (node.type.name === Heading.name) {
    const { node: dom } = editor.view.domAtPos(anchor)
    const headingElement = findHeadingDom(dom as HTMLElement)

    // store the latest focused element
    // so we can clear placeholder when anchor changed next time
    storage.latestFocusedElement?.setAttribute('data-placeholder', '')

    const isEmpty = !node.isLeaf && !node.childCount

    const wrapperNode = isEmpty ? findWrapper($anchor) ?? null : null
    headingElement?.setAttribute('data-placeholder', isEmpty ? getPlaceholderText(node, wrapperNode, options) : '')
    storage.latestFocusedElement = headingElement
  } else if (node.type.name === Paragraph.name) {
    const { node: dom } = editor.view.domAtPos(anchor)
    const paragraphElement = findParagraphDom(dom as HTMLElement)

    // store the latest focused element
    // so we can clear placeholder when anchor changed next time
    storage.latestFocusedElement?.setAttribute('data-placeholder', '')

    const isEmpty = !node.isLeaf && !node.childCount

    const wrapperNode = isEmpty ? findWrapper($anchor) ?? null : null
    paragraphElement?.setAttribute('data-placeholder', isEmpty ? getPlaceholderText(node, wrapperNode, options) : '')
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
