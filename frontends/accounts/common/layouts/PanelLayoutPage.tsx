import { FC } from 'react'
import styles from './styles.module.less'
import Logo from '@/common/assets/logo_brickdoc.svg'
import { useAccountsI18n } from '@/accounts/common/hooks'
import { css } from '@brickdoc/design-system'
import { Helmet } from 'react-helmet-async'
import ClassNames from 'classnames'

const cardStyle = css({
  include: ['ceramicPrimary']
})

export const PanelLayoutPage: FC = ({ children }) => {
  const { t } = useAccountsI18n()

  return (
    <>
      <Helmet titleTemplate={`%s - ${t('app_title')}`} defaultTitle={t('app_title')} />
      <div className={styles.root}>
        <header className={styles.header}>
          <a href="/">
            <img src={Logo} alt="Brickdoc" />
          </a>
        </header>
        <main className={ClassNames(styles.card, cardStyle())}>{children}</main>
        <footer />
      </div>
    </>
  )
}
