import { useEffect, Dispatch, SetStateAction, useRef } from 'react'
import { selectDiscussionMark } from '../../../helpers/discussion'
import { CommentedNode } from './useCommentedNodes'
import { useExternalProps } from '../../../hooks/useExternalProps'
import { useDrawer } from '../../ui/Drawer'

interface UseDiscussionListReturn {
  visible: boolean
  setVisible: (visible: boolean) => void
}

export function useDiscussionList(
  commentedNodes: CommentedNode[],
  setActiveMarkId: Dispatch<SetStateAction<string | null>>
): UseDiscussionListReturn {
  const { pageQuery } = useExternalProps()
  const latestPageQuery = useRef<URLSearchParams | null>()
  const { visible, setVisible } = useDrawer('discussionList')

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
    const timer = setTimeout(() => {
      setActiveMarkId(commentedNode.markId)
    }, 200)
    return () => clearTimeout(timer)
  }, [commentedNodes, pageQuery, setActiveMarkId, setVisible])

  return {
    visible,
    setVisible
  }
}
