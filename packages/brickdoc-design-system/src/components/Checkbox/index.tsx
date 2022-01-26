import { ForwardRefRenderFunction, ChangeEvent, createRef, useState, forwardRef } from 'react'
import { VisuallyHidden } from 'reakit/VisuallyHidden'
import { Checkbox as ReakitCheckbox, CheckboxProps as ReakitCheckboxProps } from 'reakit/Checkbox'
import { styled } from '../../themes'
import { CheckBox as Check } from '@brickdoc/design-icons'
import { FocusRing } from '../FocusRing'
import { root, checkbox } from './styles/index.style'

export interface CheckboxProps extends Omit<ReakitCheckboxProps, 'size' | 'onChange' | 'ref' | 'css'> {
  labelFirst?: boolean
  defaultChecked?: boolean
  checked?: boolean
  onChange?: (checked: boolean, event: React.ChangeEvent) => void
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
  const unControlledToggle = (): void => setUnControlledChecked(!unControlledChecked)
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
              onChange={
                typeof checked === 'boolean'
                  ? (e: ChangeEvent<HTMLInputElement>) => {
                      onChange?.(e.target.checked, e)
                    }
                  : unControlledToggle
              }
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
