import React, { useContext, useEffect } from 'react'
import PWAProvider, { BrickdocContext } from "@/common/PWAProvider"
import { BrowserRouter as Router } from 'react-router-dom'
import { notification } from '@brickdoc/design-system'
import Routes from './config/routes'
import PanelLayoutPage from "./modules/common/layouts/PanelLayoutPage"

const AccountsPWA = ()=>{
  const { serverMessage } = useContext(BrickdocContext)
  useEffect(() => {
    if (serverMessage){
      notification.error({
        message: 'Error',
        description: serverMessage
      })
    }
  })
  return <Router basename="/accounts">
    <PanelLayoutPage>
      {Routes}
    </PanelLayoutPage>
  </Router>
}

export default <PWAProvider><AccountsPWA /></PWAProvider>
