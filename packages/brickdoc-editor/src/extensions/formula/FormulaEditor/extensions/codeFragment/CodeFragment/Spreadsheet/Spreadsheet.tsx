import { SpreadsheetCodeFragment } from '@brickdoc/formula'
import React from 'react'
import './Spreadsheet.less'

export interface SpreadsheetProps {
  codeFragment: SpreadsheetCodeFragment
}

export const Spreadsheet: React.FC<SpreadsheetProps> = ({
  codeFragment: {
    meta: { name }
  }
}) => {
  return (
    <span className="brickdoc-formula-spreadsheet">
      <span className="brickdoc-formula-spreadsheet-content">{name}</span>
    </span>
  )
}
