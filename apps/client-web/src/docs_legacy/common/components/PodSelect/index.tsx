import { useState, useContext, FC } from 'react'
import { MashcardContext } from '@/common/mashcardContext'
import { useGetPodsQuery, useUserSignOutMutation, UserSignOutInput, PodOperation } from '@/MashcardGraphQL'
import { Box, Dropdown, Menu, MenuProps, Tooltip, Button, ButtonProps, devWarning, css } from '@mashcard/design-system'
import {
  selectStyle,
  logoutStyle,
  actionStyle,
  MenuLabel,
  ActionsGroup,
  MenuItem,
  SettingWrapper
} from './index.styles'
import { PodCard } from '@/common/components/PodCard'
import { Setting, Change, Check } from '@mashcard/design-icons'
import { useDocsI18n } from '../../hooks'
import { ProfileModal } from '../ProfileModal'
import { useDocMeta } from '@/docs_legacy/store/DocMeta'

export const PodSelect: FC = () => {
  const { t } = useDocsI18n()
  const { domain } = useDocMeta()
  const { loading, data } = useGetPodsQuery()
  const [userSignOut, { loading: signOutLoading }] = useUserSignOutMutation()
  const [modalCreateVisible, setModalCreateVisible] = useState<boolean>(false)
  const { currentUser } = useContext(MashcardContext)

  if (loading || signOutLoading) {
    return <></>
  }

  const pod = data?.pods.find(p => p.domain === domain)

  if (!pod) {
    devWarning(true, 'Domain does not match the current user', domain, data)
    // NOTE: This is a temporary solution to resolve the issue of the pod not found.
    // Triggerred when the user is not in the pod.
    globalThis.location.href = '/'
    return <></>
  }

  const onClickPodSetting = (domain: string): ButtonProps['onClick'] => {
    return (event): void => {
      void event.stopPropagation()
      globalThis.location.href = `/${domain}/settings/general`
    }
  }

  const onClick: MenuProps['onAction'] = async key => {
    const signOutInput: UserSignOutInput = {}
    switch (key) {
      case 'pod-create':
        setModalCreateVisible(true)
        break
      case 'logout':
        void (await userSignOut({ variables: { input: signOutInput } }))
        globalThis.location.href = '/'
        break
      default:
        if (key.startsWith('pod-')) {
          const domain = key.replace('pod-', '')
          globalThis.location.href = `/${domain}`
        } else {
          devWarning(true, 'PodSelect.onClick unknown key', key)
        }

        break
    }
  }

  const userDomain = `@${currentUser?.domain ?? 'undefined'}`

  const dropdown = (
    <Menu onAction={onClick}>
      <MenuLabel aria-label={userDomain}>{userDomain}</MenuLabel>
      {data?.pods.map(p => (
        <MenuItem as={Menu.Item} active={p.domain === pod.domain} itemKey={`pod-${p.domain}`} key={p.domain}>
          <PodCard pod={p} />
          <ActionsGroup>
            {p.owned && (
              <Tooltip title={t(p.personal ? 'user_setting.text' : 'pod_setting.text')}>
                <Button
                  className="action-setting"
                  type="unstyled"
                  icon={
                    <SettingWrapper>
                      <Setting />
                    </SettingWrapper>
                  }
                  onClick={onClickPodSetting(p.domain)}
                />
              </Tooltip>
            )}
            {p.domain === pod.domain ? (
              <Button className="action-check" type="unstyled" icon={<Check />} onClick={onClickPodSetting(p.domain)} />
            ) : null}
          </ActionsGroup>
        </MenuItem>
      ))}

      <Menu.Separator />
      <Menu.Item itemKey="pod-create" className={css(actionStyle)()}>
        {t('menu.create_new_pod')}
      </Menu.Item>
      <Menu.Separator />
      <Menu.Item itemKey="logout" danger className={css(logoutStyle)()}>
        {t('menu.logout')}
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Dropdown trigger={['click']} overlay={dropdown} placement="topEnd">
        <Box css={selectStyle}>
          <PodCard pod={pod} size="sm" />
          <Change />
        </Box>
      </Dropdown>
      <ProfileModal
        title={t('menu.create_new_pod')}
        type={PodOperation.Create}
        visible={modalCreateVisible}
        setVisible={setModalCreateVisible}
      />
    </>
  )
}
