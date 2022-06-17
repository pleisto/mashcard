import { useRef, useEffect, RefObject } from 'react'
import { CommentedNode } from '../useCommentedNodes'

const getPositionInfo = (
  listContainer: HTMLElement,
  container: HTMLElement,
  commentedNode: CommentedNode
): {
  y: number
  offsetToPrev: number
  listOffset: number
  domNodeY: number | null
} => {
  const y = container.getBoundingClientRect().y
  const currentMarginTop = container.style.marginTop === '' ? 0 : parseInt(container.style.marginTop, 10)
  const transformValue = listContainer.style.transform.match(/translateY\((-?[0-9]+)px\)/)
  const listTranslateY = transformValue ? Number(transformValue[1]) : 0

  let domNodeY: number | null = null

  if (commentedNode.domNode.nodeType === Node.TEXT_NODE) {
    const range = document.createRange()
    range.selectNode(commentedNode.domNode)
    domNodeY = range.getBoundingClientRect?.().y
  } else if (commentedNode.domNode.nodeType === Node.ELEMENT_NODE) {
    domNodeY = (commentedNode.domNode as Element).getBoundingClientRect().y
  }

  return {
    y,
    offsetToPrev: currentMarginTop,
    listOffset: listTranslateY,
    domNodeY
  }
}

export function useConversationPositionEffect(
  drawerVisible: boolean,
  activeMarkId: string | null,
  commentedNodes: CommentedNode[]
): [RefObject<HTMLDivElement>, RefObject<Record<string, HTMLElement | null>>] {
  const listRef = useRef<HTMLDivElement>(null)
  const conversationRefs = useRef<Record<string, HTMLElement | null>>({})

  // transform list for locking conversation when activeMarkId changed
  useEffect(() => {
    if (!listRef.current) return
    // do not transform if there is no active conversation
    if (activeMarkId === null) {
      listRef.current.style.transition = ''
      listRef.current.style.transform = 'translateY(0px)'
      return
    }

    const conversationRef = conversationRefs.current[activeMarkId]
    const commentedNode = commentedNodes.find(node => node.markId === activeMarkId)
    if (!conversationRef || !commentedNode) return

    const { y, domNodeY, listOffset } = getPositionInfo(listRef.current, conversationRef, commentedNode)
    if (domNodeY === null) return

    const newListOffset = domNodeY - y
    listRef.current.style.transition = 'transform 100ms ease-out'
    listRef.current.style.transform = `translateY(${listOffset + newListOffset}px)`
  }, [activeMarkId, commentedNodes, drawerVisible])

  // update conversation position
  useEffect(() => {
    // skip when any conversation has been focused
    if (activeMarkId !== null) return

    const updateConversationPosition = (commentedNode: CommentedNode, container: HTMLElement | null): void => {
      if (!listRef.current) return
      if (!container) return

      // get position info about current element and commented node
      const { y, offsetToPrev, domNodeY } = getPositionInfo(listRef.current, container, commentedNode)
      if (domNodeY === null) return

      // recalculate distance between current node and previous node
      const offset = domNodeY - y
      const newOffsetToPrev = Math.max(offset + offsetToPrev, 0)
      if (newOffsetToPrev === offsetToPrev) return

      container.style.marginTop = `${newOffsetToPrev}px`
    }

    commentedNodes.forEach(commentedNode => {
      updateConversationPosition(commentedNode, conversationRefs.current[commentedNode.markId])
    })
  }, [activeMarkId, commentedNodes, drawerVisible])

  return [listRef, conversationRefs]
}
