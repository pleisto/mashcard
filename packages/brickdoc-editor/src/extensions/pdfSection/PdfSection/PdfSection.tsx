/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react'
import { Resizable } from 're-resizable'
import { NodeViewProps } from '@tiptap/react'
import { Button, Popover, Icon } from '@brickdoc/design-system'
import { Dashboard, UploadResultData, ImportSourceOption, UploadProgress } from '@brickdoc/uploader'
import { PdfDocument } from './PdfDocument'
import { BlockWrapper } from '../../BlockWrapper'
import { useEditorI18n } from '../../../hooks'
import './styles.less'

const MAX_WIDTH = 700

export interface PdfSectionAttributes {
  width?: number
  height?: number
  key: string
  source: string
  type: string
}

// TODO: handle pdf load on error
export const PdfSection: React.FC<NodeViewProps> = ({ editor, node, extension, updateAttributes }) => {
  const { t } = useEditorI18n()
  const latestPdfAttributes = React.useRef<Partial<PdfSectionAttributes>>({})
  const updatePdfAttributes = (newAttributes: Partial<PdfSectionAttributes>): void => {
    latestPdfAttributes.current = {
      ...latestPdfAttributes.current,
      ...newAttributes
    }

    if (!node.attrs.attachment?.source && !latestPdfAttributes.current.source) {
      return
    }

    updateAttributes({
      attachment: {
        ...node.attrs.attachment,
        ...latestPdfAttributes.current
      }
    })
  }

  const [file, setFile] = React.useState<File>()
  const [progress, setProgress] = React.useState<UploadProgress>()

  const onProgress = (progress: UploadProgress): void => {
    setProgress(progress)
  }

  const onFileLoaded = (inputFile: File): void => {
    setFile(inputFile)
  }

  const onUploaded = (data: UploadResultData): void => {
    updatePdfAttributes({ key: data.url, source: data.meta?.source.toUpperCase() })
  }

  const isUploadCompleted = !!node.attrs.attachment.source && file

  if (node.attrs.attachment.key || isUploadCompleted) {
    const url = extension.options.getAttachmentUrl?.(node) || file

    return (
      <BlockWrapper editor={editor}>
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
              width: node.attrs.attachment.width,
              height: node.attrs.attachment.height
            }}
            onResizeStop={(e, direction, ref, d) => {
              updatePdfAttributes({
                width: Math.min(Number(node.attrs.attachment.width) + d.width, MAX_WIDTH),
                height: Number(node.attrs.attachment.height) + d.height
              })
            }}
          >
            <div className="pdf-section-menu-button">
              <Icon.More className="pdf-section-menu-icon" />
            </div>
            <PdfDocument file={url} scale={Number(node.attrs.attachment.width) / MAX_WIDTH} />
          </Resizable>
        </div>
      </BlockWrapper>
    )
  }

  if (file) {
    return (
      <BlockWrapper editor={editor}>
        <Button type="text" className="brickdoc-block-pdf-section">
          <Icon.FilePdf className="pdf-section-icon" />
          <div className="pdf-section-content">
            <div className="pdf-section-name">{file.name}</div>
            <div className="pdf-section-desc">
              {(file.size / 1024.0).toFixed(1)}KB - {progress?.percentage}%
            </div>
          </div>
        </Button>
      </BlockWrapper>
    )
  }

  const importSources: ImportSourceOption[] = [
    {
      type: 'upload',
      buttonText: t('pdf_section.import_sources.upload.button_text'),
      acceptType: 'application/pdf'
    },
    {
      type: 'link',
      linkInputPlaceholder: t('pdf_section.import_sources.link.placeholder'),
      buttonText: t('pdf_section.import_sources.link.button_text'),
      buttonHint: t('pdf_section.import_sources.link.button_hint')
    }
  ]

  return (
    <BlockWrapper editor={editor}>
      <Popover
        overlayClassName="brickdoc-block-pdf-section-popover"
        trigger="click"
        placement="top"
        content={
          <Dashboard
            blockId={node.attrs.uuid}
            fileType="pdf"
            prepareFileUpload={extension.options.prepareFileUpload}
            onProgress={onProgress}
            onUploaded={onUploaded}
            onFileLoaded={onFileLoaded}
            importSources={importSources}
          />
        }
      >
        <Button type="text" className="brickdoc-block-pdf-section">
          <Icon.FilePdf className="pdf-section-icon" />
          <div className="pdf-section-hint">{t('pdf_section.hint')}</div>
        </Button>
      </Popover>
    </BlockWrapper>
  )
}
