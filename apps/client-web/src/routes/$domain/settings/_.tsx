import { Me, People, Setting } from '@mashcard/design-icons'
import { Loading } from '@mashcard/design-system'
import { FC, ReactElement, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Route, Routes } from 'react-router-dom'

import { GetCurrentPodQuery, useGetCurrentPodQuery } from '@/MashcardGraphQL'
import { AppError403 } from '@/routes/_shared/AppError'
import { RequireLogin } from '../../_shared/RequireLogin'
import AccountPage from './account'
import GeneralPage from './general'
import Index from './index'
import TeamPage from './team'
import { LayoutContainer } from './_.style'
import { SettingsContext } from './_shared/SettingContext'
import { Sidebar } from './_shared/Sidebar'
import { useSettingsI18n } from './_shared/useSettingsI18n'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getRoutes = (currentPod: GetCurrentPodQuery['pod'] | undefined) => {
  const isPersonal = currentPod?.personal
  return [
    {
      key: 'general',
      icon: <Setting />,
      page: <GeneralPage />,
      available: true
    },
    {
      key: 'team',
      icon: <People />,
      page: <TeamPage />,
      available: !isPersonal
    },
    {
      key: 'account',
      icon: <Me />,
      page: <AccountPage />,
      available: isPersonal
    }
  ].filter(i => i.available)
}

const Layout: FC = () => {
  const { t } = useSettingsI18n()
  const { loading, data } = useGetCurrentPodQuery({})
  const pod = data?.pod

  const context = useMemo(() => {
    return {
      pod,
      actions: getRoutes(pod).map(i => ({ key: i.key, icon: i.icon }))
    }
  }, [pod])

  if (loading) return <Loading />
  // only owner could use settings
  if (!pod?.owned) return <AppError403 />

  return (
    <SettingsContext.Provider value={context}>
      <Helmet titleTemplate={`%s - ${t('app_title')}`} />
      <LayoutContainer
        width={{
          '@mdDown': 'fluid',
          '@mdUp': 'fixed'
        }}>
        <Sidebar />
        <main>
          <div className="container">
            <Routes>
              {getRoutes(pod).map(i => (
                <Route key={i.key} path={i.key} element={i.page} />
              ))}
              <Route index element={<Index />} />
            </Routes>
          </div>
        </main>
      </LayoutContainer>
    </SettingsContext.Provider>
  )
}

// eslint-disable-next-line import/no-default-export
export default (): ReactElement => (
  <RequireLogin>
    <Layout />
  </RequireLogin>
)
