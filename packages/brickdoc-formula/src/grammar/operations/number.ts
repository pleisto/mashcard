import { ErrorMessage } from '../../types'
import { OperatorType } from '../operator'

export const numberOperator: OperatorType = {
  name: 'number',
  expressionType: 'number',
  skipRhsCstParse: true,
  reverseLhsAndRhs: true,
  lhsType: 'any',
  rhsType: 'any',
  interpret: async ({ lhs }) => lhs,
  dynamicInterpretLhs: async ({ operators }) => {
    const image = operators[0]!.image
    const minus = operators[1] ? -1 : 1
    const sign = operators[2] ? 0.01 : 1
    const number = Number(image) * sign * minus
    return { type: 'number', result: number }
  },
  dynamicParseValidator: (cstVisitor, { image, codeFragments, type }) => {
    const errorMessages: ErrorMessage[] = []

    if (!codeFragments.some(c => ['DecimalLiteral', 'NumberLiteral'].includes(c.code))) {
      errorMessages.push({ message: 'Missing number', type: 'syntax' })
    }

    return {
      image,
      codeFragments: [
        { type: 'number', errors: errorMessages, code: 'NumberLiteral', display: image, attrs: undefined }
      ],
      type
    }
  },
  testCases: {
    successTestCases: [
      { definition: '=-123123%', result: -1231.23, expected: [{ key: 'codeFragments', matchType: 'toMatchSnapshot' }] },
      { definition: '=-1.2%', result: -0.012, expected: [{ key: 'codeFragments', matchType: 'toMatchSnapshot' }] },
      { definition: '= -0.123%', label: 'caret and sign', result: -0.00123 },
      { definition: '=123123123123123123123', label: 'js precision', result: 123123123123123130000 },
      { definition: '=0', result: 0 },
      { definition: '=0.01', result: 0.01 },
      { definition: '=01', result: 1 },
      { definition: '=0001.0000', result: 1 },
      { definition: '=12.0', result: 12 },
      { definition: '=-0', result: -0 },
      { definition: '=-101', result: -101 },
      { definition: '= 2%', result: 0.02 },
      { definition: '=5100%', result: 51 }
    ],
    errorTestCases: [
      { definition: '=-', errorType: 'syntax', errorMessage: 'Missing number' },
      { definition: '=-%', errorType: 'syntax', errorMessage: 'Missing number' },
      { definition: '=%', errorType: 'parse', errorMessage: 'Parse error: "%"', valid: false },
      { definition: '=-1.', errorType: 'syntax', errorMessage: 'Missing expression' },
      { definition: '=1.%', errorType: 'syntax', errorMessage: 'Missing expression' },
      { definition: '=1 & "123"', errorType: 'type', errorMessage: 'Expected string but got number' }
    ]
  }
}
