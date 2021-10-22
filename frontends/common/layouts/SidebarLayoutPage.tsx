import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Layout } from '@brickdoc/design-system'
import { useDocsI18n } from '@/docs/common/hooks'
import { headerBarVar, siderBarVar } from '@/common/reactiveVars'
import styles from './styles.module.less'
import { useReactiveVar } from '@apollo/client'

export const SidebarLayoutPage: React.FC = ({ children }) => {
  const { t } = useDocsI18n()
  const { Sider, Content, Header } = Layout
  const headerBar = useReactiveVar(headerBarVar)
  const siderBar = useReactiveVar(siderBarVar)

  return (
    <>
      <Helmet titleTemplate={`%s - ${t('app_title')}`} defaultTitle={t('app_title')} />
      <div className={styles.acrylicBg}>
        <Layout>
          <Sider className={styles.sider}>{siderBar}</Sider>
          <Layout className={styles.main}>
            {headerBar !== undefined && <Header>{headerBar}</Header>}
            <Content className={styles.content}>{children}</Content>
          </Layout>
          <aside className={styles.pluginBar}>&nbsp;&nbsp;</aside>
        </Layout>
      </div>
    </>
  )
}
