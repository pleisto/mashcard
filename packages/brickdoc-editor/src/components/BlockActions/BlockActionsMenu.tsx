import React from 'react'
import { Icon } from '@brickdoc/design-system'
import { ActionOptionGroup, ActionItemOptionGroup } from './BlockActions'
import { Toolbar, ToolbarOptionGroup } from '../Toolbar'
import { EditorContext } from '../../context/EditorContext'

export interface BlockActionsMenuProps {
  basicOptions?: ActionItemOptionGroup | null
  extraOptions?: ActionOptionGroup | null
}

export const BlockActionsMenu: React.FC<BlockActionsMenuProps> = ({ extraOptions, basicOptions }) => {
  const { t } = React.useContext(EditorContext)
  const options = React.useMemo<ToolbarOptionGroup>(() => {
    const hasExtraOptions = (extraOptions?.length ?? 0) > 0
    const hasBasicOptions = (basicOptions?.length ?? 0) > 0
    const value = hasExtraOptions ? extraOptions : basicOptions

    if (hasExtraOptions && hasBasicOptions) {
      value?.push({
        type: 'dropdown',
        name: t('block_actions.more'),
        icon: <Icon.More />,
        menuItems: basicOptions!
      })
    }

    return value ?? []
  }, [basicOptions, extraOptions, t])

  return <Toolbar options={options} />
}
