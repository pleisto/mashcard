import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Skeleton } from '@brickdoc/design-system'
import { SidebarLayoutPage } from '../common/layouts/SidebarLayoutPage'
import { DocumentTopBar } from './components/DocumentTopBar'
import { DocumentPage } from './DocumentPage'
import { useSyncProvider } from './hooks'
import { BrickdocContext } from '@/BrickdocPWA'
import { Policytype, useGetBlockInfoQuery } from '@/BrickdocGraphQL'
import { headerBarVar } from '@/docs/common/reactiveVars'

export const DocumentContentPage: React.FC = () => {
  const { webid, docid, snapshotVersion } = useParams<{ webid: string; docid: string | undefined; snapshotVersion: string | undefined }>()
  const { currentPod, currentUser } = useContext(BrickdocContext)
  const [committing, setCommitting] = React.useState(false)
  const [onCommit] = useSyncProvider(setCommitting)

  const realWebid = currentPod.webid
  const isMine = realWebid === webid

  // TODO lazy query
  const { data, loading } = useGetBlockInfoQuery({ variables: { id: docid as string } })
  const policy = data?.blockInfo?.permission?.policy

  const isAnonymous = !currentUser

  const pin = !!data?.blockInfo?.pin
  const shareable = isMine
  const editable = isMine || policy === Policytype.Edit
  const realEditable = editable && !isAnonymous
  const viewable = isMine || (!!policy && [Policytype.View, Policytype.Edit].includes(policy))
  const isDeleted = data?.blockInfo?.isDeleted !== false
  const title = data?.blockInfo?.title ?? ''

  if (!loading || isMine) {
    headerBarVar(
      <DocumentTopBar
        editable={editable}
        viewable={viewable}
        isAnonymous={isAnonymous}
        isDeleted={isDeleted}
        title={title}
        docid={docid}
        webid={webid}
        pin={pin}
        shareable={shareable}
        saving={committing}
      />
    )
  }

  const content = loading ? (
    <Skeleton active />
  ) : (
    <DocumentPage
      webid={webid}
      docid={docid}
      snapshotVersion={Number(snapshotVersion ?? '0')}
      onCommit={onCommit}
      viewable={viewable}
      editable={realEditable}
      isAnonymous={isAnonymous}
      setCommitting={setCommitting}
    />
  )

  return (
    <SidebarLayoutPage isAnonymous={isAnonymous} webid={realWebid} docid={docid}>
      {content}
    </SidebarLayoutPage>
  )
}

export default DocumentContentPage
