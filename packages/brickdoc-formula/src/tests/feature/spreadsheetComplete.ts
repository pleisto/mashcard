import { SpreadsheetInput, TestCaseInterface } from '../testType'

const namespaceId = Symbol('SpreadsheetComplete')

export const SpreadsheetCompleteTestCase: TestCaseInterface = {
  name: 'spreadsheetComplete',
  testCases: {
    pages: [
      {
        pageName: 'SpreadsheetCompletePage1',
        pageId: namespaceId,
        variables: [
          { variableName: 'num0', definition: '=0' },
          { variableName: 'num1', definition: '=1' },
          { variableName: 'num2', definition: '=2' },
          { variableName: 'foobar', definition: '=3' }
        ],
        spreadsheets: [
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<3, 3>>{
            name: 'spreadsheet1',
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
          },
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<0, 0>>{
            name: 'Spreadsheet2 2',
            columns: []
          }
        ]
      },
      {
        pageName: 'SpreadsheetCompletePage2',
        variables: [{ variableName: 'num0', definition: '=0' }]
      }
    ],
    completeTestCases: []
  }
}
