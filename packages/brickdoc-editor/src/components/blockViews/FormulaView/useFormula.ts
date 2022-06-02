import {
  attrs2completion,
  CodeFragmentAttrs,
  Completion,
  ContextInterface,
  errorIsFatal,
  FormulaSourceType,
  parse,
  VariableData,
  VariableInterface,
  interpret,
  FormulaType,
  codeFragments2definition,
  VariableMetadata,
  FormulaUpdatedDraftTViaId,
  FormulaUpdatedViaId
} from '@brickdoc/formula'
import {
  BrickdocEventBus,
  FormulaEditorReplaceRootTrigger,
  FormulaEditorSaveEventTrigger,
  FormulaCalculateTrigger,
  FormulaKeyboardEventTrigger,
  FormulaEditorSavedTrigger,
  FormulaEditorHoverEventTrigger,
  FormulaEditorSelectEventTrigger
} from '@brickdoc/schema'
import { JSONContent } from '@tiptap/core'
import { devLog } from '@brickdoc/design-system'
import React from 'react'
import { EditorContentType } from '../../../editors/formulaEditor'
import {
  attrsToJSONContent,
  buildJSONContentByArray,
  buildJSONContentByDefinition,
  codeFragmentsToJSONContentTotal,
  codeFragmentsToJSONContentArray,
  contentArrayToInput,
  fetchJSONContentArray,
  maybeRemoveCodeFragmentsEqual,
  maybeRemoveDefinitionEqual,
  positionBasedContentArrayToInput
} from '../../../helpers'

export interface UseFormulaInput {
  meta: Pick<VariableMetadata, 'richType' | 'variableId' | 'namespaceId' | 'name'>
  onUpdateFormula?: (variable: VariableInterface | undefined) => void
  formulaContext: ContextInterface | undefined | null
}

export interface UseFormulaOutput {
  variableT: VariableData | undefined
  savedVariableT: VariableData | undefined
  selected: SelectedType | undefined
  nameRef: React.MutableRefObject<string>
  defaultName: string
  formulaIsNormal: boolean
  editorContent: EditorContentType
  isDisableSave: () => boolean
  updateEditor: (content: JSONContent, position: number) => void
  onSaveFormula: () => void
  commitFormula: (definition: string) => Promise<void>
  completion: CompletionType
}

const fetchEditorContent = (
  variable: VariableInterface | undefined,
  formulaIsNormal: boolean,
  newPosition: number,
  pageId: string
): EditorContentType => {
  if (!variable) {
    return { content: undefined, input: formulaIsNormal ? '=' : '', position: newPosition }
  }

  if (variable.t.valid) {
    const variableCodeFragments = variable.t.codeFragments

    const codeFragments = maybeRemoveCodeFragmentsEqual(variableCodeFragments, formulaIsNormal)
    const newContent = codeFragmentsToJSONContentTotal(codeFragments)
    const newInput = contentArrayToInput(fetchJSONContentArray(newContent), pageId)
    const newInputWithEqual = formulaIsNormal ? `=${newInput}` : newInput

    return { content: newContent, input: newInputWithEqual, position: newPosition }
  }

  const definition = variable.t.definition
  const realDefinition = maybeRemoveDefinitionEqual(definition, formulaIsNormal)
  const defaultContent = buildJSONContentByDefinition(realDefinition)

  return { content: defaultContent, input: definition, position: newPosition }
}

const replaceRoot = ({
  editorContent,
  rootId,
  formulaId
}: {
  editorContent: EditorContentType
  rootId: string
  formulaId: string
}): void => {
  // console.log('replace root', formulaId, editorContent)
  BrickdocEventBus.dispatch(
    FormulaEditorReplaceRootTrigger({
      position: editorContent.position,
      content: editorContent.content,
      input: editorContent.input,
      formulaId,
      rootId
    })
  )
}

export interface CompletionType {
  completions: Completion[]
  formulaType: FormulaSourceType
  input: string
  kind: 'Completion' | 'Preview'
  activeCompletion: Completion | undefined
  activeCompletionIndex: number
}

