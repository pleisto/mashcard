import React, { useContext, useEffect, useMemo } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { DocumentTopBar } from './components/DocumentTopBar'
import { DocumentPage } from './DocumentPage'
import { BrickdocContext } from '@/common/brickdocContext'
import { PageTree } from '@/docs/common/components/PageTree'
import { PodSelect } from '@/docs/common/components/PodSelect'
import { PageHead } from '@/docs/common/components/PageHead'
import { TrashButton } from '@/docs/common/components/TrashButton'
import { NewPage } from './components/NewPage'
import { Helmet } from 'react-helmet-async'
import { GetBlockInfoQuery, Policytype, useBlockCreateMutation, useGetBlockInfoQuery } from '@/BrickdocGraphQL'
import { headerBarVar, siderBarVar } from '@/common/reactiveVars'
import { useDocsI18n } from '../common/hooks'
import { queryPageBlocks } from '../common/graphql'
import { useReactiveVar } from '@apollo/client'
import { editorVar, FormulaContextVar } from '../reactiveVars'
import { validate as isValidUUID } from 'uuid'
import { appendFormulas, FormulaContext } from '@brickdoc/formula'
import { useFormulaQuery } from './hooks'
import { useFormulaBackendActions } from './hooks/useFormulaBackendActions'

type Collaborator = Exclude<Exclude<GetBlockInfoQuery['blockInfo'], undefined>, null>['collaborators'][0]
type Path = Exclude<Exclude<GetBlockInfoQuery['blockInfo'], undefined>, null>['pathArray'][0]
type icon = Exclude<Exclude<GetBlockInfoQuery['blockInfo'], undefined>, null>['icon']

export interface DocMeta {
  id: string | undefined
  webid: string
  loginWebid: string
  isAlias: boolean
  alias: string | undefined
  payload: object
  snapshotVersion: number
  isAnonymous: boolean
  isDeleted: boolean
  isMine: boolean
  isRedirect: boolean
  pin: boolean
  title: string
  icon?: icon
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
  const { webid, docid, snapshotVersion } = useParams() as unknown as {
    webid: string
    docid?: string
    snapshotVersion?: string
  }
  const { currentPod, currentUser, host, lastWebid, lastBlockIds, featureFlags } = useContext(BrickdocContext)
  const { t } = useDocsI18n()
  const navigate = useNavigate()
  const editor = useReactiveVar(editorVar)

  const loginWebid = currentPod.webid

  const { data, loading: getBlockInfoLoading } = useGetBlockInfoQuery({ variables: { id: docid as string, webid } })
  const [blockCreate, { loading: createBlockLoading }] = useBlockCreateMutation({
    refetchQueries: [queryPageBlocks]
  })
  const loading = !data || getBlockInfoLoading || createBlockLoading
  const isAnonymous = !currentUser

  const { state } = useLocation()

  const docMeta: DocMeta = useMemo(() => {
    const policy = data?.blockInfo?.permission?.policy
    const isMine = loginWebid === webid || !!data?.blockInfo?.isMaster
    const pin = !!data?.blockInfo?.pin
    const icon = data?.blockInfo?.icon
    const isAlias = docid ? !isValidUUID(docid) : false
    const shareable = isMine
    const editable = isMine || policy === Policytype.Edit
    const viewable = isMine || (!!policy && [Policytype.View, Policytype.Edit].includes(policy))
    const isDeleted = data?.blockInfo?.isDeleted !== false
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const title: string = data?.blockInfo?.title || t('title.untitled')
    const payload = data?.blockInfo?.enabledAlias?.payload ?? {}
    const collaborators = data?.blockInfo?.collaborators ?? []
    const pathArray = data?.blockInfo?.pathArray ?? []
    const path = `/${webid}/${docid}`

    const id = isAlias ? data?.blockInfo?.id : docid
    const alias = isAlias ? docid : data?.blockInfo?.enabledAlias?.key
    const isRedirect = !!(state as any)?.redirect

    return {
      id,
      alias,
      isAlias,
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
      icon,
      documentInfoLoading: loading,
      snapshotVersion: Number(snapshotVersion ?? '0')
    }
  }, [data, docid, host, isAnonymous, loading, loginWebid, snapshotVersion, state, t, webid])

  const getFormulas = useFormulaQuery(docMeta)
  const backendActions = useFormulaBackendActions()

  React.useEffect(() => {
    const formulaContext = new FormulaContext({ backendActions, features: featureFlags })
    void getFormulas(webid).then(({ data, success }) => {
      if (!success) return
      appendFormulas(formulaContext, data ?? [])
    })

    FormulaContextVar(formulaContext)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    async function createAndNavigateToNewPage(): Promise<void> {
      if (lastBlockIds && (lastBlockIds as any)[webid]) {
        navigate(`/${webid}/${(lastBlockIds as any)[webid]}`)
      } else {
        const { data: blockCreateData } = await blockCreate({ variables: { input: { title: '' } } })
        if (blockCreateData?.blockCreate?.id) {
          navigate(`/${webid}/${blockCreateData?.blockCreate?.id}`)
        }
      }
    }

    if (!docMeta.isAnonymous && !docid) {
      void createAndNavigateToNewPage()
    }

    // NOTE redirect if has its `alias` and current id is `uuid`
    if (!docMeta.isAlias && docMeta.alias) {
      navigate(`/${webid}/${docMeta.alias}`, { replace: true })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockCreate, docid, history, webid, docMeta, lastWebid, lastBlockIds])

  useEffect(() => {
    // HeaderBar
    if (!loading || docMeta.isMine) {
      headerBarVar(<DocumentTopBar docMeta={docMeta} />)
    }

    // SideBar
    if (!docMeta.isAnonymous) {
      if (docMeta.isMine) {
        siderBarVar(
          <>
            <header>
              <PageHead />
            </header>

            <nav>
              <PageTree docMeta={docMeta} />
              <NewPage docMeta={docMeta} />
              <TrashButton docMeta={docMeta} />
            </nav>

            <footer>
              <PodSelect docMeta={docMeta} />
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
  }, [docMeta, loading])

  console.log(docMeta, 'docMetadocMetadocMeta')
  return docMeta.id ? (
    <>
      <Helmet title={editor?.state.doc.attrs.title ?? docMeta.title} />
      <DocumentPage docMeta={{ ...docMeta, editable: docMeta.editable && !isAnonymous && !docMeta.isDeleted }} />
    </>
  ) : (
    <></>
  )
}

export default DocumentContentPage
