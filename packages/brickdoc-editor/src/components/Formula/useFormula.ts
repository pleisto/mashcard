import {
  buildVariable,
  Completion,
  ContextInterface,
  errorIsFatal,
  FormulaSourceType,
  interpret,
  InterpretResult,
  parse,
  ParseResult,
  VariableData,
  VariableInterface
} from '@brickdoc/formula'
import {
  BrickdocEventBus,
  FormulaEditorReplaceRootTrigger,
  FormulaEditorSaveEventTrigger,
  FormulaCalculateTrigger,
  FormulaKeyboardEventTrigger,
  FormulaUpdatedViaId,
  FormulaEditorSavedTrigger
} from '@brickdoc/schema'
import { JSONContent } from '@tiptap/core'
import { devLog, devWarning } from '@brickdoc/design-system'
import React from 'react'
import { EditorContentType } from '../../extensions/formula/FormulaEditor/FormulaEditor'
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
} from '../../helpers'

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
  isDraft: boolean
  nameRef: React.MutableRefObject<string | undefined>
  defaultName: string
  formulaIsNormal: boolean
  editorContent: EditorContentType
  isDisableSave: () => boolean
  updateEditor: (content: JSONContent, position: number) => void
  doHandleSave: () => Promise<void>
  handleSelectActiveCompletion: () => void
  completion: CompletionType
  setCompletion: React.Dispatch<React.SetStateAction<CompletionType>>
}

export interface CalculateInput {
  namespaceId: string
  formulaId: string
  variable: VariableInterface | undefined
  formulaType: FormulaSourceType
  name: string
  editorContent: EditorContentType
  formulaContext: ContextInterface
}

export interface CalculateOutput {
  completions: Completion[]
  newVariable: VariableInterface
  newPosition: number
  parseResult: ParseResult
  interpretResult: InterpretResult
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

const calculate = async ({
  namespaceId,
  variable,
  formulaId,
  name,
  editorContent: { input, position },
  formulaType,
  formulaContext
}: CalculateInput): Promise<CalculateOutput> => {
  const variableId = variable ? variable.t.variableId : formulaId
  const meta = { namespaceId, variableId, name, input, position, type: formulaType }
  const ctx = {
    formulaContext,
    meta,
    interpretContext: { ctx: {}, arguments: [] }
  }
  const parseResult = parse({ ctx })
  const completions = parseResult.completions

  let interpretResult: InterpretResult

  if (parseResult.success) {
    interpretResult = await interpret({ parseResult, ctx })
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

  const newVariable = buildVariable({ formulaContext, meta, parseResult, interpretResult })

  return {
    newPosition: parseResult.position,
    completions,
    newVariable,
    parseResult,
    interpretResult
  }
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
  activeCompletion: Completion | undefined
  activeCompletionIndex: number
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

  const defaultVariable = React.useMemo(
    () => formulaContext?.findVariable(rootId, formulaId),
    [formulaContext, formulaId, rootId]
  )

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
  const isDraftRef = React.useRef(defaultVariable?.isDraft() === true)
  const defaultNameRef = React.useRef(contextDefaultName)

  // States
  const [variableT, setVariableT] = React.useState(defaultVariable?.t)
  const [savedVariableT, setSavedVariableT] = React.useState(defaultVariable?.t)
  const [defaultName, setDefaultName] = React.useState(contextDefaultName)
  const [completion, setCompletion] = React.useState<CompletionType>({
    completions: contextCompletions,
    activeCompletion: contextCompletions[0],
    activeCompletionIndex: 0
  })

  // Callbacks
  const doCalculate = React.useCallback(async (): Promise<void> => {
    if (!formulaContext) {
      devLog('formula no input!')
      return
    }

    const inputIsEmpty = ['', '='].includes(editorContentRef.current.input.trim())

    const realInputs = positionBasedContentArrayToInput(
      fetchJSONContentArray(editorContentRef.current.content),
      editorContentRef.current.position
    )

    const { interpretResult, newPosition, parseResult, completions, newVariable } = await calculate({
      namespaceId: rootId,
      formulaId,
      variable: variableRef.current,
      formulaType,
      editorContent: { ...editorContentRef.current, position: realInputs.prevText.length },
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      name: nameRef.current || defaultNameRef.current,
      formulaContext
    })

    setCompletion({ completions, activeCompletion: completions[0], activeCompletionIndex: 0 })

    if ((parseResult.valid && !errorIsFatal(newVariable.t)) || inputIsEmpty) {
      editorContentRef.current = fetchEditorContent(newVariable, formulaIsNormal, newPosition)
      // console.log('replace editorContent', editorContentRef.current)
      replaceRoot({ editorContent: editorContentRef.current, rootId, formulaId })
    }

    variableRef.current = newVariable
    setVariableT(newVariable.t)

    // devLog({ variable, ref: variableRef.current, finalInput, inputIsEmpty, parseResult, newVariable })

    if (interpretResult.variableValue.success) {
      const type = interpretResult.variableValue.result.type
      const newDefaultName = formulaContext.getDefaultVariableName(rootId, type)
      defaultNameRef.current = newDefaultName
      setDefaultName(newDefaultName)
    }
  }, [formulaContext, formulaId, formulaIsNormal, formulaType, rootId])

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
    void doCalculate()
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
      BrickdocEventBus.dispatch(FormulaCalculateTrigger({ formulaId, rootId }))
    },
    [formulaId, formulaType, rootId]
  )

