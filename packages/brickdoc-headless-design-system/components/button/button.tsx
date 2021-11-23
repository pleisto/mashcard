import { FC, useRef, useEffect, useState } from 'react'
import { useButton } from '@react-aria/button'
import LoadingIcon from './LoadingIcon'
import { styled } from '../theme'
import { variants, baseStyles } from './style'

export type HtmlType = 'button' | 'reset' | 'submit'
export type Size = 'default' | 'sm' | 'lg'
export type Priority = 'primary' | 'secondary' | 'ghost' | 'danger'

export interface ButtonProps {
  block?: boolean
  circle?: boolean
  disabled?: boolean
  className?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  loading?: boolean | { delay?: number }
  htmlType?: HtmlType
  size?: Size
  style?: React.CSSProperties
  priority?: Priority
  onPress?: React.MouseEventHandler<HTMLButtonElement>
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>
}

type Loading = number | boolean

const ButtonRoot = styled('button', {
  ...baseStyles,
  variants
})

/** Button
 * @example
 * ```tsx
 * <Button priority="secondary" disabled loading onClick={....} block>test</Button>
 * <Button onPress={....} block>test</Button>
 * ```
 * @see url
 */
const Button: FC<ButtonProps> = props => {
  const {
    disabled = false,
    loading = false,
    circle = false,
    priority = 'primary',
    size = 'md',
    className = '',
    children,
    icon,
    block = false,
    htmlType = 'button' as ButtonProps['htmlType'],
    ...rest
  } = props
  const [innerLoading, setLoading] = useState<Loading>(!!loading)
  const ref = useRef<HTMLButtonElement>(null)
  const delayTimeoutRef = useRef<number>()
  const { buttonProps, isPressed } = useButton(props as any, ref)

  let loadingOrDelay: Loading
  if (typeof loading === 'object' && loading.delay) {
    loadingOrDelay = loading.delay || true
  } else {
    loadingOrDelay = !!loading
  }
  // =============== Update Loading ===============
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

  // const iconType = innerLoading ? 'loading' : icon

  const iconNode = icon && !innerLoading ? icon : <LoadingIcon existIcon={!!icon} loading={!!innerLoading} />

  const hasChildren = loading ? <></> : children

  return (
    <ButtonRoot
      {...buttonProps}
      {...rest}
      role={htmlType}
      ref={ref}
      disabled={disabled}
      disabledBtn={disabled}
      priority={isPressed && !disabled ? `${priority}-press` : priority}
      circle={circle && size}
      className={className}
      size={size}
      block={block}
    >
      {iconNode}
      {hasChildren}
    </ButtonRoot>
  )
}

export default Button
