import { FC, useCallback, useState, AriaAttributes, AriaRole } from 'react'
import { Success, Info, Caution, CloseOne, Close } from '@brickdoc/design-icons'
import { useId } from '../../utilities'

import * as AlertRoot from './style/index.style'

export type Type = 'info' | 'error' | 'warning' | 'success'

type AriaRoleProps = AriaAttributes & {
  role?: AriaRole
}

export interface AlertProps {
  type?: Type
  className?: string
  fullMode?: boolean
  title?: React.ReactNode
  message?: React.ReactNode
  closeIcon?: boolean
  icon?: boolean
  onClose?: () => void
  action?: React.ReactNode
}

export const Alert: FC<AlertProps> = props => {
  const { action, type = 'success', className, icon = true, title, message, onClose } = props
  // closeIcon default to true if title is provided
  const closeIcon = props.closeIcon ?? !title
  const [visible, setVisible] = useState<boolean>(true)
  const contentId = useId()

  const handleClose = useCallback(() => {
    setVisible(false)
    onClose?.()
  }, [setVisible, onClose])

  const size = title ? 'large' : 'small'

  const titleDom = title ? <AlertRoot.Title>{title}</AlertRoot.Title> : null

  const iconMap = {
    warning: <Caution />,
    success: <Success />,
    info: <Info />,
    error: <CloseOne />
  }

  const ariaRoleProps: AriaRoleProps =
    type === 'info' || type === 'success'
      ? {
          role: 'status',
          'aria-live': 'polite'
        }
      : {
          role: 'alert',
          'aria-live': 'assertive'
        }

  const iconDom = icon ? <AlertRoot.ContentIcon role="presentation">{iconMap[type]}</AlertRoot.ContentIcon> : null

  const actionDom = action ? <AlertRoot.ContentAction>{action}</AlertRoot.ContentAction> : null

  const closeDom = closeIcon ? (
    <AlertRoot.ContentClose type="text" onClick={handleClose} aria-label="Dismiss Button">
      <Close />
    </AlertRoot.ContentClose>
  ) : null

  /**
   *
   */
  const alertDom = visible ? (
    <AlertRoot.Base className={className} size={size} variant={type} {...ariaRoleProps} aria-labelledby={contentId}>
      <AlertRoot.ContentWrapper>
        <AlertRoot.Content>
          {iconDom}
          <AlertRoot.ContentBody id={titleDom ? contentId : undefined}>
            {titleDom}
            <AlertRoot.Description
              id={
                // Set label id to AlertRoot.Description if no title
                titleDom ? undefined : contentId
              }>
              {message}
            </AlertRoot.Description>
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
