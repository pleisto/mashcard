import SignInPage from '../modules/sessions/SignInPage'
import { renderRoutes } from "react-router-config"

export default renderRoutes([
  {
    path: '/sign_in',
    component: SignInPage
  }
])
