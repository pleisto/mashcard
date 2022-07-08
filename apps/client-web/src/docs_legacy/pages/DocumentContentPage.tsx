import { FC, useContext, useEffect, useMemo, Suspense } from 'react'
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
import { AppError404 } from '@/routes/_shared/AppError'
import { type DocMeta, DocMetaProvider } from '../store/DocMeta'
import { MashcardEventBus, HistoryListToggle } from '@mashcard/schema'

export const DocumentContentPage: FC = () => {
  const { t } = useDocsI18n()
  const { domain, docId, historyId } = useParams() as unknown as {
    domain: string
    docId?: string
    historyId?: string
  }
  const { currentUser, lastDomain, lastBlockIds, featureFlags } = useContext(MashcardContext)
  const navigate = useNavigate()
  const preSidebarStyle = useMemo(getSidebarStyle, [])

  const { data, loading: blockLoading } = useBlockNewQuery({
    variables: { id: docId as string, historyId },
    fetchPolicy: 'no-cache'
  })

  const documentInfo = data?.blockNew?.documentInfo ? (data?.blockNew?.documentInfo as DocumentInfo) : undefined

  const [blockCreate, { loading: createBlockLoading }] = useBlockCreateMutation({
    refetchQueries: [queryPageBlocks]
  })
  const loading = !data || blockLoading || createBlockLoading
  const isAnonymous = !currentUser
  const { state } = useLocation()

  // TODO: refactor DocMeta, separate frontend state and model data
  const docMeta: DocMeta = useMemo(() => {
    const policy = documentInfo?.permission?.policy
    const isMine = !!documentInfo?.isMaster
    const isAlias = docId ? !isUUID(docId) : false
    const shareable = isMine
    const editable = (isMine || policy === Policytype.Edit) && !isAnonymous && !documentInfo?.isDeleted && !historyId
    const viewable = isMine || (!!policy && [Policytype.View, Policytype.Edit].includes(policy))
    const isDeleted = documentInfo?.isDeleted !== false
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const title: string = documentInfo?.title || t('title.untitled')
    const path = `/${domain}/${docId}`

    const id = isAlias ? documentInfo?.id : docId
    const alias = isAlias ? docId : documentInfo?.enabledAlias?.key
    const isRedirect = !!(state as any)?.redirect
    const isNotExist = !loading && !documentInfo?.id

    if (historyId) {
      MashcardEventBus.dispatch(HistoryListToggle({ visible: true }))
    }

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
  }, [documentInfo, docId, historyId, isAnonymous, loading, state, t, domain])

  const { queryFormulas, commitFormula, generateFormulaFunctionClauses } = useFormulaActions()

  useEffect(() => {
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

    if (!docMeta.isAnonymous && !docId) {
      void createAndNavigateToNewPage()
    }

    // NOTE redirect if has its `alias` and current id is `uuid`
    if (!docMeta.isAlias && docMeta.alias) {
      navigate(`/${domain}/${docMeta.alias}`, { replace: true })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockCreate, docId, history, domain, docMeta, lastDomain, lastBlockIds])

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
          {!isAnonymous && (
            <Root.Section style={preSidebarStyle}>
              <Suspense>
                <ContentSidebar />
              </Suspense>
            </Root.Section>
          )}
          <main className="content">
            <header style={isAnonymous ? { paddingRight: 0 } : undefined}>
              <Suspense>
                <DocumentTopBar />
              </Suspense>
            </header>
            <section>
              <article id="article">
                <Suspense>
                  <DocumentPage data={data} loading={loading} editable={docMeta.editable} />
                </Suspense>
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
