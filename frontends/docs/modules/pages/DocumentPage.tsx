import React from 'react'
import { useParams } from 'react-router-dom'
import { Editor } from '@brickdoc/editor'
import { currentWebidVar } from '@/docs/vars'
import { syncProvider } from './SyncProvider'
import { useBlockSyncMutation, useGetChildrenBlocksLazyQuery } from '@/BrickdocGraphQL'

const Page: React.FC = () => {
  const { webid, docid } = useParams()
  const [blockSync] = useBlockSyncMutation()
  const [childrenBlocks] = useGetChildrenBlocksLazyQuery()
  const syncCallback = syncProvider({ blockSync, childrenBlocks })

  const content = `WIP - ${webid} ${docid}`

  currentWebidVar(webid)
  return (
    <div>
      <Editor syncCallback={syncCallback} content={content} />
    </div>
  )
}
export default Page
