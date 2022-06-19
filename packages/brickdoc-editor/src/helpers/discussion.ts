// TODO: implement these helpers in tiptap and prosemirror way
import { BrickdocEventBus, DiscussionMarkInactive } from '@brickdoc/schema'

export const MARK_CLASS_NAME = 'brickdoc-discussion-mark'
export const ACTIVE_CLASS_NAME = `${MARK_CLASS_NAME}-active`
export const MARK_ID_ATTR_NAME = 'mark-id'

let latestActiveNode: Element | null = null

const getActualNode = (node: Node | null): Node | null =>
  node?.nodeType === Node.TEXT_NODE ? node.parentElement : node

export const selectDiscussionMark = (node: Node | null): void => {
  let element: Element | null = null
  if (node?.nodeType === Node.TEXT_NODE) {
    element = node.parentElement
  } else if (node?.nodeType === Node.ELEMENT_NODE) {
    element = node as Element
  }
  element?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
  focusDiscussionMark(node)
}

export const focusDiscussionMark = (node: Node | null): void => {
  const markNode = getActualNode(node)

  if (!markNode) return

  if ((markNode as Element).classList.contains(MARK_CLASS_NAME)) {
    ;(markNode as Element).classList.add(ACTIVE_CLASS_NAME)

    // lose focus on discussion mark
  } else {
    console.log('lose')
    BrickdocEventBus.dispatch(DiscussionMarkInactive({}))
  }

  // TODO: without setTimeout, modify dom will cause dom node be replaced
  // figure out why
  setTimeout(() => {
    if (latestActiveNode && latestActiveNode !== markNode) {
      latestActiveNode.classList.remove(ACTIVE_CLASS_NAME)
    }

    latestActiveNode = markNode as Element
  })
}

export const hoverDiscussionMark = (node: Node | null): void => {
  const markNode = getActualNode(node)

  if ((markNode as Element).classList.contains(MARK_CLASS_NAME)) {
    ;(markNode as Element).classList.add(ACTIVE_CLASS_NAME)
  }
}

export const leaveDiscussionMark = (node: Node | null): void => {
  const markNode = getActualNode(node)
  // TODO: without setTimeout, modify dom will cause dom node be replaced
  // figure out why
  setTimeout(() => {
    ;(markNode as Element).classList.remove(ACTIVE_CLASS_NAME)
  })
}
