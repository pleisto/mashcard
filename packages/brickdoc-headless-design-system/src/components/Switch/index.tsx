import React from 'react'
import { useSwitch } from '@react-aria/switch'
import { AriaSwitchProps } from '@react-types/switch'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { useToggleState } from '@react-stately/toggle'
import { FocusRing } from '@react-aria/focus'
import { styled, theme, css } from '../../themes'
import { Rotation } from '@brickdoc/design-icons'

export interface SwitchProps extends AriaSwitchProps {
  size: 'small' | 'medium' | 'large'
  isLoading?: boolean
  className?: string
  style?: React.CSSProperties
}

const SwitchLabel = styled('label', {
  display: 'inline-flex',
  alignItems: 'center',
  position: 'relative',
  isolation: 'isolation'
})

const Switcher = styled('div', {
  // todo： rename color token make it semantic
  border: `1px solid ${theme.colors.typeDisabled}`,
  borderRadius: '6.25rem',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '2px',
  '&>div': {
    transition: `all .2s ${theme.transitions.easeInOutQuint}`,
    transform: 'translateX(0)',
    background: theme.colors.typeDisabled,
    borderRadius: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  variants: {
    checked: {
      true: {
        borderColor: theme.colors.hueBlueDefault,
        background: theme.colors.hueBlueDefault,
        '&>div': {
          // -3px == border + padding
          transform: 'translateX(var(--brd-switch-translateX))',
          background: theme.colors.white
        }
      }
    },
    loading: {
      true: {
        '.brd-icon': {
          color: theme.colors.typeDisabled
        }
      }
    },
    size: {
      small: {
        '--brd-switch-translateX': '.5rem',
        width: '1.625rem',
        height: '1rem',
        '& + span': {
          marginLeft: '0.5rem'
        },
        '&>div': {
          width: '0.75rem',
          height: '0.75rem',
          fontSize: 'calc(0.75rem - 2px)'
        }
      },
      medium: {
        // todo: design WIP
      },
      large: {
        '--brd-switch-translateX': '.625rem',
        width: '2rem',
        height: '1.25rem',
        '& + span': {
          marginLeft: '0.75rem'
        },
        '&>div': {
          width: '1rem',
          height: '1rem',
          fontSize: 'calc(1rem - 2px)'
        }
      }
    },
    disabled: {
      true: {
        cursor: 'not-allowed'
      }
    }
  },
  compoundVariants: [
    {
      disabled: true,
      checked: false,
      css: {
        background: theme.colors.typeDisabled,
        '&>div': {
          background: theme.colors.typeThirdary
        }
      }
    },
    {
      disabled: true,
      checked: true,
      css: {
        background: theme.colors.primaryDisable,
        borderColor: theme.colors.primaryDisable,
        '&>div': {
          background: theme.colors.hueBlueDefault
        }
      }
    }
  ]
})
const focusRingStyle = css({
  // todo: colors.a11yFocus
  border: `2px solid ${theme.colors.primaryHover}`
})

export const Switch: React.FC<SwitchProps> = props => {
  const { isLoading = false, size = 'small', className, style, autoFocus, isDisabled, children } = props
  const state = useToggleState(props)
  const ref = React.useRef()
  const { inputProps } = useSwitch(props, state, ref)

  const disabled = isDisabled || isLoading

  return (
    <FocusRing autoFocus={autoFocus} within={true} focusRingClass={focusRingStyle()}>
      <SwitchLabel className={className} style={style}>
        <VisuallyHidden>
          <input {...inputProps} ref={ref} disabled={disabled} />
        </VisuallyHidden>
        <Switcher checked={state.isSelected} loading={isLoading} disabled={disabled} size={size}>
          <div>{isLoading && <Rotation className="brd-icon-spin" />}</div>
        </Switcher>
        {children && <span>{children}</span>}
      </SwitchLabel>
    </FocusRing>
  )
}
