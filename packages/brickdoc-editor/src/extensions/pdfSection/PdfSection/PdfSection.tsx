/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react'
import { Resizable } from 're-resizable'
// import cx from 'classnames'
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { Button, Popover, Icon } from '@brickdoc/design-system'
import { Dashboard, UploadResultData, ImportSourceOption, UploadProgress } from '@brickdoc/uploader'
import './styles.less'
import { PdfDocument } from './PdfDocument'

const MAX_WIDTH = 700
const PDF_IMPORT_SOURCES: ImportSourceOption[] = [
  {
    type: 'upload',
    buttonText: 'Choose a file',
    acceptType: 'application/pdf'
  },
  {
    type: 'link',
    linkInputPlaceholder: 'Https://...',
    buttonText: 'Embed PDF',
    buttonHint: 'Embed a PDF file'
  }
]

// TODO: handle pdf load on error
export const PdfSection: React.FC<NodeViewProps> = ({ node, extension, updateAttributes }) => {
  const [file, setFile] = React.useState<File>()
  const [progress, setProgress] = React.useState<UploadProgress>()

  const onProgress = (progress: UploadProgress): void => {
    setProgress(progress)
  }

  const onFileLoaded = (inputFile: File): void => {
    setFile(inputFile)
  }

  const onUploaded = (data: UploadResultData): void => {
    updateAttributes({ url: data.url, blobKey: data.meta?.blobKey })
  }

  const isUploadCompleted = !!node.attrs.blobKey && file

  if (node.attrs.url || isUploadCompleted) {
    return (
      <NodeViewWrapper>
        <div role="dialog" className="brickdoc-block-pdf-section-container">
          <Resizable
            className="pdf-section-control-panel"
            maxWidth="100%"
            minWidth={40}
            handleClasses={{
              left: 'pdf-section-control-left-drag',
              right: 'pdf-section-control-right-drag',
              bottom: 'pdf-section-control-bottom-drag',
              bottomLeft: 'pdf-section-control-bottom-left-drag',
              bottomRight: 'pdf-section-control-bottom-right-drag'
            }}
            handleStyles={{
              left: {
                left: '8px',
                width: '6px',
                height: '40px',
                top: '50%'
              },
              right: {
                right: '8px',
                width: '6px',
                height: '40px',
                top: '50%'
              },
              bottom: {
                width: '40px',
                height: '6px',
                bottom: '8px',
                left: '50%'
              },
              bottomLeft: {
                left: '8px',
                width: '24px',
                height: '24px',
                bottom: '8px',
                cursor: 'nesw-resize'
              },
              bottomRight: {
                right: '8px',
                width: '24px',
                height: '24px',
                bottom: '8px',
                cursor: 'nwse-resize'
              }
            }}
            enable={{
              top: false,
              topLeft: false,
              topRight: false,
              bottom: true,
              bottomLeft: true,
              bottomRight: true,
              left: true,
              right: true
            }}
            size={{
              width: node.attrs.width,
              height: node.attrs.height
            }}
            onResizeStop={(e, direction, ref, d) => {
              updateAttributes({
                width: Math.min(Number(node.attrs.width) + d.width, MAX_WIDTH),
                height: Number(node.attrs.height) + d.height
              })
            }}>
            <div className="pdf-section-menu-button">
              <Icon className="pdf-section-menu-icon" name="more" />
            </div>
            <PdfDocument file={node.attrs.url || file} scale={Number(node.attrs.width) / MAX_WIDTH} />
          </Resizable>
        </div>
      </NodeViewWrapper>
    )
  }

  if (file) {
    return (
      <NodeViewWrapper>
        <Button type="text" className="brickdoc-block-pdf-section">
          <Icon className="pdf-section-icon" name="file-pdf" />
          <div className="pdf-section-content">
            <div className="pdf-section-name">{file.name}</div>
            <div className="pdf-section-desc">
              {(file.size / 1024.0).toFixed(1)}KB - {progress?.percentage}%
            </div>
          </div>
        </Button>
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper>
      <Popover
        overlayClassName="brickdoc-block-pdf-section-popover"
        trigger="click"
        placement="top"
        content={
          <Dashboard
            fileType="pdf"
            prepareFileUpload={extension.options.prepareFileUpload}
            onProgress={onProgress}
            onUploaded={onUploaded}
            onFileLoaded={onFileLoaded}
            importSources={PDF_IMPORT_SOURCES}
          />
        }>
        <Button type="text" className="brickdoc-block-pdf-section">
          <Icon className="pdf-section-icon" name="file-pdf" />
          <div className="pdf-section-hint">Embed a PDF</div>
        </Button>
      </Popover>
    </NodeViewWrapper>
  )
}
