import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { Column } from 'react-table'
import { Button, DeprecatedMenu as Menu, Icon, Input, Popover } from '@brickdoc/design-system'
import { useEditorI18n } from '../../../hooks'
import { Filter, FilterOption, FilterGroupOption } from './Filter'
import { Sorter, SorterOption } from './Sorter'
import './TableToolbar.css'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'

export interface TableToolbarProps {
  title: string
  setTitle: (title: string) => void
  onAddNewRow: VoidFunction
  columns: Array<Column<object>>
  filterGroup: FilterGroupOption
  sorterOptions: SorterOption[]
  deleteNode: NodeViewProps['deleteNode']
  addSorter: () => void
  removeSorter: (index: number) => void
  updateSorter: (sorter: Partial<SorterOption>, index: number) => void
  addFilter: (isGroup: boolean, path?: number[] | undefined) => void
  removeFilter: (path: number[]) => void
  updateFilter: (filter: Partial<FilterOption>, path: number[]) => void
  duplicateFilter: (path: number[]) => void
}

export const TableToolbar: React.FC<TableToolbarProps> = ({
  title,
  setTitle,
  columns,
  onAddNewRow,
  filterGroup,
  deleteNode,
  addFilter,
  removeFilter,
  updateFilter,
  duplicateFilter,
  sorterOptions,
  addSorter,
  updateSorter,
  removeSorter
}) => {
  const { t } = useEditorI18n()
  const [filterVisible, setFilterVisible] = React.useState(false)
  const [sortVisible, setSortVisible] = React.useState(false)
  const handleVisibleChange =
    (setter: React.Dispatch<React.SetStateAction<boolean>>) =>
    (visible: boolean): void => {
      if (visible) return
      setter(visible)
    }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value)
  }

  // TODO: refactor block actions
  const handleDelete = (): void => {
    deleteNode()
  }

  return (
    <Filter
      columns={columns}
      visible={filterVisible}
      onVisibleChange={handleVisibleChange(setFilterVisible)}
      filterGroup={filterGroup}
      onAdd={addFilter}
      onRemove={removeFilter}
      onUpdate={updateFilter}
      onDuplicate={duplicateFilter}
    >
      <Sorter
        columns={columns}
        sorterOptions={sorterOptions}
        onAdd={addSorter}
        onUpdate={updateSorter}
        onRemove={removeSorter}
        visible={sortVisible}
        onVisibleChange={handleVisibleChange(setSortVisible)}
      >
        <div role="toolbar" className="table-block-toolbar">
          <Input
            className="table-title-input"
            placeholder={t('table.untitled')}
            value={title}
            onChange={handleTitleChange}
          />
          <div className="table-toolbar-actions">
            <Button
              data-testid={TEST_ID_ENUM.editor.tableBlock.toolbar.filterButton.id}
              onClick={() => setFilterVisible(true)}
              type="text"
              className="table-toolbar-text-button"
            >
              {t('table.filter.text')}
            </Button>
            <Button
              data-testid={TEST_ID_ENUM.editor.tableBlock.toolbar.sortButton.id}
              onClick={() => setSortVisible(true)}
              type="text"
              className="table-toolbar-text-button"
            >
              {t('table.sort.text')}
            </Button>
            <Popover
              overlayClassName="brickdoc-action-panel-popover"
              content={
                <Menu className="brickdoc-action-panel-dropdown-menu">
                  <Menu.Item onClick={handleDelete} className="brickdoc-action-panel-dropdown-menu-item">
                    <Icon.Delete className="brickdoc-action-panel-dropdown-menu-item-icon" />
                    Delete
                  </Menu.Item>
                </Menu>
              }
              trigger="click"
              placement="bottom"
            >
              <Button type="text" className="table-toolbar-text-button">
                <Icon.More />
              </Button>
            </Popover>
            <Button
              data-testid={TEST_ID_ENUM.editor.tableBlock.toolbar.addButton.id}
              type="primary"
              className="table-toolbar-add-button"
              onClick={() => onAddNewRow()}
            >
              {t('table.new_row.text')}
              <div className="table-toolbar-add-button-icon">
                <Icon.ArrowDown />
              </div>
            </Button>
          </div>
        </div>
      </Sorter>
    </Filter>
  )
}
