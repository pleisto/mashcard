import { forwardRef, ForwardRefRenderFunction } from 'react'
import { Close as CloseOutlined } from '@mashcard/design-icons'
import { useMemoizedFn } from '../../hooks'
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

  const handleClick = useMemoizedFn(e => {
    onClick?.(e, value ?? text)
  })

  const handleClose = useMemoizedFn(e => {
    onClose?.(e, value ?? text)
  })

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
        {...otherProps}>
        {text ?? ''}
        {icon}
      </TagRoot>
    </>
  )
}

const _Tag = forwardRef(Tag)

_Tag.displayName = `Tag`

export { _Tag as Tag }
