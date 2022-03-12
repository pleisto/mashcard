import { Dispatch, FC, SetStateAction } from 'react'
import { Conversation } from './Conversation'
import { ListPanel, ListWrapper, ConversationWrapper } from './styled'
import { CommentedNode } from './useCommentedNodes'
import { useConversationActions } from './useConversationActions'
import { useConversationPositionEffect } from './useConversationPositionEffect'

export interface DiscussionPanelProps {
  visible: boolean
  activeMarkId: string | null
  setActiveMarkId: Dispatch<SetStateAction<string | null>>
  commentedNodes: CommentedNode[]
}

export const DiscussionPanel: FC<DiscussionPanelProps> = ({
  visible,
  activeMarkId,
  commentedNodes,
  setActiveMarkId
}) => {
  const [listRef, conversationRefs] = useConversationPositionEffect(visible, activeMarkId, commentedNodes)
  const [setConversationRef, handleConversationSelect, handleConversationHover, handleConversationLeave] =
    useConversationActions(conversationRefs, activeMarkId, setActiveMarkId)

  return (
    <ListPanel>
      <ListWrapper ref={listRef}>
        {commentedNodes.map(commentedNode => (
          <ConversationWrapper
            key={commentedNode.markId}
            ref={setConversationRef(commentedNode.markId)}
            onClick={handleConversationSelect(commentedNode)}
            onMouseEnter={handleConversationHover(commentedNode)}
            onMouseLeave={handleConversationLeave(commentedNode)}
          >
            <Conversation active={activeMarkId === commentedNode.markId} markId={commentedNode.markId} />
          </ConversationWrapper>
        ))}
      </ListWrapper>
    </ListPanel>
  )
}
