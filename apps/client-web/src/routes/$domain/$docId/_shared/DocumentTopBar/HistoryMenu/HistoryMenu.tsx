import { Button, Icon, Tooltip } from '@mashcard/design-system'
import { HistoryListToggle, MashcardEventBus } from '@mashcard/schema'
import { useCallback } from 'react'
import { itemStyle } from '../DocumentTopBar.style'
import { useDocsI18n } from '../../../../_shared/useDocsI18n'

export interface HistoryMenuProps {
  className?: string
}

export const HistoryMenu: React.FC<HistoryMenuProps> = ({ className }) => {
  const { t } = useDocsI18n()

  const onClick = useCallback(() => {
    MashcardEventBus.dispatch(HistoryListToggle({}))
  }, [])

  return (
    <Tooltip title={t('history.tooltip')}>
      <Button className={className} type="text" onClick={onClick} css={itemStyle}>
        <Icon.Time aria-label={t('history.menu')} />
      </Button>
    </Tooltip>
  )
}
