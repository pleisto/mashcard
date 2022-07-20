import { Me, People, Setting } from '@mashcard/design-icons'
import { Loading } from '@mashcard/design-system'
import { FC, ReactElement, Suspense, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

import { useGetCurrentPodQuery } from '@/MashcardGraphQL'
import { AppError403 } from '../_shared/AppError'
import { RequireLogin } from '../_shared/RequireLogin'
import { LayoutContainer } from './_.style'
import { SettingsContext } from './_shared/SettingContext'
import { Sidebar } from './_shared/Sidebar'
import { useSettingsI18n } from './_shared/useSettingsI18n'

const Layout: FC = () => {
  const { t } = useSettingsI18n()
  const { loading, data } = useGetCurrentPodQuery({})
  const pod = data?.pod

  const context = useMemo(() => {
    const isPersonalPod = pod?.personal
    return {
      pod,
      actions: [
        {
          navigatePath: 'general',
          icon: <Setting />,
          available: true
        },
        {
          navigatePath: 'team',
          icon: <People />,
          available: !isPersonalPod
        },
        {
          navigatePath: 'account',
          icon: <Me />,
          available: isPersonalPod
        }
      ].filter(action => action.available)
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
        }}
      >
        <Suspense>
          <Sidebar />
        </Suspense>
        <main>
          <div className="container">
            <Suspense>
              <Outlet />
            </Suspense>
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
