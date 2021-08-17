import React from 'react'
import { Uppy } from '@uppy/core'
import { Button, Icon } from '@brickdoc/design-system'
import cx from 'classnames'
import emojiData from './data-by-group.json'
import { EmojiPanel } from './EmojiPanel'
import { DashboardPluginOptions } from './plugin'
import { LinkPanel } from './LinkPanel'
import { UploadPanel } from './UploadPanel'
import { UnsplashPanel } from './UnsplashPanel'
import { GalleryPanel } from './GalleryPanel'
import { useEmoji } from './useEmoji'

type SourceType = 'upload' | 'link' | 'unsplash' | 'emoji' | 'gallery'

export interface ImportSourceOption {
  type: SourceType
  typeLabel?: string
  buttonText?: string
  buttonHint?: string
  acceptType?: string
  linkInputPlaceholder?: string
}

const IMPORT_SOURCE_LABEL = {
  upload: 'Upload',
  link: 'Embed link',
  unsplash: 'Unsplash',
  emoji: 'Emoji',
  gallery: 'Gallery'
}

interface DashboardProps {
  uppy: Uppy
  pluginId: string
  pluginOptions: DashboardPluginOptions
  importSources: ImportSourceOption[]
}

export interface ActionButtonOption {
  icon?: React.FC
  label: string
  onClick?: VoidFunction
}

export const Dashboard: React.FC<DashboardProps> = ({ pluginId, uppy, importSources, pluginOptions }) => {
  const [activeSource, setActiveSource] = React.useState(importSources[0])
  const [recentEmojis, handleSelectEmoji] = useEmoji(pluginOptions, !!importSources.find(source => source.type === 'emoji'))

  const handleNavbarItemClick = (activeSource: ImportSourceOption) => () => {
    setActiveSource(activeSource)
  }

  const handleRandomPickEmoji = (): void => {
    const data = Object.values(emojiData).flat()
    const emoji = data[Math.floor(Math.random() * data.length)]

    handleSelectEmoji(emoji, 'add')
  }

  const handleRemoveEmoji = (): void => {
    handleSelectEmoji(null, 'remove')
  }

  const handleRemoveGalleryImage = (): void => {
    pluginOptions.onUploaded?.({ color: null, action: 'remove' })
  }

  const EMOJI_ACTION_BUTTONS: ActionButtonOption[] = [
    {
      label: 'Random',
      icon: Icon.Redo,
      onClick: handleRandomPickEmoji
    },
    {
      label: 'Remove',
      onClick: handleRemoveEmoji
    }
  ]

  const GALLERY_ACTION_BUTTONS: ActionButtonOption[] = [
    {
      label: 'Remove',
      onClick: handleRemoveGalleryImage
    }
  ]

  let actionButtons: ActionButtonOption[] = []

  if (activeSource.type === 'emoji') {
    actionButtons = EMOJI_ACTION_BUTTONS
  }

  if (activeSource.type === 'gallery') {
    actionButtons = GALLERY_ACTION_BUTTONS
  }

  return (
    <div role="dialog" className="brickdoc-uploader-dashboard">
      <div className="uploader-dashboard-navbar">
        {importSources.map(source => (
          <Button
            type="text"
            role="menuitem"
            key={source.type}
            className={cx('uploader-dashboard-navbar-item', { active: activeSource.type === source.type })}
            onClick={handleNavbarItemClick(source)}>
            {source.typeLabel || IMPORT_SOURCE_LABEL[source.type]}
          </Button>
        ))}
        <div className="uploader-dashboard-action-buttons">
          {actionButtons.map(button => (
            <Button type="text" key={button.label} className="dashboard-action-button" onClick={button.onClick}>
              {button.icon && (
                <span className="brk-icon dashboard-action-button-icon">
                  <button.icon />
                </span>
              )}
              <div className="dashboard-action-button-label">{button.label}</div>
            </Button>
          ))}
        </div>
      </div>
      {activeSource?.type === 'emoji' && (
        <EmojiPanel
          recentEmojis={recentEmojis}
          onSelectEmoji={handleSelectEmoji}
          emojiData={emojiData}
          pluginOptions={pluginOptions}
          importSource={activeSource}
        />
      )}
      {activeSource?.type === 'link' && <LinkPanel pluginOptions={pluginOptions} importSource={activeSource} />}
      {activeSource?.type === 'upload' && (
        <UploadPanel pluginId={pluginId} uppy={uppy} pluginOptions={pluginOptions} importSource={activeSource} />
      )}
      {activeSource?.type === 'unsplash' && <UnsplashPanel pluginOptions={pluginOptions} />}
      {activeSource?.type === 'gallery' && <GalleryPanel pluginOptions={pluginOptions} />}
    </div>
  )
}
