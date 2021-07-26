import React from 'react'
import { Redirect } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import DocumentPage from '@/docs/modules/pages/DocumentPage'

export const routeConfig = (webid: string): any => {
  return renderRoutes([
    {
      path: '/',
      exact: true,
      render: () => <Redirect to={`/${webid}`} />
    },
    {
      path: '/:webid/:docid',
      exact: true,
      component: DocumentPage
    },
    {
      path: '/:webid/:docid/:snapshotVersion',
      exact: true,
      component: DocumentPage
    },
    {
      path: '/:webid',
      exact: true,
      component: DocumentPage
    }
  ])
}
