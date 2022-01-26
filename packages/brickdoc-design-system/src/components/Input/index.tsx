import { ForwardRefRenderFunction, createRef, forwardRef } from 'react'
import { Input as ReakitInput, InputProps as ReakitInputProps } from 'reakit'
import { inputStyle, affixWrapperStyle } from './styles/index.style'
import { styled } from '../../themes'
import { usePressEnterHandler } from './usePressEnterHandler'

export interface InputProps extends Omit<ReakitInputProps, 'as' | 'ref' | 'css' | 'size' | 'prefix'> {
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>
  size?: 'small' | 'medium' | 'large'
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

const StyledInput = styled(ReakitInput, inputStyle)
const StyledAffixWrapper = styled('div', affixWrapperStyle)

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, ref) => {
  const { className, prefix, suffix, onKeyDown, onPressEnter, size = 'medium', disabled = false, ...otherProps } = props
  const inputRef = ref ?? createRef<HTMLInputElement>()
  const keydownHandler = usePressEnterHandler(onPressEnter, onKeyDown)
  const commonProps = {
    ...otherProps,
    disabled,
    onKeyDown: keydownHandler,
    ref: inputRef
  }
  return prefix ?? suffix ? (
    <StyledAffixWrapper size={size} disabled={commonProps.disabled} invalid={!!commonProps['aria-invalid']}>
      {prefix && <span className="prefix">{prefix}</span>}
      <ReakitInput {...commonProps} as="input" />
      {suffix && <span className="suffix">{suffix}</span>}
    </StyledAffixWrapper>
  ) : (
    <StyledInput {...commonProps} size={size} as="input" />
  )
}

const _Input = forwardRef(Input)
_Input.displayName = 'Input'

export { _Input as Input }
