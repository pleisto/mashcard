import { useMemo } from 'react'
import { ListItem, TaskItem } from '../../../extensions'
import { ParagraphViewProps } from '../../../extensions/blocks/paragraph/meta'
import { useEditorI18n } from '../../../hooks'

export function usePlaceholder(
  editor: ParagraphViewProps['editor'],
  node: ParagraphViewProps['node'],
  getPos: ParagraphViewProps['getPos']
): string {
  const isEmpty = !node.isLeaf && !node.childCount
  const [t] = useEditorI18n()

  return useMemo<string>(() => {
    if (!isEmpty) return ''
    const position = getPos()

    const $pos = editor.state.doc.resolve(position)
    const parent = $pos.parent

    // only set placeholder for ListItem and TaskItem
    if (![ListItem.name, TaskItem.name].includes(parent.type.name)) return ''

    return t(`placeholder.${parent.type.name}`)
    // placeholder depends on content size
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmpty])
}
