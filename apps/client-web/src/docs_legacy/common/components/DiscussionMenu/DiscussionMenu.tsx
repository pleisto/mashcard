import { MashcardEventBus, DiscussionListToggle } from '@mashcard/schema'
import { itemStyle } from '@/docs_legacy/pages/components/DocumentTopBar/DocumentTopBar.style'
import { Button, Tooltip, Icon } from '@mashcard/design-system'
import { useCallback } from 'react'
import { useDocsI18n } from '../../hooks'

export interface DiscussionMenuProps {
  className?: string
}

export const DiscussionMenu: React.FC<DiscussionMenuProps> = ({ className }) => {
  const { t } = useDocsI18n()

  const onClick = useCallback(() => {
    MashcardEventBus.dispatch(DiscussionListToggle({}))
  }, [])

  return (
    <Tooltip title={t('discussion.tooltip')}>
      <Button className={className} type="text" onClick={onClick} css={itemStyle}>
        <Icon.Message aria-label={t('discussion.menu')} />
      </Button>
    </Tooltip>
  )
}
