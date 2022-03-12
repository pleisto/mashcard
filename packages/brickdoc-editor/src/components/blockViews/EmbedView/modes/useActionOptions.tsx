import React from 'react'
import { Icon } from '@brickdoc/design-system'
import { ActionGroupOption, BlockActionOptions } from '../../BlockActions'
import { EditorContext } from '../../../../context/EditorContext'

export interface UseActionOptionsProps {
  mode: 'link' | 'preview'
  onFullScreen?: () => void
  onDownload: () => void
  onToLinkMode: () => void
  onToPreviewMode: () => void
}

export function useActionOptions({
  mode,
  onFullScreen,
  onDownload,
  onToLinkMode,
  onToPreviewMode
}: UseActionOptionsProps): [BlockActionOptions] {
  const { t } = React.useContext(EditorContext)
  return React.useMemo(() => {
    const group: ActionGroupOption = {
      type: 'group',
      items: [
        {
          name: 'download',
          label: t('block_actions.embed_block.download'),
          type: 'item',
          icon: <Icon.Download />,
          onAction: onDownload
        }
      ]
    }

    if (onFullScreen) {
      group.items.unshift({
        name: 'fullscreen',
        label: t('block_actions.embed_block.full_screen'),
        type: 'item',
        icon: <Icon.ScreenFull />,
        onAction: onFullScreen
      })
    }

    if (mode === 'link') {
      group.items.push({
        name: 'preview mode',
        label: t('block_actions.embed_block.preview_mode'),
        type: 'item',
        icon: <Icon.Preview />,
        onAction: onToPreviewMode
      })
    } else if (mode === 'preview') {
      group.items.push({
        name: 'attachment mode',
        label: t('block_actions.embed_block.attachment_mode'),
        type: 'item',
        icon: <Icon.TextView />,
        onAction: onToLinkMode
      })
    }

    const actionOptions: BlockActionOptions = [group, 'copy', 'delete']

    return [actionOptions]
  }, [mode, onDownload, onFullScreen, onToLinkMode, onToPreviewMode, t])
}
