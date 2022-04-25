import { FC, useRef, useState } from 'react'
import { WebViewerInstance } from '@pdftron/webviewer'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { FileIcon } from '../../../../ui'
import { FileType } from '../../../../../helpers/file'
import { useActionOptions } from '../useActionOptions'
import { useAttachmentMethods, UseAttachmentMethodsProps } from '../useAttachmentMethods'
import './PreviewMode.less'
import { BlockContainer } from '../../../BlockContainer'
import { Spin, styled } from '@brickdoc/design-system'
import { useWebViewer } from './useWebViewer'
import { EmbedViewProps } from '../../../../../extensions/blocks/embed/meta'
import { EmbedBlockType } from '../../EmbedView'

const containerHeight = 472

const PreviewContainer = styled('div', {
  height: `${containerHeight / 16}rem`,
  variants: {
    ready: {
      false: {
        height: 0
      },
      true: {
        height: `${containerHeight / 16}rem`
      }
    }
  }
})

export interface CardViewProps extends Omit<UseAttachmentMethodsProps, 'webViewer'> {
  blockType: EmbedBlockType
  deleteNode: EmbedViewProps['deleteNode']
  getPos: EmbedViewProps['getPos']
  node: EmbedViewProps['node']
  fileName: string
  fileType: FileType
}

export const CardView: FC<CardViewProps> = ({
  deleteNode,
  getPos,
  fileName,
  fileType,
  node,
  ...attachmentMethodsProps
}) => {
  const viewer = useRef<HTMLDivElement>(null)
  const [documentReady, setDocumentReady] = useState(false)
  const [viewerInstance, setViewerInstance] = useState<WebViewerInstance>()

  useWebViewer(fileType, attachmentMethodsProps.fileUrl, viewer, instance => {
    setViewerInstance(instance)
    instance.UI.setFitMode(instance.UI.FitMode.FitWidth)
    const { documentViewer } = instance.Core
    documentViewer.addEventListener('documentLoaded', () => {
      setDocumentReady(true)
    })
  })

  const [{ onDownload, onFullScreen }] = useAttachmentMethods({
    webViewer: viewerInstance,
    ...attachmentMethodsProps
  })

  const [actionOptions] = useActionOptions({
    mode: 'preview',
    onDownload,
    onFullScreen
  })

  return (
    <BlockContainer
      node={node}
      contentForCopy={attachmentMethodsProps.fileUrl}
      deleteNode={deleteNode}
      getPos={getPos}
      actionOptions={actionOptions}
    >
      <div data-testid={TEST_ID_ENUM.editor.embedBlock.pdftron.id} className="brickdoc-pdftron-block">
        {!documentReady && (
          <div className="spining-wrapper" style={{ height: containerHeight }}>
            <Spin className="spin" size="lg" />
          </div>
        )}
        <PreviewContainer ref={viewer} ready={documentReady} />
        <div className="brickdoc-pdftron-info">
          <FileIcon className="brickdoc-pdftron-info-icon" fileType={fileType} />
          {fileName}
        </div>
      </div>
    </BlockContainer>
  )
}
