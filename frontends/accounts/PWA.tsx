import React, { FC, useContext, useEffect } from 'react'
import { PWAProvider, BrickdocContext } from '@/common/PWAProvider'
import { BrowserRouter as Router } from 'react-router-dom'
import { notification } from '@brickdoc/design-system'
import { routes } from './config/routes'
import { PanelLayoutPage } from './modules/common/layouts/PanelLayoutPage'

const AccountsPWA: FC = () => {
  const { serverMessage } = useContext(BrickdocContext)
  useEffect(() => {
    if (serverMessage) {
      notification.error({
        message: 'Error',
        description: serverMessage
      })
    }
  })
  return (
    <Router basename="/accounts">
      <PanelLayoutPage>{routes}</PanelLayoutPage>
    </Router>
  )
}

// eslint-disable-next-line import/no-default-export
export default (
  <PWAProvider>
    <AccountsPWA />
  </PWAProvider>
)
