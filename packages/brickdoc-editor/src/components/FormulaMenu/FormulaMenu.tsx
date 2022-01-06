import React from 'react'
import { Button, Input, Popover } from '@brickdoc/design-system'
import {
  buildVariable,
  CodeFragment,
  Completion,
  ContextInterface,
  displayValue,
  ErrorMessage,
  interpret,
  InterpretResult,
  parse,
  ParseResult,
  VariableInterface,
  View
} from '@brickdoc/formula'
import { v4 as uuid } from 'uuid'
import { useEditorI18n } from '../../hooks'
import './FormulaMenu.less'
import { JSONContent } from '@tiptap/core'
import { AutocompleteList } from './AutocompleteList/AutocompleteList'
import { FormulaEditor } from '../../extensions/formula/FormulaEditor/FormulaEditor'
import {
  attrsToJSONContent,
  buildJSONContentByArray,
  buildJSONContentByDefinition,
  codeFragmentsToJSONContentTotal,
  codeFragmentToJSONContentArray,
  contentArrayToInput,
  fetchJSONContentArray
} from '../../helpers/formula'
import { EditorDataSourceContext } from '../../dataSource/DataSource'
import { useKeydownHandler } from './useKeyDownHandler'

export interface FormulaMenuProps {
  defaultVisible: boolean
  onVisibleChange: (visible: boolean) => void
  variable?: VariableInterface
  updateVariable: React.Dispatch<React.SetStateAction<VariableInterface | undefined>>
  updateFormula: (id: string) => void
  handleDelete: () => void
}

const i18nKey = 'formula.menu'

const calculate = async ({
  namespaceId,
  variable,
  name,
  input,
  position,
  activeCompletion,
  formulaContext
}: {
  namespaceId: string
  variable: VariableInterface | undefined
  activeCompletion: Completion | undefined
  name: string
  input: string
  position: number
  formulaContext: ContextInterface
}): Promise<{
  completions: Completion[]
  newVariable: VariableInterface
  errors: ErrorMessage[]
  newPosition: number
  parseResult: ParseResult
  interpretResult: InterpretResult
}> => {
  const variableId = variable ? variable.t.variableId : uuid()
  const meta = { namespaceId, variableId, name, input }
  const view: View = {}
  const ctx = {
    formulaContext,
    meta,
    interpretContext: { ctx: {}, arguments: [] }
  }
  const parseResult = parse({ ctx, activeCompletion, position })

  console.log({
    parseResult,
    input,
    position,
    newPosition: parseResult.position,
    lastChar: input[position - 1],
    nextChar: input[position],
    newInput: parseResult.input,
    codeFragments: parseResult.codeFragments,
    activeCompletion
  })

  const completions = parseResult.completions

  let interpretResult: InterpretResult

  if (parseResult.success) {
    interpretResult = await interpret({ cst: parseResult.cst, ctx })
  } else {
    interpretResult = {
      lazy: false,
      variableValue: {
        success: false,
        result: {
          type: 'Error',
          result: parseResult.errorMessages[0].message,
          errorKind: parseResult.errorMessages[0].type
        },
        cacheValue: {
          type: 'Error',
          result: parseResult.errorMessages[0].message,
          errorKind: parseResult.errorMessages[0].type
        },
        updatedAt: new Date()
      }
    }
  }

  const newVariable = buildVariable({ formulaContext, meta, parseResult, interpretResult, view })

  return {
    newPosition: parseResult.position,
    completions,
    newVariable,
    errors: parseResult.errorMessages,
    parseResult,
    interpretResult
  }
}
export type CodeFragmentWithBlockId = CodeFragment & { blockId: string }

