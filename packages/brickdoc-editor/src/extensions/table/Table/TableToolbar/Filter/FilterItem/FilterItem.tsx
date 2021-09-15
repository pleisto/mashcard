import React from 'react'
import { Column, TableColumnType } from 'react-table'
import { Select, SelectProps } from '@brickdoc/design-system'
import { FilterOption, FilterSingleOption } from '../Filter'
import { COLUMN_TYPE } from '../../../columnType'
import { TextValue } from './TextValue'
import { SelectValue } from './SelectValue'
import { DateValue } from './DateValue'

export interface FilterItemProps {
  path: number[]
  columns: Array<Column<object>>
  filterSingleOption: FilterSingleOption
  onUpdateFilter: (filter: Partial<FilterOption>, path: number[]) => void
}

export const FilterItem: React.FC<FilterItemProps> = ({ path, columns, filterSingleOption, onUpdateFilter }) => {
  const handleFilterOption: SelectProps<object>['filterOption'] = (inputValue, option) => {
    if (!inputValue) return true
    return ((option?.title as string) ?? '').toLowerCase().includes(inputValue.toLowerCase())
  }

  const selectColumns = React.useMemo(() => (columns[0] as any).columns as Array<Column<object>>, [columns])
  const matchedColumn = React.useMemo(
    () => selectColumns.find(column => column.accessor === filterSingleOption.columnId),
    [filterSingleOption, selectColumns]
  )
  const matchedColumnType = React.useMemo(() => COLUMN_TYPE.find(item => item.type === (matchedColumn as any)?.columnType), [matchedColumn])

  const handleUpdateColumnId = (value: string): void => onUpdateFilter({ columnId: value }, path)
  const handleUpdateMatchType = (matchType: any): void => onUpdateFilter({ matchType }, path)
  const handleUpdateEventValue = (event: React.ChangeEvent<HTMLInputElement>): void => onUpdateFilter({ value: event.target.value }, path)
  const handleUpdateValue = (value?: string): void => onUpdateFilter({ value }, path)
  const isValueVisible = (type: TableColumnType): boolean =>
    matchedColumnType?.type === type &&
    !!filterSingleOption.matchType &&
    filterSingleOption.matchType !== 'IsEmpty' &&
    filterSingleOption.matchType !== 'IsNotEmpty'

  const selectColumnComponents = React.useMemo(
    () =>
      selectColumns.map(column => {
        const selectColumn = COLUMN_TYPE.find(item => item.type === (column as any)?.columnType)
        return (
          <Select.Option key={column.accessor as string} value={column.accessor as string} title={column.Header as string}>
            <div className="table-toolbar-item-option-select-label">
              {selectColumn ? React.createElement(selectColumn.icon) : null}
              <span className="table-toolbar-item-option-select-text">{column.Header}</span>
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
        showSearch={true}
        optionFilterProp="title"
        filterOption={handleFilterOption}
        onChange={handleUpdateColumnId}
        value={filterSingleOption.columnId}>
        {selectColumnComponents}
      </Select>
      <Select
        showSearch={true}
        optionFilterProp="title"
        filterOption={handleFilterOption}
        className="table-toolbar-item-option-select"
        onChange={handleUpdateMatchType}
        value={filterSingleOption.matchType}>
        {matchedColumnType?.matches.map(item => (
          <Select.Option key={item.value} value={item.value} title={item.label}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
      {isValueVisible('text') && <TextValue onChange={handleUpdateEventValue} value={filterSingleOption.value as string} />}
      {isValueVisible('select') && (
        <SelectValue
          options={(matchedColumn as any).selectOptions}
          onChange={handleUpdateValue}
          value={filterSingleOption.value as string}
        />
      )}
      {isValueVisible('date') && <DateValue onChange={handleUpdateValue} value={filterSingleOption.value as string} />}
    </>
  )
}
