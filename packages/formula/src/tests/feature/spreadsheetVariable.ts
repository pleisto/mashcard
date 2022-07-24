import { generateUUIDs } from '../testHelper'
import { mockCell } from '../testMock'
import { SpreadsheetInput, TestCaseInterface } from '../testType'

const [namespaceId, spreadsheetId, column1Id, row1Id, variableId, CELL_A2_ID, VARIABLE_A2_ID] = generateUUIDs()

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
                cells: [
                  { value: '1', variableId },
                  { value: '=A.1', cellId: CELL_A2_ID, variableId: VARIABLE_A2_ID }
                ]
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
    successTestCases: [
      {
        definition: '=spreadsheet.A.2',
        result: mockCell('1', CELL_A2_ID, 'A', '2'),
        namespaceId,
        expected: [
          { key: 'variableDependencies', match: [{ namespaceId, variableId: VARIABLE_A2_ID }] },
          {
            key: 'flattenVariableDependencies',
            match: [
              { namespaceId, variableId },
              { namespaceId, variableId: VARIABLE_A2_ID }
            ]
          }
        ]
      },
      ...[
        { definition: '=A[2]' },
        { definition: '=B[2]' },
        { definition: '=ThisRow["A"]', message: 'errors.interpret.circular_dependency.spreadsheet' },
        { definition: '=ThisRecord.A[2]' },
        { definition: '=ThisRecord["A"][2]' },
        { definition: '=spreadsheet.A[2]' },
        { definition: '=spreadsheet["A"][2]' }
      ].map<NonNullable<TestCaseInterface['testCases']['successTestCases']>[0]>(t => ({
        namespaceId,
        variableId,
        richType: A1CellRichType,
        result: { message: t.message ?? 'errors.interpret.circular_dependency.variable', type: 'circular_dependency' },
        ...t
      }))
    ],
    errorTestCases: [
      ...[
        { definition: '=A.2' },
        { definition: '=B.2', label: 'flattenVariableDependencies' },
        { definition: '=ThisRow.A', message: 'errors.parse.circular_dependency.spreadsheet' },
        { definition: '=ThisRecord.A.2' },
        { definition: '=spreadsheet.A.2' },
        { definition: '=num0', label: 'normal variable flatten ok' }
      ].map<NonNullable<TestCaseInterface['testCases']['errorTestCases']>[0]>(t => ({
        namespaceId,
        variableId,
        richType: A1CellRichType,
        errorType: 'circular_dependency',
        errorMessage: t.message ?? 'errors.parse.circular_dependency.variable',
        ...t
      }))
    ]
  }
}
