import React from 'react'
import { styled, theme } from '@brickdoc/design-system'
import { ToolbarOptionBase, ToolbarOptionGroup } from '../../Toolbar'
import { Editor } from '@tiptap/react'
import { useNodeSection } from './useNodeSection'
import { useTextStyleSection } from './useTextStyleSection'
import { useFontColorSection } from './useFontColorSection'
import { useLinkSection } from './useLinkSection'
import { useFormulaItem } from './useFormulaItem'

export const NodeIcon = styled('span', {
  include: ['flexCenter'],
  background: theme.colors.white,
  border: `1px solid ${theme.colors.typeDisabled}`,
  borderRadius: '2px',
  color: theme.colors.typeSecondary,
  display: 'flex',
  height: '20px',
  width: '20px'
})

export interface BubbleItemMeta {
  name: string
  icon: React.ReactElement
  tooltip?: ToolbarOptionBase['tooltip']
  onAction: () => void
}

export const isBubbleMenuVisible = (editor: Editor | null | undefined): editor is Editor => {
  if (!editor) return false
  const { from, to } = editor.state.selection
  if (from === to) return false
  return true
}

export function useBubbleMenuItems(): [ToolbarOptionGroup] {
  const [nodeSection] = useNodeSection()
  const [textStyleSection] = useTextStyleSection()
  const [fontColorSection] = useFontColorSection()
  const [linkSection] = useLinkSection()
  const [formulaItem] = useFormulaItem()

  const options = React.useMemo<ToolbarOptionGroup>(() => {
    const options: ToolbarOptionGroup = []
    if (nodeSection) options.push(nodeSection)
    if (textStyleSection) options.push(textStyleSection)
    if (fontColorSection) options.push(fontColorSection)
    if (linkSection) options.push(linkSection)
    if (formulaItem) options.push(formulaItem)

    return options
  }, [fontColorSection, formulaItem, linkSection, nodeSection, textStyleSection])

  return [options]
}
