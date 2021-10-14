import React, { useState } from 'react'
import { Modal } from '@brickdoc/design-system'
import { SnapshotList } from '../SnapshotList'
import styles from './index.module.css'

interface PageHistoryModalProps {
  webid: string
  visible: boolean
  blockId: string
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const PageHistoryModal: React.FC<PageHistoryModalProps> = ({ webid, visible, blockId, setVisible }) => {
  const [currentVersion, setCurrentVersion] = useState<number | undefined>()
  const [confirmLoading, setConfirmLoading] = React.useState<boolean>(false)

  const onCleanup = (): void => {
    setVisible(false)
    setConfirmLoading(false)
    setCurrentVersion(undefined)
  }

  return (
    <Modal
      width={1100}
      title={null}
      footer={null}
      closable={false}
      destroyOnClose={true}
      visible={visible}
      confirmLoading={confirmLoading}
      onOk={onCleanup}
      onCancel={onCleanup}
      className={styles.modal}
    >
      <SnapshotList
        webid={webid}
        blockId={blockId}
        currentVersion={currentVersion}
        setCurrentVersion={setCurrentVersion}
        confirmLoading={confirmLoading}
        onCleanup={onCleanup}
        setConfirmLoading={setConfirmLoading}
      />
    </Modal>
  )
}
