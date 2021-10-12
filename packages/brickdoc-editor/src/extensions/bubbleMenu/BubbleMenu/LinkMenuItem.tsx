import * as React from 'react'
import { Editor } from '@tiptap/core'
import { Button, Dropdown, Icon, Input, Tooltip } from '@brickdoc/design-system'
import { StyleMeta } from './BubbleMenu'
import { useEditorI18n } from '../../../hooks'

const LinkStyle: StyleMeta = {
  key: 'link',
  value: 'link',
  label: <Icon.Link />
}

function copyTextToClipboard(text: string): void {
  void navigator.clipboard.writeText(text)
}

export const LinkMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const { t } = useEditorI18n()
  const menuFocus = React.useRef<boolean>(false)
  const href = React.useRef(editor.getAttributes('link').href)

  const [currentLink, setCurrentLink] = React.useState<string>(href.current)
  const setLink = (): void => {
    editor.chain().focus().setLink({ href: currentLink }).run()
    menuFocus.current = false
    handleMenuVisibleChange(false)
  }

  const copyLink = (): void => {
    copyTextToClipboard(currentLink)
    menuFocus.current = false
    handleMenuVisibleChange(false)
  }

  const removeLink = (): void => {
    editor.chain().focus().unsetLink().run()
    href.current = undefined
    setCurrentLink('')
    menuFocus.current = false
    handleMenuVisibleChange(false)
  }

  const [menuVisible, setMenuVisible] = React.useState(false)
  const handleMenuVisibleChange = (visible: boolean): void => {
    setTimeout(() => {
      if (!menuFocus.current) setMenuVisible(visible)
    }, 50)

    if (visible) {
      href.current = editor.getAttributes('link').href
      setCurrentLink(href.current)
    }
  }

  const menu = (
    <div className="brickdoc-bubble-link-menu">
      <Input
        onFocus={() => (menuFocus.current = true)}
        onBlur={() => {
          menuFocus.current = false
          handleMenuVisibleChange(false)
        }}
        value={currentLink}
        onChange={event => setCurrentLink(event.target.value)}
        className="bubble-link-menu-input"
        placeholder={t('bubblemenu.items.link.link_placeholder')}
      />
      {href.current && (
        <>
          <Button
            className="bubble-link-menu-item bubble-link-menu-link-to-button"
            onFocus={() => (menuFocus.current = true)}
            onBlur={() => (menuFocus.current = false)}
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
        <Button
          className="bubble-link-menu-item"
          onFocus={() => (menuFocus.current = true)}
          onBlur={() => (menuFocus.current = false)}
          onClick={copyLink}
        >
          <Icon.Copy />
          <span>{t('bubblemenu.items.link.copy_link')}</span>
        </Button>
      )}
      {href.current && (
        <Button
          className="bubble-link-menu-item"
          onFocus={() => (menuFocus.current = true)}
          onBlur={() => (menuFocus.current = false)}
          onClick={removeLink}
        >
          <Icon.Delete />
          <span>{t('bubblemenu.items.link.remove_link')}</span>
        </Button>
      )}
      {currentLink && (
        <Button
          className="bubble-link-menu-item"
          onFocus={() => (menuFocus.current = true)}
          onBlur={() => (menuFocus.current = false)}
          onClick={setLink}
        >
          <Icon.Link />
          <span>{t('bubblemenu.items.link.link_to_url')}</span>
        </Button>
      )}
    </div>
  )

  return (
    <Tooltip
      overlayClassName="brickdoc-bubble-menu-item-hint"
      title={
        <>
          <div className="item-hint-main">{t(`bubblemenu.items.${LinkStyle.key}.desc`)}</div>
          {LinkStyle.shortcutDesc && <div className="item-hint-sub">{LinkStyle.shortcutDesc}</div>}
        </>
      }
      placement="top"
    >
      <Dropdown
        destroyPopupOnHide={true}
        visible={menuVisible}
        onVisibleChange={handleMenuVisibleChange}
        overlay={menu}
        placement="bottomCenter"
        trigger={['click']}
      >
        <Button role="menuitem" onClick={e => e.preventDefault()} type="text" className="bubble-menu-item">
          <Icon.Link className="bubble-menu-item-icon" />
          <Icon.LineDown className="bubble-menu-item-arrow-icon" />
        </Button>
      </Dropdown>
    </Tooltip>
  )
}
