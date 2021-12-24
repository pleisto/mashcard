/* eslint-disable no-nested-ternary */
import React from 'react'
import { NodeViewProps } from '@tiptap/core'
import { Button, Icon, Input, Select, Switch } from '@brickdoc/design-system'
import { BlockContainer, FormulaMenu } from '../../../components'
import { COLOR } from '../../../helpers/color'
import './FormulaBlock.less'
import { EditorDataSourceContext } from '../../../dataSource/DataSource'
import { displayValue, FormulaType, VariableClass, VariableInterface } from '@brickdoc/formula'
import { BrickdocEventBus, FormulaUpdated } from '@brickdoc/schema'

export interface FormulaBlockProps extends NodeViewProps {}

export const FormulaBlock: React.FC<FormulaBlockProps> = ({ editor, node, updateAttributes, extension, getPos }) => {
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const formulaContext = editorDataSource.formulaContext

  const attributes = node.attrs.formula
  const [variable, setVariable] = React.useState(formulaContext?.findVariable(editorDataSource.rootId, attributes.id))

  const updateFormula = (id: string): void => updateAttributes({ formula: { type: 'FORMULA', id } })

  // React.useEffect(() => {
  //   variable?.onUpdate(t => {
  //     setT(t.t)
  //     setVariable(t)
  //   })
  // }, [variable])

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

  const renderVariable = (variable: VariableInterface): React.ReactNode => {
    const result = variable.t.variableValue.result

    switch (result.type) {
      case 'Button':
        return (
          <Button isDisabled={result.result.disabled} onPress={result.result.onClick}>
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
            isDisabled={result.result.disabled}
            size="large"
            isSelected={result.result.isSelected}
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
      default:
        return (
          <span
            className="brickdoc-formula"
            style={{
              color: activeColor.color,
              borderColor: `rgb(${activeColor.rgb.join(',')}, 0.3)`,
              background: activeColor.label === 'Default' ? 'unset' : `rgb(${activeColor.rgb.join(',')}, 0.1)`
            }}>
            {variable.t.name}: {displayValue(result)}
          </span>
        )
    }
  }

  return (
    <BlockContainer inline={true}>
      <FormulaMenu
        node={node}
        getPos={getPos}
        defaultVisible={node.attrs.isNew}
        onVisibleChange={handleDefaultPopoverVisibleChange}
        editor={editor}
        updateFormula={updateFormula}
        variable={variable}
        updateVariable={setVariable}>
        {variable ? (
          renderVariable(variable)
        ) : (
          <span className="brickdoc-formula-placeholder">
            <Icon.Formula className="brickdoc-formula-placeholder-icon" />
          </span>
        )}
      </FormulaMenu>
    </BlockContainer>
  )
}
