import React, { useRef, useEffect, useState } from 'react'
import { useButton } from '@react-aria/button'
import { AriaButtonProps } from '@react-types/button'
import { LoadingIcon } from './LoadingIcon'
import { styled } from '../../themes'
import { buttonStyle } from './styles/index.style'

export type Size = 'large' | 'medium' | 'small'
export type BtnType = 'primary' | 'secondary' | 'danger' | 'text'

export interface ButtonProps extends Omit<AriaButtonProps, 'type'> {
  block?: boolean
  circle?: boolean
  className?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  /**
   * @deprecated use `type: danger` instead
   *
   * set `type: danger` to be compatible with
   * older versions of the design system
   */
  danger?: boolean
  isLoading?: boolean | { delay?: number }
  /**
   * @deprecated use `onPress` instead
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  /**
   * Use `htmlType` as an alias for `type` to be compatible
   * with older version design system.
   */
  htmlType?: AriaButtonProps['type']
  size?: Size
  style?: React.CSSProperties
  type?: BtnType
  /**
   * @deprecated use `onPressDown` instead
   */
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>
  /**
   * @deprecated use `onPressEnter` instead
   */
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>
  /**
   * @deprecated use `onPressUp` instead
   */
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>
  role?: React.AriaRole
}

type Loading = number | boolean

const ButtonRoot = styled('button', buttonStyle)

/** Button
 * @example
 * ```tsx
 * <Button type="primary" disabled loading onClick={....} block>test</Button>
 * <Button onPress={....} block>test</Button>
 * ```
 */
const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
  const {
    isDisabled = false,
    isLoading = false,
    circle = false,
    danger = false,
    type = 'secondary',
    size = 'medium',
    className = '',
    children,
    icon,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    block = false,
    htmlType = 'button' as ButtonProps['htmlType']
  } = props

  const priorityType: BtnType = danger ? 'danger' : type

  // AriaButtonProps require `type` property as htmlType
  const ariaProps = {
    ...props,
    htmlType: undefined,
    type: htmlType
  }

  const [innerLoading, setLoading] = useState<Loading>(!!isLoading)
  const delayTimeoutRef = useRef<number>()
  const buttonRef = (ref as React.RefObject<HTMLButtonElement>) || React.createRef<HTMLButtonElement>()
  const { buttonProps, isPressed } = useButton(ariaProps, buttonRef)

  /**
   * Update Loading
   */
  let loadingOrDelay: Loading
  if (typeof isLoading === 'object' && isLoading.delay) {
    loadingOrDelay = isLoading.delay || true
  } else {
    loadingOrDelay = !!isLoading
  }

  useEffect(() => {
    clearTimeout(delayTimeoutRef.current)
    if (typeof loadingOrDelay === 'number') {
      delayTimeoutRef.current = window.setTimeout(() => {
        setLoading(loadingOrDelay)
      }, loadingOrDelay)
    } else {
      setLoading(loadingOrDelay)
    }
  }, [loadingOrDelay])

  const iconNode = icon && !innerLoading ? icon : <LoadingIcon loading={!!innerLoading} />
  const childrenDom = typeof children === 'string' || typeof children === 'number' ? <span>{children}</span> : children

  return (
    <ButtonRoot
      {...buttonProps}
      hasIcon={!!icon || !!innerLoading}
      role={props.role || buttonProps.role}
      ref={buttonRef}
      disabled={isDisabled || innerLoading}
      disabledBtn={isDisabled}
      type={isPressed && !isDisabled ? `${priorityType}-press` : priorityType}
      circle={circle && size}
      loading={innerLoading}
      className={className}
      size={size}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      block={block}
    >
      {iconNode}
      {childrenDom}
    </ButtonRoot>
  )
}

const Button = React.forwardRef<unknown, ButtonProps>(InternalButton)
Button.displayName = 'Button'

export { Button }
