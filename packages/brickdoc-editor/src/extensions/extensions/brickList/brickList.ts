import { Editor, findParentNode, getNodeType, isList } from '@tiptap/core'
import { joinBackward as originalJoinBackward, liftEmptyBlock as originalLiftEmptyBlock } from 'prosemirror-commands'
import { NodeType } from 'prosemirror-model'
import { liftListItem as originalLiftListItem } from 'prosemirror-schema-list'
import { TextSelection } from 'prosemirror-state'
import { createExtension } from '../../common'
import { meta } from './meta'

export interface BrickListOptions {}
export interface BrickListAttributes {}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    brickList: {
      wrapInBrickList: (listType: string) => ReturnType
      toggleBrickList: (listType: string) => ReturnType
      joinBackward: () => ReturnType
      liftEmptyBlock: () => ReturnType
      liftBrickList: () => ReturnType
    }
  }
}

export const isListType = (nameOrType: string | NodeType) => (editor: Editor) => {
  const { extensions } = editor.extensionManager
  const { state } = editor
  const itemType = getNodeType(nameOrType, state.schema)
  const { selection } = state
  const parentList = findParentNode(node => isList(node.type.name, extensions))(selection)
  return parentList ? parentList.node.type === itemType : false
}

export const isAnyListType = (editor: Editor): boolean =>
  isListType('bulletList')(editor) || isListType('orderedList')(editor)

export const BrickList = createExtension<BrickListOptions, BrickListAttributes>({
  name: meta.name,
  addCommands() {
    return {
      wrapInBrickList:
        listType =>
        ({ commands }) => {
          return commands.wrapInList(listType)
        },
      toggleBrickList:
        listType =>
        ({ commands }) => {
          return commands.toggleList(listType, 'listItem')
        },
      joinBackward:
        () =>
        ({ editor, commands, state, tr, dispatch }) => {
          const { selection } = state
          const itemType = getNodeType('listItem', state.schema)
          const listItem = findParentNode(node => node.type === itemType)(selection)
          const prevText = state.doc.textBetween(listItem?.start ?? selection.$from.before(), selection.$from.pos)
          if (prevText.length === 0) {
            if (listItem) {
              return originalLiftListItem(itemType)(state, dispatch)
            } else {
              const pos = selection.$from.before()
              if (pos > 1) {
                const prevNode = tr.doc.resolve(pos - 1).parent
                if (prevNode.type.name.endsWith('List')) {
                  let pos = selection.$from.before() - 1
                  let $prev = null
                  while (pos > 0) {
                    $prev = tr.doc.resolve(pos)
                    if (!$prev.parent.type.name.endsWith('List') && $prev.parent.type !== itemType) {
                      break
                    }
                    pos -= 1
                  }
                  if ($prev) {
                    const curNode = tr.doc.resolve(selection.from).parent
                    tr.deleteRange(selection.from, selection.from + curNode.nodeSize)
                    tr.insert($prev.pos, curNode.content)
                    const newSelection = new TextSelection(tr.doc.resolve($prev.pos))
                    if (newSelection) tr.setSelection(newSelection)
                    dispatch?.(tr.scrollIntoView())
                    return true
                  }
                  // throw new Error('for the right backward.')
                }
              }
            }
          }
          return originalJoinBackward(state, dispatch)
        },
      liftEmptyBlock:
        () =>
        ({ state, dispatch }) => {
          return originalLiftEmptyBlock(state, dispatch)
        },
      liftBrickList:
        () =>
        ({ state, dispatch }) => {
          const { selection } = state
          const itemType = getNodeType('listItem', state.schema)
          const listItem = findParentNode(node => node.type === itemType)(selection)
          if (listItem) {
            return originalLiftListItem(itemType)(state, dispatch)
          } else {
            return true
          }
        }
    }
  }
})
