import { useEffect } from 'react'
import { toast } from '@brickdoc/design-system'

export const useErrorNotification = (message: string): void => {
  useEffect(() => {
    // todo: custom style
    if (message) toast.error(message)
  }, [message])
}
