import { Dispatch, MouseEventHandler, RefCallback, RefObject, SetStateAction, useCallback } from 'react'
import { hoverDiscussionMark, leaveDiscussionMark, selectDiscussionMark } from '../../../../helpers/discussion'
import { CommentedNode } from '../useCommentedNodes'

export function useConversationInteractive(
  conversationRefs: RefObject<Record<string, HTMLElement | null>>,
  activeMarkId: string | null,
  setActiveMarkId: Dispatch<SetStateAction<string | null>>
): [
  (markId: string) => RefCallback<HTMLElement>,
  (commentedNode: CommentedNode) => MouseEventHandler,
  (commentedNode: CommentedNode) => MouseEventHandler,
  (commentedNode: CommentedNode) => MouseEventHandler
] {
  const setRef = useCallback(
    (markId: string) => (container: HTMLElement | null) => {
      if (!conversationRefs.current) return
      conversationRefs.current[markId] = container
    },
    [conversationRefs]
  )

  const onSelect = useCallback(
    (commentedNode: CommentedNode): MouseEventHandler =>
      () => {
        selectDiscussionMark(commentedNode.domNode)
        setActiveMarkId(commentedNode.markId)
      },
    [setActiveMarkId]
  )

  const onHover = useCallback(
    (commentedNode: CommentedNode): MouseEventHandler =>
      () => {
        if (activeMarkId === commentedNode.markId) return
        hoverDiscussionMark(commentedNode.domNode)
      },
    [activeMarkId]
  )

  const onLeave = useCallback(
    (commentedNode: CommentedNode): MouseEventHandler =>
      () => {
        if (activeMarkId === commentedNode.markId) return
        leaveDiscussionMark(commentedNode.domNode)
      },
    [activeMarkId]
  )

  return [setRef, onSelect, onHover, onLeave]
}
