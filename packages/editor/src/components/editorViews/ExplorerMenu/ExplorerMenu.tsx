import { useCallback, useState, useMemo, ChangeEventHandler, cloneElement, useEffect } from 'react'
import { Icon, Menu, theme } from '@mashcard/design-system'
import { Editor } from '@tiptap/core'
import { MashcardEventBus, ExplorerMenuGroup, ExplorerMenuItem, ExplorerMenuTrigger } from '@mashcard/schema'
import {
  drawerStyles,
  InnerMenu,
  InnerMenuContainer,
  MenuGroupLabel,
  menuIconStyle,
  MenuItem,
  SearchInput,
  SearchInputContainer
} from './ExplorerMenu.style'
import * as BLOCK from '../../../helpers/block'
import { Drawer } from '../../ui'
import { useDrawer } from '../../ui/Drawer'
import { useEditorI18n } from '../../../hooks'

const blockGroups = [
  {
    key: 'data',
    items: [BLOCK.FORMULA, BLOCK.SPREADSHEET]
  },
  {
    key: 'embed',
    items: [BLOCK.UPLOAD, BLOCK.LINK, BLOCK.EMBED, BLOCK.GALLERY]
  },
  {
    key: 'text',
    items: [
      BLOCK.HEADING_1,
      BLOCK.HEADING_2,
      BLOCK.HEADING_3,
      BLOCK.HEADING_4,
      BLOCK.HEADING_5,
      BLOCK.BULLETED_LIST,
      BLOCK.ORDERED_LIST,
      BLOCK.TASK_LIST,
      BLOCK.CODE,
      BLOCK.BLOCKQUOTE,
      BLOCK.CALLOUT
    ]
  },
  {
    key: 'others',
    items: [BLOCK.DIVIDER, BLOCK.TOC, BLOCK.SUB_PAGE_MENU]
  }
]

export interface ExplorerMenuProps {
  editor: Editor | null
}

const isMatchSearch =
  (search?: string) =>
  (item: ExplorerMenuItem): boolean => {
    if (!search) return true
    return item.labelText.toLowerCase().includes(search?.toLowerCase())
  }

export const ExplorerMenu: React.FC<ExplorerMenuProps> = () => {
  const [t] = useEditorI18n()
  const { visible, setVisible } = useDrawer('explorerMenu')
  const [search, setSearch] = useState('')
  const drawerContainerStyles = drawerStyles()
  const [groupSource, setGroupSource] = useState<ExplorerMenuGroup[]>([])

  useEffect(
    () =>
      MashcardEventBus.subscribe(ExplorerMenuTrigger, () => {
        setGroupSource(
          blockGroups.map(group => ({
            label: t(`explorer_menu.group.${group.key}.label`),
            // eslint-disable-next-line max-nested-callbacks
            items: group.items.map(item => ({
              label: t(`blocks.${item.key}.label`),
              labelText: t(`blocks.${item.key}.label`),
              key: item.key,
              icon: item.squareIcon
            }))
          }))
        )
      }).unsubscribe,
    [setGroupSource, t]
  )

  const groups = useMemo<ExplorerMenuGroup[]>(
    () =>
      // filter groups by search
      groupSource.reduce<ExplorerMenuGroup[]>((prev, group) => {
        const newGroup: ExplorerMenuGroup = {
          ...group,
          items: group.items
            .filter(i => {
              if (i.items) return true
              return isMatchSearch(search)(i)
            })
            .map(item => ({
              ...item,
              items: item.items?.filter(isMatchSearch(search))
            }))
            .filter(i => !i.items || i.items.length > 0)
        }

        if (newGroup.items.length > 0) return [...prev, newGroup]
        return prev
      }, []),
    [groupSource, search]
  )

  const handleSearchChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => {
    setSearch(event.target.value)
  }, [])

  return (
    <Drawer
      container={document.getElementById('aside') as HTMLElement}
      className={drawerContainerStyles}
      visible={visible}
      onClose={() => setVisible(false)}
      title={t('explorer_menu.title')}
      renderBody={() => (
        <>
          <SearchInputContainer>
            <SearchInput
              prefix={<Icon.Search fill={theme.colors.iconDisable.value} />}
              placeholder={t('explorer_menu.search.placeholder')}
              onChange={handleSearchChange}
              value={search}
            />
          </SearchInputContainer>
          <InnerMenuContainer>
            <InnerMenu type="ghost">
              {groups?.map((group, index) => (
                <Menu.Group key={index} label={<MenuGroupLabel>{group.label}</MenuGroupLabel>}>
                  {group.items.map((item, index) => (
                    <MenuItem
                      draggable="true"
                      key={index}
                      itemKey={`item-${index}`}
                      label={item.label}
                      icon={cloneElement(item.icon, { className: menuIconStyle() })}
                      onDragStart={e => {
                        e.dataTransfer.setData('AddBlockKey', item.key)
                      }}
                    />
                  ))}
                </Menu.Group>
              ))}
            </InnerMenu>
          </InnerMenuContainer>
        </>
      )}
    />
  )
}
