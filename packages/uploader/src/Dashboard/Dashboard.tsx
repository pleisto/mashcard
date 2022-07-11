import React from 'react'
import { Uppy } from '@uppy/core'
import { Button, cx } from '@mashcard/design-system'
import { Delete } from '@mashcard/design-icons'
import { TEST_ID_ENUM } from '@mashcard/test-helper'
import emojiData from './data-by-group.json'
import { EmojiPanel } from './EmojiPanel'
import { DashboardPluginOptions, SourceType } from './plugin'
import { LinkPanel } from './LinkPanel'
import { UploadPanel } from './UploadPanel'
import { UnsplashPanel } from './UnsplashPanel'
import { GalleryPanel } from './GalleryPanel'
import { useEmoji } from './useEmoji'
import { MashcardUploaderDashboard } from './index.style'

export interface ImportSourceOption {
  type: SourceType
  typeLabel?: string
  buttonText?: string
  buttonHint?: string
  acceptType?: string
  linkInputPlaceholder?: string
  invalidImageUrlMessage?: string
}

const IMPORT_SOURCE_LABEL = {
  upload: 'Upload',
  link: 'Embed link',
  unsplash: 'Unsplash',
  emoji: 'Emoji',
  gallery: 'Gallery'
}

const IMPORT_SOURCE_TEST_ID = {
  upload: TEST_ID_ENUM.uploader.Dashboard.tabs.Upload.id,
  unsplash: TEST_ID_ENUM.uploader.Dashboard.tabs.Unsplash.id
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
  const sourceType = importSources[0].type
  const { showRemoveButton } = pluginOptions
  const [activeSource, setActiveSource] = React.useState(importSources[0])
  const [recentEmojis, handleSelectEmoji] = useEmoji(
    pluginOptions,
    !!importSources.find(source => source.type === 'emoji')
  )

  const handleNavbarItemClick = (activeSource: ImportSourceOption) => () => {
    setActiveSource(activeSource)
  }

  const handleRemoveEmoji = (): void => {
    handleSelectEmoji(undefined, 'remove')
  }

  const handleRemoveGalleryImage = (): void => {
    pluginOptions.onUploaded?.({ color: undefined, action: 'remove' })
  }

  const EMOJI_ACTION_BUTTONS: ActionButtonOption[] = []

  const GALLERY_ACTION_BUTTONS: ActionButtonOption[] = []

  let actionButtons: ActionButtonOption[] = []

  if (sourceType === 'emoji') {
    if (showRemoveButton) {
      EMOJI_ACTION_BUTTONS.push({
        label: 'Remove',
        icon: Delete,
        onClick: handleRemoveEmoji
      })
    }
    actionButtons = EMOJI_ACTION_BUTTONS
  }

  if (sourceType === 'unsplash' || sourceType === 'gallery') {
    if (showRemoveButton) {
      GALLERY_ACTION_BUTTONS.push({
        label: 'Remove',
        icon: Delete,
        onClick: handleRemoveGalleryImage
      })
    }
    actionButtons = GALLERY_ACTION_BUTTONS
  }

  return (
    <MashcardUploaderDashboard role="dialog">
      <div className="uploader-dashboard-navbar">
        {importSources.map(source => (
          <Button
            type="text"
            role="menuitem"
            key={source.type}
            className={cx('uploader-dashboard-navbar-item', { active: activeSource.type === source.type })}
            data-testid={IMPORT_SOURCE_TEST_ID[source.type as 'upload' | 'unsplash']}
            onClick={handleNavbarItemClick(source)}
          >
            {source.typeLabel ?? IMPORT_SOURCE_LABEL[source.type]}
          </Button>
        ))}
        <div className="uploader-dashboard-action-buttons">
          {actionButtons.map(button => (
            <Button type="text" key={button.label} className="dashboard-action-button" onClick={button.onClick}>
              {button.icon && (
                <span className="mc-icon dashboard-action-button-icon">
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
    </MashcardUploaderDashboard>
  )
}
