import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { Input, Dropdown, Icon } from '@brickdoc/design-system'
import { useEditorI18n } from '../../hooks'

import { BlockContainer, BlockContainerProps } from '../BlockContainer'

import { useSpreadsheet } from './useSpreadsheet'
import { columnDisplayTitle } from './helper'

import {
  SpreadsheetMenu,
  SpreadsheetContainer,
  SpreadsheetView,
  SpreadsheetHeader,
  SpreadsheetHeaderColumn,
  SpreadsheetBody,
  SpreadsheetRow,
  SpreadsheetCellContainer,
  SpreadsheetEditable
} from './SpreadsheetView'

import { useSpreadsheetContext } from './SpreadsheetContext'

import { SpreadsheetCell } from './SpreadsheetCell'
import './Spreadsheet.less'

export const Spreadsheet: React.FC<NodeViewProps> = ({ editor, node, deleteNode, updateAttributes }) => {
  const parentId: string = node.attrs.uuid
  const prevData = node.attrs.data || {}

  const spreadsheetContext = useSpreadsheetContext()

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
    saveCellBlock
  } = useSpreadsheet({
    parentId,
    data: prevData,
    updateAttributeData
  })

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const title = event.target.value
    updateAttributes({ title })
    console.log(title)
    setTitle(title)
  }

  const { dragging } = spreadsheetContext

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

  const menu = SpreadsheetMenu({
    items: [
      {
        name: 'delete',
        title: t('spreadsheet.delete'),
        icon: <Icon.Delete />,
        onAction: deleteNode
      },
      {
        name: 'addRow',
        title: t('spreadsheet.row.add_below'),
        icon: <Icon.ArrowDown />,
        onAction: () => addRow(0)
      }
    ]
  })

  const actionOptions: BlockContainerProps['actionOptions'] = []

  return (
    <BlockContainer deleteNode={deleteNode} actionOptions={actionOptions}>
      <span>
        <SpreadsheetContainer>
          <Input
            className="spreadsheet-title"
            value={title}
            placeholder="Untitled Spreadsheet"
            onChange={handleTitleChange}
          />
          <SpreadsheetView>
            <SpreadsheetHeader rowId="first" context={spreadsheetContext}>
              <SpreadsheetHeaderColumn className="row-action-panel" context={spreadsheetContext} columnId="first">
                <div className="row-action-panel-layer">
                  <Dropdown
                    className="spreadsheet-menu-button"
                    trigger={['click', 'contextMenu']}
                    placement="bottomEnd"
                    overlay={menu}
                  >
                    <Icon.HamburgerButton />
                  </Dropdown>
                </div>
              </SpreadsheetHeaderColumn>
              {columns.map((column, i) => {
                const handleTitleSave = (value: string): void => {
                  updateColumn({ ...column, title: value })
                }
                return (
                  <SpreadsheetHeaderColumn
                    key={column.uuid}
                    context={spreadsheetContext}
                    columnId={column.uuid}
                    columnActions={[
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
                    ]}
                    draggable={true}
                  >
                    <SpreadsheetEditable
                      context={spreadsheetContext}
                      className="column"
                      value={columnDisplayTitle(column)}
                      onSave={handleTitleSave}
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
                    rowNumber={`${rowIdx + 1}`}
                    rowActions={[
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
                    ]}
                    draggable={true}
                  >
                    {columns.map((column, columnIdx) => {
                      const block = getCellBlock(rowBlock.id, column.uuid)
                      return (
                        <SpreadsheetCellContainer
                          key={block.id}
                          context={spreadsheetContext}
                          cellId={{ rowId: rowBlock.id, columnId: column.uuid }}
                        >
                          <SpreadsheetCell
                            context={spreadsheetContext}
                            parentId={parentId}
                            key={block.id}
                            block={block}
                            saveBlock={saveCellBlock}
                          />
                        </SpreadsheetCellContainer>
                      )
                    })}
                  </SpreadsheetRow>
                )
              })}
            </SpreadsheetBody>
          </SpreadsheetView>
        </SpreadsheetContainer>
      </span>
    </BlockContainer>
  )
}
