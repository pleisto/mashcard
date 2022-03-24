import React, { useContext, useEffect, useMemo } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { DocumentTopBar } from './components/DocumentTopBar'
import { DocumentPage } from './DocumentPage'
import { BrickdocContext } from '@/common/brickdocContext'
import { PageTree } from '@/docs/common/components/PageTree'
import { SpaceSelect } from '@/docs/common/components/SpaceSelect'
import { TrashButton } from '@/docs/common/components/TrashButton'
import { NewPage } from './components/NewPage'
import { Helmet } from 'react-helmet-async'
import { GetBlockInfoQuery, Policytype, useBlockCreateMutation, useGetBlockInfoQuery } from '@/BrickdocGraphQL'
import { useDocsI18n } from '../common/hooks'
import { queryPageBlocks } from '../common/graphql'
import { FormulaContextVar } from '../reactiveVars'
import { validate as isValidUUID } from 'uuid'
import { appendFormulas, FormulaContext, FormulaName } from '@brickdoc/formula'
import Logo from '@/common/assets/logo_brickdoc.svg'
import * as Root from './DocumentContentPage.style'
import { useFormulaActions } from './hooks/useFormulaActions'

type Collaborator = Exclude<Exclude<GetBlockInfoQuery['blockInfo'], undefined>, null>['collaborators'][0]
type Path = Exclude<Exclude<GetBlockInfoQuery['blockInfo'], undefined>, null>['pathArray'][0]
type icon = Exclude<Exclude<GetBlockInfoQuery['blockInfo'], undefined>, null>['icon']

export interface DocMeta {
  id: string | undefined
  domain: string
  personalDomain: string
  loginDomain: string
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

/* const Layout = styled('div', base) */

export const DocumentContentPage: React.FC = () => {
  const { domain, docid, snapshotVersion } = useParams() as unknown as {
    domain: string
    docid?: string
    snapshotVersion?: string
  }
  const { currentSpace, currentUser, host, lastDomain, lastBlockIds, featureFlags } = useContext(BrickdocContext)
  const { t } = useDocsI18n()
  const navigate = useNavigate()

  const loginDomain = currentSpace.domain

  const {
    data,
    loading: getBlockInfoLoading,
    refetch
  } = useGetBlockInfoQuery({ variables: { id: docid as string, domain } })
  const [blockCreate, { loading: createBlockLoading }] = useBlockCreateMutation({
    refetchQueries: [queryPageBlocks]
  })
  const loading = !data || getBlockInfoLoading || createBlockLoading
  const isAnonymous = !currentUser
  const personalDomain = currentUser?.domain ?? loginDomain
  const { state, pathname } = useLocation()

  React.useEffect(() => {
    // https://github.com/brickdoc/brickdoc/issues/1261
    // The cache is not updated in time during the switchover
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const docMeta: DocMeta = useMemo(() => {
    const policy = data?.blockInfo?.permission?.policy
    const isMine = loginDomain === domain || !!data?.blockInfo?.isMaster
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
    const path = `/${domain}/${docid}`

    const id = isAlias ? data?.blockInfo?.id : docid
    const alias = isAlias ? docid : data?.blockInfo?.enabledAlias?.key
    const isRedirect = !!(state as any)?.redirect

    return {
      id,
      alias,
      isAlias,
      domain,
      title,
      payload,
      isDeleted,
      pin,
      host,
      path,
      isAnonymous,
      isMine,
      isRedirect,
      loginDomain,
      shareable,
      editable,
      viewable,
      collaborators,
      pathArray,
      icon,
      personalDomain,
      documentInfoLoading: loading,
      snapshotVersion: Number(snapshotVersion ?? '0')
    }
  }, [data, docid, host, isAnonymous, loading, personalDomain, loginDomain, snapshotVersion, state, t, domain])

  const { queryFormulas, commitFormula, generateFormulaFunctionClauses } = useFormulaActions()

  React.useEffect(() => {
    const formulaNames: FormulaName[] = []
    const functionClauses = generateFormulaFunctionClauses(docMeta)
    const formulaContext = new FormulaContext({
      domain: loginDomain,
      backendActions: { commit: commitFormula },
      formulaNames,
      functionClauses,
      features: featureFlags
    })
    void queryFormulas(domain).then(({ data, success }) => {
      if (!success) return
      void appendFormulas(formulaContext, data ?? [])
    })

    FormulaContextVar(formulaContext)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    async function createAndNavigateToNewPage(): Promise<void> {
      if (lastBlockIds && (lastBlockIds as any)[domain]) {
        navigate(`/${domain}/${(lastBlockIds as any)[domain]}`)
      } else {
        const { data: blockCreateData } = await blockCreate({ variables: { input: { title: '' } } })
        if (blockCreateData?.blockCreate?.id) {
          navigate(`/${domain}/${blockCreateData?.blockCreate?.id}`)
        }
      }
    }

    if (!docMeta.isAnonymous && !docid) {
      void createAndNavigateToNewPage()
    }

    // NOTE redirect if has its `alias` and current id is `uuid`
    if (!docMeta.isAlias && docMeta.alias) {
      navigate(`/${domain}/${docMeta.alias}`, { replace: true })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockCreate, docid, history, domain, docMeta, lastDomain, lastBlockIds])

  const siderBar =
    !docMeta.isAnonymous &&
    (docMeta.isMine ? (
      <>
        <div className="mainActions">
          <header>
            <img className="brk-logo" src={Logo} alt="Brickdoc" />
          </header>
          <nav>
            <PageTree docMeta={docMeta} />
            <NewPage docMeta={docMeta} />
            <TrashButton docMeta={docMeta} />
          </nav>
        </div>
        <footer>
          <SpaceSelect docMeta={docMeta} />
        </footer>
      </>
    ) : (
      <SpaceSelect docMeta={docMeta} />
    ))

  return (
    <>
      <Helmet
        titleTemplate={`%s - ${t('app_title')}`}
        defaultTitle={t('app_title')}
        title={docMeta.id && docMeta.title}
      />
      <Root.Layout
        width={{
          '@mdOnly': 'md',
          '@smDown': 'sm'
        }}
      >
        {siderBar && <Root.Section>{siderBar}</Root.Section>}
        <main>
          {(!loading || docMeta.isMine) && (
            <header>
              <DocumentTopBar docMeta={docMeta} />
            </header>
          )}
          <section>
            <article id="article">
              {docMeta.id && (
                <DocumentPage
                  docMeta={{ ...docMeta, editable: docMeta.editable && !isAnonymous && !docMeta.isDeleted }}
                  mode={!docMeta.editable || isAnonymous ? 'presentation' : 'default'}
                />
              )}
            </article>
            <aside id="aside" />
          </section>
        </main>
      </Root.Layout>
    </>
  )
}

export default DocumentContentPage
