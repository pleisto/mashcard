import { FC } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { styled, theme } from '@brickdoc/design-system'

export interface DrawerProps {
  className?: string
  visible?: boolean
  overlay?: boolean
  container?: HTMLElement
}

const DrawerOverlay = styled('div', {
  height: 0,
  position: 'absolute',
  right: 0,
  top: 0,
  width: 0,
  zIndex: theme.zIndices.modal,
  variants: {
    visible: {
      true: {
        bottom: 0,
        height: 'unset',
        left: 0,
        width: 'unset'
      },
      false: {
        bottom: 'unset',
        height: 0,
        left: 'unset',
        width: 0
      }
    }
  }
})

export const DrawerContainer = styled(motion.div, {
  bottom: 0,
  position: 'fixed',
  right: 0,
  transform: 'translateX(100%)',
  top: 0
})

const drawerAnimation = (visible?: boolean) => ({ transform: visible ? 'translateX(0%)' : 'translateX(100%)' })
const drawerTransition = (visible?: boolean) => ({
  transform: visible ? { type: 'spring', stiffness: 1400, damping: 80 } : { ease: 'linear', duration: 0 }
})

export const Drawer: FC<DrawerProps> = ({ visible, className, container, overlay = true, children }) => {
  const element = container ?? document.body

  if (!element) return null

  return createPortal(
    <>
      {overlay && <DrawerOverlay visible={visible} />}
      <DrawerContainer className={className} animate={drawerAnimation(visible)} transition={drawerTransition(visible)}>
        {children}
      </DrawerContainer>
    </>,
    element
  )
}
