import React from 'react'
import cx from 'classnames'
import { useDrag, useDrop } from 'react-dnd'
import { TableRowProps as RTTableRowProps, Row, TableHeaderGroupProps, TableActiveStatus } from 'react-table'
import { Button, Icon, Input, DeprecatedMenu as Menu, Popover } from '@brickdoc/design-system'
import { IsCellActive } from './useActiveStatus'
import { useEditorI18n } from '../../../hooks'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'

export interface TableRowProps extends RTTableRowProps {
  rowActive?: boolean
  onAddNewRow: (rowIndex?: number) => void
  onMoveRow: (fromIndex: number, toIndex: number) => void
  onRemoveRow: (rowId: string) => void
  updateActiveStatus: React.Dispatch<React.SetStateAction<TableActiveStatus[]>>
  isCellActive: IsCellActive
  row: Row
}

const cellPropsGetter = (props: Partial<TableHeaderGroupProps>): Array<Partial<TableHeaderGroupProps>> => [
  props,
  {
    style: {
      display: 'inline-flex'
    }
  }
]

const DND_ITEM_TYPE = 'row'

export const TableRow: React.FC<TableRowProps> = ({
  rowActive,
  isCellActive,
  updateActiveStatus,
  onAddNewRow,
  onMoveRow,
  onRemoveRow,
  row,
  ...rowProps
}) => {
  const { t } = useEditorI18n()
  const dropRef = React.useRef<HTMLDivElement>(null)
  const dragRef = React.useRef(null)

  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    hover(item: { index: number }, monitor) {
      if (!dropRef.current) return

      const dragIndex = item.index
      const hoverIndex = row.index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) return
      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()!
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      // last hover one
      if (dropRef.current.classList.contains('drag-hover-upwards')) return
      if (dropRef.current.classList.contains('drag-hover-downwards')) return

      for (const child of dropRef.current.parentElement?.children ?? []) {
        child.classList.remove('drag-hover-upwards')
        child.classList.remove('drag-hover-downwards')
      }

      dropRef.current.classList.add(dragIndex < hoverIndex ? 'drag-hover-downwards' : 'drag-hover-upwards')
    },
    drop(item: { index: number }, monitor) {
      if (!dropRef.current) return

      const dragIndex = item.index
      const dropIndex = row.index
      // Don't replace items with themselves
      if (dragIndex === dropIndex) return
      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()!
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < dropIndex && hoverClientY < hoverMiddleY) return
      // Dragging upwards
      if (dragIndex > dropIndex && hoverClientY > hoverMiddleY) return
      // Time to actually perform the action
      onMoveRow(dragIndex, dropIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = dropIndex
    }
  })

  const [{ isDragging }, drag, preview] = useDrag({
    type: DND_ITEM_TYPE,
    item: { index: row.index },
    end: () => {
      if (!dropRef.current) return
      // clear hove style
      for (const child of dropRef.current.parentElement?.children ?? []) {
        child.classList.remove('drag-hover-downwards')
        child.classList.remove('drag-hover-upwards')
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  preview(drop(dropRef))
  drag(dragRef)

  const popupContainer = React.useRef<HTMLDivElement | null>(null)
  const [contextMenuVisible, setContextMenuVisible] = React.useState(false)
  const [contextMenuFilterValue, setContextMenuFilterValue] = React.useState('')

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setContextMenuFilterValue(event.target.value)
  const isMenuItemMatch = (item: string): boolean =>
    !contextMenuFilterValue || item.toLowerCase().includes(contextMenuFilterValue.toLowerCase())

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>): boolean => {
    event.preventDefault()

    if (!popupContainer.current) return false

    // TODO: fix type
    updateActiveStatus([{ rowId: (row.original as any).id }])

    popupContainer.current.style.left = `${event.clientX}px`
    popupContainer.current.style.top = `${event.clientY}px`

    setContextMenuVisible(true)

    return false
  }

  return (
    <>
      <Popover
        trigger="contextMenu"
        visible={contextMenuVisible}
        onVisibleChange={setContextMenuVisible}
        overlayClassName="table-block-menu-popover"
        placement="bottom"
        content={
          <Menu className="table-block-menu">
            <Menu.Item key="Filter" className="table-block-menu-item input-item">
              <Input onChange={handleFilterChange} placeholder="Filter actions..." className="table-block-menu-input" />
            </Menu.Item>
            {isMenuItemMatch('Delete') && (
              // TODO: fix type
              <Menu.Item
                data-testid={TEST_ID_ENUM.editor.tableBlock.row.contextMenu.deleteButton.id}
                onClick={() => onRemoveRow((row.original as any).id)}
                className="table-block-menu-item"
                key="Delete"
              >
                <Icon.Delete />
                <span>{t('table.remove_row.text')}</span>
              </Menu.Item>
            )}
          </Menu>
        }
      >
        {/* add a placeholder for popover to follow mouse's position */}
        <div ref={popupContainer} style={{ width: '1px', height: '1px', position: 'fixed' }} />
      </Popover>
      <div
        data-testid={TEST_ID_ENUM.editor.tableBlock.row.id}
        ref={dropRef}
        className={cx('table-block-row', { active: rowActive })}
        onContextMenu={handleContextMenu}
      >
        <div data-testid={TEST_ID_ENUM.editor.tableBlock.row.actions.id} className="table-block-row-actions">
          <Button
            data-testid={TEST_ID_ENUM.editor.tableBlock.row.actions.addButton.id}
            onClick={() => onAddNewRow(row.index)}
            className="table-block-row-action-button"
            type="text"
          >
            <Icon.Plus />
          </Button>
          <Button
            type="text"
            className={cx('table-block-row-action-button', 'drag', { dragging: isDragging })}
            ref={dragRef}
          >
            <Icon.Drag />
          </Button>
        </div>
        <div {...rowProps} style={{ ...rowProps.style, display: 'inline-flex' }}>
          {row.cells.map((cell, cellIndex) => {
            const cellProps = cell.getCellProps(cellPropsGetter)
            return (
              // TODO: fix type
              <div
                {...cellProps}
                key={cellProps.key}
                className={cx('table-block-td', { active: isCellActive((row.original as any).id, cellIndex) })}
              >
                {cell.render('Cell')}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
