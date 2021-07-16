import React from 'react'
import { Icon, IconProps } from '../Icon'
import { ReactComponent as SvgIcon } from './assets/text-underline.svgr'

export const TextUnderline: React.FC<IconProps> = props => {
  return (
    <Icon {...props}>
      <SvgIcon />
    </Icon>
  )
}
