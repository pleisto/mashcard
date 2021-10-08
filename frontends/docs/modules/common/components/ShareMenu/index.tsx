import { Button } from '@brickdoc/design-system'
import React, { useState } from 'react'
import { useDocsI18n } from '../../hooks'
import { SharePopover } from '../SharePopover'
interface ShareMenuProps {
  id: string | undefined
  webid: string
  className: string
}

export const ShareMenu: React.FC<ShareMenuProps> = ({ id, webid, className }) => {
  const { t } = useDocsI18n()
  const [shareModalVisible, setShareModalVisible] = useState<boolean>(false)
  if (!id) {
    return <></>
  }
  const onClick = (): void => {
    setShareModalVisible(true)
  }
  return (
    <>
      <Button className={className} type="text" onClick={onClick}>
        {t('share.menu')}
      </Button>
      <SharePopover webid={webid} blockId={id} visible={shareModalVisible} setVisible={setShareModalVisible} />
    </>
  )
}
