import { FC, useContext } from 'react'
import { Helmet } from 'react-helmet-async'

import { SettingsContext } from '../_shared/SettingContext'
import { useSettingsI18n } from '../_shared/useSettingsI18n'
import { Display } from './_shared/Display'
import { DomainUpdate } from './_shared/DomainUpdate'
import { ProfileEdit } from './_shared/ProfileEdit'

const General: FC = () => {
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

// eslint-disable-next-line import/no-default-export
export default General
