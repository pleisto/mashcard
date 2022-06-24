import { FC } from 'react'

import { Delete } from '@mashcard/design-icons'
import { useDocsI18n } from '../../hooks'
import { SidebarLink } from '@/docs/pages/DocumentContentPage.style'
import { Button } from '@mashcard/design-system'
import { TEST_ID_ENUM } from '@mashcard/test-helper'
import { useDocMeta } from '@/docs/store/DocMeta'

export const TrashButton: FC = () => {
  const { t } = useDocsI18n()
  const { domain } = useDocMeta()

  return (
    <SidebarLink to={`/${domain}/trash`}>
      <Button type="text" icon={<Delete />} data-testid={TEST_ID_ENUM.trash.button.id}>
        {t('trash.name')}
      </Button>
    </SidebarLink>
  )
}
