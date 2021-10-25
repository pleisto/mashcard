import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
import { Button, Icon } from '@brickdoc/design-system'
import React, { useState } from 'react'
import { PageHistoryModal } from '../PageHistoryModal'
interface MoreMenuProps {
  docMeta: NonNullDocMeta
  className: string
}

export const MoreMenu: React.FC<MoreMenuProps> = ({ docMeta, className }) => {
  const [pageHistoryModalVisible, setPageHistoryModalVisible] = useState<boolean>(false)

  const onClick = (): void => {
    setPageHistoryModalVisible(true)
  }
  return (
    <>
      <Button className={className} type="text" onClick={onClick}>
        <Icon.Time />
      </Button>
      <PageHistoryModal docMeta={docMeta} visible={pageHistoryModalVisible} setVisible={setPageHistoryModalVisible} />
    </>
  )
}
