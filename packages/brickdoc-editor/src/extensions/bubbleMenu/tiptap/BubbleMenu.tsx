// fork from: https://github.com/ueberdosis/tiptap/blob/main/packages/react/src/BubbleMenu.tsx
import React, { useEffect, useRef } from 'react'
// change plugin import source to our custom bubble-menu-plugin
import { BubbleMenuPlugin, BubbleMenuPluginKey, BubbleMenuPluginProps } from './bubble-menu-plugin'

export type BubbleMenuProps = Omit<BubbleMenuPluginProps, 'element'> & {
  className?: string
}

export const BubbleMenu: React.FC<BubbleMenuProps> = props => {
  const element = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const { editor, tippyOptions } = props

    editor.registerPlugin(
      BubbleMenuPlugin({
        editor,
        element: element.current as HTMLElement,
        tippyOptions
      })
    )

    return () => {
      editor.unregisterPlugin(BubbleMenuPluginKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={element} className={props.className} style={{ visibility: 'hidden' }}>
      {props.children}
    </div>
  )
}
