import { createFunctionClause } from '../../types'

/**
 * @source
 */
export const coreSet = createFunctionClause({
  name: 'Set',
  async: false,
  pure: false,
  lazy: true,
  persist: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=Set(A, A+1)', output: null }],
  description: 'Set variable',
  group: 'core',
  args: [
    { name: 'name', type: 'Reference' },
    { name: 'body', type: 'Cst' }
  ],
  testCases: [],
  returns: 'Function',
  chain: false,
  reference: (ctx, ref, cst) => {
    const reference = ref.result
    if (reference.kind === 'variable') {
      const variable = ctx.formulaContext.findVariableById(reference.namespaceId, reference.variableId)
      if (!variable) {
        return { type: 'Error', errorKind: 'runtime', result: 'Variable not found' }
      }
    }
    return { type: 'Function', result: [{ name: 'Set', args: [ref, cst] }] }
  }
})
