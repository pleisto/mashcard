import React from 'react'
import cx from 'classnames'
import { NodeViewProps } from '@tiptap/react'
import { useTable, HeaderGroup, useFlexLayout, useResizeColumns, TableHeaderGroupProps } from 'react-table'
import { Modal, Icon } from '@brickdoc/design-system'
import { BlockWrapper } from '../../BlockWrapper'
import { TableExtensionOptions } from '../../table'
import { useEditorI18n } from '../../../hooks'
import { ColumnMenu } from './ColumnMenu'
import { useColumns } from './useColumns'
import { useAddNewColumn, COLUMN_ID as ADD_NEW_COLUMN_ID } from './useAddNewColumn'
import { useActiveStatus } from './useActiveStatus'
import { Cell } from './Cells/Cell'
import { TableRow } from './TableRow'
import { TableToolbar } from './TableToolbar'
import { useFilter } from './TableToolbar/Filter/useFilter'
import { useSorter } from './TableToolbar/Sorter/useSorter'
import './Table.css'

const isGroupedHeader = (headerGroup: HeaderGroup): boolean => headerGroup.headers?.[0].depth !== 0 || !!headerGroup.Header

const headerPropsGetter = (props: Partial<TableHeaderGroupProps>, { column }: any): Array<Partial<TableHeaderGroupProps>> => [
  props,
  {
    style: {
      justifyContent: column.align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'center',
      display: 'inline-flex'
    }
  }
]

const defaultColumnConfig = {
  minWidth: 30, // minWidth is only used as a limit for resizing
  width: 180, // width is used for both the flex-basis and flex-grow
  Cell
}

export const Table: React.FC<NodeViewProps> = ({ editor, node, extension, updateAttributes }) => {
  const { t } = useEditorI18n()
  const parentId: string = node.attrs.uuid
  const prevData = node.attrs.data || {}

  const tableOptions: TableExtensionOptions = extension.options
  const { useDatabaseRows } = tableOptions

  const updateAttributeData = (data: Record<string, any>): void => {
    updateAttributes({
      data: { ...(prevData || {}), ...data }
    })
  }

  const fetched = React.useRef(!parentId) // if node have not uuid, not need to fetch rows

  const [columns, { setColumns, add: addNewColumn, remove: removeColumn, updateName: updateColumnName, updateType: updateColumnType }] =
    useColumns({
      databaseColumns: prevData.columns,
      updateAttributeData
    })

  const [{ isCellActive, isRowActive, update: updateActiveStatus, reset: resetActiveStatus }] = useActiveStatus()

  const [tableRows, { fetchRows, addRow, updateRow, removeRow }] = useDatabaseRows(parentId)

  React.useEffect(() => {
    if (!fetched.current) {
      void fetchRows()
      fetched.current = true
    }
  }, [fetchRows])

  const updateData = (rowId: string, key: string, data: any): void => {
    const row = tableRows.find(r => r.id === rowId)
    if (row) {
      updateRow({ ...row, [key]: data })
    }
  }

  const addNewRow = (rowIndex?: number): void => {
    const row = addRow(rowIndex)
    updateActiveStatus([{ rowId: row.id }])
  }

  const [modal, contextHolder] = Modal.useModal()

  const removeRowConfirm = (rowId: string): void => {
    modal.confirm({
      title: t('table.remove_row.title'),
      okText: t('table.remove_row.ok'),
      cancelText: t('table.remove_row.cancel'),
      icon: null,
      onOk: () => removeRow(rowId)
    })
  }

  const addNewColColumn = useAddNewColumn(addNewColumn)

  const [sorterOptions, { add: addNewSorter, remove: removeSorter, update: updateSorter, sort }] = useSorter([])
  const [filterGroup, { filter, add: addNewFilter, remove: removeFilter, update: updateFilter, duplicate: duplicateFilter }] = useFilter({
    type: 'group',
    collectionType: 'intersection',
    filters: []
  })

  // filter && sort
  const data = React.useMemo(() => sort(tableRows.filter(item => filter(item, filterGroup))), [tableRows, filterGroup, filter, sort])

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn: defaultColumnConfig,
      updateActiveStatus,
      resetActiveStatus,
      updateData,
      setColumns
    },
    useFlexLayout,
    useResizeColumns,
    hooks => {
      hooks.visibleColumns.push(columns => [...columns, addNewColColumn])
    }
  )

  return (
    <BlockWrapper
      editor={editor}
      className="table-block-node-view-wrapper"
      ref={(container: HTMLDivElement) => {
        // TODO: need a better way to add this class
        container?.parentElement?.classList.add('table-block-react-renderer')
        container?.classList.add('table-block-node-view-wrapper')
      }}
    >
      {contextHolder}
      {fetched.current && (
        <TableToolbar
          onAddNewRow={addNewRow}
          columns={columns}
          filterGroup={filterGroup}
          addFilter={addNewFilter}
          removeFilter={removeFilter}
          updateFilter={updateFilter}
          duplicateFilter={duplicateFilter}
          sorterOptions={sorterOptions}
          addSorter={addNewSorter}
          removeSorter={removeSorter}
          updateSorter={updateSorter}
        />
      )}
      <div className="brickdoc-table-block">
        <div {...getTableProps({ className: 'table-block-table', style: { minWidth: '100%' }, role: 'table' })}>
          <div className="table-block-row">
            {headerGroups.filter(isGroupedHeader).map(headerGroup => {
              const headerGroupProps = headerGroup.getHeaderGroupProps({
                className: 'table-block-tr'
              })
              return (
                <div {...headerGroupProps} style={{ ...headerGroupProps.style, display: 'inline-flex' }} key={headerGroupProps.key}>
                  {headerGroup.headers.map(column => {
                    const headerProps = column.getHeaderProps(headerPropsGetter)
                    const Header = (
                      <div {...headerProps} className="table-block-th">
                        {column.render('Header')}
                        {column.canResize && (
                          <div {...column.getResizerProps()} className={cx('resizer', { isResizing: column.isResizing })} />
                        )}
                      </div>
                    )
                    if (column.id === ADD_NEW_COLUMN_ID) {
                      return Header
                    }

                    return (
                      <ColumnMenu
                        key={column.id}
                        columnName={column.Header as string}
                        columnType={column.columnType}
                        onColumnNameChange={e => updateColumnName(e.target.value, column.parent?.id ?? '', column.id)}
                        onColumnTypeChange={type => updateColumnType(type, column.parent?.id ?? '', column.id)}
                        onRemoveColumn={() => removeColumn(column.parent?.id ?? '', column.id)}
                      >
                        {Header}
                      </ColumnMenu>
                    )
                  })}
                </div>
              )
            })}
          </div>
          <div className="table-block-tbody">
            {rows.map(row => {
              prepareRow(row)
              const rowProps = row.getRowProps({ className: 'table-block-tr' })
              return (
                <TableRow
                  {...rowProps}
                  row={row}
                  // TODO: fix type
                  rowActive={isRowActive((row.original as any).id)}
                  onAddNewRow={addNewRow}
                  onRemoveRow={removeRowConfirm}
                  isCellActive={isCellActive}
                  key={rowProps.key}
                />
              )
            })}
            <div className="table-block-row">
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              <div className="table-block-add-new-row" role="button" tabIndex={-1} onClick={() => addNewRow()}>
                <Icon.Plus />
                New
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlockWrapper>
  )
}
