import { useFormulaCreateMutation, useFormulaDeleteMutation, useFormulaUpdateMutation } from '@/BrickdocGraphQL'
import { BackendActions, SuccessVariableValue } from '@brickdoc/formula'

export function useFormulaBackendActions(): BackendActions {
  const [creation] = useFormulaCreateMutation()
  const [update] = useFormulaUpdateMutation()
  const [deletion] = useFormulaDeleteMutation()

  return {
    createVariable: async ({ t: { name, variableId, namespaceId, definition, view, variableValue } }) => {
      const { value, type } = variableValue as SuccessVariableValue
      const { errors } = await creation({
        variables: {
          input: {
            blockId: namespaceId,
            id: variableId,
            cacheValue: {
              type,
              value
            },
            name,
            definition,
            view,
            dependencyIds: []
          }
        }
      })

      return {
        success: !errors || errors.length === 0
      }
    },
    updateVariable: async ({ t: { name, variableId, namespaceId, definition, view, variableValue } }) => {
      const { value, type } = variableValue as SuccessVariableValue

      const { errors } = await update({
        variables: {
          input: {
            blockId: namespaceId,
            id: variableId,
            name,
            cacheValue: {
              type,
              value
            },
            view,
            dependencyIds: [],
            definition
          }
        }
      })

      return {
        success: !errors || errors.length === 0
      }
    },
    deleteVariable: async ({ t: { variableId, namespaceId } }) => {
      const { errors } = await deletion({
        variables: {
          input: {
            blockId: namespaceId,
            id: variableId
          }
        }
      })

      return {
        success: !errors || errors.length === 0
      }
    }
  }
}
