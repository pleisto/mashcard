import React from 'react'
import { TextSelection } from 'prosemirror-state'
import { Input, Icon, devLog } from '@brickdoc/design-system'
import { useEditorI18n, useDocumentEditable } from '../../../hooks'
import { BlockContainer, BlockContainerProps } from '../BlockContainer'
import { SpreadsheetViewProps } from '../../../extensions/blocks/spreadsheet/meta'
import { MenuIcon } from '../../extensionViews/SlashMenu/styled'

import { useSpreadsheet } from './useSpreadsheet'
import { columnDisplayTitle } from './helper'

import {
  SpreadsheetContainer,
  SpreadsheetScrollView,
  SpreadsheetPanel,
  SpreadsheetView,
  SpreadsheetHeader,
  SpreadsheetHeaderColumn,
  SpreadsheetBody,
  SpreadsheetRow,
  SpreadsheetRowAction,
  SpreadsheetCellContainer,
  SpreadsheetColumnEditable
} from './SpreadsheetView'

import { useSpreadsheetContext } from './SpreadsheetContext'

import { SpreadsheetCell } from './SpreadsheetCell'
import './Spreadsheet.less'
import { useFormulaSpreadsheet } from './useFormulaSpreadsheet'

export const SpreadsheetBlockView: React.FC<SpreadsheetViewProps> = ({
  editor,
  node,
  deleteNode,
  updateAttributes,
  getPos
}) => {
  const [documentEditable] = useDocumentEditable(undefined)

  const parentId: string = node.attrs.uuid
  const prevData = node.attrs.data || {}

  const { t } = useEditorI18n()

  const [title, setTitle] = React.useState<string>(node.attrs.title ?? '')

  const updateAttributeData = (data: Record<string, any>): void => {
    updateAttributes({
      data: { ...prevData, ...data }
    })
  }

  const {
    columns,
    addColumn,
    updateColumn,
    removeColumn,
    moveColumn,
    rows,
    addRow,
    removeRow,
    moveRow,
    getCellBlock,
    saveCellBlock,
    cellsMap
  } = useSpreadsheet({
    isNew: node.attrs.isNew ?? false,
    parentId,
    data: prevData,
    updateAttributeData
  })

  const valuesMatrix = new Map(
    Array.from(cellsMap.entries()).map(([rowId, row]) => [
      rowId,
      new Map(Array.from(row.entries()).map(([columnId, cell]) => [columnId, cell.text]))
    ])
  )

  const spreadsheetContext = useSpreadsheetContext({
    parentId,
    columnIds: columns.map(c => c.uuid),
    rowIds: rows.map(r => r.id),
    columnHeaders: new Map(columns.map(c => [c.uuid, columnDisplayTitle(c)])),
    valuesMatrix,
    editable: documentEditable
  })

  useFormulaSpreadsheet({ blockId: parentId, rows, columns, getCellBlock, title })

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const title = event.target.value
    updateAttributes({ title })
    devLog(title)
    setTitle(title)
  }

  const { dragging } = spreadsheetContext

  const [columnWidths, setColumnWidths] = React.useState(Object.fromEntries(columns.map(c => [c.uuid, c.width])))

  React.useEffect(() => {
    const onDraggingMouseMove = (e: MouseEvent): void => {
      if (dragging.rowId ?? dragging.columnId) {
        const newDragging = {
          ...dragging,
          movementX: (dragging.movementX ?? 0) + e.movementX,
          movementY: (dragging.movementY ?? 0) + e.movementY
        }
        if (dragging.rowId) {
          const trs = document.elementsFromPoint(e.clientX, e.clientY).map(el => el.closest('tr'))
          const tr = trs?.find(el => el?.dataset.rowId && el.dataset.rowId !== dragging.rowId)
          newDragging.overRowId = tr?.dataset?.rowId ?? dragging.rowId
        }
        if (dragging.columnId) {
          const ths = document.elementsFromPoint(e.clientX, e.clientY).map(el => el.closest('th'))
          const th = ths?.find(el => el?.dataset.columnId && el.dataset.columnId !== dragging.columnId)
          newDragging.overColumnId = th?.dataset?.columnId ?? dragging.columnId
        }
        spreadsheetContext.setDragging(newDragging)
      }
    }

    const onDraggingMouseUp = (e: MouseEvent): void => {
      if (dragging.rowId ?? dragging.columnId) {
        spreadsheetContext.setDragging({})
        if (dragging.rowId && dragging.overRowId) {
          moveRow(dragging.rowId, dragging.overRowId)
        }
        if (dragging.columnId && dragging.overColumnId) {
          moveColumn(dragging.columnId, dragging.overColumnId)
        }
      }
    }
    document.addEventListener('mousemove', onDraggingMouseMove)
    document.addEventListener('mouseup', onDraggingMouseUp)
    return () => {
      document.removeEventListener('mousemove', onDraggingMouseMove)
      document.removeEventListener('mouseup', onDraggingMouseUp)
    }
  }, [dragging, moveRow, moveColumn, spreadsheetContext])

  const actionOptions: BlockContainerProps['actionOptions'] = {
    options: documentEditable
      ? [
          'delete',
          {
            type: 'item',
            name: 'addRow',
            label: t('spreadsheet.row.add_below'),
            icon: (
              <MenuIcon>
                <Icon.ArrowDown />
              </MenuIcon>
            ),
            onAction: () => addRow(0)
          }
        ]
      : [],
    buttonClassName: 'spreadsheet-action'
  }

  const onSpreadsheetClick = (event: React.MouseEvent<HTMLInputElement>): void => {
    // // editor.chain().setNodeSelection(getPos()).run()
    const { state, view } = editor
    const { tr } = state
    let pos = getPos() - 1
    if (pos < 0) {
      pos = 0
    }
    // TODO: need fix for co-editing cursor
    view.dispatch(tr.setSelection(TextSelection.create(tr.doc, pos)))
    editor.commands.blur()
  }

  const [rowLayoutHeights, setRowLayoutHeights] = React.useState<{ [rowId: string]: number }>({})

  return (
    <BlockContainer deleteNode={deleteNode} actionOptions={actionOptions} onMouseDown={onSpreadsheetClick}>
      {documentEditable ? (
        <Input
          bordered={false}
          className="spreadsheet-title"
          value={title}
          placeholder="Untitled Spreadsheet"
          onChange={handleTitleChange}
        />
      ) : (
        <div className="spreadsheet-title">{title}</div>
      )}
      <SpreadsheetContainer context={spreadsheetContext}>
        <SpreadsheetPanel context={spreadsheetContext}>
          {rows.map((rowBlock, rowIdx) => {
            return (
              <SpreadsheetRowAction
                key={rowIdx}
                context={spreadsheetContext}
                rowId={rowBlock.id}
                rowNumber={`${rowIdx + 1}`}
                rowActions={
                  documentEditable
                    ? [
                        {
                          name: 'addRowAbove',
                          title: t('spreadsheet.row.add_above'),
                          icon: <Icon.ArrowUp />,
                          onAction: () => addRow(rowIdx)
                        },
                        {
                          name: 'addRowBelow',
                          title: t('spreadsheet.row.add_below'),
                          icon: <Icon.ArrowDown />,
                          onAction: () => addRow(rowIdx + 1)
                        },
                        {
                          name: 'deleteRow',
                          title: t('spreadsheet.row.delete'),
                          icon: <Icon.Delete />,
                          onAction: () => removeRow(rowIdx)
                        }
                      ]
                    : []
                }
                draggable={documentEditable}
                height={rowLayoutHeights[rowBlock.id]}
              />
            )
          })}
        </SpreadsheetPanel>
        <SpreadsheetScrollView>
          <SpreadsheetView>
            <SpreadsheetHeader rowId="first" context={spreadsheetContext}>
              {columns.map((column, i) => {
                const handleTitleSave = (value: string): boolean => {
                  if (columns.some(c => c.title === value && c.uuid !== column.uuid)) {
                    // TODO: UI
                    console.error('duplicate column name')
                    return false
                  } else {
                    updateColumn({ ...column, title: value })
                    return true
                  }
                }
                const onResize = (width: number): void => {
                  updateColumn({ ...column, width })
                }
                return (
                  <SpreadsheetHeaderColumn
                    key={column.uuid}
                    context={spreadsheetContext}
                    columnId={column.uuid}
                    columnActions={
                      documentEditable
                        ? [
                            {
                              name: 'addColumnLeft',
                              title: t('spreadsheet.column.add_left'),
                              icon: <Icon.ArrowLeft />,
                              onAction: () => addColumn(i)
                            },
                            {
                              name: 'addColumnRight',
                              title: t('spreadsheet.column.add_right'),
                              icon: <Icon.ArrowRight />,
                              onAction: () => addColumn(i + 1)
                            },
                            {
                              name: 'deleteColumn',
                              title: t('spreadsheet.column.delete'),
                              icon: <Icon.Delete />,
                              onAction: () => removeColumn(column)
                            }
                          ]
                        : []
                    }
                    draggable={documentEditable}
                    onResize={onResize}
                    width={columnWidths[column.uuid]}
                    setWidth={number => setColumnWidths({ ...columnWidths, [column.uuid]: number })}
                  >
                    <SpreadsheetColumnEditable
                      context={spreadsheetContext}
                      index={i}
                      column={column}
                      onSave={handleTitleSave}
                      editable={documentEditable}
                    />
                  </SpreadsheetHeaderColumn>
                )
              })}
            </SpreadsheetHeader>
            <SpreadsheetBody>
              {rows.map((rowBlock, rowIdx) => {
                return (
                  <SpreadsheetRow
                    key={rowIdx}
                    context={spreadsheetContext}
                    rowId={rowBlock.id}
                    onHeightChange={(height: number) =>
                      setRowLayoutHeights({ ...rowLayoutHeights, [rowBlock.id]: height })
                    }
                  >
                    {columns.map((column, columnIdx) => {
                      const block = getCellBlock(rowBlock.id, column.uuid)
                      return (
                        <SpreadsheetCellContainer
                          key={block.id}
                          context={spreadsheetContext}
                          cellId={{ rowId: rowBlock.id, columnId: column.uuid }}
                        >
                          {documentEditable ? (
                            <SpreadsheetCell
                              context={spreadsheetContext}
                              tableId={parentId}
                              key={block.id}
                              block={block}
                              saveBlock={saveCellBlock}
                              width={columnWidths[column.uuid]}
                              height={rowLayoutHeights[rowBlock.id]}
                            />
                          ) : (
                            <div className="cell">{block.text}</div>
                          )}
                        </SpreadsheetCellContainer>
                      )
                    })}
                  </SpreadsheetRow>
                )
              })}
            </SpreadsheetBody>
          </SpreadsheetView>
        </SpreadsheetScrollView>
      </SpreadsheetContainer>
    </BlockContainer>
  )
}
