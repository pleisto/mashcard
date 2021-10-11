import React, { useContext } from 'react'
import styles from './styles.module.less'
import { BrickdocContext } from '@/BrickdocPWA'
import Logo from '@/common/assets/logo_brickdoc.svg'
import { DefaultLocaleSelect } from '../components/DefaultLocaleSelect'
import { useAccountsI18n } from '@/accounts/common/hooks'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'
import { Helmet } from 'react-helmet-async'

export const PanelLayoutPage: React.FC<RouteConfigComponentProps> = ({ route }) => {
  const context = useContext(BrickdocContext)
  const { t } = useAccountsI18n()
  // Logged-in users can only change the locale through the settings page
  const localeSelect = context.currentUser == null ? <DefaultLocaleSelect currentLocale={context.locale} /> : null

  return (
    <>
      <Helmet titleTemplate={`%s - ${t('app_title')}`} defaultTitle={t('app_title')} />
      <div className={styles.root}>
        <header className={styles.header}>
          <a href="/">
            <img src={Logo} alt="Brickdoc" />
          </a>
          {localeSelect}
        </header>
        <main className={styles.card}>{renderRoutes(route!.routes)}</main>
        <footer />
      </div>
    </>
  )
}
