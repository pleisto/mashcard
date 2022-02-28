import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { WebViewerInstance } from '@pdftron/webviewer'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { FileIcon } from '../../../FileIcon'
import { FileType } from '../../../../helpers/file'
import { useActionOptions } from '../useActionOptions'
import { useAttachmentMethods, UseAttachmentMethodsProps } from '../useAttachmentMethods'
import './PreviewMode.less'
import { BlockContainer } from '../../../../components'
import { Skeleton, styled } from '@brickdoc/design-system'
import { useWebViewer } from './useWebViewer'

const containerHeight = '29.5rem'

const PreviewContainer = styled('div', {
  height: containerHeight,
  variants: {
    ready: {
      false: {
        height: 0
      },
      true: {
        height: containerHeight
      }
    }
  }
})

export interface PreviewModeProps extends Omit<UseAttachmentMethodsProps, 'webViewer'> {
  deleteNode: NodeViewProps['deleteNode']
  getPos: NodeViewProps['getPos']
  fileName: string
  fileType: FileType
}

export const PreviewMode: React.FC<PreviewModeProps> = ({
  deleteNode,
  getPos,
  fileName,
  fileType,
  ...attachmentMethodsProps
}) => {
  const viewer = React.useRef<HTMLDivElement>(null)
  const [documentReady, setDocumentReady] = React.useState(false)
  const [viewerInstance, setViewerInstance] = React.useState<WebViewerInstance>()

  useWebViewer(fileType, attachmentMethodsProps.fileUrl, viewer, instance => {
    setViewerInstance(instance)
    instance.UI.setFitMode(instance.UI.FitMode.FitWidth)
    const { documentViewer } = instance.Core
    documentViewer.addEventListener('documentLoaded', () => {
      setDocumentReady(true)
    })
  })

  const [{ onDownload, onToLinkMode, onFullScreen, onToPreviewMode }] = useAttachmentMethods({
    webViewer: viewerInstance,
    ...attachmentMethodsProps
  })

  const [actionOptions] = useActionOptions({
    mode: 'preview',
    onDownload,
    onToLinkMode,
    onToPreviewMode,
    onFullScreen
  })

  return (
    <BlockContainer
      contentForCopy={attachmentMethodsProps.fileUrl}
      deleteNode={deleteNode}
      getPos={getPos}
      actionOptions={actionOptions}
    >
      <div data-testid={TEST_ID_ENUM.editor.embedBlock.pdftron.id} className="brickdoc-pdftron-block">
        {!documentReady && <Skeleton height={containerHeight} />}
        <PreviewContainer ref={viewer} ready={documentReady} />
        <div className="brickdoc-pdftron-info">
          <FileIcon className="brickdoc-pdftron-info-icon" fileType={fileType} />
          {fileName}
        </div>
      </div>
    </BlockContainer>
  )
}
