import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Layout } from '@brickdoc/design-system'
import { useDocsI18n } from '../hooks'
import { PageTree } from '@/docs/modules/common/components/PageTree'
import { PodSelect } from '@/docs/modules/common/components/PodSelect'
import { SearchModal } from '../components/SearchModal'
import { TrashButton } from '../components/TrashButton'
import { NewPage } from '../components/NewPage'
import styles from './styles.module.less'
interface SidebarLayoutPageProps {
  webid: string
  docid: string | undefined
}

export const SidebarLayoutPage: React.FC<SidebarLayoutPageProps> = ({ webid, docid, children }) => {
  const { t } = useDocsI18n()
  const { Sider, Content, Header } = Layout
  return (
    <div className={styles.acrylicBg}>
      <Helmet titleTemplate={`%s - ${t('app_title')}`} defaultTitle={t('app_title')} />
      <Layout>
        <Sider className={styles.sider}>
          <PodSelect webid={webid} />
          <SearchModal webid={webid} />
          <PageTree webid={webid} />
          <TrashButton webid={webid} docid={docid} />

          <div className={styles.siderFooter}>
            <NewPage webid={webid} />
          </div>
        </Sider>
        <Layout>
          <Header>todo</Header>
          <Content className={styles.content}>{children}</Content>
        </Layout>
        <aside className={styles.pluginBar}>Plugin</aside>
      </Layout>
    </div>
  )
}
