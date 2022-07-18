import { useEffect, useMemo, useState } from 'react'
import { Icon } from '@mashcard/design-system'
import { ToolbarSubMenuOption, ToolbarOption, ToolbarGroupOption } from '../../../../ui'
import { isBubbleMenuVisible } from '../../BubbleMenu'
import { useEditorContext, useEditorI18n } from '../../../../../hooks'
import { InlineLinkDetail } from '../../../../markViews/InlineLink'
import { menuItemStyles } from './LinkGroup.style'
import { LinkAttributes } from '../../../../../extensions'

export function useLinkGroup(): [ToolbarOption | ToolbarGroupOption | null] {
  const [t] = useEditorI18n()
  const { editor } = useEditorContext()
  const { href, type, pageId } = (editor?.getAttributes('link') ?? {}) as LinkAttributes
  const [inputLink, setInputLink] = useState(href ?? '')

  useEffect(() => {
    setInputLink(href ?? '')
  }, [href])

  const option = useMemo<ToolbarOption | ToolbarGroupOption | null>(() => {
    if (!isBubbleMenuVisible(editor)) return null

    const handleConfirm = (type: LinkAttributes['type'], linkOrPageId: string): boolean =>
      editor
        .chain()
        .focus()
        .setLink({
          type,
          href: type === 'link' ? linkOrPageId : '',
          pageId: type === 'page' ? linkOrPageId : ''
          // TODO: fix this type, override setLink type
        } as any)
        .run()

    const handleUnsetLink = (): boolean => editor.chain().focus().unsetLink().run()

    const menuItemClassName = menuItemStyles()

    const menuItems: ToolbarSubMenuOption['items'] = [
      {
        type: 'item',
        name: 'linkInput',
        label: '',
        className: menuItemClassName,
        content: (
          <InlineLinkDetail
            defaultEdit={!type && !href}
            type={type}
            pageId={pageId}
            link={inputLink}
            onLinkChange={handleConfirm}
            onUnsetLink={handleUnsetLink}
          />
        )
      }
    ]

    const linkGroup: ToolbarOption = {
      type: 'subMenu',
      hasArrow: false,
      name: 'link',
      icon: <Icon.Link />,
      items: menuItems,
      tooltip: t('bubble_menu.link.title') as string
    }

    return linkGroup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.state.selection, inputLink])

  return [option]
}
