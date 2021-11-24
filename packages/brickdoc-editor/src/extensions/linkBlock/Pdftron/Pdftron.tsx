import React from 'react'
import WebViewer, { WebViewerInstance } from '@pdftron/webviewer'
import './Pdftron.less'
import { ActionPanel } from '../ActionPanel/ActionPanel'
import { FileIcon } from '../FileIcon/FileIcon'
import { FileType } from '../../../helpers/file'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'

export interface PdftronProps {
  docLink: string
  fileName: string
  fileType: FileType
  onToggleMode: () => void
  onDelete: () => void
  onCopyLink: () => void
}

export const Pdftron: React.FC<PdftronProps> = ({ docLink, fileName, fileType, onDelete, onCopyLink, onToggleMode }) => {
  const viewer = React.useRef<HTMLDivElement>(null)
  const viewerInstance = React.useRef<WebViewerInstance>()
  React.useEffect(() => {
    void WebViewer(
      {
        path: '/pdftron',
        css: '/pdftron.css',
        disabledElements: ['toolsHeader', 'header', 'textPopup', 'contextMenuPopup'],
        initialDoc: docLink
      },
      viewer.current as HTMLDivElement
    ).then(instance => {
      viewerInstance.current = instance
      instance.UI.setFitMode(instance.UI.FitMode.FitWidth)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFullScreen = (): void => {
    viewerInstance.current?.UI.toggleFullScreen()
  }

  const handleDownload = (): void => {
    viewerInstance.current?.UI.downloadPdf()
  }

  return (
    <ActionPanel
      mode="preview"
      onCopyLink={onCopyLink}
      onDelete={onDelete}
      onDownload={handleDownload}
      onFullScreen={handleFullScreen}
      onToggleMode={onToggleMode}
    >
      <div data-testid={TEST_ID_ENUM.editor.linkBlock.pdftron.id} className="brickdoc-pdftron-block">
        <div ref={viewer} className="brickdoc-pdftron-container" />
        <div className="brickdoc-pdftron-info">
          <FileIcon className="brickdoc-pdftron-info-icon" fileType={fileType} />
          {fileName}
        </div>
      </div>
    </ActionPanel>
  )
}
