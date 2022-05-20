import { FC, useCallback } from 'react'
import { Editor, Range } from '@tiptap/core'
import { Menu, styled, theme } from '@brickdoc/design-system'
import { FilePages } from '@brickdoc/design-icons'
import { IconBackground } from '../../../ui'
import { useEditorI18n } from '../../../../hooks'

export interface PageItem {
  icon: string | null
  name: string
  category?: string
  command: (editor: Editor, range: Range) => void
}

export interface PageGroupProps {
  active: boolean
  activeIndex: number
  items: PageItem[]
  editor: Editor
  range: Range
}

const StyledIconBackground = styled(IconBackground, {
  color: theme.colors.iconThirdary,
  height: '1.3rem',
  width: '1.3rem'
})

const GroupLabel = styled('span', {
  color: theme.colors.typeThirdary,
  fontSize: theme.fontSizes.callout
})

export const PageGroup: FC<PageGroupProps> = ({ active, activeIndex, editor, items, range }) => {
  const [t] = useEditorI18n()

  const handlePageSelect = useCallback(
    (item: PageItem) => (): void => {
      item.command(editor, range)
    },
    [editor, range]
  )

  const title = t(items.length === 0 ? 'mention.page_link.no_content' : 'mention.page_link.head')
  return (
    <Menu.Group title={title} label={<GroupLabel>{title}</GroupLabel>}>
      {items.map((item, index) => (
        <Menu.Item
          key={index}
          itemKey={index.toString()}
          onAction={handlePageSelect(item)}
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          icon={<StyledIconBackground>{item.icon || <FilePages />}</StyledIconBackground>}
          label={item.name}
          description={item.category}
          active={active && activeIndex === index}
        />
      ))}
    </Menu.Group>
  )
}
