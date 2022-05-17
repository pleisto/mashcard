import React, { useContext, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Split from '@uiw/react-split'
import { BrickdocContext } from '@/common/brickdocContext'
import { Helmet } from 'react-helmet-async'
import { ContentSidebar } from './components/ContentSidebar'
import { useGetSpacesQuery } from '@/BrickdocGraphQL'
import { useDocsI18n } from '../common/hooks'
import { TrashTable } from '@/docs/common/components/TrashTable'
import { AppError404 } from '@/core/app-error'
import { getSidebarStyle, logSideBarWidth } from '@/common/utils/sidebarStyle'
import * as Root from './DocumentContentPage.style'

export const Trash: React.FC = () => {
  const { t } = useDocsI18n()
  const preStyle = useMemo<React.CSSProperties>(getSidebarStyle, [])
  const { loading: spaceDataloding, data: sapceData } = useGetSpacesQuery()
  const { currentSpace, currentUser, host } = useContext(BrickdocContext)

  const loginDomain = currentSpace.domain
  const isAnonymous = !currentUser

  const { domain } = useParams() as unknown as { domain: string }

  const matchSpace = sapceData?.spaces.find(item => item.domain === domain)

  if (spaceDataloding) {
    return null
  }
  if (isAnonymous || !matchSpace) {
    return <AppError404 />
  }

  const siderBar = <ContentSidebar docMeta={{ loginDomain, host, domain, isAnonymous: false, isMine: true }} />
  return (
    <>
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
    </>
  )
}
