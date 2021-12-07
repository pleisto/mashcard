import React from 'react'
import './StringLiteral.less'

export interface StringLiteralProps {
  content: string
}

export const StringLiteral: React.FC<StringLiteralProps> = ({ content }) => {
  return (
    <span className="brickdoc-formula-string-literal">
      String:
      <span className="brickdoc-formula-string-literal-content">{content}</span>
    </span>
  )
}
