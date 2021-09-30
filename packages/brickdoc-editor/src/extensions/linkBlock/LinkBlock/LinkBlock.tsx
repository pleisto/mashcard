/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react'
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { Button, Popover, Icon, Menu } from '@brickdoc/design-system'
import { Dashboard, ImportSourceOption, UploadResultData } from '@brickdoc/uploader'
import 'react-medium-image-zoom/dist/styles.css'
import './LinkBlock.css'
import { WebsiteMeta } from '..'

const IMPORT_SOURCES: ImportSourceOption[] = [
  {
    type: 'link',
    linkInputPlaceholder: 'Paste in https://...',
    buttonText: 'Embed',
    buttonHint: 'Works with Block-level link projects'
  },
  {
    type: 'upload',
    buttonText: 'Choose an file',
    buttonHint: 'Recommended size is 5MB'
  }
]

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

const sizeFormat = (size?: number): string => {
  if (size === undefined) return ''
  if (size < 1024) return `${size} b`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`

  return `${(size / 1024 / 1024).toFixed(1)} MB`
}

export const LinkBlock: React.FC<NodeViewProps> = ({ editor, node, getPos, extension, updateAttributes }) => {
  const latestLinkBlockAttributes = React.useRef<Partial<LinkBlockAttributes>>({})
  const updateLinkBlockAttributes = (newAttributes: Partial<LinkBlockAttributes>, type: 'link' | 'attachment'): void => {
    latestLinkBlockAttributes.current = {
      ...latestLinkBlockAttributes.current,
      ...newAttributes
    }

    updateAttributes({
      [type]: {
        ...node.attrs[type],
        ...latestLinkBlockAttributes.current
      }
    })
  }

  const [attachmentUrl, setAttachmentUrl] = React.useState('')

  const onUploaded = (data: UploadResultData): void => {
    // external link
    if (data.meta?.source === 'external') {
      extension.options.fetchWebsiteMeta(data.url).then(({ success, data }: { success: boolean; data: WebsiteMeta }) => {
        if (!success) return
        updateLinkBlockAttributes({ ...data }, 'link')
      })

      setAttachmentUrl('')
      updateLinkBlockAttributes({ key: data.url, source: data.meta?.source.toUpperCase() }, 'link')

      return
    }

    setAttachmentUrl(data.viewUrl ?? '')
    updateLinkBlockAttributes(
      { key: data.url, source: data.meta?.source.toUpperCase(), size: data.meta?.size, name: data.meta?.name },
      'attachment'
    )
  }

  const fileUrl = extension.options.getAttachmentUrl(node) || attachmentUrl
  const linkUrl = node.attrs.link?.key

  console.log(fileUrl, linkUrl)

  if (fileUrl) {
    const { name, size } = node.attrs.attachment
    return (
      <NodeViewWrapper>
        <a href={fileUrl} className="brickdoc-link-block-attachment" download={true}>
          <Icon.File />
          <div className="link-block-attachment-content">
            <div className="link-block-attachment-name">{name}</div>
            <div className="link-block-attachment-size">{sizeFormat(size)}</div>
          </div>
          <div className="link-block-attachment-download-icon">
            <Icon.Download />
          </div>
        </a>
      </NodeViewWrapper>
    )
  }

  if (linkUrl) {
    const { title, description, cover } = node.attrs.link

    const handleDelete = (): void => {
      const from = getPos()
      editor.commands.deleteRange({ from, to: from + node.nodeSize })
    }
    const handleCopy = (): void => {
      void navigator.clipboard.writeText(linkUrl)
    }
    return (
      <NodeViewWrapper>
        <Button className="brickdoc-link-block-link" onClick={() => window.open(linkUrl, '_blank')}>
          {cover && <div className="link-block-cover" style={{ backgroundImage: `url(${cover})` }} />}
          <div className="link-block-content">
            {title && <div className="link-block-title">{title}</div>}
            {description && <div className="link-block-description">{description}</div>}
            <div className="link-block-url">{linkUrl}</div>
          </div>
          <Popover
            trigger="click"
            content={
              <Menu onClick={event => event.domEvent.stopPropagation()}>
                <Menu.Item
                  onClick={info => {
                    info.domEvent.stopPropagation()
                    handleDelete()
                  }}>
                  <Icon.Delete />
                  Delete
                </Menu.Item>
                <Menu.Item onClick={handleCopy}>
                  <Icon.Copy />
                  Copy link
                </Menu.Item>
              </Menu>
            }>
            <Button type="text" className="link-block-menu-button" onClick={event => event.stopPropagation()}>
              <Icon.More className="link-block-menu-icon" />
            </Button>
          </Popover>
        </Button>
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper>
      <Popover
        overlayClassName="brickdoc-link-block-popover"
        trigger="click"
        placement="top"
        content={
          <Dashboard
            blockId={node.attrs.uuid}
            onUploaded={onUploaded}
            importSources={IMPORT_SOURCES}
            prepareFileUpload={extension.options.prepareFileUpload}
          />
        }>
        <Button type="text" className="brickdoc-link-block-placeholder">
          <Icon.BlockLevelLink className="link-block-icon" />
          <div className="link-block-hint">Embed anything</div>
        </Button>
      </Popover>
    </NodeViewWrapper>
  )
}
