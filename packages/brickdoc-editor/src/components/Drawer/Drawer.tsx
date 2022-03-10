import { FC } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { Button, styled, theme } from '@brickdoc/design-system'
import { Close } from '@brickdoc/design-icons'

export interface DrawerProps {
  className?: string
  title?: string
  visible?: boolean
  container?: HTMLElement
  onClose?: () => void
}

const width = '17.5rem'

const DrawerContainer = styled(motion.div, {
  include: ['ceramicSecondary'],
  borderLeft: `1px solid ${theme.colors.dividerOverlayPrimary}`,
  borderTopRightRadius: '2px',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: '0.75rem 1.125rem',
  position: 'relative',
  width,
  variants: {
    visible: {
      false: {
        height: 0,
        padding: 0
      }
    }
  }
})

const CloseButton = styled(Button, {
  position: 'absolute',
  height: '1rem',
  right: '1rem',
  top: '1rem',
  width: '1rem',
  variants: {
    size: {
      md: {
        fontSize: '1rem',
        padding: 0
      }
    }
  }
})

const Title = styled('div', {
  color: theme.colors.typeSecondary,
  fontSize: theme.fontSizes.body,
  fontWeight: 600,
  lineHeight: '1.5rem',
  marginBottom: '1.625rem'
})

const drawerAnimation = (visible?: boolean) => ({
  width: visible ? width : 0
})
const drawerTransition = (visible?: boolean) => ({
  width: visible ? { type: 'spring', stiffness: 1400, damping: 80 } : { ease: 'linear', duration: 0 }
})

export const Drawer: FC<DrawerProps> = ({ visible, className, title, container, onClose, children }) => {
  const element = container ?? document.body

  if (!element) return null

  return createPortal(
    <>
      <DrawerContainer
        visible={visible}
        className={className}
        animate={drawerAnimation(visible)}
        transition={drawerTransition(visible)}
      >
        {visible && (
          <>
            <CloseButton onClick={onClose} type="text" icon={<Close />} />
            <Title>{title}</Title>
            {children}
          </>
        )}
      </DrawerContainer>
    </>,
    element
  )
}
