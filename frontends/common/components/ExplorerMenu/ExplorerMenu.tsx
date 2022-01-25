import React from 'react'
import { Icon, Menu } from '@brickdoc/design-system'
import { BrickdocEventBus, ExplorerMenuGroup, ExplorerMenuItem, ExplorerMenuTrigger } from '@brickdoc/schema'
import { useDocsI18n } from '@/docs/common/hooks'
import {
  ExplorerHeader,
  ExplorerHeaderClose,
  ExplorerHeaderTitle,
  ExplorerHeaderTitleIcon,
  ExplorerOverlay,
  InnerMenu,
  InnerMenuContainer,
  MenuGroupLabel,
  menuIconStyle,
  MenuItem,
  SearchInput,
  SearchInputContainer,
  StyledExplorerMenu
} from './styled'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ExplorerMenuProps {}

const isMatchSearch =
  (search?: string) =>
  (item: ExplorerMenuItem): boolean => {
    if (!search) return true
    return item.labelText.toLowerCase().includes(search?.toLowerCase())
  }

export const ExplorerMenu: React.FC<ExplorerMenuProps> = () => {
  const { t } = useDocsI18n()
  const [visible, setVisible] = React.useState(false)
  const [groupSource, setGroupSource] = React.useState<ExplorerMenuGroup[]>()
  const [search, setSearch] = React.useState('')

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(ExplorerMenuTrigger, event => {
      setGroupSource(event.payload.items)
      setVisible(event.payload.visible)
    })
    return () => listener.unsubscribe()
  }, [])

  const groups = React.useMemo<ExplorerMenuGroup[]>(
    () =>
      // filter groups by search
      groupSource?.reduce<ExplorerMenuGroup[]>((prev, group) => {
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
      }, []) ?? [],
    [groupSource, search]
  )

  const handleSearchChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(event => {
    setSearch(event.target.value)
  }, [])

  const handleClose = React.useCallback(() => {
    setVisible(false)
  }, [])
  const handleExplorerMenuClick = React.useCallback<React.MouseEventHandler>(event => {
    event.stopPropagation()
  }, [])

  return (
    <ExplorerOverlay visible={visible} onClick={handleClose}>
      <StyledExplorerMenu visible={visible} onClick={handleExplorerMenuClick}>
        <ExplorerHeader>
          <ExplorerHeaderTitle>
            <ExplorerHeaderTitleIcon />
            {t('explorer_menu.title')}
          </ExplorerHeaderTitle>
          <ExplorerHeaderClose onClick={handleClose} />
        </ExplorerHeader>
        <SearchInputContainer>
          <SearchInput
            prefix={<Icon.Search />}
            placeholder={t('explorer_menu.search.placeholder')}
            onChange={handleSearchChange}
            value={search}
          />
        </SearchInputContainer>
        <InnerMenuContainer>
          <InnerMenu>
            {groups?.map((group, index) => (
              <Menu.Group key={index} label={<MenuGroupLabel>{group.label}</MenuGroupLabel>}>
                {group.items.map((item, index) => (
                  <MenuItem
                    onAction={() => {
                      item.onAction?.()
                      handleClose()
                    }}
                    key={index}
                    itemKey={`item-${index}`}
                    label={item.label}
                    icon={React.cloneElement(item.icon, { className: menuIconStyle() })}
                  />
                ))}
              </Menu.Group>
            ))}
          </InnerMenu>
        </InnerMenuContainer>
      </StyledExplorerMenu>
    </ExplorerOverlay>
  )
}
