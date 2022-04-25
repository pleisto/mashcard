import { TabPane } from '@brickdoc/design-system'
import { FC, useCallback, useContext, useState } from 'react'
import { EditorContext } from '../../../context/EditorContext'
import { Drawer } from '../../ui'
import { DiscussionPanel } from './DiscussionPanel'
import { PageDiscussionContext, usePageDiscussionContextValue } from './PageDiscussionContext'
import { FilterTabs, DiscussionListContainer } from './styled'
import { useActiveMarkId } from './useActiveMarkId'
import { useCommentedNodes } from './useCommentedNodes'
import { useDiscussionList } from './useDiscussionList'

export interface DiscussionListProps {}

const TAB_ALL = 'all'
const TAB_RESOLVED = 'resolved'

export const DiscussionList: FC<DiscussionListProps> = () => {
  const { t } = useContext(EditorContext)

  const [activeTab, setActiveTab] = useState(TAB_ALL)
  const [commentedNodes] = useCommentedNodes()
  const [activeMarkId, setActiveMarkId] = useActiveMarkId(commentedNodes)
  const { visible, setVisible } = useDiscussionList(commentedNodes, setActiveMarkId)

  const handleTabClick = useCallback(
    (activeTab: string) => {
      setActiveTab(activeTab)
      setActiveMarkId(null)
    },
    [setActiveMarkId]
  )
  const pageDiscussion = usePageDiscussionContextValue()

  return (
    <Drawer
      container={document.getElementById('aside') as HTMLElement}
      visible={visible}
      onClose={() => setVisible(false)}
      title={t('discussion.title')}
    >
      <PageDiscussionContext.Provider value={pageDiscussion}>
        <DiscussionListContainer>
          <FilterTabs activeKey={activeTab} onTabClick={handleTabClick}>
            <TabPane tab={t(`discussion.tabs.${TAB_ALL}`)} key={TAB_ALL}>
              <DiscussionPanel
                visible={visible && activeTab === TAB_ALL}
                activeMarkId={activeMarkId}
                setActiveMarkId={setActiveMarkId}
                commentedNodes={commentedNodes}
              />
            </TabPane>
            <TabPane tab={t(`discussion.tabs.${TAB_RESOLVED}`)} key={TAB_RESOLVED}>
              <DiscussionPanel
                visible={visible && activeTab === TAB_RESOLVED}
                activeMarkId={activeMarkId}
                setActiveMarkId={setActiveMarkId}
                // filter by resolved status
                commentedNodes={commentedNodes.filter(
                  node =>
                    pageDiscussion.discussion.conversations.find(conversation => conversation.markId === node.markId)
                      ?.state === 'RESOLVED'
                )}
              />
            </TabPane>
          </FilterTabs>
        </DiscussionListContainer>
      </PageDiscussionContext.Provider>
    </Drawer>
  )
}
