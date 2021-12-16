import React from 'react'
import { Button, Input, Modal, Popover } from '@brickdoc/design-system'
import {
  buildVariable,
  CodeFragment,
  Completion,
  ContextInterface,
  ErrorMessage,
  interpret,
  InterpretResult,
  parse,
  ParseMode,
  ParseResult,
  VariableInterface,
  View
} from '@brickdoc/formula'
import { v4 as uuid } from 'uuid'
import { useEditorI18n } from '../../hooks'
import './FormulaMenu.less'
import { Editor, JSONContent } from '@tiptap/core'
import { FormulaBlockProps } from '../../extensions/formula/FormulaBlock'
import { AutocompleteList } from './AutocompleteList/AutocompleteList'
import { FormulaEditor } from '../../extensions/formula/FormulaEditor/FormulaEditor'
import { codeFragmentsToJSONContent } from '../../helpers/formula'
import { useKeydownHandler } from './useKeyDownHandler'
import { EditorDataSourceContext } from '../../dataSource/DataSource'

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
}

const i18nKey = 'formula.menu'

const calculate = async ({
  namespaceId,
  variable,
  name,
  input,
  activeCompletion,
  formulaContext
}: {
  namespaceId: string
  variable: VariableInterface | undefined
  activeCompletion: Completion | undefined
  name: string
  input: string
  formulaContext: ContextInterface
}): Promise<{
  completions: Completion[]
  newVariable: VariableInterface
  errors: ErrorMessage[]
  parseResult: ParseResult
  interpretResult: InterpretResult
}> => {
  const variableId = variable ? variable.t.variableId : uuid()
  const meta = { namespaceId, variableId, name, input }
  const view: View = {}
  const mode: ParseMode = 'multiline'
  const parseResult = parse({ formulaContext, meta, activeCompletion, mode })

  console.log({
    parseResult,
    input,
    newINput: parseResult.input,
    codeFragments: parseResult.codeFragments,
    activeCompletion
  })

  const completions = parseResult.completions

  let interpretResult: InterpretResult

  if (parseResult.success) {
    interpretResult = await interpret({ cst: parseResult.cst, formulaContext, meta })
  } else {
    interpretResult = {
      success: false,
      errorMessages: parseResult.errorMessages,
      variableValue: {
        success: false,
        display: parseResult.errorMessages[0].message,
        result: {
          type: 'Error',
          result: parseResult.errorMessages[0].message,
          errorKind: parseResult.errorMessages[0].type
        },
        updatedAt: new Date()
      }
    }
  }

  const newVariable = buildVariable({ formulaContext, meta, parseResult, interpretResult, view })
  const errors = [...parseResult.errorMessages, ...interpretResult.errorMessages]

  return {
    completions,
    newVariable,
    errors,
    parseResult,
    interpretResult
  }
}
export type CodeFragmentWithBlockId = CodeFragment & { blockId: string }

