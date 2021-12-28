import { FC, useContext } from 'react'
import styles from './styles.module.less'
import { BrickdocContext } from '@/common/brickdocContext'
import Logo from '@/common/assets/logo_brickdoc.svg'
import { DefaultLocaleSelect } from '../components/DefaultLocaleSelect'
import { useAccountsI18n } from '@/accounts/common/hooks'
import { css } from '@brickdoc/design-system'
import { Helmet } from 'react-helmet-async'
import ClassNames from 'classnames'

const cardStyle = css({
  include: ['ceramicPrimary']
})

export const PanelLayoutPage: FC = ({ children }) => {
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
        <main className={ClassNames(styles.card, cardStyle())}>{children}</main>
        <footer />
      </div>
    </>
  )
}
