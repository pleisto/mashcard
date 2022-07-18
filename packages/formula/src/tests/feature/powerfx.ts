import { SpreadsheetInput, TestCaseInterface } from '../testType'

const spreadsheetToken = 'PowerFx.spreadsheet'

export const PowerFxTestCase: TestCaseInterface = {
  name: 'powerfx',
  testCases: {
    pages: [
      {
        pageName: 'PowerFx',
        spreadsheets: [
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<3, 3>>{
            name: 'spreadsheet',
            columns: [
              {
                name: 'first',
                displayIndex: 'A',
                cells: [{ value: '1' }, { value: '3' }, { value: '5' }]
              },
              {
                name: 'second',
                displayIndex: 'B',
                cells: [{ value: '2' }, { value: '4' }, { value: '6' }]
              },
              {
                name: 'third',
                displayIndex: 'C',
                cells: [{ value: '3' }, { value: '' }, { value: 'Foo' }]
              }
            ]
          }
        ]
      }
    ],
    successTestCases: [
      {
        definition: `=CountIf(${spreadsheetToken}, >= 3)`,
        result: { message: 'Column is missing', type: 'runtime' },
        label: 'CountIf error1'
      }
    ],
    errorTestCases: [
      {
        label: 'CountIf ok',
        definition: `=CountIf(${spreadsheetToken}, ${spreadsheetToken}.first >= 3)`,
        errorMessage: ['errors.parse.mismatch.type', { expected: 'number', got: 'Column' }],
        errorType: 'type'
      },
      {
        label: 'CountIf ok',
        definition: `=CountIf(${spreadsheetToken}, ${spreadsheetToken}."first" >= 3)`,
        newAbbrevInput: `=CountIf(${spreadsheetToken}, ${spreadsheetToken}.first >= 3)`,
        errorMessage: ['errors.parse.mismatch.type', { expected: 'number', got: 'Column' }],
        errorType: 'type'
      }
    ]
  }
}
