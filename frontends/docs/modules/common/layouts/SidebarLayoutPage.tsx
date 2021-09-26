import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Layout } from '@brickdoc/design-system'
import { Link } from 'react-router-dom'
import { useDocsI18n } from '../hooks'
import { PageTree } from '@/docs/modules/common/components/PageTree'
import { PodSelect } from '@/docs/modules/common/components/PodSelect'
import { v4 as uuid } from 'uuid'
import { SearchModal } from '../components/SearchModal'
// import { TrashButton } from '../components/TrashButton'
interface SidebarLayoutPageProps {
  webid: string
  docid: string | undefined
}

export const SidebarLayoutPage: React.FC<SidebarLayoutPageProps> = ({ webid, docid, children }) => {
  const { t } = useDocsI18n()
  const { Sider, Content, Footer } = Layout
  return (
    <>
      <Helmet titleTemplate={`%s - ${t('app_title')}`} defaultTitle={t('app_title')} />
      <Layout>
        <Sider width={240}>
          <PodSelect webid={webid} />
          <SearchModal webid={webid} />
          <PageTree webid={webid} />
          {/* <TrashButton webid={webid} docid={docid} /> */}

          <Footer style={{ textAlign: 'center' }}>
            <Link style={{ color: 'inherit' }} to={`/${webid}/p/${uuid()}`}>
              + {t('blocks.create_pages')}
            </Link>
          </Footer>
        </Sider>
        <Content>{children}</Content>
      </Layout>
    </>
  )
}
