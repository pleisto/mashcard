import React from 'react'
import PDFWebViewer from '@pdftron/pdfjs-express-viewer'
import WebViewer, { WebViewerInstance } from '@pdftron/webviewer'
import { FileType } from '../../../../helpers'
import { EditorDataSourceContext } from '../../../..'

export function useWebViewer(
  fileType: FileType,
  initialDoc: string,
  dom: React.RefObject<HTMLDivElement>,
  onInstance: (instance: WebViewerInstance) => void
) {
  const { settings } = React.useContext(EditorDataSourceContext)
  const WebViewerCreator: typeof WebViewer = fileType === 'pdf' ? PDFWebViewer : WebViewer
  const path = fileType === 'pdf' ? '/pdfjs' : '/pdftron'
  React.useEffect(() => {
    void WebViewerCreator(
      {
        licenseKey: settings.pdfjs_express_license,
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
