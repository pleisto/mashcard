import React, { useState } from 'react'
import { useGetPodsQuery, useUserSignOutMutation, UserSignOutInput, PodOperation } from '@/BrickdocGraphQL'
import { Dropdown, Avatar, Skeleton, Menu, MenuProps } from '@brickdoc/design-system'
import { SortTwo } from '@brickdoc/design-system/components/icon'
import { useDocsI18n } from '../../hooks'
import styles from './index.module.less'
import { ProfileModal } from '../ProfileModal'

interface PodSelectProps {
  webid: string
}

export const PodSelect: React.FC<PodSelectProps> = ({ webid }) => {
  const { t } = useDocsI18n()
  const { loading, data } = useGetPodsQuery()
  const [userSignOut, { loading: signOutLoading }] = useUserSignOutMutation()
  const [modalCreateVisible, setModalCreateVisible] = useState<boolean>(false)
  const [modalUpdateVisible, setModalUpdateVisible] = useState<boolean>(false)

  if (loading || signOutLoading) {
    return <Skeleton avatar active paragraph={false} />
  }

  const pod = data?.pods.find(p => p.webid === webid)

  if (!pod) {
    console.error('Webid does not match the current user')
    return <></>
  }

  const onClick: MenuProps['onClick'] = async ({ key }) => {
    const signOutInput: UserSignOutInput = {}
    switch (key) {
      case 'pod-create':
        setModalCreateVisible(true)
        break
      case 'pod-profile':
        setModalUpdateVisible(true)
        break
      case 'logout':
        void (await userSignOut({ variables: { input: signOutInput } }))
        window.location.href = '/'
        break
      default:
        if (key.startsWith('pod-')) {
          const webid = key.replace('pod-', '')
          globalThis.location.href = `/${webid}`
        } else {
          console.log(`unknown key ${key}`)
        }

        break
    }
  }

  const dropdown = (
    <Menu onClick={onClick} selectedKeys={[`pod-${pod.webid}`]}>
      {data?.pods.map(i => (
        <Menu.Item key={`pod-${i.webid}`}>{i.name}</Menu.Item>
      ))}
      <Menu.Divider />
      <Menu.Item key="pod-create">{t('menu.create_new_pod')}</Menu.Item>
      <Menu.Item key="pod-profile">{t('menu.pod_profile')}</Menu.Item>
      <Menu.Item key="logout">{t('menu.logout')}</Menu.Item>
    </Menu>
  )

  let avatar
  if (pod.avatar) {
    avatar = <Avatar src={pod.avatar} />
  } else {
    avatar = <Avatar style={{ background: '#2376b7' }}>{pod.webid}</Avatar>
  }

  return (
    <>
      <Dropdown trigger={['click']} overlay={dropdown} placement="bottomLeft">
        <div className={styles.select}>
          {avatar}
          <div className={styles.name}>
            <span>{pod.name}</span>
            <SortTwo />
          </div>
        </div>
      </Dropdown>
      <ProfileModal
        title={t('menu.create_new_pod')}
        pod={pod}
        type={PodOperation.Create}
        visible={modalCreateVisible}
        setVisible={setModalCreateVisible}
      />
      <ProfileModal
        title={t('menu.edit_profile')}
        pod={pod}
        type={PodOperation.Update}
        visible={modalUpdateVisible}
        setVisible={setModalUpdateVisible}
      />
    </>
  )
}
