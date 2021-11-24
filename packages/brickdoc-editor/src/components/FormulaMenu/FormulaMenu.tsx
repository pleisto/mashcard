import React from 'react'
import { Button, Input, Popover } from '@brickdoc/design-system'
import { VariableInterface, VariableData } from '@brickdoc/formula'
import { useEditorI18n } from '../../hooks'
import './FormulaMenu.less'
import { FormulaOptions } from '../../extensions'
import { Editor } from '@tiptap/core'

export interface FormulaMenuProps {
  variableId?: string
  editor: Editor
  updateVariableT?: (t: VariableData) => void
  updateFormula?: (id: string) => void
  formulaName?: string
  formulaValue?: string
  formulaResult?: any
  clear?: boolean
  formulaContextActions: FormulaOptions['formulaContextActions']
}

const i18nKey = 'formula.menu'

export const FormulaMenu: React.FC<FormulaMenuProps> = ({
  variableId,
  children,
  editor,
  updateFormula,
  formulaName,
  formulaValue,
  formulaResult,
  formulaContextActions,
  updateVariableT,
  clear
}) => {
  const { t } = useEditorI18n()
  const [name, setName] = React.useState(formulaName)
  const [value, setValue] = React.useState(formulaValue?.substr(1))
  const [result, setResult] = React.useState<any>(formulaResult)
  const [variable, setVariable] = React.useState<VariableInterface>()
  const [error, setError] = React.useState<{ type: string; message: string }>()
  const [visible, setVisible] = React.useState(false)

  const close = (): void => {
    if (clear) {
      setName('')
      setValue('')
      setVariable(undefined)
      setError(undefined)
      setResult('')
    }
    setVisible(false)
  }

  const onPopoverVisibleChange = (visible: boolean): void => {
    if (!visible) {
      close()
      return
    }
    setVisible(visible)
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
    const formulaContext = formulaContextActions.getFormulaContext()
    if (!formulaContext || !name || !e.target.value) return
    formulaContextActions.calculate(variableId, name, e.target.value, formulaContext, setResult, setVariable, setError, setValue)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value)
    const formulaContext = formulaContextActions.getFormulaContext()
    if (!formulaContext || !name || !value) return
    formulaContextActions.calculate(variableId, e.target.value, value, formulaContext, setResult, setVariable, setError, setValue)
  }

  const handleSave = async (): Promise<void> => {
    if (!name || !value || !variable || !result) return
    const formulaContext = formulaContextActions.getFormulaContext()
    if (!formulaContext) return

    if (updateFormula) {
      updateFormula(variable.t.variableId)
    } else {
      editor.chain().setFormula(variable.t.variableId).focus().run()
    }
    await formulaContext.commitVariable({ variable })
    updateVariableT?.(variable.t)

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
            <Input className="formula-menu-field" value={name} onChange={handleNameChange} />
          </label>
        </div>
      </div>
      <div className="formula-menu-row">
        <span className="formula-menu-result-label">=</span>
        <div className="formula-menu-item">
          <Input className="formula-menu-field" value={value} onChange={handleValueChange} />
        </div>
      </div>
      <div className="formula-menu-divider" />
      <div className="formula-menu-result">
        {error && (
          <span className="formula-menu-result-error">
            <span className="formula-menu-result-error-type">{error.type}</span>
            <span className="formula-menu-result-error-message">{error.message}</span>
          </span>
        )}
        {!error && result}
      </div>
      <div className="formula-menu-footer">
        <Button className="formula-menu-button" size="small" type="text" onClick={handleCancel}>
          {t(`${i18nKey}.cancel`)}
        </Button>
        <Button className="formula-menu-button" size="small" type="primary" onClick={handleSave}>
          {t(`${i18nKey}.save`)}
        </Button>
      </div>
    </div>
  )

  return (
    <Popover
      onVisibleChange={onPopoverVisibleChange}
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
