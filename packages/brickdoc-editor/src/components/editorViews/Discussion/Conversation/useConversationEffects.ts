import { useCallback, useRef, useEffect } from 'react'
import { CommentEditorProps } from '../../../../editors/commentEditor'
import { useEditorContext } from '../../../../hooks'
import { PageConversationData, usePageDiscussionContext } from '../PageDiscussionContext'
import { CommentedNode } from '../useCommentedNodes'

export function useConversationEffects(
  conversationItem: PageConversationData,
  commentedNode: CommentedNode
): {
  onCommentSent: NonNullable<CommentEditorProps['onSend']>
} {
  const { editor } = useEditorContext()
  const { addConversation, addComment } = usePageDiscussionContext()

  const onCommentSent = useCallback<NonNullable<CommentEditorProps['onSend']>>(
    async (editor, content) => {
      if (!content) return

      if (conversationItem.comments.length === 0) {
        await addConversation?.(conversationItem, content)
      } else {
        await addComment?.(conversationItem.id, content)
      }

      editor.commands.clearContent(true)
    },
    [addComment, addConversation, conversationItem]
  )

  // remove discussion mark if no comment added when discussion panel closed
  const unmounted = useRef(false)
  useEffect(() => {
    return () => {
      unmounted.current = true
    }
  }, [])
  useEffect(() => {
    return () => {
      if (!unmounted.current) return
      if (conversationItem.comments.length === 0) {
        editor?.commands.removeDiscussion(commentedNode.position, commentedNode.position + commentedNode.node.nodeSize)
      }
    }
  }, [commentedNode, conversationItem.comments.length, editor])

  return {
    onCommentSent
  }
}
