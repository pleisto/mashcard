import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { BrickdocEventBus, DiscussionMarkActive, DiscussionMarkInactive } from '@brickdoc/schema'
import { CommentedNode } from '../useCommentedNodes'

export function useActiveMarkId(
  commentedNodes: CommentedNode[]
): [string | null, Dispatch<SetStateAction<string | null>>] {
  const [activeMarkId, setActiveMarkId] = useState<string | null>(null)

  // remove active mark id if it has been removed in document
  useEffect(() => {
    if (commentedNodes.every(node => node.markId !== activeMarkId)) {
      setActiveMarkId(null)
    }
  }, [activeMarkId, commentedNodes])

  // listener for active mark event
  useEffect(() => {
    const listener = BrickdocEventBus.subscribe(DiscussionMarkActive, ({ payload: { markId } }) => {
      setActiveMarkId(markId)
    })

    return () => listener.unsubscribe()
  }, [])

  // listener for inactive mark event
  useEffect(() => {
    const listener = BrickdocEventBus.subscribe(DiscussionMarkInactive, () => {
      setActiveMarkId(null)
    })

    return () => listener.unsubscribe()
  }, [])

  return [activeMarkId, setActiveMarkId]
}
