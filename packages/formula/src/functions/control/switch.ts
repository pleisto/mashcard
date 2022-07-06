import { FORMULA_FEATURE_CONTROL } from '../../context'
import { SwitchClass } from '../../controls'
import { createFunctionClause } from '../../type'

/**
 * @source
 */
export const controlSwitch = createFunctionClause({
  name: 'Switch',
  async: false,
  pure: true,
  persist: false,
  lazy: false,
  feature: FORMULA_FEATURE_CONTROL,
  acceptError: false,
  effect: false,
  examples: [{ input: '=Switch("name")', output: null }],
  description: 'Build switch',
  group: 'core',
  args: [
    { name: 'name', type: 'boolean' },
    { name: 'onChange', type: 'Function' }
  ],
  testCases: [],
  returns: 'Switch',
  chain: false,
  reference: (ctx, { result: checked }, fn) => {
    const switchResult = new SwitchClass(ctx, { checked, fn })
    return { result: switchResult, type: 'Switch' }
  }
})
