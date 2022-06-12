import React from 'react'
// import { Icon, Menu } from '@brickdoc/design-system'
// import { Editor } from '@tiptap/core'
// import { BlockState } from '@brickdoc/schema'
import { InnerMenuContainer, InnerMenu, MenuItem, HistoryTime, Username, HistoryAvatar } from './styles'
import { Drawer } from '../../ui'
import { useDrawer } from '../../ui/Drawer'
import { useEditorI18n } from '../../../hooks'
import { To, NavigateOptions } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'

import { useDocHistoryStore } from '@brickdoc/schema'

export interface HistoryListProps {
  domain: string
  docId: string
  historyId?: string
  navigate: (to: To, options?: NavigateOptions) => void
}

export const HistoryList: React.FC<HistoryListProps> = ({ domain, docId, historyId, navigate }) => {
  const [editorT] = useEditorI18n()
  const [dateT] = useTranslation<string[]>(['date'])
  const [timeT] = useTranslation<string[]>(['time'])
  const { visible, setVisible } = useDrawer('historyList')
  const latestVisiable = React.useRef<boolean>(visible)

  const { store, refetch } = useDocHistoryStore(docId)

  React.useEffect(() => {
    if (visible && (!latestVisiable.current || !store.loaded)) {
      // refetch on list reopen`
      refetch()
    }
    latestVisiable.current = visible
  }, [visible, refetch, store.loaded])

  const historiesSorted = Object.values(store.histories).sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const today = moment()
  const yesterday = moment().subtract(1, 'days')

  return (
    <Drawer
      container={document.getElementById('aside') as HTMLElement}
      visible={visible}
      onClose={() => setVisible(false)}
      title={editorT('history.title')}
      renderBody={() => (
        <>
          <InnerMenuContainer>
            <InnerMenu type="ghost">
              {historiesSorted.map((history, i) => {
                const user = store.users[history.username]
                const createdAt = moment.utc(history.createdAt).local()
                let dateStr: String
                if (createdAt.isSame(today, 'day')) {
                  dateStr = dateT('days.today')
                } else if (createdAt.isSame(yesterday, 'day')) {
                  dateStr = dateT('days.yesterday')
                } else {
                  dateStr = createdAt.format(dateT('formats.client'))
                }
                return (
                  <MenuItem
                    data-testid={TEST_ID_ENUM.editor.history.historyItem.id}
                    key={i}
                    itemKey={history.id}
                    active={historyId ? historyId === history.id : i === 0}
                    onClick={() =>
                      i === 0
                        ? navigate(`/${domain}/${docId}`)
                        : navigate(`/${domain}/${docId}/histories/${history.id}`)
                    }
                  >
                    <div>
                      <HistoryTime>{`${dateStr}, ${createdAt.format(timeT('formats.client'))}`}</HistoryTime>
                      <Username>
                        <HistoryAvatar
                          size="xxs"
                          initials={history.username}
                          src={user?.avatarData ? user.avatarData.url : undefined}
                        />
                        {history.username}
                      </Username>
                    </div>
                  </MenuItem>
                )
              })}
            </InnerMenu>
          </InnerMenuContainer>
        </>
      )}
    />
  )
}
