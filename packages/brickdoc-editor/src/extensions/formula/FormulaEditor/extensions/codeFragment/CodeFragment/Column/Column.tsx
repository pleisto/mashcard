import { ColumnCodeFragment } from '@brickdoc/formula'
import React from 'react'
import './Column.less'

export interface ColumnProps {
  codeFragment: ColumnCodeFragment
}

export const Column: React.FC<ColumnProps> = ({
  codeFragment: {
    meta: { name, spreadsheetName }
  }
}) => {
  return (
    <span>
      <span className="brickdoc-formula-spreadsheet">
        <span className="brickdoc-formula-spreadsheet-content">{spreadsheetName}</span>
      </span>
      .
      <span className="brickdoc-formula-column">
        <span className="brickdoc-formula-column-content">{name}</span>
      </span>
    </span>
  )
}
