import { forwardRef, ForwardRefRenderFunction } from 'react'
import { Tooltip } from '../Tooltip'
import { AbstractTriggerProps, TriggerPlacement } from '../Tooltip/trigger'
import { DismissButton } from '../DismissButton'
import { getRenderPropValue } from '../../utilities'
import { popoverStyle } from './styles/index.style'

export interface PopoverProps extends AbstractTriggerProps {
  title?: React.ReactNode
  content?: React.ReactNode
}

const Popover: ForwardRefRenderFunction<unknown, PopoverProps> = (props, ref) => {
  const { title, content, role = 'dialog', ...otherProps } = props
  const prefixCls = props.prefixCls || popoverStyle()

  const overlay = (
    <>
      {title && <div className={`${prefixCls}-title`}>{getRenderPropValue(title)}</div>}
      <div>{getRenderPropValue(content)}</div>
      <DismissButton />
    </>
  )

  return <Tooltip {...otherProps} ref={ref} overlay={overlay} prefixCls={prefixCls} role={role} />
}

const _Popover = forwardRef(Popover)
_Popover.displayName = 'Popover'
_Popover.defaultProps = {
  placement: 'top' as TriggerPlacement,
  trigger: 'click',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1
}
export { _Popover as Popover }
