import { buildVariable, ContextInterface, interpret, parse, VariableInterface, View } from '@brickdoc/formula'
import { v4 as uuid } from 'uuid'
import { debounce } from 'lodash-es'
import React from 'react'
import { FormulaContextVar } from '../../reactiveVars'
import { DocMeta } from '../DocumentContentPage'

const parseVariableName = ({
  formulaContext,
  namespaceId,
  name
}: {
  formulaContext: ContextInterface
  name: string
  namespaceId: string
}): string => {
  const variable = formulaContext.findVariableByName(namespaceId, name)
  if (variable) {
    return `$${namespaceId}@${variable.t.variableId}`
  } else {
    return `$${name}`
  }
}

const transformUserInput = ({
  namespaceId,
  input,
  formulaContext
}: {
  input: string
  formulaContext: ContextInterface
  namespaceId: string
}): string => {
  const inputAfterTransformVariable = input.replace(/\$([a-zA-Z0-9_-]+)/g, (a, name): string => {
    return parseVariableName({ namespaceId, name, formulaContext })
  })
  return `=${inputAfterTransformVariable}`
}

export function useFormulaContextGetter(docMeta: DocMeta) {
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
      if (!blockId.current) return null
      return data.current?.findVariable(blockId.current, variableId)
    },
    removeVariable: (variableId: string) => {
      if (!blockId.current) return null
      return data.current?.removeVariable(blockId.current, variableId)
    },
    calculate: debounce(
      async (
        id: string | undefined,
        name: string,
        input: string,
        formulaContext: ContextInterface,
        updateResult: React.Dispatch<React.SetStateAction<any>>,
        updateVariable: React.Dispatch<React.SetStateAction<VariableInterface | undefined>>,
        updateError: React.Dispatch<
          React.SetStateAction<
            | {
                type: string
                message: string
              }
            | undefined
          >
        >,
        updateValue: React.Dispatch<React.SetStateAction<string | undefined>>
      ) => {
        const namespaceId = blockId.current ?? docMeta.id ?? ''
        const variableId = id ?? uuid()
        const meta = { namespaceId, variableId, name, input: transformUserInput({ namespaceId, input, formulaContext }) }
        const view: View = {}
        const parseInput = {
          formulaContext,
          meta
        }
        const parseResult = parse(parseInput)

        if (parseResult.success) {
          const interpretResult = await interpret({ cst: parseResult.cst, formulaContext, meta })

          if (interpretResult.success) {
            const newInput = parseResult.codeFragments.map(fragment => fragment.name).join(' ')
            const variable = buildVariable({ formulaContext, meta, parseResult, interpretResult, view })
            updateVariable(variable)
            updateValue(newInput)
            updateError(undefined)
            updateResult(interpretResult.result.display)
          } else {
            updateError({
              type: 'interpret',
              message: interpretResult.errorMessages[0].message
            })
          }
        } else {
          updateError({
            type: 'Syntax error',
            message: parseResult.errorMessages[0].message
          })
        }
      },
      300
    )
  }
}
