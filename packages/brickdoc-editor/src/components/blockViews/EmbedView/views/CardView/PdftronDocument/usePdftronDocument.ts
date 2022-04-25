import { RefObject, useEffect, useRef, useState } from 'react'
import WebViewer from '@pdftron/webviewer'

export function usePdftronDocument(initialDoc: string): [boolean, RefObject<HTMLDivElement>] {
  const viewer = useRef<HTMLDivElement>(null)
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
      instance.UI.setFitMode(instance.UI.FitMode.FitWidth)
      const { documentViewer } = instance.Core
      documentViewer.addEventListener('documentLoaded', () => {
        setDocumentReady(true)
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [documentReady, viewer]
}
