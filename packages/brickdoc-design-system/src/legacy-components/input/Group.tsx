import * as React from 'react'
import { cx as classNames } from '../../utilities'
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider'

export interface GroupProps {
  className?: string
  size?: 'large' | 'small' | 'default'
  children?: React.ReactNode
  style?: React.CSSProperties
  onMouseEnter?: React.MouseEventHandler<HTMLSpanElement>
  onMouseLeave?: React.MouseEventHandler<HTMLSpanElement>
  onFocus?: React.FocusEventHandler<HTMLSpanElement>
  onBlur?: React.FocusEventHandler<HTMLSpanElement>
  prefixCls?: string
  compact?: boolean
}

/**
 * @deprecated Legacy Component.
 * @param props
 * @returns
 */
const Group: React.FC<GroupProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls, direction }: ConfigConsumerProps) => {
      const { prefixCls: customizePrefixCls, className = '' } = props
      const prefixCls = getPrefixCls('input-group', customizePrefixCls)
      const cls = classNames(
        prefixCls,
        {
          [`${prefixCls}-lg`]: props.size === 'large',
          [`${prefixCls}-sm`]: props.size === 'small',
          [`${prefixCls}-compact`]: props.compact,
          [`${prefixCls}-rtl`]: direction === 'rtl'
        },
        className
      )
      return (
        <span
          className={cls}
          style={props.style}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        >
          {props.children}
        </span>
      )
    }}
  </ConfigConsumer>
)

export default Group
