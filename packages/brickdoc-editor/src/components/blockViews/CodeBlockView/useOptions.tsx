import { toast } from '@brickdoc/design-system'
import { BlockActionOptions } from '../BlockActions'
import { actionIconStyle, actionIconBackgroundStyle } from '../BlockActions/BlockActionsMenu'
import { CodeBlockViewProps } from '../../../extensions/blocks/codeBlock/meta'
import { useEditorI18n } from '../../../hooks'
import { Copy } from '@brickdoc/design-icons'
import { IconBackground } from '../../ui/Icon'

export function useOptions(node: CodeBlockViewProps['node']): [BlockActionOptions] {
  const [t] = useEditorI18n()
  const actionOptions: BlockActionOptions = [
    'cut',
    {
      type: 'item',
      name: 'copy',
      label: t('code_block.copy_code'),
      icon: (
        <IconBackground className={actionIconBackgroundStyle()}>
          <Copy className={actionIconStyle()} />
        </IconBackground>
      ),
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
