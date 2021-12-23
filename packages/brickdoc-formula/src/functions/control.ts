import {
  FunctionContext,
  BasicFunctionClause,
  ErrorResult,
  ButtonResult,
  StringResult,
  FunctionResult,
  SwitchResult,
  BooleanResult,
  ArrayResult,
  SelectResult,
  SelectOption
} from '..'
import { ButtonClass } from '../controls/button'
import { SelectClass } from '../controls/select'
import { SwitchClass } from '../controls/switch'
import { FORMULA_FEATURE_CONTROL } from '../context'

export const Button = (
  ctx: FunctionContext,
  { result: name }: StringResult,
  fn: FunctionResult
): ButtonResult | ErrorResult => {
  const buttonResult = new ButtonClass(ctx, { name, fn })
  return { result: buttonResult, type: 'Button' }
}

export const Switch = (
  ctx: FunctionContext,
  { result: isSelected }: BooleanResult,
  fn: FunctionResult
): SwitchResult | ErrorResult => {
  const switchResult = new SwitchClass(ctx, { isSelected, fn })
  return { result: switchResult, type: 'Switch' }
}

export const Select = (
  ctx: FunctionContext,
  { result, subType }: ArrayResult,
  fn: FunctionResult
): SelectResult | ErrorResult => {
  if (!['string', 'number', 'void'].includes(subType)) {
    return { type: 'Error', result: 'Select expects an array of strings', errorKind: 'runtime' }
  }

  const options = result.map(v => String(v.result))

  if (options.length === 0) {
    return { type: 'Error', result: 'Select expects non empty options', errorKind: 'runtime' }
  }

  const selectResult = new SelectClass(ctx, {
    value: options[0],
    options: options as [SelectOption, ...SelectOption[]],
    fn
  })
  return { result: selectResult, type: 'Select' }
}

export const CORE_CONTROL_CLAUSES: Array<BasicFunctionClause<'Button' | 'Select' | 'Switch'>> = [
  {
    name: 'Button',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    feature: FORMULA_FEATURE_CONTROL,
    examples: [{ input: '=Button("name")', output: null }],
    description: 'Build button',
    group: 'core',
    args: [
      {
        name: 'name',
        type: 'string'
      },
      {
        name: 'onClick',
        type: 'Function'
      }
    ],
    testCases: [],
    returns: 'Button',
    chain: false,
    reference: Button
  },
  {
    name: 'Switch',
    async: false,
    pure: false,
    lazy: false,
    feature: FORMULA_FEATURE_CONTROL,
    acceptError: false,
    effect: false,
    examples: [{ input: '=Switch("name")', output: null }],
    description: 'Build switch',
    group: 'core',
    args: [
      {
        name: 'name',
        type: 'boolean'
      },
      {
        name: 'onChange',
        type: 'Function'
      }
    ],
    testCases: [],
    returns: 'Switch',
    chain: false,
    reference: Switch
  },
  {
    name: 'Select',
    async: false,
    pure: false,
    lazy: false,
    feature: FORMULA_FEATURE_CONTROL,
    acceptError: false,
    effect: false,
    examples: [{ input: '=Select("name")', output: null }],
    description: 'Build select',
    group: 'core',
    args: [
      {
        name: 'options',
        type: 'Array'
      },
      {
        name: 'onChange',
        type: 'Function'
      }
    ],
    testCases: [],
    returns: 'Select',
    chain: false,
    reference: Select
  }
]
