import { FC, useMemo } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Loading } from '@brickdoc/design-system'
import { Setting, People, Me } from '@brickdoc/design-icons'
import { SettingsLayout } from './common/layout'
import { GeneralPage } from './general/GeneralPage'
import { AccountPage } from './account/AccountPage'
import { TeamPage } from './team/TeamPage'
import { useGetCurrentSpaceQuery, GetCurrentSpaceQuery } from '@/BrickdocGraphQL'
import { SettingsContext } from './SettingContext'

const getRoutes = (currentSpace: GetCurrentSpaceQuery['space'] | undefined) => {
  const isPersonal = currentSpace?.personal
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

const SettingsModule: FC = () => {
  const { loading, data } = useGetCurrentSpaceQuery({})
  const space = data?.space

  const context = useMemo(() => {
    return {
      space,
      actions: getRoutes(space).map(i => ({ key: i.key, icon: i.icon }))
    }
  }, [space])

  if (loading) return <Loading />
  // only owner could use settings
  if (!space?.owned) return <div>403 Forbidden</div>

  return (
    <SettingsContext.Provider value={context}>
      <SettingsLayout>
        <Routes>
          {getRoutes(space).map(i => (
            <Route key={i.key} path={i.key} element={i.page} />
          ))}
          <Route path="*" element={<Navigate replace={true} to="general" />} />
        </Routes>
      </SettingsLayout>
    </SettingsContext.Provider>
  )
}

export default SettingsModule
