import { useState, useEffect, Dispatch, SetStateAction, useRef } from 'react'
import { BrickdocEventBus, DiscussionListToggle, ExplorerMenuTrigger } from '@brickdoc/schema'
import { selectDiscussionMark } from '../../../helpers/discussion'
import { CommentedNode } from './useCommentedNodes'
import { useExternalProps } from '../../../hooks/useExternalProps'

export function useDiscussionListVisible(
  commentedNodes: CommentedNode[],
  setActiveMarkId: Dispatch<SetStateAction<string | null>>
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const { pageQuery } = useExternalProps()
  const [visible, setVisible] = useState(false)
  const latestPageQuery = useRef<URLSearchParams | null>()

  // open discussion list when open an url with comment info
  useEffect(() => {
    const markId = pageQuery?.get('discussionMarkId')
    if (latestPageQuery.current?.get('discussionMarkId') === markId) return

    const commentedNode = commentedNodes.find(node => node.markId === markId)
    if (!commentedNode) return

    setVisible(true)
    selectDiscussionMark(commentedNode.domNode)
    latestPageQuery.current = pageQuery

    // wait for drawer open animation
    setTimeout(() => {
      setActiveMarkId(commentedNode.markId)
    }, 200)
  }, [commentedNodes, pageQuery, setActiveMarkId])

  useEffect(() => {
    const listener = BrickdocEventBus.subscribe(DiscussionListToggle, ({ payload }) => {
      setVisible(visible => payload.visible ?? !visible)
    })

    // TODO: create a drawer manager to manage all drawers' visible state
    const listener2 = BrickdocEventBus.subscribe(ExplorerMenuTrigger, ({ payload }) => {
      if (payload.visible) setVisible(false)
    })

    return () => {
      listener.unsubscribe()
      listener2.unsubscribe()
    }
  }, [])

  return [visible, setVisible]
}
