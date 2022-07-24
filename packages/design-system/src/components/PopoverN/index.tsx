import React, { cloneElement, useState } from 'react'
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

interface Props {
  render: (data: { close: () => void; labelId: string; descriptionId: string }) => React.ReactNode
  children: JSX.Element
  onOpenChange?: (open: boolean) => void
  placement?: Placement
  middleware?: Array<Middleware>
  strategy?: Strategy
}

const PopoverN = ({ children, render, placement, strategy: _strategy, middleware }: Props) => {
  const [open, setOpen] = useState(false)

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: middleware ?? [offset(5), flip(), shift()],
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

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref: reference, ...children.props }))}
      {open && (
        <FloatingFocusManager context={context} modal={false} order={['reference', 'content']} returnFocus={false}>
          <div
            {...getFloatingProps({
              className: 'Popover',
              ref: floating,
              style: {
                position: strategy,
                top: y ?? 0,
                left: x ?? 0
              },
              'aria-labelledby': labelId,
              'aria-describedby': descriptionId
            })}>
            {render({
              labelId,
              descriptionId,
              close: () => {
                setOpen(false)
              }
            })}
          </div>
        </FloatingFocusManager>
      )}
    </>
  )
}

PopoverN.displayName = 'PopoverN'

PopoverN.defaultProps = {
  placement: 'top-start',
  strategy: 'absolute'
}

export { PopoverN }
