import { ForwardRefRenderFunction, createRef, forwardRef, InputHTMLAttributes } from 'react'
import { VisuallyHidden } from '../VisuallyHidden'
import { useSwitch, SwitchInputProps } from '@mui/base/SwitchUnstyled'
import { styled } from '../../themes'
import { CheckBox as Check } from '@brickdoc/design-icons'
import { root, checkbox } from './styles/index.style'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'css'>,
    Omit<SwitchInputProps, 'onBlur' | 'onChange' | 'onFocus'> {
  labelFirst?: boolean
  defaultChecked?: boolean
  checked?: boolean
  children?: React.ReactNode
}

const CheckboxLabel = styled('label', root)
const CheckboxUI = styled('div', checkbox)

const Checkbox: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (props, ref) => {
  const { labelFirst = false, className, children, ...otherProps } = props
  const { getInputProps, checked, disabled } = useSwitch({
    ...otherProps
  })

  const inputRef = ref ?? createRef<HTMLInputElement>()

  return (
    <CheckboxLabel className={className}>
      {labelFirst && children && <span>{children}</span>}
      <CheckboxUI checked={checked} labelFirst={labelFirst} disabled={disabled}>
        {checked && <Check aria-hidden />}
        <VisuallyHidden>
          <input {...getInputProps()} ref={inputRef} disabled={disabled} />
        </VisuallyHidden>
      </CheckboxUI>
      {!labelFirst && children && <span>{children}</span>}
    </CheckboxLabel>
  )
}

const _Checkbox = forwardRef(Checkbox)
_Checkbox.displayName = 'Checkbox'

export { _Checkbox as Checkbox }
