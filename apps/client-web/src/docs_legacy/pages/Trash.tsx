import React, { useContext, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Split from '@uiw/react-split'
import { MashcardContext } from '@/common/mashcardContext'
import { Helmet } from 'react-helmet-async'
import { ContentSidebar } from './components/ContentSidebar'
import { useGetPodsQuery } from '@/MashcardGraphQL'
import { useDocsI18n } from '../common/hooks'
import { TrashTable } from '@/docs_legacy/common/components/TrashTable'
import { AppError404 } from '@/routes/_shared/AppError'
import { getSidebarStyle, logSideBarWidth } from '@/common/utils/sidebarStyle'
import * as Root from './DocumentContentPage.style'
import { DocMetaProvider } from '../store/DocMeta'

export const Trash: React.FC = () => {
  const { t } = useDocsI18n()
  const preStyle = useMemo<React.CSSProperties>(getSidebarStyle, [])
  const { loading: podDataloding, data: podData } = useGetPodsQuery()
  const { currentUser } = useContext(MashcardContext)

  const isAnonymous = !currentUser

  const { domain } = useParams() as unknown as { domain: string }

  const matchPod = podData?.pods.find(item => item.domain === domain)

  if (podDataloding) {
    return null
  }
  if (isAnonymous || !matchPod) {
    return <AppError404 />
  }

  const siderBar = <ContentSidebar />
  return (
    <DocMetaProvider
      docMeta={{
        domain,
        isAnonymous: false,
        isMine: true
      }}
    >
      <Helmet titleTemplate={`${t('trash.name')} - %s`} title={domain} />
      <Root.Layout
        width={{
          '@mdOnly': 'md',
          '@smDown': 'sm'
        }}
      >
        <Split onDragEnd={logSideBarWidth}>
          {siderBar && <Root.Section style={preStyle}>{siderBar}</Root.Section>}
          <main className="content">
            <TrashTable docMeta={{ domain }} />
          </main>
        </Split>
      </Root.Layout>
    </DocMetaProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default Trash
