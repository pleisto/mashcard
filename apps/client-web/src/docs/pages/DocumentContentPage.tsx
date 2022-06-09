import React, { useContext, useEffect, useMemo } from 'react'
import { getSidebarStyle, logSideBarWidth } from '@/common/utils/sidebarStyle'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import Split from '@uiw/react-split'
import { DocumentTopBar } from './components/DocumentTopBar'
import { ContentSidebar } from './components/ContentSidebar'
import { DocumentPage } from './DocumentPage'
import { BrickdocContext } from '@/common/brickdocContext'
import { Helmet } from 'react-helmet-async'
import { Policytype, useBlockCreateMutation, useGetBlockInfoQuery } from '@/BrickdocGraphQL'
import { useDocsI18n } from '../common/hooks'
import { queryPageBlocks } from '../common/graphql'
import { FormulaContextVar } from '../reactiveVars'
import { isUUID } from '@brickdoc/active-support'
import { appendFormulas, FormulaContext } from '@brickdoc/formula'
import * as Root from './DocumentContentPage.style'
import { useFormulaActions } from './hooks/useFormulaActions'
import { AppError404 } from '@/core/app-error'
import { type DocMeta, DocMetaProvider } from '../store/DocMeta'

/* const Layout = styled('div', base) */

export const DocumentContentPage: React.FC = () => {
  const { domain, docid, historyId } = useParams() as unknown as {
    domain: string
    docid?: string
    historyId?: string
  }
  const { currentSpace, currentUser, host, lastDomain, lastBlockIds, featureFlags } = useContext(BrickdocContext)
  const { t } = useDocsI18n()
  const navigate = useNavigate()
  const preSidebarStyle = useMemo(getSidebarStyle, [])

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
    void refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const docMeta: DocMeta = useMemo(() => {
    const policy = data?.blockInfo?.permission?.policy
    const isMine = loginDomain === domain || !!data?.blockInfo?.isMaster
    const pin = !!data?.blockInfo?.pin
    const icon = data?.blockInfo?.icon
    const isAlias = docid ? !isUUID(docid) : false
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
    const isNotExist = !loading && !id

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
      snapshotVersion: 0,
      isNotExist,
      historyId
    }
  }, [data, docid, historyId, host, isAnonymous, loading, personalDomain, loginDomain, state, t, domain])

  const { queryFormulas, commitFormula, generateFormulaFunctionClauses } = useFormulaActions()

  React.useEffect(() => {
    const functionClauses = generateFormulaFunctionClauses(docMeta)
    const formulaContext = FormulaContext.getInstance({
      domain: loginDomain,
      backendActions: { commit: commitFormula },
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

  const siderBar = <ContentSidebar />
  if (docMeta.isNotExist) {
    return <AppError404 btnCallback={() => navigate('/')} />
  }
  return (
    <DocMetaProvider docMeta={docMeta}>
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
        <Split visiable={!docMeta.isAnonymous} onDragEnd={logSideBarWidth}>
          {!isAnonymous && <Root.Section style={preSidebarStyle}>{siderBar}</Root.Section>}
          <main className="content">
            {(!loading || docMeta.isMine) && (
              <header style={docMeta.isAnonymous ? { paddingRight: 0 } : undefined}>
                <DocumentTopBar />
              </header>
            )}
            <section>
              <article id="article">
                {docMeta.id && (
                  <DocMetaProvider
                    inherit
                    docMeta={{
                      editable: docMeta.editable && !isAnonymous && !docMeta.isDeleted
                    }}
                  >
                    <DocumentPage mode={!docMeta.editable || isAnonymous ? 'presentation' : 'default'} />
                  </DocMetaProvider>
                )}
              </article>
              {!isAnonymous && <aside id="aside" />}
            </section>
          </main>
        </Split>
      </Root.Layout>
    </DocMetaProvider>
  )
}

export default DocumentContentPage
