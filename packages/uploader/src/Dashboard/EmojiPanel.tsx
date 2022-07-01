import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { debounce } from '@mashcard/active-support'
import { GroupedVirtuoso } from 'react-virtuoso'
import { ImportSourceOption } from './Dashboard'
import { DashboardPluginOptions, UploadResultData } from './plugin'
import { NotFound } from './index.style'
import { Button, Input } from '@mashcard/design-system'

export interface EmojiPanelProps {
  // eslint-disable-next-line react/no-unused-prop-types
  importSource: ImportSourceOption
  // eslint-disable-next-line react/no-unused-prop-types
  pluginOptions: DashboardPluginOptions
  emojiData: { [key: string]: EmojiMeta[] }
  recentEmojis: EmojiMeta[]
  onSelectEmoji: (emoji: EmojiMeta | undefined, action: UploadResultData['action']) => void
}

export interface EmojiMeta {
  emoji: string
  skin_tone_support: boolean
  name: string
  slug: string
  unicode_version: string
  emoji_version: string
}

const RECENT_GROUP = 'Recent'
const EMOJI_COUNT_PER_LINE = 16

export const EmojiPanel: FC<EmojiPanelProps> = ({ emojiData, recentEmojis, onSelectEmoji }) => {
  const [search, setSearch] = useState('')
  const [increasedViewportSize, setIncreasedViewportSize] = useState(323)

  useEffect(() => {
    // A hack for incorrect viewport measurement during popover animation
    setTimeout(() => {
      setIncreasedViewportSize(0)
    }, 500)
  }, [])

  const getEmojis = useCallback(
    (name: string): EmojiMeta[] => {
      let data: EmojiMeta[] = []
      if (name === RECENT_GROUP) {
        data = recentEmojis ?? []
      } else {
        data = emojiData[name] ?? []
      }

      if (!search) return data

      return data.filter(emoji => emoji?.name?.includes(search))
    },
    [emojiData, recentEmojis, search]
  )

  const groups = useMemo(
    () =>
      [RECENT_GROUP, ...Object.keys(emojiData)]
        .map(name => {
          const emojis = getEmojis(name)
          const lineCount = Math.ceil(emojis.length / EMOJI_COUNT_PER_LINE)

          // group emojis into lines
          const emojisByLine: EmojiMeta[][] = []
          for (let i = 0; i < lineCount; i++) {
            emojisByLine.push(emojis.slice(i * EMOJI_COUNT_PER_LINE, (i + 1) * EMOJI_COUNT_PER_LINE))
          }

          return {
            name,
            emojis: getEmojis(name),
            lines: emojisByLine
          }
        })
        .filter(i => i.emojis.length > 0),
    [emojiData, getEmojis]
  )

  const flattedData = useMemo(
    () => ({
      groupCounts: groups.map(group => group.lines.length),
      lines: groups.flatMap(group =>
        group.lines.map(line =>
          // eslint-disable-next-line max-nested-callbacks
          line.map(item => {
            if (!item.name) {
              return null
            }
            return (
              <Button
                className="dashboard-emoji-item"
                role="option"
                aria-label={item.name}
                key={item.name}
                type="text"
                // eslint-disable-next-line max-nested-callbacks
                onClick={() => onSelectEmoji(item, 'add')}
              >
                {item.emoji}
              </Button>
            )
          })
        )
      )
    }),
    [groups, onSelectEmoji]
  )

  const handleSearchEmoji = debounce((event: any): void => {
    const search = event.target.value
    setSearch(search)
  }, 200)

  return (
    <div className="uploader-dashboard-emoji-panel">
      <Input className="dashboard-emoji-search-input" placeholder="Search for Emoji..." onChange={handleSearchEmoji} />
      <div className="dashboard-emoji-section">
        <GroupedVirtuoso
          className="dashboard-emoji-list"
          style={{ height: 323 }}
          defaultItemHeight={34}
          fixedItemHeight={34}
          increaseViewportBy={increasedViewportSize}
          groupCounts={flattedData.groupCounts}
          // eslint-disable-next-line react/no-unstable-nested-components
          groupContent={index => {
            return <div className="dashboard-emoji-group-name">{groups[index].name}</div>
          }}
          // eslint-disable-next-line react/no-unstable-nested-components
          itemContent={index => {
            return (
              <div role="listbox" className="dashboard-emoji-line">
                {flattedData.lines[index]}
              </div>
            )
          }}
          components={{
            // eslint-disable-next-line react/no-unstable-nested-components
            Header: () => (flattedData.groupCounts.length === 0 ? <NotFound>No result found.</NotFound> : null)
          }}
        />
      </div>
    </div>
  )
}
