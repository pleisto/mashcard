/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react'
import { Resizable } from 're-resizable'
import cx from 'classnames'
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { Controlled as ImagePreview } from 'react-medium-image-zoom'
import { Button, Popover, Icon } from '@brickdoc/design-system'
import { Dashboard, UploadResultData, ImportSourceOption } from '@brickdoc/uploader'
import 'react-medium-image-zoom/dist/styles.css'
import './styles.less'

const MAX_WIDTH = 700
const IMAGE_IMPORT_SOURCES: ImportSourceOption[] = [
  {
    type: 'link',
    linkInputPlaceholder: 'Paste the image link...',
    buttonText: 'Embed image',
    buttonHint: 'Works with any image from the web'
  },
  {
    type: 'upload',
    buttonText: 'Choose an image',
    acceptType: 'image/*'
  },
  {
    type: 'unsplash'
  }
]

function useDoubleClick(fn: VoidFunction): VoidFunction {
  const clickCount = React.useRef(0)
  const clickTimer = React.useRef<any>()

  const onDoubleClick = (): void => {
    clearTimeout(clickTimer.current)
    clickCount.current += 1

    if (clickCount.current >= 2) {
      clickCount.current = 0
      fn()

      return
    }

    clickTimer.current = setTimeout(() => {
      clickCount.current = 0
    }, 200)
  }

  return onDoubleClick
}

export interface ImageSectionAttributes {
  width?: number
  ratio?: number
  key: string
  source: string
  type: string
}

// TODO: handle image load on error
export const ImageSection: React.FC<NodeViewProps> = ({ node, extension, updateAttributes }) => {
  const [file, setFile] = React.useState<string>()
  const latestImageAttributes = React.useRef<Partial<ImageSectionAttributes>>({})
  const updateImageAttributes = (newAttributes: Partial<ImageSectionAttributes>): void => {
    latestImageAttributes.current = {
      ...latestImageAttributes.current,
      ...newAttributes
    }

    if (!node.attrs.image?.source && !latestImageAttributes.current.source) {
      return
    }

    updateAttributes({
      image: {
        ...node.attrs.image,
        ...latestImageAttributes.current
      }
    })
  }

  const onFileLoaded = (inputFile: File): void => {
    const fr = new FileReader()
    fr.readAsDataURL(inputFile)
    fr.onload = function onload() {
      setFile(this.result as string)
    }
  }
  const [loaded, setLoaded] = React.useState(false)
  const [showPreview, setShowPreview] = React.useState(false)
  const previewImage = (): void => {
    if (!(file && !node.attrs.image?.key) && !loaded) return
    setShowPreview(true)
  }
  const onDoubleClick = useDoubleClick(previewImage)
  const onUploaded = (data: UploadResultData): void => {
    updateImageAttributes({ key: data.url, source: data.meta?.source.toUpperCase() })
  }
  const onImageLoad = (event: React.SyntheticEvent<HTMLImageElement>): void => {
    const img = event.target as HTMLImageElement
    // Update image dimensions on loaded if there is no dimensions data before
    if (!node.attrs.image?.ratio) {
      updateImageAttributes({ width: Math.min(MAX_WIDTH, img.naturalWidth), ratio: img.naturalWidth / img.naturalHeight })
    }
    setLoaded(true)
  }

  if (node.attrs.image?.key || file) {
    const url = extension.options.getImageUrl?.(node) || file

    return (
      <NodeViewWrapper>
        <div role="dialog" className="brickdoc-block-image-section-container" onClick={onDoubleClick}>
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
              width: node.attrs.image.width ?? '100%',
              height: 'auto'
            }}
            onResizeStop={(e, direction, ref, d) => {
              updateImageAttributes({
                width: Math.min(Number(node.attrs.image?.width) + d.width, MAX_WIDTH)
              })
            }}>
            <div className="image-section-menu-button">
              <Icon className="image-section-menu-icon" name="more" />
            </div>
            <ImagePreview
              wrapStyle={{ pointerEvents: 'none', width: '100%' }}
              overlayBgColorEnd="rgba(153, 153, 153, 0.4)"
              isZoomed={showPreview}
              onZoomChange={shouldZoom => {
                setShowPreview(shouldZoom)
              }}>
              <img className={cx('brickdoc-block-image', { loading: !loaded })} src={url} alt="" onLoad={onImageLoad} />
            </ImagePreview>
          </Resizable>
        </div>
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper>
      <Popover
        overlayClassName="brickdoc-block-image-section-popover"
        trigger="click"
        placement="top"
        content={
          <Dashboard
            fileType="image"
            blockId={node.attrs.uuid}
            prepareFileUpload={extension.options.prepareFileUpload}
            fetchUnsplashImages={extension.options.fetchUnsplashImages}
            onUploaded={onUploaded}
            onFileLoaded={onFileLoaded}
            importSources={IMAGE_IMPORT_SOURCES}
          />
        }>
        <Button type="text" className="brickdoc-block-image-section">
          <Icon className="image-section-icon" name="image" />
          <div className="image-section-hint">Add an image</div>
        </Button>
      </Popover>
    </NodeViewWrapper>
  )
}
