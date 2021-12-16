import React from 'react'
import './NullLiteral.less'

export interface NullLiteralProps {
  content: string
}

export const NullLiteral: React.FC<NullLiteralProps> = ({ content }) => {
  return (
    <span className="brickdoc-formula-null-literal">
      <span className="brickdoc-formula-null-literal-content">{content}</span>
    </span>
  )
}
