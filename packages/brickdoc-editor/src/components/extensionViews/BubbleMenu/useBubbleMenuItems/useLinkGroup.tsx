import { useContext, useEffect, useMemo, useState } from 'react'
import { Icon, Input, toast } from '@brickdoc/design-system'
import { EditorContext } from '../../../../context/EditorContext'
import { ToolbarSubMenuOption, ToolbarOption, ToolbarGroupOption } from '../../../ui'
import { isBubbleMenuVisible } from './useBubbleMenuItems'

export function useLinkGroup(): [ToolbarOption | ToolbarGroupOption | null] {
  const { t, editor } = useContext(EditorContext)
  const href = editor?.getAttributes('link').href
  const [inputLink, setInputLink] = useState(href)

  useEffect(() => {
    setInputLink(href)
  }, [href])

  const option = useMemo<ToolbarOption | ToolbarGroupOption | null>(() => {
    if (!isBubbleMenuVisible(editor)) return null

    const handleConfirm = (): void => {
      editor.chain().focus().setLink({ href: inputLink }).run()
    }

    const menuItems: ToolbarSubMenuOption['items'] = [
      {
        type: 'item',
        name: 'linkInput',
        content: (
          <Input
            bordered={false}
            value={inputLink}
            onChange={e => {
              setInputLink(e.target.value)
            }}
            onPressEnter={handleConfirm}
            placeholder={t('bubble_menu.link.placeholder')}
          />
        )
      }
    ]

    if (inputLink) {
      menuItems.push({
        type: 'item',
        icon: <Icon.Link />,
        name: 'confirm',
        label: t('bubble_menu.link.confirm'),
        onAction: handleConfirm,
        closeOnAction: true
      })
    }

    if (href) {
      menuItems.push({
        type: 'item',
        icon: <Icon.Copy />,
        name: 'copy',
        label: t('bubble_menu.link.copy'),
        onAction: () => {
          void navigator.clipboard.writeText(href)
          void toast.success(t('copy_hint'))
        },
        closeOnAction: true
      })

      menuItems.push({
        type: 'item',
        icon: <Icon.Delete />,
        name: 'delete',
        label: t('bubble_menu.link.delete'),
        onAction: () => {
          editor.chain().focus().unsetLink().run()
        },
        closeOnAction: true
      })
    }

    const linkGroup: ToolbarGroupOption = {
      type: 'group',
      items: [
        {
          type: 'subMenu',
          name: 'link',
          icon: <Icon.Link />,
          items: menuItems,
          tooltip: t('bubble_menu.link.title') as string
        }
      ]
    }

    return linkGroup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.state.selection, inputLink])

  return [option]
}
