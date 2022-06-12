import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import WebViewer, { WebViewerInstance } from '@pdftron/webviewer'

export type DocumentStatus = 'ready' | 'error' | 'loading'

export function usePdftronDocument(initialDoc: string): [DocumentStatus, RefObject<HTMLDivElement>, VoidFunction] {
  const viewer = useRef<HTMLDivElement>(null)
  const [instance, setInstance] = useState<WebViewerInstance>()
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>('loading')

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
        setDocumentStatus('ready')
      })
      instance.UI.addEventListener(instance.UI.Events.LOAD_ERROR, err => {
        console.error(err)
        setDocumentStatus('error')
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleFullScreen = useCallback(() => {
    instance?.UI.toggleFullScreen()
  }, [instance?.UI])

  return [documentStatus, viewer, toggleFullScreen]
}
