import * as React from 'react'
import { Editor } from '@tiptap/core'
import { Button, Dropdown, Icon, Input, Tooltip } from '@brickdoc/design-system'
import { StyleMeta } from './BubbleMenu'

const LinkStyle: StyleMeta = {
  value: 'link',
  label: <Icon.Link />,
  desc: 'Link'
}

function copyTextToClipboard(text: string): void {
  if (!navigator.clipboard) {
    const textArea = document.createElement('textarea')
    textArea.value = text

    // Avoid scrolling to bottom
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      document.execCommand('copy')
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err)
    }

    document.body.removeChild(textArea)
    return
  }

  void navigator.clipboard.writeText(text)
}

export const LinkMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
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
        placeholder="Paste link"
      />
      {href.current && (
        <>
          <Button
            className="bubble-link-menu-item bubble-link-menu-link-to-button"
            onFocus={() => (menuFocus.current = true)}
            onBlur={() => (menuFocus.current = false)}
            onClick={() => window.open(href.current, '_blank')}
          >
            <div className="bubble-link-to-button-head">Linked to</div>
            <div className="bubble-link-to-button-content">
              <Icon.FilePages className="bubble-link-to-button-icon" />
              <div className="bubble-link-to-button-content-text">
                {href.current}
                <div className="bubble-link-to-button-content-hint">web page</div>
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
          <span>Copy link</span>
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
          <span>Remove link</span>
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
          <span>Link to URL</span>
        </Button>
      )}
    </div>
  )

  return (
    <Tooltip
      overlayClassName="brickdoc-bubble-menu-item-hint"
      title={
        <>
          <div className="item-hint-main">{LinkStyle.desc}</div>
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
