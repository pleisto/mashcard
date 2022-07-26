import React, { cloneElement, useEffect, useState } from 'react'
import {
  Placement,
  offset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useRole,
  useDismiss,
  useId,
  useClick,
  useHover,
  FloatingFocusManager,
  Middleware,
  Strategy,
  safePolygon
} from '@floating-ui/react-dom-interactions'
import { PopoverWrapper, ChildWrapper, ContentWrapper } from './styles/index.style'

type tirggerType = 'click' | 'hover'
interface PopoverNProps {
  render: (data: { close: () => void; labelId: string; descriptionId: string }) => React.ReactNode
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void
  placement?: Placement
  middleware?: Array<Middleware>
  strategy?: Strategy
  overlayInnerStyle?: React.CSSProperties
  visible?: boolean
  defaultVisible?: boolean
  onVisibleChange?: (status: boolean) => void
  className?: string
  destroyTooltipOnHide?: boolean
  offset?: number
  trigger?: tirggerType | Array<tirggerType>
}

const PopoverN = ({
  children,
  render,
  placement,
  strategy: _strategy,
  middleware,
  overlayInnerStyle,
  visible,
  defaultVisible,
  onVisibleChange,
  className,
  destroyTooltipOnHide,
  offset: _offset,
  trigger
}: PopoverNProps) => {
  const open = visible !== undefined ? visible : defaultVisible !== undefined ? defaultVisible : false
  const [isOpen, setInnerOpen] = useState(open)
  useEffect(() => {
    setInnerOpen(open)
  }, [open])

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: status => {
      onVisibleChange?.(status)
      setInnerOpen(status)
    },
    middleware: middleware ?? [offset(_offset ?? 5), flip(), shift()],
    placement,
    whileElementsMounted: autoUpdate,
    strategy: _strategy
  })

  const id = useId()
  const labelId = `${id}-label`
  const descriptionId = `${id}-description`

  const triggerList = trigger ? (Array.isArray(trigger) ? trigger : [trigger]) : ['click']

  const isClickEnable = triggerList.indexOf('click') >= 0
  const isHoverEnable = triggerList.indexOf('hover') >= 0

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context, { enabled: isClickEnable }),
    useHover(context, { enabled: isHoverEnable, handleClose: safePolygon() }),
    useRole(context),
    useDismiss(context)
  ])

  return (
    <PopoverWrapper className={className}>
      {cloneElement(<ChildWrapper>{children}</ChildWrapper>, getReferenceProps({ ref: reference }))}
      {(isOpen || destroyTooltipOnHide === false) && (
        <FloatingFocusManager context={context} modal={false} order={['reference', 'content']} returnFocus={false}>
          <ContentWrapper
            {...getFloatingProps({
              className: 'Popover',
              ref: floating,
              style: {
                display: isOpen ? undefined : 'none',
                zIndex: 1,
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                ...overlayInnerStyle
              },
              'aria-labelledby': labelId,
              'aria-describedby': descriptionId
            })}>
            {render({
              labelId,
              descriptionId,
              close: () => {
                onVisibleChange?.(false)
              }
            })}
          </ContentWrapper>
        </FloatingFocusManager>
      )}
    </PopoverWrapper>
  )
}

PopoverN.displayName = 'PopoverN'

PopoverN.defaultProps = {
  placement: 'top-start',
  strategy: 'absolute',
  destroyTooltipOnHide: true
}

export { PopoverN }
