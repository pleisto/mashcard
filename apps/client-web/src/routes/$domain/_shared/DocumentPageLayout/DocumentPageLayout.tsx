import Split from '@uiw/react-split'
import { FC, ReactNode, Suspense, useMemo, useCallback, createContext, useState, ReactElement } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { DocMetaProvider, DocMetaProviderProps } from '../DocMeta'
import { DocumentPageSidebar } from '../DocumentPageSidebar'
import { useDocsI18n } from '../useDocsI18n'
import * as Root from './DocumentPageLayout.style'

export const LayoutContext = createContext<{
  setDocMeta: (docMeta: DocMetaProviderProps['docMeta']) => void
  setPageTitle: (title?: string) => void
  setSibebarVisible: (show: boolean) => void
  setErrorPage: (errorPage: ReactElement | null) => void
}>({ setDocMeta: () => {}, setPageTitle: () => {}, setSibebarVisible: () => {}, setErrorPage: () => {} })

export const DocumentPageLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useDocsI18n()
  const { domain } = useParams()
  const [errorPage, setErrorPage] = useState<ReactElement | null>(null)
  const [docMeta, setDocMeta] = useState<DocMetaProviderProps['docMeta']>({ domain, isAnonymous: true, isMine: false })
  const [pageTitle, setPageTitle] = useState<string>()
  const [sidebarVisible, setSibebarVisible] = useState<boolean>(false)
  const layoutContextValue = useMemo(() => ({ setDocMeta, setPageTitle, setSibebarVisible, setErrorPage }), [])

  const sidebarStyle = useMemo(() => {
    // always return a valid width!!! can avoid flex sidebar
    const sidebarWidth = Number(localStorage.getItem('SIDEBAR_WIDTH'))
    if (sidebarWidth > 5 && sidebarWidth < 50) {
      return {
        width: `${sidebarWidth}%`
      }
    }
    return { width: 270 }
  }, [])

  const saveSidebarWidth = useCallback((width: number) => {
    localStorage.setItem('SIDEBAR_WIDTH', String(width))
  }, [])

  if (errorPage) return errorPage

  return (
    <LayoutContext.Provider value={layoutContextValue}>
      <DocMetaProvider docMeta={docMeta}>
        <Helmet titleTemplate={`%s - ${t('app_title')}`} defaultTitle={t('app_title')} title={pageTitle} />
        <Root.Layout
          width={{
            '@mdOnly': 'md',
            '@smDown': 'sm'
          }}
        >
          <Split visiable={sidebarVisible} onDragEnd={saveSidebarWidth}>
            {sidebarVisible && (
              <Root.Section style={sidebarStyle}>
                <Suspense>
                  <DocumentPageSidebar />
                </Suspense>
              </Root.Section>
            )}
            <main className="content">
              <Suspense>{children}</Suspense>
            </main>
          </Split>
        </Root.Layout>
      </DocMetaProvider>
    </LayoutContext.Provider>
  )
}
