import React from 'react'
import './NumberLiteral.less'

export interface NumberLiteralProps {
  content: string
}

export const NumberLiteral: React.FC<NumberLiteralProps> = ({ content }) => {
  return (
    <span className="brickdoc-formula-number-literal">
      Number:
      <span className="brickdoc-formula-number-literal-content">{content}</span>
    </span>
  )
}
