import React from 'react'
import { Select, SelectProps } from '@brickdoc/design-system'
import { Column } from 'react-table'
import { COLUMN_TYPE } from '../../columnType'
import { SorterOption } from './Sorter'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'

export interface SorterItemProps {
  columns: Array<Column<object>>
  sorterSingleOption: SorterOption
  onUpdateSorter: (sorter: Partial<SorterOption>, index: number) => void
  index: number
}

export const SorterItem: React.FC<SorterItemProps> = ({ columns, sorterSingleOption, onUpdateSorter, index }) => {
  const handleFilterOption: SelectProps<object>['filterOption'] = (inputValue, option) => {
    if (!inputValue) return true
    return ((option?.title as string) ?? '').toLowerCase().includes(inputValue.toLowerCase())
  }

  const selectColumns = React.useMemo(() => (columns[0] as any).columns as Array<Column<object>>, [columns])

  const handleUpdateColumnId = (value: string): void => onUpdateSorter({ columnId: value }, index)
  const handleUpdateSort = (value: SorterOption['sort']): void => onUpdateSorter({ sort: value }, index)

  const selectColumnComponents = React.useMemo(
    () =>
      selectColumns.map(column => {
        const selectColumn = COLUMN_TYPE.find(item => item.type === (column as any)?.columnType)
        return (
          <Select.Option key={column.accessor as string} value={column.accessor as string} title={column.Header as string}>
            <div className="table-filter-option-select-label">
              {selectColumn ? React.createElement(selectColumn.icon) : null}
              <span className="table-filter-option-select-text">{column.Header}</span>
            </div>
          </Select.Option>
        )
      }),
    [selectColumns]
  )
  return (
    <>
      <Select
        className="table-toolbar-item-option-select"
        data-testid={TEST_ID_ENUM.editor.tableBlock.sort.option.select.id}
        optionFilterProp="title"
        showSearch={true}
        filterOption={handleFilterOption}
        onChange={handleUpdateColumnId}
        value={sorterSingleOption.columnId}>
        {selectColumnComponents}
      </Select>
      <Select
        data-testid={TEST_ID_ENUM.editor.tableBlock.sort.option.select.id}
        className="table-toolbar-item-option-select"
        value={sorterSingleOption.sort}
        onChange={handleUpdateSort}
        showSearch={true}>
        <Select.Option value="asc">Ascending</Select.Option>
        <Select.Option value="desc">Descending</Select.Option>
      </Select>
    </>
  )
}
