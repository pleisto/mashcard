import * as React from 'react'
import { Root, EmojiIcon, ImageIcon } from './DocumentIcon.style'
import { BlockEmoji, BlockImage, Blocktype } from '@/BrickdocGraphQL'

interface DocumentIconImage extends BlockImage {
  type: Blocktype.Image
}

interface DocumentIconEmoji extends BlockEmoji {
  type: Blocktype.Emoji
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
    >
      {documentIconMeta.type === Blocktype.Emoji && (
        <EmojiIcon aria-label={documentIconMeta.name}>{documentIconMeta.emoji}</EmojiIcon>
      )}
      {documentIconMeta.type === Blocktype.Image && (
        <ImageIcon
          css={{
            backgroundImage: `url("${getDocIconUrl() ?? localUrl ?? ''}")`
          }}
        />
      )}
    </Root>
  )
}
