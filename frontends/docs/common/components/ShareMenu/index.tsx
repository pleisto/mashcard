import { Button, Tooltip } from '@brickdoc/design-system'
import React, { useState } from 'react'
import { useDocsI18n } from '../../hooks'
import { SharePopover } from '../SharePopover'
interface ShareMenuProps {
  id: string
  webid: string
  className: string
}

export const ShareMenu: React.FC<ShareMenuProps> = ({ id, webid, className }) => {
  const { t } = useDocsI18n()
  const [shareModalVisible, setShareModalVisible] = useState<boolean>(false)

  const onClick = (): void => {
    setShareModalVisible(true)
  }
  return (
    <>
      <Tooltip title={t('share.tooltip')}>
        <Button className={className} type="text" onClick={onClick}>
          {t('share.menu')}
        </Button>
      </Tooltip>
      <SharePopover webid={webid} blockId={id} visible={shareModalVisible} setVisible={setShareModalVisible} />
    </>
  )
}
