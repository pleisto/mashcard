import React from 'react'
import { Column } from 'react-table'
import { Button, Icon, Popover } from '@brickdoc/design-system'
import { SorterFooter } from './SorterFooter'
import { SorterItem } from './SorterItem'

export interface SorterOption {
  columnId?: string
  sort?: 'asc' | 'desc'
}

export interface SorterProps {
  visible: boolean
  onVisibleChange: (visible: boolean) => void
  onAdd: () => void
  onUpdate: (sorter: Partial<SorterOption>, index: number) => void
  onRemove: (index: number) => void
  columns: Array<Column<object>>
  sorterOptions: SorterOption[]
}

export const Sorter: React.FC<SorterProps> = ({
  sorterOptions,
  columns,
  children,
  visible,
  onVisibleChange,
  onAdd,
  onUpdate,
  onRemove
}) => {
  const Content = (
    <div className="table-block-toolbar-item-panel">
      <span className="table-block-toolbar-item-title">Sort for My All Data</span>
      <div className="table-toolbar-item-group-panel">
        <div role="group" className="table-toolbar-item-group-content">
          {sorterOptions.map((sorter, index) => (
            <div key={index} className="table-toolbar-item-option">
              <SorterItem index={index} sorterSingleOption={sorter} columns={columns} onUpdateSorter={onUpdate} />
              <Button type="text" className="table-toolbar-item-option-action-button fade" onClick={() => onRemove(index)}>
                <Icon.Delete />
              </Button>
            </div>
          ))}
          {sorterOptions.length <= 0 && (
            <>
              <span>Use a sort to:</span>
              <span>Order tasks by priority.</span>
              <span>Show notes by creation date.</span>
              <span>Show recently contacted customers.</span>
            </>
          )}
        </div>
      </div>
      <SorterFooter onAddSorter={onAdd} />
    </div>
  )

  return (
    <Popover
      visible={visible}
      overlayStyle={{
        marginTop: '65px'
      }}
      onVisibleChange={onVisibleChange}
      overlayClassName="table-block-popover"
      trigger="click"
      placement="bottom"
      content={Content}>
      {children}
    </Popover>
  )
}
