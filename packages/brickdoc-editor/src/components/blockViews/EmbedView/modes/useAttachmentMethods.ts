import { useCallback } from 'react'
import { WebViewerInstance } from '@pdftron/webviewer'

export interface UseAttachmentMethodsProps {
  fileUrl: string
  webViewer?: WebViewerInstance
  updateAttachmentAttributes: (attrs: Record<string, any>) => void
}

export interface AttachmentMethods {
  onFullScreen: () => void
  onToLinkMode: () => void
  onToPreviewMode: () => void
  onDownload: () => void
}

export function useAttachmentMethods({
  webViewer,
  fileUrl,
  updateAttachmentAttributes
}: UseAttachmentMethodsProps): [AttachmentMethods] {
  const handleChangeModeToLink = useCallback((): void => {
    updateAttachmentAttributes({ mode: 'link' })
  }, [updateAttachmentAttributes])

  const handleChangeModeToPreview = useCallback((): void => {
    updateAttachmentAttributes({ mode: 'preview' })
  }, [updateAttachmentAttributes])

  const handleDownload = useCallback((): void => {
    if (webViewer?.UI) {
      void webViewer.UI.downloadPdf()
      return
    }

    const link = document.createElement('a')
    link.download = 'true'
    link.href = fileUrl
    link.click()
  }, [fileUrl, webViewer?.UI])

  const handleFullscreen = useCallback(() => {
    webViewer?.UI.toggleFullScreen()
  }, [webViewer?.UI])

  return [
    {
      onToLinkMode: handleChangeModeToLink,
      onToPreviewMode: handleChangeModeToPreview,
      onDownload: handleDownload,
      onFullScreen: handleFullscreen
    }
  ]
}
