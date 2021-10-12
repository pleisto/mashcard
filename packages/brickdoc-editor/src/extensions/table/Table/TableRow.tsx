import React from 'react'
import cx from 'classnames'
import { TableRowProps as RTTableRowProps, Row, TableHeaderGroupProps } from 'react-table'
import { Button, Icon, Input, Menu, Popover } from '@brickdoc/design-system'
import { IsCellActive } from './useActiveStatus'
import { useEditorI18n } from '../../../hooks'

export interface TableRowProps extends RTTableRowProps {
  rowActive?: boolean
  onAddNewRow: (rowIndex?: number) => void
  onRemoveRow: (rowId: string) => void
  isCellActive: IsCellActive
  row: Row
}

const cellPropsGetter = (props: Partial<TableHeaderGroupProps>, { cell }: any): Array<Partial<TableHeaderGroupProps>> => [
  props,
  {
    style: {
      justifyContent: cell.column.align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'center',
      display: 'inline-flex'
    }
  }
]

export const TableRow: React.FC<TableRowProps> = ({ rowActive, isCellActive, onAddNewRow, onRemoveRow, row, ...rowProps }) => {
  const { t } = useEditorI18n()
  const popupContainer = React.useRef<HTMLDivElement | null>(null)
  const [contextMenuVisible, setContextMenuVisible] = React.useState(false)
  const [contextMenuFilterValue, setContextMenuFilterValue] = React.useState('')

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => setContextMenuFilterValue(event.target.value)
  const isMenuItemMatch = (item: string): boolean =>
    !contextMenuFilterValue || item.toLowerCase().includes(contextMenuFilterValue.toLowerCase())

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>): boolean => {
    event.preventDefault()

    if (!popupContainer.current) return false

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
              <Menu.Item onClick={() => onRemoveRow((row.original as any).id)} className="table-block-menu-item" key="Delete">
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
      <div className={cx('table-block-row', { active: rowActive })} onContextMenu={handleContextMenu}>
        <div data-testid="table-actions" className="table-block-row-actions">
          <Button onClick={() => onAddNewRow(row.index)} className="table-block-row-action-button" type="text">
            <Icon.Plus />
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
