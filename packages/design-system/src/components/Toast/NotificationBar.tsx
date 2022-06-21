import { FC, ReactNode, CSSProperties } from 'react'
import { styled, theme, css } from '../../themes'
import { Info, CloseOne, Close } from '@mashcard/design-icons'
import { Toast, toast as toastApi } from 'react-hot-toast'
import { getAnimationStyle } from './ToastBar'
import { Button } from '../Button'

interface NotificationBarProps {
  title: ReactNode
  description: ReactNode
  type?: 'info' | 'error'
  toast: Toast
}

const NotificationBarBase = styled('div', {
  background: theme.colors.ceramicPrimary,
  include: ['shadowLg'],
  padding: '10px 12px',
  borderRadius: '2px',
  color: theme.colors.typeSecondary,
  zIndex: theme.zIndices.toast,
  fontSize: '14px',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  '&>.mc-icon': {
    fontSize: '20px',
    marginRight: '12px',
    marginTop: '2px'
  },
  section: {
    wordBreak: 'break-word',
    maxWidth: 'calc(100vw - 60px)',
    width: '25rem',
    textAlign: 'left',
    lineHeight: '1.5'
  }
})
const Title = styled('div', {
  fontSize: '18px',
  color: theme.colors.typePrimary
})
const Description = styled('div', {
  color: theme.colors.typeSecondary
})
const InfoIcon = styled(Info, {
  color: theme.colors.blue6
})
const ErrorIcon = styled(CloseOne, {
  color: theme.colors.errorDefault
})

const DismissStyle = css({
  color: `${theme.colors.typeThirdary} !important`
})

export const NotificationBar: FC<NotificationBarProps> = props => {
  const { title, description, type = 'info', toast } = props
  const animationStyle: CSSProperties = toast?.height
    ? getAnimationStyle(toast.position ?? 'top-right', toast.visible)
    : { opacity: 0 }
  return (
    <NotificationBarBase style={{ ...animationStyle, ...toast.style }}>
      {type === 'error' ? <ErrorIcon /> : <InfoIcon />}
      <section>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </section>
      <Button
        aria-label="Dismiss Notification"
        className={DismissStyle()}
        icon={<Close />}
        type="text"
        onClick={() => toastApi.dismiss(toast.id)}
      />
    </NotificationBarBase>
  )
}
