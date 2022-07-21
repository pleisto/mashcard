import React from 'react'
import { TextSelection } from 'prosemirror-state'
import { Icon } from '@mashcard/design-system'
import { useEditorI18n, useDocumentEditable } from '../../../hooks'
import { BlockContainer, BlockContainerProps } from '../BlockContainer'
import { SpreadsheetViewProps } from '../../../extensions/blocks/spreadsheet/meta'
import { MenuIcon } from '../../ui/BlockSelector/BlockSelector.style'

import { SpreadsheetTitleEditing, SpreadsheetTitleInput, SpreadsheetTitleTooltip } from './Spreadsheet.style'
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
  SpreadsheetColumnEditable,
  SpreadsheetActionItem
} from './SpreadsheetView'

import { useSpreadsheetContext } from './SpreadsheetContext'

import { SpreadsheetCell } from './SpreadsheetCell'

export const SpreadsheetBlockView: React.FC<SpreadsheetViewProps> = ({
  editor,
  node,
  deleteNode,
  updateAttributes,
  getPos
}) => {
  const [t] = useEditorI18n()
  const [documentEditable] = useDocumentEditable(undefined)

  const parentId: string = node.attrs.uuid
  const prevData = node.attrs.data || {}

  const { isDefaultTitle } = node.attrs
  const [title, setTitle] = React.useState<string>(node.attrs.title ?? '')
  const [titleErrorMsg, setTitleErrorMsg] = React.useState<string | undefined>()

  const updateAttributeData = (data: Record<string, any>): void => {
    updateAttributes({
      data: { ...prevData, ...data }
    })
  }

  const getDocSpreadsheetTitles = (): { [uuid: string]: string } => {
    const { state } = editor
    const spreadsheetTitles: { [uuid: string]: string } = {}
    state.doc.descendants(otherNode => {
      if (otherNode.type.name === node.type.name) {
        spreadsheetTitles[otherNode.attrs.title] = otherNode.attrs.uuid
      }
    })
    return spreadsheetTitles
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
    cellsMap,
    deleteSpreadsheet
  } = useSpreadsheet({
    title,
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

  const handleDeleteNode = (): void => {
    deleteSpreadsheet()
    deleteNode()
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newTitle = event.target.value
    if (newTitle !== title || titleErrorMsg) {
      setTitle(newTitle)
      if (newTitle.length > 0) {
        const dupTitleId = getDocSpreadsheetTitles()[newTitle]
        if (dupTitleId && dupTitleId !== parentId) {
          setTitleErrorMsg(`'${newTitle}' ${t('spreadsheet.title.used')}`)
        } else if (columns.some(c => c.title === newTitle)) {
          setTitleErrorMsg(`'${newTitle}' ${t('spreadsheet.title.used')}`)
        } else {
          updateAttributes({ title: newTitle, isDefaultTitle: false })
          setTitleErrorMsg(undefined)
        }
      } else {
        setTitleErrorMsg(t('spreadsheet.title.empty'))
      }
    }
  }

  const { dragging } = spreadsheetContext

  const [columnWidths, setColumnWidths] = React.useState(Object.fromEntries(columns.map(c => [c.uuid, c.width])))

  const finalColumnWidths = Object.fromEntries(Object.entries(columnWidths).map(([id, width]) => [id, width ?? 230]))

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
    view.dispatch(tr.setSelection(TextSelection.create(tr.doc, pos)))
    // TODO: need fix for co-editing cursor
    // editor.commands.blur()
  }

  const [rowLayoutHeights, setRowLayoutHeights] = React.useState<{ [rowId: string]: number }>({})

  return (
    <BlockContainer
      node={node}
      deleteNode={handleDeleteNode}
      actionOptions={actionOptions}
      onMouseDown={onSpreadsheetClick}
    >
      {documentEditable ? (
        <SpreadsheetTitleEditing>
          <SpreadsheetTitleInput
            value={isDefaultTitle ? '' : title}
            placeholder={title}
            onChange={handleTitleChange}
            onBlur={handleTitleChange}
            danger={!!titleErrorMsg}
          />
          {titleErrorMsg && <SpreadsheetTitleTooltip>{titleErrorMsg}</SpreadsheetTitleTooltip>}
        </SpreadsheetTitleEditing>
      ) : (
        <div className="spreadsheet-title">{title}</div>
      )}
      <SpreadsheetContainer context={spreadsheetContext}>
        <SpreadsheetPanel context={spreadsheetContext}>
          {rows.map((rowBlock, rowIdx) => {
            const rowActions: SpreadsheetActionItem[] = []
            if (documentEditable) {
              rowActions.push({
                name: 'addRowAbove',
                title: t('spreadsheet.row.add_above'),
                icon: <Icon.ArrowUp />,
                onAction: () => addRow(rowIdx)
              })
              rowActions.push({
                name: 'addRowBelow',
                title: t('spreadsheet.row.add_below'),
                icon: <Icon.ArrowDown />,
                onAction: () => addRow(rowIdx + 1)
              })
              if (rows.length > 1) {
                rowActions.push({
                  name: 'deleteRow',
                  title: t('spreadsheet.row.delete'),
                  icon: <Icon.Delete />,
                  onAction: () => removeRow(rowIdx)
                })
              }
            }
            return (
              <SpreadsheetRowAction
                key={rowIdx}
                context={spreadsheetContext}
                rowId={rowBlock.id}
                rowNumber={`${rowIdx + 1}`}
                rowActions={rowActions}
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
                const handleTitleSave = (title: string): string | undefined => {
                  return updateColumn({ ...column, title })
                }
                const onResize = (width: number): void => {
                  updateColumn({ ...column, width })
                }

                const columnActions: SpreadsheetActionItem[] = []
                if (documentEditable) {
                  columnActions.push({
                    name: 'addColumnLeft',
                    title: t('spreadsheet.column.add_left'),
                    icon: <Icon.ArrowLeft />,
                    onAction: () => addColumn(i)
                  })
                  columnActions.push({
                    name: 'addColumnRight',
                    title: t('spreadsheet.column.add_right'),
                    icon: <Icon.ArrowRight />,
                    onAction: () => addColumn(i + 1)
                  })
                  if (columns.length > 1) {
                    columnActions.push({
                      name: 'deleteColumn',
                      title: t('spreadsheet.column.delete'),
                      icon: <Icon.Delete />,
                      onAction: () => removeColumn(column)
                    })
                  }
                }
                return (
                  <SpreadsheetHeaderColumn
                    key={column.uuid}
                    context={spreadsheetContext}
                    columnId={column.uuid}
                    columnActions={columnActions}
                    draggable={documentEditable}
                    onResize={onResize}
                    width={finalColumnWidths[column.uuid]}
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
                      const block = getCellBlock(parentId, rowBlock.id, column.uuid)
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
                              rowIdx={rowIdx}
                              saveBlock={saveCellBlock}
                              columnTitle={column.title}
                              columnSort={column.sort}
                              width={finalColumnWidths[column.uuid]}
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
