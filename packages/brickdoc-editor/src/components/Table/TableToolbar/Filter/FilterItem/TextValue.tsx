import React from 'react'
import { Input } from '@brickdoc/design-system'

export interface TextValueProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
}

export const TextValue: React.FC<TextValueProps> = ({ onChange, value }) => {
  return <Input className="table-toolbar-item-option-input" placeholder="Value" onChange={onChange} value={value} />
}
