import React from 'react'
import { Select, SelectProps, Tag } from '@brickdoc/design-system'
import { bgColor } from '../../../Cells/SelectCell'

export interface SelectValueProps {
  value?: string
  onChange: (value: string) => void
  options: Array<{
    label: string
    color: string
    value: string
  }>
}

export const SelectValue: React.FC<SelectValueProps> = ({ value, onChange, options }) => {
  const handleFilterOption: SelectProps<object>['filterOption'] = (inputValue, option) => {
    if (!inputValue) return true
    return ((option?.title as string) ?? '').includes(inputValue)
  }

  return (
    <Select
      className="table-toolbar-item-option-select"
      value={value}
      onChange={onChange}
      showSearch={true}
      filterOption={handleFilterOption}
      optionFilterProp="title">
      {options.map(option => (
        <Select.Option key={option.value} value={option.value} title={option.label}>
          <Tag color={bgColor(option.color)} style={{ color: option.color }}>
            {option.label}
          </Tag>
        </Select.Option>
      ))}
    </Select>
  )
}
