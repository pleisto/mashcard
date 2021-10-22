import { Button } from '@brickdoc/design-system'
import * as React from 'react'
import styles from './DocumentIcon.module.less'
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
    <Button type="text" className={styles.icon} onClick={onClick}>
      {documentIconMeta.type === Blocktype.Emoji && (
        <span className={styles.emoji} aria-label={documentIconMeta.name}>
          {documentIconMeta.emoji}
        </span>
      )}
      {documentIconMeta.type === Blocktype.Image && (
        <div className={styles.image} style={{ backgroundImage: `url("${getDocIconUrl() ?? localUrl ?? ''}")` }} />
      )}
    </Button>
  )
}
