import { FC } from 'react'
import { Helmet } from 'react-helmet-async'

import { DeleteAccount } from './_shared/DeleteAccount'
import { LeavePods } from './_shared/LeavePods'
import { useSettingsI18n } from '../_shared/useSettingsI18n'

const Account: FC = () => {
  const { t } = useSettingsI18n()

  return (
    <>
      <Helmet title={t('menu.account')} />
      <LeavePods />
      <DeleteAccount />
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default Account
