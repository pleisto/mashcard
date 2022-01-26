import React, { useState } from 'react'
import { DeprecatedModal } from '@brickdoc/design-system'
import { SnapshotList } from '../SnapshotList'
import styles from './index.module.css'
import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'

interface PageHistoryModalProps {
  docMeta: NonNullDocMeta
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const PageHistoryModal: React.FC<PageHistoryModalProps> = ({ docMeta, visible, setVisible }) => {
  const [currentVersion, setCurrentVersion] = useState<number | undefined>()
  const [confirmLoading, setConfirmLoading] = React.useState<boolean>(false)

  const onCleanup = (): void => {
    setVisible(false)
    setConfirmLoading(false)
    setCurrentVersion(undefined)
  }

  return (
    <DeprecatedModal
      width={1100}
      title={null}
      footer={null}
      closable={false}
      destroyOnClose={true}
      visible={visible}
      confirmLoading={confirmLoading}
      onOk={onCleanup}
      onCancel={onCleanup}
      className={styles.modal}>
      <SnapshotList
        docMeta={docMeta}
        currentVersion={currentVersion}
        setCurrentVersion={setCurrentVersion}
        confirmLoading={confirmLoading}
        onCleanup={onCleanup}
        setConfirmLoading={setConfirmLoading}
      />
    </DeprecatedModal>
  )
}
