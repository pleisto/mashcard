import React from 'react'
import { Link } from 'react-router-dom'
import { Delete } from '@brickdoc/design-icons'
import { useDocsI18n } from '../../hooks'
import { sidebarButtonStyles } from '@/docs/pages/DocumentContentPage.style'
import { Button, Tooltip } from '@brickdoc/design-system'

export interface TrashButtonProps {
  docMeta: {
    id?: string | undefined
    domain: string
  }
}

export const TrashButton: React.FC<TrashButtonProps> = ({ docMeta }) => {
  const { t } = useDocsI18n()

  return (
    <Tooltip title={t('trash.name')}>
      <Link to={`/${docMeta.domain}/trash`}>
        <Button type="text" css={sidebarButtonStyles} icon={<Delete />} />
      </Link>
    </Tooltip>
  )
}
