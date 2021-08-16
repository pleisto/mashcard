import React from 'react'
import { Popover, Modal, Menu, Input, Icon } from '@brickdoc/design-system'

interface ColumnMenuProps {
  onColumnNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveColumn: () => void
  columnName?: string
}

export const ColumnMenu: React.FC<ColumnMenuProps> = ({ onRemoveColumn, onColumnNameChange, columnName, children }) => {
  const [visible, setVisible] = React.useState(false)
  const handleVisibleChange = (visible: boolean): void => setVisible(visible)
  const [modal, contextHolder] = Modal.useModal()

  const removeColumnConfirm = (): void => {
    setVisible(false)
    modal.confirm({
      title: 'Are you sure you want to delete this property?',
      okText: 'Delete',
      cancelText: 'Cancel',
      icon: null,
      onOk: () => onRemoveColumn()
    })
  }

  return (
    <>
      {contextHolder}
      <Popover
        visible={visible}
        overlayClassName="table-block-column-menu-popover"
        onVisibleChange={handleVisibleChange}
        content={
          <Menu className="table-block-column-menu">
            <Menu.Item key="Header" className="table-block-column-menu-item input-item">
              <Input
                onFocus={e => {
                  e.target.setSelectionRange(0, e.target.value?.length ?? 0)
                }}
                onChange={onColumnNameChange}
                className="table-block-column-input"
                value={columnName}
              />
            </Menu.Item>
            <Menu.Item onClick={removeColumnConfirm} className="table-block-column-menu-item" key="Delete">
              <Icon className="table-block-column-menu-item-icon" name="delete" />
              Delete
            </Menu.Item>
          </Menu>
        }
        trigger="click"
        placement="bottomLeft">
        {children}
      </Popover>
    </>
  )
}
