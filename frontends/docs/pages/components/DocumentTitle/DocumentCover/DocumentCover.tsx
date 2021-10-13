import * as React from 'react'
import cx from 'classnames'
import styles from './DocumentCover.module.less'
import { Button, Popover, PopoverProps } from '@brickdoc/design-system'
import { BlockColor, BlockImage, Blocktype } from '@/BrickdocGraphQL'
import { useDocsI18n } from '@/docs/common/hooks'

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
  editable: boolean
  localUrl?: string
  onClick?: VoidFunction
  className?: string
  getDocCoverUrl: () => string | undefined
}

export const DocumentCover: React.FC<DocumentCoverProps> = ({
  documentCoverMeta,
  popoverProps,
  editable,
  getDocCoverUrl,
  localUrl,
  className
}) => {
  let value = 'unset'
  const { t } = useDocsI18n()

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
    <div className={cx(styles.cover, { [styles.uncover]: !documentCoverMeta }, className)} style={style}>
      <div className={styles.buttons}>
        {editable && (
          <>
            {documentCoverMeta && (
              <Popover {...popoverProps}>
                <Button className={styles.button} type="text" disabled={!editable}>
                  {t('title.change_cover')}
                </Button>
              </Popover>
            )}
            {/* TODO: cover reposition */}
            <Button className={styles.button} type="text" disabled={!editable}>
              {t('title.reposition')}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
