import React from 'react'
import cx from 'classnames'
import { NodeViewProps } from '@tiptap/react'
import { Controlled as ImagePreview } from 'react-medium-image-zoom'
import { BlockContainer } from '../../../../components'
import { Resizable } from 're-resizable'
import { Skeleton } from '@brickdoc/design-system'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'

const MAX_WIDTH = 700

export interface PreviewModeProps {
  node: NodeViewProps['node']
  deleteNode: NodeViewProps['deleteNode']
  url: string
  updateImageAttributes: (attrs: Record<string, any>) => void
}

export const PreviewMode: React.FC<PreviewModeProps> = ({ node, deleteNode, url, updateImageAttributes }) => {
  const [loaded, setLoaded] = React.useState(false)
  const [showPreview, setShowPreview] = React.useState(false)

  const previewImage = (): void => {
    if ((node.attrs.image?.key && !loaded) || showPreview) return
    setShowPreview(true)
  }

  const onImageLoad = (event: React.SyntheticEvent<HTMLImageElement>): void => {
    const img = event.target as HTMLImageElement
    // Update image dimensions on loaded if there is no dimensions data before
    if (!node.attrs.image?.ratio) {
      updateImageAttributes({
        width: Math.min(MAX_WIDTH, img.naturalWidth),
        ratio: img.naturalWidth / img.naturalHeight
      })
    }
    setLoaded(true)
  }

  return (
    <BlockContainer contentForCopy={url} deleteNode={deleteNode} actionOptions={['copy', 'delete']}>
      <div role="cell" className="brickdoc-block-image-section-container">
        <Resizable
          lockAspectRatio={true}
          className="image-section-control-panel"
          maxWidth="100%"
          minWidth={40}
          handleClasses={{
            left: 'image-section-control-left-drag',
            right: 'image-section-control-right-drag'
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
            }
          }}
          enable={{
            top: false,
            topLeft: false,
            topRight: false,
            bottom: false,
            bottomLeft: false,
            bottomRight: false,
            left: true,
            right: true
          }}
          size={{
            width: node.attrs.image.width ?? 'unset',
            height: 'auto'
          }}
          onResizeStop={(e, direction, ref, d) => {
            updateImageAttributes({
              width: Math.min(Number(node.attrs.image?.width) + d.width, MAX_WIDTH)
            })
          }}
        >
          <ImagePreview
            wrapStyle={{ pointerEvents: 'none', width: '100%' }}
            overlayBgColorEnd="rgba(153, 153, 153, 0.4)"
            isZoomed={showPreview}
            onZoomChange={shouldZoom => {
              setShowPreview(shouldZoom)
            }}
          >
            {!loaded && (
              <Skeleton.Image
                style={
                  node.attrs.image.width
                    ? { width: node.attrs.image.width, height: node.attrs.image.width / node.attrs.image.ratio }
                    : { width: MAX_WIDTH }
                }
              />
            )}
            <img
              data-testid={TEST_ID_ENUM.editor.imageBlock.image.id}
              role="img"
              className={cx('brickdoc-block-image', { loading: !loaded })}
              src={url}
              alt=""
              onLoad={onImageLoad}
            />
          </ImagePreview>
          <button
            data-testid={TEST_ID_ENUM.editor.imageBlock.zoomInButton.id}
            className="image-section-zoom-in-button"
            onDoubleClick={previewImage}
          />
        </Resizable>
      </div>
    </BlockContainer>
  )
}
