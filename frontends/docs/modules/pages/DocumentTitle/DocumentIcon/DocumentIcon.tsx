import { Button } from '@brickdoc/design-system'
import * as React from 'react'
import styles from './DocumentIcon.module.less'
import { BlockEmoji, BlockImage } from '@/BrickdocGraphQL'

interface DocumentIconImage extends Omit<BlockImage, '__typename'> {
  type: 'image'
}

interface DocumentIconEmoji extends Pick<BlockEmoji, 'emoji' | 'name'> {
  type: 'emoji'
}

export type DocumentIconMeta = DocumentIconImage | DocumentIconEmoji

export interface DocumentIconProps {
  documentIconMeta?: DocumentIconMeta
  onClick?: VoidFunction
}

export const DocumentIcon: React.FC<DocumentIconProps> = ({ documentIconMeta, onClick }) => {
  if (!documentIconMeta) return null

  return (
    <Button type="text" className={styles.icon} onClick={onClick}>
      {documentIconMeta.type === 'emoji' && (
        <span className={styles.emoji} aria-label={documentIconMeta.name}>
          {documentIconMeta.emoji}
        </span>
      )}
      {documentIconMeta.type === 'image' && <div className={styles.image} style={{ backgroundImage: `url(${documentIconMeta.url})` }} />}
    </Button>
  )
}
