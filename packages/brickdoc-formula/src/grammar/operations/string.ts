import { OperatorType } from '../operator'

export const stringOperator: OperatorType = {
  name: 'string',
  expressionType: 'boolean',
  skipRhsCstParse: true,
  reverseLhsAndRhs: true,
  lhsType: 'any',
  rhsType: 'any',
  interpret: async ({ lhs }) => {
    return { type: 'boolean', result: !lhs.result }
  },
  testCases: {
    successTestCases: [
      { definition: '=""', result: '' },
      { definition: '= "hello"', result: 'hello' },
      { definition: '= "hel\'lo"', result: "hel'lo" }
    ],
    errorTestCases: [
      { definition: '="', errorType: 'parse', errorMessage: 'Parse error: "\\""', valid: false },
      { definition: '=foo"', errorType: 'syntax', errorMessage: '"foo" not found' },
      {
        definition: '= "Hello',
        label: 'ParseError without closing quote',
        errorType: 'parse',
        errorMessage: 'Parse error: "\\"Hello"',
        valid: false
      },
      {
        definition: '= "hel"lo"',
        label: 'lex error when parse "hel"lo" => parseError',
        errorType: 'parse',
        errorMessage: 'Not all input parsed: lo',
        valid: false
      },
      {
        definition: "= 'hello'",
        label: 'Single quote => parseError',
        errorType: 'parse',
        errorMessage: 'Parse error: "\'hello\'"',
        valid: false
      }
    ]
  }
}
