import React from 'react'
import { TableColumnType } from 'react-table'
import { Popover, Modal, DeprecatedMenu as Menu, Input, Icon } from '@brickdoc/design-system'
import { COLUMN_TYPE } from './columnType'
import { useEditorI18n } from '../../hooks'

interface ColumnMenuProps {
  onColumnNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onColumnTypeChange: (type: TableColumnType) => void
  dynamic: boolean
  onRemoveColumn: () => void
  columnName?: string
  columnType: string
}

export const ColumnMenu: React.FC<ColumnMenuProps> = ({
  onRemoveColumn,
  dynamic,
  onColumnNameChange,
  onColumnTypeChange,
  columnName,
  columnType,
  children
}) => {
  const { t } = useEditorI18n()
  const [visible, setVisible] = React.useState(false)
  const handleVisibleChange = (visible: boolean): void => setVisible(visible)
  const [modal, contextHolder] = Modal.useModal()

  const removeColumnConfirm = (): void => {
    setVisible(false)
    modal.confirm({
      title: t('table.remove_column.title'),
      okText: t('table.remove_column.ok'),
      cancelText: t('table.remove_column.cancel'),
      icon: null,
      onOk: () => onRemoveColumn()
    })
  }

  const handleUpdateColumnType = (type: TableColumnType): void => {
    onColumnTypeChange(type)
    setVisible(false)
  }

  const currentColumnType = COLUMN_TYPE.find(item => item.type === columnType)!

  return (
    <>
      {contextHolder}
      <Popover
        visible={!dynamic && visible}
        overlayClassName="table-block-menu-popover"
        onVisibleChange={handleVisibleChange}
        destroyTooltipOnHide={true}
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
            <Menu.ItemGroup title={t('table.column_type')}>
              <Menu.SubMenu
                key="type"
                className="table-block-menu-submenu-title"
                title={
                  <>
                    {React.createElement(currentColumnType.icon)}
                    <span>{t(`table.column_types.${currentColumnType.type}`)}</span>
                  </>
                }>
                <Menu.ItemGroup title={t('table.column_types.basic')}>
                  {COLUMN_TYPE.map(type => (
                    <Menu.Item key={type.type} onClick={() => handleUpdateColumnType(type.type)}>
                      {React.createElement(type.icon)}
                      <span>{t(`table.column_types.${type.type}`)}</span>
                    </Menu.Item>
                  ))}
                </Menu.ItemGroup>
              </Menu.SubMenu>
            </Menu.ItemGroup>
            <Menu.Item onClick={removeColumnConfirm} className="table-block-menu-item" key="Delete">
              <Icon.Delete />
              <span>{t('table.remove_column.text')}</span>
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
