/* eslint-disable no-nested-ternary */
import React from 'react'
import { NodeViewProps } from '@tiptap/core'
import { Button, Icon, Input, Modal, Select, Switch } from '@brickdoc/design-system'
import { BlockContainer, FormulaMenu } from '../../../components'
import { COLOR } from '../../../helpers/color'
import './FormulaBlock.less'
import { EditorDataSourceContext } from '../../../dataSource/DataSource'
import { DatabaseType, displayValue, FormulaType, VariableClass, VariableInterface } from '@brickdoc/formula'
import { BrickdocEventBus, FormulaUpdated } from '@brickdoc/schema'
import { TableRender } from '../../../components/Table/TableRender'
import { useEditorI18n } from '../../../hooks'
import { Column } from 'react-table'
import { DatabaseRows } from '../..'
import { DatabaseColumns, DEFAULT_GROUP_ID } from '../../../components/Table/useColumns'

export interface FormulaBlockProps extends NodeViewProps {}

const i18nKey = 'formula.menu'

export const FormulaBlock: React.FC<FormulaBlockProps> = ({ editor, node, updateAttributes, extension, getPos }) => {
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const formulaContext = editorDataSource.formulaContext
  const { t } = useEditorI18n()

  const attributes = node.attrs.formula
  const [variable, setVariable] = React.useState(formulaContext?.findVariable(editorDataSource.rootId, attributes.id))

  const updateFormula = (id: string): void => updateAttributes({ formula: { type: 'FORMULA', id } })

  const handleDelete = (): void => {
    Modal.confirm({
      zIndex: 1070,
      title: t(`${i18nKey}.delete_confirm.title`),
      okText: t(`${i18nKey}.delete_confirm.ok`),
      okButtonProps: { danger: true },
      cancelText: t(`${i18nKey}.delete_confirm.cancel`),
      icon: null,
      onOk: async () => {
        if (!variable || !getPos || !node) return
        const position = getPos()
        await variable.destroy()
        // void (await formulaContext?.removeVariable(variable.t.namespaceId, variable.t.variableId))
        editor.commands.deleteRange({ from: position, to: position + node.nodeSize })
      }
    })
  }

  BrickdocEventBus.subscribe(
    FormulaUpdated,
    e => {
      setVariable(new VariableClass({ t: e.payload.t, formulaContext: e.payload.formulaContext }))
    },
    {
      eventId: `${editorDataSource.rootId},${attributes.id}`,
      subscribeId: `${editorDataSource.rootId},${attributes.id}`
    }
  )

  const COLOR_ARRAY: { [key in FormulaType]: number } = {
    Date: 6,
    Error: 3,
    Column: 6,
    Block: 6,
    void: 3,
    Spreadsheet: 6,
    Button: 1,
    Switch: 1,
    Select: 1,
    Slider: 1,
    Input: 1,
    Radio: 1,
    Rate: 1,
    number: 0,
    null: 0,
    Predicate: 1,
    Cst: 0,
    Function: 3,
    Reference: 0,
    Blank: 0,
    string: 4,
    boolean: 4,
    any: 6,
    Record: 6,
    Array: 6
  }

  const activeColorIndex = variable ? COLOR_ARRAY[variable.t.variableValue.result.type as FormulaType] || 0 : 0
  const activeColor = COLOR[activeColorIndex]
  const handleDefaultPopoverVisibleChange = (visible: boolean): void => {
    if (!visible && node.attrs.isNew) {
      updateAttributes({ isNew: false })
    }
  }

  const renderTable = (result: DatabaseType): React.ReactNode => {
    const columns: Column[] = result.listColumns().map(c => ({
      Header: c.name,
      accessor: c.columnId,
      columnType: c.type,
      index: c.index,
      dateFormat: undefined,
      dateIncludeTime: undefined
    }))

    const fakeColumns = [{ id: DEFAULT_GROUP_ID, columns }] as unknown as Column[]

    const rows: DatabaseRows = result.listRows()

    const databaseColumns: DatabaseColumns = result.listColumns().map(c => ({
      index: c.index,
      key: c.columnId,
      type: c.type,
      title: c.name
    }))
    return (
      <TableRender
        dynamic={true}
        useActiveStatusUtils={{
          isCellActive: (rowId: string, cellIndex: number) => false,
          isRowActive: (rowId: string) => false,
          update: () => {},
          reset: () => {}
        }}
        useColumnsProps={[
          fakeColumns,
          {
            setColumns: () => {},
            add: () => {},
            remove: () => {},
            updateName: () => {},
            updateType: () => {},
            updateWidth: () => {}
          }
        ]}
        tableRowsProps={[
          rows,
          {
            updateData: () => {},
            batchDeleteDataByValue: () => {},
            batchUpdateDataByColumn: () => {},
            addNewRow: () => {},
            moveRow: () => {},
            updateRows: async (): Promise<void> => {},
            fetchRows: async (): Promise<void> => {},
            removeRow: () => {}
          }
        ]}
        deleteNode={handleDelete}
        updateAttributes={(attributes: Record<string, any>) => {}}
        parentId={result.blockId}
        prevData={{
          title: result.name(),
          columns: databaseColumns
        }}
      />
    )
  }

  const renderEmpty = (): React.ReactNode => {
    return (
      <span className="brickdoc-formula-placeholder">
        <Icon.Formula className="brickdoc-formula-placeholder-icon" />
      </span>
    )
  }

  const renderOther = (variable: VariableInterface): React.ReactNode => {
    return (
      <span
        className="brickdoc-formula"
        style={{
          color: activeColor.color,
          borderColor: `rgb(${activeColor.rgb.join(',')}, 0.3)`,
          background: activeColor.label === 'Default' ? 'unset' : `rgb(${activeColor.rgb.join(',')}, 0.1)`
        }}>
        {variable.t.name}: {displayValue(variable.t.variableValue.result)}
      </span>
    )
  }

  const renderVariable = (variable: VariableInterface | undefined): React.ReactNode => {
    if (!variable) return renderEmpty()
    if (variable.isDraft()) return renderEmpty()

    const result = variable.t.variableValue.result

    switch (result.type) {
      case 'Button':
        return (
          <Button disabled={result.result.disabled} onClick={result.result.onClick}>
            {result.result.name}
          </Button>
        )
      case 'Input':
        return (
          <Input
            disabled={result.result.disabled}
            onChange={e => result.result.onChange?.(e.target.value)}
            value={result.result.value}
          />
        )
      case 'Switch':
        return (
          <Switch
            disabled={result.result.disabled}
            size="large"
            checked={result.result.checked}
            onChange={result.result.onChange}
          />
        )
      case 'Select':
        return (
          <Select
            disabled={result.result.disabled}
            options={result.result.options.map(o => ({ value: o, label: o }))}
            onChange={result.result.onChange}
            value={result.result.value}
          />
        )
      case 'Spreadsheet':
        return renderTable(result.result)
      default:
        return renderOther(variable)
    }
  }

  return (
    <BlockContainer inline={true}>
      <FormulaMenu
        defaultVisible={node.attrs.isNew}
        onVisibleChange={handleDefaultPopoverVisibleChange}
        handleDelete={handleDelete}
        updateFormula={updateFormula}
        variable={variable}
        updateVariable={setVariable}>
        {renderVariable(variable)}
      </FormulaMenu>
    </BlockContainer>
  )
}
