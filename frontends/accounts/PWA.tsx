import React from 'react'
import PWAProvider from "@/common/PWAProvider"
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './config/routes'
import PanelLayoutPage from "./modules/common/panelLayout/Page"

const AccountsPWA = ()=>{
  return <Router basename="/accounts">
    <PanelLayoutPage>
      {Routes}
    </PanelLayoutPage>
  </Router>
}

export default <PWAProvider><AccountsPWA /></PWAProvider>
