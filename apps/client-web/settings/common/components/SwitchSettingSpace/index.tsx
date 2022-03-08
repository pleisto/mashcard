import { FC, useContext } from 'react'
import { SettingsContext } from '@/settings/SettingContext'
import { SpaceCard } from '@/common/components/SpaceCard'
import { Change } from '@brickdoc/design-icons'
import { useGetSpacesQuery } from '@/BrickdocGraphQL'
import { styled, prefix, theme, Dropdown, Menu } from '@brickdoc/design-system'
import { useSettingsI18n } from '../../hooks'

const SpaceSwitcher = styled('div', {
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

export const SwitchSettingSpace: FC = () => {
  const { t } = useSettingsI18n()
  const { space } = useContext(SettingsContext)!
  const { loading, data } = useGetSpacesQuery()

  if (loading) return <></>

  const dropdown = (
    <Menu
      onAction={domain => {
        globalThis.location.href = `/${domain}/settings/general`
      }}
    >
      {data?.spaces
        .filter(p => p.owned)
        .map(p => (
          <Menu.Item active={p.domain === space?.domain} itemKey={p.domain} key={p.domain}>
            <SpaceCard space={p} label={false} />
          </Menu.Item>
        ))}
    </Menu>
  )

  return (
    <Dropdown trigger={['click']} overlay={dropdown} placement="bottomEnd">
      <SpaceSwitcher>
        <SpaceCard space={space!} label={t<string>(`${space?.personal ? 'personal' : 'group'}_space_desc`)} />
        <Change aria-label="Switch to another space" />
      </SpaceSwitcher>
    </Dropdown>
  )
}
