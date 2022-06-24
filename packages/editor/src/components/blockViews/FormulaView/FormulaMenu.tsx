import React from 'react'
import { Input, Popover } from '@mashcard/design-system'
import { VariableData } from '@mashcard/formula'
import { FormulaEditor } from '../../../editors/formulaEditor'
import { FormulaResult, AutocompleteList } from '../../ui/Formula'
import { CompletionType, UseFormulaInput, UseFormulaOutput } from './useFormula'
import { MashcardEventBus, FormulaCalculateTrigger, FormulaEditorSavedTrigger } from '@mashcard/schema'
import * as Root from '../../ui/Formula/Formula.style'
import { TEST_ID_ENUM } from '@mashcard/test-helper'

export interface FormulaMenuProps {
  meta: UseFormulaInput['meta']
  temporaryVariableT: UseFormulaOutput['temporaryVariableT']
  nameRef: UseFormulaOutput['nameRef']
  formulaEditor: UseFormulaOutput['formulaEditor']
  defaultVisible: boolean
  onVisibleChange: (visible: boolean) => void
  handleDelete: (variable?: VariableData) => void
  isDisableSave: () => boolean
  onSaveFormula: UseFormulaOutput['onSaveFormula']
  completion: CompletionType
  children?: React.ReactNode
}

export const FormulaMenu: React.FC<FormulaMenuProps> = ({
  children,
  meta: { namespaceId: rootId, variableId: formulaId },
  temporaryVariableT,
  handleDelete,
  formulaEditor,
  defaultVisible,
  onVisibleChange,
  isDisableSave,
  onSaveFormula,
  nameRef,
  completion
}) => {
  const [visible, setVisible] = React.useState(defaultVisible)

  const close = React.useCallback((): void => {
    setVisible(false)
    onVisibleChange?.(false)
  }, [onVisibleChange])

  const triggerCalculate = async (): Promise<void> => {
    const result = MashcardEventBus.dispatch(
      FormulaCalculateTrigger({
        skipExecute: true,
        formulaId,
        rootId
      })
    )
    await Promise.all(result)
  }

  React.useEffect(() => {
    const listener = MashcardEventBus.subscribe(
      FormulaEditorSavedTrigger,
      e => {
        close()
      },
      {
        eventId: `${rootId},${formulaId}`,
        subscribeId: `FormulaMenu#${rootId},${formulaId}`
      }
    )
    return () => listener.unsubscribe()
  }, [close, formulaId, rootId])

  const onPopoverVisibleChange = async (visible: boolean): Promise<void> => {
    if (!visible) {
      close()
      return
    }
    await triggerCalculate()
    onVisibleChange?.(visible)
    setVisible(visible)
  }

  const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const name = e.target.value
    nameRef.current.name = name
    // setInputName(name)
    await triggerCalculate()
  }

  const namePlaceholder =
    ['=', undefined].includes(temporaryVariableT?.variableParseResult.definition.trim()) || !nameRef.current.defaultName
      ? 'Add Name'
      : nameRef.current.defaultName

  const menu = (
    <Root.MashcardFormulaMenu data-testid={TEST_ID_ENUM.editor.formulaBlock.menu.id}>
      {/* <div className="formula-menu-header">{t(`${i18nKey}.header`)}</div> */}
      <div className="formula-menu-row">
        <div className="formula-menu-item">
          <label className="formula-menu-label">
            {/* <span className="formula-menu-label-text">{t(`${i18nKey}.name`)}</span> */}
            <Input
              size="lg"
              borderType="underline"
              className="formula-menu-field"
              placeholder={namePlaceholder}
              value={nameRef.current.name}
              onChange={handleNameChange}
            />
          </label>
        </div>
      </div>
      <div className="formula-menu-row">
        {/* <span className="formula-menu-result-label">=</span> */}
        <div className="formula-menu-item">
          <FormulaEditor formulaEditor={formulaEditor} />
        </div>
      </div>
      <Root.FormulaDivider />
      <FormulaResult variableT={temporaryVariableT} pageId={rootId} />
      <AutocompleteList rootId={rootId} formulaId={formulaId} completion={completion} />
    </Root.MashcardFormulaMenu>
  )

  return (
    <Popover
      onVisibleChange={onPopoverVisibleChange}
      defaultVisible={defaultVisible}
      visible={visible}
      className={Root.MashcardFormulaMenuPopover}
      destroyTooltipOnHide={true}
      content={menu}
      placement="bottomStart"
      trigger={['click']}>
      {children}
    </Popover>
  )
}
