import { cloneElement, FC, ReactElement, useMemo } from 'react'
import { Editor, Range } from '@tiptap/core'
import { Menu } from '@mashcard/design-system'
import {
  BlockSelectorContainer,
  BlockSelectorGroupLabel,
  RecentGroup,
  RecentItem,
  Shortcut,
  ExploreItem,
  ExploreIcon,
  Footer,
  recentItemIconStyle,
  menuIconStyle
} from './BlockSelector.style'
import { useActiveStatus } from './useActiveStatus'
import { useShowExplorerMenu } from './useShowExplorerMenu'
import { useEditorI18n } from '../../../hooks'
import { getRecentItems, getSuggestionItems, TYPE_ITEMS } from './items'

export interface BlockSelectorItem {
  key: string
  alias?: string[]
  icon: ReactElement
  command: (options: { editor: Editor; range: Range | number }) => void
}

export interface BlockSelectorProps {
  query?: string
  onBlockSelect?: (item: BlockSelectorItem) => void
}

const EXPLORE_KEY = 'explore'

export const BlockSelector: FC<BlockSelectorProps> = ({ query, onBlockSelect }) => {
  const [t] = useEditorI18n()
  const [handleShowExplorerMenu] = useShowExplorerMenu()

  const RECENT_ITEMS = getRecentItems()
  const SUGGESTION_ITEMS = useMemo<BlockSelectorItem[]>(() => {
    const items = getSuggestionItems(query)
    if (query) {
      return [
        ...items,
        {
          key: EXPLORE_KEY,
          icon: <ExploreIcon />,
          command: () => handleShowExplorerMenu()
        }
      ]
    }
    return items
  }, [handleShowExplorerMenu, query])

  const [activeIndex, setActiveIndex, menuRef] = useActiveStatus(
    RECENT_ITEMS,
    SUGGESTION_ITEMS,
    TYPE_ITEMS,
    onBlockSelect
  )

  // always has a default item Explore
  const suggestionLabel =
    SUGGESTION_ITEMS.length > 1 ? t('block_selector.suggestion') : t('block_selector.no_suggestion')

  return (
    <>
      <BlockSelectorContainer
        baseId="block-selector"
        withFooter={!query}
        aria-label={t('block_selector.title')}
        ref={menuRef}>
        {/* recent items */}
        {!query && RECENT_ITEMS.length > 0 && (
          <Menu.Group
            style={{ paddingTop: 4 }}
            title={t('block_selector.recent')}
            label={<BlockSelectorGroupLabel>{t('block_selector.recent')}</BlockSelectorGroupLabel>}>
            <RecentGroup>
              {RECENT_ITEMS.map((item, index) => (
                <RecentItem
                  onMouseEnter={() => setActiveIndex(index)}
                  onAction={() => onBlockSelect?.(item)}
                  key={item.key}
                  itemKey={item.key}
                  active={index === activeIndex}>
                  {cloneElement(item.icon, { className: recentItemIconStyle() })}
                </RecentItem>
              ))}
            </RecentGroup>
          </Menu.Group>
        )}
        {/* suggestion items */}
        {query && (
          <Menu.Group
            title={suggestionLabel}
            label={<BlockSelectorGroupLabel>{suggestionLabel}</BlockSelectorGroupLabel>}>
            {SUGGESTION_ITEMS.map((item, index) => (
              <Menu.Item
                onMouseEnter={() => setActiveIndex(index)}
                onAction={() => onBlockSelect?.(item)}
                key={item.key}
                active={index === activeIndex}
                itemKey={item.key}
                icon={cloneElement(item.icon, { className: menuIconStyle() })}
                label={t(`blocks.${item.key}.label`)}
                tip={item.alias?.[0] && <Shortcut>{item.alias[0]}</Shortcut>}>
                {item.key === EXPLORE_KEY && (
                  <ExploreItem>
                    <span aria-label={t(`block_selector.items.${item.key}.label`)}>
                      {t(`block_selector.items.${item.key}.label`)}
                    </span>
                    {item.icon}
                  </ExploreItem>
                )}
              </Menu.Item>
            ))}
          </Menu.Group>
        )}
        {/* all items */}
        {!query && (
          <Menu.Group
            title={t('block_selector.type')}
            label={<BlockSelectorGroupLabel>{t('block_selector.type')}</BlockSelectorGroupLabel>}>
            {TYPE_ITEMS.map((item, index) => (
              <Menu.Item
                onMouseEnter={() => setActiveIndex(RECENT_ITEMS.length + index)}
                onAction={() => onBlockSelect?.(item)}
                key={item.key}
                active={RECENT_ITEMS.length + index === activeIndex}
                itemKey={item.key}
                style={{ height: 40 }}
                icon={cloneElement(item.icon, { className: menuIconStyle() })}
                label={t(`blocks.${item.key}.label`)}
                tip={item.alias?.[0] && <Shortcut>{item.alias[0]}</Shortcut>}
              />
            ))}
          </Menu.Group>
        )}
      </BlockSelectorContainer>
      {!query && (
        <Footer onClick={handleShowExplorerMenu}>
          <span>{t('block_selector.footer')}</span>
          <ExploreIcon />
        </Footer>
      )}
    </>
  )
}
