import React from 'react'
import { Button, Popover, Icon, Input } from '@brickdoc/design-system'
import styles from './DocumentTitle.module.less'
import { DashboardProps } from '@brickdoc/uploader'
import { DocumentIcon, DocumentIconMeta } from './DocumentIcon'
import { DocumentCover, DocumentCoverMeta } from './DocumentCover'
import { useDocumentIconUploader } from './useDocumentIconUploader'
import { useDocumentCoverUploader } from './useDocumentCoverUploader'

export interface DocumentTitleProps {
  blockId: string
  prepareFileUpload: DashboardProps['prepareFileUpload']
  fetchUnsplashImages: DashboardProps['fetchUnsplashImages']
  title?: string
  icon?: DocumentIconMeta | null
  cover?: DocumentCoverMeta | null
  onCoverChange: (cover: DocumentCoverMeta | null | undefined) => void
  onIconChange: (icon: DocumentIconMeta | null | undefined) => void
  onTitleChange: (title: string) => void
  getDocIconUrl: () => string | undefined
  getDocCoverUrl: () => string | undefined
}

export const DocumentTitle: React.FC<DocumentTitleProps> = ({
  blockId,
  prepareFileUpload,
  fetchUnsplashImages,
  title,
  icon,
  cover,
  onCoverChange,
  onIconChange,
  onTitleChange,
  getDocIconUrl,
  getDocCoverUrl
}) => {
  const [localIcon, setLocalIcon] = React.useState('')
  const [localCover, setLocalCover] = React.useState('')
  const [documentIconMeta, iconPopoverProps] = useDocumentIconUploader(icon, {
    blockId,
    prepareFileUpload,
    fetchUnsplashImages,
    styles,
    onChange: onIconChange,
    onFileLoaded: setLocalIcon
  })
  const [documentCoverMeta, coverPopoverProps] = useDocumentCoverUploader(cover, {
    blockId,
    prepareFileUpload,
    fetchUnsplashImages,
    styles,
    onChange: onCoverChange,
    onFileLoaded: setLocalCover
  })

  return (
    <div className={styles.container}>
      <DocumentCover
        localUrl={localCover}
        getDocCoverUrl={getDocCoverUrl}
        documentCoverMeta={documentCoverMeta}
        popoverProps={coverPopoverProps}
      />
      <div className={styles.titleWrapper}>
        {documentIconMeta && (
          <Popover {...iconPopoverProps}>
            <DocumentIcon getDocIconUrl={getDocIconUrl} localUrl={localIcon} documentIconMeta={documentIconMeta} />
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
