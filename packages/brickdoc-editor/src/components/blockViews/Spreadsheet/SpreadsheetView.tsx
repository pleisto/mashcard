import React from 'react'

import { Dropdown, Menu, Button, Icon } from '@brickdoc/design-system'

import { useEditorI18n } from '../../../hooks'

import { MenuIcon } from '../../extensionViews/SlashMenu/styled'

import { SpreadsheetContext, SpreadsheetSelectionCellId } from './SpreadsheetContext'
import { SpreadsheetColumn } from './useSpreadsheet'
import { columnDisplayIndex } from './helper'

/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/interactive-supports-focus,
  jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */

export interface SpreadsheetActionItem {
  name: string
  title?: string
  icon?: React.ReactElement
  onAction?: (key: React.Key) => void
}

export const unselectFn = (options: {
  context: SpreadsheetContext
  setDropdownVisible: (dropdownVisible: boolean) => void
}): ((e: MouseEvent) => void) => {
  const { context, setDropdownVisible } = options
  const fn = (e: MouseEvent): void => {
    const li = (e.target as Element).closest('li[role=menuitem]')
    if (!li) {
      document.removeEventListener('mousedown', fn)
      context.clearSelection()
      setDropdownVisible(false)
    }
  }
  return fn
}

export const SpreadsheetMenu = (options: {
  items: SpreadsheetActionItem[]
  onAction?: (key: string) => void
}): JSX.Element => {
  const { items, onAction } = options
  return (
    <Menu>
      <Menu.Group>
        {items.map(item => {
          const title = item.title ?? item.name
          return (
            <Menu.Item
              key={item.name}
              itemKey={item.name}
              icon={item.icon ? <MenuIcon>{item.icon}</MenuIcon> : null}
              label={title}
              onAction={key => {
                item.onAction?.(key)
                onAction?.(key)
              }}
            />
          )
        })}
      </Menu.Group>
    </Menu>
  )
}

export const SpreadsheetContainer: React.FC<{
  children: React.ReactNode
  context: SpreadsheetContext
  className?: string
}> = ({ children, context, className = '' }) => {
  const { selection } = context

  const hover = selection.all ?? selection.columnIds?.length ?? selection.rowIds?.length ?? selection.cellIds?.length

  return <span className={`${className} ${hover ? 'hover' : ''}`}>{children}</span>
}

export const SpreadsheetScrollView: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="brickdoc-spreadsheet-block">{children}</div>
}

export const SpreadsheetView: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <table className="spreadsheet-rows">{children}</table>
}

export const SpreadsheetPanel: React.FC<{
  children: React.ReactNode
  context: SpreadsheetContext
}> = ({ children, context }) => {
  return (
    <table className={`spreadsheet-row-actions ${context.dragging?.rowId ? 'dragging' : ''}`}>
      <thead>
        <tr data-row-id="first">
          <th />
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  )
}

export const SpreadsheetHeader: React.FC<{
  children: React.ReactNode
  rowId?: string
  context: SpreadsheetContext
}> = ({ children, rowId, context }) => {
  const draggingOver = context.dragging.overRowId === rowId
  return (
    <thead>
      <tr data-row-id={rowId} className={`${draggingOver ? 'dragging-over' : ''}`}>
        {children}
      </tr>
    </thead>
  )
}

