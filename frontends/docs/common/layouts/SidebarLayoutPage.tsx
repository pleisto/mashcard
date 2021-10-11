import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Layout } from '@brickdoc/design-system'
import { useDocsI18n } from '../hooks'
import { PageTree } from '@/docs/common/components/PageTree'
import { PodSelect } from '@/docs/common/components/PodSelect'
import { SearchModal } from '../components/SearchModal'
import { TrashButton } from '../components/TrashButton'
import { NewPage } from '../components/NewPage'
import styles from './styles.module.less'
interface SidebarLayoutPageProps {
  webid: string
  docid: string | undefined
  isAnonymous: boolean
}

export const SidebarLayoutPage: React.FC<SidebarLayoutPageProps> = ({ webid, docid, isAnonymous, children }) => {
  const { t } = useDocsI18n()
  const { Sider, Content } = Layout

  const sider = isAnonymous ? (
    <></>
  ) : (
    <Sider className={styles.sider}>
      <PodSelect webid={webid} />
      <SearchModal webid={webid} />
      <PageTree webid={webid} docid={docid} />
      <TrashButton webid={webid} docid={docid} />
      <div className={styles.siderFooter}>
        <NewPage webid={webid} />
      </div>
    </Sider>
  )

  return (
    <div className={styles.acrylicBg}>
      <Helmet titleTemplate={`%s - ${t('app_title')}`} defaultTitle={t('app_title')} />
      <Layout>
        {sider}
        <Content className={styles.content}>{children}</Content>
        <aside className={styles.pluginBar}>&nbsp;&nbsp;</aside>
      </Layout>
    </div>
  )
}
