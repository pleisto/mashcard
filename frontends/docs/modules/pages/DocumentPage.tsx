import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Skeleton } from '@brickdoc/design-system'
import { EditorContent, useEditor } from '@brickdoc/editor'
import { useBlockSyncBatchMutation, useGetChildrenBlocksQuery, Block } from '@/BrickdocGraphQL'
import { DocumentTitle } from './DocumentTitle'
import { syncProvider, blocksToJSONContents } from './SyncProvider'
import { useDocumentSubscription } from './useDocumentSubscription'
import { usePrepareFileUpload } from './usePrepareFileUpload'
import { useFetchUnsplashImages } from './useFetchUnsplashImages'
import styles from './DocumentPage.module.less'
import { DocumentIconMeta } from './DocumentTitle/DocumentIcon'
import { DocumentCoverMeta } from './DocumentTitle/DocumentCover'

export const DocumentPage: React.FC = () => {
  const { webid, docid, ...restParams } = useParams<{ webid: string; docid: string; snapshotVersion: string }>()
  const [blockSyncBatch] = useBlockSyncBatchMutation()
  const { onCommit } = syncProvider({ blockSyncBatch })

  const { data, loading } = useGetChildrenBlocksQuery({
    variables: { parentId: docid, excludePages: false, snapshotVersion: Number(restParams.snapshotVersion || '0') }
  })

  const prepareFileUpload = usePrepareFileUpload()
  const fetchUnsplashImages = useFetchUnsplashImages()
  const editor = useEditor({
    onCommit,
    prepareFileUpload,
    fetchUnsplashImages
  })

  const [icon, setIcon] = React.useState<DocumentIconMeta | null | undefined>()
  const [cover, setCover] = React.useState<DocumentCoverMeta | null | undefined>()

  useEffect(() => {
    if (editor && !editor.isDestroyed && data) {
      const content = blocksToJSONContents(data.childrenBlocks as Block[])[0]
      editor.commands.replaceRoot(content)
    }
  }, [editor, data])

  useDocumentSubscription({ docid, editor })

  if (loading) {
    return <Skeleton />
  }

  const DocumentTitleElement = (
    <DocumentTitle
      icon={icon}
      cover={cover}
      onCoverChange={setCover}
      onIconChange={setIcon}
      prepareFileUpload={prepareFileUpload!}
      fetchUnsplashImages={fetchUnsplashImages}
    />
  )

  if (!docid) {
    return (
      <div className={styles.page}>
        {DocumentTitleElement}
        <EditorContent editor={editor} />
      </div>
    )
  }

  if (!data) {
    return <Alert message="Page not found" type="error" />
  }

  return (
    <div className={styles.page}>
      {DocumentTitleElement}
      <EditorContent editor={editor} />
    </div>
  )
}
