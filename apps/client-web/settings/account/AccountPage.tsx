import { FC } from 'react'
import { useSettingsI18n } from '@/settings/common/hooks'
import { Helmet } from 'react-helmet-async'
import { DeleteAccount } from './DeleteAccount'
import { LeaveSpaces } from './LeaveSpaces'

export const AccountPage: FC = () => {
  const { t } = useSettingsI18n()

  return (
    <>
      <Helmet title={t('menu.account')} />
      <LeaveSpaces />
      <DeleteAccount />
    </>
  )
}
