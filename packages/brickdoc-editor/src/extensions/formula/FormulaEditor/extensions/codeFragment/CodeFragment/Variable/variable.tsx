import { CodeFragment } from '@brickdoc/formula'
import React from 'react'
import './Variable.less'

export interface VariableProps {
  codeFragment: CodeFragment
}

export const Variable: React.FC<VariableProps> = ({ codeFragment }) => {
  return (
    <span className="brickdoc-formula-variable">
      Variable:
      <span className="brickdoc-formula-variable-content">{codeFragment.meta.name}</span>
    </span>
  )
}
