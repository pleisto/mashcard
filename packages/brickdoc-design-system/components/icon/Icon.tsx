import React, { CSSProperties } from 'react'
import cx from 'classnames'

export interface IconProps {
  // copy from Icon Park type definitions
  // TODO: generate correct type definitions automatically
  name:
    | 'rte-h3'
    | 'list-unordered'
    | 'list-ordered'
    | 'text-underline'
    | 'strikethrough'
    | 'bold-words'
    | 'rte-h2'
    | 'rte-h1'
    | 'italics'
    | 'font-size'
    | 'line-down'
  className?: string
  style?: CSSProperties
}

export const Icon: React.FC<IconProps> = ({ name, className, style }) => {
  return (
    <span className={cx('brk-icon', className)} style={style}>
      <iconpark-icon name={name} />
    </span>
  )
}
