import { useEffect } from 'react'
import { toast } from '@brickdoc/design-system'

export const useErrorNotification = (message: string): void => {
  useEffect(() => {
    if (message)
      toast.notification('Error', message, {
        type: 'error'
      })
  }, [message])
}
