import React from 'react'
import { message, Modal } from '@brickdoc/design-system'
import { NodeViewProps } from '@tiptap/react'
import { useEditorI18n } from '../../../'
import { WebViewerInstance } from '@pdftron/webviewer'

export interface UseAttachmentMethodsProps {
  fileUrl: string
  deleteNode: NodeViewProps['deleteNode']
  webViewer?: WebViewerInstance
  updateAttachmentAttributes: (attrs: Record<string, any>) => void
}

export interface AttachmentMethods {
  onFullScreen: () => void
  onDelete: () => void
  onCopy: () => void
  onToLinkMode: () => void
  onToPreviewMode: () => void
  onDownload: () => void
}

export function useAttachmentMethods({
  webViewer,
  fileUrl,
  deleteNode,
  updateAttachmentAttributes
}: UseAttachmentMethodsProps): [AttachmentMethods] {
  const [t] = useEditorI18n()
  const handleDelete = React.useCallback((): void => {
    Modal.confirm({
      title: t('link_block.deletion_confirm.title'),
      okText: t('link_block.deletion_confirm.ok'),
      okButtonProps: {
        danger: true
      },
      cancelText: t('link_block.deletion_confirm.cancel'),
      icon: null,
      onOk: () => {
        deleteNode()
      }
    })
  }, [deleteNode, t])

  const handleCopyLink = React.useCallback(async (): Promise<void> => {
    await navigator.clipboard.writeText(fileUrl)
    void message.success(t('link_block.copy_hint'))
  }, [fileUrl, t])

  const handleChangeModeToLink = React.useCallback((): void => {
    updateAttachmentAttributes({ mode: 'link' })
  }, [updateAttachmentAttributes])

  const handleChangeModeToPreview = React.useCallback((): void => {
    updateAttachmentAttributes({ mode: 'preview' })
  }, [updateAttachmentAttributes])

  const handleDownload = React.useCallback((): void => {
    if (webViewer?.UI) {
      void webViewer.UI.downloadPdf()
      return
    }

    const link = document.createElement('a')
    link.download = 'true'
    link.href = fileUrl
    link.click()
  }, [fileUrl, webViewer?.UI])

  const handleFullscreen = React.useCallback(() => {
    webViewer?.UI.toggleFullScreen()
  }, [webViewer?.UI])

  return [
    {
      onDelete: handleDelete,
      onCopy: handleCopyLink,
      onToLinkMode: handleChangeModeToLink,
      onToPreviewMode: handleChangeModeToPreview,
      onDownload: handleDownload,
      onFullScreen: handleFullscreen
    }
  ]
}
