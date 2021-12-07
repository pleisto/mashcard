import { buildVariable, CodeFragment, Completion, ContextInterface, interpret, parse, VariableInterface, View } from '@brickdoc/formula'
import { debounce } from 'lodash-es'
import React from 'react'
import { FormulaContextVar } from '../../reactiveVars'
import { DocMeta } from '../DocumentContentPage'
import { FormulaOptions } from 'packages/brickdoc-editor/src/extensions'
import { v4 as uuid } from 'uuid'
import { JSONContent } from '@tiptap/core'

export function useFormulaContextGetter(docMeta: DocMeta): FormulaOptions['formulaContextActions'] {
  const context = FormulaContextVar()
  const data = React.useRef(context)
  const blockId = React.useRef(docMeta.id)

  React.useEffect(() => {
    blockId.current = docMeta.id
  }, [docMeta.id])

  React.useEffect(() => {
    data.current = context
  }, [context])

  return {
    getFormulaContext: () => data.current,
    getVariable: (variableId: string) => {
      if (!blockId.current) return undefined
      return data.current?.findVariable(blockId.current, variableId)
    },
    removeVariable: (variableId: string) => {
      if (!blockId.current) return null
      return data.current?.removeVariable(blockId.current, variableId)
    },
    calculate: debounce(
      async ({
        variable,
        name,
        input,
        codeFragmentsToJSONContent,
        formulaContext,
        updateVariable,
        updateCompletions,
        updateError,
        updateInput,
        updateDefaultName,
        updateContent
      }: {
        variable: VariableInterface | undefined
        name: string
        input: string
        codeFragmentsToJSONContent: (codeFragments: CodeFragment[] | undefined) => JSONContent | undefined
        formulaContext: ContextInterface
        updateVariable: React.Dispatch<React.SetStateAction<VariableInterface | undefined>> | undefined
        updateError: React.Dispatch<React.SetStateAction<{ type: string; message: string } | undefined>>
        updateInput: React.Dispatch<React.SetStateAction<string | undefined>>
        updateCompletions: React.Dispatch<React.SetStateAction<Completion[]>>
        updateDefaultName: React.Dispatch<React.SetStateAction<string>>
        updateContent: React.Dispatch<React.SetStateAction<JSONContent | undefined>>
      }) => {
        const namespaceId = blockId.current ?? docMeta.id ?? ''
        const variableId = variable ? variable.t.variableId : uuid()
        const meta = { namespaceId, variableId, name, input }
        const view: View = {}
        const parseInput = { formulaContext, meta }
        const parseResult = parse(parseInput)

        console.log({ parseResult, input })

        updateCompletions(parseResult.completions)

        if (parseResult.success) {
          const interpretResult = await interpret({ cst: parseResult.cst, formulaContext, meta })
          const content = codeFragmentsToJSONContent(parseResult.codeFragments)
          updateContent(content)
          const newInput = parseResult.codeFragments.map(fragment => fragment.name)
          updateInput(newInput.join(''))

          if (interpretResult.success) {
            const variable = buildVariable({ formulaContext, meta, parseResult, interpretResult, view })
            updateVariable?.(variable)
            updateError(undefined)
            const type = interpretResult.result.type
            const defaultName = formulaContext.getDefaultVariableName(namespaceId, type)
            updateDefaultName(defaultName)
          } else {
            updateError(interpretResult.errorMessages[0])
          }
        } else {
          updateError(parseResult.errorMessages[0])
        }
      },
      300
    )
  }
}
