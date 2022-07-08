import { FORMULA_FEATURE_CONTROL } from '../../context'
import { ButtonClass } from '../../controls'
import { createFunctionClause } from '../../type'

/**
 * @source
 */
export const controlButton = createFunctionClause({
  name: 'Button',
  async: false,
  pure: true,
  persist: false,
  lazy: false,
  acceptError: false,
  effect: false,
  feature: FORMULA_FEATURE_CONTROL,
  examples: [{ input: '=Button("name")', output: null }],
  description: 'Build button',
  group: 'core',
  args: [
    { name: 'name', type: 'string' },
    { name: 'onClick', type: 'Function' }
  ],
  testCases: [],
  returns: 'Button',
  chain: false,
  reference: (ctx, { result: name }, fn) => {
    const buttonResult = new ButtonClass(ctx, { name, fn })
    return { result: buttonResult, type: 'Button' }
  }
})
