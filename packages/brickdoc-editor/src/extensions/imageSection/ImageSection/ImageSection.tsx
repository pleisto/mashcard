/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react'
import { Resizable } from 're-resizable'
import cx from 'classnames'
import { NodeViewProps } from '@tiptap/react'
import { Controlled as ImagePreview } from 'react-medium-image-zoom'
import { message, Button, Modal, Popover, Icon, Skeleton, Menu } from '@brickdoc/design-system'
import { Dashboard, UploadResultData, ImportSourceOption, imperativeUpload, UploadProgress } from '@brickdoc/uploader'
import { BlockWrapper } from '../../BlockWrapper'
import { useEditorI18n } from '../../../hooks'
import { linkStorage, sizeFormat } from '../../helpers/file'
import 'react-medium-image-zoom/dist/styles.css'
import './styles.less'

const MAX_WIDTH = 700

export interface ImageSectionAttributes {
  width?: number
  ratio?: number
  key: string
  source: string
  type: string
}

// TODO: handle image load on error
export const ImageSection: React.FC<NodeViewProps> = ({ editor, node, extension, getPos, updateAttributes }) => {
  const { t } = useEditorI18n()
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
        ...latestImageAttributes.current,
        // remove defaultFile prop
        defaultFile: undefined
      }
    })
  }

  const [loaded, setLoaded] = React.useState(false)
  const [showPreview, setShowPreview] = React.useState(false)
  const previewImage = (): void => {
    if ((node.attrs.image?.key && !loaded) || showPreview) return
    setShowPreview(true)
  }
  const onUploaded = (data: UploadResultData): void => {
    linkStorage.set(node.attrs.uuid, data.viewUrl!)
    updateImageAttributes({ key: data.url, source: data.meta?.source.toUpperCase() })
  }
  const [progress, setProgress] = React.useState<UploadProgress>()
  const onProgress = (progress: UploadProgress): void => setProgress(progress)

  const onImageLoad = (event: React.SyntheticEvent<HTMLImageElement>): void => {
    const img = event.target as HTMLImageElement
    // Update image dimensions on loaded if there is no dimensions data before
    if (!node.attrs.image?.ratio) {
      updateImageAttributes({ width: Math.min(MAX_WIDTH, img.naturalWidth), ratio: img.naturalWidth / img.naturalHeight })
    }
    setLoaded(true)
  }

  // upload default file
  React.useEffect(() => {
    if (!node.attrs.defaultFile) return
    void imperativeUpload(node.attrs.defaultFile, {
      prepareFileUpload: extension.options.prepareFileUpload,
      blockId: node.attrs.uuid,
      fileType: 'image',
      onUploaded
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (node.attrs.image?.key) {
    const url = extension.options.getImageUrl?.(node) ?? linkStorage.get(node.attrs.uuid)

    const handleCopy = async (): Promise<void> => {
      await navigator.clipboard.writeText(url)
      void message.success(t('image_section.copy_hint'))
    }

    const handleDelete = (): void => {
      Modal.confirm({
        title: t('image_section.deletion_confirm.title'),
        okText: t('image_section.deletion_confirm.ok'),
        okButtonProps: {
          danger: true
        },
        cancelText: t('image_section.deletion_confirm.cancel'),
        icon: null,
        onOk: () => {
          const position = getPos()
          const range = { from: position, to: position + node.nodeSize }
          editor.commands.deleteRange(range)
        }
      })
    }

    return (
      <BlockWrapper editor={editor}>
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
            <Popover
              trigger="click"
              placement="bottom"
              overlayClassName="image-section-menu-popover"
              content={
                <Menu className="image-section-menu">
                  <Menu.Item key="copy" onClick={handleCopy}>
                    <Icon.Copy />
                    {t('image_section.menu.copy')}
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="delete" onClick={handleDelete}>
                    <Icon.Delete />
                    {t('image_section.menu.delete')}
                  </Menu.Item>
                </Menu>
              }
            >
              <div className="image-section-menu-button">
                <Icon.More className="image-section-menu-icon" />
              </div>
            </Popover>
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
              <img role="img" className={cx('brickdoc-block-image', { loading: !loaded })} src={url} alt="" onLoad={onImageLoad} />
            </ImagePreview>
            <button className="image-section-zoom-in-button" onDoubleClick={previewImage} />
          </Resizable>
        </div>
      </BlockWrapper>
    )
  }

  const importSources: ImportSourceOption[] = [
    {
      type: 'link',
      linkInputPlaceholder: t('image_section.import_sources.link.placeholder'),
      buttonText: t('image_section.import_sources.link.button_text'),
      buttonHint: t('image_section.import_sources.link.button_hint')
    },
    {
      type: 'upload',
      buttonText: t('image_section.import_sources.upload.button_text'),
      acceptType: 'image/*'
    },
    {
      type: 'unsplash'
    }
  ]

  return (
    <BlockWrapper editor={editor}>
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
            onProgress={onProgress}
            importSources={importSources}
          />
        }
      >
        <Button type="text" className="brickdoc-block-image-section">
          <div className="image-section-progressing" style={{ width: `${progress?.percentage ?? 0}%` }} />
          <Icon.Image className="image-section-icon" />
          <div className="image-section-content">
            {progress ? progress.name : t('image_section.hint')}
            {progress && (
              <div className="image-section-desc">
                {sizeFormat(progress.bytesTotal)} - {progress.percentage}%
              </div>
            )}
          </div>
        </Button>
      </Popover>
    </BlockWrapper>
  )
}
