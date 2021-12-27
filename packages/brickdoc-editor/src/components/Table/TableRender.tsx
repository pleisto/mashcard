import React from 'react'
import cx from 'classnames'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { v4 as uuid } from 'uuid'
import { NodeViewProps } from '@tiptap/react'
import {
  useTable,
  HeaderGroup,
  useFlexLayout,
  useResizeColumns,
  TableHeaderGroupProps,
  TableColumnType,
  Column
} from 'react-table'
import { Modal, Icon } from '@brickdoc/design-system'
import { BlockContainer } from '../BlockContainer'
import { useEditorI18n } from '../../hooks'
import { ColumnMenu } from './ColumnMenu'
import { DatabaseColumns, ColumnsUtils } from './useColumns'
import { useAddNewColumn, COLUMN_ID as ADD_NEW_COLUMN_ID } from './useAddNewColumn'
import { UseActiveStatusUtils } from './useActiveStatus'
import { Cell } from './Cells/Cell'
import { TableRow } from './TableRow'
import { TableToolbar } from './TableToolbar'
import { useFilter } from './TableToolbar/Filter/useFilter'
import { useSorter } from './TableToolbar/Sorter/useSorter'
import './Table.css'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { useFormulaDatabase } from './useFormulaDatabase'
import { TableRowsUtils } from './useTableRows'
import { EditorDataSourceContext } from '../../dataSource/DataSource'
import { DatabaseRows } from '../../extensions'

const isGroupedHeader = (headerGroup: HeaderGroup): boolean =>
  headerGroup.headers?.[0].depth !== 0 || !!headerGroup.Header

