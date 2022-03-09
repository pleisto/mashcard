import { TabPane } from '@brickdoc/design-system'
import { FC, useCallback, useContext } from 'react'
import { EditorContext } from '../../context/EditorContext'
import { focusDiscussionMark, leaveDiscussionMark } from '../../helpers/discussion'
import { Conversation } from './Conversation'
import {
  DiscussionDrawer,
  StyledDiscussionList,
  ListTitle,
  FilterTabs,
  ListWrapper,
  ConversationWrapper,
  ListPanel
} from './styled'
import { useActiveMarkId } from './useActiveMarkId'
import { CommentedNode, useCommentedNodes } from './useCommentedNodes'
import { useConversationPositionEffect } from './useConversationPositionEffect'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DiscussionListProps {}

const TAB_ALL = 'all'
const TAB_RESOLVED = 'resolved'

export const DiscussionList: FC<DiscussionListProps> = () => {
  const { t } = useContext(EditorContext)

  const [commentedNodes] = useCommentedNodes()
  const [activeMarkId, setActiveMarkId] = useActiveMarkId(commentedNodes)
  const [listRef, conversationRefs] = useConversationPositionEffect(activeMarkId, commentedNodes)

  const setConversationRef = useCallback(
    (markId: string) => (container: HTMLElement | null) => {
      if (!conversationRefs.current) return
      conversationRefs.current[markId] = container
    },
    [conversationRefs]
  )

  const handleConversationSelect = useCallback(
    (commentedNode: CommentedNode) => () => {
      let element: Element | null = null
      if (commentedNode.domNode.nodeType === Node.TEXT_NODE) {
        element = commentedNode.domNode.parentElement
      } else if (commentedNode.domNode.nodeType === Node.ELEMENT_NODE) {
        element = commentedNode.domNode as Element
      }
      element?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })

      setActiveMarkId(commentedNode.markId)
      focusDiscussionMark(commentedNode.domNode)
    },
    [setActiveMarkId]
  )

  const handleConversationHover = useCallback(
    (commentedNode: CommentedNode) => () => {
      if (activeMarkId === commentedNode.markId) return
      focusDiscussionMark(commentedNode.domNode)
    },
    [activeMarkId]
  )

  const handleConversationLeave = useCallback(
    (commentedNode: CommentedNode) => () => {
      if (activeMarkId === commentedNode.markId) return
      leaveDiscussionMark(commentedNode.domNode)
    },
    [activeMarkId]
  )

  return (
    <DiscussionDrawer
      container={document.getElementById('article')?.firstElementChild as HTMLElement}
      overlay={false}
      visible={true}
    >
      <StyledDiscussionList>
        <ListTitle>{t('discussion.title')}</ListTitle>
        <FilterTabs defaultActiveKey={TAB_ALL}>
          <TabPane tab={t(`discussion.tabs.${TAB_ALL}`)} key={TAB_ALL}>
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
                    <Conversation />
                  </ConversationWrapper>
                ))}
              </ListWrapper>
            </ListPanel>
          </TabPane>
          <TabPane tab={t(`discussion.tabs.${TAB_RESOLVED}`)} key={TAB_RESOLVED}>
            tab resolved
          </TabPane>
        </FilterTabs>
      </StyledDiscussionList>
    </DiscussionDrawer>
  )
}
