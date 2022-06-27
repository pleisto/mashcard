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
  VariableMetadata,
  FormulaUpdatedViaId,
  generateVariable,
  applyCompletion,
  VariableDependency,
  FormulaVariableDependencyUpdated
} from '@mashcard/formula'
import {
  MashcardEventBus,
  FormulaEditorReplaceRootTrigger,
  FormulaCalculateTrigger,
  FormulaKeyboardEventTrigger,
  FormulaEditorHoverEventTrigger,
  FormulaEditorSelectEventTrigger,
  FormulaEditorUpdateTrigger,
  FormulaEditorSavedTrigger
} from '@mashcard/schema'
import { JSONContent } from '@tiptap/core'
import { devLog } from '@mashcard/design-system'
import React from 'react'
import { codeFragments2content, content2definition, definition2content } from '../../../helpers'
import { useFormulaEditor } from '../../../editors/formulaEditor/useFormulaEditor'
import { Editor } from '@tiptap/react'

export interface UseFormulaInput {
  meta: VariableData['meta']
  onUpdateFormula?: (variable: VariableInterface | undefined) => Promise<void>
  formulaContext: ContextInterface | undefined | null
}

type FormulaContent = JSONContent | undefined

interface FormulaInput {
  position: number
  content: FormulaContent
}

interface FormulaNameType {
  name: string
  defaultName: string
}

export interface UseFormulaOutput {
  savedVariableT: VariableData | undefined
  selected: SelectedType | undefined
  temporaryVariableT: VariableData | undefined
  nameRef: React.MutableRefObject<FormulaNameType>
  formulaIsNormal: boolean
  formulaEditor: Editor | null
  isDisableSave: () => boolean
  onSaveFormula: () => Promise<void>
  commitFormula: (definition: string) => Promise<void>
  completion: CompletionType
  references: VariableDependency[]
}

