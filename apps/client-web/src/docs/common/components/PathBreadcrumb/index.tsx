import React from 'react'
import { BlockEmoji, Blocktype } from '@/BrickdocGraphQL'
import { Tooltip } from '@brickdoc/design-system'
import { NonNullDocMeta } from '@/docs/pages/DocumentContentPage'
import { useDocsI18n } from '../../hooks'
import * as Root from './index.style'
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
  const folding =
    paths.length >= 4
      ? [
          paths[0],
          paths[1],
          {
            ...paths[paths.length - 2],
            text: '...'
          },
          paths[paths.length - 1]
        ]
      : paths

  const pathData = folding.map((path, idx) => {
    const link = docMeta.isMine ? `/${docMeta.domain}/${path.id}` : '#'
    const hasEmoji = path.icon && path.icon.type === Blocktype.Emoji
    const emoji = hasEmoji ? (path.icon as BlockEmoji).emoji : ''
    return (
      <Tooltip
        key={idx}
        title={
          <Root.Tip>
            {emoji} {path.text || t('title.untitled')}
          </Root.Tip>
        }
      >
        <Root.Warp>
          <Root.Emoji show={Boolean(hasEmoji)}>{emoji}</Root.Emoji>
          <Root.Path to={link}>{path.text || t('title.untitled')}</Root.Path>
          <Root.Split show={Boolean(idx < folding.length - 1)}>/</Root.Split>
        </Root.Warp>
      </Tooltip>
    )
  })

  return (
    <div data-testid={TEST_ID_ENUM.layout.header.PathBreadcrumb.id} className={className}>
      {pathData}
    </div>
  )
}
