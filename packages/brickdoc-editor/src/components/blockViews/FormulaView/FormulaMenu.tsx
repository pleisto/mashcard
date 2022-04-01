import React from 'react'
import { Button, Icon, Input, Popover } from '@brickdoc/design-system'
import { VariableData } from '@brickdoc/formula'
import { useEditorI18n } from '../../../hooks'
import '../../ui/Formula/Formula.less'
import { EditorContentType, FormulaEditor } from '../../../editors/formulaEditor'
import { FormulaResult, AutocompleteList } from '../../ui/Formula'
import { CompletionType } from './useFormula'
import { BrickdocEventBus, FormulaCalculateTrigger, FormulaEditorSavedTrigger } from '@brickdoc/schema'
import { JSONContent } from '@tiptap/core'

export interface FormulaMenuProps {
  formulaId: string
  rootId: string
  defaultVisible: boolean
  onVisibleChange: (visible: boolean) => void
  variableT?: VariableData
  handleDelete: (variable?: VariableData) => void
  nameRef: React.MutableRefObject<string | undefined>
  defaultName: string
  updateEditor: (content: JSONContent, position: number) => void
  editorContent: EditorContentType
  isDisableSave: () => boolean
  onSaveFormula: () => void
  completion: CompletionType
}

const i18nKey = 'formula.menu'

export const FormulaMenu: React.FC<FormulaMenuProps> = ({
  children,
  formulaId,
  rootId,
  handleDelete,
  editorContent,
  defaultVisible,
  onVisibleChange,
  isDisableSave,
  onSaveFormula,
  variableT,
  defaultName,
  nameRef,
  updateEditor,
  completion
}) => {
  const [t] = useEditorI18n()
  const [visible, setVisible] = React.useState(defaultVisible)
  const [inputName, setInputName] = React.useState(nameRef.current)

  const close = React.useCallback((): void => {
    setVisible(false)
    onVisibleChange?.(false)
  }, [onVisibleChange])

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
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

  const triggerCalculate = (): void => {
    BrickdocEventBus.dispatch(
      FormulaCalculateTrigger({
        skipExecute: true,
        formulaId,
        rootId
      })
    )
  }

  const onPopoverVisibleChange = (visible: boolean): void => {
    if (!visible) {
      close()
      return
    }
    triggerCalculate()
    onVisibleChange?.(visible)
    setVisible(visible)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.value
    nameRef.current = name
    setInputName(name)
    triggerCalculate()
  }

  const handleSave = (): void => {
    if (isDisableSave()) return
    onSaveFormula()
  }

  const handleCancel = (): void => {
    close()
  }

  const namePlaceholder = editorContent.input.trim() === '=' ? 'Add Name' : defaultName

  const menu = (
    <div className="brickdoc-formula-menu">
      {/* <div className="formula-menu-header">{t(`${i18nKey}.header`)}</div> */}
      <div className="formula-menu-row">
        <div className="formula-menu-item">
          <label className="formula-menu-label">
            {/* <span className="formula-menu-label-text">{t(`${i18nKey}.name`)}</span> */}
            <Input
              prefix={<Icon.Edit />}
              size="sm"
              className="formula-menu-field"
              placeholder={namePlaceholder}
              value={inputName ?? nameRef.current}
              onChange={handleNameChange}
            />
          </label>
        </div>
      </div>
      <div className="formula-menu-row">
        {/* <span className="formula-menu-result-label">=</span> */}
        <div className="formula-menu-item">
          <FormulaEditor
            editorContent={editorContent}
            updateEditor={updateEditor}
            editable={true}
            formulaId={formulaId}
            rootId={rootId}
          />
        </div>
      </div>
      <div className="formula-divider" />
      <FormulaResult variableT={variableT} pageId={rootId} />
      <AutocompleteList rootId={rootId} formulaId={formulaId} completion={completion} />
      <div className="formula-menu-footer">
        <Button className="formula-menu-button" size="sm" type="text" onClick={handleCancel}>
          {t(`${i18nKey}.cancel`)}
        </Button>
        <Button
          className="formula-menu-button"
          size="sm"
          type="primary"
          onClick={handleSave}
          disabled={isDisableSave()}
        >
          {t(`${i18nKey}.save`)}
        </Button>
        <Button
          className="formula-menu-button"
          size="sm"
          type="text"
          danger={true}
          onClick={() => handleDelete(variableT!)}
        >
          {t(`${i18nKey}.delete`)}
        </Button>
      </div>
    </div>
  )

  return (
    <Popover
      onVisibleChange={onPopoverVisibleChange}
      defaultVisible={defaultVisible}
      visible={visible}
      className="brickdoc-formula-menu-popover"
      destroyTooltipOnHide={true}
      content={menu}
      placement="bottom"
      trigger={['click']}
    >
      {children}
    </Popover>
  )
}
