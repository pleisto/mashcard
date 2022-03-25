import * as React from 'react'
import { SuggestionProps } from '@tiptap/suggestion'
import { UserGroup, UserItem } from './UserGroup'
import { Menu, styled } from '@brickdoc/design-system'
import { PageGroup, PageItem } from './PageGroup'

export interface MentionCommandsMenuProps
  extends Omit<SuggestionProps, 'items' | 'decorationNode' | 'text' | 'clientRect'> {
  activeCategory: 'users' | 'pages'
  activeIndex: number
  baseId?: string
  items: {
    users: UserItem[]
    pages: PageItem[]
  }
  size?: 'sm' | 'md'
}

const MentionMenu = styled(Menu, {
  width: '22rem',
  variants: {
    size: {
      md: {
        width: '22rem'
      },
      sm: {
        width: '15.5rem'
      }
    }
  }
})

export const MentionCommandsMenu: React.FC<MentionCommandsMenuProps> = ({
  editor,
  range,
  items,
  baseId,
  size = 'md',
  activeCategory = 'users',
  activeIndex = 0
}) => {
  if (items.pages.length === 0 && items.users.length === 0) {
    return null
  }

  return (
    <MentionMenu size={size} baseId={baseId}>
      <UserGroup
        active={activeCategory === 'users'}
        activeIndex={activeIndex}
        editor={editor}
        range={range}
        items={items.users}
      />
      <PageGroup
        active={activeCategory === 'pages'}
        activeIndex={activeIndex}
        editor={editor}
        range={range}
        items={items.pages}
      />
    </MentionMenu>
  )
}
