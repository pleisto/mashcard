import { useMemo } from 'react'
import { styled, theme } from '@mashcard/design-system'
import { ToolbarOptionBase, ToolbarOptionGroup } from '../../../ui'
import { useNodeGroup } from './useNodeGroup'
import { useTextStyleGroup } from './useTextStyleGroup'
import { useLinkGroup } from './useLinkGroup'
import { useFormulaItem } from './useFormulaItem'
import { useExtraItemsGroup } from './useExtraItemsGroup'
import { useMoreItemsGroup } from './useMoreItemsGroup'

export const NodeIcon = styled('span', {
  include: ['flexCenter'],
  background: 'linear-gradient(0deg, rgba(248, 251, 255, 0.36), rgba(248, 251, 255, 0.36)), rgba(255, 255, 255, 0.74)',
  boxShadow:
    '1px 1px 0px rgba(255, 255, 255, 0.8), 0px 2px 4px rgba(167, 167, 167, 0.3), inset 1px 1px 0px rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(16px)',
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
  
  const [linkGroup] = useLinkGroup()
  const [formulaItem] = useFormulaItem()
  const [extraItemsGroup] = useExtraItemsGroup()
  const [moreItemsGroup] = useMoreItemsGroup()

  const options = useMemo<ToolbarOptionGroup>(() => {
    const options: ToolbarOptionGroup = []
    if (nodeGroup) options.push(nodeGroup)

    if (textStyleGroup) options.push(textStyleGroup)

    if (linkGroup) options.push(linkGroup)
    if (formulaItem) options.push(formulaItem)
    if (extraItemsGroup) options.push(extraItemsGroup)
    if (moreItemsGroup) options.push(moreItemsGroup)

    return options
  }, [extraItemsGroup, formulaItem, linkGroup, nodeGroup, textStyleGroup])

  return [options]
}
