import { FC } from 'react'
import { createPortal } from 'react-dom'
import { Toaster as HotToaster, ToastPosition } from 'react-hot-toast'
import { toast, placementMaps } from './toastApi'
import { Info, CheckOne, CloseOne, Rotation } from '@brickdoc/design-icons'
import { prefix } from '../../themes'
import { ToastBar } from './ToastBar'
type HotToasterProps = Parameters<typeof HotToaster>[0]
export interface ToasterProps extends Omit<HotToasterProps, 'position'> {
  position?: keyof typeof placementMaps
}

export const ToasterPortal: FC<ToasterProps> = props => {
  const { position = 'topCenter', ...otherProps } = props
  const portal = (
    <HotToaster
      position={placementMaps[position] as ToastPosition}
      toastOptions={{
        success: {
          icon: <CheckOne />
        },
        error: {
          icon: <CloseOne />
        },
        loading: {
          icon: <Rotation className={`${prefix}-icon-spin`} />
        },
        blank: {
          icon: <Info />,
          duration: 3000
        },
        custom: {
          // notification type
          duration: 10_000
        }
      }}
      {...otherProps}
    >
      {t => <ToastBar toast={t} />}
    </HotToaster>
  )
  return createPortal(portal, document.body)
}

export { toast }
