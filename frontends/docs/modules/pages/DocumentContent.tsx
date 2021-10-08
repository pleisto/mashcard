import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { SidebarLayoutPage } from '../common/layouts/SidebarLayoutPage'
import { DocumentTopBar } from './DocumentTopBar'
import { DocumentPage } from './DocumentPage'
import { useSyncProvider } from './useSyncProvider'
import { BrickdocContext } from '@/common/PWAProvider'
import { Policytype, useGetBlockPermissionQuery } from '@/BrickdocGraphQL'

export const DocumentContent: React.FC = () => {
  const { webid, docid, snapshotVersion } = useParams<{ webid: string; docid: string | undefined; snapshotVersion: string | undefined }>()
  const { currentPod } = useContext(BrickdocContext)
  const [committing, setCommitting] = React.useState(false)
  const [onCommit] = useSyncProvider(setCommitting)

  const realWebid = currentPod.webid
  const isMine = realWebid === webid

  // TODO lazy query
  const { data, loading } = useGetBlockPermissionQuery({ variables: { id: docid as string } })
  const policy = data?.blockPermission?.policy

  const isAnonymous = realWebid === 'anonymous'

  const shareable = isMine
  const editable = isMine || policy === Policytype.Edit
  const realEditable = editable && !isAnonymous
  const viewable = isMine || (!!policy && [Policytype.View, Policytype.Edit].includes(policy))

  const documentPage =
    isMine || !loading ? (
      <>
        <DocumentTopBar
          editable={editable}
          viewable={viewable}
          isAnonymous={isAnonymous}
          docid={docid}
          webid={webid}
          shareable={shareable}
          saving={committing}
        />
        <DocumentPage
          webid={webid}
          docid={docid}
          snapshotVersion={Number(snapshotVersion ?? '0')}
          onCommit={onCommit}
          viewable={viewable}
          editable={realEditable}
          setCommitting={setCommitting}
        />
      </>
    ) : (
      <></>
    )

  return (
    <SidebarLayoutPage isAnonymous={isAnonymous} webid={realWebid} docid={docid}>
      {documentPage}
    </SidebarLayoutPage>
  )
}
