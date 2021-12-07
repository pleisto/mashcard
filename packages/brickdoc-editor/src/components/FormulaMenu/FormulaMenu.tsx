import React from 'react'
import { Button, Input, Modal, Popover } from '@brickdoc/design-system'
import { CodeFragment, Completion, VariableInterface } from '@brickdoc/formula'
import { useEditorI18n } from '../../hooks'
import './FormulaMenu.less'
import { FormulaOptions } from '../../extensions'
import { Editor, JSONContent } from '@tiptap/core'
import { FormulaBlockProps } from '../../extensions/formula/FormulaBlock'
import { AutocompleteList } from './AutocompleteList/AutocompleteList'
import { FormulaEditor } from '../../extensions/formula/FormulaEditor/FormulaEditor'
import { codeFragmentsToJSONContent } from '../../helpers/formula'

export interface FormulaMenuProps {
  getPos?: () => number
  node?: FormulaBlockProps['node']
  defaultVisible?: boolean
  onVisibleChange?: (visible: boolean) => void
  editor: Editor
  variable?: VariableInterface
  updateVariable?: React.Dispatch<React.SetStateAction<VariableInterface | undefined>>
  updateFormula?: (id: string) => void
  clear?: boolean
  formulaContextActions: FormulaOptions['formulaContextActions']
}

const i18nKey = 'formula.menu'

