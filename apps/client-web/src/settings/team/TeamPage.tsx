import { FC, useContext } from 'react'
import { SettingsContext } from '@/settings/SettingContext'
import { useSettingsI18n } from '@/settings/common/hooks'
import { Helmet } from 'react-helmet-async'
import { DeleteSpace } from './DeleteSpace'
import { Invite } from './Invite'
import { Members } from './Members'

export const TeamPage: FC = () => {
  const { t } = useSettingsI18n()
  const { space } = useContext(SettingsContext)!

  return (
    <>
      <Helmet title={t('menu.team')} />
      <Invite space={space} />
      <Members space={space} />
      <DeleteSpace space={space} />
    </>
  )
}
