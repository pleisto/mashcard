import React, { CSSProperties } from 'react'
import cx from 'classnames'

export interface IconProps {
  className?: string
  style?: CSSProperties
}

export const Icon: React.FC<IconProps> = ({ className, style, children }) => {
  return (
    <span className={cx('brk-icon', className)} style={style}>
      {children}
    </span>
  )
}
