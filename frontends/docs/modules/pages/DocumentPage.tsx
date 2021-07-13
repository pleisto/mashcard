import React from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Skeleton } from '@brickdoc/design-system'
import { Editor } from '@brickdoc/editor'
import { useBlockSyncBatchMutation, useGetChildrenBlocksQuery, Block } from '@/BrickdocGraphQL'
import { syncProvider, blocksToJSONContents } from './SyncProvider'

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
      <div>
        <Editor onSync={onSync} />
      </div>
    )
  }

  if (!data) {
    return <Alert message="Page not found" type="error" />
  }

  const content = blocksToJSONContents(data.childrenBlocks as Block[])[0]

  return (
    <div>
      <Editor onSync={onSync} content={content} />
    </div>
  )
}
export default Page
