import * as React from 'react'
import cx from 'classnames'
import styles from './DocumentCover.module.less'
import { Button, Popover, PopoverProps } from '@brickdoc/design-system'
import { BlockColor, BlockImage, Blocktype } from '@/BrickdocGraphQL'

interface DocumentCoverImage extends Omit<BlockImage, '__typename'> {
  type: Blocktype.Image
}

interface DocumentCoverColor extends Omit<BlockColor, '__typename'> {
  type: Blocktype.Color
}

export type DocumentCoverMeta = DocumentCoverImage | DocumentCoverColor

export interface DocumentCoverProps {
  documentCoverMeta?: DocumentCoverMeta | null
  popoverProps: PopoverProps
  localUrl?: string
  onClick?: VoidFunction
  getDocCoverUrl: () => string | undefined
}

export const DocumentCover: React.FC<DocumentCoverProps> = ({ documentCoverMeta, popoverProps, getDocCoverUrl, localUrl }) => {
  let value = 'unset'

  if (documentCoverMeta?.type === Blocktype.Color) value = documentCoverMeta.color
  if (documentCoverMeta?.type === Blocktype.Image) {
    const url = getDocCoverUrl() ?? localUrl ?? ''

    if (url) {
      value = `url(${url})`
    }
  }

  const style = {
    backgroundImage: value?.startsWith('#') ? 'unset' : value,
    backgroundColor: value?.startsWith('#') ? value : 'unset'
  }

  return (
    <div className={cx(styles.cover, { [styles.uncover]: !documentCoverMeta })} style={style}>
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
