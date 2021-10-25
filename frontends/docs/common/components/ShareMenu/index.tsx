import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
import { Button, Tooltip } from '@brickdoc/design-system'
import React, { useState } from 'react'
import { useDocsI18n } from '../../hooks'
import { SharePopover } from '../SharePopover'
interface ShareMenuProps {
  docMeta: NonNullDocMeta
  className: string
}

export const ShareMenu: React.FC<ShareMenuProps> = ({ docMeta, className }) => {
  const { t } = useDocsI18n()
  const [shareModalVisible, setShareModalVisible] = useState<boolean>(false)

  const onClick = (): void => {
    setShareModalVisible(true)
  }

  const sharePopover = shareModalVisible ? (
    <SharePopover docMeta={docMeta} visible={shareModalVisible} setVisible={setShareModalVisible} />
  ) : (
    <></>
  )
  return (
    <>
      <Tooltip title={t('share.tooltip')}>
        <Button className={className} type="text" onClick={onClick}>
          {t('share.menu')}
        </Button>
      </Tooltip>
      {sharePopover}
    </>
  )
}
