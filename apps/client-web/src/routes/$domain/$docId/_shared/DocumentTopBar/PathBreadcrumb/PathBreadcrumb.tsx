import { BlockEmoji, BlockPath, BlockType } from '@/MashcardGraphQL'
import { Menu, Popover, Tooltip } from '@mashcard/design-system'
import { TEST_ID_ENUM } from '@mashcard/test-helper'
import React from 'react'
import { useNonNullDocMeta } from '../../../../_shared/DocMeta'
import { useDocsI18n } from '../../../../_shared/useDocsI18n'
import * as Root from './PathBreadcrumb.style'

interface PathBreadcrumbProps {
  className: string
}

export const PathBreadcrumb: React.FC<PathBreadcrumbProps> = ({ className }) => {
  const { t } = useDocsI18n()
  const { id, title, domain, documentInfo } = useNonNullDocMeta()
  const paths: BlockPath[] = documentInfo
    ? documentInfo.pathArray.concat([{ id, title, icon: documentInfo.icon, isDeleted: false }])
    : []

  const renderPath = (
    path: BlockPath,
    idx: number,
    showSplit: boolean,
    fullwidth: Boolean = false
  ): React.ReactNode => {
    const link = `/${domain}/${path.id}`
    const hasEmoji = path.icon && path.icon.type === BlockType.Emoji
    const emoji = hasEmoji ? (path.icon as BlockEmoji).emoji : ''
    const title = path.title.length > 0 ? path.title : t('title.untitled')
    return (
      <Tooltip
        key={idx}
        title={
          <Root.Tip>
            {emoji} {title}
          </Root.Tip>
        }
      >
        <Root.Warp fullWidth={!!fullwidth} to={link} data-testid={TEST_ID_ENUM.layout.header.PathBreadcrumb.item.id}>
          <Root.Emoji show={Boolean(hasEmoji)} data-testid={TEST_ID_ENUM.layout.header.PathBreadcrumb.item.emoji.id}>
            {emoji}
          </Root.Emoji>
          <Root.Path data-testid={TEST_ID_ENUM.layout.header.PathBreadcrumb.item.text.id}>{title}</Root.Path>
          <Root.Split show={showSplit}>/</Root.Split>
        </Root.Warp>
      </Tooltip>
    )
  }
  const pathData =
    paths.length >= 4
      ? [
          renderPath(paths[0], 0, true),
          <Popover
            key={1}
            content={
              <Menu>
                {paths.slice(1, -2).map((item, idx) => (
                  <Menu.Item key={idx} itemKey={String(idx)}>
                    {renderPath(item, idx, false, true)}
                  </Menu.Item>
                ))}
              </Menu>
            }
            title={null}
            placement="bottomStart"
            overlayInnerStyle={{ padding: 0, minHeight: 'fit-content' }}
            trigger={['click', 'hover']}
          >
            <div style={{ display: 'flex' }} data-testid={TEST_ID_ENUM.layout.header.PathBreadcrumb.item.id}>
              <Root.Path>...</Root.Path>
              <Root.Split show>/</Root.Split>
            </div>
          </Popover>,
          renderPath(paths[paths.length - 2], paths.length - 2, true),
          renderPath(paths[paths.length - 1], paths.length - 1, false)
        ]
      : paths.map((item, idx) => renderPath(item, idx, idx < paths.length - 1))

  return (
    <div data-testid={TEST_ID_ENUM.layout.header.PathBreadcrumb.id} className={className}>
      {pathData}
    </div>
  )
}