export const FormulaMenu: React.FC<FormulaMenuProps> = ({
  getPos,
  node,
  children,
  defaultVisible,
  onVisibleChange,
  variable,
  editor,
  updateFormula,
  formulaContextActions,
  updateVariable,
  clear
}) => {
  // TODO very dirty hack, remove this
  const rootId = (editor.view as any)?.docView?.node?.attrs?.uuid

  const { t } = useEditorI18n()
  const formulaContext = formulaContextActions.getFormulaContext()

  const contextDefaultName = formulaContext ? formulaContext.getDefaultVariableName(rootId, 'any') : ''
  const contextCompletions = formulaContext ? formulaContext.completions(rootId) : []
  const formulaValue = variable?.t.codeFragments
    ? `=${variable.t.codeFragments.map(fragment => fragment.name).join('')}`
    : variable?.t.definition
  const definition = formulaValue?.substr(1)

  const codeFragments = variable?.t.codeFragments
  const defaultContent = codeFragmentsToJSONContent(codeFragments)

  const [completions, setCompletions] = React.useState(contextCompletions)

  const [name, setName] = React.useState(variable?.t.name)
  const [defaultName, setDefaultName] = React.useState(contextDefaultName)
  const [input, setInput] = React.useState(definition)

  const [error, setError] = React.useState<{ type: string; message: string }>()
  const [visible, setVisible] = React.useState(defaultVisible)
  const [content, setContent] = React.useState<JSONContent | undefined>(defaultContent)

  const close = (): void => {
    if (clear) {
      setContent(defaultContent)
      setName(variable?.t.name)
      setDefaultName(contextDefaultName)
      setCompletions(contextCompletions)
      setInput(definition)
      setError(undefined)
    }
    setVisible(false)
    onVisibleChange?.(false)
  }

  const onPopoverVisibleChange = (visible: boolean): void => {
    onVisibleChange?.(visible)

    if (!visible) {
      close()
      return
    }
    setVisible(visible)
  }

  const handleSelectCompletion = (completion: Completion): void => {
    const oldContent = content?.content ?? []
    const value = completion.value
    const attrs: CodeFragment =
      completion.kind === 'function'
        ? { meta: {}, errors: [], name: value, code: 'Function', spaceBefore: false, spaceAfter: false, type: 'any' }
        : {
            meta: { name: completion.preview.name },
            errors: [],
            name: value,
            code: 'Variable',
            spaceBefore: false,
            spaceAfter: false,
            type: 'any'
          }
    const completionContents: JSONContent[] = [{ type: 'codeFragmentBlock', attrs, content: [{ type: 'text', text: value }] }]
    const newContent = [...oldContent, ...completionContents]
    const finalContent = { type: 'doc', content: newContent }
    const finalInput = contentToInput(finalContent)
    setContent(finalContent)
    setInput(finalInput)
    console.log({ completion, content, attrs, label: 'selectCompletion', newContent, finalInput })
    doCalculate({ newInput: finalInput })
  }

  const contentToInput = (content: JSONContent): string => {
    const newInput = content.content?.map((c: JSONContent) => (c.type === 'text' ? c.text : c.content?.[0].text ?? '')).join('') ?? ''
    return `=${newInput}`
  }

  const handleValueChange = (editor: Editor): void => {
    const text = contentToInput(editor.getJSON().content[0])
    // const text = editor.getText()
    console.log({ content, editor, text, label: 'updateValue' })
    setInput(text)
    doCalculate({ newInput: text })
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value)
    doCalculate({ newName: e.target.value })
  }

  const doCalculate = ({ newName, newInput }: { newName?: string; newInput?: string }): void => {
    const finalName = newName ?? name ?? defaultName
    const finalInput = newInput ?? input ?? ''
    console.log({ finalName, newName, newInput, input, finalInput })

    if (!formulaContext || !finalInput) return

    formulaContextActions.calculate({
      variable,
      name: finalName,
      input: finalInput,
      codeFragmentsToJSONContent,
      formulaContext,
      updateVariable,
      updateError: setError,
      updateInput: setInput,
      updateContent: setContent,
      updateCompletions: setCompletions,
      updateDefaultName: setDefaultName
    })
  }

  const handleSave = async (): Promise<void> => {
    if (!(name ?? defaultName) || !input || !variable) return
    if (!formulaContext) return

    if (updateFormula) {
      updateFormula(variable.t.variableId)
    } else {
      editor.chain().setFormula(variable.t.variableId).focus().run()
    }
    const finalName = name ?? defaultName
    variable.t.name = finalName
    await formulaContext.commitVariable({ variable })
    setName(finalName)
    updateVariable?.(variable)

    close()
  }

  const handleCancel = (): void => {
    close()
  }

  const handleDelete = (): void => {
    Modal.confirm({
      title: t(`${i18nKey}.delete_confirm.title`),
      okText: t(`${i18nKey}.delete_confirm.ok`),
      okButtonProps: {
        danger: true
      },
      cancelText: t(`${i18nKey}.delete_confirm.cancel`),
      icon: null,
      onOk: async () => {
        if (!variable || !getPos || !node) return
        const position = getPos()
        void (await formulaContextActions.removeVariable(variable.t.variableId))
        editor.commands.deleteRange({ from: position, to: position + node.nodeSize })
      }
    })
  }

  const menu = (
    <div className="brickdoc-formula-menu">
      <div className="formula-menu-header">{t(`${i18nKey}.header`)}</div>
      <div className="formula-menu-row">
        <div className="formula-menu-item">
          <label className="formula-menu-label">
            <span className="formula-menu-label-text">{t(`${i18nKey}.name`)}</span>
            <Input className="formula-menu-field" placeholder={defaultName} value={name} onChange={handleNameChange} />
          </label>
        </div>
      </div>
      <div className="formula-menu-row">
        <div className="formula-menu-item">
          <FormulaEditor content={content} updateContent={handleValueChange} editable={true} />
          {/* <Input className="formula-menu-field" value={value} onChange={handleValueChange} /> */}
        </div>
      </div>
      <div className="formula-menu-divider" />
      <div className="formula-menu-result">
        <span className="formula-menu-result-label">=</span>
        {error && (
          <span className="formula-menu-result-error">
            <span className="formula-menu-result-error-type">{error.type}</span>
            <span className="formula-menu-result-error-message">{error.message}</span>
          </span>
        )}
        {!error && variable?.t.variableValue.display}
      </div>
      <div className="formula-menu-divider" />
      <AutocompleteList completions={completions} onSelect={handleSelectCompletion} />
      <div className="formula-menu-footer">
        <Button className="formula-menu-button" size="small" type="text" onClick={handleCancel}>
          {t(`${i18nKey}.cancel`)}
        </Button>
        <Button className="formula-menu-button" size="small" type="primary" onClick={handleSave}>
          {t(`${i18nKey}.save`)}
        </Button>
        {node && (
          <Button className="formula-menu-button" size="small" type="text" danger={true} onClick={handleDelete}>
            {t(`${i18nKey}.delete`)}
          </Button>
        )}
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
