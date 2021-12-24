import React from 'react'
import { Icon } from '@brickdoc/design-system'
import { ActionSectionOption, BlockActionOptions } from '../../../components/BlockActions'

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
  return React.useMemo(() => {
    const firstGroup: ActionSectionOption = {
      type: 'section',
      items: [
        {
          name: 'download',
          type: 'item',
          icon: <Icon.Download />,
          onAction: onDownload
        }
      ]
    }

    if (onFullScreen) {
      firstGroup.items.push({
        name: 'fullscreen',
        type: 'item',
        icon: <Icon.ScreenFull />,
        onAction: onFullScreen
      })
    }

    const actionOptions: BlockActionOptions = [
      firstGroup,
      {
        type: 'section',
        items: [
          {
            name: 'attachment mode',
            type: 'item',
            icon: <Icon.TextView />,
            onAction: onToLinkMode,
            active: mode === 'link'
          },
          {
            name: 'preview mode',
            type: 'item',
            icon: <Icon.Preview />,
            onAction: onToPreviewMode,
            active: mode === 'preview'
          }
        ]
      },
      'copy',
      'delete'
    ]

    return [actionOptions]
  }, [mode, onDownload, onFullScreen, onToLinkMode, onToPreviewMode])
}
