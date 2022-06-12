import { useMemo } from 'react'
import { styled, theme } from '@brickdoc/design-system'
import { ToolbarOptionBase, ToolbarOptionGroup } from '../../../ui'
import { useNodeGroup } from './useNodeGroup'
import { useTextStyleGroup } from './useTextStyleGroup'
import { useFontColorGroup } from './useFontColorGroup'
import { useLinkGroup } from './useLinkGroup'
import { useFormulaItem } from './useFormulaItem'
import { useExtraItemsGroup } from './useExtraItemsGroup'

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

export function useBubbleMenuItems(): [ToolbarOptionGroup] {
  const [nodeGroup] = useNodeGroup()
  const [textStyleGroup] = useTextStyleGroup()
  const [fontColorGroup] = useFontColorGroup()
  const [linkGroup] = useLinkGroup()
  const [formulaItem] = useFormulaItem()
  const [extraItemsGroup] = useExtraItemsGroup()

  const options = useMemo<ToolbarOptionGroup>(() => {
    const options: ToolbarOptionGroup = []
    if (nodeGroup) options.push(nodeGroup)
    if (textStyleGroup) options.push(textStyleGroup)
    if (fontColorGroup) options.push(fontColorGroup)
    if (linkGroup) options.push(linkGroup)
    if (formulaItem) options.push(formulaItem)
    if (extraItemsGroup) options.push(extraItemsGroup)

    return options
  }, [extraItemsGroup, fontColorGroup, formulaItem, linkGroup, nodeGroup, textStyleGroup])

  return [options]
}
