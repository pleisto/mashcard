/* eslint-disable jsx-a11y/no-autofocus */
import { Modal } from '@brickdoc/design-system'
import React from 'react'
import { ProfileTabs } from '../ProfileTabs'
interface ProfileSettingModalProps {
  webid: string | undefined
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProfileSettingModal: React.FC<ProfileSettingModalProps> = ({ webid, visible, setVisible }) => {
  const onCleanup = (): void => {
    setVisible(false)
  }

  if (!webid) {
    return <></>
  }

  return (
    <>
      <Modal
        centered
        title={null}
        onOk={onCleanup}
        onCancel={onCleanup}
        footer={null}
        destroyOnClose={true}
        closable={false}
        visible={visible}>
        <ProfileTabs webid={webid} />
      </Modal>
    </>
  )
}
