import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import WebViewer, { WebViewerInstance } from '@pdftron/webviewer'

export function usePdftronDocument(initialDoc: string): [boolean, RefObject<HTMLDivElement>, VoidFunction] {
  const viewer = useRef<HTMLDivElement>(null)
  const [instance, setInstance] = useState<WebViewerInstance>()
  const [documentReady, setDocumentReady] = useState(false)

  const path = '/pdftron'

  useEffect(() => {
    void WebViewer(
      {
        path,
        css: '/pdftron.css',
        disabledElements: ['toolsHeader', 'header', 'textPopup', 'contextMenuPopup'],
        initialDoc
      },
      viewer.current!
    ).then(instance => {
      setInstance(instance)
      instance.UI.setFitMode(instance.UI.FitMode.FitWidth)
      const { documentViewer } = instance.Core
      documentViewer.addEventListener('documentLoaded', () => {
        setDocumentReady(true)
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleFullScreen = useCallback(() => {
    instance?.UI.toggleFullScreen()
  }, [instance?.UI])

  return [documentReady, viewer, toggleFullScreen]
}
