import { FC, lazy } from 'react'
import { Redirect } from 'react-router-dom'
import { renderRoutes, RouteConfig, RouteConfigComponentProps } from 'react-router-config'
import { PanelLayoutPage } from '@/accounts/common/layouts/PanelLayoutPage'
import { LayoutPage as SettingsLayoutPage } from '@/accounts/settings/LayoutPage'

const SignInPage = lazy(async () => await import('@/accounts/sessions/SignInPage'))
const SignUpPage = lazy(async () => await import('@/accounts/sessions/SignUpPage'))
const EditPasswordPage = lazy(async () => await import('@/accounts/passwords/EditPasswordPage'))
const ForgetPasswordPage = lazy(async () => await import('@/accounts/passwords/ForgetPasswordPage'))
const DocumentContentPage = lazy(async () => await import('@/docs/pages/DocumentContentPage'))
const GeneralSettingsPage = lazy(async () => await import('@/accounts/settings/GeneralPage'))

interface routeRule extends RouteConfig {
  beforeAction?: FC<RouteConfigComponentProps> | undefined
  routes?: routeRule[]
}

const generateRouteConfig = (rules: routeRule[]): RouteConfig[] => {
  return rules.map(rule => {
    // recursive sub-routes
    if (rule.routes) rule.routes = generateRouteConfig(rule.routes)

    // replace render with beforeAction if exists
    if (typeof rule.beforeAction === 'function') {
      rule.render = rule.beforeAction
      rule.component = undefined
    }
    return rule
  })
}

export const routeConfig = (context: BrickdocContext): JSX.Element => {
  const { webid } = context.currentPod
  const redirectToLogin: FC<RouteConfigComponentProps> = () => <Redirect to="/accounts/sign_in" />
  const redirectToHome: FC<RouteConfigComponentProps> = () => <Redirect to={`/${webid}`} />
  const authenticateUser = context.currentUser ? undefined : redirectToLogin
  const rules: routeRule[] = [
    {
      path: '/',
      exact: true,
      beforeAction: authenticateUser,
      render: redirectToHome
    },
    // Accounts
    {
      path: '/accounts',
      component: PanelLayoutPage,
      // require user to be unauthenticated
      beforeAction: context.currentUser ? redirectToHome : undefined,
      routes: [
        {
          path: '/accounts/sign_in',
          component: SignInPage
        },
        {
          path: '/accounts/sign_up',
          component: SignUpPage
        },
        {
          path: '/accounts/password/forget',
          component: ForgetPasswordPage
        },
        {
          path: '/accounts/password/edit',
          component: EditPasswordPage
        }
      ]
    },

    // Settings
    {
      path: '/:webid/settings',
      component: SettingsLayoutPage,
      beforeAction: authenticateUser,
      routes: [
        {
          path: '/:webid/settings/general',
          component: GeneralSettingsPage
        }
      ]
    },
    // Docs
    {
      path: '/:webid/:kind/:docid',
      exact: true,
      // beforeAction: authenticateUser,
      component: DocumentContentPage
    },
    {
      path: '/:webid/:kind/:docid/s/:snapshotVersion',
      exact: true,
      beforeAction: authenticateUser,
      component: DocumentContentPage
    },
    {
      path: '/:webid',
      exact: true,
      beforeAction: authenticateUser,
      component: DocumentContentPage
    }
  ]
  return renderRoutes(generateRouteConfig(rules))
}
