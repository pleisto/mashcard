import { Button } from '@brickdoc/design-system'
import React, { useState } from 'react'
import { useDocsI18n } from '../../hooks'
import { Delete } from '@brickdoc/design-icons'
import { TrashPopover } from '../TrashPopover'
import { DocMetaProps } from '@/docs/pages/DocumentContentPage'
import classNames from 'classnames'

import styles from './index.module.less'

export const TrashButton: React.FC<DocMetaProps> = ({ docMeta }) => {
  const { t } = useDocsI18n()
  const [trashModalVisible, setTrashModalVisible] = useState<boolean>(false)

  const onClick = (): void => {
    setTrashModalVisible(true)
  }

  return (
    <>
      <Button type="text" className={classNames([styles.delBtn, 'brd-btn-text'])} icon={<Delete />} onClick={onClick}>
        {t('trash.name')}
      </Button>
      <TrashPopover docMeta={docMeta} visible={trashModalVisible} setVisible={setTrashModalVisible} />
    </>
  )
}
