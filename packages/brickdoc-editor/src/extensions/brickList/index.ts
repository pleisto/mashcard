import { Editor, Extension, findParentNode, getNodeType, isList } from '@tiptap/core'
import { joinBackward as originalJoinBackward, liftEmptyBlock as originalLiftEmptyBlock } from 'prosemirror-commands'
import { NodeType } from 'prosemirror-model'
import { liftListItem as originalLiftListItem } from 'prosemirror-schema-list'
import { Selection } from 'prosemirror-state'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface brickListOptions {}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    brickList: {
      wrapInBrickList: (listType: string) => ReturnType
      joinBackward: () => ReturnType
      liftEmptyBlock: () => ReturnType
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

export const brickListExtension = Extension.create<brickListOptions>({
  name: 'brickList',
  addCommands() {
    return {
      wrapInBrickList:
        listType =>
        ({ commands }) => {
          return commands.wrapInList(listType)
        },
      joinBackward:
        () =>
        ({ editor, commands, state, tr, dispatch }) => {
          const itemType = getNodeType('listItem', state.schema)
          const { selection } = state

          const curNode = selection.$from.parent
          if (curNode.content.size === 0) {
            const listItem = findParentNode(node => node.type === itemType)(selection)
            if (listItem) {
              const listItemNode = listItem.node
              if (listItemNode.textContent.length === 0) {
                const parentListItem = findParentNode(node => node.type === itemType && node !== listItemNode)(selection)

                if (parentListItem) {
                  originalLiftListItem(itemType)(state, dispatch)
                  return commands.splitListItem(itemType)
                }

                let deleteFrom = listItem.pos - 2
                if (deleteFrom < 0) deleteFrom = 0
                tr.delete(deleteFrom, listItem.start + listItemNode.nodeSize)
                const newSelection = Selection.findFrom(tr.doc.resolve(tr.mapping.map(listItem.pos, -1)), -1)
                if (newSelection) tr.setSelection(newSelection)
                if (dispatch) dispatch(tr.scrollIntoView())
                return true
              }
            } else {
              const prevPos = selection.$from.before() - 1
              if (prevPos > 0) {
                const prevNode = tr.doc.resolve(prevPos).parent
                if (prevNode.type.name.endsWith('List')) {
                  tr.delete(selection.$from.before() - 1, selection.$to.after())
                  if (dispatch) dispatch(tr.scrollIntoView())
                  return true
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
        }
    }
  }
})
