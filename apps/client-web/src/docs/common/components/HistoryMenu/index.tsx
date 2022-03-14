import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
import { Button } from '@brickdoc/design-system'
import { Time } from '@brickdoc/design-icons'
import React, { useState } from 'react'
import { PageHistoryModal } from '../PageHistoryModal'
import { hiddenItemStyle } from '@/docs/pages/components/DocumentTopBar/DocumentTopBar.style'
interface HistoryMenuProps {
  docMeta: NonNullDocMeta
  className?: string
}

export const HistoryMenu: React.FC<HistoryMenuProps> = ({ docMeta, className }) => {
  const [pageHistoryModalVisible, setPageHistoryModalVisible] = useState<boolean>(false)

  const onClick = (): void => {
    setPageHistoryModalVisible(true)
  }
  return (
    <>
      <Button className={className} type="text" onClick={onClick} css={hiddenItemStyle}>
        <Time />
      </Button>
      <PageHistoryModal docMeta={docMeta} visible={pageHistoryModalVisible} setVisible={setPageHistoryModalVisible} />
    </>
  )
}