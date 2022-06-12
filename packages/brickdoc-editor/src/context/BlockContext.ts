import { createContext } from 'react'
import { NodeViewProps } from '@tiptap/core'

export interface BlockContextData {
  deleteBlock: () => void
  getPosition: () => number | undefined
  updateDraggingStatus: (dragging: boolean) => void
  contentForCopy?: string
  dragging: boolean
  node: NodeViewProps['node'] | null
}

export const BlockContext = createContext<BlockContextData>({
  deleteBlock() {},
  getPosition() {
    return undefined
  },
  updateDraggingStatus() {},
  dragging: false,
  node: null
})
