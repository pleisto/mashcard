import { forwardRef, ForwardRefRenderFunction, useMemo } from 'react'
import { Tooltip } from '../Tooltip'
import { AbstractTriggerProps, TriggerPlacement } from '../Tooltip/trigger'
import { DismissButton } from '../DismissButton'
import { getRenderPropValue } from '../../utilities'
import { popoverCompactStyle, popoverStyle } from './styles/index.style'

export interface PopoverProps extends AbstractTriggerProps {
  title?: React.ReactNode
  content?: React.ReactNode
  compact?: boolean
}

/**
 *
 * @deprecated This component is planned to be abandoned and PopoverN is now recommended.
 *  You can continue to use this component now, but popoverN will replace it later
 */
const Popover: ForwardRefRenderFunction<unknown, PopoverProps> = (props, ref) => {
  const { title, content, role = 'dialog', compact, ...otherProps } = props

  const prefixCls = useMemo(
    () => props.prefixCls ?? (compact ? popoverCompactStyle() : popoverStyle()),
    [compact, props.prefixCls]
  )

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
