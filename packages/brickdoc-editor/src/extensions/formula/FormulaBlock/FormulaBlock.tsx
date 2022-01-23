/* eslint-disable no-nested-ternary */
import React from 'react'
import { NodeViewProps } from '@tiptap/core'
import { Modal } from '@brickdoc/design-system'
import { VariableInterface } from '@brickdoc/formula'
import { useEditorI18n } from '../../../hooks'
import { FormulaBlockRender } from './FormulaBlockRender'
import { EditorDataSourceContext } from '../../../dataSource/DataSource'

export interface FormulaBlockProps extends NodeViewProps {}

const i18nKey = 'formula.menu'

export const FormulaBlock: React.FC<FormulaBlockProps> = ({ editor, node, updateAttributes, extension, getPos }) => {
  const { t } = useEditorI18n()
  const isNew = node.attrs.isNew
  const formulaId = node.attrs.uuid
  const updateFormula = (variable: VariableInterface | undefined): void => {}
  // updateAttributes({ formula: { type: 'FORMULA', id: variable.t.variableId } })
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const rootId = editorDataSource.rootId

  // console.log({ formulaId, isNew, rootId, attrs: node.attrs })

  const handleDelete = (variable: VariableInterface): void => {
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

  return (
    <FormulaBlockRender
      defaultVisible={isNew}
      handleTurnOffVisible={() => updateAttributes({ isNew: false })}
      handleDelete={handleDelete}
      rootId={rootId}
      formulaId={formulaId}
      updateFormula={updateFormula}
      formulaType="normal"
    />
  )
}
