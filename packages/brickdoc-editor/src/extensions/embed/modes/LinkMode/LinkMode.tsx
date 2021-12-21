import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { Button } from '@brickdoc/design-system'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { BlockContainer } from '../../../../components'

export interface LinkModeProps {
  editor: NodeViewProps['editor']
  deleteNode: NodeViewProps['deleteNode']
  cover: string
  title: string
  description: string
  linkUrl: string
}

export const LinkMode: React.FC<LinkModeProps> = ({ linkUrl, cover, title, description, deleteNode }) => {
  return (
    <BlockContainer contentForCopy={linkUrl} deleteNode={deleteNode} actionOptions={['copy', 'delete']}>
      <Button
        data-testid={TEST_ID_ENUM.editor.embedBlock.link.id}
        className="brickdoc-link-block-link"
        onClick={() => window.open(linkUrl, '_blank')}>
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