export const SpreadsheetHeaderColumn: React.FC<{
  context: SpreadsheetContext
  columnId: string
  children?: React.ReactNode
  className?: string
  columnActions?: SpreadsheetActionItem[]
  draggable?: boolean
  onResize?: (width: number) => void
  width?: number
  setWidth?: (width: number) => void
}> = ({ context, columnId, children, className = '', columnActions, draggable, onResize, width, setWidth }) => {
  const { t } = useEditorI18n()
  const columnRef = React.createRef<HTMLTableHeaderCellElement>()
  const selected = context.selection.columnIds?.includes(columnId)
  const dragging = context.dragging.columnId === columnId
  const draggingOver = context.dragging.overColumnId === columnId
  const [dropdownVisible, setDropdownVisible] = React.useState(false)
  const latestMovement = React.useRef<number>(0)

  const unselectColumn = unselectFn({
    context,
    setDropdownVisible
  })

  const selectColumn = (): void => {
    window.getSelection()?.removeAllRanges()
    context.selectColumns([columnId])
    document.addEventListener('mousedown', unselectColumn)
  }

  const onDropdownVisibleChange = (value: boolean): void => {
    setDropdownVisible(value)
    if (value) {
      selectColumn()
    }
  }

  const onMouseDown: React.MouseEventHandler<HTMLElement> = (e): void => {
    if (e.button !== 0 || !draggable) return
    context.setDragging({ columnId })
  }

  const onResizeMouseMove = (e: MouseEvent): void => {
    latestMovement.current += e.movementX
    if (setWidth) {
      setWidth(latestMovement.current)
    }
  }

  const onResizeMouseUp = (e: MouseEvent): void => {
    document.removeEventListener('mousemove', onResizeMouseMove)
    document.removeEventListener('mouseup', onResizeMouseUp)
    if (onResize) {
      onResize(latestMovement.current)
    }
  }

  const onResizeMouseDown: React.MouseEventHandler<HTMLElement> = (e): void => {
    e.preventDefault()
    e.stopPropagation()
    document.addEventListener('mousemove', onResizeMouseMove)
    document.addEventListener('mouseup', onResizeMouseUp)
    context.clearSelection()
    latestMovement.current = width ?? columnRef.current?.clientWidth ?? 230
  }

  const onContextMenu: React.MouseEventHandler = (e: React.MouseEvent): void => {
    if (!selected) {
      selectColumn()
    }
    setDropdownVisible(true)
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <th
      ref={columnRef}
      data-column-id={columnId}
      className={`${className} ${selected ? 'selected' : ''} ${dragging ? 'dragging' : ''} ${
        draggingOver ? 'dragging-over' : ''
      }`}
      onClick={selectColumn}
      style={{
        ...(dragging ? { transform: `translateX(${context.dragging.movementX}px)` } : {}),
        ...(width
          ? {
              width: `${width}px`,
              minWidth: `${width}px`
            }
          : {})
      }}
      onMouseDown={onMouseDown}
      onContextMenu={onContextMenu}>
      {children}
      {columnActions ? (
        <Dropdown
          className="column-action"
          trigger={['click', 'contextMenu']}
          overlay={SpreadsheetMenu({
            items: [
              {
                name: 'copy',
                title: t('spreadsheet.copy'),
                icon: <Icon.Copy />,
                onAction: () => {
                  context.copyToClipboard({ columnIds: [columnId] })
                }
              },
              ...columnActions
            ],
            onAction: key => setDropdownVisible(false)
          })}
          placement="bottomStart"
          visible={dropdownVisible}
          onVisibleChange={onDropdownVisibleChange}
          aria-label={t('spreadsheet.column.actions')}>
          <span>⌄</span>
        </Dropdown>
      ) : (
        <></>
      )}
      {onResize ? <button className="resize-handler" onMouseDown={onResizeMouseDown} /> : <></>}
    </th>
  )
}

export const SpreadsheetBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <tbody>{children}</tbody>
}

export const SpreadsheetRowAction: React.FC<{
  context: SpreadsheetContext
  rowId: string
  rowNumber?: string
  rowActions?: SpreadsheetActionItem[]
  draggable?: boolean
  height?: number
}> = ({ context, rowId, children, rowNumber, rowActions, draggable, height }) => {
  const { t } = useEditorI18n()

  const { hoverRowId } = context

  const hover = hoverRowId === rowId
  const selected = context.selection.rowIds?.includes(rowId)
  const dragging = context.dragging.rowId === rowId
  const draggingOver = context.dragging.overRowId === rowId

  const [dropdownVisible, setDropdownVisible] = React.useState(false)

  const onClickRowNumber = (e: { preventDefault: () => void; stopPropagation: () => void }): void => {
    e.preventDefault()
    e.stopPropagation()
    selectRow()
  }

  const unselectRow = unselectFn({
    context,
    setDropdownVisible
  })

  const selectRow = (): void => {
    window.getSelection()?.removeAllRanges()
    context.selectRows([rowId])
    document.addEventListener('mousedown', unselectRow)
  }

  const onDropdownVisibleChange = (value: boolean): void => {
    setDropdownVisible(value)
    if (value) {
      selectRow()
    }
  }

  const onMouseDown: React.MouseEventHandler<HTMLElement> = (e): void => {
    if (e.button !== 0 || !draggable) return
    context.setDragging({ rowId })
  }

  const onContextMenu: React.MouseEventHandler = (e: React.MouseEvent): void => {
    if (!selected) {
      selectRow()
    }
    setDropdownVisible(true)
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <tr
      className={`${hover ? 'hover' : ''} ${selected ? 'selected' : ''} ${dragging ? 'dragging' : ''} ${
        draggingOver ? 'dragging-over' : ''
      }`}
      style={{
        ...(dragging
          ? {
              transform: `translateY(${context.dragging.movementY}px)`
            }
          : {}),
        ...(height
          ? {
              height: `${height}px`
            }
          : {})
      }}
      data-row-id={rowId}>
      <td className="row-action-panel" onContextMenu={onContextMenu}>
        <div className="row-action-panel-layer" onMouseDown={onMouseDown}>
          <Button className="row-number" onClick={onClickRowNumber}>
            {rowNumber}
          </Button>
          {rowActions ? (
            <Dropdown
              className="row-action"
              trigger={['click', 'contextMenu']}
              overlay={SpreadsheetMenu({
                items: [
                  {
                    name: 'copy',
                    title: t('spreadsheet.copy'),
                    icon: <Icon.Copy />,
                    onAction: () => {
                      context.copyToClipboard({ rowIds: [rowId] })
                    }
                  },
                  ...rowActions
                ],
                onAction: key => setDropdownVisible(false)
              })}
              placement="bottomStart"
              visible={dropdownVisible}
              onVisibleChange={onDropdownVisibleChange}
              aria-label={t('spreadsheet.row.actions')}>
              <span>⌄</span>
            </Dropdown>
          ) : (
            ''
          )}
        </div>
      </td>
    </tr>
  )
}

