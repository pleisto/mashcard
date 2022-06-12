import { FC, useContext } from 'react'
import { useSettingsI18n } from '@/settings/common/hooks'
import { Helmet } from 'react-helmet-async'
import { SettingsContext } from '@/settings/SettingContext'
import { ProfileEdit } from './ProfileEdit'
import { Display } from './Display'
import { DomainUpdate } from './DomainUpdate'

export const GeneralPage: FC = () => {
  const { t } = useSettingsI18n()
  const { pod } = useContext(SettingsContext)!

  return (
    <>
      <Helmet title={t('menu.general')} />
      <ProfileEdit pod={pod} />
      <DomainUpdate pod={pod} />
      {pod?.personal && <Display pod={pod} />}
    </>
  )
}
