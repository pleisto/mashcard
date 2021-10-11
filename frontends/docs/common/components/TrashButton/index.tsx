import { Button } from '@brickdoc/design-system'
import React, { useState } from 'react'
import { useDocsI18n } from '../../hooks'
import { Delete } from '@brickdoc/design-system/components/icon'
import { TrashPopover } from '../TrashPopover'

interface TrashButtonProps {
  webid: string
  docid: string | undefined
}

export const TrashButton: React.FC<TrashButtonProps> = ({ webid, docid }) => {
  const { t } = useDocsI18n()
  const [trashModalVisible, setTrashModalVisible] = useState<boolean>(false)

  const onClick = (): void => {
    setTrashModalVisible(true)
  }

  return (
    <>
      <Button type="text" icon={<Delete />} onClick={onClick}>
        {t('trash.name')}
      </Button>
      <TrashPopover webid={webid} docid={docid} visible={trashModalVisible} setVisible={setTrashModalVisible} />
    </>
  )
}
