import { FC, useContext } from 'react'
import { useSettingsI18n } from '@/settings/common/hooks'
import { Helmet } from 'react-helmet-async'
import { SettingsContext } from '@/settings/SettingContext'
import { ProfileEdit } from './ProfileEdit'
import { Display } from './Display'
import { DomainUpdate } from './DomainUpdate'

export const GeneralPage: FC = () => {
  const { t } = useSettingsI18n()
  const { space } = useContext(SettingsContext)!

  return (
    <>
      <Helmet title={t('menu.general')} />
      <ProfileEdit space={space} />
      <DomainUpdate space={space} />
      {space?.personal && <Display space={space} />}
    </>
  )
}
