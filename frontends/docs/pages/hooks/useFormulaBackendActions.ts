import { useFormulaCreateMutation, useFormulaDeleteMutation, useFormulaUpdateMutation } from '@/BrickdocGraphQL'
import { BackendActions } from '@brickdoc/formula'

export function useFormulaBackendActions(): BackendActions {
  const [creation] = useFormulaCreateMutation()
  const [update] = useFormulaUpdateMutation()
  const [deletion] = useFormulaDeleteMutation()

  return {
    createVariable: async ({
      t: { name, variableId, level, namespaceId, version, kind, definition, view, variableValue, variableDependencies }
    }) => {
      // console.log('create', { variableValue })
      const { errors } = await creation({
        variables: {
          input: {
            blockId: namespaceId,
            id: variableId,
            cacheValue: variableValue.result,
            name,
            kind,
            definition,
            version,
            level,
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
      t: { name, variableId, level, namespaceId, version, kind, definition, view, variableValue, variableDependencies }
    }) => {
      // console.log('update', { variableValue })
      const { errors } = await update({
        variables: {
          input: {
            blockId: namespaceId,
            id: variableId,
            name,
            kind,
            level,
            version,
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
