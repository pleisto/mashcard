import React from 'react'
import { Icon } from '@brickdoc/design-system'
import { ActionOption, ActionOptionGroup } from '../../../components/ActionPanel/ActionPanel'
import { useEditorI18n } from '../../../'

export interface UseActionOptionsProps {
  mode: 'link' | 'preview'
  onFullScreen?: () => void
  onDownload: () => void
  onToLinkMode: () => void
  onToPreviewMode: () => void
  onCopy: () => void
  onDelete: () => void
}

export function useActionOptions({
  mode,
  onFullScreen,
  onDownload,
  onToLinkMode,
  onToPreviewMode,
  onCopy,
  onDelete
}: UseActionOptionsProps): [ActionOptionGroup] {
  const [t] = useEditorI18n()

  return React.useMemo(() => {
    const firstGroup: ActionOption[] = [
      {
        type: 'button',
        Icon: <Icon.Download />,
        onClick: onDownload
      }
    ]

    if (onFullScreen) {
      firstGroup.push({
        type: 'button',
        Icon: <Icon.ScreenFull />,
        onClick: onFullScreen
      })
    }

    const actionOptions: ActionOptionGroup = [
      firstGroup,
      [
        {
          type: 'button',
          Icon: <Icon.TextView />,
          onClick: onToLinkMode,
          active: mode === 'link'
        },
        {
          type: 'button',
          Icon: <Icon.Preview />,
          onClick: onToPreviewMode,
          active: mode === 'preview'
        }
      ],
      {
        type: 'dropdown',
        Icon: <Icon.More />,
        menuItems: [
          {
            type: 'item',
            Icon: <Icon.Copy />,
            name: t('action_panel.more.copy'),
            onClick: onCopy
          },
          {
            type: 'divider'
          },
          {
            type: 'item',
            Icon: <Icon.Delete />,
            name: t('action_panel.more.delete'),
            onClick: onDelete
          }
        ]
      }
    ]

    return [actionOptions]
  }, [mode, onCopy, onDelete, onDownload, onFullScreen, onToLinkMode, onToPreviewMode, t])
}
