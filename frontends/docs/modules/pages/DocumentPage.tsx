import React from 'react'
import { useParams } from 'react-router-dom'
import { Editor } from '@brickdoc/editor'
import { syncProvider } from './SyncProvider'
import { useBlockSyncMutation, useGetChildrenBlocksLazyQuery } from '@/BrickdocGraphQL'

const Page: React.FC = () => {
  const { webid, docid } = useParams<{ webid: string; docid: string }>()
  const [blockSync] = useBlockSyncMutation()
  const [childrenBlocks] = useGetChildrenBlocksLazyQuery()
  const syncCallback = syncProvider({ blockSync, childrenBlocks })

  const content = `WIP - ${webid} ${docid}`

  return (
    <div>
      <Editor syncCallback={syncCallback} content={content} />
    </div>
  )
}
export default Page
