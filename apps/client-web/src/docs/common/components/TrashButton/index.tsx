import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Delete } from '@brickdoc/design-icons'
import { useDocsI18n } from '../../hooks'
import { sidebarButtonStyles } from '@/docs/pages/DocumentContentPage.style'
import { Button, Tooltip } from '@brickdoc/design-system'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { useDocMeta } from '@/docs/store/DocMeta'

export const TrashButton: FC = () => {
  const { t } = useDocsI18n()
  const { domain } = useDocMeta()

  return (
    <Tooltip title={t('trash.name')}>
      <Link to={`/${domain}/trash`}>
        <Button type="text" css={sidebarButtonStyles} icon={<Delete />} data-testid={TEST_ID_ENUM.trash.button.id} />
      </Link>
    </Tooltip>
  )
}
