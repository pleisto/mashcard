import { createContext } from 'react'
import { NodeViewProps } from '@tiptap/core'

export interface BlockContextData {
  deleteBlock: () => void
  duplicateBlock: () => void
  moveBlock: () => void
  copyContent: () => void
  getPosition: () => number | undefined
  updateDraggingStatus: (dragging: boolean) => void
  dragging: boolean
  node: NodeViewProps['node'] | null
}

export const BlockContext = createContext<BlockContextData>({
  deleteBlock() {},
  duplicateBlock() {},
  moveBlock() {},
  copyContent() {},
  getPosition() {
    return undefined
  },
  updateDraggingStatus() {},
  dragging: false,
  node: null
})