const fetchFormulaInput = (t: VariableData | undefined, formulaIsNormal: boolean): FormulaInput => {
  if (!t) return { content: undefined, position: 0 }
  const content = t.variableParseResult.valid
    ? codeFragments2content(t.variableParseResult.codeFragments, formulaIsNormal)[0]
    : definition2content(t.variableParseResult.definition, formulaIsNormal)[0]
  return { content, position: t.variableParseResult.position }
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

  const defaultVariable = React.useMemo(
    () => formulaContext?.findVariableById(namespaceId, variableId),
    [formulaContext, namespaceId, variableId]
  )
  const contextDefaultName = React.useMemo(
    () => formulaContext?.getDefaultVariableName(namespaceId, 'any') ?? '',
    [formulaContext, namespaceId]
  )
  const contextCompletions = React.useMemo(
    () => formulaContext?.completions(namespaceId, variableId) ?? [],
    [formulaContext, namespaceId, variableId]
  )
  const defaultReferences = React.useMemo(
    () => formulaContext?.findReference(namespaceId, variableId) ?? [],
    [formulaContext, namespaceId, variableId]
  )

  const variableRef = React.useRef(defaultVariable)
  const inputRef = React.useRef<FormulaInput>(fetchFormulaInput(defaultVariable?.t, formulaIsNormal))
  const selectFormula = React.useRef<SelectType>()
  const temporaryVariableTRef = React.useRef<VariableData | undefined>(defaultVariable?.t)
  const nameRef = React.useRef<FormulaNameType>({
    name: formulaName || (defaultVariable?.t.meta.name ?? ''),
    defaultName: contextDefaultName
  })

  // States
  const [selected, setSelected] = React.useState<SelectedType>()
  const [savedVariableT, setSavedVariableT] = React.useState(defaultVariable?.t)
  const [completion, setCompletion] = React.useState<CompletionType>({
    completions: contextCompletions,
    kind: 'Completion',
    formulaType: richType.type,
    input: defaultVariable?.t.variableParseResult.definition ?? '',
    activeCompletion: contextCompletions[0],
    activeCompletionIndex: 0
  })
  const [references, setReferences] = React.useState(defaultReferences)

  const formulaEditor = useFormulaEditor({
    editable: true,
    rootId: namespaceId,
    formulaId: variableId,
    placeholder: formulaIsNormal ? 'Add Formula' : undefined,
    content: inputRef.current.content
  })

  // Callbacks
  const doSelectFormula = React.useCallback(
    (selectRootId: any, selectFormulaId: any) => {
      selectFormula.current = { selectFormulaId, selectRootId }
      MashcardEventBus.dispatch(
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
      nameRef.current.defaultName = newDefaultName
      // setDefaultName(newDefaultName)
    },
    [formulaContext, namespaceId]
  )

  const doUnselectedFormula = React.useCallback(() => {
    if (!selectFormula.current) return
    MashcardEventBus.dispatch(
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
      if (!formulaContext) return

      const definition = content2definition(inputRef.current.content, formulaIsNormal)[0]
      const inputIsEmpty = ['', '='].includes(definition.trim())
      const position = formulaIsNormal ? inputRef.current.position + 1 : inputRef.current.position

      const newVariableId = variableRef.current ? variableRef.current.t.meta.variableId : variableId
      const meta: VariableMetadata = {
        namespaceId,
        variableId: newVariableId,
        name: nameRef.current.name || nameRef.current.defaultName,
        input: definition,
        position,
        richType
      }
      const ctx = { formulaContext, meta, interpretContext: { ctx: {}, arguments: [] } }
      const parseResult = parse(ctx)
      const {
        completions,
        expressionType,
        success,
        variableParseResult: { valid }
      } = parseResult
      // eslint-disable-next-line no-nested-ternary
      updateDefaultName(success ? ([expressionType].flat().length === 1 ? [expressionType].flat()[0] : 'any') : 'any')
      const tempT = await interpret({ parseResult, ctx, skipExecute, variable: variableRef.current })

      temporaryVariableTRef.current = tempT
      // console.log('parseResult', ctx, parseResult, meta, tempT)

      setCompletion({
        completions,
        activeCompletion: completions[0],
        activeCompletionIndex: 0,
        kind: 'Completion',
        formulaType: richType.type,
        input: definition
      })
      doUnselectedFormula()

      if (inputIsEmpty || valid) {
        inputRef.current = fetchFormulaInput(tempT, formulaIsNormal)
      }

      inputRef.current.position = tempT.variableParseResult.position

      const result = MashcardEventBus.dispatch(
        FormulaEditorReplaceRootTrigger({
          position: formulaIsNormal ? inputRef.current.position : inputRef.current.position + 1,
          content: inputRef.current.content,
          formulaId: variableId,
          rootId: namespaceId
        })
      )
      await Promise.all(result)
      // devLog({ variable, ref: variableRef.current, finalInput, inputIsEmpty, parseResult, newVariable })
    },
    [doUnselectedFormula, formulaContext, variableId, formulaIsNormal, richType, namespaceId, updateDefaultName]
  )

  const handleSelectActiveCompletion = React.useCallback(async (): Promise<void> => {
    if (!formulaContext) return
    const currentCompletion = completion.activeCompletion
    if (!currentCompletion) return

    const definition = content2definition(inputRef.current.content, formulaIsNormal)[0]
    // eslint-disable-next-line no-nested-ternary
    const position = formulaEditor
      ? formulaIsNormal
        ? formulaEditor.state.selection.from
        : formulaEditor.state.selection.from - 1
      : definition.length

    const newVariableId = variableRef.current ? variableRef.current.t.meta.variableId : variableId
    const meta: VariableMetadata = {
      namespaceId,
      variableId: newVariableId,
      name: nameRef.current.name || nameRef.current.defaultName,
      input: definition,
      position,
      richType
    }
    const ctx = { formulaContext, meta, interpretContext: { ctx: {}, arguments: [] } }
    const newInput = applyCompletion(ctx, currentCompletion)

    inputRef.current = {
      position: formulaIsNormal ? newInput.position - 1 : newInput.position,
      content: definition2content(newInput.definition, formulaIsNormal)[0]
    }
    await doCalculate(false)
  }, [
    completion.activeCompletion,
    doCalculate,
    formulaContext,
    formulaEditor,
    formulaIsNormal,
    namespaceId,
    richType,
    variableId
  ])

  const isDisableSave = React.useCallback((): boolean => {
    if (!formulaContext) return true
    if (!temporaryVariableTRef.current) return true
    if (!(nameRef.current.name || nameRef.current.defaultName)) return true

    const errorFatal = errorIsFatal(temporaryVariableTRef.current)
    if (errorFatal) return true

    return false
  }, [formulaContext])

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

  const innerUpdateVariable = React.useCallback(
    async (variable: VariableInterface): Promise<void> => {
      variableRef.current = variable
      inputRef.current = fetchFormulaInput(variable.t, formulaIsNormal)
      temporaryVariableTRef.current = variable.t

      setSavedVariableT(variable.t)

      if (!variable.isNew) {
        await onUpdateFormula?.(variable)
      }

      if (variable.isNew && !variable.t.task.async) {
        const result = variable.t.task.variableValue
        updateDefaultName(result.success ? result.result.type : 'any')
      }
    },
    [formulaIsNormal, onUpdateFormula, updateDefaultName]
  )

  const saveFormula = React.useCallback(async (): Promise<void> => {
    if (!nameRef.current.name) {
      nameRef.current.name = nameRef.current.defaultName
    }
    variableRef.current = generateVariable({
      formulaContext: formulaContext!,
      t: {
        ...temporaryVariableTRef.current!,
        meta: { ...temporaryVariableTRef.current!.meta, name: nameRef.current.name }
      },
      variable: variableRef.current
    })
    temporaryVariableTRef.current = variableRef.current.t
    setSavedVariableT(variableRef.current.t)
    await variableRef.current.save()
    doUnselectedFormula()

    devLog('save ...', { variable: variableRef.current, formulaContext })
  }, [doUnselectedFormula, formulaContext])

  const onSaveFormula = React.useCallback(async (): Promise<void> => {
    if (isDisableSave()) return
    await saveFormula()
    MashcardEventBus.dispatch(FormulaEditorSavedTrigger({ formulaId: variableId, rootId: namespaceId }))
  }, [isDisableSave, namespaceId, saveFormula, variableId])

  const commitFormula = React.useCallback(
    async (definition: string): Promise<void> => {
      if (!formulaContext) return

      const [content, newDefinition] = definition2content(definition, formulaIsNormal)
      inputRef.current = { position: newDefinition.length, content }

      await doCalculate(false)
      await saveFormula()
    },
    [formulaContext, formulaIsNormal, doCalculate, saveFormula]
  )

  // Effects
  React.useEffect(() => {
    const listener = MashcardEventBus.subscribe(
      FormulaKeyboardEventTrigger,
      async event => {
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
            await handleSelectActiveCompletion()
            break
          case 'Enter':
            if (isEditor) {
              await onSaveFormula()
            } else {
              await handleSelectActiveCompletion()
            }
            break
          case 'Click':
            if (completionIndex === completion.activeCompletionIndex) {
              await handleSelectActiveCompletion()
            } else {
              setCompletionByIndex(completionIndex)
            }
            break
        }
      },
      { eventId: `${namespaceId},${variableId}`, subscribeId: `UseFormula#${namespaceId},${variableId}` }
    )
    return () => listener.unsubscribe()
  }, [completion, onSaveFormula, variableId, handleSelectActiveCompletion, namespaceId, setCompletionByIndex])

  React.useEffect(() => {
    const listener = MashcardEventBus.subscribe(
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
      { eventId: `${namespaceId},${variableId}`, subscribeId: `UseFormula#${namespaceId},${variableId}` }
    )
    return () => listener.unsubscribe()
  }, [completion, doSelectFormula, doUnselectedFormula, formulaContext, variableId, namespaceId, setCompletionByIndex])

  React.useEffect(() => {
    const listener = MashcardEventBus.subscribe(
      FormulaEditorSelectEventTrigger,
      event => {
        const { parentFormulaId, parentRootId, selected } = event.payload
        setSelected(selected ? { formulaId: parentFormulaId, rootId: parentRootId } : undefined)
      },
      { eventId: `${namespaceId},${variableId}`, subscribeId: `UseFormula#${namespaceId},${variableId}` }
    )
    return () => listener.unsubscribe()
  }, [variableId, namespaceId])

  React.useEffect(() => {
    const listener = MashcardEventBus.subscribe(
      FormulaEditorUpdateTrigger,
      async e => {
        inputRef.current = { position: e.payload.position, content: e.payload.content }
        await doCalculate(false)
      },
      { eventId: `${namespaceId},${variableId}`, subscribeId: `UseFormula#${namespaceId},${variableId}` }
    )
    return () => listener.unsubscribe()
  }, [doCalculate, formulaIsNormal, namespaceId, variableId])

  React.useEffect(() => {
    const listener = MashcardEventBus.subscribe(
      FormulaCalculateTrigger,
      async e => {
        await doCalculate(e.payload.skipExecute)
      },
      { eventId: `${namespaceId},${variableId}`, subscribeId: `UseFormula#${namespaceId},${variableId}` }
    )
    return () => listener.unsubscribe()
  }, [doCalculate, variableId, namespaceId])

  React.useEffect(() => {
    const listener = MashcardEventBus.subscribe(
      FormulaVariableDependencyUpdated,
      async e => {
        setReferences(e.payload.meta)
      },
      {
        eventId: `${formulaContext?.domain}#${namespaceId},${variableId}`,
        subscribeId: `UseFormula#${namespaceId},${variableId}`
      }
    )
    return () => listener.unsubscribe()
  }, [formulaContext?.domain, namespaceId, variableId])

  React.useEffect(() => {
    const listener = MashcardEventBus.subscribe(
      FormulaUpdatedViaId,
      async e => {
        await innerUpdateVariable(e.payload.meta)
      },
      { eventId: `${namespaceId},${variableId}`, subscribeId: `UseFormula#${namespaceId},${variableId}` }
    )
    return () => listener.unsubscribe()
  }, [innerUpdateVariable, variableId, namespaceId])

  return {
    formulaEditor,
    references,
    temporaryVariableT: temporaryVariableTRef.current,
    savedVariableT,
    selected,
    nameRef,
    isDisableSave,
    onSaveFormula,
    commitFormula,
    formulaIsNormal,
    completion
  }
}
