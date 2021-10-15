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
import { DocMetaProps } from '@/docs/pages/DocumentContentPage'

export const SidebarLayoutPage: React.FC<DocMetaProps> = ({ docMeta, children }) => {
  const { t } = useDocsI18n()
  const { Sider, Content, Header } = Layout

  const sider = docMeta.isAnonymous ? (
    <></>
  ) : (
    <Sider className={styles.sider}>
      <PodSelect docMeta={docMeta} />
      <SearchModal docMeta={docMeta} />

      <div className={styles.scrollArea}>
        <PageTree docMeta={docMeta} />
        <TrashButton docMeta={docMeta} />
      </div>
      <div className={styles.siderFooter}>
        <NewPage docMeta={docMeta} />
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
