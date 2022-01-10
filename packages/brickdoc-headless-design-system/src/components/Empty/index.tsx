import { ForwardRefRenderFunction, createRef, forwardRef } from 'react'
import { useId } from '@react-aria/utils'
import { EmptyOrFound } from './EmptyOrFound'
import { EmptyProps, EmptyType } from './constants'
import { EmptyRoot, EmptyBody, EmptyDes, EmptyFooter } from './styles/index.style'

const Empty: ForwardRefRenderFunction<HTMLDivElement, EmptyProps> = (props, ref) => {
  const { className, prefixCls, style, type, description, action, ...otherProps } = props
  const uid = useId()
  const _ref = ref ?? createRef<HTMLDivElement>()

  const commonProps = {
    ...otherProps,
    ref: _ref
  }

  const footer = action ? <EmptyFooter>{action}</EmptyFooter> : <></>

  return (
    <EmptyRoot {...commonProps}>
      <EmptyBody>
        <EmptyOrFound type={type ?? EmptyType.Empty} uid={props?.id ?? uid} />
      </EmptyBody>
      <EmptyDes>{description}</EmptyDes>
      {footer}
    </EmptyRoot>
  )
}

const _Empty = forwardRef(Empty)
_Empty.displayName = 'Empty'

export { _Empty as Empty, EmptyType }
