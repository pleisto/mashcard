import React from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Skeleton, Input } from '@brickdoc/design-system'
import { Editor } from '@brickdoc/editor'
import { useBlockSyncBatchMutation, useGetChildrenBlocksQuery, Block } from '@/BrickdocGraphQL'
import { syncProvider, blocksToJSONContents } from './SyncProvider'
import styles from './DocumentPage.module.less'

const Page: React.FC = () => {
  const { webid, docid, ...restParams } = useParams<{ webid: string; docid: string; snapshotVersion: string }>()
  const [blockSyncBatch] = useBlockSyncBatchMutation()
  const onSync = syncProvider({ blockSyncBatch })

  const { data, loading } = useGetChildrenBlocksQuery({
    variables: { parentId: docid, excludePages: false, snapshotVersion: Number(restParams.snapshotVersion || '0') }
  })

  if (loading) {
    return <Skeleton />
  }

  if (!docid) {
    return (
      <div className={styles.page}>
        <Input.TextArea className={styles.titleInput} placeholder="Untitled" autoSize={true} />
        <Editor onSync={onSync} />
      </div>
    )
  }

  if (!data) {
    return <Alert message="Page not found" type="error" />
  }

  const content = blocksToJSONContents(data.childrenBlocks as Block[])[0]

  return (
    <div className={styles.page}>
      <Input.TextArea className={styles.titleInput} placeholder="Untitled" autoSize={true} />
      <Editor onSync={onSync} content={content} />
    </div>
  )
}
export default Page
