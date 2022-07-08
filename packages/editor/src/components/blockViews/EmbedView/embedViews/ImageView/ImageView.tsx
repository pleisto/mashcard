import { FC } from 'react'
import { Spin } from '@mashcard/design-system'
import { TEST_ID_ENUM } from '@mashcard/test-helper'
import { Controlled as ImagePreview } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { EmbedAttributes, EmbedViewProps } from '../../../../../extensions/blocks/embed/meta'
import { BlockContainer } from '../../../BlockContainer'
import { UpdateEmbedBlockAttributes } from '../../EmbedView'
import { EmbedToolbar } from '../EmbedToolbar'
import { Resizable } from 're-resizable'
import { useImageState } from './useImageState'
import {
  ImageViewLayout,
  SpinnerWrapper,
  ImageViewContainer,
  Img,
  PreviewButton,
  EmbedToolbarContainer
} from './ImageView.style'
import { useEditorContext } from '../../../../../hooks'

export interface ImageViewProps {
  displayName: string
  url: string
  height?: number | null
  width?: number | null
  align?: EmbedAttributes['image']['align']
  deleteNode: EmbedViewProps['deleteNode']
  getPos: EmbedViewProps['getPos']
  node: EmbedViewProps['node']
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
}

export const ImageView: FC<ImageViewProps> = props => {
  const { displayName, url, align, width: imageWidth, deleteNode, getPos, node, updateEmbedBlockAttributes } = props
  const {
    loaded,
    showPreview,
    setShowPreview,
    actionOptions,
    previewImage,
    onImageLoad,
    resizableProps,
    zoomInImage,
    zoomOutImage
  } = useImageState(props)

  const { documentEditable } = useEditorContext()

  const isFullWidth = align === 'full-width'
  const width = isFullWidth ? '100%' : imageWidth
  // make toolbar center when image is too small
  const embedToolbarCenter = typeof width === 'number' && width < 300

  return (
    <BlockContainer
      node={node}
      contentForCopy={url}
      editable="custom"
      getPos={getPos}
      deleteNode={deleteNode}
      actionOptions={actionOptions}>
      <ImageViewLayout align={align ?? 'center'}>
        {!loaded && (
          <SpinnerWrapper
            css={{ width: width ?? '100%', height: (imageWidth ?? 0) / (node.attrs.image.ratio ?? 1) || '100px' }}>
            <Spin size="lg" />
          </SpinnerWrapper>
        )}
        <ImageViewContainer>
          <Resizable {...resizableProps}>
            <ImagePreview
              wrapStyle={{ pointerEvents: 'none', width: '100%' }}
              overlayBgColorEnd="rgba(153, 153, 153, 0.4)"
              isZoomed={showPreview}
              onZoomChange={setShowPreview}>
              <Img
                data-testid={TEST_ID_ENUM.editor.imageBlock.image.id}
                role="img"
                src={url}
                alt=""
                onLoad={onImageLoad}
                loading={!loaded}
              />
            </ImagePreview>
            <PreviewButton data-testid={TEST_ID_ENUM.editor.imageBlock.zoomInButton.id} onDoubleClick={previewImage} />
          </Resizable>
          {documentEditable && (
            <EmbedToolbarContainer center={embedToolbarCenter}>
              <EmbedToolbar
                url={url}
                displayName={displayName}
                mode="preview"
                blockType="image"
                updateEmbedBlockAttributes={updateEmbedBlockAttributes}
                onFullScreen={previewImage}
                zoomInImage={zoomInImage}
                zoomOutImage={zoomOutImage}
                align={align}
              />
            </EmbedToolbarContainer>
          )}
        </ImageViewContainer>
      </ImageViewLayout>
    </BlockContainer>
  )
}
