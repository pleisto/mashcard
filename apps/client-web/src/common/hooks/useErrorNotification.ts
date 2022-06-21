import { useEffect } from 'react'
import { toast } from '@mashcard/design-system'

export const useErrorNotification = (message: string): void => {
  useEffect(() => {
    if (message)
      toast.notification('Error', message, {
        type: 'error'
      })
  }, [message])
}
