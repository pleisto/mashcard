import { Button } from '@brickdoc/design-system'
import React, { useState } from 'react'
import { UpdateModal } from '../UpdateModal'

interface UpdateButtonProps {
  id: string | undefined
  webid: string
}

export const MoreMenu: React.FC<UpdateButtonProps> = ({ id, webid }) => {
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false)
  if (!id) {
    return <></>
  }
  const onClick = (): void => {
    setUpdateModalVisible(true)
  }
  return (
    <>
      <Button type="text" onClick={onClick}>
        ...
      </Button>
      <UpdateModal webid={webid} blockId={id} visible={updateModalVisible} setVisible={setUpdateModalVisible} />
    </>
  )
}
