import { FC, useContext } from 'react'
import { useSettingsI18n } from '@/settings/common/hooks'
import { Helmet } from 'react-helmet-async'
import { SettingsContext } from '@/settings/SettingContext'
import { ProfileEdit } from './ProfileEdit'
import { Appearance } from './Appearance'
import { WebidUpdate } from './WebidUpdate'

export const GeneralPage: FC = () => {
  const { t } = useSettingsI18n()
  const { pod } = useContext(SettingsContext)!

  return (
    <>
      <Helmet title={t('menu.general')} />
      <ProfileEdit pod={pod} />
      <WebidUpdate pod={pod} />
      {pod?.personal && <Appearance pod={pod} />}
    </>
  )
}
