import { Button } from '@brickdoc/design-system'
import React, { useState } from 'react'
import { useDocsI18n } from '../../hooks'
import { Delete } from '@brickdoc/design-system/components/icon'
import { TrashPopover } from '../TrashPopover'
import { DocMetaProps } from '@/docs/pages/DocumentContentPage'

export const TrashButton: React.FC<DocMetaProps> = ({ docMeta }) => {
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
      <TrashPopover docMeta={docMeta} visible={trashModalVisible} setVisible={setTrashModalVisible} />
    </>
  )
}
