import { SignInPage } from '../modules/sessions/SignInPage'
import { SignUpPage } from '../modules/sessions/SignUpPage'
import { EditPasswordPage } from '../modules/passwords/EditPasswordPage'
import { ForgetPasswordPage } from '../modules/passwords/ForgetPasswordPage'

import { renderRoutes } from 'react-router-config'

export const routes = renderRoutes([
  {
    path: '/sign_in',
    component: SignInPage
  },
  {
    path: '/sign_up',
    component: SignUpPage
  },
  {
    path: '/password/forget',
    component: ForgetPasswordPage
  },
  {
    path: '/password/edit',
    component: EditPasswordPage
  }
])
