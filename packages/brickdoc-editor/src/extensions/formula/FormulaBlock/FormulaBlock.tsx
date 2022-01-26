/* eslint-disable no-nested-ternary */
import React from 'react'
import { NodeViewProps } from '@tiptap/core'
import { Icon, DeprecatedModal } from '@brickdoc/design-system'
import { VariableData, VariableInterface } from '@brickdoc/formula'
import { useEditorI18n } from '../../../hooks'
import { EditorDataSourceContext } from '../../../dataSource/DataSource'
import { useFormula } from '../../../components/Formula/useFormula'
import { BlockContainer, FormulaMenu } from '../../../components'
import { FormulaRender } from '../../../components/Formula/FormulaRender'

export interface FormulaBlockProps extends NodeViewProps {}

const i18nKey = 'formula.menu'

export const FormulaBlock: React.FC<FormulaBlockProps> = ({ editor, node, updateAttributes, extension, getPos }) => {
  const { t } = useEditorI18n()
  const defaultVisible = node.attrs.isNew
  const formulaId = node.attrs.uuid
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const rootId = editorDataSource.rootId
  const formulaContext = editorDataSource.formulaContext

  const updateFormula = React.useCallback((variable: VariableInterface | undefined): void => {}, [])

  const handleDelete = React.useCallback(
    (variableT?: VariableData): void => {
      DeprecatedModal.confirm({
        zIndex: 1070,
        title: t(`${i18nKey}.delete_confirm.title`),
        okText: t(`${i18nKey}.delete_confirm.ok`),
        okButtonProps: { danger: true },
        cancelText: t(`${i18nKey}.delete_confirm.cancel`),
        icon: null,
        onOk: async () => {
          if (!variableT || !getPos || !node || !formulaContext) return
          const position = getPos()
          void (await formulaContext?.removeVariable(variableT.namespaceId, variableT.variableId))
          editor.commands.deleteRange({ from: position, to: position + node.nodeSize })
        }
      })
    },
    [editor.commands, formulaContext, getPos, node, t]
  )

  const handleTurnOffVisible = React.useCallback(() => updateAttributes({ isNew: false }), [updateAttributes])
  const formulaType = 'normal'
  const formulaName = undefined

  const {
    doCalculate,
    variableT,
    savedVariableT,
    isDraft,
    isDisableSave,
    name,
    doHandleSave,
    defaultName,
    editorContent,
    handleSelectActiveCompletion,
    completion,
    setCompletion
  } = useFormula({
    rootId,
    formulaId,
    updateFormula,
    formulaType,
    formulaName
  })

  const handleDefaultPopoverVisibleChange = React.useCallback(
    (visible: boolean): void => {
      if (!visible && defaultVisible) {
        handleTurnOffVisible?.()
      }
    },
    [defaultVisible, handleTurnOffVisible]
  )

  const renderData =
    !savedVariableT || isDraft ? (
      <span className="brickdoc-formula-placeholder">
        <Icon.Formula className="brickdoc-formula-placeholder-icon" />
      </span>
    ) : (
      <FormulaRender t={savedVariableT} formulaType={formulaType} />
    )

  return (
    <BlockContainer inline={true}>
      <FormulaMenu
        rootId={rootId}
        formulaId={formulaId}
        doCalculate={doCalculate}
        editorContent={editorContent}
        defaultVisible={defaultVisible}
        onVisibleChange={handleDefaultPopoverVisibleChange}
        isDisableSave={isDisableSave}
        doHandleSave={doHandleSave}
        variableT={variableT}
        defaultName={defaultName}
        name={name}
        completion={completion}
        handleSelectActiveCompletion={handleSelectActiveCompletion}
        setCompletion={setCompletion}
        handleDelete={handleDelete}>
        {renderData}
      </FormulaMenu>
    </BlockContainer>
  )
}
