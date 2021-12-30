import React from 'react'
import { Column } from 'react-table'
import cx from 'classnames'
import { Button, Icon, Menu, Popover, Select } from '@brickdoc/design-system'
import { useEditorI18n } from '../../../../hooks'
import { FilterGroupOption, FilterOption } from './Filter'
import { FilterItem } from './FilterItem'
import { FilterFooter } from './FilterFooter'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'

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
  const { t } = useEditorI18n()
  const updateCollectionType = (value: FilterGroupOption['collectionType']): void =>
    onUpdateFilter({ collectionType: value }, path ?? [])
  return (
    <div
      data-testid="brickdoc-table-filter-group"
      role="group"
      className={cx('table-toolbar-item-group-panel', { cascade })}
    >
      <div className="table-toolbar-item-group-content">
        {filterGroup.filters.map((filter, index) => (
          <div
            data-testid={TEST_ID_ENUM.editor.tableBlock.filter.option.id}
            key={index}
            className={cx('table-toolbar-item-option', filter.type)}
          >
            {isFirst(index) && <span className="table-toolbar-item-option-head-label">{t('table.filter.where')}</span>}
            {isSecond(index) && (
              <Select
                className="table-toolbar-item-option-head-select"
                value={filterGroup.collectionType}
                onChange={updateCollectionType}
              >
                {['intersection', 'union'].map(type => (
                  <Select.Option key={type} value={type}>
                    {t(`table.filter.collection_types.${type}`)}
                  </Select.Option>
                ))}
              </Select>
            )}
            {NotFirstTwo(index) && (
              <span className="table-toolbar-item-option-head-label">
                {t(`table.filter.collection_types.${filterGroup.collectionType}`)}
              </span>
            )}
            {filter.type === 'single' && (
              <FilterItem
                path={[...(path ?? []), index]}
                columns={columns}
                filterSingleOption={filter}
                onUpdateFilter={onUpdateFilter}
              />
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
                  <Menu.Item
                    data-testid={TEST_ID_ENUM.editor.tableBlock.filter.option.deleteButton.id}
                    className="table-block-menu-item"
                    itemKey="Remove"
                    onClick={() => onRemoveFilter([...(path ?? []), index])}
                  >
                    <Icon.Delete />
                    <span>{t('table.filter.remove')}</span>
                  </Menu.Item>
                  <Menu.Item
                    data-testid={TEST_ID_ENUM.editor.tableBlock.filter.option.duplicateButton.id}
                    className="table-block-menu-item"
                    itemKey="Duplicate"
                    onClick={() => onDuplicateFilter([...(path ?? []), index])}
                  >
                    <Icon.Copy />
                    <span>{t('table.filter.duplicate')}</span>
                  </Menu.Item>
                </Menu>
              }
            >
              <Button
                data-testid={TEST_ID_ENUM.editor.tableBlock.filter.option.menuButton.id}
                type="text"
                className="table-toolbar-item-option-action-button"
              >
                <Icon.More />
              </Button>
            </Popover>
          </div>
        ))}
        {!cascade && filterGroup.filters.length === 0 && (
          <>
            {t('table.filter.hint')
              .split('\n')
              .map((l, i) => (
                <span key={i}>{l}</span>
              ))}
          </>
        )}
      </div>
      <FilterFooter path={path} cascade={cascade} onAddFilter={onAddFilter} />
    </div>
  )
}
