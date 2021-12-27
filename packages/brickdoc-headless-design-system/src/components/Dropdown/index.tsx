import { cloneElement, ReactElement, forwardRef, ForwardRefRenderFunction, Children, ReactNode } from 'react'
import RcDropdown from 'rc-dropdown'
import { RenderFunction } from '../../utilities'
import { defaultPopupContainer } from '../Tooltip'
import classNames from 'classnames'
import { dropdownStyle } from './styles/index.style'
/**
 * Use `start` and `end` instead of `top` and `bottom` to ensure
 * more consistent semantics with Internationalization.
 */
const placementMaps = {
  bottomStart: 'bottomLeft',
  bottomCenter: 'bottomCenter',
  bottomEnd: 'bottomRight',
  topStart: 'topLeft',
  topCenter: 'topCenter',
  topEnd: 'topRight'
}

interface Align {
  points?: [string, string]
  offset?: [number, number]
  targetOffset?: [number, number]
  overflow?: {
    adjustX?: boolean
    adjustY?: boolean
  }
  useCssRight?: boolean
  useCssBottom?: boolean
  useCssTransform?: boolean
}

type trigger = 'click' | 'hover' | 'contextMenu' | 'focus'

export interface DropdownProps {
  // arrow?: boolean
  trigger?: trigger | trigger[]
  overlay: ReactElement | RenderFunction
  onVisibleChange?: (visible: boolean) => void
  visible?: boolean
  disabled?: boolean
  destoryPopupOnHide?: boolean
  align?: Align
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  prefixCls?: string
  className?: string
  placement?: keyof typeof placementMaps
  overlayClassName?: string
  overlayStyle?: React.CSSProperties
  forceRender?: boolean
  mouseEnterDelay?: number
  mouseLeaveDelay?: number
  openClassName?: string
  children?: ReactNode
}

const Dropdown: ForwardRefRenderFunction<unknown, DropdownProps> = (props, ref) => {
  const { prefixCls: customPrefixCls, children, trigger, disabled, getPopupContainer, overlayClassName } = props
  const prefixCls = customPrefixCls || dropdownStyle()

  const overlayRender = (): ReactElement => {
    /**
     * rc-dropdown already can process the function of overlay, but we have check logic here.
     * So we need render the element to check and pass back to rc-dropdown.
     */
    const { overlay } = props

    let overlayNode = typeof overlay === 'function' ? (overlay as RenderFunction)() : overlay
    overlayNode = Children.only(typeof overlayNode === 'string' ? <span>{overlayNode}</span> : overlayNode)
    return overlayNode as ReactElement
  }

  const getPlacement = (): string => {
    const { placement = 'bottomCenter' } = props
    return placementMaps[placement]
  }

  const child = Children.only(children) as ReactElement

  const triggerActions = disabled ? [] : trigger
  const alignPoint = triggerActions?.includes('contextMenu') ? true : undefined

  return (
    <RcDropdown
      alignPoint={alignPoint}
      {...props}
      overlayClassName={overlayClassName}
      prefixCls={prefixCls}
      getPopupContainer={getPopupContainer || defaultPopupContainer}
      trigger={triggerActions}
      overlay={() => overlayRender()}
      placement={getPlacement()}
    >
      {cloneElement(child, {
        className: classNames(`${prefixCls}-trigger`, child?.props?.className),
        'aria-haspopup': 'menu',
        disabled
      })}
    </RcDropdown>
  )
}

const _Dropdown = forwardRef(Dropdown)
_Dropdown.displayName = 'Dropdown'
_Dropdown.defaultProps = {
  mouseEnterDelay: 0.15,
  mouseLeaveDelay: 0.1
}
export { _Dropdown as Dropdown }