export const FormulaMenu: React.FC<FormulaMenuProps> = ({
  children,
  defaultVisible,
  onVisibleChange,
  variable,
  updateFormula,
  updateVariable,
  handleDelete
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
  const definition = formulaValue?.substring(1) ?? ''

  const codeFragments = variable?.t.codeFragments
  const defaultContent = variable?.t.valid
    ? codeFragmentsToJSONContentTotal(codeFragments, rootId)
    : buildJSONContentByDefinition(definition)

  const [completions, setCompletions] = React.useState(contextCompletions)

  const [name, setName] = React.useState(variable?.t.name)
  const [defaultName, setDefaultName] = React.useState(contextDefaultName)
  const [input, setInput] = React.useState(formulaValue)

  const [error, setError] = React.useState<ErrorMessage | undefined>()
  const [visible, setVisible] = React.useState(defaultVisible)
  const [content, setContent] = React.useState<JSONContent | undefined>(defaultContent)
  const [activeCompletion, setActiveCompletion] = React.useState<Completion | undefined>(completions[0])
  const [activeCompletionIndex, setActiveCompletionIndex] = React.useState<number>(0)

  const [position, setPosition] = React.useState(0)

  const latestPosition = React.useRef(position)
  React.useEffect(() => {
    latestPosition.current = position
  }, [position])

  const latestSetPosition = React.useRef(setPosition)
  React.useEffect(() => {
    latestSetPosition.current = setPosition
  }, [setPosition])

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
    // setContent(defaultContent)
    // setName(variable?.t.name)
    // setDefaultName(contextDefaultName)
    // setCompletions(contextCompletions)
    // setInput(formulaValue)
    // setActiveCompletion(completions[0])
    // setActiveCompletionIndex(0)
    // setError(undefined)

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

    let oldContent = fetchJSONContentArray(currentContent)
    let positionChange: number = currentCompletion.codeFragment.name.length
    const oldContentLast = oldContent[oldContent.length - 1]
    const text = contentArrayToInput(oldContent)

    // console.log('Before replace', { oldContentLast, text, currentContent, currentCompletion })
    if (oldContentLast && currentCompletion.replacements.length) {
      // console.log('start replace', { oldContentLast, currentCompletion, currentContent, text })
      if (!text) {
        oldContent = []
        // console.log('remove last one...', oldContent)
      } else if (currentCompletion.replacements.includes(text)) {
        positionChange -= text.length
        oldContent = []
      } else {
        const replacement = currentCompletion.replacements.find(replacement => text.endsWith(replacement))
        if (!replacement) {
          console.info('replacement not found 1', { text, currentCompletion })
        } else {
          positionChange = positionChange - text.length + (replacement.length as number)
          const newText = text.substring(0, text.length - replacement.length)
          oldContent = [attrsToJSONContent({ display: newText, value: newText, code: 'ANY', type: 'any', error: '' })]
        }
        // console.log('replace..', newText, oldContent)
      }
    }

    const completionContents: JSONContent[] = codeFragmentToJSONContentArray(currentCompletion.codeFragment, rootId)
    const newContent = [...oldContent, ...completionContents]
    const finalContent = buildJSONContentByArray(newContent)
    const finalInput = `=${contentArrayToInput(fetchJSONContentArray(finalContent))}`
    setContent(finalContent)
    setPosition(position + positionChange)
    setInput(finalInput)
    console.log({ currentCompletion, content, label: 'selectCompletion', newContent, finalInput })
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

  const handleValueChange = (text: string): void => {
    setInput(text)
    // setContent(editor.getJSON() as JSONContent)
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
    const finalInput = newInput ?? input ?? ''
    const inputIsEmpty = finalInput.trim() === '='

    const result = await calculate({
      namespaceId: rootId,
      activeCompletion: latestActiveCompletion.current,
      variable,
      position: latestPosition.current,
      name: finalName,
      input: finalInput,
      formulaContext
    })

    if (!result) return

    const { interpretResult, newPosition, parseResult, completions, newVariable, errors } = result

    // console.log('calculate result', {
    //   finalName,
    //   newName,
    //   newInput,
    //   input,
    //   finalInput,
    //   activeCompletion,
    //   latestPosition: latestPosition.current,
    //   position,
    //   newPosition,
    //   result,
    //   latestActiveCompletion: latestActiveCompletion.current
    // })

    if (parseResult.valid) {
      setContent(codeFragmentsToJSONContentTotal(parseResult.codeFragments, rootId))
      setInput(`=${parseResult.codeFragments.map(fragment => fragment.name).join('')}`)
      // } else if (parseResult.input !== input && parseResult.input !== '=') {
      //   const content = buildJSONContentByDefinition(parseResult.input.substring(1))
      //   console.log('ReplaceInput', { content, newInput: parseResult.input, input, parseResult })
      //   setContent(content)
      //   setInput(parseResult.input)
    }

    setCompletions(completions)
    setActiveCompletion(completions[0])
    setPosition(newPosition)

    if (inputIsEmpty) {
      updateVariable(undefined)
      setError(undefined)
    } else {
      updateVariable(newVariable)
      setError(errors.length ? errors[0] : undefined)
    }

    if (interpretResult.variableValue.success) {
      const type = interpretResult.variableValue.result.type
      setDefaultName(formulaContext.getDefaultVariableName(rootId, type))
    }
  }

  const isDisableSave = (): boolean => {
    if (!(name ?? defaultName) || !input || !variable) return true
    if (!formulaContext) return true

    return false
  }

  const handleSave = async (): Promise<void> => {
    if (isDisableSave()) return
    const finalName = name ?? defaultName

    variable!.t.name = finalName
    variable!.t.definition = input!
    updateFormula(variable!.t.variableId)

    await formulaContext!.commitVariable({ variable: variable! })
    setName(finalName)
    updateVariable(variable)

    console.log({ label: 'save ...', input, variable, updateVariable, formulaContext })
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
            <Input className="formula-menu-field" placeholder={defaultName} value={name} onChange={handleNameChange} />
          </label>
        </div>
      </div>
      <div className="formula-menu-row">
        <div className="formula-menu-item">
          <FormulaEditor
            content={content}
            keyDownHandler={keyDownHandler}
            position={latestPosition}
            updatePosition={latestSetPosition}
            updateContent={handleValueChange}
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
        {!error && variable && displayValue(variable.t.variableValue.result)}
      </div>
      <div className="formula-menu-divider" />
      <AutocompleteList
        blockId={rootId}
        completions={completions}
        handleSelectActiveCompletion={handleSelectActiveCompletion}
        setActiveCompletion={setActiveCompletion}
        activeCompletionIndex={activeCompletionIndex}
        setActiveCompletionIndex={setActiveCompletionIndex}
        activeCompletion={activeCompletion}
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
          disabled={isDisableSave()}
        >
          {t(`${i18nKey}.save`)}
        </Button>
        <Button className="formula-menu-button" size="small" type="text" danger={true} onClick={handleDelete}>
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
      trigger={['click']}
    >
      {children}
    </Popover>
  )
}
