import { FC } from 'react'
import { Toaster as HotToaster, ToastPosition } from 'react-hot-toast'
import { toast, placementMaps } from './toastApi'
import { Info, CheckOne, CloseOne, Rotation } from '@brickdoc/design-icons'
import { prefix, theme, css } from '../../themes'
import ClassNames from 'classnames'
type HotToasterProps = Parameters<typeof HotToaster>[0]
export interface ToasterProps extends Omit<HotToasterProps, 'position'> {
  position?: keyof typeof placementMaps
}

const primaryColor = css({
  color: theme.colors.primaryDefault
})

const errorColor = css({
  color: theme.colors.errorDefault
})

const successColor = css({
  color: theme.colors.green6
})

export const ToasterPortal: FC<ToasterProps> = props => {
  const { position = 'topCenter', ...otherProps } = props
  return (
    <HotToaster
      position={placementMaps[position] as ToastPosition}
      toastOptions={{
        success: {
          icon: <CheckOne className={successColor()} />
        },
        error: {
          icon: <CloseOne className={errorColor()} />
        },
        loading: {
          icon: <Rotation className={ClassNames(`${prefix}-icon-spin`, primaryColor())} />
        },
        blank: {
          icon: <Info className={primaryColor()} />,
          duration: 3000
        }
      }}
      {...otherProps}
    />
  )
}

export { toast }
