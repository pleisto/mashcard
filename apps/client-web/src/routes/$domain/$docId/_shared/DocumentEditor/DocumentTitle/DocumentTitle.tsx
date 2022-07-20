import { Blob, FileSource } from '@/MashcardGraphQL'
import { Button, Icon, Popover } from '@mashcard/design-system'
import { TEST_ID_ENUM } from '@mashcard/test-helper'
import React from 'react'
import { usePrepareFileUpload } from '../../../../_shared/usePrepareFileUpload'
import { useDocsI18n } from '../../../../_shared/useDocsI18n'
import { blockMeta } from '../useDocSyncProvider'
import { useDocumentCoverUploader } from './useDocumentCoverUploader'
import { useDocumentIconUploader } from './useDocumentIconUploader'
import { useFetchUnsplashImages } from './useFetchUnsplashImages'
import { DocumentCover } from './DocumentCover'
import { DocumentIcon } from './DocumentIcon'
import * as Root from './DocumentTitle.style'
export interface DocumentTitleProps {
  docId: string
  docBlobs: Blob[]
  editable: boolean
  meta: blockMeta
  setMeta: (meta: blockMeta) => void
}

export const DocumentTitle: React.FC<DocumentTitleProps> = ({ docId, docBlobs, editable, meta, setMeta }) => {
  const { t } = useDocsI18n()

  const icon = meta.icon
  const cover = meta.cover
  const title = meta.title

  const createDocAttrsUpdater = React.useCallback(
    (field: string) => {
      return (value: any): void => {
        setMeta({ ...meta, [field]: value })
      }
    },
    [setMeta, meta]
  )

  const createDocBlobGetter = React.useCallback(
    (field: string) => {
      return (): string | undefined => {
        if (meta[field]?.source === FileSource.External) {
          return meta[field].key
        }
        if (meta[field]?.source === FileSource.Origin) {
          const blob = docBlobs.find(blob => blob.blobKey === meta[field].key)
          return blob?.url
        }
      }
    },
    [meta, docBlobs]
  )

  const docIconGetter = createDocBlobGetter('icon')
  const docCoverGetter = createDocBlobGetter('cover')

  const setTitle = createDocAttrsUpdater('title')
  const setIcon = createDocAttrsUpdater('icon')
  const setCover = createDocAttrsUpdater('cover')

  const prepareFileUpload = usePrepareFileUpload()
  const fetchUnsplashImages = useFetchUnsplashImages()
  const [localIcon, setLocalIcon] = React.useState('')
  const [localCover, setLocalCover] = React.useState('')
  const [documentIconMeta, iconPopoverProps] = useDocumentIconUploader(icon, {
    blockId: docId,
    prepareFileUpload,
    fetchUnsplashImages,
    overlayClassName: Root.Popover,
    onChange: setIcon,
    onFileLoaded: setLocalIcon
  })
  const [documentCoverMeta, coverPopoverProps] = useDocumentCoverUploader(cover, {
    blockId: docId,
    prepareFileUpload,
    fetchUnsplashImages,
    overlayClassName: Root.Popover,
    onChange: setCover,
    onFileLoaded: setLocalCover
  })

  return (
    <>
      {documentCoverMeta && (
        <DocumentCover
          editable={editable}
          localUrl={localCover}
          getDocCoverUrl={docCoverGetter}
          documentCoverMeta={documentCoverMeta}
          popoverProps={coverPopoverProps}
        />
      )}

      <Root.TitleWrapper
        width={{
          '@smDown': 'sm'
        }}
      >
        <Root.MaxWidth>
          {editable && (
            <Root.Actions data-testid={TEST_ID_ENUM.page.DocumentPage.actionButtons.id}>
              {!documentIconMeta && (
                <Popover {...iconPopoverProps}>
                  <Root.Item as={Button} type="text" disabled={!editable}>
                    <Root.Icon as={Icon.Face} />
                    <Root.Name>{t('title.add_icon')}</Root.Name>
                  </Root.Item>
                </Popover>
              )}
              {!documentCoverMeta && (
                <Popover {...coverPopoverProps}>
                  <Root.Item
                    as={Button}
                    data-testid={TEST_ID_ENUM.page.DocumentPage.coverButton.id}
                    type="text"
                    disabled={!editable}
                  >
                    <Root.Icon as={Icon.Image} />
                    <Root.Name>{t('title.add_cover')}</Root.Name>
                  </Root.Item>
                </Popover>
              )}
            </Root.Actions>
          )}
          <Root.TitleRow>
            {documentIconMeta && (
              <Popover {...iconPopoverProps} visible={!editable ? false : undefined}>
                <DocumentIcon getDocIconUrl={docIconGetter} localUrl={localIcon} documentIconMeta={documentIconMeta} />
              </Popover>
            )}
            <Root.Textarea
              minRows={1}
              value={title || ''}
              data-testid={TEST_ID_ENUM.page.DocumentPage.titleInput.id}
              onChange={(e: any) => {
                setTitle(e.target.value)
              }}
              placeholder={t('title.untitled')}
              disabled={!editable}
              disabledVariant={!editable}
            />
          </Root.TitleRow>
        </Root.MaxWidth>
      </Root.TitleWrapper>
    </>
  )
}
