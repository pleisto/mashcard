import { Button, Icon } from '@brickdoc/design-system'
import React, { useState } from 'react'
import { PageHistoryModal } from '../PageHistoryModal'
interface UpdateButtonProps {
  id: string | undefined
  webid: string
  className?: string
}

export const MoreMenu: React.FC<UpdateButtonProps> = ({ id, webid, className }) => {
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false)
  if (!id) {
    return <></>
  }
  const onClick = (): void => {
    setUpdateModalVisible(true)
  }
  return (
    <>
      <Button className={className} type="text" onClick={onClick}>
        <Icon.More />
      </Button>
      <PageHistoryModal webid={webid} blockId={id} visible={updateModalVisible} setVisible={setUpdateModalVisible} />
    </>
  )
}
