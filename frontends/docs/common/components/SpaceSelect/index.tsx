import React, { useState, useContext } from 'react'
import { BrickdocContext } from '@/common/brickdocContext'
import { useGetSpacesQuery, useUserSignOutMutation, UserSignOutInput, SpaceOperation } from '@/BrickdocGraphQL'
import { Box, Dropdown, Menu, MenuProps, Tooltip, Button, ButtonProps, devWarning, css } from '@brickdoc/design-system'
import { selectStyle, menuItemStyle } from './index.styles'
import { SpaceCard } from '@/common/components/SpaceCard'
import { Setting, Change } from '@brickdoc/design-icons'
import { useDocsI18n } from '../../hooks'
import { ProfileModal } from '../ProfileModal'
import { DocMetaProps } from '@/docs/pages/DocumentContentPage'

export const SpaceSelect: React.FC<DocMetaProps> = ({ docMeta }) => {
  const { t } = useDocsI18n()
  const { loading, data } = useGetSpacesQuery()
  const [userSignOut, { loading: signOutLoading }] = useUserSignOutMutation()
  const [modalCreateVisible, setModalCreateVisible] = useState<boolean>(false)
  const { currentUser } = useContext(BrickdocContext)

  if (loading || signOutLoading) {
    return <></>
  }

  const space = data?.spaces.find(p => p.domain === docMeta.loginDomain)

  if (!space) {
    console.error('Domain does not match the current user')
    return <></>
  }

  const onClickSpaceSetting = (domain: string): ButtonProps['onClick'] => {
    return (event): void => {
      void event.stopPropagation()
      globalThis.location.href = `/${domain}/settings/general`
    }
  }

  const onClick: MenuProps['onAction'] = async key => {
    const signOutInput: UserSignOutInput = {}
    switch (key) {
      case 'space-create':
        setModalCreateVisible(true)
        break
      case 'logout':
        void (await userSignOut({ variables: { input: signOutInput } }))
        globalThis.location.href = '/'
        break
      default:
        if (key.startsWith('space-')) {
          const domain = key.replace('space-', '')
          globalThis.location.href = `/${domain}`
        } else {
          devWarning(true, 'SpaceSelect.onClick unknown key', key)
        }

        break
    }
  }

  const dropdown = (
    <Menu onAction={onClick}>
      <Menu.Group label={<small>@{currentUser?.domain ?? 'undefined'}</small>}>
        {data?.spaces.map(p => (
          <Menu.Item
            active={p.domain === space.domain}
            itemKey={`space-${p.domain}`}
            key={p.domain}
            className={css(menuItemStyle)()}
          >
            <SpaceCard space={p} label={p.personal ? 'My Space' : false} />
            {p.owned && (
              <Tooltip title={t(p.personal ? 'user_setting.text' : 'space_setting.text')}>
                <Button type="unstyled" icon={<Setting />} onClick={onClickSpaceSetting(p.domain)} />
              </Tooltip>
            )}
          </Menu.Item>
        ))}
      </Menu.Group>
      <Menu.Separator />
      <Menu.Item itemKey="space-create">{t('menu.create_new_space')}</Menu.Item>
      <Menu.Separator />
      <Menu.Item itemKey="logout" danger>
        {t('menu.logout')}
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Dropdown trigger={['click']} overlay={dropdown} placement="topEnd">
        <Box css={selectStyle}>
          <SpaceCard space={space} />
          <Change />
        </Box>
      </Dropdown>
      <ProfileModal
        title={t('menu.create_new_space')}
        space={space}
        type={SpaceOperation.Create}
        visible={modalCreateVisible}
        setVisible={setModalCreateVisible}
      />
    </>
  )
}
