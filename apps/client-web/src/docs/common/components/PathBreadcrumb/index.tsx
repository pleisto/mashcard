import React from 'react'
import { BlockEmoji, BlockType } from '@/MashcardGraphQL'
import { Tooltip, Popover, Menu } from '@mashcard/design-system'
import { useDocsI18n } from '../../hooks'
import * as Root from './index.style'
import { TEST_ID_ENUM } from '@mashcard/test-helper'
import { useNonNullDocMeta, type Path } from '@/docs/store/DocMeta'

interface PathBreadcrumbProps {
  className: string
}

export const PathBreadcrumb: React.FC<PathBreadcrumbProps> = ({ className }) => {
  const { id, title, domain, documentInfo } = useNonNullDocMeta()
  const paths: Path[] = documentInfo ? documentInfo.pathArray.concat([{ id, text: title, icon: documentInfo.icon }]) : []
  const { t } = useDocsI18n()

  const renderPath = (path: Path, idx: number, showSplit: boolean, fullwidth: Boolean = false): React.ReactNode => {
    const link = `/${domain}/${path.id}`
    const hasEmoji = path.icon && path.icon.type === BlockType.Emoji
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
        <Root.Warp fullWidth={!!fullwidth} to={link} data-testid={TEST_ID_ENUM.layout.header.PathBreadcrumb.item.id}>
          <Root.Emoji show={Boolean(hasEmoji)} data-testid={TEST_ID_ENUM.layout.header.PathBreadcrumb.item.emoji.id}>
            {emoji}
          </Root.Emoji>
          <Root.Path data-testid={TEST_ID_ENUM.layout.header.PathBreadcrumb.item.text.id}>
            {path.text || t('title.untitled')}
          </Root.Path>
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
