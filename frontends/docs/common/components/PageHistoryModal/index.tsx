import React, { useState } from 'react'
import { Modal } from '@brickdoc/design-system'
import { SnapshotList } from '../SnapshotList'
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
    <Modal width={1100} open={visible} onClose={onCleanup} dialogCss={{ padding: '0' }}>
      <SnapshotList
        docMeta={docMeta}
        currentVersion={currentVersion}
        setCurrentVersion={setCurrentVersion}
        confirmLoading={confirmLoading}
        onCleanup={onCleanup}
        setConfirmLoading={setConfirmLoading}
      />
    </Modal>
  )
}
