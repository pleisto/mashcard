import { ForwardRefRenderFunction, createRef, useState, forwardRef } from 'react'
import { VisuallyHidden } from 'reakit/VisuallyHidden'
import { Checkbox as ReakitCheckbox, CheckboxProps as ReakitCheckboxProps } from 'reakit/Checkbox'
import { styled } from '../../themes'
import { CheckBox as Check } from '@brickdoc/design-icons'
import { FocusRing } from '../FocusRing'
import { root, checkbox } from './styles/index.style'

export interface CheckboxProps extends Omit<ReakitCheckboxProps, 'size' | 'ref' | 'css'> {
  labelFirst?: boolean
  defaultChecked?: boolean
  checked?: boolean
}

const CheckboxLabel = styled('label', root)
const CheckboxUI = styled('div', checkbox)

const Checkbox: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (props, ref) => {
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
      <FocusRing within={true}>
        <CheckboxUI checked={isChecked} labelFirst={labelFirst} disabled={disabled}>
          {isChecked && <Check aria-hidden />}
          <VisuallyHidden>
            <ReakitCheckbox
              {...otherProps}
              onChange={typeof checked === 'boolean' ? onChange : unControlledToggle}
              checked={isChecked}
              ref={inputRef}
              unstable_clickOnEnter
              unstable_clickOnSpace
              disabled={disabled}
            />
          </VisuallyHidden>
        </CheckboxUI>
      </FocusRing>
      {!labelFirst && children && <span>{children}</span>}
    </CheckboxLabel>
  )
}

const _Checkbox = forwardRef(Checkbox)
_Checkbox.displayName = 'Checkbox'

export { _Checkbox as Checkbox }