const headerPropsGetter = (
  props: Partial<TableHeaderGroupProps>,
  { column }: any
): Array<Partial<TableHeaderGroupProps>> => [
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

export interface TableRenderProps {
  dynamic: boolean
  deleteNode: NodeViewProps['deleteNode']
  updateAttributes: (attributes: Record<string, any>) => void
  parentId: string
  prevData: {
    columns: DatabaseColumns
    title: string
  }
  useActiveStatusUtils: UseActiveStatusUtils
  useColumnsProps: [Column[], ColumnsUtils]
  tableRowsProps: [DatabaseRows, TableRowsUtils]
}

export const TableRender: React.FC<TableRenderProps> = ({
  deleteNode,
  parentId,
  dynamic,
  prevData,
  updateAttributes,
  useActiveStatusUtils: { isCellActive, isRowActive, update: updateActiveStatus, reset: resetActiveStatus },
  useColumnsProps: [
    columns,
    {
      setColumns,
      add: addNewColumn,
      remove: removeColumn,
      updateName: updateColumnName,
      updateType: updateColumnType,
      updateWidth: updateColumnWidth
    }
  ],
  tableRowsProps: [
    tableRows,
    {
      updateRows,
      fetchRows,
      batchDeleteDataByValue,
      batchUpdateDataByColumn,
      moveRow,
      removeRow,
      updateData,
      addNewRow
    }
  ]
}) => {
  const { t } = useEditorI18n()
  // const parentId: string = node.attrs.uuid
  // const prevData = node.attrs.data || {}

  const editorDataSource = React.useContext(EditorDataSourceContext)

  const updateAttributeData = (data: Record<string, any>): void => {
    updateAttributes({
      data: { ...prevData, ...data }
    })
  }

  const fetched = React.useRef(!parentId) // if node have not uuid, not need to fetch rows

  const initialized = React.useRef(false)

  const handleColumnTypeChange = async (type: TableColumnType, groupId: string, columnId: string): Promise<void> => {
    if (type === 'date' || type === 'date-range') batchUpdateDataByColumn(columnId, null)
    updateColumnType(type, groupId, columnId)
  }

  useFormulaDatabase(
    parentId,
    prevData.title,
    // first column is column group
    (columns[0] as any)?.columns ?? [],
    tableRows,
    editorDataSource.formulaContext,
    dynamic
  )

  React.useEffect(() => {
    if (initialized.current) return
    if (!fetched.current) return
    if (columns.length > 0 || tableRows.length > 0) return

    addNewColumn()
    addNewColumn()
    const newRows = [
      { id: uuid(), sort: 0 },
      { id: uuid(), sort: 2 ** 32 },
      { id: uuid(), sort: 2 ** 32 * 2 }
    ]
    void updateRows(parentId, newRows)
    initialized.current = true
  }, [columns, addNewColumn, updateRows, tableRows, parentId])

  React.useEffect(() => {
    if (!fetched.current) {
      void fetchRows(parentId)
      fetched.current = true
    }
  }, [fetchRows, parentId])

  const [modal, contextHolder] = Modal.useModal()

  const removeRowConfirm = (rowId: string): void => {
    modal.confirm({
      title: t('table.remove_row.title'),
      okText: t('table.remove_row.ok'),
      okButtonProps: {
        danger: true
      },
      cancelText: t('table.remove_row.cancel'),
      icon: null,
      onOk: () => removeRow(rowId)
    })
  }

  const addNewColColumn = useAddNewColumn(addNewColumn, dynamic)

  const [sorterOptions, { add: addNewSorter, remove: removeSorter, update: updateSorter, sort }] = useSorter([])
  const [
    filterGroup,
    { filter, add: addNewFilter, remove: removeFilter, update: updateFilter, duplicate: duplicateFilter }
  ] = useFilter({
    type: 'group',
    collectionType: 'intersection',
    filters: []
  })

  // filter && sort
  const data = React.useMemo(
    () => sort(tableRows.filter(item => filter(item, filterGroup))),
    [tableRows, filterGroup, filter, sort]
  )

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      dynamic,
      defaultColumn: defaultColumnConfig,
      updateActiveStatus,
      resetActiveStatus,
      updateData,
      batchDeleteDataByValue,
      batchUpdateDataByColumn,
      setColumns
    },
    useFlexLayout,
    useResizeColumns,
    hooks => {
      hooks.visibleColumns.push(columns => [...columns, addNewColColumn])
    }
  )

  const setTitle = (title: string): void => updateAttributeData({ title })

  // console.log('debug title is missing bug', { dynamic, prevData, tableRows, columns, fetched: fetched.current })

  return (
    <BlockContainer
      className="table-block-node-view-wrapper"
      ref={(container: HTMLDivElement) => {
        // TODO: need a better way to add this class
        container?.parentElement?.classList.add('table-block-react-renderer')
        container?.classList.add('table-block-node-view-wrapper')
      }}>
      {contextHolder}
      {(dynamic || fetched.current) && (
        <TableToolbar
          dynamic={dynamic}
          title={prevData.title}
          setTitle={setTitle}
          onAddNewRow={addNewRow}
          columns={columns}
          deleteNode={deleteNode}
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
      <div className="brickdoc-table-block" data-testid={TEST_ID_ENUM.editor.tableBlock.id}>
        <div {...getTableProps({ className: 'table-block-table', style: { minWidth: '100%' }, role: 'table' })}>
          <div className="table-block-row">
            {headerGroups.filter(isGroupedHeader).map(headerGroup => {
              const headerGroupProps = headerGroup.getHeaderGroupProps({
                className: 'table-block-tr'
              })
              return (
                <div
                  {...headerGroupProps}
                  style={{ ...headerGroupProps.style, display: 'inline-flex' }}
                  key={headerGroupProps.key}>
                  {headerGroup.headers.map(column => {
                    const headerProps = column.getHeaderProps(headerPropsGetter)
                    const resizerProps: any = {
                      ...column.getResizerProps(),
                      onClick: (event: React.TouchEvent) => {
                        event.stopPropagation()

                        const width = parseInt(headerProps.style?.width?.toString() ?? '0', 10)
                        if (!width) return
                        updateColumnWidth(width, column.parent?.id ?? '', column.id)
                      }
                    }

                    const isAddNewColumn = column.id === ADD_NEW_COLUMN_ID

                    const Header = (
                      <div {...headerProps} className={cx('table-block-th', { bordered: !isAddNewColumn })}>
                        {column.render('Header')}
                        {column.canResize && !isAddNewColumn && (
                          <div {...resizerProps} className={cx('table-block-resizer', { resizing: column.isResizing })}>
                            <div className="table-block-resizer-inner" />
                          </div>
                        )}
                      </div>
                    )

                    if (isAddNewColumn) return Header

                    return (
                      <ColumnMenu
                        dynamic={dynamic}
                        key={column.id}
                        columnName={column.Header as string}
                        columnType={column.columnType}
                        onColumnNameChange={e => updateColumnName(e.target.value, column.parent?.id ?? '', column.id)}
                        onColumnTypeChange={type => {
                          void handleColumnTypeChange(type, column.parent?.id ?? '', column.id)
                        }}
                        onRemoveColumn={() => removeColumn(column.parent?.id ?? '', column.id)}>
                        {Header}
                      </ColumnMenu>
                    )
                  })}
                </div>
              )
            })}
          </div>
          <div className="table-block-tbody">
            <DndProvider backend={HTML5Backend}>
              {rows.map(row => {
                prepareRow(row)
                const rowProps = row.getRowProps({ className: 'table-block-tr' })
                return (
                  <TableRow
                    {...rowProps}
                    row={row}
                    dynamic={dynamic}
                    // TODO: fix type
                    rowActive={isRowActive((row.original as any).id)}
                    onAddNewRow={addNewRow}
                    onMoveRow={moveRow}
                    updateActiveStatus={updateActiveStatus}
                    onRemoveRow={removeRowConfirm}
                    isCellActive={isCellActive}
                    key={rowProps.key}
                  />
                )
              })}
            </DndProvider>
            {!dynamic && (
              <div className="table-block-row">
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                <div className="table-block-add-new-row" role="button" tabIndex={-1} onClick={() => addNewRow()}>
                  <Icon.Plus />
                  New
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </BlockContainer>
  )
}
