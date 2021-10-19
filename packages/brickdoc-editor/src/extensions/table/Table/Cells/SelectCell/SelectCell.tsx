/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { v4 as uuid } from 'uuid'
import { Select, Tag, SelectProps, Modal } from '@brickdoc/design-system'
import { CellProps, TableColumnSelectOption } from 'react-table'
import { useEditingStatus } from '../useEditingStatus'
import { SelectCellOption } from './SelectCellOption'
import { COLOR } from '../../../../color'
import { DatabaseColumns } from '../../useColumns'
import './SelectCell.css'

const randomColor = (): string => COLOR[Math.floor(Math.random() * COLOR.length)].color

export interface SelectCellProps extends CellProps<object> {}

export const bgColor = (color?: string): string => {
  const rgb = COLOR.find(item => item.color === color)?.rgb
  if (!rgb) return ''

  return `rgba(${rgb?.join(',')}, 0.15)`
}

export const SelectCell: React.FC<SelectCellProps> = props => {
  const { cell, value, updateData, batchDeleteSelectData, column, setColumns } = props
  const [modal, contextHolder] = Modal.useModal()
  const [editing, { show: showEditing, hide: hideEditing }] = useEditingStatus(props)

  const [currentValue, setCurrentValue] = React.useState(value)
  React.useEffect(() => {
    setCurrentValue(value)
  }, [value])

  const selectOptions = column.selectOptions

  const setSelectOptions = (fn: (prevColumns: TableColumnSelectOption[]) => TableColumnSelectOption[]): void => {
    setColumns((prevColumns: DatabaseColumns) =>
      prevColumns.map(dbColumn =>
        dbColumn.key === cell.column.id
          ? {
              ...dbColumn,
              selectOptions: fn(dbColumn.selectOptions ?? [])
            }
          : dbColumn
      )
    )
  }

  const isOptionExist = (value: string): boolean => selectOptions.some(item => item.value === value)

  const handleFilterOption: SelectProps<object>['filterOption'] = (inputValue, option) => {
    if (!inputValue) return true
    return ((option?.title as string) ?? '').includes(inputValue)
  }

  const handleColumnOptionChange = (option: TableColumnSelectOption): void => {
    setSelectOptions(prevOptions => prevOptions.map(item => (item.value === option.value ? option : item)))
  }

  const handleColumnOptionRemove = (option: TableColumnSelectOption): void => {
    modal.confirm({
      title: 'Are you sure you want to delete this property?',
      okText: 'Delete',
      okButtonProps: {
        danger: true
      },
      cancelText: 'Cancel',
      icon: null,
      onOk: () => {
        setSelectOptions(prevOptions => prevOptions.filter(item => item.value !== option.value))
        batchDeleteSelectData(cell.column.id, option.value)

        if (option.value === currentValue) {
          setCurrentValue(null)
        }
      }
    })
  }

  const handleChange = (values: string[]): void => {
    const newValue = values[values.length - 1]?.trim()

    if (!newValue) return

    setSelectOptions(prevOptions => {
      if (isOptionExist(newValue)) {
        setCurrentValue(newValue)
        return prevOptions
      }
      const newOption: TableColumnSelectOption = { label: newValue, color: randomColor(), value: uuid() }
      setCurrentValue(newOption.value)
      return [...prevOptions, newOption]
    })
  }

  const handleRemove = React.useCallback((): void => setCurrentValue(null), [])

  const OptionTag: SelectProps<object>['tagRender'] = React.useCallback(
    ({ value }) => {
      const { label, color } = selectOptions.find(item => item.value === value) ?? {}
      return (
        <Tag className="table-block-select-cell-tag" style={{ color }} color={bgColor(color)} closable={true} onClose={handleRemove}>
          {label}
        </Tag>
      )
    },
    [selectOptions, handleRemove]
  )

  const handleEndEditing = (): void => {
    // TODO: fix type
    updateData((cell.row.original as any).id, cell.column.id, currentValue)
    hideEditing()
  }

  const Dropdown: SelectProps<object>['dropdownRender'] = React.useCallback(
    menu => (
      <>
        <div className="table-block-select-dropdown-title">Select an option or create one</div>
        {menu}
      </>
    ),
    []
  )

  if (editing) {
    return (
      <>
        {contextHolder}
        <Select
          className="table-block-select"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={true}
          mode="tags"
          tagRender={OptionTag}
          optionFilterProp="title"
          filterOption={handleFilterOption}
          dropdownRender={Dropdown}
          dropdownClassName="select-cell-select-dropdown"
          value={[currentValue].filter(i => !!i)}
          suffixIcon={false}
          menuItemSelectedIcon={false}
          placeholder="Search for option ..."
          showSearch={true}
          showAction={['focus', 'click']}
          open={true}
          onChange={handleChange}
        >
          {selectOptions.map(option => (
            <Select.Option className="select-cell-select-option" key={option.value} value={option.value} title={option.label}>
              <SelectCellOption onOptionValueChange={handleColumnOptionChange} onOptionRemove={handleColumnOptionRemove} option={option} />
            </Select.Option>
          ))}
        </Select>
        <div data-testid="table-select-overlay" className="table-block-cell-overlay" onClick={() => handleEndEditing()} />
      </>
    )
  }

  const { color, label } = selectOptions.find(item => item.value === value) ?? {}

  return (
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    <div role="button" tabIndex={-1} className="table-block-select-cell" onClick={showEditing}>
      {label && (
        <Tag color={bgColor(color)} style={{ color }}>
          {label}
        </Tag>
      )}
    </div>
  )
}
