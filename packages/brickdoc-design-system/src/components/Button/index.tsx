import React, { useRef, useEffect, useState } from 'react'
import { Button as HeadlessButton, ButtonProps as HeadlessButtonProps } from 'reakit/Button'
import { LoadingIcon } from './LoadingIcon'
import { styled } from '../../themes'
import { buttonStyle } from './styles/index.style'

export type Size = 'lg' | 'md' | 'sm'
export type BtnType = 'primary' | 'secondary' | 'danger' | 'text'

export interface ButtonProps extends Omit<HeadlessButtonProps, 'type' | 'css'> {
  block?: boolean
  circle?: boolean
  icon?: React.ReactNode
  iconPosition?: 'start' | 'end'
  /**
   * @deprecated use `type: danger` instead
   *
   * set `type: danger` to be compatible with
   * older versions of the design system
   */
  danger?: boolean
  loading?: boolean | { delay?: number }

  /**
   * Use `htmlType` as an alias for `type` to be compatible
   * with older version design system.
   */
  htmlType?: HeadlessButtonProps['type']
  size?: Size
  type?: BtnType
}

type Loading = number | boolean

const ButtonRoot = styled(HeadlessButton, buttonStyle)

/** Button
 * @example
 * ```tsx
 * <Button type="primary" disabled loading onClick={....} block>test</Button>
 * <Button onClick={....} block>test</Button>
 * ```
 */
const Button: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
  const {
    disabled = false,
    loading = false,
    circle = false,
    danger = false,
    type = 'secondary',
    size = 'md',
    children,
    icon,
    onClick,
    block = false,
    htmlType = 'button',
    role = 'button',
    iconPosition = 'start',
    ...otherProps
  } = props

  const priorityType: BtnType = danger ? 'danger' : type

  const [innerLoading, setLoading] = useState<Loading>(!!loading)
  const delayTimeoutRef = useRef<number>()
  const buttonRef = (ref as React.RefObject<HTMLButtonElement>) || React.createRef<HTMLButtonElement>()

  /**
   * Update Loading
   */
  let loadingOrDelay: Loading
  if (typeof loading === 'object' && loading.delay) {
    loadingOrDelay = loading.delay || true
  } else {
    loadingOrDelay = !!loading
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
      {...otherProps}
      role={role}
      unstable_clickOnEnter
      unstable_clickOnSpace
      hasIcon={!!icon || !!innerLoading}
      ref={buttonRef}
      disabled={disabled || !!innerLoading}
      disabledBtn={disabled}
      btnType={priorityType}
      type={htmlType}
      circle={circle ? size : undefined}
      loading={!!innerLoading}
      size={size}
      block={block}
      onClick={onClick}
    >
      {iconPosition === 'start' && iconNode}
      {childrenDom}
      {iconPosition === 'end' && iconNode}
    </ButtonRoot>
  )
}

const _Button = React.forwardRef(Button)
_Button.displayName = 'Button'

export { _Button as Button }
