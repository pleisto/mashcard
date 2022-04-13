import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { BrickdocContext } from '@/common/brickdocContext'
import { PageTree } from '@/docs/common/components/PageTree'
import { SpaceSelect } from '@/docs/common/components/SpaceSelect'
import { TrashButton } from '@/docs/common/components/TrashButton'
import { NewPage } from './components/NewPage'
import { Helmet } from 'react-helmet-async'
import { useGetSpacesQuery } from '@/BrickdocGraphQL'
import { useDocsI18n } from '../common/hooks'
import Logo from '@/common/assets/logo_brickdoc_without_name.svg'
import { TrashTable } from '@/docs/common/components/TrashTable'
import { AppError404 } from '@/AppError'
import * as Root from './DocumentContentPage.style'

export const Trash: React.FC = () => {
  const { t } = useDocsI18n()
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

  const siderBar = (
    <>
      <div className="mainActions">
        <header style={{ fontSize: 0 }}>
          <img className="brk-logo" src={Logo} alt="Brickdoc" />
        </header>
        <nav>
          <SpaceSelect docMeta={{ loginDomain }} />
          <PageTree docMeta={{ domain, host }} />
        </nav>
      </div>
      <footer>
        <NewPage docMeta={{ domain }} />
        <TrashButton docMeta={{ domain }} />
      </footer>
    </>
  )
  return (
    <>
      <Helmet titleTemplate={`${t('trash.name')} - %s`} title={domain} />
      <Root.Layout
        width={{
          '@mdOnly': 'md',
          '@smDown': 'sm'
        }}
      >
        {siderBar && <Root.Section>{siderBar}</Root.Section>}
        <main>
          <TrashTable docMeta={{ domain }} />
        </main>
      </Root.Layout>
    </>
  )
}
