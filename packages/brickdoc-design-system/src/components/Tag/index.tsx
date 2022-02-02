import { forwardRef, ForwardRefRenderFunction, useCallback } from 'react'
import { Close as CloseOutlined } from '@brickdoc/design-icons'

import type { TagProps } from './constants'
import { TagRoot } from './styles/index.style'

export * from './TagGroup'

const Tag: ForwardRefRenderFunction<HTMLDivElement, TagProps> = (props, ref) => {
  const {
    text,
    value,
    closable = false,
    size = 'md',
    color = 'primary',
    onClick,
    onClose,
    prefixCls,
    ...otherProps
  } = props

  const handleClick = useCallback(
    e => {
      onClick?.(e, value ?? text)
    },
    [onClick, value, text]
  )

  const handleClose = useCallback(
    e => {
      onClose?.(e, value ?? text)
    },
    [onClose, value, text]
  )

  const icon = closable ? <CloseOutlined onClick={handleClose} /> : <></>
  const clickable = closable || onClose !== undefined

  return (
    <>
      <TagRoot
        ref={ref}
        clickable={clickable}
        color={color ?? 'primary'}
        size={size}
        onClick={handleClick}
        {...otherProps}
      >
        {text ?? ''}
        {icon}
      </TagRoot>
    </>
  )
}

const _Tag = forwardRef(Tag)

_Tag.displayName = `Tag`

export { _Tag as Tag }
