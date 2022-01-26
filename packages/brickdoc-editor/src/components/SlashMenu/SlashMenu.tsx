import * as React from 'react'
import { Editor, Range } from '@tiptap/core'
import { Menu } from '@brickdoc/design-system'
import { EditorContext } from '../../context/EditorContext'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import {
  StyledSlashMenu,
  SlashMenuGroupLabel,
  RecentGroup,
  RecentItem,
  Shortcut,
  ExploreItem,
  ExploreIcon,
  Footer,
  recentItemIconStyle,
  menuIconStyle
} from './styled'
import { useActiveStatus } from './useActiveStatus'
import { useShowExplorerMenu } from './useShowExplorerMenu'

export interface SlashMenuItem {
  key: string
  alias?: string[]
  icon: React.ReactElement
  command: ({ editor, range }: { editor: Editor; range: Range }) => void
}

export interface SlashMenuProps {
  items: {
    query?: string
    type: SlashMenuItem[]
    suggestion: SlashMenuItem[]
    recent: SlashMenuItem[]
  }
  command: (item: SlashMenuItem) => void
}

const EXPLORE_KEY = 'explore'

export const SlashMenu: React.FC<SlashMenuProps> = ({ items, command }) => {
  const { t } = React.useContext(EditorContext)
  const { query, type, suggestion: _suggestion, recent } = items
  const [handleShowExplorerMenu] = useShowExplorerMenu(command)
  const suggestion = React.useMemo<SlashMenuItem[]>(() => {
    if (query) {
      return [
        ..._suggestion,
        {
          key: EXPLORE_KEY,
          icon: <ExploreIcon />,
          command: () => handleShowExplorerMenu()
        }
      ]
    }
    return _suggestion
  }, [_suggestion, handleShowExplorerMenu, query])

  const [activeIndex, setActiveIndex, menuRef] = useActiveStatus(recent, suggestion, type, command)

  // always has a default item Explore
  const suggestionLabel = suggestion.length > 1 ? t('slash_menu.suggestion') : t('slash_menu.no_suggestion')

  return (
    <>
      <StyledSlashMenu baseId="slash-menu" withFooter={!query} aria-label={t('slash_menu.title')} ref={menuRef}>
        {!query && recent.length > 0 && (
          <Menu.Group
            title={t('slash_menu.recent')}
            label={<SlashMenuGroupLabel>{t('slash_menu.recent')}</SlashMenuGroupLabel>}
          >
            <RecentGroup>
              {recent.map((item, index) => (
                <RecentItem
                  data-testid={TEST_ID_ENUM.editor.slashCommands.item.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onAction={() => command(item)}
                  key={item.key}
                  itemKey={item.key}
                  active={index === activeIndex}
                >
                  {React.cloneElement(item.icon, { className: recentItemIconStyle() })}
                </RecentItem>
              ))}
            </RecentGroup>
          </Menu.Group>
        )}
        {query && (
          <Menu.Group title={suggestionLabel} label={<SlashMenuGroupLabel>{suggestionLabel}</SlashMenuGroupLabel>}>
            {suggestion.map((item, index) => (
              <Menu.Item
                data-testid={TEST_ID_ENUM.editor.slashCommands.item.id}
                onMouseEnter={() => setActiveIndex(index)}
                onAction={() => command(item)}
                key={item.key}
                active={index === activeIndex}
                itemKey={item.key}
                icon={React.cloneElement(item.icon, { className: menuIconStyle() })}
                label={t(`blocks.${item.key}.label`)}
                tip={item.alias?.[0] && <Shortcut>{item.alias[0]}</Shortcut>}
              >
                {item.key === EXPLORE_KEY && (
                  <ExploreItem>
                    <span aria-label={t(`slash_menu.items.${item.key}.label`)}>
                      {t(`slash_menu.items.${item.key}.label`)}
                    </span>
                    {item.icon}
                  </ExploreItem>
                )}
              </Menu.Item>
            ))}
          </Menu.Group>
        )}
        {!query && (
          <Menu.Group
            title={t('slash_menu.type')}
            label={<SlashMenuGroupLabel>{t('slash_menu.type')}</SlashMenuGroupLabel>}
          >
            {type.map((item, index) => (
              <Menu.Item
                data-testid={TEST_ID_ENUM.editor.slashCommands.item.id}
                onMouseEnter={() => setActiveIndex(recent.length + index)}
                onAction={() => command(item)}
                key={item.key}
                active={recent.length + index === activeIndex}
                itemKey={item.key}
                icon={React.cloneElement(item.icon, { className: menuIconStyle() })}
                label={t(`blocks.${item.key}.label`)}
                tip={item.alias?.[0] && <Shortcut>{item.alias[0]}</Shortcut>}
              />
            ))}
          </Menu.Group>
        )}
      </StyledSlashMenu>
      {!query && (
        <Footer onClick={handleShowExplorerMenu}>
          <span>{t('slash_menu.footer')}</span>
          <ExploreIcon />
        </Footer>
      )}
    </>
  )
}
