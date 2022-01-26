import React from 'react'
import { Button, DeprecatedInput, Popover } from '@brickdoc/design-system'
import { VariableData } from '@brickdoc/formula'
import { useEditorI18n } from '../../hooks'
import './FormulaMenu.less'
import { EditorContentType, FormulaEditor } from '../../extensions/formula/FormulaEditor/FormulaEditor'
import { FormulaResult } from './FormulaResult'
import { AutocompleteList } from './AutocompleteList/AutocompleteList'
import { CompletionType } from './useFormula'

export interface FormulaMenuProps {
  formulaId: string
  rootId: string
  defaultVisible: boolean
  onVisibleChange: (visible: boolean) => void
  variableT?: VariableData
  handleDelete: (variable?: VariableData) => void
  doCalculate: (newName?: string) => Promise<void>
  name: string | undefined
  defaultName: string
  editorContent: EditorContentType
  isDisableSave: () => boolean
  doHandleSave: () => Promise<void>
  handleSelectActiveCompletion: () => void
  completion: CompletionType
  setCompletion: React.Dispatch<React.SetStateAction<CompletionType>>
}

const i18nKey = 'formula.menu'

export const FormulaMenu: React.FC<FormulaMenuProps> = ({
  children,
  formulaId,
  rootId,
  doCalculate,
  handleDelete,
  editorContent,
  defaultVisible,
  onVisibleChange,
  isDisableSave,
  doHandleSave,
  variableT,
  defaultName,
  name,
  handleSelectActiveCompletion,
  completion,
  setCompletion
}) => {
  const { t } = useEditorI18n()
  const [visible, setVisible] = React.useState(defaultVisible)

  const close = (): void => {
    setVisible(false)
    onVisibleChange?.(false)
  }

  const onPopoverVisibleChange = (visible: boolean): void => {
    if (!visible) {
      close()
      return
    }
    onVisibleChange?.(visible)
    setVisible(visible)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // setName(e.target.value)
    void doCalculate(e.target.value)
  }

  const handleSave = async (): Promise<void> => {
    if (isDisableSave()) return
    await doHandleSave()
    close()
  }

  const handleCancel = (): void => {
    close()
  }

  const menu = (
    <div className="brickdoc-formula-menu">
      <div className="formula-menu-header">{t(`${i18nKey}.header`)}</div>
      <div className="formula-menu-row">
        <div className="formula-menu-item">
          <label className="formula-menu-label">
            <span className="formula-menu-label-text">{t(`${i18nKey}.name`)}</span>
            <DeprecatedInput
              className="formula-menu-field"
              placeholder={defaultName}
              value={name}
              onChange={handleNameChange}
            />
          </label>
        </div>
      </div>
      <div className="formula-menu-row">
        <span className="formula-menu-result-label">=</span>
        <div className="formula-menu-item">
          <FormulaEditor editorContent={editorContent} editable={true} formulaId={formulaId} rootId={rootId} />
        </div>
      </div>
      <div className="formula-menu-divider" />
      <FormulaResult variableT={variableT} />
      <AutocompleteList
        blockId={rootId}
        completion={completion}
        handleSelectActiveCompletion={handleSelectActiveCompletion}
        setCompletion={setCompletion}
      />
      <div className="formula-menu-footer">
        <Button className="formula-menu-button" size="small" type="text" onClick={handleCancel}>
          {t(`${i18nKey}.cancel`)}
        </Button>
        <Button
          className="formula-menu-button"
          size="small"
          type="primary"
          onClick={handleSave}
          disabled={isDisableSave()}>
          {t(`${i18nKey}.save`)}
        </Button>
        <Button
          className="formula-menu-button"
          size="small"
          type="text"
          danger={true}
          onClick={() => handleDelete(variableT!)}>
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
      overlayClassName="brickdoc-formula-menu-popover"
      destroyTooltipOnHide={true}
      content={menu}
      placement="bottom"
      trigger={['click']}>
      {children}
    </Popover>
  )
}
