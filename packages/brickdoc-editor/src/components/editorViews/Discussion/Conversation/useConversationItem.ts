import { useContext, useMemo } from 'react'
import { PageConversationData, PageDiscussionContext } from '../PageDiscussionContext'
import { CommentedNode } from '../useCommentedNodes'

export function useConversationItem(commentedNode: CommentedNode): PageConversationData {
  const { discussion } = useContext(PageDiscussionContext)

  const conversationData = useMemo(
    () => discussion.conversations.find(conversation => conversation.markId === commentedNode.markId),
    [commentedNode.markId, discussion.conversations]
  )

  const quotedContent = useMemo(
    () => conversationData?.quotedContent ?? commentedNode.node.textContent,
    // quoted content should be first time quoted content
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [conversationData]
  )

  return useMemo<PageConversationData>(
    () => ({
      id: conversationData?.id ?? Number(new Date()).toString(),
      quotedContent,
      status: conversationData?.status ?? 'opened',
      markId: conversationData?.markId ?? commentedNode.markId,
      comments: conversationData?.comments ?? [],
      createdAt: new Date()
    }),
    [commentedNode.markId, conversationData, quotedContent]
  )
}
