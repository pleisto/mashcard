import { Button, Icon, Tooltip } from '@mashcard/design-system'
import { DiscussionListToggle, MashcardEventBus } from '@mashcard/schema'
import { useCallback } from 'react'
import { useDocsI18n } from '../../../../_shared/useDocsI18n'
import { itemStyle } from '../DocumentTopBar.style'

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
