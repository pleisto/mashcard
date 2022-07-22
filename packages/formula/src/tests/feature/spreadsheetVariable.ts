import { generateUUIDs } from '../testHelper'
import { SpreadsheetInput, TestCaseInterface } from '../testType'

const [namespaceId, spreadsheetId, column1Id, row1Id, cellA1VariableId, cellA2VariableId] = generateUUIDs()

const A1CellRichType = {
  type: 'spreadsheet',
  meta: { spreadsheetId, columnId: column1Id, rowId: row1Id }
} as const

export const SpreadsheetVariableTestCase: TestCaseInterface = {
  name: 'variable',
  testCases: {
    pages: [
      {
        pageName: 'SpreadsheetVariablePage',
        pageId: namespaceId,
        // variables: [{ variableName: 'num0', definition: '=0', variableId: num0Id }],
        spreadsheets: [
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<2, 2>>{
            name: 'spreadsheet',
            spreadsheetId,
            columns: [
              {
                name: 'first',
                displayIndex: 'A',
                columnId: column1Id,
                cells: [
                  { value: '1', variableId: cellA1VariableId },
                  { value: '=A.1', variableId: cellA2VariableId }
                ]
              },
              {
                name: 'second',
                displayIndex: 'B',
                cells: [{ value: '2' }, { value: '4' }]
              }
            ],
            rows: [{ rowId: row1Id }, {}]
          }
        ]
      }
    ],
    errorTestCases: [
      {
        definition: `=A.2`,
        errorType: 'deps',
        namespaceId,
        richType: A1CellRichType,
        errorMessage: `Column "Z" not found`
      }
    ]
  }
}
