import { VariableCodeFragment } from '@brickdoc/formula'
import React from 'react'
import './Variable.less'

export interface VariableProps {
  codeFragment: VariableCodeFragment & { blockId: string }
}

export const Variable: React.FC<VariableProps> = ({
  codeFragment: {
    blockId,
    meta: { name, namespaceId, namespace }
  }
}) => {
  console.log({ blockId, name, namespaceId, namespace })
  if (blockId === namespaceId) {
    return (
      <span className="brickdoc-formula-variable">
        <span className="brickdoc-formula-variable-content">{name}</span>
      </span>
    )
  } else {
    return (
      <span>
        <span className="brickdoc-formula-spreadsheet">
          <span className="brickdoc-formula-spreadsheet-content">{namespace}</span>
        </span>
        .
        <span className="brickdoc-formula-variable">
          <span className="brickdoc-formula-variable-content">{name}</span>
        </span>
      </span>
    )
  }
}
