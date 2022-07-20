import { Button, Icon, Tooltip } from '@mashcard/design-system'
import React from 'react'
import { itemStyle } from '../DocumentTopBar.style'
import { SharePopover } from './SharePopover'
import { useDocsI18n } from '../../../../_shared/useDocsI18n'
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
