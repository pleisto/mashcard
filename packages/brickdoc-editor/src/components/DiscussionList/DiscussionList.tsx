import { TabPane } from '@brickdoc/design-system'
import { BrickdocEventBus, DiscussionListToggle, ExplorerMenuTrigger } from '@brickdoc/schema'
import { FC, useCallback, useContext, useEffect, useState } from 'react'
import { EditorContext } from '../../context/EditorContext'
import { focusDiscussionMark, leaveDiscussionMark } from '../../helpers/discussion'
import { Drawer } from '../Drawer'
import { Conversation } from './Conversation'
import { FilterTabs, ListWrapper, ConversationWrapper, ListPanel, DiscussionListContainer } from './styled'
import { useActiveMarkId } from './useActiveMarkId'
import { CommentedNode, useCommentedNodes } from './useCommentedNodes'
import { useConversationPositionEffect } from './useConversationPositionEffect'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DiscussionListProps {}

const TAB_ALL = 'all'
const TAB_RESOLVED = 'resolved'

export const DiscussionList: FC<DiscussionListProps> = () => {
  const { t } = useContext(EditorContext)

  const [drawerVisible, setDrawerVisible] = useState(false)
  const [commentedNodes] = useCommentedNodes()
  const [activeMarkId, setActiveMarkId] = useActiveMarkId(commentedNodes)
  const [listRef, conversationRefs] = useConversationPositionEffect(drawerVisible, activeMarkId, commentedNodes)

  useEffect(() => {
    const listener = BrickdocEventBus.subscribe(DiscussionListToggle, ({ payload }) => {
      setDrawerVisible(visible => payload.visible ?? !visible)
    })

    // TODO: create a drawer manager to manage all drawers' visible state
    const listener2 = BrickdocEventBus.subscribe(ExplorerMenuTrigger, ({ payload }) => {
      if (payload.visible) setDrawerVisible(false)
    })

    return () => {
      listener.unsubscribe()
      listener2.unsubscribe()
    }
  }, [])

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
    <Drawer
      container={document.getElementById('aside') as HTMLElement}
      visible={drawerVisible}
      onClose={() => setDrawerVisible(false)}
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
      </DiscussionListContainer>
    </Drawer>
  )
}
