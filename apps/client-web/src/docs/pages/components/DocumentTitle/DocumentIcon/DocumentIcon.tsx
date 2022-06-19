import * as React from 'react'
import { Root, EmojiIcon, ImageIcon } from './DocumentIcon.style'
import { BlockEmoji, BlockImage, BlockType } from '@/BrickdocGraphQL'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'

interface DocumentIconImage extends BlockImage {
  type: BlockType.Image
}

interface DocumentIconEmoji extends BlockEmoji {
  type: BlockType.Emoji
}

export type DocumentIconMeta = DocumentIconImage | DocumentIconEmoji

export interface DocumentIconProps {
  documentIconMeta?: DocumentIconMeta
  localUrl?: string
  onClick?: VoidFunction
  getDocIconUrl: () => string | undefined
}

export const DocumentIcon: React.FC<DocumentIconProps> = ({ documentIconMeta, onClick, getDocIconUrl, localUrl }) => {
  if (!documentIconMeta) return null

  return (
    <Root
      type="unstyled"
      onClick={onClick}
      width={{
        '@smDown': 'sm'
      }}
      data-testid={TEST_ID_ENUM.page.DocumentPage.titleIcon.id}>
      {documentIconMeta.type === BlockType.Emoji && (
        <EmojiIcon aria-label={documentIconMeta.name}>{documentIconMeta.emoji}</EmojiIcon>
      )}
      {documentIconMeta.type === BlockType.Image && (
        <ImageIcon
          css={{
            backgroundImage: `url("${getDocIconUrl() ?? localUrl ?? ''}")`
          }}
        />
      )}
    </Root>
  )
}