  const doHandleSave = React.useCallback(async (): Promise<void> => {
    // devLog({ variable: variableRef.current, name, defaultName })
    if (!variableRef.current) {
      updateFormula(undefined)
      return
    }

    if (isDisableSave()) return

    if (!nameRef.current) {
      nameRef.current = defaultNameRef.current
    }

    const input = editorContentRef.current.input
    const v = variableRef.current
    v.t.definition = input
    v.t.name = nameRef.current!

    updateFormula(v)
    await v.save()

    variableRef.current = v
    isDraftRef.current = false
    setVariableT(v.t)
    setSavedVariableT(v.t)

    BrickdocEventBus.dispatch(FormulaEditorSavedTrigger({ formulaId, rootId }))

    devLog('save ...', { input, variable: variableRef.current, formulaContext })
  }, [formulaContext, formulaId, isDisableSave, rootId, updateFormula])

  // Effects
  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaKeyboardEventTrigger,
      event => {
        let newIndex: number
        switch (event.payload.key) {
          case 'ArrowUp':
            newIndex =
              completion.activeCompletionIndex - 1 < 0
                ? completion.completions.length - 1
                : completion.activeCompletionIndex - 1
            setCompletion(c => ({ ...c, activeCompletionIndex: newIndex, activeCompletion: c.completions[newIndex] }))
            break
          case 'ArrowDown':
            newIndex =
              completion.activeCompletionIndex + 1 > completion.completions.length - 1
                ? 0
                : completion.activeCompletionIndex + 1
            setCompletion(c => ({ ...c, activeCompletionIndex: newIndex, activeCompletion: c.completions[newIndex] }))
            break
          case 'Tab':
            if (completion.activeCompletion) handleSelectActiveCompletion()
            break
          case 'Enter':
            void doHandleSave()
            break
        }
      },
      {
        eventId: `${rootId},${formulaId}`,
        subscribeId: `UseFormula#${rootId},${formulaId}`
      }
    )
    return () => listener.unsubscribe()
  }, [completion, doHandleSave, formulaId, handleSelectActiveCompletion, rootId])

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaEditorSaveEventTrigger,
      event => {
        void doHandleSave()
      },
      {
        eventId: `${rootId},${formulaId}`,
        subscribeId: `UseFormula#${rootId},${formulaId}`
      }
    )
    return () => listener.unsubscribe()
  }, [doHandleSave, formulaId, rootId])

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaCalculateTrigger,
      e => {
        void doCalculate()
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
        variableRef.current = e.payload
        editorContentRef.current = fetchEditorContent(e.payload, formulaIsNormal, 0)
        setVariableT(e.payload.t)
        setSavedVariableT(e.payload.t)
      },
      {
        eventId: `${rootId},${formulaId}`,
        subscribeId: `UseFormula#${rootId},${formulaId}`
      }
    )
    return () => listener.unsubscribe()
  }, [formulaId, formulaIsNormal, rootId])

  return {
    variableT,
    savedVariableT,
    isDraft: isDraftRef.current,
    editorContent: editorContentRef.current,
    nameRef,
    isDisableSave,
    updateEditor,
    doHandleSave,
    formulaIsNormal,
    defaultName,
    handleSelectActiveCompletion,
    completion,
    setCompletion
  }
}
