import SignInPage from '../modules/sessions/SignInPage'
import SignUpPage from '../modules/sessions/SignUpPage'
import { renderRoutes } from "react-router-config"

export default renderRoutes([
  {
    path: '/sign_in',
    component: SignInPage
  },
  {
    path: '/sign_up',
    component: SignUpPage
  }
])
