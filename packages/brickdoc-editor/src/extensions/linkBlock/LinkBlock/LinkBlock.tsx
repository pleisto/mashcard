/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { Button, Popover, Icon, Menu, Modal, message } from '@brickdoc/design-system'
import { Dashboard, ImportSourceOption, UploadProgress, UploadResultData } from '@brickdoc/uploader'
import { WebsiteMeta } from '..'
import { BlockWrapper } from '../../BlockWrapper'
import { useEditorI18n } from '../../../hooks'
import 'react-medium-image-zoom/dist/styles.css'
import './LinkBlock.less'
import { prependHttp } from '../../helpers/prependHttp'
import { sizeFormat, linkStorage, getFileTypeByExtension } from '../../helpers/file'

export interface LinkBlockAttributes {
  key: string
  source: string
  name?: string
  size?: number
  title?: WebsiteMeta['title']
  description?: WebsiteMeta['description']
  cover?: WebsiteMeta['cover']
  icon?: WebsiteMeta['icon']
}

export const LinkBlock: React.FC<NodeViewProps> = ({ editor, node, getPos, extension, updateAttributes }) => {
  const { t } = useEditorI18n()
  const latestLinkBlockAttributes = React.useRef<Partial<LinkBlockAttributes>>({})
  const updateLinkBlockAttributes = (newAttributes: Partial<LinkBlockAttributes>, type: 'link' | 'attachment'): void => {
    latestLinkBlockAttributes.current = {
      ...latestLinkBlockAttributes.current,
      ...newAttributes
    }

    updateAttributes({
      [type]: {
        __typename: type === 'link' ? 'BlockLink' : 'BlockAttachment',
        ...node.attrs[type],
        ...latestLinkBlockAttributes.current
      }
    })
  }

  const [progress, setProgress] = React.useState<UploadProgress>()
  const onProgress = (progress: UploadProgress): void => setProgress(progress)

  const onUploaded = (data: UploadResultData): void => {
    // external link
    if (data.meta?.source === 'external') {
      data.url = prependHttp(data.url ?? '')
      extension.options.fetchWebsiteMeta(data.url).then(({ success, data }: { success: boolean; data: WebsiteMeta }) => {
        if (!success) return
        updateLinkBlockAttributes({ ...data }, 'link')
      })

      linkStorage.set(node.attrs.uuid, null)
      updateLinkBlockAttributes({ key: data.url, source: data.meta?.source.toUpperCase() }, 'link')

      return
    }

    linkStorage.set(node.attrs.uuid, data.downloadUrl ?? '')
    updateLinkBlockAttributes(
      { key: data.url, source: data.meta?.source.toUpperCase(), size: data.meta?.size, name: data.meta?.name },
      'attachment'
    )
  }

  const fileUrl = extension.options.getAttachmentUrl(node) ?? linkStorage.get(node.attrs.uuid)
  const linkUrl = node.attrs.link?.key

  if (fileUrl) {
    const { name, size } = node.attrs.attachment
    const fileType = getFileTypeByExtension(name)
    return (
      <BlockWrapper editor={editor}>
        <a href={fileUrl} className="brickdoc-link-block-attachment" download={true}>
          {fileType === 'unknown' && <Icon.File />}
          {fileType === 'image' && <Icon.Image />}
          {fileType === 'pdf' && <Icon.FilePdf />}
          <div className="link-block-attachment-content">
            <div className="link-block-attachment-name">{name}</div>
            <div className="link-block-attachment-size">{sizeFormat(size)}</div>
          </div>
          <div className="link-block-attachment-download-icon">
            <Icon.Download />
          </div>
        </a>
      </BlockWrapper>
    )
  }

  if (linkUrl) {
    const { title, description, cover } = node.attrs.link

    const handleDelete = (): void => {
      Modal.confirm({
        title: t('link_block.deletion_confirm.title'),
        okText: t('link_block.deletion_confirm.ok'),
        okButtonProps: {
          danger: true
        },
        cancelText: t('link_block.deletion_confirm.cancel'),
        icon: null,
        onOk: () => {
          const position = getPos()
          const range = { from: position, to: position + node.nodeSize }
          editor.commands.deleteRange(range)
        }
      })
    }
    const handleCopy = async (): Promise<void> => {
      await navigator.clipboard.writeText(linkUrl)
      void message.success(t('link_block.copy_hint'))
    }
    return (
      <BlockWrapper editor={editor}>
        <Button className="brickdoc-link-block-link" onClick={() => window.open(linkUrl, '_blank')}>
          {cover && <div className="link-block-cover" style={{ backgroundImage: `url("${cover}")` }} />}
          <div className="link-block-content">
            {title && <div className="link-block-title">{title}</div>}
            {description && <div className="link-block-description">{description}</div>}
            <div className="link-block-url">{linkUrl}</div>
          </div>
          <Popover
            trigger="click"
            overlayClassName="link-block-menu-popover"
            content={
              <Menu onClick={event => event.domEvent.stopPropagation()}>
                <Menu.Item
                  key="delete"
                  onClick={info => {
                    info.domEvent.stopPropagation()
                    handleDelete()
                  }}
                >
                  <Icon.Delete />
                  {t('link_block.menu.delete')}
                </Menu.Item>
                <Menu.Item onClick={handleCopy} key="copy">
                  <Icon.Copy />
                  {t('link_block.menu.copy')}
                </Menu.Item>
              </Menu>
            }
          >
            <Button type="text" className="link-block-menu-button" onClick={event => event.stopPropagation()}>
              <Icon.More className="link-block-menu-icon" />
            </Button>
          </Popover>
        </Button>
      </BlockWrapper>
    )
  }

  const importSources: ImportSourceOption[] = [
    {
      type: 'link',
      linkInputPlaceholder: t('link_block.import_sources.link.placeholder'),
      buttonText: t('link_block.import_sources.link.button_text'),
      buttonHint: t('link_block.import_sources.link.button_hint')
    },
    {
      type: 'upload',
      buttonText: t('link_block.import_sources.upload.button_text'),
      buttonHint: t('link_block.import_sources.upload.button_hint')
    }
  ]

  return (
    <BlockWrapper editor={editor}>
      <Popover
        overlayClassName="brickdoc-link-block-popover"
        trigger="click"
        placement="bottom"
        content={
          <Dashboard
            blockId={node.attrs.uuid}
            onUploaded={onUploaded}
            onProgress={onProgress}
            importSources={importSources}
            prepareFileUpload={extension.options.prepareFileUpload}
          />
        }
      >
        <Button type="text" className="brickdoc-link-block-placeholder">
          <div className="link-block-progressing" style={{ width: `${progress?.percentage ?? 0}%` }} />
          <Icon.BlockLevelLink className="link-block-icon" />
          <div className="link-block-content">
            {progress ? progress.name : t('link_block.hint')}
            {progress && (
              <div className="link-block-desc">
                {sizeFormat(progress.bytesTotal)} - {progress.percentage}%
              </div>
            )}
          </div>
        </Button>
      </Popover>
    </BlockWrapper>
  )
}
