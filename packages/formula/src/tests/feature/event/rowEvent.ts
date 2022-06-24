import { Row } from '../../../controls'
import { generateUUIDs } from '../../testHelper'
import { mockRow } from '../../testMock'
import { DistributeEvents, SpreadsheetInput, TestCaseInterface } from '../../testType'

const [namespaceId, spreadsheetId, column1Id, row1Id, row2Id, row3Id, cell1Id] = generateUUIDs()

const [row1, row2, row3]: Row[] = [
  {
    spreadsheetId,
    rowId: row1Id,
    rowIndex: 0
  },
  {
    spreadsheetId,
    rowId: row2Id,
    rowIndex: 1
  },
  {
    spreadsheetId,
    rowId: row3Id,
    rowIndex: 2
  }
]

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
            rows: [row1, row2, row3]
          }
        ]
      }
    ],
    eventTestCases: [
      ...[
        {
          definition: '=spreadsheet1.1',
          resultBefore: mockRow('1')
        },
        {
          definition: '=spreadsheet1.2.second.toString()',
          resultBefore: '4'
        }
      ].flatMap(a => [
        {
          ...a,
          label: 'empty event',
          namespaceId,
          events: []
        },
        {
          ...a,
          label: 'same',
          namespaceId,
          events: [['rowChange', { spreadsheetId, namespaceId, rows: [row1, row2, row3] }] as DistributeEvents]
        }
      ]),
      {
        definition: '=spreadsheet1.3.third.toString()',
        label: 'empty rows',
        namespaceId,
        resultBefore: 'Foo',
        resultAfter: 'Row "3" not found',
        events: [['rowChange', { spreadsheetId, namespaceId, rows: [] }]]
      }
    ]
  }
}
