import { FC, forwardRef, useCallback, useMemo, useState } from 'react'
import { debounce } from '@brickdoc/active-support'
import { Button } from '@brickdoc/design-system'
import List from 'rc-virtual-list'
import { ImportSourceOption } from './Dashboard'
import { DashboardPluginOptions, UploadResultData } from './plugin'

export interface EmojiPanelProps {
  // eslint-disable-next-line react/no-unused-prop-types
  importSource: ImportSourceOption
  // eslint-disable-next-line react/no-unused-prop-types
  pluginOptions: DashboardPluginOptions
  emojiData: { [key: string]: EmojiMeta[] }
  recentEmojis: EmojiMeta[]
  onSelectEmoji: (emoji: EmojiMeta, action: UploadResultData['action']) => void
}

export interface EmojiMeta {
  emoji: string
  skin_tone_support: boolean
  name: string
  slug: string
  unicode_version: string
  emoji_version: string
}

const RECENT_GROUP = 'RECENT'

const EmojiGroup = forwardRef<
  HTMLDivElement,
  {
    item: { name: string; emojis: EmojiMeta[]; height: number }
    onSelectEmoji: EmojiPanelProps['onSelectEmoji']
  }
>(({ item: { name, height, emojis }, onSelectEmoji }, ref) => {
  return (
    <div ref={ref} style={{ height }} role="group" key={name} className="dashboard-emoji-group">
      <div className="dashboard-emoji-group-name">{name}</div>
      <div role="listbox" className="dashboard-emoji-list">
        {emojis.map(item => {
          if (!item.name) {
            return null
          }
          return (
            <Button
              role="option"
              type="text"
              key={item.name}
              className="dashboard-emoji-item"
              onClick={() => onSelectEmoji(item, 'add')}>
              <span aria-label={item.name} className="dashboard-emoji" role="img">
                {item.emoji}
              </span>
            </Button>
          )
        })}
      </div>
    </div>
  )
})

export const EmojiPanel: FC<EmojiPanelProps> = ({ emojiData, recentEmojis, onSelectEmoji }) => {
  const [search, setSearch] = useState('')

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
          return {
            name,
            emojis,
            height:
              /** emojis height */ (Math.ceil(emojis.length) / 16) * (32 + 9) +
              /** title height */ 20 +
              /** group gap */ 18
          }
        })
        .filter(i => i.emojis.length > 0),
    [emojiData, getEmojis]
  )

  const handleSearchEmoji = debounce((event: any): void => {
    const search = event.target.value
    setSearch(search)
  }, 200)

  return (
    <div className="uploader-dashboard-emoji-panel">
      <input className="dashboard-emoji-search-input" placeholder="Search for Emoji..." onChange={handleSearchEmoji} />
      <div className="dashboard-emoji-section">
        <List data={groups} height={323} itemHeight={323} itemKey="name">
          {item => <EmojiGroup onSelectEmoji={onSelectEmoji} item={item} />}
        </List>
      </div>
    </div>
  )
}
