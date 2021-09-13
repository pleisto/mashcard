import React from 'react'
import { Column } from 'react-table'
import { Button, Icon } from '@brickdoc/design-system'
import { Filter, FilterOption, FilterGroupOption } from './Filter'
import { Sorter, SorterOption } from './Sorter'
import './TableToolbar.css'

export interface TableToolbarProps {
  onAddNewRow: VoidFunction
  columns: Array<Column<object>>
  filterGroup: FilterGroupOption
  sorterOptions: SorterOption[]
  addSorter: () => void
  removeSorter: (index: number) => void
  updateSorter: (sorter: Partial<SorterOption>, index: number) => void
  addFilter: (isGroup: boolean, path?: number[] | undefined) => void
  removeFilter: (path: number[]) => void
  updateFilter: (filter: Partial<FilterOption>, path: number[]) => void
  duplicateFilter: (path: number[]) => void
}

export const TableToolbar: React.FC<TableToolbarProps> = ({
  columns,
  onAddNewRow,
  filterGroup,
  addFilter,
  removeFilter,
  updateFilter,
  duplicateFilter,
  sorterOptions,
  addSorter,
  updateSorter,
  removeSorter
}) => {
  const [filterVisible, setFilterVisible] = React.useState(false)
  const [sortVisible, setSortVisible] = React.useState(false)

  return (
    <Filter
      columns={columns}
      visible={filterVisible}
      onVisibleChange={visible => setFilterVisible(visible)}
      filterGroup={filterGroup}
      onAdd={addFilter}
      onRemove={removeFilter}
      onUpdate={updateFilter}
      onDuplicate={duplicateFilter}>
      <Sorter
        columns={columns}
        sorterOptions={sorterOptions}
        onAdd={addSorter}
        onUpdate={updateSorter}
        onRemove={removeSorter}
        visible={sortVisible}
        onVisibleChange={visible => setSortVisible(visible)}>
        <div role="toolbar" className="table-block-toolbar">
          <Button onClick={() => setFilterVisible(true)} type="text" className="table-toolbar-text-button">
            Filter
          </Button>
          <Button onClick={() => setSortVisible(true)} type="text" className="table-toolbar-text-button">
            Sort
          </Button>
          <Button type="primary" className="table-toolbar-add-button" onClick={() => onAddNewRow()}>
            New <Icon.ArrowRight />
          </Button>
        </div>
      </Sorter>
    </Filter>
  )
}
