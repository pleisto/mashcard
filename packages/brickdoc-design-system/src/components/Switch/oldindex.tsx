import React, { useState, ChangeEvent, forwardRef, createRef, ForwardRefRenderFunction } from 'react'
import { VisuallyHidden } from 'reakit/VisuallyHidden'
import { Checkbox, CheckboxProps } from 'reakit/Checkbox'
import { Rotation } from '@brickdoc/design-icons'
import { styled } from '../../themes'
import { FocusRing } from '../FocusRing'
import { root, switcher } from './styles/index.style'

export interface SwitchProps extends Omit<CheckboxProps, 'size' | 'onChange' | 'ref'> {
  size?: 'small' | 'medium' | 'large'
  loading?: boolean
  className?: string
  style?: React.CSSProperties
  labelFirst?: boolean
  disabled?: boolean
  defaultChecked?: boolean
  checked?: boolean
  onChange?: (checked: boolean, event: React.ChangeEvent) => void
}

const SwitchLabel = styled('label', root)
const Switcher = styled('div', switcher)

const Switch: ForwardRefRenderFunction<HTMLInputElement, SwitchProps> = (props, ref) => {
  const {
    labelFirst = false,
    loading = false,
    size = 'medium',
    className,
    style,
    onChange,
    defaultChecked = false,
    checked = undefined,
    children,
    disabled,
    ...otherProps
  } = props
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const isDisabled = disabled || loading
  const inputRef = ref ?? createRef<HTMLInputElement>()
  const [unControlledChecked, setUnControlledChecked] = useState(defaultChecked)
  const unControlledToggle = (): void => setUnControlledChecked(!unControlledChecked)
  const isChecked = checked ?? unControlledChecked

  return (
    <SwitchLabel className={className} style={style}>
      {labelFirst && children && <span>{children}</span>}
      <FocusRing within={true}>
        <Switcher checked={isChecked} loading={loading} disabled={isDisabled} size={size}>
          <VisuallyHidden>
            <Checkbox
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
              disabled={isDisabled}
            />
          </VisuallyHidden>
          <div>{loading && <Rotation className="brd-icon-spin" />}</div>
        </Switcher>
      </FocusRing>
      {!labelFirst && children && <span>{children}</span>}
    </SwitchLabel>
  )
}

const _Switch = forwardRef(Switch)
_Switch.displayName = 'Switch'

export { _Switch as Switch }