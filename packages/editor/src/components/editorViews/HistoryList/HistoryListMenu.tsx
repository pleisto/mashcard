import React from 'react'
// import { Icon, Menu } from '@mashcard/design-system'
// import { Editor } from '@tiptap/core'
// import { BlockState } from '@mashcard/schema'
import { InnerMenuContainer, InnerMenu, MenuItem, HistoryTime, Username, HistoryAvatar } from './HistoryList.style'
import { To, NavigateOptions } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { TEST_ID_ENUM } from '@mashcard/test-helper'

import { DocumentHistory, User } from '@mashcard/schema'

export interface HistoryListMenuProps {
  domain: string
  docId: string
  historyId?: string
  navigate: (to: To, options?: NavigateOptions) => void
  histories: { [key: string]: DocumentHistory }
  users: { [key: string]: Pick<User, 'name' | 'domain' | 'avatarData'> }
}

export const HistoryListMenu: React.FC<HistoryListMenuProps> = ({
  domain,
  docId,
  historyId,
  navigate,
  histories,
  users
}) => {
  const [formatT] = useTranslation<string[]>(['formats'])

  const historiesSorted = Object.values(histories).sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const today = dayjs()
  const yesterday = dayjs().subtract(1, 'days')

  return (
    <InnerMenuContainer>
      <InnerMenu type="ghost">
        {historiesSorted.map((history, i) => {
          const user = users[history.username]
          const createdAt = dayjs(history.createdAt)
          let dateStr: String
          if (createdAt.isSame(today, 'day')) {
            dateStr = formatT('days.today')
          } else if (createdAt.isSame(yesterday, 'day')) {
            dateStr = formatT('days.yesterday')
          } else {
            dateStr = createdAt.format(formatT('date'))
          }
          return (
            <MenuItem
              data-testid={TEST_ID_ENUM.editor.history.historyItem.id}
              key={i}
              itemKey={history.id}
              active={historyId ? historyId === history.id : i === 0}
              onClick={() =>
                i === 0 ? navigate(`/${domain}/${docId}`) : navigate(`/${domain}/${docId}/histories/${history.id}`)
              }>
              <div>
                <HistoryTime>{`${dateStr}, ${createdAt.format(formatT('time'))}`}</HistoryTime>
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
  )
}
