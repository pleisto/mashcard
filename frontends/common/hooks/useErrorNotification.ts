import { useEffect } from 'react'
import { notification } from '@brickdoc/design-system'

export const useErrorNotification = (message: string):void => {
  useEffect(() => {
    if (message) notification.error({ message: 'Error', description: message })
  }, [message])
}