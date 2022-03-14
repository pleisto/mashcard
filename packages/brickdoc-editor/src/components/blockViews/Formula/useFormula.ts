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
  interpretAsync,
  FormulaType
} from '@brickdoc/formula'
import {
  BrickdocEventBus,
  FormulaEditorReplaceRootTrigger,
  FormulaEditorSaveEventTrigger,
  FormulaCalculateTrigger,
  FormulaKeyboardEventTrigger,
  FormulaUpdatedViaId,
  FormulaEditorSavedTrigger,
  FormulaEditorHoverEventTrigger,
  FormulaEditorSelectEventTrigger
} from '@brickdoc/schema'
import { JSONContent } from '@tiptap/core'
import { devLog, devWarning } from '@brickdoc/design-system'
import React from 'react'
import { EditorContentType } from '../../../extensions/blocks/formula/FormulaEditor/FormulaEditor'
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
  rootId: string
  formulaId: string
  formulaName?: string
  updateFormula: (variable: VariableInterface | undefined) => void
  formulaType: FormulaSourceType
  formulaContext: ContextInterface | undefined | null
}

export interface UseFormulaOutput {
  variableT: VariableData | undefined
  savedVariableT: VariableData | undefined
  selected: SelectedType | undefined
  nameRef: React.MutableRefObject<string | undefined>
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
  newPosition: number
): EditorContentType => {
  if (!variable) {
    return { content: undefined, input: formulaIsNormal ? '=' : '', position: newPosition }
  }

  if (variable.t.valid) {
    const variableCodeFragments = variable.t.codeFragments

    const codeFragments = maybeRemoveCodeFragmentsEqual(variableCodeFragments, formulaIsNormal)
    const newContent = codeFragmentsToJSONContentTotal(codeFragments)
    const newInput = contentArrayToInput(fetchJSONContentArray(newContent))
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
  rootId,
  formulaId,
  updateFormula,
  formulaType,
  formulaName,
  formulaContext
}: UseFormulaInput): UseFormulaOutput => {
  const formulaIsNormal = formulaType === 'normal'

  const defaultVariable = React.useMemo(() => {
    const variable = formulaContext?.findVariableById(rootId, formulaId)
    if (!variable) return undefined
    return variable.cloneVariable()
  }, [formulaContext, formulaId, rootId])

  const formulaValue = React.useMemo(
    () =>
      defaultVariable?.t.valid
        ? defaultVariable.t.codeFragments.map(fragment => fragment.value).join('')
        : defaultVariable?.t.definition,
    [defaultVariable]
  )

  const contextDefaultName = React.useMemo(
    () => (formulaContext ? formulaContext.getDefaultVariableName(rootId, 'any') : ''),
    [formulaContext, rootId]
  )

  const contextCompletions = React.useMemo(
    () =>
      formulaContext && (formulaIsNormal || formulaValue?.startsWith('='))
        ? formulaContext.completions(rootId, formulaId)
        : [],
    [formulaId, formulaContext, formulaIsNormal, formulaValue, rootId]
  )

  const defaultEditorContent: EditorContentType = fetchEditorContent(defaultVariable, formulaIsNormal, 0)

  // Refs
  const nameRef = React.useRef(formulaName ?? defaultVariable?.t.name)
  const variableRef = React.useRef(defaultVariable)
  const editorContentRef = React.useRef(defaultEditorContent)
  const defaultNameRef = React.useRef(contextDefaultName)
  const selectFormula = React.useRef<SelectType>()

  // States
  const [variableT, setVariableT] = React.useState(defaultVariable?.t)
  const [savedVariableT, setSavedVariableT] = React.useState(defaultVariable?.t)
  const [defaultName, setDefaultName] = React.useState(contextDefaultName)
  const [selected, setSelected] = React.useState<SelectedType>()
  const [completion, setCompletion] = React.useState<CompletionType>({
    completions: contextCompletions,
    kind: 'Completion',
    activeCompletion: contextCompletions[0],
    activeCompletionIndex: 0
  })

  // Callbacks
  const doSelectFormula = React.useCallback(
    (selectRootId, selectFormulaId) => {
      selectFormula.current = { selectFormulaId, selectRootId }
      BrickdocEventBus.dispatch(
        FormulaEditorSelectEventTrigger({
          formulaId: selectFormulaId,
          rootId: selectRootId,
          parentFormulaId: formulaId,
          parentRootId: rootId,
          selected: true
        })
      )
    },
    [formulaId, rootId]
  )

  const updateDefaultName = React.useCallback(
    (type: FormulaType) => {
      if (!formulaContext) return
      // if (type === 'any' && defaultNameRef.current && defaultNameRef.current !== 'any') return
      const newDefaultName = formulaContext.getDefaultVariableName(rootId, type)
      defaultNameRef.current = newDefaultName
      setDefaultName(newDefaultName)
    },
    [formulaContext, rootId]
  )

  const doUnselectedFormula = React.useCallback(() => {
    if (!selectFormula.current) return
    BrickdocEventBus.dispatch(
      FormulaEditorSelectEventTrigger({
        formulaId: selectFormula.current.selectFormulaId,
        rootId: selectFormula.current.selectRootId,
        parentFormulaId: formulaId,
        parentRootId: rootId,
        selected: false
      })
    )
    selectFormula.current = undefined
  }, [formulaId, rootId])

  const doCalculate = React.useCallback(
    (skipAsync: boolean): void => {
      if (!formulaContext) {
        devLog('formula no input!')
        return
      }

      const inputIsEmpty = ['', '='].includes(editorContentRef.current.input.trim())

      const realInputs = positionBasedContentArrayToInput(
        fetchJSONContentArray(editorContentRef.current.content),
        editorContentRef.current.position
      )

      const variableId = variableRef.current ? variableRef.current.t.variableId : formulaId
      const meta = {
        namespaceId: rootId,
        variableId,
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        name: nameRef.current || defaultNameRef.current,
        input: editorContentRef.current.input,
        position: realInputs.prevText.length,
        type: formulaType
      }
      const ctx = { formulaContext, meta, interpretContext: { ctx: {}, arguments: [] } }
      const parseResult = parse({ ctx })
      const { completions, expressionType, success } = parseResult
      updateDefaultName(success ? expressionType : 'any')
      const newVariable = interpretAsync({ parseResult, ctx, skipAsync, variable: variableRef.current })

      setCompletion({ completions, activeCompletion: completions[0], activeCompletionIndex: 0, kind: 'Completion' })
      doUnselectedFormula()

      if (inputIsEmpty || parseResult.valid) {
        editorContentRef.current = fetchEditorContent(newVariable, formulaIsNormal, parseResult.position)
        // console.log('replace editorContent', editorContentRef.current, newVariable)
        replaceRoot({ editorContent: editorContentRef.current, rootId, formulaId })
      }

      variableRef.current = newVariable
      setVariableT(newVariable.t)

      // devLog({ variable, ref: variableRef.current, finalInput, inputIsEmpty, parseResult, newVariable })
    },
    [doUnselectedFormula, formulaContext, formulaId, formulaIsNormal, formulaType, rootId, updateDefaultName]
  )

  const handleSelectActiveCompletion = React.useCallback((): void => {
    const currentCompletion = completion.activeCompletion
    if (!currentCompletion) {
      devWarning(true, 'No active completion!')
      return
    }

    const { position, content } = editorContentRef.current
    let oldContent = fetchJSONContentArray(content)
    let positionChange: number = currentCompletion.positionChange
    const oldContentLast = oldContent[oldContent.length - 1]
    const { prevText, nextText } = positionBasedContentArrayToInput(oldContent, position)

    // console.log('replace', {
    //   oldContentLast,
    //   oldContent,
    //   prevText,
    //   position,
    //   nextText,
    //   positionChange,
    //   currentCompletion
    // })
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
              value: newText,
              code: 'unknown',
              type: 'any',
              renderText: undefined,
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
            value: nextText,
            code: 'unknown',
            type: 'any',
            renderText: undefined,
            hide: false,
            errors: [],
            attrs: undefined
          })
        ]
      : []

    const completionContents: JSONContent[] = codeFragmentsToJSONContentArray(currentCompletion.codeFragments)
    const newContent: JSONContent[] = [...oldContent, ...completionContents, ...nextContents]

    const finalContent = buildJSONContentByArray(newContent)
    const finalInput = contentArrayToInput(fetchJSONContentArray(finalContent))
    const finalInputAfterEqual = formulaIsNormal ? `=${finalInput}` : finalInput
    const newPosition = editorContentRef.current.position + positionChange

    editorContentRef.current = {
      content: finalContent,
      input: finalInputAfterEqual,
      position: newPosition
    }
    replaceRoot({ editorContent: editorContentRef.current, rootId, formulaId })

    devLog('selectCompletion', {
      finalContent,
      currentCompletion,
      newPosition,
      editorContent: editorContentRef.current,
      newContent,
      finalInput,
      finalInputAfterEqual
    })
    doCalculate(false)
  }, [completion.activeCompletion, doCalculate, formulaId, formulaIsNormal, rootId])

  const isDisableSave = React.useCallback((): boolean => {
    if (!formulaContext) return true
    if (!variableRef.current) return true
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if (!(nameRef.current || defaultNameRef.current)) return true
    // if (!inputRef.current) return true

    const errorFatal = errorIsFatal(variableRef.current.t)
    if (errorFatal) return true

    return false
  }, [formulaContext])

  const updateEditor = React.useCallback(
    (jsonContent: JSONContent, editorPosition: number): void => {
      const newInput = contentArrayToInput(fetchJSONContentArray(jsonContent))
      const value = formulaType === 'normal' ? `=${newInput}` : newInput
      editorContentRef.current = { content: jsonContent, input: value, position: editorPosition }
      BrickdocEventBus.dispatch(FormulaCalculateTrigger({ formulaId, rootId, skipAsync: false }))
    },
    [formulaId, formulaType, rootId]
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
        setSavedVariableT({ ...variable.t })
        updateFormula(variable)
      }

      editorContentRef.current = fetchEditorContent(variable, formulaIsNormal, editorContentRef.current.position)

      if (!variable.t.async && variable.isNew) {
        const result = variable.t.variableValue
        updateDefaultName(result.success ? result.result.type : 'any')
      }
    },
    [formulaIsNormal, updateDefaultName, updateFormula]
  )

  const saveFormula = React.useCallback((): void => {
    if (!nameRef.current) {
      nameRef.current = defaultNameRef.current
    }

    const input = editorContentRef.current.input
    const v = variableRef.current!
    v.t.definition = input
    v.t.name = nameRef.current!
    doUnselectedFormula()

    v.save()

    updateVariable(v)

    BrickdocEventBus.dispatch(FormulaEditorSavedTrigger({ formulaId, rootId }))

    devLog('save ...', { input, variable: variableRef.current, formulaContext })
  }, [doUnselectedFormula, formulaContext, formulaId, rootId, updateVariable])

  const onSaveFormula = React.useCallback((): void => {
    // devLog({ variable: variableRef.current, name, defaultName })
    if (!variableRef.current) {
      updateFormula(undefined)
      return
    }

    if (isDisableSave()) return

    saveFormula()
  }, [saveFormula, isDisableSave, updateFormula])

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

      doCalculate(false)

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
        eventId: `${rootId},${formulaId}`,
        subscribeId: `UseFormula#${rootId},${formulaId}`
      }
    )
    return () => listener.unsubscribe()
  }, [completion, onSaveFormula, formulaId, handleSelectActiveCompletion, rootId, setCompletionByIndex])

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaEditorHoverEventTrigger,
      event => {
        const attrs = event.payload.attrs as CodeFragmentAttrs | undefined
        if (attrs) {
          const attrCompletion = attrs2completion(formulaContext!, attrs, rootId)
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
        eventId: `${rootId},${formulaId}`,
        subscribeId: `UseFormula#${rootId},${formulaId}`
      }
    )
    return () => listener.unsubscribe()
  }, [completion, doSelectFormula, doUnselectedFormula, formulaContext, formulaId, rootId, setCompletionByIndex])

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
        eventId: `${rootId},${formulaId}`,
        subscribeId: `UseFormula#${rootId},${formulaId}`
      }
    )
    return () => listener.unsubscribe()
  }, [formulaId, rootId])

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaEditorSaveEventTrigger,
      event => {
        onSaveFormula()
      },
      {
        eventId: `${rootId},${formulaId}`,
        subscribeId: `UseFormula#${rootId},${formulaId}`
      }
    )
    return () => listener.unsubscribe()
  }, [onSaveFormula, formulaId, rootId])

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaCalculateTrigger,
      e => {
        doCalculate(e.payload.skipAsync)
      },
      {
        eventId: `${rootId},${formulaId}`,
        subscribeId: `UseFormula#${rootId},${formulaId}`
      }
    )
    return () => listener.unsubscribe()
  }, [doCalculate, formulaId, rootId])

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaUpdatedViaId,
      e => {
        const variable: VariableInterface = e.payload
        updateVariable(variable)
      },
      {
        eventId: `${rootId},${formulaId}`,
        subscribeId: `UseFormula#${rootId},${formulaId}`
      }
    )
    return () => listener.unsubscribe()
  }, [updateVariable, formulaId, rootId])

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
