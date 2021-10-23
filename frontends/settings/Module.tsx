import { FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { siderBarVar } from '@/common/reactiveVars'
import { Sidebar } from './components/Sidebar'
import { GeneralPage } from './GeneralPage'

const SettingsModule: FC = () => {
  siderBarVar(<Sidebar />)

  return (
    <Routes>
      <Route path="profile" element={<GeneralPage />} />
      <Route path="member" element={<GeneralPage />} />
      <Route path="account" element={<GeneralPage />} />
      <Route path="*" element={<Navigate replace={true} to="profile" />} />
    </Routes>
  )
}

export default SettingsModule
