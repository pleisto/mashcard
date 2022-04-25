import { useEffect } from 'react'
import WebViewer, { WebViewerInstance } from '@pdftron/webviewer'
import { FileType } from '../../../../../helpers'

export function useWebViewer(
  fileType: FileType,
  initialDoc: string,
  dom: React.RefObject<HTMLDivElement>,
  onInstance: (instance: WebViewerInstance) => void
): void {
  const path = '/pdftron'
  useEffect(() => {
    void WebViewer(
      {
        path,
        css: '/pdftron.css',
        disabledElements: ['toolsHeader', 'header', 'textPopup', 'contextMenuPopup'],
        initialDoc
      },
      dom.current!
    ).then(onInstance)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
