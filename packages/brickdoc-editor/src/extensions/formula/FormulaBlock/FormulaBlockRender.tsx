/* eslint-disable no-nested-ternary */
import React from 'react'
import { Icon, Popover, Tooltip } from '@brickdoc/design-system'
import { BlockContainer, FormulaMenu } from '../../../components'
import './FormulaBlock.less'
import { VariableInterface, FormulaSourceType, VariableData } from '@brickdoc/formula'
import { FormulaRender } from '../../../components/Formula/FormulaRender'
import { useFormula } from '../../../components/Formula/useFormula'
import { FormulaResult } from '../../../components/Formula/FormulaResult'
import { FormulaEditor } from '../FormulaEditor/FormulaEditor'
import { BrickdocEventBus, FormulaEditorSaveEventTrigger } from '@brickdoc/schema'
import { AutocompleteList } from '../../../components/Formula/AutocompleteList/AutocompleteList'

export interface FormulaBlockRenderProps {
  formulaId: string
  formulaName?: string
  formulaType: FormulaSourceType
  rootId: string
  defaultVisible?: boolean
  saveOnBlur?: boolean
  handleTurnOffVisible?: () => void
  handleDelete: (variable?: VariableData) => void
  updateFormula: (variable: VariableInterface | undefined) => void
}

export const FormulaBlockRender: React.FC<FormulaBlockRenderProps> = ({
  formulaId,
  rootId,
  formulaName,
  formulaType,
  handleTurnOffVisible,
  defaultVisible = false,
  saveOnBlur = false,
  updateFormula,
  handleDelete
}) => {
  const {
    doCalculate,
    variableT,
    isDraft,
    isDisableSave,
    name,
    doHandleSave,
    formulaIsNormal,
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

  const handleDefaultPopoverVisibleChange = (visible: boolean): void => {
    if (!visible && defaultVisible) {
      handleTurnOffVisible?.()
    }
  }

  const formulaResult = (
    <>
      <FormulaResult variableT={variableT} />
      <AutocompleteList
        blockId={rootId}
        completion={completion}
        handleSelectActiveCompletion={handleSelectActiveCompletion}
        setCompletion={setCompletion}
      />
    </>
  )

  if (formulaIsNormal) {
    const renderData =
      !variableT || isDraft ? (
        <span className="brickdoc-formula-placeholder">
          <Icon.Formula className="brickdoc-formula-placeholder-icon" />
        </span>
      ) : (
        <Tooltip title={variableT.name}>
          <FormulaRender t={variableT} formulaType={formulaType} />
        </Tooltip>
      )

    return (
      <BlockContainer inline={true}>
        <FormulaMenu
          rootId={rootId}
          formulaId={formulaId}
          doCalculate={doCalculate}
          formulaResult={formulaResult}
          editorContent={editorContent}
          defaultVisible={defaultVisible}
          onVisibleChange={handleDefaultPopoverVisibleChange}
          isDisableSave={isDisableSave}
          doHandleSave={doHandleSave}
          variableT={variableT}
          defaultName={defaultName}
          name={name}
          handleDelete={handleDelete}>
          {renderData}
        </FormulaMenu>
      </BlockContainer>
    )
  }

  const onEditorBlur = (): void => {
    if (saveOnBlur) {
      BrickdocEventBus.dispatch(FormulaEditorSaveEventTrigger({ formulaId, rootId }))
    }
  }

  const editor = (
    <FormulaEditor
      editorContent={editorContent}
      editable={true}
      onBlur={onEditorBlur}
      formulaId={formulaId}
      rootId={rootId}
    />
  )

  if (!variableT || variableT.kind === 'literal') {
    return editor
  }

  return (
    <Popover
      defaultVisible={defaultVisible}
      visible={true}
      overlayClassName="brickdoc-formula-menu-popover"
      destroyTooltipOnHide={true}
      content={formulaResult}
      placement="bottom"
      trigger={['click']}>
      {editor}
    </Popover>
  )
}
