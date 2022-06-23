import { buildEvent, generateUUIDs } from '../../testHelper'
import { mockRow } from '../../testMock'
import { SpreadsheetInput, TestCaseInterface } from '../../testType'

const [namespaceId, spreadsheetId, column1Id, row1Id, cell1Id] = generateUUIDs()

export const RowEventTestCase: TestCaseInterface = {
  name: 'rowEvent',
  testCases: {
    pages: [
      {
        pageName: 'RowEventPage1',
        pageId: namespaceId,
        spreadsheets: [
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<3, 3>>{
            name: 'spreadsheet1',
            spreadsheetId,
            columns: [
              {
                name: 'first',
                columnId: column1Id,
                displayIndex: 'A',
                cells: [{ value: '1', cellId: cell1Id }, { value: '3' }, { value: '5' }]
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
            ],
            rows: [{ rowId: row1Id }, {}, {}]
          }
        ]
      }
    ],
    eventTestCases: [
      {
        definition: '=spreadsheet1.1',
        namespaceId,
        resultBefore: mockRow('1'),
        event: buildEvent([])
      }
    ]
  }
}
