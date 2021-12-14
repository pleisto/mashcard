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
    <span className="brickdoc-formula-column">
      <span className="brickdoc-formula-column-content">{`${spreadsheetName}.${name}`}</span>
    </span>
  )
}
