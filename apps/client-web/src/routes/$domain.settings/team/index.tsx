import { FC, useContext } from 'react'
import { Helmet } from 'react-helmet-async'

import { SettingsContext } from '../_shared/SettingContext'
import { useSettingsI18n } from '../_shared/useSettingsI18n'
import { DeletePod } from './_shared/DeletePod'
import { Invite } from './_shared/Invite'
import { Members } from './_shared/Members'

const Team: FC = () => {
  const { t } = useSettingsI18n()
  const { pod } = useContext(SettingsContext)!

  return (
    <>
      <Helmet title={t('menu.team')} />
      <Invite pod={pod} />
      <Members pod={pod} />
      <DeletePod pod={pod} />
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default Team
