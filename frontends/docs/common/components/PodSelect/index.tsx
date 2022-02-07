import React, { useState, useContext } from 'react'
import { BrickdocContext } from '@/common/brickdocContext'
import { useGetPodsQuery, useUserSignOutMutation, UserSignOutInput, PodOperation } from '@/BrickdocGraphQL'
import {
  Box,
  Dropdown,
  DeprecatedSkeleton,
  Menu,
  MenuProps,
  Tooltip,
  Button,
  ButtonProps,
  devWarning,
  css
} from '@brickdoc/design-system'
import { selectStyle, menuItemStyle } from './index.styles'
import { PodCard } from '@/common/components/PodCard'
import { Setting, Change } from '@brickdoc/design-icons'
import { useDocsI18n } from '../../hooks'
import { ProfileModal } from '../ProfileModal'
import { DocMetaProps } from '@/docs/pages/DocumentContentPage'

export const PodSelect: React.FC<DocMetaProps> = ({ docMeta }) => {
  const { t } = useDocsI18n()
  const { loading, data } = useGetPodsQuery()
  const [userSignOut, { loading: signOutLoading }] = useUserSignOutMutation()
  const [modalCreateVisible, setModalCreateVisible] = useState<boolean>(false)
  const { currentUser } = useContext(BrickdocContext)

  if (loading || signOutLoading) {
    return <DeprecatedSkeleton avatar active paragraph={false} />
  }

  const pod = data?.pods.find(p => p.webid === docMeta.loginWebid)

  if (!pod) {
    console.error('Webid does not match the current user')
    return <></>
  }

  const onClickPodSetting = (webid: string): ButtonProps['onClick'] => {
    return (event): void => {
      void event.stopPropagation()
      globalThis.location.href = `/${webid}/settings/general`
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
          const webid = key.replace('pod-', '')
          globalThis.location.href = `/${webid}`
        } else {
          devWarning(true, 'PodSelect.onClick unknown key', key)
        }

        break
    }
  }

  const dropdown = (
    <Menu onAction={onClick}>
      <Menu.Group label={<small>@{currentUser?.webid ?? 'undefined'}</small>}>
        {data?.pods.map(p => (
          <Menu.Item
            active={p.webid === pod.webid}
            itemKey={`pod-${p.webid}`}
            key={p.webid}
            className={css(menuItemStyle)()}
          >
            <PodCard pod={p} label={p.personal ? 'Personal Pod' : false} />
            <Tooltip title={t(p.personal ? 'user_setting.text' : 'pod_setting.text')}>
              <Button type="unstyled" icon={<Setting />} onClick={onClickPodSetting(p.webid)} />
            </Tooltip>
          </Menu.Item>
        ))}
      </Menu.Group>
      <Menu.Separator />
      <Menu.Item itemKey="pod-create">{t('menu.create_new_pod')}</Menu.Item>
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
          <PodCard pod={pod} label={false} />
          <Change />
        </Box>
      </Dropdown>
      <ProfileModal
        title={t('menu.create_new_pod')}
        pod={pod}
        type={PodOperation.Create}
        visible={modalCreateVisible}
        setVisible={setModalCreateVisible}
      />
    </>
  )
}
