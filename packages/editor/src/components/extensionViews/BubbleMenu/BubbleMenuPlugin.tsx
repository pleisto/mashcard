// https://github.com/ueberdosis/tiptap/blob/main/packages/react/src/BubbleMenu.tsx
import {
  BubbleMenuViewPlugin,
  BubbleMenuViewPluginProps
} from '../../../extensions/extensions/bubbleMenu/bubbleMenuViewPlugin'
import { FC, ReactNode, useEffect, useState } from 'react'
import { meta } from '../../../extensions/extensions/bubbleMenu/meta'

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type BubbleMenuPluginProps = Omit<Optional<BubbleMenuViewPluginProps, 'pluginKey'>, 'element'> & {
  className?: string
  children: ReactNode
}

export const BubbleMenuPlugin: FC<BubbleMenuPluginProps> = props => {
  const [element, setElement] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!element) {
      return
    }

    if (props.editor.isDestroyed) {
      return
    }

    const { pluginKey = meta.name, editor, tippyOptions = {}, shouldShow = null } = props

    const plugin = BubbleMenuViewPlugin({
      pluginKey,
      editor,
      element,
      tippyOptions,
      shouldShow
    })

    editor.registerPlugin(plugin)
    return () => editor.unregisterPlugin(pluginKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.editor, element])

  return (
    <div ref={setElement} className={props.className} style={{ visibility: 'hidden' }}>
      {props.children}
    </div>
  )
}
