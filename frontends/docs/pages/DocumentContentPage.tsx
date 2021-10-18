import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Skeleton } from '@brickdoc/design-system'
import { SidebarLayoutPage } from '../common/layouts/SidebarLayoutPage'
import { DocumentTopBar } from './components/DocumentTopBar'
import { DocumentPage } from './DocumentPage'
import { useSyncProvider } from './hooks'
import { BrickdocContext } from '@/BrickdocPWA'
import { BlockIdKind, GetBlockInfoQuery, Policytype, useGetBlockInfoQuery } from '@/BrickdocGraphQL'
import { headerBarVar } from '@/docs/common/reactiveVars'

type Collaborator = Exclude<Exclude<GetBlockInfoQuery['blockInfo'], undefined>, null>['collaborators'][0]

export interface DocMeta {
  id: string | undefined
  webid: string
  kind: BlockIdKind
  alias: string | undefined
  payload: object
  snapshotVersion: number
  isAnonymous: boolean
  isDeleted: boolean
  pin: boolean
  title: string
  host: string
  path: string
  collaborators: Collaborator[]
  shareable: boolean
  editable: boolean
  viewable: boolean
}

export interface NonNullDocMeta extends DocMeta {
  id: string
  alias: string
}

export interface DocMetaProps {
  docMeta: DocMeta
}

export const DocumentContentPage: React.FC = () => {
  const { webid, docid, snapshotVersion, kind } =
    useParams<{ webid: string; docid: string | undefined; kind: BlockIdKind; snapshotVersion: string | undefined }>()
  const { currentPod, currentUser, host } = useContext(BrickdocContext)
  const [committing, setCommitting] = React.useState(false)
  const [onCommit] = useSyncProvider(setCommitting)

  const realWebid = currentPod.webid
  const isMine = realWebid === webid

  // TODO lazy query
  const { data, loading } = useGetBlockInfoQuery({ variables: { id: docid as string, kind, webid } })
  const policy = data?.blockInfo?.permission?.policy

  const isAnonymous = !currentUser

  const pin = !!data?.blockInfo?.pin
  const shareable = isMine
  const editable = isMine || policy === Policytype.Edit
  const viewable = isMine || (!!policy && [Policytype.View, Policytype.Edit].includes(policy))
  const isDeleted = data?.blockInfo?.isDeleted !== false
  const title = data?.blockInfo?.title ?? ''
  const realid = data?.blockInfo?.id ?? docid
  const payload = data?.blockInfo?.payload ?? {}
  const collaborators = data?.blockInfo?.collaborators ?? []
  const path = `/${webid}/${kind}/${docid}`

  const docMeta: DocMeta = {
    id: realid,
    alias: docid,
    kind,
    webid,
    title,
    payload,
    isDeleted,
    pin,
    host,
    path,
    isAnonymous,
    shareable,
    editable,
    viewable,
    collaborators,
    snapshotVersion: Number(snapshotVersion ?? '0')
  }

  if (!loading || isMine) {
    headerBarVar(<DocumentTopBar docMeta={docMeta} saving={committing} />)
  }

  const content = loading ? (
    <Skeleton active />
  ) : (
    <DocumentPage docMeta={{ ...docMeta, editable: editable && !isAnonymous }} onCommit={onCommit} setCommitting={setCommitting} />
  )

  return <SidebarLayoutPage docMeta={docMeta}>{content}</SidebarLayoutPage>
}

export default DocumentContentPage
