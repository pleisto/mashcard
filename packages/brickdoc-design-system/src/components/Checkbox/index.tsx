import { ForwardRefRenderFunction, createRef, forwardRef, InputHTMLAttributes, useState } from 'react'
import { VisuallyHidden } from '../VisuallyHidden'
import { SwitchInputProps } from '@mui/base/SwitchUnstyled'
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
  /**
   * NOTE:o
   * Do not use `useSwitch`(@mui/base/SwitchUnstyled),
   * Because `react-hook-form` required uncontrolled component.
   */
  const {
    labelFirst = false,
    className,
    style,
    onChange,
    defaultChecked = false,
    checked = undefined,
    children,
    disabled,
    ...otherProps
  } = props
  const inputRef = ref ?? createRef<HTMLInputElement>()
  const [unControlledChecked, setUnControlledChecked] = useState(defaultChecked)
  const unControlledToggle = (e: any): void => {
    setUnControlledChecked(!unControlledChecked)
    onChange?.(e)
  }
  const isChecked = checked ?? unControlledChecked
  return (
    <CheckboxLabel className={className} style={style}>
      {labelFirst && children && <span>{children}</span>}
      <CheckboxUI checked={isChecked} labelFirst={labelFirst} disabled={disabled}>
        {isChecked && <Check aria-hidden />}
        <VisuallyHidden>
          <input
            type="checkbox"
            {...otherProps}
            onChange={typeof checked === 'boolean' ? onChange : unControlledToggle}
            checked={isChecked}
            ref={inputRef}
            disabled={disabled}
          />
        </VisuallyHidden>
      </CheckboxUI>
      {!labelFirst && children && <span>{children}</span>}
    </CheckboxLabel>
  )
}

const _Checkbox = forwardRef(Checkbox)
_Checkbox.displayName = 'Checkbox'

export { _Checkbox as Checkbox }
