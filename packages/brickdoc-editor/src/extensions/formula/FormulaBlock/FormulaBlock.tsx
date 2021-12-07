/* eslint-disable no-nested-ternary */
import React from 'react'
import { NodeViewProps } from '@tiptap/core'
import { Icon } from '@brickdoc/design-system'
import { BlockWrapper } from '../../BlockWrapper'
import { FormulaMenu } from '../../../components'
import { COLOR } from '../../../helpers/color'
import './FormulaBlock.less'
import { FormulaOptions } from '..'
import { VariableTypeMeta, variableTypeMeta } from '@brickdoc/formula'

export interface FormulaBlockProps extends NodeViewProps {}

export const FormulaBlock: React.FC<FormulaBlockProps> = ({ editor, node, updateAttributes, extension, getPos }) => {
  const { getVariable }: FormulaOptions['formulaContextActions'] = extension.options.formulaContextActions
  const attributes = node.attrs.formula
  const [variable, setVariable] = React.useState(getVariable(attributes.id))
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
    success_constant_Date: 2,
    success_constant_Column: 2,
    success_constant_Block: 2,
    success_constant_number: 0,
    success_constant_string: 4,
    success_constant_boolean: 5,
    success_constant_any: 6,
    success_constant_object: 6,
    success_constant_array: 6,
    success_expression_Date: 2,
    success_expression_Block: 2,
    success_expression_Column: 2,
    success_expression_number: 8,
    success_expression_string: 9,
    success_expression_boolean: 7,
    success_expression_any: 6,
    success_expression_object: 6,
    success_expression_array: 6
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
        formulaContextActions={extension.options.formulaContextActions}
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
