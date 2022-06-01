import { Editor, findParentNode, getNodeType, isList } from '@tiptap/core'
import { joinBackward as originalJoinBackward, liftEmptyBlock as originalLiftEmptyBlock } from 'prosemirror-commands'
import { NodeType } from 'prosemirror-model'
import { liftListItem as originalLiftListItem } from 'prosemirror-schema-list'
import { TextSelection } from 'prosemirror-state'
import { BulletList, OrderedList, TaskList } from '../../blocks'
import { createExtension } from '../../common'
import { meta } from './meta'

export interface BrickListOptions {}
export interface BrickListAttributes {}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    brickList: {
      wrapInBrickList: (listType: string) => ReturnType
      toggleBrickList: (listType: string) => ReturnType
      setToBrickList: (listType: string) => ReturnType
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
  isListType(BulletList.name)(editor) || isListType(OrderedList.name)(editor) || isListType(TaskList.name)(editor)

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
      setToBrickList:
        listType =>
        ({ commands, chain, editor }) => {
          return isListType(listType)(editor) || chain().setParagraph().toggleList(listType, 'listItem').run()
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
                    // eslint-disable-next-line max-depth
                    if (!$prev.parent.type.name.endsWith('List') && $prev.parent.type !== itemType) {
                      break
                    }
                    pos -= 1
                  }
                  if ($prev) {
                    let newPos = null
                    const prevPos = $prev.pos
                    state.doc.nodesBetween(selection.from, selection.from, (curNode, curPos) => {
                      const curEnd = curPos + curNode.nodeSize
                      tr.deleteRange(curPos, curEnd)
                      tr.insert(prevPos, curNode.content)
                      newPos = prevPos
                      const newEndPos = prevPos + curNode.nodeSize
                      state.doc.nodesBetween(curEnd + 1, curEnd + 1, (nextNode, nextPos) => {
                        if (nextNode.type === prevNode.type) {
                          tr.deleteRange(newEndPos, newEndPos + nextNode.nodeSize)
                          tr.insert(newEndPos, nextNode.content)
                        }
                      })
                    })
                    // eslint-disable-next-line max-depth
                    if (newPos) {
                      const newSelection = new TextSelection(tr.doc.resolve(newPos))
                      // eslint-disable-next-line max-depth
                      if (newSelection) tr.setSelection(newSelection)
                      dispatch?.(tr.scrollIntoView())
                      return true
                    }
                  }
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
