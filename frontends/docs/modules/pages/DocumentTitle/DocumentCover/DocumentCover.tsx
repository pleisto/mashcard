import * as React from 'react'
import cx from 'classnames'
import styles from './DocumentCover.module.less'
import { Button, Popover, PopoverProps } from '@brickdoc/design-system'

export interface DocumentCoverMeta {
  type: 'image' | 'color'
  color?: string
  url?: string
}

export interface DocumentCoverProps {
  documentCoverMeta?: DocumentCoverMeta | null
  popoverProps: PopoverProps
}

export const DocumentCover: React.FC<DocumentCoverProps> = ({ documentCoverMeta, popoverProps }) => {
  const value = documentCoverMeta ? documentCoverMeta.color ?? `url(${documentCoverMeta.url})` : 'unset'
  return (
    <div
      className={cx(styles.cover, { [styles.uncover]: !documentCoverMeta })}
      style={{
        backgroundImage: value,
        backgroundColor: value
      }}>
      <div className={styles.buttons}>
        {documentCoverMeta && (
          <Popover {...popoverProps}>
            <Button className={styles.button} type="text">
              Change cover
            </Button>
          </Popover>
        )}
        {/* TODO: cover reposition */}
        <Button className={styles.button} type="text">
          Reposition
        </Button>
      </div>
    </div>
  )
}
