import React from 'react'
import { useParams } from 'react-router-dom'
import { SidebarLayoutPage } from '../common/layouts/SidebarLayoutPage'
import { DocumentTopBar } from './DocumentTopBar'
import { DocumentPage } from './DocumentPage'
import { useSyncProvider } from './useSyncProvider'

export const DocumentContent: React.FC = () => {
  const { webid, docid, snapshotVersion } = useParams<{ webid: string; docid: string | undefined; snapshotVersion: string | undefined }>()
  const [onCommit, committing] = useSyncProvider()
  return (
    <SidebarLayoutPage webid={webid} docid={docid}>
      <DocumentTopBar docid={docid} webid={webid} saving={committing} />
      <DocumentPage webid={webid} docid={docid} editable={true} snapshotVersion={Number(snapshotVersion ?? '0')} onCommit={onCommit} />
    </SidebarLayoutPage>
  )
}
