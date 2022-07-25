import { generateUUIDs } from '../../testHelper'
import { mockCell } from '../../testMock'
import { TestCaseInterface, SpreadsheetInput } from '../../testType'

const [namespaceId, spreadsheetId, column1Id, column2Id, row1Id, row2Id, CELL_A1_ID] = generateUUIDs()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [A1_NAME, A2_NAME, B1_NAME, B2_NAME] = [
  `CELL_${row1Id}_${column1Id}`.replaceAll('-', ''),
  `CELL_${row2Id}_${column1Id}`.replaceAll('-', ''),
  `CELL_${row1Id}_${column2Id}`.replaceAll('-', ''),
  `CELL_${row2Id}_${column2Id}`.replaceAll('-', '')
]

export const SpreadsheetDependencyTestCase: TestCaseInterface = {
  name: 'spreadsheetDependency',
  testCases: {
    pages: [
      {
        pageName: 'SpreadsheetDependencyPage',
        pageId: namespaceId,
        variables: [
          {
            variableName: 'num0',
            definition: '=spreadsheet.A.sum()',
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
                cells: [{ value: '1', cellId: CELL_A1_ID }, { value: '=1' }]
              },
              {
                name: 'second',
                displayIndex: 'B',
                columnId: column2Id,
                cells: [{ value: '=ThisRow.A' }, { value: '=num0+B.1' }]
              }
            ],
            rows: [{ rowId: row1Id }, { rowId: row2Id }]
          }
        ]
      }
    ],
    dependencyTestCases: [
      {
        name: A1_NAME,
        namespaceId,
        type: 'Variable',
        testCases: [
          {
            action: {
              name: 'updateDefinition',
              formula: { definition: '=222' },
              result: 222
            },
            expected: [
              { name: B1_NAME, namespaceId, match: mockCell('222', CELL_A1_ID, 'A', row1Id) },
              { name: 'num0', namespaceId, match: 222 + 1 },
              { name: B2_NAME, namespaceId, match: 222 + 1 + 222 }
            ]
          },
          {
            action: {
              name: 'updateDefinition',
              formula: { definition: '=444' },
              result: 444
            },
            expected: [
              { name: B1_NAME, namespaceId, match: mockCell('444', CELL_A1_ID, 'A', row1Id) },
              { name: 'num0', namespaceId, match: 444 + 1 },
              { name: B2_NAME, namespaceId, match: 444 + 1 + 444 }
            ]
          }
        ]
      }
    ]
  }
}
