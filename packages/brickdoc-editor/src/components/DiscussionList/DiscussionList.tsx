import { TabPane } from '@brickdoc/design-system'
import { FC, useContext } from 'react'
import { EditorContext } from '../../context/EditorContext'
import { Drawer } from '../Drawer'
import { Conversation } from './Conversation'
import { FilterTabs, ListWrapper, ConversationWrapper, ListPanel, DiscussionListContainer } from './styled'
import { useActiveMarkId } from './useActiveMarkId'
import { useCommentedNodes } from './useCommentedNodes'
import { useConversationActions } from './useConversationActions'
import { useConversationPositionEffect } from './useConversationPositionEffect'
import { useDiscussionListVisible } from './useDiscussionListVisible'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DiscussionListProps {}

const TAB_ALL = 'all'
const TAB_RESOLVED = 'resolved'

export const DiscussionList: FC<DiscussionListProps> = () => {
  const { t } = useContext(EditorContext)

  const [commentedNodes] = useCommentedNodes()
  const [activeMarkId, setActiveMarkId] = useActiveMarkId(commentedNodes)
  const [visible, setVisible] = useDiscussionListVisible(commentedNodes, setActiveMarkId)
  const [listRef, conversationRefs] = useConversationPositionEffect(visible, activeMarkId, commentedNodes)
  const [setConversationRef, handleConversationSelect, handleConversationHover, handleConversationLeave] =
    useConversationActions(conversationRefs, activeMarkId, setActiveMarkId)

  return (
    <Drawer
      container={document.getElementById('aside') as HTMLElement}
      visible={visible}
      onClose={() => setVisible(false)}
      title={t('discussion.title')}
    >
      <DiscussionListContainer>
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
                    <Conversation active={activeMarkId === commentedNode.markId} markId={commentedNode.markId} />
                  </ConversationWrapper>
                ))}
              </ListWrapper>
            </ListPanel>
          </TabPane>
          <TabPane tab={t(`discussion.tabs.${TAB_RESOLVED}`)} key={TAB_RESOLVED}>
            tab resolved
          </TabPane>
        </FilterTabs>
      </DiscussionListContainer>
    </Drawer>
  )
}
