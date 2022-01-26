import {
  buildVariable,
  Completion,
  ContextInterface,
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
  FormulaEditorSaveEventTrigger,
  FormulaEditorUpdateEventTrigger,
  FormulaKeyboardEventTrigger,
  FormulaUpdated
} from '@brickdoc/schema'
import { JSONContent } from '@tiptap/core'
import React from 'react'
import { EditorDataSourceContext } from '../../dataSource/DataSource'
import { EditorContentType } from '../../extensions/formula/FormulaEditor/FormulaEditor'
import {
  attrsToJSONContent,
  buildJSONContentByArray,
  buildJSONContentByDefinition,
  codeFragmentsToJSONContentTotal,
  codeFragmentToJSONContentArray,
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
}

export interface UseFormulaOutput {
  variableT: VariableData | undefined
  savedVariableT: VariableData | undefined
  isDraft: boolean
  doCalculate: () => Promise<void>
  name: string | undefined
  defaultName: string
  formulaIsNormal: boolean
  editorContent: EditorContentType
  isDisableSave: () => boolean
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
  input: string
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

const calculate = async ({
  namespaceId,
  variable,
  formulaId,
  name,
  input,
  editorContent,
  formulaType,
  formulaContext
}: CalculateInput): Promise<CalculateOutput> => {
  const variableId = variable ? variable.t.variableId : formulaId
  const meta = { namespaceId, variableId, name, input, type: formulaType }
  const position = editorContent.position
  const ctx = {
    formulaContext,
    meta,
    interpretContext: { ctx: {}, arguments: [] }
  }
  const parseResult = parse({ ctx, position })

  console.log('calculate', {
    ctx,
    parseResult,
    input,
    position,
    newPosition: parseResult.position,
    lastChar: input[position - 1],
    nextChar: input[position],
    newInput: parseResult.input,
    codeFragments: parseResult.codeFragments
  })

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
  formulaName
}: UseFormulaInput): UseFormulaOutput => {
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const formulaContext = editorDataSource.formulaContext
  const formulaIsNormal = formulaType === 'normal'

  const defaultVariable = React.useMemo(
    () => formulaContext?.findVariable(rootId, formulaId),
    [formulaContext, formulaId, rootId]
  )

  const formulaValue = React.useMemo(
    () =>
      defaultVariable?.t.valid
        ? defaultVariable.t.codeFragments.map(fragment => fragment.name).join('')
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

  const realDefinition = maybeRemoveDefinitionEqual(formulaValue, formulaIsNormal)

  const oldCodeFragments = maybeRemoveCodeFragmentsEqual(defaultVariable?.t.codeFragments, formulaIsNormal)
  const defaultContent = defaultVariable?.t.valid
    ? codeFragmentsToJSONContentTotal(oldCodeFragments)
    : buildJSONContentByDefinition(realDefinition)

  const defaultEditorContent: EditorContentType = { content: defaultContent, position: 0 }

  // Refs
  const nameRef = React.useRef(formulaName ?? defaultVariable?.t.name)
  const inputRef = React.useRef(formulaValue)
  const variableRef = React.useRef(defaultVariable)
  const editorContentRef = React.useRef(defaultEditorContent)
  const isDraftRef = React.useRef(defaultVariable?.isDraft() === true)
  const defaultNameRef = React.useRef(contextDefaultName)

  // States
  const [variableT, setVariableT] = React.useState(defaultVariable?.t)
  const [savedVariableT, setSavedVariableT] = React.useState(defaultVariable?.t)
  const [defaultName, setDefaultName] = React.useState(contextDefaultName)
  const [editorContent, setEditorContent] = React.useState<EditorContentType>(defaultEditorContent)
  const [completion, setCompletion] = React.useState<CompletionType>({
    completions: contextCompletions,
    activeCompletion: contextCompletions[0],
    activeCompletionIndex: 0
  })

  // Callbacks
  const doCalculate = React.useCallback(
    async (newName?: string): Promise<void> => {
      if (!formulaContext || !inputRef.current) {
        console.log('formula no input!')
        return
      }

      if (newName) {
        nameRef.current = newName
      }

      const finalInput = inputRef.current
      const inputIsEmpty = ['', '='].includes(finalInput.trim())

      const result = await calculate({
        namespaceId: rootId,
        formulaId,
        variable: variableRef.current,
        formulaType,
        editorContent: editorContentRef.current,
        name: nameRef.current ?? defaultNameRef.current,
        input: finalInput,
        formulaContext
      })

      if (!result) return

      const { interpretResult, newPosition, parseResult, completions, newVariable } = result

      // console.log('calculate result', { newPosition, result })

      setCompletion({ completions, activeCompletion: completions[0], activeCompletionIndex: 0 })

      if (parseResult.valid || inputIsEmpty) {
        const codeFragments = maybeRemoveCodeFragmentsEqual(parseResult.codeFragments, formulaIsNormal)
        const editorContent = { content: codeFragmentsToJSONContentTotal(codeFragments), position: newPosition }
        editorContentRef.current = editorContent
        setEditorContent(editorContent)
        inputRef.current = parseResult.codeFragments.map(fragment => fragment.name).join('')
      }

      if (formulaIsNormal && inputIsEmpty) {
        setVariableT(undefined)
        variableRef.current = undefined
      } else {
        variableRef.current = newVariable
        setVariableT(newVariable.t)
      }

      // console.log({ variable, ref: variableRef.current, finalInput, inputIsEmpty, parseResult, newVariable })

      if (interpretResult.variableValue.success) {
        const type = interpretResult.variableValue.result.type
        const newDefaultName = formulaContext.getDefaultVariableName(rootId, type)
        defaultNameRef.current = newDefaultName
        setDefaultName(newDefaultName)
      }
    },
    [formulaContext, formulaId, formulaIsNormal, formulaType, rootId]
  )

  const handleSelectActiveCompletion = React.useCallback((): void => {
    const currentCompletion = completion.activeCompletion
    if (!currentCompletion) {
      console.error('No active completion!')
      return
    }

    const { position, content } = editorContentRef.current
    let oldContent = fetchJSONContentArray(content)
    let positionChange: number = currentCompletion.positionChange
    const oldContentLast = oldContent[oldContent.length - 1]
    const { prevText, nextText } = positionBasedContentArrayToInput(oldContent, position)

    // console.log('Before replace', {
    //   oldContentLast,
    //   oldContent,
    //   prevText,
    //   currentPosition: latestPosition.current,
    //   position,
    //   nextText,
    //   positionChange,
    //   currentCompletion
    // })

    if (oldContentLast && prevText && currentCompletion.replacements.length) {
      // console.log('start replace', {
      //   oldContentLast,
      //   currentCompletion,
      //   currentContent,
      //   prevText,
      //   position,
      //   nextText,
      //   currentPosition: latestPosition.current
      // })
      if (currentCompletion.replacements.includes(prevText)) {
        positionChange -= prevText.length
        oldContent = []
      } else {
        const replacement = currentCompletion.replacements.find(replacement => prevText.endsWith(replacement))
        if (!replacement) {
          console.info('replacement not found 1', { prevText, currentCompletion, nextText })
        } else {
          positionChange = positionChange - prevText.length + (replacement.length as number)
          const newText = prevText.substring(0, prevText.length - replacement.length)
          oldContent = [
            attrsToJSONContent({
              display: () => newText,
              value: newText,
              code: 'ANY',
              type: 'any',
              error: '',
              hidden: false
            })
          ]
        }
      }
    }

    const nextContents = nextText
      ? [
          attrsToJSONContent({
            display: () => nextText,
            value: nextText,
            code: 'ANY',
            type: 'any',
            error: '',
            hidden: false
          })
        ]
      : []

    const completionContents: JSONContent[] = codeFragmentToJSONContentArray(currentCompletion.codeFragment)
    const newContent: JSONContent[] = [...oldContent, ...completionContents, ...nextContents]
    const finalContent = buildJSONContentByArray(newContent)
    const finalInput = contentArrayToInput(fetchJSONContentArray(finalContent))
    const finalInputAfterEqual = formulaIsNormal ? `=${finalInput}` : finalInput
    const newPosition = editorContentRef.current.position + positionChange

    const newEditorContent: EditorContentType = { content: finalContent, position: newPosition }
    editorContentRef.current = newEditorContent
    setEditorContent(newEditorContent)
    inputRef.current = finalInputAfterEqual

    console.log('selectCompletion', {
      finalContent,
      currentCompletion,
      newPosition,
      editorContent: editorContentRef.current,
      newContent,
      finalInput,
      finalInputAfterEqual
    })
    void doCalculate()
  }, [completion.activeCompletion, doCalculate, formulaIsNormal])

  const isDisableSave = React.useCallback((): boolean => {
    if (!formulaContext) return true
    if (!variableRef.current) return true
    if (!(nameRef.current ?? defaultNameRef.current)) return true
    // if (!inputRef.current) return true
    // if (error && ['name_unique', 'name_check', 'fatal'].includes(error.type)) return true

    return false
  }, [formulaContext])

  const doHandleSave = React.useCallback(async (): Promise<void> => {
    // console.log({ variable: variableRef.current, name, defaultName })
    if (!variableRef.current) {
      updateFormula(undefined)
      return
    }

    if (isDisableSave()) return

    if (!nameRef.current) {
      nameRef.current = defaultNameRef.current
    }

    const v = variableRef.current
    v.t.definition = inputRef.current!
    v.t.name = nameRef.current!

    updateFormula(v)
    await v.save()

    variableRef.current = v
    isDraftRef.current = false
    setVariableT(v.t)
    setSavedVariableT(v.t)

    console.log('save ...', { input: inputRef.current, variable: variableRef.current, formulaContext })
  }, [formulaContext, isDisableSave, updateFormula])

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
        subscribeId: `${rootId},${formulaId}`
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
        subscribeId: `${rootId},${formulaId}`
      }
    )
    return () => listener.unsubscribe()
  }, [doHandleSave, formulaId, rootId])

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaEditorUpdateEventTrigger,
      event => {
        // console.log('update subscribe', { event })
        const newInput = event.payload.input
        const newPosition = event.payload.position
        const value = formulaIsNormal ? `=${newInput}` : newInput
        editorContentRef.current = { ...editorContentRef.current, position: newPosition }
        inputRef.current = value
        void doCalculate()
      },
      {
        eventId: `${rootId},${formulaId}`,
        subscribeId: `${rootId},${formulaId}`
      }
    )
    return () => listener.unsubscribe()
  }, [doCalculate, formulaId, formulaIsNormal, rootId])

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaUpdated,
      e => {
        variableRef.current = e.payload
        setVariableT(e.payload.t)
      },
      {
        eventId: `${rootId},${formulaId}`,
        subscribeId: `${rootId},${formulaId}`
      }
    )
    return () => listener.unsubscribe()
  }, [formulaId, rootId])

  return {
    variableT,
    savedVariableT,
    isDraft: isDraftRef.current,
    doCalculate,
    name: nameRef.current,
    isDisableSave,
    doHandleSave,
    formulaIsNormal,
    defaultName,
    editorContent,
    handleSelectActiveCompletion,
    completion,
    setCompletion
  }
}
