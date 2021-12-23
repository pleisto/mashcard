import * as React from 'react'
import { Editor } from '@tiptap/core'
import { Button, Icon, Input, Popover, Tooltip } from '@brickdoc/design-system'
import { StyleMeta } from './BubbleMenu'
import { EditorContext } from '../../context/EditorContext'

const LinkStyle: StyleMeta = {
  key: 'link',
  value: 'link',
  label: <Icon.Link />
}

function copyTextToClipboard(text: string): void {
  void navigator.clipboard.writeText(text)
}

export const LinkMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const { t } = React.useContext(EditorContext)
  const href = React.useRef(editor.getAttributes('link').href)

  const [currentLink, setCurrentLink] = React.useState<string>(href.current)
  const setLink = (): void => {
    editor.chain().focus().setLink({ href: currentLink }).run()
    handleMenuVisibleChange(false)
  }

  const copyLink = (): void => {
    copyTextToClipboard(currentLink)
    handleMenuVisibleChange(false)
  }

  const removeLink = (): void => {
    editor.chain().focus().unsetLink().run()
    href.current = undefined
    setCurrentLink('')
    handleMenuVisibleChange(false)
  }

  const [menuVisible, setMenuVisible] = React.useState(false)
  const handleMenuVisibleChange = (visible: boolean): void => {
    setMenuVisible(visible)

    if (visible) {
      href.current = editor.getAttributes('link').href
      setCurrentLink(href.current)
    } else {
      editor.commands.focus()
    }
  }

  const handleMenuClick = (event: React.MouseEvent): void => event.preventDefault()

  const menu = (
    <div className="brickdoc-bubble-link-menu">
      <Input
        value={currentLink}
        onChange={event => setCurrentLink(event.target.value)}
        className="bubble-link-menu-input"
        placeholder={t('bubblemenu.items.link.link_placeholder')}
      />
      {href.current && (
        <>
          <Button
            className="bubble-link-menu-item bubble-link-menu-link-to-button"
            onClick={() => window.open(href.current, '_blank')}
          >
            <div className="bubble-link-to-button-head">{t('bubblemenu.items.link.linked_to')}</div>
            <div className="bubble-link-to-button-content">
              <Icon.FilePages className="bubble-link-to-button-icon" />
              <div className="bubble-link-to-button-content-text">
                {href.current}
                <div className="bubble-link-to-button-content-hint">{t('bubblemenu.items.link.web_page')}</div>
              </div>
            </div>
          </Button>
        </>
      )}
      {currentLink && (
        <Button className="bubble-link-menu-item" onClick={copyLink}>
          <Icon.Copy />
          <span>{t('bubblemenu.items.link.copy_link')}</span>
        </Button>
      )}
      {href.current && (
        <Button className="bubble-link-menu-item" onClick={removeLink}>
          <Icon.Delete />
          <span>{t('bubblemenu.items.link.remove_link')}</span>
        </Button>
      )}
      {currentLink && (
        <Button className="bubble-link-menu-item" onClick={setLink}>
          <Icon.Link />
          <span>{t('bubblemenu.items.link.link_to_url')}</span>
        </Button>
      )}
    </div>
  )

  const buttonRef = React.useRef(null)

  return (
    <Tooltip
      overlayClassName="brickdoc-bubble-menu-item-hint"
      destroyTooltipOnHide={true}
      title={
        <>
          <div className="item-hint-main">{t(`bubblemenu.items.${LinkStyle.key}.desc`)}</div>
          {LinkStyle.shortcutDesc && <div className="item-hint-sub">{LinkStyle.shortcutDesc}</div>}
        </>
      }
      placement="top"
    >
      <Popover
        destroyTooltipOnHide={true}
        visible={menuVisible}
        onVisibleChange={handleMenuVisibleChange}
        overlayClassName="bubble-menu-item-link-popover"
        getPopupContainer={() => buttonRef.current!}
        content={menu}
        placement="bottom"
        trigger={['click']}
      >
        <Button ref={buttonRef} role="menuitem" onClick={handleMenuClick} type="text" className="bubble-menu-item">
          <Icon.Link className="bubble-menu-item-icon" />
          <Icon.LineDown className="bubble-menu-item-arrow-icon" />
        </Button>
      </Popover>
    </Tooltip>
  )
}
