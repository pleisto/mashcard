import { useMemo } from 'react'
import { Icon } from '@brickdoc/design-system'
import { ActionGroupOption, BlockActionOptions } from '../../BlockActions'
import { useEditorContext } from '../../../../hooks'

export interface UseActionOptionsProps {
  mode: 'link' | 'preview'
  onFullScreen?: () => void
  onDownload: () => void
}

export function useActionOptions({ mode, onFullScreen, onDownload }: UseActionOptionsProps): [BlockActionOptions] {
  const { t } = useEditorContext()
  return useMemo(() => {
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

    const actionOptions: BlockActionOptions = [group, 'copy', 'delete']

    return [actionOptions]
  }, [onDownload, onFullScreen, t])
}
