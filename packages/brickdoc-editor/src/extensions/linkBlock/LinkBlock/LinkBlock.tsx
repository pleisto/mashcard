/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react'
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { Button, Popover, Icon, Menu } from '@brickdoc/design-system'
import { Dashboard, ImportSourceOption, UploadResultData } from '@brickdoc/uploader'
import 'react-medium-image-zoom/dist/styles.css'
import './LinkBlock.css'

const IMPORT_SOURCES: ImportSourceOption[] = [
  {
    type: 'link',
    linkInputPlaceholder: 'Paste in https://...',
    buttonText: 'Embed',
    buttonHint: 'Works with Block-level link projects'
  }
]

export interface LinkBlockAttributes {
  key: string
  source: string
}

export const LinkBlock: React.FC<NodeViewProps> = ({ editor, node, getPos, extension, updateAttributes }) => {
  const latestLinkBlockAttributes = React.useRef<Partial<LinkBlockAttributes>>({})
  const updateLinkBlockAttributes = (newAttributes: Partial<LinkBlockAttributes>): void => {
    latestLinkBlockAttributes.current = {
      ...latestLinkBlockAttributes.current,
      ...newAttributes
    }

    updateAttributes({
      link: {
        ...node.attrs.link,
        ...latestLinkBlockAttributes.current
      }
    })
  }

  const onUploaded = (data: UploadResultData): void => {
    updateLinkBlockAttributes({ key: data.url, source: data.meta?.source.toUpperCase() })
  }

  if (node.attrs.link.key) {
    const { key: url, title, description, cover } = node.attrs.link
    const handleDelete = (): void => {
      const from = getPos()
      editor.commands.deleteRange({ from, to: from + node.nodeSize })
    }
    const handleCopy = (): void => {
      void navigator.clipboard.writeText(url)
    }
    return (
      <NodeViewWrapper>
        <Button type="text" className="brickdoc-link-block" onClick={() => window.open(url, '_blank')}>
          {cover && <div className="link-block-cover" style={{ backgroundImage: `url(${cover})` }} />}
          <div className="link-block-content">
            {title && <div className="link-block-title">{title}</div>}
            {description && <div className="link-block-description">{description}</div>}
            <div className="link-block-url">{url}</div>
          </div>
          <Popover
            trigger="click"
            content={
              <Menu onClick={event => event.domEvent.stopPropagation()}>
                <Menu.Item
                  onClick={info => {
                    info.domEvent.stopPropagation()
                    handleDelete()
                  }}
                >
                  <Icon.Delete />
                  Delete
                </Menu.Item>
                <Menu.Item onClick={handleCopy}>
                  <Icon.Copy />
                  Copy link
                </Menu.Item>
              </Menu>
            }
          >
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
        content={<Dashboard onUploaded={onUploaded} importSources={IMPORT_SOURCES} />}
      >
        <Button type="text" className="brickdoc-link-block-placeholder">
          <Icon.BlockLevelLink className="link-block-icon" />
          <div className="link-block-hint">Embed anything</div>
        </Button>
      </Popover>
    </NodeViewWrapper>
  )
}
