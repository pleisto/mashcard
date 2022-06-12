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
  generateVariable
} from '@brickdoc/formula'
import {
  BrickdocEventBus,
  FormulaEditorReplaceRootTrigger,
  FormulaCalculateTrigger,
  FormulaKeyboardEventTrigger,
  FormulaEditorHoverEventTrigger,
  FormulaEditorSelectEventTrigger,
  FormulaEditorUpdateTrigger,
  FormulaEditorSavedTrigger
} from '@brickdoc/schema'
import { JSONContent } from '@tiptap/core'
import { devLog } from '@brickdoc/design-system'
import React from 'react'
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
  meta: VariableData['meta']
  onUpdateFormula?: (variable: VariableInterface | undefined) => void
  formulaContext: ContextInterface | undefined | null
}

type FormulaContent = JSONContent | undefined

interface FormulaInput {
  definition: string
  position: number
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
  content: FormulaContent
  isDisableSave: () => boolean
  onSaveFormula: () => Promise<void>
  commitFormula: (definition: string) => Promise<void>
  completion: CompletionType
}

const fetchFormulaContent = (t: VariableData | undefined, formulaIsNormal: boolean, pageId: string): FormulaContent => {
  if (!t) {
    return undefined
  }

  if (t.variableParseResult.valid) {
    const variableCodeFragments = t.variableParseResult.codeFragments

    const codeFragments = maybeRemoveCodeFragmentsEqual(variableCodeFragments, formulaIsNormal)
    const newContent = codeFragmentsToJSONContentTotal(codeFragments)

    return newContent
  }

  const definition = t.variableParseResult.definition
  const realDefinition = maybeRemoveDefinitionEqual(definition, formulaIsNormal)
  const defaultContent = buildJSONContentByDefinition(realDefinition)

  return defaultContent
}

const replaceRoot = ({
  formulaIsNormal,
  content,
  rootId,
  input: { position, definition },
  formulaId
}: {
  formulaIsNormal: boolean
  content: FormulaContent
  input: FormulaInput
  rootId: string
  formulaId: string
}): void => {
  // console.log('replace root', formulaId, editorContent)
  BrickdocEventBus.dispatch(
    FormulaEditorReplaceRootTrigger({
      position: formulaIsNormal ? position - 1 : position,
      content,
      input: definition,
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

  const contextDefaultName = formulaContext?.getDefaultVariableName(namespaceId, 'any') ?? ''

  const contextCompletions = formulaContext?.completions(namespaceId, variableId) ?? []

  const defaultContent: FormulaContent = fetchFormulaContent(defaultVariable?.t, formulaIsNormal, namespaceId)

  const variableRef = React.useRef(defaultVariable)
  const contentRef = React.useRef(defaultContent)
  const inputRef = React.useRef<FormulaInput>({
    definition: defaultVariable?.t?.variableParseResult.definition ?? '',
    position: defaultVariable?.t?.variableParseResult.position ?? 0
  })
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
      nameRef.current.defaultName = newDefaultName
      // setDefaultName(newDefaultName)
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

      const definition = inputRef.current.definition
      const inputIsEmpty = ['', '='].includes(definition.trim())

      // const realInputs = positionBasedContentArrayToInput(
      //   fetchJSONContentArray(editorContentRef.current),
      //   inputRef.current.position,
      //   namespaceId
      // )

      const position = richType.type === 'normal' ? inputRef.current.position + 1 : inputRef.current.position

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
      const tempT = await interpret({
        parseResult,
        ctx,
        skipExecute,
        variable: variableRef.current
      })

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
        contentRef.current = fetchFormulaContent(tempT, formulaIsNormal, namespaceId)
        // console.log('replace editorContent', editorContentRef.current, newVariable)
        replaceRoot({
          formulaIsNormal,
          content: contentRef.current,
          rootId: namespaceId,
          formulaId: variableId,
          input: tempT.variableParseResult
        })
      }

      // variableRef.current = newVariable
      // setVariableT(newVariable.t)

      // devLog({ variable, ref: variableRef.current, finalInput, inputIsEmpty, parseResult, newVariable })
    },
    [doUnselectedFormula, formulaContext, variableId, formulaIsNormal, richType, namespaceId, updateDefaultName]
  )

  const handleSelectActiveCompletion = React.useCallback((): void => {
    const currentCompletion = completion.activeCompletion
    if (!currentCompletion) return

    const content = contentRef.current
    const oldPosition = inputRef.current.position
    let oldContent = fetchJSONContentArray(content)
    let positionChange: number = currentCompletion.positionChange
    const oldContentLast = oldContent[oldContent.length - 1]
    const { prevText, nextText } = positionBasedContentArrayToInput(oldContent, oldPosition, namespaceId)

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
    const newPosition = oldPosition + positionChange

    contentRef.current = finalContent
    inputRef.current = { definition: finalInputAfterEqual, position: newPosition }
    replaceRoot({
      formulaIsNormal,
      content: contentRef.current,
      rootId: namespaceId,
      formulaId: variableId,
      input: inputRef.current
    })

    devLog('selectCompletion', {
      finalContent,
      currentCompletion,
      newPosition,
      editorContent: contentRef.current,
      newContent,
      finalInput,
      finalInputAfterEqual
    })
    void doCalculate(false)
  }, [completion.activeCompletion, doCalculate, variableId, formulaIsNormal, namespaceId])

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
    (variable: VariableInterface): void => {
      variableRef.current = variable
      contentRef.current = fetchFormulaContent(variable.t, formulaIsNormal, namespaceId)
      inputRef.current = {
        definition: variable.t.variableParseResult.definition,
        position: variable.t.variableParseResult.position
      }
      temporaryVariableTRef.current = variable.t

      setSavedVariableT(variable.t)

      if (!variable.isNew) {
        onUpdateFormula?.(variable)
      }

      if (variable.isNew && !variable.t.task.async) {
        const result = variable.t.task.variableValue
        updateDefaultName(result.success ? result.result.type : 'any')
      }
    },
    [formulaIsNormal, namespaceId, onUpdateFormula, updateDefaultName]
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
    BrickdocEventBus.dispatch(FormulaEditorSavedTrigger({ formulaId: variableId, rootId: namespaceId }))
  }, [isDisableSave, namespaceId, saveFormula, variableId])

  const commitFormula = React.useCallback(
    async (definition: string): Promise<void> => {
      if (!formulaContext) return

      contentRef.current = buildJSONContentByDefinition(definition)
      inputRef.current = { definition, position: definition.length }

      await doCalculate(false)
      await saveFormula()
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
              void onSaveFormula()
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
      FormulaEditorUpdateTrigger,
      async e => {
        const newInput = contentArrayToInput(fetchJSONContentArray(e.payload.content), namespaceId)
        const value = formulaIsNormal ? `=${newInput}` : newInput
        contentRef.current = { content: e.payload.content }
        inputRef.current = { definition: value, position: e.payload.position }

        await doCalculate(false)
      },
      {
        eventId: `${namespaceId},${variableId}`,
        subscribeId: `UseFormula#${namespaceId},${variableId}`
      }
    )
    return () => listener.unsubscribe()
  }, [doCalculate, formulaIsNormal, namespaceId, variableId])

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
      async e => {
        innerUpdateVariable(e.payload.meta)
      },
      {
        eventId: `${namespaceId},${variableId}`,
        subscribeId: `UseFormula#${namespaceId},${variableId}`
      }
    )
    return () => listener.unsubscribe()
  }, [innerUpdateVariable, variableId, namespaceId])

  return {
    content: contentRef.current,
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
