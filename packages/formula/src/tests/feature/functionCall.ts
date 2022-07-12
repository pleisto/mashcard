import { createFunctionClause } from '../../type'
import { TestCaseInterface } from '../testType'

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
  }),
  createFunctionClause({
    name: 'FORTY_TWO',
    async: false,
    pure: true,
    persist: false,
    acceptError: false,
    effect: false,
    lazy: false,
    args: [],
    examples: [{ input: '=1', output: { type: 'number', result: 42 } }],
    description: '',
    group: 'custom',
    returns: 'number',
    testCases: [],
    chain: false,
    reference: ctx => ({ type: 'number', result: 42 })
  })
]

export const FunctionCallTestCase: TestCaseInterface = {
  name: 'functionCall',
  testCases: {
    functionClauses,
    successTestCases: [
      { definition: '= ABS(1/0)', result: 'errors.interpret.runtime.division_by_zero' },
      {
        definition: '=Abs(-1) + abs(1) + ABS(1) + core::ABS(-1)',
        result: 4,
        expected: [{ key: 'codeFragments', matchType: 'toMatchSnapshot' }]
      },
      { definition: '=ABS(IF(false, -3, -4))', result: 4 },
      { definition: '=AVERAGE([1])', result: 1, label: 'TODO spread operator' },
      { definition: '=AVERAGE([1, 2, 3])', result: 2, label: 'spread operator' },
      {
        definition: '=custom::PLUS(1, 1)',
        result: 2,
        expected: [
          { key: 'functionDependencies', matchType: 'toMatchObject', match: [{ name: functionClauses[0].name }] },
          {
            key: 'codeFragments',
            matchType: 'toMatchObject',
            match: [
              { code: 'Equal' },
              { code: 'FunctionGroup', display: 'custom::', attrs: { kind: 'Function' } },
              { code: 'Function', display: 'PLUS', attrs: { kind: 'Function' } },
              {
                code: 'LParen',
                meta: {
                  args: [
                    { name: 'a', type: 'number' },
                    { name: 'b', type: 'number' }
                  ],
                  endCode: 'RParen'
                }
              },
              { code: 'NumberLiteral', display: '1', type: 'number' },
              { code: 'Comma', display: ',' },
              { code: 'Space' },
              { code: 'NumberLiteral', display: '1' },
              {
                code: 'RParen',
                meta: {
                  args: [
                    { name: 'a', type: 'number' },
                    { name: 'b', type: 'number' }
                  ],
                  endCode: 'RParen'
                }
              }
            ]
          }
        ]
      },
      {
        definition: '=custom::FORTY_TWO()',
        result: 42,
        expected: [
          {
            key: 'codeFragments',
            matchType: 'toMatchObject',
            match: [
              { code: 'Equal' },
              { code: 'FunctionGroup', display: 'custom::', attrs: { kind: 'Function' } },
              { code: 'Function', display: 'FORTY_TWO', attrs: { kind: 'Function' } },
              { code: 'LParen', meta: { args: [], endCode: 'RParen' } },
              { code: 'RParen', meta: { args: [], endCode: 'RParen' } }
            ]
          }
        ]
      },
      {
        definition: '=custom::FORTY_TWO()+ (custom::PLUS(1, 1))',
        result: 44,
        expected: [
          {
            key: 'functionDependencies',
            matchType: 'toMatchObject',
            match: [{ name: functionClauses[1].name }, { name: functionClauses[0].name }]
          }
        ]
      }
    ],
    errorTestCases: [
      {
        definition: '=UNKNOWN ()',
        errorType: 'deps',
        errorMessage: 'Function UNKNOWN not found',
        expected: [
          {
            key: 'codeFragments',
            matchType: 'toMatchObject',
            match: [
              { code: 'Equal' },
              {
                code: 'Function',
                display: 'UNKNOWN',
                attrs: undefined,
                errors: [{ message: 'Function UNKNOWN not found' }]
              },
              { code: 'Space' },
              { code: 'LParen', meta: {}, errors: [] },
              { code: 'RParen', meta: {}, errors: [] }
            ]
          }
        ]
      },
      {
        definition: '=ABS(',
        errorType: 'deps',
        errorMessage: 'errors.parse.missing.argument',
        expected: [
          {
            key: 'codeFragments',
            matchType: 'toMatchObject',
            match: [
              { code: 'Equal' },
              {
                code: 'Function',
                display: 'ABS',
                attrs: { kind: 'Function' },
                errors: [{ message: 'errors.parse.missing.argument' }, { message: 'TODO mismatch token FunctionCall' }]
              },
              {
                code: 'LParen',
                meta: { args: [{ name: 'number', type: 'number' }], endCode: 'RParen' },
                errors: [{ message: 'errors.parse.missing.closing_parenthesis' }]
              }
            ]
          }
        ]
      },
      {
        definition: '=ABS(1',
        errorType: 'syntax',
        errorMessage: 'errors.parse.missing.closing_parenthesis',
        groupOptions: [{ name: 'basicError' }]
      },
      { definition: '=POWER(1,', errorType: 'syntax', errorMessage: 'errors.parse.missing.closing_parenthesis' },
      { definition: '=POWER(1,2', errorType: 'syntax', errorMessage: 'errors.parse.missing.closing_parenthesis' },
      {
        definition: '=custom::FORTY_TWO(1, 1, 1)',
        errorType: 'deps',
        errorMessage: 'errors.parse.mismatch.argument_count',
        groupOptions: [{ name: 'basicError' }]
      },
      { definition: '=ABS ( "a" )', errorType: 'type', errorMessage: 'Expected number but got string' },
      { definition: '=IF(1, -3, -4)', errorType: 'type', errorMessage: 'Expected boolean but got number' },
      { definition: '=ABS( NOW() )', errorType: 'type', errorMessage: 'Expected number but got Date' },
      { definition: '=ABS ( true )', errorType: 'type', errorMessage: 'Expected number but got boolean' },
      {
        definition: '=ABS ()',
        errorType: 'deps',
        errorMessage: 'errors.parse.missing.argument',
        groupOptions: [{ name: 'basicError' }]
      },
      { definition: '=ABS(1,2)', errorType: 'deps', errorMessage: 'errors.parse.mismatch.argument_count' },
      { definition: '=AVERAGE()', errorType: 'deps', errorMessage: 'errors.parse.missing.argument' }
    ]
  }
}
