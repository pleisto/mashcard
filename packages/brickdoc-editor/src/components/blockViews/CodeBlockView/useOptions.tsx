import { Copy } from '@brickdoc/design-icons'
import { toast } from '@brickdoc/design-system'
import { BlockActionOptions } from '../BlockActions'
import { actionIconStyle } from '../BlockActions/BlockActionsMenu'
import { CodeBlockViewProps } from '../../../extensions/blocks/codeBlock/meta'
import { useEditorContext } from '../../../hooks'

export function useOptions(node: CodeBlockViewProps['node']): [BlockActionOptions] {
  const { t } = useEditorContext()
  const actionOptions: BlockActionOptions = [
    {
      type: 'item',
      name: 'copy',
      label: t('code_block.copy_code'),
      icon: <Copy className={actionIconStyle()} />,
      onAction: async () => {
        await navigator.clipboard.writeText(node.text ?? node.textContent ?? '')
        void toast.success(t('copy_hint'))
      },
      closeOnAction: true
    },
    'delete'
  ]

  return [actionOptions]
}
