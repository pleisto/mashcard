import { ForwardRefRenderFunction, forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react'
import RcSelect, { Option, OptGroup, SelectProps as RcSelectProps, BaseSelectRef } from 'rc-select'
import { cx } from '../../utilities'
import { defaultPopupContainer } from '../Tooltip'
import type { BaseOptionType, DefaultOptionType } from 'rc-select/lib/Select'
import { selectStyle } from './styles/index.style'

export interface SelectProps<ValueType = any, OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType>
  extends Omit<RcSelectProps<ValueType, OptionType>, 'prefix' | 'bordered'> {
  borderless?: boolean
}

const Select: ForwardRefRenderFunction<BaseSelectRef, SelectProps> = (props, ref) => {
  const { virtual = false, borderless = false, getPopupContainer, className, ...otherProps } = props
  const prefixCls = props.prefixCls ?? selectStyle()
  return (
    <RcSelect
      prefixCls={prefixCls}
      className={cx(borderless && `${prefixCls}-borderless`, className)}
      ref={ref}
      virtual={virtual}
      getPopupContainer={getPopupContainer ?? defaultPopupContainer}
      {...(otherProps as SelectProps<any, BaseOptionType | DefaultOptionType>)}
    />
  )
}

const _Select = forwardRef(Select) as unknown as ForwardRefExoticComponent<
  SelectProps & RefAttributes<BaseSelectRef>
> & {
  Option: typeof Option
  OptGroup: typeof OptGroup
}
_Select.displayName = 'Select'
_Select.Option = Option
_Select.OptGroup = OptGroup

export { _Select as Select }