export interface SelectedType {
  formulaId: string
  rootId: string
}

export interface SelectType {
  selectFormulaId: string
  selectRootId: string
}

export const useFormula = ({
  meta: { richType, variableId, namespaceId, name: formulaName },
  onUpdateFormula,
  formulaContext
}: UseFormulaInput): UseFormulaOutput => {
  const formulaIsNormal = richType.type === 'normal'

  const defaultVariable = formulaContext?.findVariableById(namespaceId, variableId)

  const formulaValue = defaultVariable?.t.valid
    ? codeFragments2definition(defaultVariable.t.codeFragments, namespaceId)
    : defaultVariable?.t.definition

  const contextDefaultName = formulaContext ? formulaContext.getDefaultVariableName(namespaceId, 'any') : ''

  const contextCompletions = formulaContext ? formulaContext.completions(namespaceId, variableId) : []

  const defaultEditorContent: EditorContentType = fetchEditorContent(defaultVariable, formulaIsNormal, 0, namespaceId)

  // Refs
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const nameRef = React.useRef<string>(formulaName || (defaultVariable?.t.name ?? ''))
  const variableRef = React.useRef(defaultVariable)
  const editorContentRef = React.useRef(defaultEditorContent)
  const defaultNameRef = React.useRef(contextDefaultName)
  const selectFormula = React.useRef<SelectType>()

  // States
  const [variableT, setVariableT] = React.useState(defaultVariable?.t)
  const [savedVariableT, setSavedVariableT] = React.useState(defaultVariable?.savedT)
  const [defaultName, setDefaultName] = React.useState(contextDefaultName)
  const [selected, setSelected] = React.useState<SelectedType>()
  const [completion, setCompletion] = React.useState<CompletionType>({
    completions: contextCompletions,
    kind: 'Completion',
    formulaType: richType.type,
    input: formulaValue ?? '',
    activeCompletion: contextCompletions[0],
    activeCompletionIndex: 0
  })

  // Callbacks
  const doSelectFormula = React.useCallback(
    (selectRootId: any, selectFormulaId: any) => {
      selectFormula.current = { selectFormulaId, selectRootId }
      BrickdocEventBus.dispatch(
        FormulaEditorSelectEventTrigger({
          formulaId: selectFormulaId,
          rootId: selectRootId,
          parentFormulaId: variableId,
          parentRootId: namespaceId,
          selected: true
        })
      )
    },
    [variableId, namespaceId]
  )

  const updateDefaultName = React.useCallback(
    (type: FormulaType) => {
      if (!formulaContext) return
      // if (type === 'any' && defaultNameRef.current && defaultNameRef.current !== 'any') return
      const newDefaultName = formulaContext.getDefaultVariableName(namespaceId, type)
      defaultNameRef.current = newDefaultName
      setDefaultName(newDefaultName)
    },
    [formulaContext, namespaceId]
  )

  const doUnselectedFormula = React.useCallback(() => {
    if (!selectFormula.current) return
    BrickdocEventBus.dispatch(
      FormulaEditorSelectEventTrigger({
        formulaId: selectFormula.current.selectFormulaId,
        rootId: selectFormula.current.selectRootId,
        parentFormulaId: variableId,
        parentRootId: namespaceId,
        selected: false
      })
    )
    selectFormula.current = undefined
  }, [variableId, namespaceId])

  const doCalculate = React.useCallback(
    async (skipExecute: boolean): Promise<void> => {
      if (!formulaContext) {
        devLog('formula no input!')
        return
      }

      const inputIsEmpty = ['', '='].includes(editorContentRef.current.input.trim())

      const realInputs = positionBasedContentArrayToInput(
        fetchJSONContentArray(editorContentRef.current.content),
        editorContentRef.current.position,
        namespaceId
      )

      const newVariableId = variableRef.current ? variableRef.current.t.variableId : variableId
      const meta: VariableMetadata = {
        namespaceId,
        variableId: newVariableId,
        name: nameRef.current || defaultNameRef.current,
        input: editorContentRef.current.input,
        position: realInputs.prevText.length,
        richType
      }
      const ctx = { formulaContext, meta, interpretContext: { ctx: {}, arguments: [] } }
      const parseResult = parse({ ctx })
      const { completions, expressionType, success } = parseResult
      updateDefaultName(success ? expressionType : 'any')
      const newVariable = await interpret({ parseResult, ctx, skipExecute, variable: variableRef.current })
      // console.log('parseResult', ctx, parseResult, newVariable)

      setCompletion({
        completions,
        activeCompletion: completions[0],
        activeCompletionIndex: 0,
        kind: 'Completion',
        formulaType: richType.type,
        input: editorContentRef.current.input
      })
      doUnselectedFormula()

      if (inputIsEmpty || parseResult.valid) {
        editorContentRef.current = fetchEditorContent(newVariable, formulaIsNormal, parseResult.position, namespaceId)
        // console.log('replace editorContent', editorContentRef.current, newVariable)
        replaceRoot({ editorContent: editorContentRef.current, rootId: namespaceId, formulaId: variableId })
      }

      variableRef.current = newVariable
      setVariableT(newVariable.t)

      // devLog({ variable, ref: variableRef.current, finalInput, inputIsEmpty, parseResult, newVariable })
    },
    [doUnselectedFormula, formulaContext, variableId, formulaIsNormal, richType, namespaceId, updateDefaultName]
  )

  const handleSelectActiveCompletion = React.useCallback((): void => {
    const currentCompletion = completion.activeCompletion
    if (!currentCompletion) return

    const { position, content } = editorContentRef.current
    let oldContent = fetchJSONContentArray(content)
    let positionChange: number = currentCompletion.positionChange
    const oldContentLast = oldContent[oldContent.length - 1]
    const { prevText, nextText } = positionBasedContentArrayToInput(oldContent, position, namespaceId)

    if (oldContentLast && prevText && currentCompletion.replacements.length) {
      if (currentCompletion.replacements.includes(prevText) || currentCompletion.name.startsWith(prevText)) {
        positionChange -= prevText.length
        oldContent = []
      } else {
        // TODO ("a b c") "1 + a b" -> "1 + a b c"
        const replacement = currentCompletion.replacements.find(replacement => prevText.endsWith(replacement))
        if (!replacement) {
          devLog('replacement not found 1', { prevText, currentCompletion, nextText })
        } else {
          positionChange = positionChange - prevText.length + (replacement.length as number)
          const newText = prevText.substring(0, prevText.length - replacement.length)
          oldContent = [
            attrsToJSONContent({
              display: newText,
              code: 'unknown',
              type: 'any',
              hide: false,
              errors: [],
              attrs: undefined
            })
          ]
        }
      }
    }

    const nextContents = nextText
      ? [
          attrsToJSONContent({
            display: nextText,
            code: 'unknown',
            type: 'any',
            hide: false,
            errors: [],
            attrs: undefined
          })
        ]
      : []

    const completionContents: JSONContent[] = codeFragmentsToJSONContentArray(currentCompletion.codeFragments)
    const newContent: JSONContent[] = [...oldContent, ...completionContents, ...nextContents]

    const finalContent = buildJSONContentByArray(newContent)
    const finalInput = contentArrayToInput(fetchJSONContentArray(finalContent), namespaceId)
    const finalInputAfterEqual = formulaIsNormal ? `=${finalInput}` : finalInput
    const newPosition = editorContentRef.current.position + positionChange

    editorContentRef.current = {
      content: finalContent,
      input: finalInputAfterEqual,
      position: newPosition
    }
    replaceRoot({ editorContent: editorContentRef.current, rootId: namespaceId, formulaId: variableId })

    devLog('selectCompletion', {
      finalContent,
      currentCompletion,
      newPosition,
      editorContent: editorContentRef.current,
      newContent,
      finalInput,
      finalInputAfterEqual
    })
    void doCalculate(false)
  }, [completion.activeCompletion, doCalculate, variableId, formulaIsNormal, namespaceId])

  const isDisableSave = React.useCallback((): boolean => {
    if (!formulaContext) return true
    if (!variableRef.current) return true
    if (!(nameRef.current || defaultNameRef.current)) return true
    // if (!inputRef.current) return true

    const errorFatal = errorIsFatal(variableRef.current.t)
    if (errorFatal) return true

    return false
  }, [formulaContext])

  const updateEditor = React.useCallback(
    (jsonContent: JSONContent, editorPosition: number): void => {
      const newInput = contentArrayToInput(fetchJSONContentArray(jsonContent), namespaceId)
      const value = formulaIsNormal ? `=${newInput}` : newInput
      editorContentRef.current = { content: jsonContent, input: value, position: editorPosition }
      BrickdocEventBus.dispatch(
        FormulaCalculateTrigger({ formulaId: variableId, rootId: namespaceId, skipExecute: false })
      )
    },
    [variableId, formulaIsNormal, namespaceId]
  )

  const setCompletionByIndex = React.useCallback(
    (newIndex: number): void => {
      const currentCompletion = completion.completions[newIndex]
      setCompletion(c => ({
        ...c,
        activeCompletionIndex: newIndex,
        activeCompletion: currentCompletion,
        kind: 'Completion'
      }))
      // if (currentCompletion.kind === 'variable') {
      //   doSelectFormula(currentCompletion.preview.t.namespaceId, currentCompletion.preview.t.variableId)
      // } else {
      // }
    },
    [completion]
  )

  const updateVariable = React.useCallback(
    (variable: VariableInterface): void => {
      variableRef.current = variable
      setVariableT({ ...variable.t })

      if (!variable.isNew) {
        setSavedVariableT({ ...variable.savedT! })
        onUpdateFormula?.(variable)
      }

      editorContentRef.current = fetchEditorContent(
        variable,
        formulaIsNormal,
        editorContentRef.current.position,
        namespaceId
      )

      if (variable.isNew && !variable.t.task.async) {
        const result = variable.t.task.variableValue
        updateDefaultName(result.success ? result.result.type : 'any')
      }
    },
    [formulaIsNormal, namespaceId, onUpdateFormula, updateDefaultName]
  )

  const saveFormula = React.useCallback((): void => {
    if (!nameRef.current) {
      nameRef.current = defaultNameRef.current
    }

    const input = editorContentRef.current.input
    const v = variableRef.current!
    v.t.definition = input
    v.t.name = nameRef.current
    doUnselectedFormula()

    v.save()

    BrickdocEventBus.dispatch(FormulaEditorSavedTrigger({ formulaId: variableId, rootId: namespaceId }))

    devLog('save ...', { input, variable: variableRef.current, formulaContext })
  }, [doUnselectedFormula, formulaContext, variableId, namespaceId])

  const onSaveFormula = React.useCallback((): void => {
    // devLog({ variable: variableRef.current, name, defaultName })
    if (!variableRef.current) {
      // console.error('variable is not found')
      onUpdateFormula?.(undefined)
      BrickdocEventBus.dispatch(FormulaEditorSavedTrigger({ formulaId: variableId, rootId: namespaceId }))
      return
    }

    if (isDisableSave()) return

    saveFormula()
  }, [isDisableSave, saveFormula, onUpdateFormula, variableId, namespaceId])

  const commitFormula = React.useCallback(
    async (definition: string): Promise<void> => {
      if (!formulaContext) {
        devLog('formula no input!')
        return
      }

      editorContentRef.current = {
        content: buildJSONContentByDefinition(definition),
        input: definition,
        position: definition.length
      }

      await doCalculate(false)

      saveFormula()
    },
    [doCalculate, saveFormula, formulaContext]
  )

  // Effects
  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaKeyboardEventTrigger,
      event => {
        const { isEditor, key, completionIndex } = event.payload
        let newIndex: number
        switch (key) {
          case 'ArrowUp':
            newIndex =
              completion.activeCompletionIndex - 1 < 0
                ? completion.completions.length - 1
                : completion.activeCompletionIndex - 1
            setCompletionByIndex(newIndex)
            break
          case 'ArrowDown':
            newIndex =
              completion.activeCompletionIndex + 1 > completion.completions.length - 1
                ? 0
                : completion.activeCompletionIndex + 1
            setCompletionByIndex(newIndex)
            break
          case 'Tab':
            handleSelectActiveCompletion()
            break
          case 'Enter':
            if (isEditor) {
              onSaveFormula()
            } else {
              handleSelectActiveCompletion()
            }
            break
          case 'Click':
            if (completionIndex === completion.activeCompletionIndex) {
              handleSelectActiveCompletion()
            } else {
              setCompletionByIndex(completionIndex)
            }
            break
        }
      },
      {
        eventId: `${namespaceId},${variableId}`,
        subscribeId: `UseFormula#${namespaceId},${variableId}`
      }
    )
    return () => listener.unsubscribe()
  }, [completion, onSaveFormula, variableId, handleSelectActiveCompletion, namespaceId, setCompletionByIndex])

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaEditorHoverEventTrigger,
      event => {
        const attrs = event.payload.attrs as CodeFragmentAttrs | undefined
        if (attrs) {
          const attrCompletion = attrs2completion(formulaContext!, attrs, namespaceId)
          if (attrCompletion) {
            if (attrs.kind === 'Variable') {
              doSelectFormula(attrs.namespaceId, attrs.id)
            }
            setCompletion(c => ({ ...c, activeCompletion: attrCompletion, kind: 'Preview' }))
            return
          }
        }

        setCompletionByIndex(completion.activeCompletionIndex)
        doUnselectedFormula()
      },
      {
        eventId: `${namespaceId},${variableId}`,
        subscribeId: `UseFormula#${namespaceId},${variableId}`
      }
    )
    return () => listener.unsubscribe()
  }, [completion, doSelectFormula, doUnselectedFormula, formulaContext, variableId, namespaceId, setCompletionByIndex])

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaEditorSelectEventTrigger,
      event => {
        const { parentFormulaId, parentRootId, selected } = event.payload
        if (selected) {
          setSelected({ formulaId: parentFormulaId, rootId: parentRootId })
        } else {
          setSelected(undefined)
        }
      },
      {
        eventId: `${namespaceId},${variableId}`,
        subscribeId: `UseFormula#${namespaceId},${variableId}`
      }
    )
    return () => listener.unsubscribe()
  }, [variableId, namespaceId])

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaEditorSaveEventTrigger,
      event => {
        onSaveFormula()
      },
      {
        eventId: `${namespaceId},${variableId}`,
        subscribeId: `UseFormula#${namespaceId},${variableId}`
      }
    )
    return () => listener.unsubscribe()
  }, [onSaveFormula, variableId, namespaceId])

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaCalculateTrigger,
      e => {
        void doCalculate(e.payload.skipExecute)
      },
      {
        eventId: `${namespaceId},${variableId}`,
        subscribeId: `UseFormula#${namespaceId},${variableId}`
      }
    )
    return () => listener.unsubscribe()
  }, [doCalculate, variableId, namespaceId])

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaUpdatedViaId,
      e => {
        updateVariable(e.payload)
      },
      {
        eventId: `${namespaceId},${variableId}`,
        subscribeId: `UseFormula#${namespaceId},${variableId}`
      }
    )
    return () => listener.unsubscribe()
  }, [updateVariable, variableId, namespaceId])

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaUpdatedDraftTViaId,
      e => {
        updateVariable(e.payload)
      },
      {
        eventId: `${namespaceId},${variableId}`,
        subscribeId: `UseFormula#${namespaceId},${variableId}`
      }
    )
    return () => listener.unsubscribe()
  }, [updateVariable, variableId, namespaceId])

  return {
    variableT,
    savedVariableT,
    editorContent: editorContentRef.current,
    selected,
    nameRef,
    isDisableSave,
    updateEditor,
    onSaveFormula,
    commitFormula,
    formulaIsNormal,
    defaultName,
    completion
  }
}
