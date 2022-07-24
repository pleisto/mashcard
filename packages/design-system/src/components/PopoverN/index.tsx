import React, { cloneElement } from 'react'
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
  FloatingFocusManager,
  Middleware,
  Strategy
} from '@floating-ui/react-dom-interactions'
import { PopoverWrapper, ChildWrapper, ContentWrapper } from './styles/index.style'

interface Props {
  render: (data: { close: () => void; labelId: string; descriptionId: string }) => React.ReactNode
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void
  placement?: Placement
  middleware?: Array<Middleware>
  strategy?: Strategy
  overlayInnerStyle: React.CSSProperties
  visible?: boolean
  defaultVisible?: boolean
  onVisibleChange?: (status: boolean) => void
  className?: string
  destroyTooltipOnHide?: boolean
  offset?: number
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
  offset: _offset
}: Props) => {
  const open = visible !== undefined ? visible : defaultVisible !== undefined ? defaultVisible : false

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: onVisibleChange,
    middleware: middleware ?? [offset(_offset ?? 5), flip(), shift()],
    placement,
    whileElementsMounted: autoUpdate,
    strategy: _strategy
  })

  const id = useId()
  const labelId = `${id}-label`
  const descriptionId = `${id}-description`

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context)
  ])

  const refProps = getReferenceProps({ ref: reference })

  return (
    <PopoverWrapper className={className}>
      {cloneElement(<ChildWrapper>{children}</ChildWrapper>, getReferenceProps({ ref: reference }))}
      {(open || destroyTooltipOnHide === false) && (
        <FloatingFocusManager context={context} modal={false} order={['reference', 'content']} returnFocus={false}>
          <ContentWrapper
            style={overlayInnerStyle}
            {...getFloatingProps({
              className: 'Popover',
              ref: floating,
              style: {
                display: open ? undefined : 'none',
                zIndex: 1,
                position: strategy,
                top: y ?? 0,
                left: x ?? 0
              },
              'aria-labelledby': labelId,
              'aria-describedby': descriptionId
            })}
          >
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
