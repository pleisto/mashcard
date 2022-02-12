import { FC, lazy, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { JoinSpacePage } from '@/docs/invite/JoinSpacePage'
import { DocumentContentPage } from '@/docs/pages/DocumentContentPage'
import { BrickdocContext } from '@/common/brickdocContext'
import { rootPath } from '@/common/utils'

const AccountsModule = lazy(async () => await import('@/accounts/Module'))
const SettingsModule = lazy(async () => await import('@/settings/Module'))

const RequireLogin: FC = ({ children }) => {
  const context = useContext(BrickdocContext)
  return context.currentUser ? <>{children}</> : <Navigate replace={true} to="/accounts/sign_in" />
}

export const RootRoutes: FC = () => {
  const context = useContext(BrickdocContext)
  return (
    <Router>
      <Routes>
        <Route path="accounts/*" element={<AccountsModule />} />
        <Route path=":webid/*">
          <Route
            path="settings/*"
            element={
              <RequireLogin>
                <SettingsModule />
              </RequireLogin>
            }
          />
          <Route
            path="join/:secret"
            element={
              <RequireLogin>
                <JoinSpacePage />
              </RequireLogin>
            }
          />
          <Route path=":docid/*" element={<DocumentContentPage />} />
          <Route
            path="*"
            element={
              <RequireLogin>
                <DocumentContentPage />
              </RequireLogin>
            }
          />
        </Route>
        <Route
          path="/"
          element={
            <RequireLogin>
              <Navigate replace to={rootPath(context)} />
            </RequireLogin>
          }
        />
      </Routes>
    </Router>
  )
}
