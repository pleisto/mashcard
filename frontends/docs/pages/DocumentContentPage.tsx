import React, { useContext, useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { SidebarLayoutPage } from '@/common/layouts/SidebarLayoutPage'
import { DocumentTopBar } from './components/DocumentTopBar'
import { DocumentPage } from './DocumentPage'
import { BrickdocContext } from '@/BrickdocPWA'
import { PageTree } from '@/docs/common/components/PageTree'
import { PodSelect } from '@/docs/common/components/PodSelect'
import { SearchModal } from '@/docs/common/components/SearchModal'
import { TrashButton } from '@/docs/common/components/TrashButton'
import { NewPage } from './components/NewPage'
import { Helmet } from 'react-helmet-async'
import { BlockIdKind, GetBlockInfoQuery, Policytype, useBlockCreateMutation, useGetBlockInfoQuery } from '@/BrickdocGraphQL'
import { headerBarVar, siderBarVar } from '@/common/reactiveVars'
import { useDocsI18n } from '../common/hooks'
import { queryPageBlocks } from '../common/graphql'
import { usePageEditorContextValue, PageEditorContext } from './contexts/pageEditorContext'
import { SyncStatusContext, useSyncStatusContextValue } from './contexts/syncStatusContext'

type Collaborator = Exclude<Exclude<GetBlockInfoQuery['blockInfo'], undefined>, null>['collaborators'][0]
type Path = Exclude<Exclude<GetBlockInfoQuery['blockInfo'], undefined>, null>['pathArray'][0]

export interface DocMeta {
  id: string | undefined
  webid: string
  loginWebid: string
  kind: BlockIdKind
  alias: string | undefined
  payload: object
  snapshotVersion: number
  isAnonymous: boolean
  isDeleted: boolean
  isMine: boolean
  isRedirect: boolean
  pin: boolean
  title: string
  host: string
  path: string
  collaborators: Collaborator[]
  pathArray: Path[]
  documentInfoLoading: boolean
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
  const {
    webid,
    docid,
    snapshotVersion,
    kind = BlockIdKind.P
  } = useParams<{ webid: string; docid?: string; kind?: BlockIdKind; snapshotVersion?: string }>()
  const { currentPod, currentUser, host } = useContext(BrickdocContext)
  const syncStatusContextValue = useSyncStatusContextValue()
  const { t } = useDocsI18n()
  const history = useHistory()
  const pageEditorContextValue = usePageEditorContextValue()
  const { editor } = pageEditorContextValue

  const loginWebid = currentPod.webid

  const { data, loading: getBlockInfoLoading } = useGetBlockInfoQuery({ variables: { id: docid as string, kind, webid } })
  const [blockCreate, { loading: createBlockLoading }] = useBlockCreateMutation({
    refetchQueries: [queryPageBlocks]
  })
  const loading = !data || getBlockInfoLoading || createBlockLoading
  const isAnonymous = !currentUser

  useEffect(() => {
    async function createAndNavigateToNewPage(): Promise<void> {
      const { data: blockCreateData } = await blockCreate({ variables: { input: { title: '' } } })
      if (blockCreateData?.blockCreate?.id) {
        history.push(`/${webid}/${BlockIdKind.P}/${blockCreateData?.blockCreate?.id}`)
      }
    }

    if (!isAnonymous && !docid) {
      void createAndNavigateToNewPage()
    }
  }, [blockCreate, docid, history, webid, isAnonymous])

  const policy = data?.blockInfo?.permission?.policy
  const isMine = loginWebid === webid || !!data?.blockInfo?.isMaster
  const pin = !!data?.blockInfo?.pin
  const shareable = isMine
  const editable = isMine || policy === Policytype.Edit
  const viewable = isMine || (!!policy && [Policytype.View, Policytype.Edit].includes(policy))
  const isDeleted = data?.blockInfo?.isDeleted !== false
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const title: string = data?.blockInfo?.title || t('title.untitled')
  const realid = data?.blockInfo?.id ?? docid
  const payload = data?.blockInfo?.payload ?? {}
  const collaborators = data?.blockInfo?.collaborators ?? []
  const pathArray = data?.blockInfo?.pathArray ?? []
  const path = `/${webid}/${kind}/${docid}`
  const { state } = useLocation()
  const isRedirect = !!(state as any)?.redirect

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
    isMine,
    isRedirect,
    loginWebid,
    shareable,
    editable,
    viewable,
    collaborators,
    pathArray,
    documentInfoLoading: loading,
    snapshotVersion: Number(snapshotVersion ?? '0')
  }

  // HeaderBar
  if (!loading || isMine) {
    headerBarVar(<DocumentTopBar docMeta={docMeta} />)
  }

  // SideBar
  if (!docMeta.isAnonymous) {
    if (docMeta.isMine) {
      siderBarVar(
        <>
          <PodSelect docMeta={docMeta} />
          <SearchModal docMeta={docMeta} />

          <nav>
            <PageTree docMeta={docMeta} />
            <TrashButton docMeta={docMeta} />
          </nav>
          <footer>
            <NewPage docMeta={docMeta} />
          </footer>
        </>
      )
    } else {
      siderBarVar(
        <>
          <PodSelect docMeta={docMeta} />
        </>
      )
    }
  }

  const content = (
    <>
      <Helmet title={editor?.state.doc.attrs.title ?? docMeta.title} />
      <DocumentPage docMeta={{ ...docMeta, editable: editable && !isAnonymous }} />
    </>
  )

  return (
    <SyncStatusContext.Provider value={syncStatusContextValue}>
      <PageEditorContext.Provider value={pageEditorContextValue}>
        <SidebarLayoutPage>{content}</SidebarLayoutPage>
      </PageEditorContext.Provider>
    </SyncStatusContext.Provider>
  )
}

export default DocumentContentPage
