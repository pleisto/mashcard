import React from 'react'
import { Redirect } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { DocumentContent } from '../modules/pages/DocumentContent'

export const routeConfig = (webid: string): any => {
  return renderRoutes([
    {
      path: '/',
      exact: true,
      render: () => <Redirect to={`/${webid}`} />
    },
    {
      path: '/:webid/p/:docid',
      exact: true,
      component: DocumentContent
    },
    {
      path: '/:webid/p/:docid/s/:snapshotVersion',
      exact: true,
      component: DocumentContent
    },
    {
      path: '/:webid/p/:docid/l/:shareLink',
      exact: true,
      component: DocumentContent
    },
    {
      path: '/:webid',
      exact: true,
      component: DocumentContent
    }
  ])
}
