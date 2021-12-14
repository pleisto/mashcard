import { useFormulaCreateMutation, useFormulaDeleteMutation, useFormulaUpdateMutation } from '@/BrickdocGraphQL'
import { BackendActions } from '@brickdoc/formula'

export function useFormulaBackendActions(): BackendActions {
  const [creation] = useFormulaCreateMutation()
  const [update] = useFormulaUpdateMutation()
  const [deletion] = useFormulaDeleteMutation()

  return {
    createVariable: async ({
      t: { name, variableId, namespaceId, definition, view, variableValue, variableDependencies }
    }) => {
      const { errors } = await creation({
        variables: {
          input: {
            blockId: namespaceId,
            id: variableId,
            cacheValue: variableValue.result,
            name,
            definition,
            view,
            dependencyIds: variableDependencies.map(dependency => dependency.variableId)
          }
        }
      })

      return {
        success: !errors || errors.length === 0
      }
    },
    updateVariable: async ({
      t: { name, variableId, namespaceId, definition, view, variableValue, variableDependencies }
    }) => {
      const { errors } = await update({
        variables: {
          input: {
            blockId: namespaceId,
            id: variableId,
            name,
            cacheValue: variableValue.result,
            view,
            dependencyIds: variableDependencies.map(dependency => dependency.variableId),
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
