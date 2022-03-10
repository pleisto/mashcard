import React from 'react'
import { EmojiMeta, EmojiPanelProps } from './EmojiPanel'
import { DashboardPluginOptions, UploadResultData } from './plugin'

export const RECENT_EMOJI_LOCAL_STORAGE_KEY = 'brickdoc-uploader-recent-emoji'

export function useEmoji(
  pluginOptions: DashboardPluginOptions,
  active: boolean
): [EmojiMeta[], EmojiPanelProps['onSelectEmoji']] {
  const [recentEmojis, setRecentEmojis] = React.useState<EmojiMeta[]>([])

  const updateRecentEmojis = (newEmoji?: EmojiMeta): void => {
    if (!newEmoji) return

    if (recentEmojis.find(emoji => emoji.name === newEmoji.name)) {
      return
    }

    const newRecentEmojis = [newEmoji, ...recentEmojis].slice(0, 24)
    setRecentEmojis(newRecentEmojis)
    localStorage.setItem(RECENT_EMOJI_LOCAL_STORAGE_KEY, JSON.stringify(newRecentEmojis))
  }

  const handleSelectEmoji = (emoji: EmojiMeta, action: UploadResultData['action']): void => {
    updateRecentEmojis(emoji)
    pluginOptions.onUploaded?.({ emoji, action })
  }

  React.useEffect(() => {
    if (!active) {
      return
    }

    let recentEmojis = []
    try {
      recentEmojis = JSON.parse(localStorage.getItem(RECENT_EMOJI_LOCAL_STORAGE_KEY)!) ?? []
    } catch {
      // ignore error
    }

    setRecentEmojis(recentEmojis)
  }, [active])

  return [recentEmojis, handleSelectEmoji]
}
