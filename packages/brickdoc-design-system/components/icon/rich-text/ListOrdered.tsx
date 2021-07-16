import React from 'react'
import { Icon, IconProps } from '../Icon'
import { ReactComponent as SvgIcon } from './assets/list-ordered.svgr'

export const ListOrdered: React.FC<IconProps> = props => {
  return (
    <Icon {...props}>
      <SvgIcon />
    </Icon>
  )
}
