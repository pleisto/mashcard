import { TabPane } from '@mashcard/design-system'
import { FC, useCallback, useState } from 'react'
import { useEditorI18n } from '../../../../hooks'
import { Drawer } from '../../../ui'
import { DiscussionPanel } from '../DiscussionPanel'
import { PageDiscussionContext, usePageDiscussionContextValue } from '../PageDiscussionContext'
import { FilterTabs, DiscussionListContainer } from './DiscussionList.style'
import { useActiveMarkId } from './useActiveMarkId'
import { useCommentedNodes } from '../useCommentedNodes'
import { useDiscussionVisible } from './useDiscussionVisible'

export interface DiscussionListProps {}

const TAB_ALL = 'all'
const TAB_RESOLVED = 'resolved'

export const DiscussionList: FC<DiscussionListProps> = () => {
  const [t] = useEditorI18n()

  const [activeTab, setActiveTab] = useState(TAB_ALL)
  const [commentedNodes] = useCommentedNodes()
  const [activeMarkId, setActiveMarkId] = useActiveMarkId(commentedNodes)
  const { visible, setVisible } = useDiscussionVisible(commentedNodes, setActiveMarkId)

  const handleTabClick = useCallback(
    (activeTab: string) => {
      setActiveTab(activeTab)
      setActiveMarkId(null)
    },
    [setActiveMarkId]
  )
  const pageDiscussion = usePageDiscussionContextValue(commentedNodes)

  return (
    <Drawer
      container={document.getElementById('aside') as HTMLElement}
      visible={visible}
      onClose={() => setVisible(false)}
      title={t('discussion.title')}>
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
                      ?.status === 'resolved'
                )}
              />
            </TabPane>
          </FilterTabs>
        </DiscussionListContainer>
      </PageDiscussionContext.Provider>
    </Drawer>
  )
}
