import { useState, useCallback, ReactEventHandler } from 'react'

export function useWebsiteDocumentStatus(): [boolean, (iframe: any) => void] {
  const [error, setError] = useState(false)

  const handleLoad = useCallback<ReactEventHandler<HTMLIFrameElement>>(event => {
    if (((event.target as HTMLIFrameElement).contentWindow?.window.length ?? 0) > 0) return

    setError(true)
  }, [])

  return [error, handleLoad]
}
