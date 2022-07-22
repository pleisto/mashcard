import { generateUUIDs } from '../testHelper'
import { SpreadsheetInput, TestCaseInterface } from '../testType'

const [namespaceId, spreadsheetId, column1Id, row1Id, variableId] = generateUUIDs()

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
        variables: [
          {
            variableName: 'num0',
            definition: '=spreadsheet.second.1',
            insertOptions: { ignoreParseError: true, ignoreSyntaxError: true }
          }
        ],
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
                cells: [{ value: '1', variableId }, { value: '=A.1' }]
              },
              {
                name: 'second',
                displayIndex: 'B',
                cells: [{ value: '=A.2' }, { value: '=B.1' }]
              }
            ],
            rows: [{ rowId: row1Id }, {}]
          }
        ]
      }
    ],
    errorTestCases: [
      ...[
        { definition: `=A.2` },
        { definition: `=B.2`, label: 'flattenVariableDependencies' },
        { definition: '=num0', label: 'normal variable flatten ok' }
      ].map<NonNullable<TestCaseInterface['testCases']['errorTestCases']>[0]>(t => ({
        namespaceId,
        variableId,
        richType: A1CellRichType,
        errorType: 'circular_dependency',
        errorMessage: 'errors.parse.circular_dependency.variable',
        ...t
      }))
    ]
  }
}
