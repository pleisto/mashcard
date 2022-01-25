import { ForwardRefRenderFunction, forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react'
import RcSelect, { Option, OptGroup, SelectProps as RcSelectProps, BaseSelectRef } from 'rc-select'
import { defaultPopupContainer } from '../Tooltip'
import type { BaseOptionType, DefaultOptionType } from 'rc-select/lib/Select'
// import { selectStyle } from './styles/index.style'

export interface SelectProps<ValueType = any, OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType>
  extends Omit<RcSelectProps<ValueType, OptionType>, 'prefix'> {
  bordered?: boolean
}

const Select: ForwardRefRenderFunction<BaseSelectRef, SelectProps> = (props, ref) => {
  const { virtual = true, bordered = true, getPopupContainer, ...otherProps } = props
  return (
    <RcSelect
      prefixCls="brk-select"
      bordered={bordered}
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