import { Button, Tooltip, Icon } from '@brickdoc/design-system'
import { itemStyle } from '@/docs/pages/components/DocumentTopBar/DocumentTopBar.style'
import React from 'react'
import { useDocsI18n } from '../../hooks'
import { SharePopover } from '../SharePopover'
interface ShareMenuProps {
  className?: string
}

export const ShareMenu: React.FC<ShareMenuProps> = ({ className }) => {
  const { t } = useDocsI18n()

  return (
    <SharePopover>
      <Tooltip title={t('share.tooltip')}>
        <Button className={className} type="text" css={itemStyle}>
          <Icon.Share aria-label={t('share.menu')} />
        </Button>
      </Tooltip>
    </SharePopover>
  )
}
