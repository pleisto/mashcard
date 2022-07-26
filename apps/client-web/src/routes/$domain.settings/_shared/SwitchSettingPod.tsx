import { Change } from '@mashcard/design-icons'
import { Dropdown, Menu, prefix, styled, theme } from '@mashcard/design-system'
import { FC, useContext } from 'react'

import { useGetPodsQuery } from '@/MashcardGraphQL'
import { PodCard } from '../../_shared/PodCard'
import { SettingsContext } from './SettingContext'
import { useMetaI18n } from '../../_shared/useMetaI18n'

const PodSwitcher = styled('div', {
  display: 'flex',
  margin: '1rem 0 2.5rem',
  padding: '.5rem 12px',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  [`&>.${prefix}-icon`]: {
    color: theme.colors.typeSecondary
  },
  '&:hover': {
    cursor: 'pointer',
    background: theme.colors.black_3p
  }
})

export const SwitchSettingPod: FC = () => {
  const { t } = useMetaI18n()
  const { pod } = useContext(SettingsContext)!
  const { loading, data } = useGetPodsQuery()

  if (loading) return <></>

  const dropdown = (
    <Menu
      onAction={domain => {
        globalThis.location.href = `/${domain}/settings/general`
      }}
    >
      {data?.pods
        .filter(p => p.owned)
        .map(p => (
          <Menu.Item active={p.domain === pod?.domain} itemKey={p.domain} key={p.domain}>
            <PodCard pod={p} />
          </Menu.Item>
        ))}
    </Menu>
  )

  return (
    <Dropdown trigger={['click']} overlay={dropdown} placement="bottomEnd">
      <PodSwitcher>
        <PodCard pod={pod!} label={t<string>(`${pod?.personal ? 'personal' : 'group'}_pod_desc`)} />
        <Change aria-label="Switch to another pod" />
      </PodSwitcher>
    </Dropdown>
  )
}
