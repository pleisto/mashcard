import React from 'react'
import { Plus } from '@brickdoc/design-system/components/icon'
import { Link } from 'react-router-dom'
import { useDocsI18n } from '../../hooks'
import { v4 as uuid } from 'uuid'

interface NewPageProps {
  webid: string
}

export const NewPage: React.FC<NewPageProps> = ({ webid }) => {
  const { t } = useDocsI18n()

  return (
    <Link style={{ color: 'inherit' }} to={`/${webid}/p/${uuid()}`}>
      <Plus />
      {t('blocks.create_pages')}
    </Link>
  )
}
