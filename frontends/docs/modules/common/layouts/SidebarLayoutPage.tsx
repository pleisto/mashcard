import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Layout } from '@brickdoc/design-system'
import { Link } from 'react-router-dom'
import { useDocsI18n } from '../hooks'
import PageTree from '@/docs/modules/common/components/PageTree'
import PodSelect from '@/docs/modules/common/components/PodSelect'

interface SidebarLayoutPageProps {
  currentUserWebid: string
}

export const SidebarLayoutPage: React.FC<SidebarLayoutPageProps> = ({ currentUserWebid, children }) => {
  const { t } = useDocsI18n()
  const { Sider, Content, Footer } = Layout
  return (
    <>
      <Helmet titleTemplate={`%s - ${t('app_title')}`} defaultTitle={t('app_title')} />
      <Layout>
        <Sider width={240}>
          <PodSelect webid={currentUserWebid} />
          <PageTree webid={currentUserWebid} />

          <Footer style={{ textAlign: 'center' }}>
            <Link style={{ color: 'inherit' }} to={`/${currentUserWebid}`}>
              + {t('blocks.create_pages')}
            </Link>
          </Footer>
        </Sider>
        <Content>{children}</Content>
      </Layout>
    </>
  )
}
