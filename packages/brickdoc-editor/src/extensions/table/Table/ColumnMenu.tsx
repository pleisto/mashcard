import React from 'react'
import { Popover, Modal, Menu, Input, Icon } from '@brickdoc/design-system'
import { COLUMN_TYPE } from './columnType'

interface ColumnMenuProps {
  onColumnNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onColumnTypeChange: (type: string) => void
  onRemoveColumn: () => void
  columnName?: string
  columnType: string
}

export const ColumnMenu: React.FC<ColumnMenuProps> = ({
  onRemoveColumn,
  onColumnNameChange,
  onColumnTypeChange,
  columnName,
  columnType,
  children
}) => {
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

  const handleUpdateColumnType = (type: string): void => {
    onColumnTypeChange(type)
    setVisible(false)
  }

  const currentColumnType = COLUMN_TYPE.find(item => item.type === columnType)!

  return (
    <>
      {contextHolder}
      <Popover
        visible={visible}
        overlayClassName="table-block-menu-popover"
        onVisibleChange={handleVisibleChange}
        content={
          <Menu className="table-block-menu">
            <Menu.Item key="Header" className="table-block-menu-item input-item">
              <Input
                onFocus={e => {
                  e.target.setSelectionRange(0, e.target.value?.length ?? 0)
                }}
                onChange={onColumnNameChange}
                className="table-block-menu-input"
                value={columnName}
              />
            </Menu.Item>
            <Menu.ItemGroup title="Property Type">
              <Menu.SubMenu
                key="type"
                className="table-block-menu-submenu-title"
                title={
                  <>
                    {React.createElement(currentColumnType.icon)}
                    <span>{currentColumnType.label}</span>
                  </>
                }>
                <Menu.ItemGroup title="Basic">
                  {COLUMN_TYPE.map(type => (
                    <Menu.Item key={type.type} onClick={() => handleUpdateColumnType(type.type)}>
                      {React.createElement(type.icon)}
                      <span>{type.label}</span>
                    </Menu.Item>
                  ))}
                </Menu.ItemGroup>
              </Menu.SubMenu>
            </Menu.ItemGroup>
            <Menu.Item onClick={removeColumnConfirm} className="table-block-menu-item" key="Delete">
              <Icon.Delete />
              <span>Delete</span>
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
