import React from 'react'
import { Column } from 'react-table'
import cx from 'classnames'
import { Button, Icon, Menu, Popover, Select } from '@brickdoc/design-system'
import { FilterGroupOption, FilterOption } from './Filter'
import { FilterItem } from './FilterItem'
import { FilterFooter } from './FilterFooter'

const COLLECTION_TYPE_LABEL = {
  intersection: 'And',
  union: 'Or'
}

export interface FilterGroupProps {
  filterGroup: FilterGroupOption
  onAddFilter: (isGroup: boolean, path?: number[]) => void
  onRemoveFilter: (path: number[]) => void
  onUpdateFilter: (filter: Partial<FilterOption>, path: number[]) => void
  onDuplicateFilter: (path: number[]) => void
  cascade?: boolean
  columns: Array<Column<object>>
  path?: number[]
}

const isFirst = (index: number): boolean => index === 0
const isSecond = (index: number): boolean => index === 1
const NotFirstTwo = (index: number): boolean => !isFirst(index) && !isSecond(index)

export const FilterGroup: React.FC<FilterGroupProps> = ({
  filterGroup,
  path,
  columns,
  cascade,
  onAddFilter,
  onRemoveFilter,
  onUpdateFilter,
  onDuplicateFilter
}) => {
  const updateCollectionType = (value: FilterGroupOption['collectionType']): void => onUpdateFilter({ collectionType: value }, path ?? [])
  return (
    <div data-testid="brickdoc-table-filter-group" role="group" className={cx('table-toolbar-item-group-panel', { cascade })}>
      <div className="table-toolbar-item-group-content">
        {filterGroup.filters.map((filter, index) => (
          <div key={index} className={cx('table-toolbar-item-option', filter.type)}>
            {isFirst(index) && <span className="table-toolbar-item-option-head-label">Where</span>}
            {isSecond(index) && (
              <Select className="table-toolbar-item-option-head-select" value={filterGroup.collectionType} onChange={updateCollectionType}>
                <Select.Option value="intersection">{COLLECTION_TYPE_LABEL.intersection}</Select.Option>
                <Select.Option value="union">{COLLECTION_TYPE_LABEL.union}</Select.Option>
              </Select>
            )}
            {NotFirstTwo(index) && (
              <span className="table-toolbar-item-option-head-label">{COLLECTION_TYPE_LABEL[filterGroup.collectionType]}</span>
            )}
            {filter.type === 'single' && (
              <FilterItem path={[...(path ?? []), index]} columns={columns} filterSingleOption={filter} onUpdateFilter={onUpdateFilter} />
            )}
            {filter.type === 'group' && (
              <FilterGroup
                cascade={true}
                columns={columns}
                path={[...(path ?? []), index]}
                filterGroup={filter}
                onAddFilter={onAddFilter}
                onRemoveFilter={onRemoveFilter}
                onUpdateFilter={onUpdateFilter}
                onDuplicateFilter={onDuplicateFilter}
              />
            )}
            <Popover
              placement="bottom"
              trigger="click"
              overlayClassName="table-block-menu-popover"
              content={
                <Menu className="table-block-menu">
                  <Menu.Item className="table-block-menu-item" key="Remove" onClick={() => onRemoveFilter([...(path ?? []), index])}>
                    <Icon.Delete />
                    <span>Remove</span>
                  </Menu.Item>
                  <Menu.Item className="table-block-menu-item" key="Duplicate" onClick={() => onDuplicateFilter([...(path ?? []), index])}>
                    <Icon.Copy />
                    <span>Duplicate</span>
                  </Menu.Item>
                </Menu>
              }>
              <Button type="text" className="table-toolbar-item-option-action-button">
                <Icon.More />
              </Button>
            </Popover>
          </div>
        ))}
        {!cascade && filterGroup.filters.length === 0 && (
          <>
            <span>Use a filter to:</span>
            <span>Show tasks assigned to me.</span>
            <span>Show only notes with a certain tag.</span>
            <span>Hide completed tasks.</span>
          </>
        )}
      </div>
      <FilterFooter path={path} cascade={cascade} onAddFilter={onAddFilter} />
    </div>
  )
}
