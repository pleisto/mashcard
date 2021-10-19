import { BlockIdKind } from '@/BrickdocGraphQL'
import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDocsI18n } from '../../hooks'
import styles from './index.module.less'

interface PathBreadcrumbProps {
  docMeta: NonNullDocMeta
  className: string
}

export const PathBreadcrumb: React.FC<PathBreadcrumbProps> = ({ docMeta, className }) => {
  const paths: NonNullDocMeta['pathArray'] = docMeta.pathArray.concat([{ id: docMeta.id, text: docMeta.title }])
  const { t } = useDocsI18n()

  const pathData = paths.map((path, idx) => {
    const link = `/${docMeta.webid}/${BlockIdKind.P}/${path.id}`
    return (
      <div key={idx}>
        <Link className={styles.path} to={link}>
          {path.text || t('title.untitled')}
        </Link>
        {idx < paths.length - 1 ? <span>&nbsp;/&nbsp;</span> : <></>}
      </div>
    )
  })

  return <div className={className}>{pathData}</div>
}
