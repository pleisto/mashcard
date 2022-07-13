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
import { Drawer } from '../../ui'
import { useDrawer } from '../../ui/Drawer'
import { slashMenuGroup } from '../../../extensions/extensions/slashCommands/items'
import { useEditorI18n } from '../../../hooks'

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
          slashMenuGroup.map(group => ({
            label: t(`slash_menu.explorer_menu.group.${group.key}.label`),
            items: group.items.map(item => ({
              label: t(`blocks.${item.key}.label`),
              labelText: t(`blocks.${item.key}.label`),
              key: item.key,
              icon: item.icon
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
