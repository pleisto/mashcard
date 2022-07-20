import { Button, Popover, PopoverProps, styled, theme } from '@mashcard/design-system'
import { BlockType, FileSource } from '@mashcard/schema'
import { Dashboard, DashboardProps, ImportSourceOption, UploadResultData } from '@mashcard/uploader'
import { ReactElement, useCallback, useState } from 'react'
import { CalloutAttributes } from '../../../extensions'
import { CalloutViewProps } from '../../../extensions/blocks/callout/meta'
import { useEditorI18n } from '../../../hooks'

const size = '1.5rem'

export const iconWidth = '2rem'

const IconButton = styled(Button, {
  variants: {
    type: {
      text: {
        background: 'transparent',
        border: 'none',
        height: '2rem',
        padding: 0,
        width: iconWidth
      }
    }
  }
})

const EmojiIcon = styled('span', {
  fontSize: size,
  fontFamily: theme.fonts.emoji
})

const ImageIcon = styled('div', {
  height: size,
  width: size,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover'
})

export function useDashboardProps({
  setVisible,
  extension,
  updateAttributes
}: {
  setVisible: (visible: boolean) => void
  extension: CalloutViewProps['extension']
  updateAttributes: CalloutViewProps['updateAttributes']
}): DashboardProps {
  const [t] = useEditorI18n()
  const importSources: ImportSourceOption[] = [
    {
      type: 'emoji'
    },
    {
      type: 'upload',
      acceptType: 'image/*',
      typeLabel: t('blocks.callout.icon.import_sources.upload.type_label'),
      buttonText: t('blocks.callout.icon.import_sources.upload.button_text'),
      buttonHint: t('blocks.callout.icon.import_sources.upload.button_hint')
    }
  ]

  const onUploaded = useCallback(
    (data: UploadResultData): void => {
      let iconMeta: CalloutAttributes['icon']

      if (data.url) {
        iconMeta = {
          type: BlockType.Image,
          source: FileSource.Origin,
          key: data.url,
          viewUrl: data.viewUrl
        }
      } else if (data.emoji) {
        iconMeta = {
          type: BlockType.Emoji,
          name: data.emoji.name,
          emoji: data.emoji.emoji
        }
      } else {
        return
      }

      updateAttributes({
        icon: iconMeta
      })

      setVisible(false)
    },
    [setVisible, updateAttributes]
  )
  const prepareFileUpload: DashboardProps['prepareFileUpload'] = async (blockId, type, file) =>
    await extension.options.prepareFileUpload!(type, file)

  return {
    prepareFileUpload,
    onUploaded,
    importSources,
    fileType: 'image'
  }
}

export function useIcon(
  icon: CalloutAttributes['icon'],
  {
    extension,
    updateAttributes
  }: {
    extension: CalloutViewProps['extension']
    updateAttributes: CalloutViewProps['updateAttributes']
  }
): [ReactElement] {
  const [visible, setVisible] = useState<boolean>(false)
  const dashboardProps = useDashboardProps({
    setVisible,
    extension,
    updateAttributes
  })

  const popoverProps: Partial<PopoverProps> = {
    visible,
    onVisibleChange: setVisible,
    trigger: 'click',
    placement: 'bottomStart',
    destroyTooltipOnHide: true,
    content: <Dashboard {...dashboardProps} />
  }

  const uploaderElement = (
    <Popover {...popoverProps}>
      <IconButton type="text">
        {icon.type === 'EMOJI' && <EmojiIcon aria-label={icon.name}>{icon.emoji}</EmojiIcon>}
        {icon.type === 'IMAGE' && (
          <ImageIcon
            style={{
              backgroundImage: `url("${icon.viewUrl}")`
            }}
          />
        )}
      </IconButton>
    </Popover>
  )

  return [uploaderElement]
}
