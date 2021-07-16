import React from 'react'
import { Icon, IconProps } from '../Icon'
import { ReactComponent as SvgIcon } from './assets/rte-h2.svgr'

export const RteH2: React.FC<IconProps> = props => {
  return (
    <Icon {...props}>
      <SvgIcon />
    </Icon>
  )
}
