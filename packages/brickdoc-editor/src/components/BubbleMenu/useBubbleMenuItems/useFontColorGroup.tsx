import React from 'react'
import { Icon, styled } from '@brickdoc/design-system'
import { EditorContext } from '../../../context/EditorContext'
import { ToolbarOption, ToolbarGroupOption } from '../../Toolbar'
import { COLOR } from '../../../helpers'
import { BubbleItemMeta, isBubbleMenuVisible, NodeIcon } from './useBubbleMenuItems'

const FontColorIcon = styled('span', {
  include: ['flexCenter'],
  display: 'flex',
  flex: 1,
  height: '100%',
  width: '100%'
})

export function useFontColorGroup(): [ToolbarOption | ToolbarGroupOption | null] {
  const { t, editor } = React.useContext(EditorContext)

  const option = React.useMemo<ToolbarOption | ToolbarGroupOption | null>(() => {
    if (!isBubbleMenuVisible(editor)) return null

    const activeColor = COLOR.find(color => editor?.isActive('textStyle', { fontColor: color.color }))
    const fontColorItems: BubbleItemMeta[] = COLOR.map(colorMeta => ({
      name: colorMeta.label,
      icon: (
        <NodeIcon>
          <Icon.FontSize style={{ color: colorMeta.color }} />
        </NodeIcon>
      ),
      onAction: () => editor.chain().focus().setFontColor(colorMeta.color).run()
    }))

    const fontColorGroup: ToolbarGroupOption = {
      type: 'group',
      items: [
        {
          type: 'dropdown',
          name: 'fontColor',
          css: { background: activeColor ? activeColor.color : 'unset' },
          content: (
            <FontColorIcon>
              <Icon.FontSize />
            </FontColorIcon>
          ),
          tooltip: t('bubble_menu.fontColor.title') as string,
          items: fontColorItems.map(item => ({
            type: 'item',
            name: item.name,
            icon: item.icon,
            label: t(`bubble_menu.fontColor.${item.name}`),
            onAction: item.onAction,
            closeOnAction: true
          }))
        }
      ]
    }

    return fontColorGroup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.state.selection])

  return [option]
}
