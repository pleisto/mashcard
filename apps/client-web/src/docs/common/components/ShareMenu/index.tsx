import { Button, Tooltip, Icon } from '@brickdoc/design-system'
import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
import { itemStyle } from '@/docs/pages/components/DocumentTopBar/DocumentTopBar.style'
import React from 'react'
import { useDocsI18n } from '../../hooks'
import { SharePopover } from '../SharePopover'
interface ShareMenuProps {
  docMeta: NonNullDocMeta
  className?: string
}

export const ShareMenu: React.FC<ShareMenuProps> = ({ docMeta, className }) => {
  const { t } = useDocsI18n()

  return (
    <SharePopover docMeta={docMeta}>
      <Tooltip title={t('share.tooltip')}>
        <Button className={className} type="text" css={itemStyle}>
          <Icon.Share aria-label={t('share.menu')} />
        </Button>
      </Tooltip>
    </SharePopover>
  )
}
