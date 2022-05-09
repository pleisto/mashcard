import { useState, useCallback } from 'react'

export function useWebsiteDocumentStatus(): [boolean, (iframe: any) => void] {
  const [error, setError] = useState(false)

  const handleLoad = useCallback((frame: any) => {
    if (!frame.contentDocument?.location) {
      setError(true)
    }
  }, [])

  return [error, handleLoad]
}
