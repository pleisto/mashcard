import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Layout } from '@brickdoc/design-system'
import { useDocsI18n } from '../hooks'
import { PageTree } from '@/docs/common/components/PageTree'
import { PodSelect } from '@/docs/common/components/PodSelect'
import { SearchModal } from '../components/SearchModal'
import { TrashButton } from '../components/TrashButton'
import { NewPage } from '../components/NewPage'
import { headerBarVar } from '@/docs/common/reactiveVars'
import styles from './styles.module.less'
import { PinList } from '../components/PinList'
interface SidebarLayoutPageProps {
  webid: string
  docid: string | undefined
  isAnonymous: boolean
}

export const SidebarLayoutPage: React.FC<SidebarLayoutPageProps> = ({ webid, docid, isAnonymous, children }) => {
  const { t } = useDocsI18n()
  const { Sider, Content, Header } = Layout

  const sider = isAnonymous ? (
    <></>
  ) : (
    <Sider className={styles.sider}>
      <PodSelect webid={webid} />
      <SearchModal webid={webid} />

      <div className={styles.scrollArea}>
        <PageTree webid={webid} docid={docid} />
        <TrashButton webid={webid} docid={docid} />
      </div>
      <div className={styles.siderFooter}>
        <NewPage webid={webid} />
      </div>
    </Sider>
  )

  return (
    <>
      <Helmet titleTemplate={`%s - ${t('app_title')}`} defaultTitle={t('app_title')} />
      <div className={styles.acrylicBg}>
        <Layout>
          {sider}
          <Layout>
            <Header>{headerBarVar()}</Header>
            <Content className={styles.content}>{children}</Content>
          </Layout>
          <aside className={styles.pluginBar}>&nbsp;&nbsp;</aside>
        </Layout>
      </div>
    </>
  )
}
