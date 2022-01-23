import React from 'react'

import { Dropdown, Menu, Button } from '@brickdoc/design-system'

import { useEditorI18n } from '../../hooks'

import { MenuIcon } from '../SlashMenu/styled'

import { SpreadsheetContext, SpreadsheetSelectionCellId } from './SpreadsheetContext'

/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/interactive-supports-focus,
  jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */

export interface SpreadsheetActionItem {
  name: string
  title?: string
  icon?: React.ReactElement
  onAction?: (key: React.Key) => void
}

export const SpreadsheetMenu = (options: {
  items: SpreadsheetActionItem[]
  onAction?: (key: string) => void
}): JSX.Element => {
  const { items, onAction } = options
  return (
    <Menu>
      {items.map(item => {
        const title = item.title ?? item.name
        return (
          <Menu.Item
            key={item.name}
            itemKey={item.name}
            // icon={<MenuIcon>{item.icon}</MenuIcon>} TODO: bugfix
            label={title}
            onAction={key => {
              item.onAction?.(key)
              onAction?.(key)
            }}
          >
            <MenuIcon style={{ marginRight: '10px' }}>{item.icon}</MenuIcon>
            {title}
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

export const SpreadsheetContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="brickdoc-spreadsheet-block">{children}</div>
}

export const SpreadsheetView: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <table>{children}</table>
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
}> = ({ context, columnId, children, className = '', columnActions, draggable }) => {
  const { t } = useEditorI18n()
  const selected = context.selection.columnIds?.includes(columnId)
  const dragging = context.dragging.columnId === columnId
  const draggingOver = context.dragging.overColumnId === columnId
  const [dropdownVisible, setDropdownVisible] = React.useState(false)

  const unselectColumn = (): void => {
    context.clearSelection()
    document.removeEventListener('mousedown', unselectColumn)
  }

  const selectColumn = (): void => {
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

  return (
    <th
      data-column-id={columnId}
      className={`${className} ${selected ? 'selected' : ''} ${dragging ? 'dragging' : ''} ${
        draggingOver ? 'dragging-over' : ''
      }`}
      onClick={selectColumn}
      style={
        dragging
          ? {
              transform: `translateX(${context.dragging.movementX}px)`
            }
          : {}
      }
      onMouseDown={onMouseDown}
    >
      {children}
      {columnActions ? (
        <Dropdown
          className="column-action"
          trigger={['click', 'contextMenu']}
          overlay={SpreadsheetMenu({
            items: columnActions,
            onAction: key => setDropdownVisible(false)
          })}
          placement="bottomStart"
          visible={dropdownVisible}
          onVisibleChange={onDropdownVisibleChange}
          aria-label={t('spreadsheet.column.actions')}
        >
          <span>⌄</span>
        </Dropdown>
      ) : (
        ''
      )}
    </th>
  )
}

export const SpreadsheetBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <tbody>{children}</tbody>
}

export const SpreadsheetRow: React.FC<{
  context: SpreadsheetContext
  rowId: string
  children: React.ReactNode
  rowNumber?: string
  rowActions?: SpreadsheetActionItem[]
  draggable?: boolean
}> = ({ context, rowId, children, rowNumber, rowActions, draggable }) => {
  const { t } = useEditorI18n()

  const selected = context.selection.rowIds?.includes(rowId)
  const dragging = context.dragging.rowId === rowId
  const draggingOver = context.dragging.overRowId === rowId

  const [dropdownVisible, setDropdownVisible] = React.useState(false)

  const onClickRowNumber = (e: { preventDefault: () => void; stopPropagation: () => void }): void => {
    e.preventDefault()
    e.stopPropagation()
    selectRow()
  }

  const unselectRow = (): void => {
    context.clearSelection()
    document.removeEventListener('mousedown', unselectRow)
  }

  const selectRow = (): void => {
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

  return (
    <tr
      className={`${selected ? 'selected' : ''} ${dragging ? 'dragging' : ''} ${draggingOver ? 'dragging-over' : ''}`}
      style={
        dragging
          ? {
              transform: `translateY(${context.dragging.movementY}px)`
            }
          : {}
      }
      data-row-id={rowId}
    >
      <td className="row-action-panel">
        <div className="row-action-panel-layer" onMouseDown={onMouseDown}>
          <Button className="row-number" onClick={onClickRowNumber}>
            {rowNumber}
          </Button>
          {rowActions ? (
            <Dropdown
              className="row-action"
              trigger={['click', 'contextMenu']}
              overlay={SpreadsheetMenu({
                items: rowActions,
                onAction: key => setDropdownVisible(false)
              })}
              placement="bottomStart"
              visible={dropdownVisible}
              onVisibleChange={onDropdownVisibleChange}
              aria-label={t('spreadsheet.row.actions')}
            >
              <span>⌄</span>
            </Dropdown>
          ) : (
            ''
          )}
        </div>
      </td>
      {children}
    </tr>
  )
}

export const SpreadsheetCellContainer: React.FC<{
  context: SpreadsheetContext
  cellId: SpreadsheetSelectionCellId
  children?: React.ReactNode
}> = ({ children, context, cellId }) => {
  const cellIdStr = `${cellId.rowId},${cellId.columnId}`
  const { selection } = context
  const selected =
    selection.cellIds?.includes(cellIdStr) ??
    selection.rowIds?.includes(cellId.rowId) ??
    selection.columnIds?.includes(cellId.columnId)

  const unselectCell = (): void => {
    context.clearSelection()
    document.removeEventListener('mousedown', unselectCell)
  }

  const selectCell = (): void => {
    context.selectCell(cellIdStr)
    document.addEventListener('mousedown', unselectCell)
  }

  return (
    <td className={selected ? 'selected' : ''} onClick={selectCell}>
      {children}
    </td>
  )
}

export const SpreadsheetEditable: React.FC<{
  context?: SpreadsheetContext
  className?: string
  value?: string
  onSave?: (value: string) => void
}> = ({ className, value, onSave, context }) => {
  const [editing, setEditing] = React.useState(false)

  const handleEnterEdit = (): void => {
    context?.clearSelection()
    setEditing(true)
  }

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e): void => {
    setEditing(false)
    onSave?.(e.target.value)
  }

  return editing ? (
    // eslint-disable-next-line jsx-a11y/no-autofocus
    <input autoFocus className={className} defaultValue={value} onBlur={handleBlur} />
  ) : (
    <div onDoubleClick={handleEnterEdit} className={className}>
      {value}
    </div>
  )
}
