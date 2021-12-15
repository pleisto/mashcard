import React from 'react'
import { useSwitch } from '@react-aria/switch'
import { AriaSwitchProps } from '@react-types/switch'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { useToggleState } from '@react-stately/toggle'
import { FocusRing } from '../FocusRing'
import { Rotation } from '@brickdoc/design-icons'
import { styled } from '../../themes'
import { root, switcher } from './styles/index.style'

export interface SwitchProps extends AriaSwitchProps {
  size: 'small' | 'medium' | 'large'
  isLoading?: boolean
  className?: string
  style?: React.CSSProperties
  isLabelFirst?: boolean
}

const SwitchLabel = styled('label', root)
const Switcher = styled('div', switcher)

export const Switch: React.FC<SwitchProps> = props => {
  const {
    isLabelFirst = false,
    isLoading = false,
    size = 'medium',
    className,
    style,
    autoFocus,
    isDisabled,
    children
  } = props
  const state = useToggleState(props)
  const ref = React.useRef()
  const { inputProps } = useSwitch(props, state, ref)

  const disabled = isDisabled || isLoading

  return (
    <FocusRing autoFocus={autoFocus} within={true}>
      <SwitchLabel className={className} style={style}>
        <VisuallyHidden>
          <input {...inputProps} ref={ref} disabled={disabled} />
        </VisuallyHidden>

        {isLabelFirst && children && <span>{children}</span>}
        <Switcher checked={state.isSelected} loading={isLoading} disabled={disabled} size={size}>
          <div>{isLoading && <Rotation className="brd-icon-spin" />}</div>
        </Switcher>
        {!isLabelFirst && children && <span>{children}</span>}
      </SwitchLabel>
    </FocusRing>
  )
}
