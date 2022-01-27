/* eslint-disable jsx-a11y/heading-has-content */
import * as React from 'react'
import classNames from 'classnames'

export interface SkeletonTitleProps {
  prefixCls?: string
  className?: string
  style?: React.CSSProperties
  width?: number | string
}

/**
 * @deprecated Legacy Component.
 * @param props
 * @returns
 */
const Title = ({ prefixCls, className, width, style }: SkeletonTitleProps) => (
  <h3 className={classNames(prefixCls, className)} style={{ width, ...style }} />
)

export default Title
