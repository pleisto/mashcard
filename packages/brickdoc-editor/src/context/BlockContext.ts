import React from 'react'

export interface BlockContextData {
  deleteBlock: () => void
  duplicateBlock: () => void
  moveBlock: () => void
  copyContent: () => void
}

export const BlockContext = React.createContext<BlockContextData>({
  deleteBlock() {},
  duplicateBlock() {},
  moveBlock() {},
  copyContent() {}
})
