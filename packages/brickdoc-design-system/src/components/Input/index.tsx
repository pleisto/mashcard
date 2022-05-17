import { ForwardRefRenderFunction, createRef, forwardRef, InputHTMLAttributes } from 'react'
import InputUnstyled from '@mui/base/InputUnstyled'
import { inputStyle } from './styles/index.style'
import { CSS } from '@stitches/react'
import { usePressEnterHandler } from './usePressEnterHandler'
import { styled, config } from '../../themes'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'css' | 'startAdornment' | 'endAdornment'> {
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>
  size?: 'sm' | 'md' | 'lg'
  bordered?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  css?: CSS<typeof config>
}

const InputComponent = styled(InputUnstyled, inputStyle)

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, ref) => {
  const {
    prefix,
    suffix,
    css,
    onKeyDown,
    onPressEnter,
    size = 'md',
    bordered = true,
    disabled = false,
    ...otherProps
  } = props
  const inputRef = ref ?? createRef<HTMLInputElement>()
  const keydownHandler = usePressEnterHandler(onPressEnter, onKeyDown)
  const invalid = props['aria-invalid'] === 'true' || props['aria-invalid'] === true
  return (
    <InputComponent
      componentsProps={{
        input: {
          ref: inputRef
        }
      }}
      {...otherProps}
      css={css as any}
      bordered={bordered}
      onKeyDown={keydownHandler}
      disabled={disabled}
      disabledVariant={disabled}
      size={size}
      invalid={invalid}
      startAdornment={prefix}
      endAdornment={suffix}
    />
  )
}

const _Input = forwardRef(Input)
_Input.displayName = 'Input'

export { _Input as Input, InputUnstyled }
