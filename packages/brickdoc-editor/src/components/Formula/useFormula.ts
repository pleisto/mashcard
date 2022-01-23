import {
  buildVariable,
  Completion,
  ContextInterface,
  ErrorMessage,
  FormulaSourceType,
  interpret,
  InterpretResult,
  parse,
  ParseResult,
  VariableClass,
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
  variable: VariableInterface | undefined
  doCalculate: () => Promise<void>
  setName: (name: string) => void
  name: string | undefined
  error: ErrorMessage | undefined
  defaultName: string
  formulaIsNormal: boolean
  content: JSONContent | undefined
  position: number
  isDisableSave: () => boolean
  doHandleSave: () => Promise<void>
  completions: Completion[]
  handleSelectActiveCompletion: () => void
  setActiveCompletion: (completion: Completion) => void
  activeCompletionIndex: number
  setActiveCompletionIndex: (index: number) => void
  activeCompletion: Completion | undefined
}

export interface CalculateInput {
  namespaceId: string
  formulaId: string
  variable: VariableInterface | undefined
  formulaType: FormulaSourceType
  name: string
  input: string
  position: number
  formulaContext: ContextInterface
}

export interface CalculateOutput {
  completions: Completion[]
  newVariable: VariableInterface
  errors: ErrorMessage[]
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
  position,
  formulaType,
  formulaContext
}: CalculateInput): Promise<CalculateOutput> => {
  const variableId = variable ? variable.t.variableId : formulaId
  const meta = { namespaceId, variableId, name, input, type: formulaType }
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
    errors: parseResult.errorMessages,
    parseResult,
    interpretResult
  }
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

  const [variable, updateVariable] = React.useState(formulaContext?.findVariable(rootId, formulaId))

  const formulaIsNormal = formulaType === 'normal'

  const contextDefaultName = formulaContext ? formulaContext.getDefaultVariableName(rootId, 'any') : ''

  const formulaValue = variable?.t.valid
    ? variable.t.codeFragments.map(fragment => fragment.name).join('')
    : variable?.t.definition
  const realDefinition = maybeRemoveDefinitionEqual(formulaValue, formulaIsNormal)

  const oldCodeFragments = maybeRemoveCodeFragmentsEqual(variable?.t.codeFragments, formulaIsNormal)
  const defaultContent = variable?.t.valid
    ? codeFragmentsToJSONContentTotal(oldCodeFragments)
    : buildJSONContentByDefinition(realDefinition)

  const contextCompletions =
    formulaContext && (formulaIsNormal || formulaValue?.startsWith('='))
      ? formulaContext.completions(rootId, variable?.t.variableId)
      : []

  const [completions, setCompletions] = React.useState(contextCompletions)

  const [name, setName] = React.useState(formulaName ?? variable?.t.name)
  const [defaultName, setDefaultName] = React.useState(contextDefaultName)

  const inputRef = React.useRef(formulaValue)
  const variableRef = React.useRef(variable)

  const [error, setError] = React.useState<ErrorMessage | undefined>()
  const [content, setContent] = React.useState<JSONContent | undefined>(defaultContent)
  const [activeCompletion, setActiveCompletion] = React.useState<Completion | undefined>(completions[0])
  const [activeCompletionIndex, setActiveCompletionIndex] = React.useState<number>(0)

  const [position, setPosition] = React.useState(0)

  const doCalculate = React.useCallback(async (): Promise<void> => {
    if (!formulaContext || !inputRef.current) {
      console.log('formula no input!')
      return
    }

    const finalName = name ?? defaultName
    const finalInput = inputRef.current
    const inputIsEmpty = ['', '='].includes(finalInput.trim())

    const result = await calculate({
      namespaceId: rootId,
      formulaId,
      variable,
      formulaType,
      position,
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
    //   parseResult,
    //   activeCompletion,
    //   latestPosition: latestPosition.current,
    //   position,
    //   newPosition,
    //   result,
    //   latestActiveCompletion: latestActiveCompletion.current
    // })

    setCompletions(completions)
    setActiveCompletion(completions[0])
    setPosition(newPosition)

    if (parseResult.valid || inputIsEmpty) {
      const codeFragments = maybeRemoveCodeFragmentsEqual(parseResult.codeFragments, formulaIsNormal)
      setContent(codeFragmentsToJSONContentTotal(codeFragments))
      inputRef.current = parseResult.codeFragments.map(fragment => fragment.name).join('')
    }

    if (inputIsEmpty) {
      updateVariable(undefined)
      variableRef.current = undefined
      setError(undefined)
    } else {
      const newVariableClone = new VariableClass({ t: newVariable.t, formulaContext })
      variableRef.current = newVariableClone
      updateVariable(newVariableClone)
      setError(errors.length ? errors[0] : undefined)
    }

    console.log({ variable, ref: variableRef.current, finalInput, inputIsEmpty, parseResult, newVariable })

    if (interpretResult.variableValue.success) {
      const type = interpretResult.variableValue.result.type
      setDefaultName(formulaContext.getDefaultVariableName(rootId, type))
    }
  }, [
    defaultName,
    formulaContext,
    formulaId,
    formulaIsNormal,
    formulaType,
    name,
    position,
    rootId,
    updateVariable,
    variable
  ])

  const handleSelectActiveCompletion = React.useCallback((): void => {
    const currentCompletion = activeCompletion
    const currentContent = content

    if (!currentCompletion) {
      console.error('No active completion!')
      return
    }

    let oldContent = fetchJSONContentArray(currentContent)
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
    const newPosition = position + positionChange

    setContent(finalContent)
    setPosition(newPosition)
    inputRef.current = finalInputAfterEqual

    console.log('selectCompletion', {
      finalContent,
      currentCompletion,
      newPosition,
      content,
      newContent,
      finalInput,
      finalInputAfterEqual
    })
    void doCalculate()
  }, [activeCompletion, content, doCalculate, formulaIsNormal, position])

  const isDisableSave = React.useCallback((): boolean => {
    if (!formulaContext) return true
    if (!variableRef.current) return true
    if (!(name ?? defaultName)) return true
    // if (!inputRef.current) return true
    // if (error && ['name_unique', 'name_check', 'fatal'].includes(error.type)) return true

    return false
  }, [defaultName, formulaContext, name])

  const doHandleSave = React.useCallback(async (): Promise<void> => {
    console.log({ variable: variableRef.current, name, defaultName })
    if (!variableRef.current) {
      updateFormula(undefined)
      return
    }

    if (isDisableSave()) return
    const finalName = name ?? defaultName

    variableRef.current!.t.name = finalName
    variableRef.current!.t.definition = inputRef.current!
    updateFormula(variableRef.current!)

    await variableRef.current!.save()
    setName(finalName)
    updateVariable(variableRef.current!)

    console.log('save ...', { input: inputRef.current!, updateVariable, formulaContext })
  }, [defaultName, formulaContext, isDisableSave, name, updateFormula, updateVariable])

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaKeyboardEventTrigger,
      event => {
        let newIndex: number
        switch (event.payload.key) {
          case 'ArrowUp':
            newIndex = activeCompletionIndex - 1 < 0 ? completions.length - 1 : activeCompletionIndex - 1
            setActiveCompletion(completions[newIndex])
            setActiveCompletionIndex(newIndex)
            break
          case 'ArrowDown':
            newIndex = activeCompletionIndex + 1 > completions.length - 1 ? 0 : activeCompletionIndex + 1
            setActiveCompletion(completions[newIndex])
            setActiveCompletionIndex(newIndex)
            break
          case 'Tab':
            handleSelectActiveCompletion()
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
  }, [activeCompletionIndex, completions, doHandleSave, formulaId, handleSelectActiveCompletion, rootId])

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
        setPosition(newPosition)
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
        const variableClone = new VariableClass({ t: e.payload.t, formulaContext: e.payload.formulaContext })
        variableRef.current = variableClone
        updateVariable(variableClone)
      },
      {
        eventId: `${rootId},${formulaId}`,
        subscribeId: `${rootId},${formulaId}`
      }
    )
    return () => listener.unsubscribe()
  }, [formulaId, rootId, updateVariable])

  return {
    variable,
    doCalculate,
    setName,
    name,
    error,
    isDisableSave,
    doHandleSave,
    formulaIsNormal,
    defaultName,
    content,
    position,
    completions,
    handleSelectActiveCompletion,
    setActiveCompletion,
    activeCompletionIndex,
    setActiveCompletionIndex,
    activeCompletion
  }
}