export const SpreadsheetRow: React.FC<{
  context: SpreadsheetContext
  rowId: string
  children: React.ReactNode
  onHeightChange?: (height: number) => void
}> = ({ context, rowId, children, onHeightChange }) => {
  const { setHoverRowId } = context

  const rowRef = React.createRef<HTMLTableRowElement>()

  const selected = context.selection.rowIds?.includes(rowId)
  const dragging = context.dragging.rowId === rowId
  const draggingOver = context.dragging.overRowId === rowId

  const onOver = () => setHoverRowId(rowId)
  const onOut = () => setHoverRowId('')

  const latestHeight = React.useRef<number | undefined>()

  const resizeObserver = React.useRef<ResizeObserver>()

  React.useEffect(() => {
    resizeObserver.current = new ResizeObserver(entries => {
      const height = entries[0].contentRect.height
      if (latestHeight.current !== height) {
        onHeightChange?.(height)
        latestHeight.current = height
      }
    })
    if (rowRef.current) {
      resizeObserver.current.observe(rowRef.current)
    }
    return () => {
      resizeObserver.current?.disconnect()
    }
  }, [onHeightChange, rowRef])

  return (
    <tr
      ref={rowRef}
      className={`${selected ? 'selected' : ''} ${dragging ? 'dragging' : ''} ${draggingOver ? 'dragging-over' : ''}`}
      style={
        dragging
          ? {
              transform: `translateY(${context.dragging.movementY}px)`
            }
          : {}
      }
      data-row-id={rowId}
      onMouseOver={onOver}
      onFocus={onOver}
      onMouseOut={onOut}
      onBlur={onOut}>
      {children}
    </tr>
  )
}

export const SpreadsheetCellContainer: React.FC<{
  context: SpreadsheetContext
  cellId: SpreadsheetSelectionCellId
  children?: React.ReactNode
}> = ({ children, context, cellId }) => {
  const { t } = useEditorI18n()

  const cellIdStr = `${cellId.rowId},${cellId.columnId}`
  const { selection } = context
  const selected =
    selection.cellIds?.includes(cellIdStr) ??
    selection.rowIds?.includes(cellId.rowId) ??
    selection.columnIds?.includes(cellId.columnId)

  const [dropdownVisible, setDropdownVisible] = React.useState(false)

  const unselectCell = unselectFn({
    context,
    setDropdownVisible
  })

  const selectCell = (): void => {
    if (!context.editingCellId) {
      window.getSelection()?.removeAllRanges()
      context.selectCell(cellIdStr)
      document.addEventListener('mousedown', unselectCell)
    }
  }

  const onContextMenu: React.MouseEventHandler = (e: React.MouseEvent): void => {
    if (!selected) {
      selectCell()
    }
    setDropdownVisible(true)
    e.preventDefault()
    e.stopPropagation()
  }

  const cellActions = [
    {
      name: 'copy',
      title: t('spreadsheet.copy'),
      icon: <Icon.Copy />,
      onAction: () => {
        context.copyToClipboard({ cellIds: [cellIdStr] })
      }
    }
  ]

  return (
    <td
      className={selected ? 'selected' : ''}
      onClick={selectCell}
      onContextMenu={onContextMenu}
      data-cell-id={cellIdStr}>
      <Dropdown
        overlay={SpreadsheetMenu({
          items: cellActions,
          onAction: key => {
            setDropdownVisible(false)
          }
        })}
        placement="bottomStart"
        visible={dropdownVisible}
        aria-label={t('spreadsheet.cell.actions')}>
        {children}
      </Dropdown>
    </td>
  )
}

export const SpreadsheetColumnEditable: React.FC<{
  context?: SpreadsheetContext
  column: SpreadsheetColumn
  index: number
  onSave?: (value: string) => void
  editable?: boolean
}> = ({ column, index, onSave, context, editable }) => {
  const [editing, setEditing] = React.useState(false)

  const handleEnterEdit = (): void => {
    context?.clearSelection()
    setEditing(true)
  }

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e): void => {
    setEditing(false)
    onSave?.(e.target.value)
  }

  const displayIndex = columnDisplayIndex(index)

  return editing ? (
    // eslint-disable-next-line jsx-a11y/no-autofocus
    <input autoFocus className="column" defaultValue={column.title} onBlur={handleBlur} />
  ) : (
    <div className="column" onDoubleClick={editable ? handleEnterEdit : undefined}>
      {column.title ? (
        <>
          <strong>{column.title}</strong> ({displayIndex})
        </>
      ) : (
        displayIndex
      )}
    </div>
  )
}
