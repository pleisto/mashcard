import { ForwardRefRenderFunction, createRef, forwardRef, InputHTMLAttributes } from 'react'
import InputUnstyled from '@mui/base/InputUnstyled'
import { inputStyle } from './styles/index.style'
import { usePressEnterHandler } from './usePressEnterHandler'
import { styled } from '../../themes'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'css' | 'startAdornment' | 'endAdornment'> {
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>
  size?: 'sm' | 'md' | 'lg'
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, ref) => {
  const { prefix, suffix, onKeyDown, onPressEnter, size = 'md', disabled = false, ...otherProps } = props
  const inputRef = ref ?? createRef<HTMLInputElement>()
  const keydownHandler = usePressEnterHandler(onPressEnter, onKeyDown)
  const InputComponent = styled(InputUnstyled, inputStyle)
  const commonProps = {
    ...otherProps,
    disabled,
    onKeyDown: keydownHandler,
    ref: inputRef
  }
  return (
    <InputComponent
      {...commonProps}
      disabledVariant={disabled}
      size={size}
      invalid={!!commonProps['aria-invalid']}
      startAdornment={prefix}
      endAdornment={suffix}
    />
  )
}

const _Input = forwardRef(Input)
_Input.displayName = 'Input'

export { _Input as Input }