export const FormulaMenu: React.FC<FormulaMenuProps> = ({
  getPos,
  node,
  children,
  defaultVisible,
  onVisibleChange,
  variable,
  editor,
  updateFormula,
  updateVariable,
  clear
}) => {
  const { t } = useEditorI18n()
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const rootId = editorDataSource.rootId
  const formulaContext = editorDataSource.formulaContext

  const contextDefaultName = formulaContext ? formulaContext.getDefaultVariableName(rootId, 'any') : ''
  const contextCompletions = formulaContext ? formulaContext.completions(rootId, variable?.t.variableId) : []
  const formulaValue = variable?.t.valid
    ? `=${variable.t.codeFragments.map(fragment => fragment.name).join('')}`
    : variable?.t.definition
  const definition = formulaValue?.substring(1)

  const codeFragments = variable?.t.codeFragments
  const defaultContent = variable?.t.valid
    ? codeFragmentsToJSONContent(codeFragments, rootId)
    : { type: 'doc', content: [{ type: 'text', text: definition }] }

  const [completions, setCompletions] = React.useState(contextCompletions)

  const [name, setName] = React.useState(variable?.t.name)
  const [defaultName, setDefaultName] = React.useState(contextDefaultName)
  const [input, setInput] = React.useState(definition)

  const [error, setError] = React.useState<ErrorMessage | undefined>()
  const [visible, setVisible] = React.useState(defaultVisible)
  const [content, setContent] = React.useState<JSONContent | undefined>(defaultContent)
  const [activeCompletion, setActiveCompletion] = React.useState<Completion | undefined>(completions[0])
  const [activeCompletionIndex, setActiveCompletionIndex] = React.useState<number>(0)

  const latestActiveCompletion = React.useRef(activeCompletion)
  React.useEffect(() => {
    latestActiveCompletion.current = activeCompletion
  }, [activeCompletion])

  const latestContent = React.useRef(content)
  React.useEffect(() => {
    latestContent.current = content
  }, [content])

  const latestActiveCompletionIndex = React.useRef(activeCompletionIndex)
  React.useEffect(() => {
    latestActiveCompletionIndex.current = activeCompletionIndex
  }, [activeCompletionIndex])

  const latestCompletions = React.useRef(completions)
  React.useEffect(() => {
    latestCompletions.current = completions
  }, [completions])

  const latestSetActiveCompletion = React.useRef(setActiveCompletion)
  React.useEffect(() => {
    latestSetActiveCompletion.current = setActiveCompletion
  }, [setActiveCompletion])

  const latestSetActiveCompletionIndex = React.useRef(setActiveCompletionIndex)
  React.useEffect(() => {
    latestSetActiveCompletionIndex.current = setActiveCompletionIndex
  }, [setActiveCompletionIndex])

  const close = (): void => {
    if (clear) {
      setContent(defaultContent)
      setName(variable?.t.name)
      setDefaultName(contextDefaultName)
      setCompletions(contextCompletions)
      setInput(definition)
      setActiveCompletion(completions[0])
      setActiveCompletionIndex(0)
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

  const handleSelectActiveCompletion = (completion?: Completion, inputContent?: JSONContent): void => {
    const currentCompletion = completion ?? latestActiveCompletion.current
    const currentContent = inputContent ?? latestContent.current

    if (!currentCompletion) {
      console.error('No active completion!')
      return
    }

    let oldContent = currentContent?.content ?? []
    const oldContentLast = oldContent[oldContent.length - 1]
    // console.log('Before replace', { oldContentLast, currentCompletion })
    if (oldContentLast && oldContentLast.type === 'codeFragmentBlock' && currentCompletion.replacements.length) {
      const text = contentToInput(currentContent!)
      // console.log('start replace', { oldContentLast, currentCompletion, currentContent, text })
      if (!text || currentCompletion.replacements.includes(text)) {
        oldContent = []
        // console.log('remove last one...', oldContent)
      } else {
        const replacement = currentCompletion.replacements.find(replacement => text.endsWith(replacement))
        if (!replacement) {
          console.info('replacement not found 1', { text, currentCompletion })
        } else {
          const newText = text.substring(0, text.length - replacement.length)

          oldContent = [
            {
              type: 'codeFragmentBlock',
              attrs: { ...oldContentLast.attrs, name: newText },
              content: [{ type: 'text', text: newText }]
            }
          ]
        }
        // console.log('replace..', newText, oldContent)
      }
    }

    const value = currentCompletion.value
    let attrs: CodeFragmentWithBlockId
    switch (currentCompletion.kind) {
      case 'variable':
        attrs = {
          meta: {
            name: currentCompletion.preview.name,
            namespaceId: currentCompletion.preview.namespaceId,
            namespace: currentCompletion.preview.namespaceId
          },
          errors: [],
          name: value,
          code: 'Variable',
          spaceBefore: false,
          spaceAfter: false,
          type: 'any',
          blockId: rootId
        }
        break
      case 'function':
        attrs = {
          meta: undefined,
          errors: [],
          name: value,
          code: 'Function',
          spaceBefore: false,
          spaceAfter: false,
          type: 'any',
          blockId: rootId
        }
        break
      case 'spreadsheet':
        attrs = {
          meta: { name: currentCompletion.preview.name(), blockId: currentCompletion.preview.blockId },
          errors: [],
          name: value,
          code: 'Spreadsheet',
          spaceBefore: false,
          spaceAfter: false,
          type: 'any',
          blockId: rootId
        }
        break
      case 'column':
        attrs = {
          meta: { name: currentCompletion.preview.name, spreadsheetName: currentCompletion.preview.spreadsheetName },
          errors: [],
          name: value,
          code: 'Column',
          spaceBefore: false,
          spaceAfter: false,
          type: 'any',
          blockId: rootId
        }
        break
    }

    const completionContents: JSONContent[] = [
      { type: 'codeFragmentBlock', attrs, content: [{ type: 'text', text: value }] }
    ]
    const newContent = [...oldContent, ...completionContents]
    const finalContent = { type: 'doc', content: newContent }
    const finalInput = `=${contentToInput(finalContent)}`
    setContent(finalContent)
    setInput(finalInput)
    console.log({ currentCompletion, content, attrs, label: 'selectCompletion', newContent, finalInput })
    void doCalculate({ newInput: finalInput })
  }
  const keyDownHandler = useKeydownHandler({
    completions: latestCompletions,
    activeCompletion: latestActiveCompletion,
    content: latestContent,
    activeCompletionIndex: latestActiveCompletionIndex,
    handleSelectActiveCompletion,
    setActiveCompletion: latestSetActiveCompletion,
    setActiveCompletionIndex: latestSetActiveCompletionIndex
  })

  const contentToInput = (content: JSONContent): string => {
    return (
      content.content?.map((c: JSONContent) => (c.type === 'text' ? c.text : c.content?.[0].text ?? '')).join('') ?? ''
    )
  }

  const handleValueChange = (editor: Editor): void => {
    const text = `=${contentToInput(editor.getJSON().content[0])}`
    console.log({ content, json: editor.getJSON(), editor, text, formulaContext, label: 'updateValue' })
    setInput(text)
    setContent(editor.getJSON() as JSONContent)
    void doCalculate({ newInput: text })
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value)
    void doCalculate({ newName: e.target.value })
  }

  const doCalculate = async ({ newName, newInput }: { newName?: string; newInput?: string }): Promise<void> => {
    if (!formulaContext || !(newInput ?? input)) {
      console.log('no final input!')
      return
    }

    const finalName = newName ?? name ?? defaultName
    const finalInput = newInput ?? `=${input}`

    // console.log({
    //   finalName,
    //   newName,
    //   newInput,
    //   input,
    //   finalInput,
    //   activeCompletion,
    //   latestActiveCompletion: latestActiveCompletion.current
    // })

    const result = await calculate({
      namespaceId: rootId,
      activeCompletion: latestActiveCompletion.current,
      variable,
      name: finalName,
      input: finalInput,
      formulaContext
    })

    if (!result) return

    const { interpretResult, parseResult, completions, newVariable, errors } = result

    if (parseResult.valid) {
      setContent(codeFragmentsToJSONContent(parseResult.codeFragments, rootId))
      setInput(parseResult.codeFragments.map(fragment => fragment.name).join(''))
    } else if (parseResult.input !== input && parseResult.input !== '=') {
      const content = { type: 'doc', content: [{ type: 'text', text: parseResult.input }] }
      console.log({ content, newINput: parseResult.input, input, parseResult, label: 'ReplaceInput' })
      setContent(content)
      setInput(parseResult.input)
    }

    updateVariable?.(newVariable)
    setCompletions(completions)
    setActiveCompletion(completions[0])
    setError(errors.length ? errors[0] : undefined)

    if (interpretResult.success) {
      const type = interpretResult.variableValue.result.type
      setDefaultName(formulaContext.getDefaultVariableName(rootId, type))
    }
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

    console.log({ label: 'save ...', input, variable, updateVariable, formulaContext })
    close()
  }

  const handleCancel = (): void => {
    close()
  }

  const handleDelete = (): void => {
    Modal.confirm({
      title: t(`${i18nKey}.delete_confirm.title`),
      okText: t(`${i18nKey}.delete_confirm.ok`),
      okButtonProps: { danger: true },
      cancelText: t(`${i18nKey}.delete_confirm.cancel`),
      icon: null,
      onOk: async () => {
        if (!variable || !getPos || !node) return
        const position = getPos()
        void (await formulaContext?.removeVariable(rootId, variable.t.variableId))
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
          <FormulaEditor
            content={content}
            updateContent={handleValueChange}
            keyDownHandler={keyDownHandler}
            editable={true}
          />
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
      <AutocompleteList
        blockId={rootId}
        completions={latestCompletions}
        handleSelectActiveCompletion={handleSelectActiveCompletion}
        setActiveCompletion={latestSetActiveCompletion}
        activeCompletionIndex={latestActiveCompletionIndex}
        setActiveCompletionIndex={latestSetActiveCompletionIndex}
        activeCompletion={latestActiveCompletion}
      />
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
