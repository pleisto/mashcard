import { BrickdocEventBus, DiscussionListToggle } from '@/../../packages/brickdoc-schema/src'
import { itemStyle } from '@/docs/pages/components/DocumentTopBar/DocumentTopBar.style'
import { Button, Tooltip, Icon } from '@brickdoc/design-system'
import { useCallback } from 'react'
import { useDocsI18n } from '../../hooks'

export interface DiscussionMenuProps {
  className?: string
}

export const DiscussionMenu: React.FC<DiscussionMenuProps> = ({ className }) => {
  const { t } = useDocsI18n()

  const onClick = useCallback(() => {
    BrickdocEventBus.dispatch(DiscussionListToggle({}))
  }, [])

  return (
    <Tooltip title={t('discussion.tooltip')}>
      <Button className={className} type="text" onClick={onClick} css={itemStyle}>
        <Icon.Message aria-label={t('discussion.menu')} />
      </Button>
    </Tooltip>
  )
}
