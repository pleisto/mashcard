import { useCallback, useMemo } from 'react'
import { Button, CSS, css, styled, theme } from '@mashcard/design-system'
import { ToolbarSubMenuOption } from '../../../ui'
import { BubbleItemMeta } from './useBubbleMenuItems'
import { isBubbleMenuVisible } from '../BubbleMenu'
import { useEditorContext, useEditorI18n } from '../../../../hooks'
import { FontSize } from '@mashcard/design-icons'

const iconStyle: CSS = {
  include: ['flexCenter'],
  borderRadius: '2px',
  display: 'flex',
  height: '1.5rem',
  width: '1.5rem'
}

const FontColorIcon = styled('span', {
  ...iconStyle,
  background: theme.colors.white,
  border: `1px solid ${theme.colors.borderSecondary}`,
  color: theme.colors.typeSecondary
})

const FontBgColorIcon = styled('span', {
  ...iconStyle
})

const FontColorGroupStyles = css({
  width: '16rem',
  li: {
    marginRight: '.5rem',

    '&:nth-child(7n+7)': {
      marginRight: 0
    }
  }
})

const MenuIcon = styled('span', {
  include: ['flexCenter'],
  display: 'flex',
  flex: 1,
  height: '100%',
  width: '100%'
})

const FontColorMenuItemStyles = css({
  include: ['flexCenter'],
  borderRadius: '2px',
  display: 'flex',
  marginBottom: '.5rem',
  minHeight: 'unset !important',
  minWidth: 'unset !important',
  padding: '0 !important'
})

const ResetItemStyles = css({
  '&:hover, &:active, &:focus': {
    background: 'unset !important'
  }
})

const ResetButton = styled(Button, {
  variants: {
    size: {
      md: {
        color: theme.colors.typeSecondary,
        margin: '.875rem 0',
        width: '100%'
      }
    }
  }
})

const TEXT_COLORS = [
  {
    color: theme.colors.red7.value
  },
  {
    color: theme.colors.yellow9.value
  },
  {
    color: theme.colors.green8.value
  },
  {
    color: theme.colors.cyan6.value
  },
  {
    color: theme.colors.blue6.value
  },
  {
    color: theme.colors.purple5.value
  },
  {
    color: theme.colors.iconThirdary.value
  }
]

const BG_COLORS = [
  {
    color: theme.colors.red2.value
  },
  {
    color: theme.colors.yellow3.value
  },
  {
    color: theme.colors.green3.value
  },
  {
    color: theme.colors.cyan2.value
  },
  {
    color: theme.colors.blue2.value
  },
  {
    color: theme.colors.purple3.value
  },
  {
    color: theme.colors.backgroundSecondary.value
  },
  {
    color: theme.colors.red3.value
  },
  {
    color: theme.colors.yellow4.value
  },
  {
    color: theme.colors.green4.value
  },
  {
    color: theme.colors.cyan3.value
  },
  {
    color: theme.colors.blue3.value
  },
  {
    color: theme.colors.purple2.value
  },
  {
    color: theme.colors.backgroundThirdary.value
  }
]

const PREV_COLOR_KEY = 'PREV_COLOR'
const PREV_BG_COLOR_KEY = 'PREV_BG_COLOR'

export function useFontColorGroup(): ToolbarSubMenuOption | null {
  const [t] = useEditorI18n()
  const { editor } = useEditorContext()
  const fontColorMenuItemStyles = FontColorMenuItemStyles()
  const fontColorGroupStyles = FontColorGroupStyles()
  const resetItemStyles = ResetItemStyles()

  const prevColor = localStorage.getItem(PREV_COLOR_KEY)
  const prevBgColor = localStorage.getItem(PREV_BG_COLOR_KEY) ?? theme.colors.yellow3.value
  const setColor = (color: string) => localStorage.setItem(PREV_COLOR_KEY, color)
  const setBgColor = (color: string) => localStorage.setItem(PREV_BG_COLOR_KEY, color)

  const fontColorItems: BubbleItemMeta[] = useMemo(
    () =>
      TEXT_COLORS.map(colorMeta => ({
        name: colorMeta.color,
        icon: (
          <FontColorIcon>
            <FontSize style={{ color: colorMeta.color }} />
          </FontColorIcon>
        ),
        onAction: () => {
          editor?.chain().focus().setFontColor(colorMeta.color).run()
          setColor(colorMeta.color)
        }
      })),
    [editor]
  )

  const bgColorItems: BubbleItemMeta[] = useMemo(
    () =>
      BG_COLORS.map(colorMeta => ({
        name: colorMeta.color,
        icon: (
          <FontBgColorIcon css={{ background: colorMeta.color }}>
            <FontSize />
          </FontBgColorIcon>
        ),
        onAction: () => {
          editor?.chain().focus().setFontBgColor(colorMeta.color).run()
          setBgColor(colorMeta.color)
        }
      })),
    [editor]
  )

  const resetFontColor = useCallback(() => {
    editor?.chain().focus().unsetFontColor().unsetFontBgColor().run()
  }, [editor])

  const setPrevColorConfig = () => {
    if (prevColor) {
      editor?.chain().focus().setFontColor(prevColor).run()
    }
    if (prevBgColor) {
      editor?.chain().focus().setFontBgColor(prevBgColor).run()
    }
  }

  const option = useMemo<ToolbarSubMenuOption | null>(() => {
    if (!isBubbleMenuVisible(editor)) return null

    const fontColorGroup: ToolbarSubMenuOption = {
      type: 'subMenu',
      name: 'fontColor',
      trigger: 'hover',
      css: {
        color: prevColor ? `${prevColor}!important` : undefined,
        backgroundColor: `${prevBgColor}!important`
      },
      content: (
        <MenuIcon onClick={setPrevColorConfig}>
          <FontSize />
        </MenuIcon>
      ),
      tooltip: t('bubble_menu.fontColor.title') as string,
      items: [
        {
          type: 'group',
          className: fontColorGroupStyles.className,
          orientation: 'horizontal',
          label: t('bubble_menu.fontColor.text_color.label'),
          disableSeparator: true,
          items: fontColorItems.map(item => ({
            type: 'item',
            className: fontColorMenuItemStyles.className,
            name: item.name,
            onAction: item.onAction,
            closeOnAction: true,
            content: item.icon
          }))
        },
        {
          type: 'group',
          className: fontColorGroupStyles.className,
          orientation: 'horizontal',
          label: t('bubble_menu.fontColor.bg_color.label'),
          disableSeparator: true,
          items: bgColorItems.map(item => ({
            type: 'item',
            className: fontColorMenuItemStyles,
            name: item.name,
            onAction: item.onAction,
            closeOnAction: true,
            content: item.icon
          }))
        },
        {
          type: 'item',
          name: 'reset',
          className: resetItemStyles.className,
          closeOnAction: true,
          onAction: resetFontColor,
          content: <ResetButton size="md">{t('bubble_menu.fontColor.reset_button.label')}</ResetButton>
        }
      ]
    }

    return fontColorGroup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.state.selection])

  return option
}
