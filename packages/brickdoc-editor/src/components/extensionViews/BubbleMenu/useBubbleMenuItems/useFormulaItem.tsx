import { useMemo } from 'react'
import { Icon } from '@brickdoc/design-system'
import { ToolbarItemOption, ToolbarOption, ToolbarGroupOption } from '../../../ui'
import { isBubbleMenuVisible } from '../BubbleMenu'
import { useEditorContext, useEditorI18n } from '../../../../hooks'

export function useFormulaItem(): [ToolbarOption | ToolbarGroupOption | null] {
  const { editor } = useEditorContext()
  const [t] = useEditorI18n()

  const option = useMemo<ToolbarOption | ToolbarGroupOption | null>(() => {
    if (!isBubbleMenuVisible(editor)) return null

    const formulaItem: ToolbarItemOption = {
      type: 'item',
      name: 'formula',
      icon: <Icon.Formula />,
      tooltip: t('bubble_menu.formula.title') as string,
      onAction: () => {
        editor.commands.toggleFormula()
      }
    }

    return formulaItem
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.state.selection])

  return [option]
}
