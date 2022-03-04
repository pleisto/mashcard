import React from 'react'

export interface BlockContextData {
  deleteBlock: () => void
  duplicateBlock: () => void
  moveBlock: () => void
  copyContent: () => void
  getPosition: () => number | undefined
  updateDraggingStatus: (dragging: boolean) => void
  insideList: boolean
  dragging: boolean
}

export const BlockContext = React.createContext<BlockContextData>({
  deleteBlock() {},
  duplicateBlock() {},
  moveBlock() {},
  copyContent() {},
  getPosition() {
    return undefined
  },
  updateDraggingStatus() {},
  insideList: false,
  dragging: false
})
