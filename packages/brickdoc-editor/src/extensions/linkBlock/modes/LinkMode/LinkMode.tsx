import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { Button, Icon, DeprecatedMenu as Menu, message, Modal, Popover } from '@brickdoc/design-system'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { useEditorI18n } from '../../../../'

export interface LinkModeProps {
  deleteNode: NodeViewProps['deleteNode']
  cover: string
  title: string
  description: string
  linkUrl: string
}

export const LinkMode: React.FC<LinkModeProps> = ({ linkUrl, cover, title, description, deleteNode }) => {
  const [t] = useEditorI18n()
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
        deleteNode()
      }
    })
  }
  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(linkUrl)
    void message.success(t('link_block.copy_hint'))
  }

  return (
    <Button
      data-testid={TEST_ID_ENUM.editor.linkBlock.link.id}
      className="brickdoc-link-block-link"
      onClick={() => window.open(linkUrl, '_blank')}
    >
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
              data-testid={TEST_ID_ENUM.editor.linkBlock.deleteButton.id}
              onClick={info => {
                info.domEvent.stopPropagation()
                handleDelete()
              }}
            >
              <Icon.Delete />
              {t('link_block.menu.delete')}
            </Menu.Item>
            <Menu.Item onClick={handleCopy} key="copy" data-testid={TEST_ID_ENUM.editor.linkBlock.copyButton.id}>
              <Icon.Copy />
              {t('link_block.menu.copy')}
            </Menu.Item>
          </Menu>
        }
      >
        <Button
          data-testid={TEST_ID_ENUM.editor.linkBlock.menuButton.id}
          type="text"
          className="link-block-menu-button"
          onClick={event => event.stopPropagation()}
        >
          <Icon.More className="link-block-menu-icon" />
        </Button>
      </Popover>
    </Button>
  )
}
