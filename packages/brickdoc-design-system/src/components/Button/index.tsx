import { useEffect, useState, ButtonHTMLAttributes, Ref, RefObject, createRef, forwardRef } from 'react'
import ButtonUnstyled, { ButtonUnstyledActions } from '@mui/base/ButtonUnstyled'
import { LoadingIcon } from './LoadingIcon'
import { styled, config } from '../../themes'
import { CSS } from '@stitches/react'
import { buttonStyle } from './styles/index.style'

export type Size = 'lg' | 'md' | 'sm'
export type BtnType = 'primary' | 'secondary' | 'danger' | 'text' | 'unstyled'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'css'> {
  action?: Ref<ButtonUnstyledActions>
  block?: boolean
  circle?: boolean
  icon?: React.ReactNode
  css?: CSS<typeof config>
  iconPosition?: 'start' | 'end'
  /**
   * @deprecated use `type: danger` instead
   *
   * set `type: danger` to be compatible with
   * older versions of the design system
   */
  danger?: boolean
  /**
   * For a boolean value:
   * - `true`: enable the loading state immediately.
   * - `false`: disable the loading state.
   * For an object value:
   * - `delay <= 0` or omitted: enable the loading state immediately (same as `true`).
   * - `delay > 0`: enabled the loading state after `delay` milliseconds.
   */
  loading?: boolean | { delay?: number }

  /**
   * Use `htmlType` as an alias for `type` to be compatible
   * with older version design system.
   */
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  size?: Size
  type?: BtnType
}

type Loading = number | boolean

const ButtonRoot = styled(ButtonUnstyled, buttonStyle)

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
    css,
    icon,
    onClick,
    block = false,
    htmlType = 'button',
    role = 'button',
    iconPosition = 'start',
    ...otherProps
  } = props

  const priorityType: BtnType = danger ? 'danger' : type

  /**
   * Update Loading
   */
  let loadingOrDelay: Loading
  if (typeof loading === 'object' && loading.delay && loading.delay > 0) {
    loadingOrDelay = loading.delay
  } else {
    // For `loading.delay` other than a positive number, it will be treated as `true`.
    loadingOrDelay = !!loading
  }

  const [innerLoading, setLoading] = useState<Loading>(
    // If a delayed loading is expected, the initial state will always be `false`.
    typeof loadingOrDelay === 'boolean' ? loadingOrDelay : false
  )
  const buttonRef = (ref as RefObject<HTMLButtonElement>) || createRef<HTMLButtonElement>()
  useEffect(() => {
    if (typeof loadingOrDelay === 'number') {
      const timeout = setTimeout(() => {
        setLoading(loadingOrDelay)
      }, loadingOrDelay)
      return () => {
        clearTimeout(timeout)
      }
    }
    setLoading(loadingOrDelay)
  }, [loadingOrDelay])

  const iconNode = icon && !innerLoading ? icon : <LoadingIcon loading={!!innerLoading} />
  const childrenDom = typeof children === 'string' || typeof children === 'number' ? <span>{children}</span> : children

  return (
    <ButtonRoot
      {...otherProps}
      css={css as any}
      role={role}
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

const _Button = forwardRef(Button)
_Button.displayName = 'Button'

export { _Button as Button }
