import React from 'react'
import { Select } from '@brickdoc/design-system'
import dayjs from 'dayjs'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'

interface DateValueProps {
  value?: string
  onChange: (value: string) => void
}

const EXACT_DATE = 'exactDate'

const options = [
  {
    label: 'Today',
    value: dayjs()
  },
  {
    label: 'Tomorrow',
    value: dayjs().add(1, 'day')
  },
  {
    label: 'Yesterday',
    value: dayjs().subtract(1, 'day')
  },
  {
    label: 'Exact date',
    value: EXACT_DATE
  }
]

export const DateValue: React.FC<DateValueProps> = ({ value, onChange }) => {
  const isExactDate = React.useMemo(
    () => value && (value === EXACT_DATE || !options.find(item => item.value.toString() === value)),
    [value]
  )

  return (
    <>
      <Select
        data-testid={TEST_ID_ENUM.editor.tableBlock.filter.option.select.id}
        className="table-toolbar-item-option-select"
        value={isExactDate ? EXACT_DATE : value}
        onChange={onChange}
      >
        {options.map(item => (
          <Select.Option key={item.label} value={item.value.toString()} title={item.label}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
    </>
  )
}
