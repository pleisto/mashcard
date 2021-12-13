/* eslint-disable no-nested-ternary */
import React from 'react'
import { NodeViewProps } from '@tiptap/core'
import { Icon } from '@brickdoc/design-system'
import { BlockWrapper, FormulaMenu } from '../../../components'
import { COLOR } from '../../../helpers/color'
import './FormulaBlock.less'
import { VariableTypeMeta, variableTypeMeta } from '@brickdoc/formula'
import { EditorDataSourceContext } from '../../../dataSource/DataSource'

export interface FormulaBlockProps extends NodeViewProps {}

export const FormulaBlock: React.FC<FormulaBlockProps> = ({ editor, node, updateAttributes, extension, getPos }) => {
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const formulaContext = editorDataSource.formulaContext

  const attributes = node.attrs.formula
  const [variable, setVariable] = React.useState(formulaContext?.findVariable(editorDataSource.rootId, attributes.id))
  const [t, setT] = React.useState(variable?.t)

  const updateFormula = (id: string): void => updateAttributes({ formula: { type: 'FORMULA', id } })

  React.useEffect(() => {
    variable?.onUpdate(t => {
      setT(t.t)
      setVariable(t)
    })
  }, [variable])

  const COLOR_ARRAY: { [key in VariableTypeMeta]: number } = {
    error_constant: 3,
    error_expression: 3,
    success_Date: 2,
    success_Error: 2,
    success_Column: 2,
    success_Block: 2,
    success_Spreadsheet: 2,
    success_number: 0,
    success_null: 0,
    success_string: 4,
    success_boolean: 5,
    success_any: 6,
    success_Object: 6,
    success_Array: 6
  }

  const activeColorIndex = t ? COLOR_ARRAY[variableTypeMeta(t)] || 0 : 0
  const activeColor = COLOR[activeColorIndex]
  const handleDefaultPopoverVisibleChange = (visible: boolean): void => {
    if (!visible && node.attrs.isNew) {
      updateAttributes({ isNew: false })
    }
  }

  return (
    <BlockWrapper as="span" editor={editor}>
      <FormulaMenu
        node={node}
        getPos={getPos}
        defaultVisible={node.attrs.isNew}
        onVisibleChange={handleDefaultPopoverVisibleChange}
        editor={editor}
        updateFormula={updateFormula}
        variable={variable}
        updateVariable={setVariable}>
        {t ? (
          <span
            className="brickdoc-formula"
            style={{
              color: activeColor.color,
              borderColor: `rgb(${activeColor.rgb.join(',')}, 0.3)`,
              background: activeColor.label === 'Default' ? 'unset' : `rgb(${activeColor.rgb.join(',')}, 0.1)`
            }}>
            {t.name}: {t.variableValue.success ? t.variableValue.display : t.variableValue.errorMessages[0].message}
          </span>
        ) : (
          <span className="brickdoc-formula-placeholder">
            <Icon.Formula className="brickdoc-formula-placeholder-icon" />
          </span>
        )}
      </FormulaMenu>
    </BlockWrapper>
  )
}
