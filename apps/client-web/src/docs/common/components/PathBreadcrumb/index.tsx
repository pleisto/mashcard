import React from 'react'
import { BlockEmoji, Blocktype } from '@/BrickdocGraphQL'
import { Tooltip, Popover, Menu } from '@brickdoc/design-system'
import { NonNullDocMeta, Path } from '@/docs/pages/DocumentContentPage'
import { useDocsI18n } from '../../hooks'
import * as Root from './index.style'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'

interface PathBreadcrumbProps {
  docMeta: NonNullDocMeta
  className: string
}

export const PathBreadcrumb: React.FC<PathBreadcrumbProps> = ({ docMeta, className }) => {
  const paths: Path[] = docMeta.pathArray.concat([{ id: docMeta.id, text: docMeta.title, icon: docMeta.icon }])
  const { t } = useDocsI18n()

  const renderPath = (path: Path, idx: number, showSplit: boolean): React.ReactNode => {
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
                    {renderPath(item, idx, false)}
                  </Menu.Item>
                ))}
              </Menu>
            }
            title={null}
            placement="bottom"
            overlayInnerStyle={{ padding: 0, minHeight: 'fit-content' }}
            trigger={['click', 'hover']}
          >
            <div style={{ display: 'flex' }}>
              <Root.Path to="">...</Root.Path>
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
