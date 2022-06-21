import { FC } from 'react'
import { Spin, styled, theme } from '@brickdoc/design-system'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { Controlled as ImagePreview } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { EmbedAttributes, EmbedViewProps } from '../../../../../extensions/blocks/embed/meta'
import { BlockContainer } from '../../../BlockContainer'
import { UpdateEmbedBlockAttributes } from '../../EmbedView'
import { EmbedToolbar } from '../EmbedToolbar'
import { Resizable } from 're-resizable'
import { minWidth } from './ImageView.style'
import { useImageState } from './useImageState'

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

const EmbedToolbarContainer = styled('div', {
  background: theme.colors.backgroundPrimary,
  borderRadius: '4px',
  bottom: '.5rem',
  opacity: 0,
  pointerEvents: 'none',
  position: 'absolute',
  right: '.5rem',
  transition: 'opacity 100ms ease-in-out'
})

const ImageViewContainer = styled('div', {
  display: 'inline-flex',
  maxWidth: '100%',
  overflow: 'hidden',
  position: 'relative',

  '&:hover': {
    [`& ${EmbedToolbarContainer}`]: {
      opacity: 1,
      pointerEvents: 'inherit'
    }
  },

  [`[data-rmiz-wrap='hidden'], [data-rmiz-wrap='visible']`]: {
    display: 'flex'
  }
})

const ImageViewLayout = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  variants: {
    align: {
      left: {
        alignItems: 'flex-start'
      },
      center: {
        alignItems: 'center'
      },
      right: {
        alignItems: 'flex-end'
      },
      'full-width': {
        alignItems: 'center',

        [`& ${ImageViewContainer}`]: {
          width: '100%'
        }
      }
    }
  }
})

const Img = styled('img', {
  borderRadius: '4px',
  maxWidth: '100%',
  minWidth: `${minWidth}px`,
  width: '100%',

  variants: {
    loading: {
      true: {
        display: 'none',
        position: 'absolute'
      },
      false: {}
    }
  }
})

const SpinnerWrapper = styled('div', {
  include: ['flexCenter'],

  background: theme.colors.overlaySecondary,
  display: 'flex',
  height: '5.625rem',
  maxWidth: '100%',
  width: '100%'
})

const PreviewButton = styled('button', {
  bottom: 0,
  height: '100%',
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
  width: '100%',

  /* reset styles */
  appearance: 'none',
  background: 'none',
  border: 'none',
  borderRadius: '0',
  color: 'inherit',
  font: 'inherit',
  margin: 0,
  padding: 0
})

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

  const isFullWidth = align === 'full-width'
  const width = isFullWidth ? '100%' : imageWidth

  return (
    <BlockContainer
      node={node}
      contentForCopy={url}
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
          <EmbedToolbarContainer>
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
        </ImageViewContainer>
      </ImageViewLayout>
    </BlockContainer>
  )
}
