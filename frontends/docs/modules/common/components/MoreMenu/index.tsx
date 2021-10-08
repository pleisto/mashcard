import { Button, Icon } from '@brickdoc/design-system'
import React, { useState } from 'react'
import { PageHistoryModal } from '../PageHistoryModal'
interface MoreMenuProps {
  id: string | undefined
  webid: string
  className?: string
}

export const MoreMenu: React.FC<MoreMenuProps> = ({ id, webid, className }) => {
  const [pageHistoryModalVisible, setPageHistoryModalVisible] = useState<boolean>(false)
  if (!id) {
    return <></>
  }
  const onClick = (): void => {
    setPageHistoryModalVisible(true)
  }
  return (
    <>
      <Button className={className} type="text" onClick={onClick}>
        <Icon.More />
      </Button>
      <PageHistoryModal webid={webid} blockId={id} visible={pageHistoryModalVisible} setVisible={setPageHistoryModalVisible} />
    </>
  )
}
