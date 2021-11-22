import React from 'react'
import cx from 'classnames'
import { Button, Dropdown, Icon, Menu, Popover } from '@brickdoc/design-system'
import { useEditorI18n } from '../../..'
import './ActionPanel.less'
import { LinkBlockAttributes } from '../LinkBlock'

export interface ActionPanelProps {
  onFullScreen?: () => void
  onDownload: () => void
  onToggleMode: () => void
  onCopyLink: () => void
  onDelete: () => void
  mode: LinkBlockAttributes['mode']
}

export const ActionPanel: React.FC<ActionPanelProps> = ({
  mode,
  children,
  onFullScreen,
  onDownload,
  onToggleMode,
  onCopyLink,
  onDelete
}) => {
  const [t] = useEditorI18n()
  const panel = (
    <div className="brickdoc-link-block-action-panel">
      {onFullScreen && (
        <Button onClick={onFullScreen} className="brickdoc-link-block-action-button" type="text">
          <Icon.ScreenFull />
        </Button>
      )}
      <Button onClick={onDownload} className="brickdoc-link-block-action-button" type="text">
        <Icon.Download />
      </Button>
      <div className="brickdoc-link-block-action-button-divider" />
      <Button onClick={onToggleMode} className={cx('brickdoc-link-block-action-button', { active: mode === 'link' })} type="text">
        <Icon.TextView />
      </Button>
      <Button onClick={onToggleMode} className={cx('brickdoc-link-block-action-button', { active: mode === 'preview' })} type="text">
        <Icon.Preview />
      </Button>
      <div className="brickdoc-link-block-action-button-divider" />
      <Dropdown
        overlay={
          <Menu className="brickdoc-link-block-more-action-menu">
            {/* <Menu.Item onClick={onDuplicate} className="brickdoc-link-block-more-action-menu-item" key="duplicate">
                <Icon.Copy className="brickdoc-link-block-more-action-menu-item-icon" />
                {t('link_block.menu.more.duplicate')}
              </Menu.Item> */}
            <Menu.Item onClick={onCopyLink} className="brickdoc-link-block-more-action-menu-item" key="copy link">
              <Icon.Link className="brickdoc-link-block-more-action-menu-item-icon" />
              {t('link_block.menu.more.copy')}
            </Menu.Item>
            <Menu.Divider className="brickdoc-link-block-more-action-menu-divider" />
            <Menu.Item onClick={onDelete} className="brickdoc-link-block-more-action-menu-item" key="delete">
              <Icon.Delete className="brickdoc-link-block-more-action-menu-item-icon" />
              {t('link_block.menu.more.delete')}
            </Menu.Item>
          </Menu>
        }>
        <Button className="brickdoc-link-block-action-button" type="text">
          <Icon.More />
        </Button>
      </Dropdown>
    </div>
  )

  return (
    <Popover overlayClassName="brickdoc-link-block-action-panel-popover" trigger="hover" placement="top" content={panel}>
      {children}
    </Popover>
  )
}
