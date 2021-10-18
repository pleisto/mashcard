import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Layout } from '@brickdoc/design-system'
import { useDocsI18n } from '@/docs/common/hooks'
import { headerBarVar, siderBarVar } from '@/common/reactiveVars'
import styles from './styles.module.less'

export const SidebarLayoutPage: React.FC = ({ children }) => {
  const { t } = useDocsI18n()
  const { Sider, Content, Header } = Layout

  return (
    <>
      <Helmet titleTemplate={`%s - ${t('app_title')}`} defaultTitle={t('app_title')} />
      <div className={styles.acrylicBg}>
        <Layout>
          <Sider className={styles.sider}>{siderBarVar()}</Sider>
          <Layout className={styles.main}>
            {headerBarVar() !== undefined && <Header>{headerBarVar()}</Header>}
            <Content className={styles.content}>{children}</Content>
          </Layout>
          <aside className={styles.pluginBar}>&nbsp;&nbsp;</aside>
        </Layout>
      </div>
    </>
  )
}
