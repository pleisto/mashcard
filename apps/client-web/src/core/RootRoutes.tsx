import { FC, lazy, useContext, ReactNode } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { JoinPodPage } from '@/docs/invite/JoinPodPage'
import { DocumentContentPage } from '@/docs/pages/DocumentContentPage'
import { Trash } from '@/docs/pages/Trash'
import { AppError404, AppError403, AppError500 } from './app-error'
import { BrickdocContext } from '@/common/brickdocContext'
import { rootPath } from '@/common/utils'

const AccountsModule = lazy(async () => await import('@/accounts/Module'))
const SettingsModule = lazy(async () => await import('@/settings/Module'))

const RequireLogin: FC<{ children?: ReactNode }> = ({ children }) => {
  const context = useContext(BrickdocContext)
  return context.currentUser ? <>{children}</> : <Navigate replace={true} to="/accounts/sign_in" />
}

export const RootRoutes: FC = () => {
  const context = useContext(BrickdocContext)
  return (
    <Router>
      <Routes>
        <Route path="code-404" element={<AppError404 />} />
        <Route path="code-403" element={<AppError403 />} />
        <Route path="code-500" element={<AppError500 />} />
        <Route path="accounts/*" element={<AccountsModule />} />
        <Route path=":domain/*">
          <Route path="trash" element={<Trash />} />
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
                <JoinPodPage />
              </RequireLogin>
            }
          />
          <Route path=":docid/histories/:historyId" element={<DocumentContentPage />} />
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
