import { forwardRef, ForwardRefRenderFunction, useCallback } from 'react'
import { usePress } from '@react-aria/interactions'
import { Close as CloseOutlined } from '@brickdoc/design-icons'

import type { TagProps } from './constants'
import { TagRoot } from './styles/index.style'

const Tag: ForwardRefRenderFunction<unknown, TagProps> = (props, ref) => {
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
  const { pressProps, isPressed } = usePress({
    onPress: e => {
      if (e.type === 'press') {
        onClick?.(e, value ?? text)
      }
    }
  })

  const handleClose = useCallback(
    e => {
      onClose?.(e, value ?? text)
    },
    [onClose, value, text]
  )

  const icon = closable ? <CloseOutlined onClick={handleClose} /> : <></>

  return (
    <>
      <TagRoot
        ref={ref}
        color={color ?? 'primary'}
        size={size}
        pressed={isPressed}
        {...(pressProps as any)}
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
