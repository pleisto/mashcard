import { TestCaseInterface } from '../../testType'
import { createFunctionClause } from '../../../types'

const functionClauses = [
  createFunctionClause({
    name: 'PLUS',
    async: false,
    pure: true,
    acceptError: false,
    effect: false,
    lazy: false,
    persist: false,
    args: [
      { type: 'number', name: 'a' },
      { type: 'number', name: 'b' }
    ],
    examples: [{ input: '=1', output: { type: 'number', result: 1 } }],
    description: '',
    group: 'custom',
    returns: 'number',
    testCases: [],
    chain: false,
    reference: (ctx, a, b) => ({ type: 'number', result: a.result + b.result })
  })
]

export const FunctionCompleteTestCase: TestCaseInterface = {
  name: 'functionComplete',
  testCases: {
    functionClauses,
    completeTestCases: [
      {
        definitionWithCursor: '=ab$',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'ab' },
        firstCompletion: {
          name: 'ABS',
          kind: 'function',
          replacements: [
            { matcher: 'core::ABS', value: 'ABS()', positionOffset: -1 },
            { matcher: 'core::AB', value: 'ABS()', positionOffset: -1 },
            { matcher: 'core::A', value: 'ABS()', positionOffset: -1 },
            { matcher: 'core::', value: 'ABS()', positionOffset: -1 },
            { matcher: 'ABS', value: 'ABS()', positionOffset: -1 },
            { matcher: 'AB', value: 'ABS()', positionOffset: -1 },
            { matcher: 'A', value: 'ABS()', positionOffset: -1 }
          ],
          flags: ['nameStartsWith', 'function']
        },
        completes: [{ definitionWithCursor: '=ABS($)' }]
      },
      {
        definitionWithCursor: '=1 + AB$ ',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'AB' },
        firstCompletion: { name: 'ABS', flags: ['nameStartsWith', 'function'] },
        completes: [{ definitionWithCursor: '=1 + ABS($) ' }]
      },
      {
        definitionWithCursor: '=1 + abs$ ',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'abs' },
        firstCompletion: { name: 'ABS', flags: ['nameEqual', 'function'] },
        completes: [{ definitionWithCursor: '=1 + ABS($) ' }]
      },
      {
        definitionWithCursor: '=1 + ABS$ ',
        firstNonSpaceCodeFragment: { code: 'FunctionName', display: 'ABS' },
        firstCompletion: { name: 'ABS', flags: ['nameEqual', 'function'] },
        completes: [{ definitionWithCursor: '=1 + ABS($) ' }]
      },
      {
        definitionWithCursor: '=1 + core::ab$ + 1',
        firstNonSpaceCodeFragment: { code: 'Function', display: 'ab' },
        secondNonSpaceCodeFragment: { code: 'FunctionGroup', display: 'core::' },
        firstCompletion: {
          name: 'ABS',
          kind: 'function',
          flags: ['functionNameStartsWith', 'function']
        },
        completes: [{ definitionWithCursor: '=1 + ABS($) + 1' }]
      },
      {
        definitionWithCursor: '=1 + core:: ab$ + 1',
        firstNonSpaceCodeFragment: { code: 'Function', display: 'ab' },
        secondNonSpaceCodeFragment: { code: 'FunctionGroup', display: 'core:: ' },
        firstCompletion: {
          name: 'ABS',
          kind: 'function',
          flags: ['functionNameStartsWith', 'function']
        },
        completes: [{ definitionWithCursor: '=1 + core:: ABS($) + 1' }]
      },
      {
        definitionWithCursor: '=1 + core::abs$ + 1',
        firstNonSpaceCodeFragment: { code: 'Function', display: 'abs' },
        firstCompletion: {
          name: 'ABS',
          kind: 'function',
          flags: ['functionNameEqual', 'function']
        },
        completes: [{ definitionWithCursor: '=1 + ABS($) + 1' }]
      },
      {
        definitionWithCursor: '=1 + custom::P$ + 1',
        firstNonSpaceCodeFragment: { code: 'Function', display: 'P' },
        secondNonSpaceCodeFragment: { code: 'FunctionGroup', display: 'custom::' },
        firstCompletion: {
          name: 'PLUS',
          kind: 'function',
          replacements: [
            { matcher: 'custom::PLUS', value: 'custom::PLUS()', positionOffset: -1 },
            { matcher: 'custom::PLU', value: 'custom::PLUS()', positionOffset: -1 },
            { matcher: 'custom::PL', value: 'custom::PLUS()', positionOffset: -1 },
            { matcher: 'custom::P', value: 'custom::PLUS()', positionOffset: -1 },
            { matcher: 'custom::', value: 'custom::PLUS()', positionOffset: -1 }
          ],
          flags: ['functionNameStartsWith', 'function']
        },
        completes: [{ definitionWithCursor: '=1 + custom::PLUS($) + 1' }]
      },
      {
        definitionWithCursor: '=1 + custom::PLUS$ + 1',
        firstNonSpaceCodeFragment: { code: 'Function', display: 'PLUS' },
        secondNonSpaceCodeFragment: { code: 'FunctionGroup', display: 'custom::' },
        firstCompletion: {
          name: 'PLUS',
          flags: ['functionNameEqual', 'function']
        },
        completes: [{ definitionWithCursor: '=1 + custom::PLUS($) + 1' }]
      },
      {
        definitionWithCursor: '=1 + custom:: PLUS$ + 1',
        todoMessage: 'fix space in function group',
        firstNonSpaceCodeFragment: { code: 'Function', display: 'PLUS' },
        secondNonSpaceCodeFragment: { code: 'FunctionGroup', display: 'custom:: ' },
        firstCompletion: {
          name: 'PLUS',
          flags: ['functionNameEqual', 'function']
        },
        completes: [{ definitionWithCursor: '=1 + custom:: PLUScustom::PLUS($) + 1' }]
      },
      {
        definitionWithCursor: '= 1.$ ',
        firstNonSpaceCodeFragment: { code: 'Dot' },
        secondNonSpaceCodeFragment: { code: 'NumberLiteral' },
        firstCompletion: {
          name: 'toArray',
          flags: ['chainTypeMatched', 'function']
        },
        completes: [{ definitionWithCursor: '= 1.toArray($) ' }]
      },
      {
        definitionWithCursor: '= 1.2.$ ',
        firstNonSpaceCodeFragment: { code: 'Dot' },
        secondNonSpaceCodeFragment: { code: 'NumberLiteral' },
        firstCompletion: {
          name: 'toArray',
          flags: ['chainTypeMatched', 'function']
        },
        completes: [{ definitionWithCursor: '= 1.2.toArray($) ' }]
      }
    ]
  }
}
