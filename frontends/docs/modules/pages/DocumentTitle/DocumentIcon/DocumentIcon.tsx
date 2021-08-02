import { EmojiMeta } from '@brickdoc/uploader'
import { Button } from '@brickdoc/design-system'
import * as React from 'react'
import styles from './DocumentIcon.module.less'

export interface DocumentIconMeta {
  type: 'image' | 'emoji'
  emoji?: EmojiMeta
  url?: string
}

export interface DocumentIconProps {
  documentIconMeta?: DocumentIconMeta
  onClick?: VoidFunction
}

export const DocumentIcon: React.FC<DocumentIconProps> = ({ documentIconMeta, onClick }) => {
  if (!documentIconMeta) return null

  return (
    <Button type="text" className={styles.icon} onClick={onClick}>
      {documentIconMeta.type === 'emoji' && (
        <span className={styles.emoji} aria-label={documentIconMeta.emoji?.name}>
          {documentIconMeta.emoji?.emoji}
        </span>
      )}
      {documentIconMeta.type === 'image' && <div className={styles.image} style={{ backgroundImage: `url(${documentIconMeta.url})` }} />}
    </Button>
  )
}
