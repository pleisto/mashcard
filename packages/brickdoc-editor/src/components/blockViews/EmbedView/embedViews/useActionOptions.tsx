import { Download } from '@brickdoc/design-icons'
import { useMemo } from 'react'
import { useEditorI18n } from '../../../../hooks'
import { BlockActionOptions } from '../../BlockActions'

export function useActionOptions(url?: string): [BlockActionOptions] {
  const [t] = useEditorI18n()

  return useMemo(() => {
    const actionOptions: BlockActionOptions = ['copy', 'delete']

    if (url) {
      actionOptions.unshift({
        type: 'group',
        items: [
          {
            name: 'download',
            label: t('block_actions.embed_block.download'),
            type: 'item',
            icon: <Download />,
            onAction: () => {
              const link = document.createElement('a')
              link.download = 'true'
              link.href = url
              link.click()
            }
          }
        ]
      })
    }

    return [actionOptions]
  }, [t, url])
}
