import React from 'react'
import { Column } from 'react-table'
import { Popover } from '@brickdoc/design-system'
import { FilterGroup } from './FilterGroup'
import { matches } from '../../columnType'

export interface TableFilterProps {
  visible: boolean
  onVisibleChange: (visible: boolean) => void
  columns: Array<Column<object>>
  filterGroup: FilterGroupOption
  onAdd: (isGroup: boolean, path?: number[] | undefined) => void
  onRemove: (path: number[]) => void
  onUpdate: (filter: Partial<FilterOption>, path: number[]) => void
  onDuplicate: (path: number[]) => void
}

export interface FilterSingleOption {
  type: 'single'
  columnId?: string
  action?: string
  value?: string
  matchType?: keyof typeof matches
}

export interface FilterGroupOption {
  type: 'group'
  collectionType: 'union' | 'intersection'
  filters: FilterOption[]
}

export type FilterOption = FilterSingleOption | FilterGroupOption

export const Filter: React.FC<TableFilterProps> = ({
  children,
  columns,
  visible,
  onVisibleChange,
  filterGroup,
  onAdd,
  onRemove,
  onUpdate,
  onDuplicate
}) => {
  const handleVisibleChange = (visible: boolean): void => {
    if (visible) return
    onVisibleChange(visible)
  }

  const Content = (
    <div className="table-block-toolbar-item-panel">
      <span className="table-block-toolbar-item-title">Filter for My All Data</span>
      <FilterGroup
        columns={columns}
        filterGroup={filterGroup}
        onAddFilter={onAdd}
        onRemoveFilter={onRemove}
        onUpdateFilter={onUpdate}
        onDuplicateFilter={onDuplicate}
      />
    </div>
  )

  return (
    <Popover
      visible={visible}
      overlayStyle={{
        marginTop: '65px'
      }}
      onVisibleChange={handleVisibleChange}
      overlayClassName="table-block-popover"
      trigger="click"
      placement="bottom"
      content={Content}>
      {children}
    </Popover>
  )
}
