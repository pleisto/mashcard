import { FC, useContext, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { BrickdocContext } from '@/common/brickdocContext'
import { PanelLayoutPage } from './common/layouts/PanelLayoutPage'
import { SignInPage } from './sessions/SignInPage'
import { SignUpPage } from './sessions/SignUpPage'
import { rootPath } from '@/common/utils'

const AccountsModule: FC = () => {
  const context = useContext(BrickdocContext)

  // Lazy loading of less visited pages
  const ForgetPasswordPage = lazy(async () => await import('./passwords/ForgetPasswordPage'))
  const EditPasswordPage = lazy(async () => await import('./passwords/EditPasswordPage'))

  if (context.currentUser) return <Navigate replace={true} to={rootPath(context)} />

  return (
    <PanelLayoutPage>
      <Routes>
        <Route path="sign_in" element={<SignInPage />} />
        <Route path="sign_up" element={<SignUpPage />} />
        <Route path="password/forget" element={<ForgetPasswordPage />} />
        <Route path="password/edit" element={<EditPasswordPage />} />
        {/* <Route path="*" element={404} /> */}
      </Routes>
    </PanelLayoutPage>
  )
}

export default AccountsModule
