import { CodeFragment } from '@brickdoc/formula'
import React from 'react'
import './Function.less'

export interface FunctionProps {
  content: string
  codeFragment: CodeFragment
}

export const Function: React.FC<FunctionProps> = ({ codeFragment, content }) => {
  return (
    <span className="brickdoc-formula-function">
      <span className="brickdoc-formula-function-content">{content}</span>
    </span>
  )
}
