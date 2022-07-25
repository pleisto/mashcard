/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { Input, PopoverN, Icon } from '@mashcard/design-system'
import { VariableData } from '@mashcard/formula'
import { FormulaEditor } from '../../../editors/formulaEditor'
import { FormulaResult, AutocompleteList } from '../../ui/Formula'
import { CompletionType, UseFormulaInput, UseFormulaOutput } from './useFormula'
import {
  MashcardEventBus,
  FormulaCalculateTrigger,
  FormulaEditorCloseTrigger,
  FormulaKeyboardEventTrigger
} from '@mashcard/schema'
import * as Root from '../../ui/Formula/Formula.style'
import { TEST_ID_ENUM } from '@mashcard/test-helper'
import { useFormulaMenuStore } from './useFormulaMenuState'

export interface FormulaMenuProps {
  meta: UseFormulaInput['meta']
  temporaryVariableT: UseFormulaOutput['temporaryVariableT']
  nameRef: UseFormulaOutput['nameRef']
  formulaEditor: UseFormulaOutput['formulaEditor']
  references: UseFormulaOutput['references']
  formulaFormat: UseFormulaOutput['formulaFormat']
  maxScreenState: UseFormulaOutput['maxScreenState']
  defaultVisible: boolean
  visibleState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  onVisibleChange: (visible: boolean) => void
  handleDelete: (variable?: VariableData) => void
  isDisableSave: () => boolean
  onSaveFormula: UseFormulaOutput['onSaveFormula']
  completion: CompletionType
  children?: JSX.Element
}

export const FormulaMenu: React.FC<FormulaMenuProps> = ({
  children,
  meta,
  temporaryVariableT,
  references,
  formulaEditor,
  defaultVisible,
  onVisibleChange,
  visibleState: [visible, setVisible],
  maxScreenState: [maxScreen, setMaxScreen],
  isDisableSave,
  onSaveFormula,
  formulaFormat,
  nameRef,
  completion
}) => {
  const { namespaceId: rootId, variableId: formulaId } = meta
  const [tryOpenMenu, tryCloseMenu] = useFormulaMenuStore(state => [state.tryOpenMenu, state.tryCloseMenu])

  const close = React.useCallback((): void => {
    setVisible(false)
    setMaxScreen(false)
    onVisibleChange?.(false)
    tryCloseMenu(formulaId)
  }, [tryCloseMenu, formulaId, onVisibleChange, setMaxScreen, setVisible])

  const triggerCalculate = async (): Promise<void> => {
    const result = MashcardEventBus.dispatch(FormulaCalculateTrigger({ skipExecute: true, formulaId, rootId }))
    await Promise.all(result)
  }

  React.useEffect(() => {
    const listener = MashcardEventBus.subscribe(
      FormulaEditorCloseTrigger,
      e => {
        close()
      },
      { eventId: `${rootId},${formulaId}`, subscribeId: `FormulaMenu#${rootId},${formulaId}` }
    )
    return () => listener.unsubscribe()
  }, [close, formulaId, rootId])

  const onPopoverVisibleChange = async (value: boolean): Promise<void> => {
    if (!value) {
      await handleSave()
      return
    }
    const success = tryOpenMenu(formulaId)
    if (!success) return
    await triggerCalculate()
    formulaEditor?.commands.focus()
    onVisibleChange?.(true)
    setVisible(true)
  }

  const onClickToggleMaxScreen = (): void => {
    setMaxScreen(!maxScreen)
    formulaEditor?.commands.focus()
  }

  const onClickAutoFormat = async (): Promise<void> => {
    await formulaFormat()
    formulaEditor?.commands.focus()
  }

  const handleSave = async (): Promise<void> => {
    if (isDisableSave()) return
    await onSaveFormula()
  }

  const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const name = e.target.value
    nameRef.current.name = name
    await triggerCalculate()
  }

  const handleNameKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (e.key === 'Enter') {
      const result = MashcardEventBus.dispatch(
        FormulaKeyboardEventTrigger({
          event: { ...e, key: e.key },
          formulaId,
          rootId,
          type: 'name',
          completionIndex: -1
        })
      )
      await Promise.all(result)
    }
  }

  const namePlaceholder =
    ['=', undefined].includes(temporaryVariableT?.variableParseResult.definition.trim()) || !nameRef.current.defaultName
      ? 'Add Name'
      : nameRef.current.defaultName

  const referencedCount = references.length

  const menu = (
    <Root.MashcardFormulaMenu data-testid={TEST_ID_ENUM.editor.formulaBlock.menu.id}>
      <div className="formula-menu-row">
        <div className="formula-menu-item">
          <div className="formula-menu-item-name">
            <Input
              size="lg"
              borderType="underline"
              className="formula-menu-item-name-field"
              onKeyDown={handleNameKeyDown}
              placeholder={namePlaceholder}
              value={nameRef.current.name}
              onChange={handleNameChange}
            />
            {maxScreen ? (
              <>
                <span className="formula-menu-item-auto-format-icon" onClick={onClickAutoFormat}>
                  <Icon.AutoFormat />
                </span>
              </>
            ) : (
              <>
                <span className="formula-menu-item-reference-count">{referencedCount}</span>
                <span className="formula-menu-item-reference-icon">
                  <Icon.Referenced />
                </span>
              </>
            )}
            <span className="formula-menu-item-screen-icon" onClick={onClickToggleMaxScreen}>
              {maxScreen ? <Icon.ScreenOff /> : <Icon.ScreenFull />}
            </span>
          </div>
        </div>
      </div>
      <div className="formula-menu-row">
        <div className="formula-menu-item">
          <FormulaEditor formulaEditor={formulaEditor} maxScreen={maxScreen} />
        </div>
      </div>
      <FormulaResult variableT={temporaryVariableT} meta={meta} />
      <AutocompleteList rootId={rootId} formulaId={formulaId} completion={completion} />
    </Root.MashcardFormulaMenu>
  )

  return (
    <PopoverN
      onVisibleChange={onPopoverVisibleChange}
      defaultVisible={defaultVisible}
      visible={visible}
      className={Root.MashcardFormulaMenuPopover}
      overlayInnerStyle={{ padding: '8px 16px' }}
      destroyTooltipOnHide
      render={() => menu}
      placement="bottom-start"
      offset={10}
    >
      {children ?? <div />}
    </PopoverN>
  )
}
