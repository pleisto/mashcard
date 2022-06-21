import { FC, memo, CSSProperties } from 'react'
import { Toast, resolveValue, ToastPosition } from 'react-hot-toast'
import { styled, theme, keyframes } from '../../themes'
interface ToastBarProps {
  toast: Toast
}

type keyframesValue = Parameters<typeof keyframes>[0]

const ToastBarBase = styled('div', {
  background: theme.colors.ceramicPrimary,
  include: ['shadowLg'],
  padding: '10px 12px',
  borderRadius: '2px',
  color: theme.colors.typeSecondary,
  zIndex: theme.zIndices.toast,
  fontSize: '14px',
  '& > .mc-icon': {
    marginRight: '6px'
  },
  variants: {
    type: {
      success: {
        '& > .mc-icon': {
          color: theme.colors.green6
        }
      },
      error: {
        '& > .mc-icon': {
          color: theme.colors.errorDefault
        }
      },
      loading: {
        '& > .mc-icon': {
          color: theme.colors.typePrimary
        }
      },
      blank: {
        '& > .mc-icon': {
          color: theme.colors.primaryDefault
        }
      },
      custom: {}
    }
  }
})

const enterAnimation = (factor: number): keyframesValue => ({
  '0%': {
    transform: `translate3d(0,${factor * -200}%,0) scale(.6)`,
    opacity: 0.5
  },
  '100%': {
    transform: 'translate3d(0,0,0) scale(1)',
    opacity: 1
  }
})

const exitAnimation = (factor: number): keyframesValue => ({
  '0%': {
    transform: 'translate3d(0,0,-1px) scale(1)',
    opacity: 1
  },
  '100%': {
    transform: `translate3d(0,${factor * -150}%,-1px) scale(.6)`,
    opacity: 0
  }
})

export const getAnimationStyle = (position: ToastPosition, visible: boolean): CSSProperties => {
  const top = position.includes('top')
  const factor = top ? 1 : -1

  const [enter, exit] = [enterAnimation(factor), exitAnimation(factor)]

  return {
    animation: visible
      ? `${keyframes(enter)} 0.35s ${theme.transitions.easeIn} forwards`
      : `${keyframes(exit)} 0.4s forwards ${theme.transitions.easeOut}`
  }
}

export const ToastBar: FC<ToastBarProps> = memo(props => {
  const { toast } = props
  const animationStyle: CSSProperties = toast?.height
    ? getAnimationStyle(toast.position ?? 'top-center', toast.visible)
    : { opacity: 0 }

  return (
    <ToastBarBase style={{ ...animationStyle, ...toast.style }} type={toast.type}>
      {toast.icon}
      <span>{resolveValue(toast.message, toast)}</span>
    </ToastBarBase>
  )
})
