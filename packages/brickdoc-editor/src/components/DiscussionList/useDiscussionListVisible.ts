import { useState, useEffect, useContext, Dispatch, SetStateAction } from 'react'
import { BrickdocEventBus, DiscussionListToggle, ExplorerMenuTrigger } from '@brickdoc/schema'
import { EditorDataSourceContext } from '../../dataSource/DataSource'
import { selectDiscussionMark } from '../../helpers/discussion'
import { CommentedNode } from './useCommentedNodes'

export function useDiscussionListVisible(
  commentedNodes: CommentedNode[],
  setActiveMarkId: Dispatch<SetStateAction<string | null>>
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const { pageQuery } = useContext(EditorDataSourceContext)
  const [visible, setVisible] = useState(false)

  // open discussion list when open an url with comment info
  useEffect(() => {
    const markId = pageQuery?.get('discussionMarkId')
    const commentedNode = commentedNodes.find(node => node.markId === markId)
    if (!commentedNode) return

    setVisible(true)
    selectDiscussionMark(commentedNode.domNode)

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
