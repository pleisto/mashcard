import { useEffect, Dispatch, SetStateAction, useRef } from 'react'
import { selectDiscussionMark } from '../../../../helpers/discussion'
import { CommentedNode } from '../useCommentedNodes'
import { useDrawer } from '../../../ui/Drawer'

interface UseDiscussionVisible {
  visible: boolean
  setVisible: (visible: boolean) => void
}

export function useDiscussionVisible(
  commentedNodes: CommentedNode[],
  setActiveMarkId: Dispatch<SetStateAction<string | null>>
): UseDiscussionVisible {
  const latestPageQuery = useRef<URLSearchParams | null>()
  const { visible, setVisible } = useDrawer('discussionList')

  // open discussion list when open an url with comment info
  useEffect(() => {
    const pageQuery = new URLSearchParams(window.location.search)
    const markId = pageQuery.get('discussionMarkId')
    if (latestPageQuery.current?.get('discussionMarkId') === markId) return

    const commentedNode = commentedNodes.find(node => node.markId === markId)
    if (!commentedNode) return

    setVisible(true)
    selectDiscussionMark(commentedNode.domNode)
    latestPageQuery.current = pageQuery

    // wait for drawer open animation
    const timer = setTimeout(() => {
      setActiveMarkId(commentedNode.markId)
    }, 200)
    return () => clearTimeout(timer)
  }, [commentedNodes, setActiveMarkId, setVisible])

  return {
    visible,
    setVisible
  }
}
