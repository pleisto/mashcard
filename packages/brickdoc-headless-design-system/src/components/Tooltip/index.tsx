import { ForwardRefRenderFunction, forwardRef, ReactNode, isValidElement, cloneElement } from 'react'
import RcTooltip from './rcTooltip'
import { BuildInPlacements } from 'rc-trigger'
import useMergedState from 'rc-util/lib/hooks/useMergedState'
import { AbstractTriggerProps, getPlacements } from './trigger'
import { tooltipStyle } from './styles/index.style'
import { useId, RenderFunction } from '../../utilities'

interface TooltipPropsWithOverlay extends AbstractTriggerProps {
  title?: React.ReactNode | RenderFunction
  overlay: React.ReactNode | RenderFunction
}

interface TooltipPropsWithTitle extends AbstractTriggerProps {
  title: React.ReactNode | RenderFunction
  overlay?: React.ReactNode | RenderFunction
}

export declare type TooltipProps = TooltipPropsWithOverlay | TooltipPropsWithTitle

export const defaultPopupContainer = (): HTMLElement => document.body

const Tooltip: ForwardRefRenderFunction<unknown, TooltipProps> = (props, ref) => {
  const overlayId = useId()
  const prefixCls = props.prefixCls ?? tooltipStyle()
  const [visible, setVisible] = useMergedState(false, {
    value: props.visible,
    defaultValue: props.defaultVisible
  })

  const isNoTitle = (): boolean => {
    const { title, overlay } = props
    return !title && !overlay
  }

  const onVisibleChange = (vis: boolean): void => {
    setVisible(isNoTitle() ? false : vis)
    if (!isNoTitle()) props.onVisibleChange?.(vis)
  }

  const getTooltipPlacements = (): BuildInPlacements => {
    const { builtinPlacements, arrowPointAtCenter, autoAdjustOverflow } = props
    return builtinPlacements ?? getPlacements({ arrowPointAtCenter, autoAdjustOverflow })
  }

  const getOverlay = (): ReactNode | RenderFunction => {
    const { title, overlay } = props
    return <span id={overlayId}>{overlay ?? title ?? ''}</span>
  }

  const onPopupAlign = (domNode: HTMLElement, align: any): void => {
    const placements: any = getTooltipPlacements()
    // Current placement of popup
    const placement = Object.keys(placements).filter(
      key => placements[key].points[0] === align.points[0] && placements[key].points[1] === align.points[1]
    )[0]

    // return void if placement is undefined
    if (!placement) return

    // Set animation position via placement
    const rect = domNode.getBoundingClientRect()
    const transformOrigin = {
      top: '50%',
      left: '50%'
    }

    if (placement.includes('top') || placement.includes('Bottom')) {
      transformOrigin.top = `${rect.height - align.offset[1]}px`
    } else if (placement.includes('Top') || placement.includes('bottom')) {
      transformOrigin.top = `${-align.offset[1]}px`
    }

    if (placement.includes('start') || placement.includes('End')) {
      transformOrigin.left = `${rect.width - align.offset[0]}px`
    } else if (placement.includes('end') || placement.includes('Start')) {
      transformOrigin.left = `${-align.offset[0]}px`
    }

    domNode.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`
  }

  const { getPopupContainer, role = 'tooltip', ...otherProps } = props
  const { getTooltipContainer, children } = props

  let tempVisible = visible
  // Hide tooltip when there is no title
  if (!('visible' in props) && isNoTitle()) tempVisible = false

  const child = isValidElement(children) ? children : <span>{children}</span>

  return (
    <RcTooltip
      {...otherProps}
      prefixCls={prefixCls}
      getTooltipContainer={getPopupContainer ?? getTooltipContainer ?? defaultPopupContainer}
      ref={ref}
      builtinPlacements={getTooltipPlacements()}
      overlay={getOverlay()}
      visible={tempVisible}
      onVisibleChange={onVisibleChange}
      onPopupAlign={onPopupAlign}
      arrowContent={<span className={`${prefixCls}-arrow-content`} aria-hidden />}
    >
      {cloneElement(child, {
        /**
         *  A tooltip is not considered to be a popup in this context, as is not interactive.
         * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup
         */
        'aria-haspopup': role === 'tooltip' ? false : role,
        'aria-controls': tempVisible ? overlayId : undefined,
        ...(role === 'tooltip' ? { 'aria-describedby': overlayId } : {})
      })}
    </RcTooltip>
  )
}

const _Tooltip = forwardRef(Tooltip)
_Tooltip.displayName = 'Tooltip'
_Tooltip.defaultProps = {
  trigger: ['hover', 'focus'],
  placement: 'top',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  arrowPointAtCenter: false,
  autoAdjustOverflow: true,
  role: 'tooltip'
}

export { _Tooltip as Tooltip }
