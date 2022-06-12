import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Delete } from '@brickdoc/design-icons'
import { useDocsI18n } from '../../hooks'
import { sidebarButtonStyles, sidebarTrashLinkstyles } from '@/docs/pages/DocumentContentPage.style'
import { Button } from '@brickdoc/design-system'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { useDocMeta } from '@/docs/store/DocMeta'

export const TrashButton: FC = () => {
  const { t } = useDocsI18n()
  const { domain } = useDocMeta()

  return (
    <Link to={`/${domain}/trash`} style={sidebarTrashLinkstyles}>
      <Button type="text" css={sidebarButtonStyles} icon={<Delete size={18} />} data-testid={TEST_ID_ENUM.trash.button.id}>
        {t('trash.name')}
      </Button>
    </Link>
  )
}
