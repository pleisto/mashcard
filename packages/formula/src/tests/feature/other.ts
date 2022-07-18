import { TestCaseInterface } from '../testType'

export const OtherTestCase: TestCaseInterface = {
  name: 'other',
  testCases: {
    successTestCases: [
      { definition: '=1.123%', result: 0.01123 },
      { definition: '=01.2000100', result: 1.20001 }
    ],
    errorTestCases: [
      { definition: '=a', errorType: 'syntax', errorMessage: '"a" not found' },
      { definition: '=nottrue', errorType: 'syntax', errorMessage: '"nottrue" not found' },
      {
        definition: '=1a1',
        errorType: 'parse',
        errorMessage: ['errors.parse.chevrotain.not_all_input_parsed', { image: 'a1' }],
        groupOptions: [{ name: 'basicError' }],
        valid: false
      },
      { definition: '=-1.%', errorType: 'syntax', errorMessage: 'errors.parse.missing.expression' },
      { definition: '=hel"lo', errorType: 'syntax', errorMessage: '"hel" not found' },
      { definition: '=he中文"', errorType: 'syntax', errorMessage: '"he中文" not found' },
      {
        definition: '=中文"123asd',
        errorType: 'parse',
        errorMessage: ['errors.parse.chevrotain.build_no_viable_alt', { image: '"中文\\"123asd"' }],
        valid: false
      },
      { definition: '=1:', errorType: 'type', errorMessage: 'Expected Cell but got number' },
      { definition: '=1:1', errorType: 'type', errorMessage: 'Expected Cell but got number' },
      { definition: '=1.%', errorType: 'syntax', errorMessage: 'errors.parse.missing.expression' },
      { definition: '="123":1', errorType: 'type', errorMessage: 'Expected Cell but got string' },
      { definition: '=)=', errorType: 'syntax', errorMessage: 'errors.parse.missing.expression' },
      {
        definition: '=>=',
        errorType: 'parse',
        errorMessage: ['errors.parse.chevrotain.build_no_viable_alt', { image: '""' }],
        groupOptions: [{ name: 'basicError' }],
        valid: false
      },
      {
        definition: '=<',
        errorType: 'parse',
        errorMessage: ['errors.parse.chevrotain.build_no_viable_alt', { image: '""' }],
        valid: false
      },
      {
        definition: '=<>',
        errorType: 'parse',
        errorMessage: ['errors.parse.chevrotain.build_no_viable_alt', { image: '""' }],
        valid: false
      },
      { definition: '=ABS(1 {a: 1}.a', errorType: 'type', errorMessage: 'Expected Cell but got number' },
      {
        definition: '=(1 {}.',
        errorType: 'syntax',
        errorMessage: 'errors.parse.missing.token',
        groupOptions: [{ name: 'basicError' }]
      }
    ]
  }
}
