import { FC, useCallback } from 'react'
import { Editor, Range } from '@tiptap/core'
import { Avatar, Menu, styled, theme } from '@brickdoc/design-system'
import { useEditorI18n } from '../../../../hooks'

export interface UserItem {
  avatar: string | undefined
  name: string | null | undefined
  domain: string
  command: (editor: Editor, range: Range) => void
}

export interface UserGroupProps {
  active: boolean
  activeIndex: number
  items: UserItem[]
  editor: Editor
  range: Range
}

const StyledUserGroup = styled(Menu.Group, {})

const UserGroupMain = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  overflowX: 'scroll',
  padding: '0 1rem'
})

const Username = styled('span', {
  fontSize: theme.fontSizes.callout,
  fontWeight: 450,
  lineHeight: '1.125rem'
})

const StyledUserItem = styled(Menu.Item, {
  include: ['flexCenter'],
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  height: '4rem',
  minHeight: 'unset',
  minWidth: 'unset',
  padding: 0,
  width: '4.25rem'
})

const GroupLabel = styled('span', {
  color: theme.colors.typeThirdary,
  fontSize: theme.fontSizes.callout
})

export const UserGroup: FC<UserGroupProps> = ({ editor, range, items, active, activeIndex }) => {
  const [t] = useEditorI18n()
  const groupTitle = t(items.length === 0 ? 'mention.people.no_content' : 'mention.people.head')

  const handleUserSelect = useCallback(
    (item: UserItem) => (): void => {
      item.command(editor, range)
    },
    [editor, range]
  )

  return (
    <StyledUserGroup title={groupTitle} label={<GroupLabel>{groupTitle}</GroupLabel>}>
      <UserGroupMain>
        {items.map((item, index) => (
          <StyledUserItem
            itemKey={index.toString()}
            key={index}
            active={active && activeIndex === index}
            onAction={handleUserSelect(item)}
          >
            <Avatar initials={item.name ?? item.domain} src={item.avatar} />
            <Username>{item.name ?? item.domain}</Username>
          </StyledUserItem>
        ))}
      </UserGroupMain>
    </StyledUserGroup>
  )
}
