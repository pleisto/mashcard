import React from 'react'
import { BlockEmoji, Blocktype } from '@/BrickdocGraphQL'
import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
import { Link } from 'react-router-dom'
import { useDocsI18n } from '../../hooks'
import styles from './index.module.less'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'

interface PathBreadcrumbProps {
  docMeta: NonNullDocMeta
  className: string
}

export const PathBreadcrumb: React.FC<PathBreadcrumbProps> = ({ docMeta, className }) => {
  const paths: NonNullDocMeta['pathArray'] = docMeta.pathArray.concat([
    { id: docMeta.id, text: docMeta.title, icon: docMeta.icon }
  ])
  const { t } = useDocsI18n()

  const pathData = paths.map((path, idx) => {
    const link = docMeta.isMine ? `/${docMeta.domain}/${path.id}` : '#'
    const emoji = path.icon && path.icon.type === Blocktype.Emoji ? (path.icon as BlockEmoji).emoji : ''
    return (
      <div className={styles.path} key={idx}>
        <Link className={styles.path} to={link}>
          <span className={styles.emoji}>{emoji}</span>
          {path.text || t('title.untitled')}
        </Link>
        {idx < paths.length - 1 ? <span className={styles.splicing}>&nbsp;/&nbsp;</span> : <></>}
      </div>
    )
  })

  return (
    <div data-testid={TEST_ID_ENUM.layout.header.PathBreadcrumb.id} className={className}>
      {pathData}
    </div>
  )
}
