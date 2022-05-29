import { Button } from '@brickdoc/design-system'
import { Time } from '@brickdoc/design-icons'
import React, { useState } from 'react'
import { PageHistoryModal } from '../PageHistoryModal'
import { hiddenItemStyle } from '@/docs/pages/components/DocumentTopBar/DocumentTopBar.style'
interface HistoryMenuProps {
  className?: string
}

export const HistoryMenu: React.FC<HistoryMenuProps> = ({ className }) => {
  const [pageHistoryModalVisible, setPageHistoryModalVisible] = useState<boolean>(false)

  const onClick = (): void => {
    setPageHistoryModalVisible(true)
  }
  return (
    <>
      <Button className={className} type="text" onClick={onClick} css={hiddenItemStyle}>
        <Time />
      </Button>
      <PageHistoryModal visible={pageHistoryModalVisible} setVisible={setPageHistoryModalVisible} />
    </>
  )
}
