import React from 'react'
import { debounce } from 'lodash-es'
import { Button } from '@brickdoc/design-system'
import { ImportSourceOption } from './Dashboard'
import { DashboardPluginOptions, UploadResultData } from './plugin'

export interface EmojiPanelProps {
  importSource: ImportSourceOption
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

export const EmojiPanel: React.FC<EmojiPanelProps> = ({ emojiData, recentEmojis, onSelectEmoji }) => {
  const [search, setSearch] = React.useState('')
  const handleSearchEmoji = debounce((event: any): void => {
    const search = event.target.value
    setSearch(search)
  }, 200)

  const getEmojis = (name: string): EmojiMeta[] => {
    let data: EmojiMeta[] = []
    if (name === RECENT_GROUP) {
      data = recentEmojis ?? []
    } else {
      data = emojiData[name] ?? []
    }

    if (!search) return data

    return data.filter(emoji => emoji.name.includes(search))
  }

  const [activeGroups, setActiveGroups] = React.useState<string[]>([RECENT_GROUP, Object.keys(emojiData)[0]])

  const observeY = React.useRef<number>()
  const createScrollObserver = (ele: HTMLElement): void => {
    if (!ele) {
      return
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }

    new IntersectionObserver((entities): void => {
      const y = entities[0].boundingClientRect.y
      const groups = [RECENT_GROUP, ...Object.keys(emojiData)]
      const updater = debounce(() => {
        setActiveGroups(prevGroups => {
          const newGroup = groups[prevGroups.length]
          if (!newGroup || prevGroups.includes(newGroup)) {
            return prevGroups
          }

          return [...prevGroups, newGroup]
        })
      }, 300)

      if (observeY.current > y) {
        if (activeGroups.length === groups.length) {
          return
        }

        updater()
      }
      observeY.current = y
    }, options).observe(ele)
  }

  return (
    <div className="uploader-dashboard-emoji-panel">
      <input className="dashboard-emoji-search-input" placeholder="Search for Emoji..." onChange={handleSearchEmoji} />
      <div className="dashboard-emoji-section">
        {activeGroups.map(name => {
          const emojis = getEmojis(name)

          if (emojis.length === 0) {
            return null
          }

          return (
            <div role="group" key={name} className="dashboard-emoji-group">
              <div className="dashboard-emoji-group-name">{name}</div>
              <div role="list" className="dashboard-emoji-list">
                {emojis.map(item => (
                  <Button
                    type="text"
                    key={item.name}
                    className="dashboard-emoji-item"
                    onClick={() => onSelectEmoji(item, 'add')}
                  >
                    <span aria-label={item.name} className="dashboard-emoji" role="img">
                      {item.emoji}
                    </span>
                  </Button>
                ))}
                <div
                  ref={container => {
                    createScrollObserver(container)
                  }}
                  className="emoji-load-more-placeholder"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
