import React from 'react'
import { Icon, IconProps } from '../Icon'
import { ReactComponent as SvgIcon } from './assets/italics.svgr'

export const Italics: React.FC<IconProps> = props => {
  return (
    <Icon {...props}>
      <SvgIcon />
    </Icon>
  )
}
