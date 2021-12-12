import { FC, useCallback, useState } from 'react'
import { Success, Info, Caution, CloseOne, Close } from '@brickdoc/design-icons'

import * as AlertRoot from './style/index.style'

export type Type = 'info' | 'error' | 'warning' | 'success'

export interface AlertProps {
  type?: Type
  className?: string
  fullMode?: boolean
  title?: React.ReactNode
  message?: React.ReactNode
  closeIcon?: boolean
  icon?: boolean
  onClose?: (e: React.MouseEvent) => void
  action?: React.ReactNode
}

export const Alert: FC<AlertProps> = props => {
  const { action, type = 'success', className, closeIcon = true, icon = true, title, message, onClose } = props
  const [visible, setVisible] = useState<boolean>(true)

  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      setVisible(false)
      onClose?.(e)
    },
    [setVisible, onClose]
  )

  const size = title ? 'large' : 'small'

  const titleDom = title ? <AlertRoot.Title>{title}</AlertRoot.Title> : null

  const iconMap = {
    warning: <Caution />,
    success: <Success />,
    info: <Info />,
    error: <CloseOne />
  }

  const iconDom = icon ? <AlertRoot.ContentIcon>{iconMap[type]}</AlertRoot.ContentIcon> : null

  const actionDom = action ? <AlertRoot.ContentAction>{action}</AlertRoot.ContentAction> : null

  const closeDom =
    closeIcon && !title && !action ? (
      <AlertRoot.ContentClose onClick={handleClose}>
        <Close />
      </AlertRoot.ContentClose>
    ) : null

  const alertDom = visible ? (
    <AlertRoot.Base className={className} size={size} variant={type}>
      <AlertRoot.ContentWrapper>
        <AlertRoot.Content>
          {iconDom}
          <AlertRoot.ContentBody>
            {titleDom}
            <AlertRoot.Description>{message}</AlertRoot.Description>
          </AlertRoot.ContentBody>
          {actionDom}
          {closeDom}
        </AlertRoot.Content>
      </AlertRoot.ContentWrapper>
    </AlertRoot.Base>
  ) : (
    <></>
  )

  return alertDom
}
