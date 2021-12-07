import React from 'react'
import './BooleanLiteral.less'

export interface BooleanLiteralProps {
  content: string
}

export const BooleanLiteral: React.FC<BooleanLiteralProps> = ({ content }) => {
  return (
    <span className="brickdoc-formula-boolean-literal">
      Boolean:
      <span className="brickdoc-formula-boolean-literal-content">{content}</span>
    </span>
  )
}
