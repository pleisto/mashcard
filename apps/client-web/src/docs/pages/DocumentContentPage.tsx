import React, { useContext, useEffect, useMemo } from 'react'
import { getSidebarStyle, logSideBarWidth } from '@/common/utils/sidebarStyle'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import Split from '@uiw/react-split'
import { DocumentTopBar } from './components/DocumentTopBar'
import { ContentSidebar } from './components/ContentSidebar'
import { DocumentPage } from './DocumentPage'
import { MashcardContext } from '@/common/mashcardContext'
import { Helmet } from 'react-helmet-async'
import { Policytype, useBlockCreateMutation, useBlockNewQuery, DocumentInfo } from '@/MashcardGraphQL'
import { useDocsI18n } from '../common/hooks'
import { queryPageBlocks } from '../common/graphql'
import { FormulaContextVar } from '../reactiveVars'
import { isUUID } from '@mashcard/active-support'
import { appendFormulas, FormulaContext } from '@mashcard/formula'
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
  const { currentUser, lastDomain, lastBlockIds, featureFlags } = useContext(MashcardContext)
  const { t } = useDocsI18n()
  const navigate = useNavigate()
  const preSidebarStyle = useMemo(getSidebarStyle, [])

  const { data, loading: blockLoading, refetch } = useBlockNewQuery({
    variables: { id: docid as string, historyId },
  })

  const documentInfo = data?.blockNew?.documentInfo ? (data?.blockNew?.documentInfo as DocumentInfo) : undefined

  const [blockCreate, { loading: createBlockLoading }] = useBlockCreateMutation({
    refetchQueries: [queryPageBlocks]
  })
  const loading = !data || blockLoading || createBlockLoading
  const isAnonymous = !currentUser
  const { state, pathname } = useLocation()

  React.useEffect(() => {
    // https://github.com/pleisto/corp/issues/1261
    // The cache is not updated in time during the switchover
    void refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // TODO: refactor DocMeta, separate frontend state and model data
  const docMeta: DocMeta = useMemo(() => {
    const policy = documentInfo?.permission?.policy
    const isMine = !!documentInfo?.isMaster
    const isAlias = docid ? !isUUID(docid) : false
    const shareable = isMine
    const editable = isMine || policy === Policytype.Edit
    const viewable = isMine || (!!policy && [Policytype.View, Policytype.Edit].includes(policy))
    const isDeleted = documentInfo?.isDeleted !== false
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const title: string = documentInfo?.title || t('title.untitled')
    const path = `/${domain}/${docid}`

    const id = isAlias ? documentInfo?.id : docid
    const alias = isAlias ? docid : documentInfo?.enabledAlias?.key
    const isRedirect = !!(state as any)?.redirect
    const isNotExist = !loading && !id

    return {
      id,
      alias,
      isAlias,
      domain,
      title,
      isDeleted,
      path,
      isAnonymous,
      isMine,
      isRedirect,
      shareable,
      editable,
      viewable,
      isNotExist,
      historyId,
      documentInfo
    }
  }, [documentInfo, docid, historyId, isAnonymous, loading, state, t, domain])

  const { queryFormulas, commitFormula, generateFormulaFunctionClauses } = useFormulaActions()

  React.useEffect(() => {
    const functionClauses = generateFormulaFunctionClauses()
    const formulaContext = FormulaContext.getInstance({
      domain,
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
        <Split visiable={!isAnonymous} onDragEnd={logSideBarWidth}>
          {!isAnonymous && <Root.Section style={preSidebarStyle}>{siderBar}</Root.Section>}
          <main className="content">
            {(!loading || docMeta.isMine) && (
              <header style={isAnonymous ? { paddingRight: 0 } : undefined}>
                <DocumentTopBar />
              </header>
            )}
            <section>
              <article id="article">
                {docMeta.id && (
                  <DocMetaProvider
                    inherit
                    docMeta={{
                      editable: docMeta.editable && !isAnonymous && !documentInfo?.isDeleted
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
