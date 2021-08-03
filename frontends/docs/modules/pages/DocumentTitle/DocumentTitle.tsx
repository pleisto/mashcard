import React from 'react'
import { Button, Popover, Icon, Input } from '@brickdoc/design-system'
import styles from './DocumentTitle.module.less'
import { DashboardProps } from '@brickdoc/uploader'
import { DocumentIcon, DocumentIconMeta } from './DocumentIcon'
import { DocumentCover, DocumentCoverMeta } from './DocumentCover'
import { useDocumentIconUploader } from './useDocumentIconUploader'
import { useDocumentCoverUploader } from './useDocumentCoverUploader'

export interface DocumentTitleProps {
  prepareFileUpload: DashboardProps['prepareFileUpload']
  fetchUnsplashImages: DashboardProps['fetchUnsplashImages']
  title?: string
  icon?: DocumentIconMeta | null
  cover?: DocumentCoverMeta | null
  onCoverChange: (cover: DocumentCoverMeta | null | undefined) => void
  onIconChange: (icon: DocumentIconMeta | null | undefined) => void
  onTitleChange: (title: string) => void
}

export const DocumentTitle: React.FC<DocumentTitleProps> = ({
  prepareFileUpload,
  fetchUnsplashImages,
  title,
  icon,
  cover,
  onCoverChange,
  onIconChange,
  onTitleChange
}) => {
  const [documentIconMeta, iconPopoverProps] = useDocumentIconUploader(icon, {
    prepareFileUpload,
    fetchUnsplashImages,
    styles,
    onChange: onIconChange
  })
  const [documentCoverMeta, coverPopoverProps] = useDocumentCoverUploader(cover, {
    prepareFileUpload,
    fetchUnsplashImages,
    styles,
    onChange: onCoverChange
  })

  return (
    <div className={styles.container}>
      <DocumentCover documentCoverMeta={documentCoverMeta} popoverProps={coverPopoverProps} />
      <div className={styles.titleWrapper}>
        {documentIconMeta && (
          <Popover {...iconPopoverProps}>
            <DocumentIcon documentIconMeta={documentIconMeta} />
          </Popover>
        )}
        <div className={styles.actions}>
          {!documentIconMeta && (
            <Popover {...iconPopoverProps}>
              <Button type="text" className={styles.item}>
                <Icon name="face" className={styles.icon} />
                <span className={styles.name}>Add icon</span>
              </Button>
            </Popover>
          )}
          {!documentCoverMeta && (
            <Popover {...coverPopoverProps}>
              <Button type="text" className={styles.item}>
                <Icon name="image" className={styles.icon} />
                <span className={styles.name}>Add cover</span>
              </Button>
            </Popover>
          )}
        </div>
        <Input.TextArea
          className={styles.titleInput}
          value={title}
          onChange={e => onTitleChange(e.target.value)}
          placeholder="Untitled"
          autoSize={true}
        />
      </div>
    </div>
  )
}
