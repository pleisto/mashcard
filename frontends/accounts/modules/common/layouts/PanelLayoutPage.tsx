import React, { useContext } from 'react'
import styles from './styles.module.less'
import { BrickdocContext } from '@/common/PWAProvider'
import Logo from '@/common/assets/logo_brickdoc.svg'
import DefaultLocaleSelect from "../components/DefaultLocaleSelect"

const PanelLayoutPage: React.FC = (props)=>{
  const context = useContext(BrickdocContext)

  // Logged-in users can only change the locale through the settings page
  const localeSelect = (context.currentUser == null) ?
    <DefaultLocaleSelect currentLocale={context.locale} /> : null

  return(<div className={styles.root}>
    <header className={styles.header}>
      <a href="/"><img src={Logo} alt="Brickdoc" /></a>
      {localeSelect}
    </header>
    <main className={styles.card}>{props.children}</main>
    <footer />
  </div>)
}
export default PanelLayoutPage
