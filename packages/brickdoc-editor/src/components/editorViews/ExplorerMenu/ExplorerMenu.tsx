import { useCallback, useState, useMemo, useContext, ChangeEventHandler, cloneElement, useEffect } from 'react'
import { Icon, Menu } from '@brickdoc/design-system'
import { BrickdocEventBus, ExplorerMenuGroup, ExplorerMenuItem, ExplorerMenuTrigger } from '@brickdoc/schema'
import { EditorContext } from '../../../context/EditorContext'
import {
  InnerMenu,
  InnerMenuContainer,
  MenuGroupLabel,
  menuIconStyle,
  MenuItem,
  SearchInput,
  SearchInputContainer
} from './styled'
import { Drawer } from '../../ui'
import { useDrawer } from '../../ui/Drawer'

export interface ExplorerMenuProps {}

const isMatchSearch =
  (search?: string) =>
  (item: ExplorerMenuItem): boolean => {
    if (!search) return true
    return item.labelText.toLowerCase().includes(search?.toLowerCase())
  }

export const ExplorerMenu: React.FC<ExplorerMenuProps> = () => {
  const { t } = useContext(EditorContext)
  const { visible, setVisible } = useDrawer('explorerMenu')
  const [search, setSearch] = useState('')
  const [groupSource, setGroupSource] = useState<ExplorerMenuGroup[]>([])

  useEffect(
    () =>
      BrickdocEventBus.subscribe(ExplorerMenuTrigger, event => {
        setGroupSource(event.payload.items ?? [])
      }).unsubscribe,
    []
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
      visible={visible}
      onClose={() => setVisible(false)}
      title={t('explorer_menu.title')}
      renderBody={() => (
        <>
          <SearchInputContainer>
            <SearchInput
              prefix={<Icon.Search />}
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
                      onAction={() => {
                        item.onAction?.()
                        setVisible(false)
                      }}
                      key={index}
                      itemKey={`item-${index}`}
                      label={item.label}
                      icon={cloneElement(item.icon, { className: menuIconStyle() })}
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
