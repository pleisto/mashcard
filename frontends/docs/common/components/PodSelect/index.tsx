import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { BrickdocContext } from '@/BrickdocPWA'
import { useGetPodsQuery, useUserSignOutMutation, UserSignOutInput, PodOperation } from '@/BrickdocGraphQL'
import { Dropdown, Skeleton, Menu, MenuProps, Tooltip, Button, ButtonProps } from '@brickdoc/design-system'
import { PodCard } from '@/common/components/PodCard'
import { Setting, Change } from '@brickdoc/design-system/components/icon'
import { useDocsI18n } from '../../hooks'
import styles from './index.module.less'
import { ProfileModal } from '../ProfileModal'
import { DocMetaProps } from '@/docs/pages/DocumentContentPage'

export const PodSelect: React.FC<DocMetaProps> = ({ docMeta }) => {
  const { t } = useDocsI18n()
  const { loading, data } = useGetPodsQuery()
  const [userSignOut, { loading: signOutLoading }] = useUserSignOutMutation()
  const [modalCreateVisible, setModalCreateVisible] = useState<boolean>(false)
  const { currentUser } = useContext(BrickdocContext)
  const history = useHistory()

  if (loading || signOutLoading) {
    return <Skeleton avatar active paragraph={false} />
  }

  const pod = data?.pods.find(p => p.webid === docMeta.loginWebid)

  if (!pod) {
    console.error('Webid does not match the current user')
    return <></>
  }

  const onClickPodSetting = (webid: string): ButtonProps['onClick'] => {
    return (event): void => {
      void event.stopPropagation()
      history.push(`/${webid}/settings/general`)
    }
  }

  const onClick: MenuProps['onClick'] = async ({ key }) => {
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
          console.log(`unknown key ${key}`)
        }

        break
    }
  }

  const dropdown = (
    <Menu onClick={onClick} selectedKeys={[`pod-${pod.webid}`]}>
      <Menu.ItemGroup title={<small>@{currentUser?.webid ?? 'undefined'}</small>}>
        {data?.pods.map(pod => (
          <Menu.Item key={`pod-${pod.webid}`}>
            <div className={styles.menu}>
              <PodCard pod={pod} label={pod.personal ? 'Personal Pod' : false} />
              <Tooltip title={t(pod.personal ? 'user_setting.text' : 'pod_setting.text')}>
                <Button className={styles.addBtn} type="text" onClick={onClickPodSetting(pod.webid)}>
                  <Setting />
                </Button>
              </Tooltip>
            </div>
          </Menu.Item>
        ))}
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.Item key="pod-create">{t('menu.create_new_pod')}</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" danger>
        {t('menu.logout')}
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Dropdown trigger={['click']} overlay={dropdown} overlayClassName={styles.overlay} placement="bottomLeft">
        <div className={styles.select}>
          <PodCard pod={pod} label={false} />
          <div className={styles.icon}>
            <Change />
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
    </>
  )
}
