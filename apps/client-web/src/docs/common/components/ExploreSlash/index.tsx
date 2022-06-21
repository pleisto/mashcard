import { MashcardEventBus, ExplorerMenuTrigger } from '@mashcard/schema'
import { useTranslation } from 'react-i18next'
import { itemStyle } from '@/docs/pages/components/DocumentTopBar/DocumentTopBar.style'

import { Button, Tooltip, Icon } from '@mashcard/design-system'
import { useCallback } from 'react'

export interface DiscussionMenuProps {
  className?: string
}
export const ExploreSlash: React.FC<DiscussionMenuProps> = ({ className }) => {
  const { t } = useTranslation('editor')

  const onClick = useCallback(() => {
    MashcardEventBus.dispatch(ExplorerMenuTrigger({}))
  }, [])

  return (
    <Tooltip title={t('slash_menu.tooltip')}>
      <Button className={className} type="text" onClick={onClick} css={itemStyle}>
        <Icon.Explore aria-label={t('slash_menu.title')} />
      </Button>
    </Tooltip>
  )
}
