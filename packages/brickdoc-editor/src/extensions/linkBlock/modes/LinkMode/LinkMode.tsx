import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { Button, Icon, message, Modal } from '@brickdoc/design-system'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { useEditorI18n } from '../../../../'
import { ActionOptionGroup, BlockContainer } from '../../../../components'

export interface LinkModeProps {
  editor: NodeViewProps['editor']
  deleteNode: NodeViewProps['deleteNode']
  cover: string
  title: string
  description: string
  linkUrl: string
}

export const LinkMode: React.FC<LinkModeProps> = ({ linkUrl, editor, cover, title, description, deleteNode }) => {
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

  const actionOptions: ActionOptionGroup = [
    [
      {
        type: 'button',
        onClick: handleCopy,
        Icon: <Icon.Copy />
      }
    ],
    {
      type: 'button',
      onClick: handleDelete,
      Icon: <Icon.Delete />
    }
  ]

  return (
    <BlockContainer actionOptions={actionOptions} editor={editor}>
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
      </Button>
    </BlockContainer>
  )
}
