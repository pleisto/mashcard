import { Button, Icon, Tooltip } from '@mashcard/design-system'
import { ExplorerMenuTrigger, MashcardEventBus } from '@mashcard/schema'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { itemStyle } from '../DocumentTopBar.style'

export interface DiscussionMenuProps {
  className?: string
}
export const ExploreSlash: React.FC<DiscussionMenuProps> = ({ className }) => {
  const { t } = useTranslation('editor')

  const onClick = useCallback(() => {
    MashcardEventBus.dispatch(ExplorerMenuTrigger({}))
  }, [])

  return (
    <Tooltip title={t('block_selector.tooltip')}>
      <Button className={className} type="text" onClick={onClick} css={itemStyle}>
        <Icon.Explore aria-label={t('block_selector.title')} />
      </Button>
    </Tooltip>
  )
}
