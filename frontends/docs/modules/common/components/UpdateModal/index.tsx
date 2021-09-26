import React, { useState } from 'react'
import { Modal } from '@brickdoc/design-system'
import { SnapshotList } from '../SnapshotList'

interface UpdateModalProps {
  webid: string
  visible: boolean
  blockId: string
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const UpdateModal: React.FC<UpdateModalProps> = ({ webid, visible, blockId, setVisible }) => {
  const [currentVersion, setCurrentVersion] = useState<number | undefined>()
  const [confirmLoading, setConfirmLoading] = React.useState<boolean>(false)

  const onCleanup = (): void => {
    setVisible(false)
    setConfirmLoading(false)
    setCurrentVersion(undefined)
  }

  return (
    <Modal
      width={1000}
      title={null}
      footer={null}
      closable={false}
      destroyOnClose={true}
      visible={visible}
      confirmLoading={confirmLoading}
      onOk={onCleanup}
      onCancel={onCleanup}>
      <SnapshotList
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
