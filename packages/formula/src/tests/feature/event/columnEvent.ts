import { Column } from '../../../controls'
import { generateUUIDs } from '../../testHelper'
import { mockColumn } from '../../testMock'
import { DistributeEvents, SpreadsheetInput, TestCaseInterface } from '../../testType'

const [namespaceId, spreadsheetId, column1Id, column2Id] = generateUUIDs()

const [column1, column2]: Column[] = [
  {
    spreadsheetId,
    name: 'first',
    columnId: column1Id,
    title: 'first',
    displayIndex: 'A',
    index: 0,
    sort: 0
  },
  {
    spreadsheetId,
    name: 'second',
    columnId: column2Id,
    title: 'second',
    displayIndex: 'B',
    index: 1,
    sort: 1
  }
]

export const ColumnEventTestCase: TestCaseInterface = {
  name: 'columnEvent',
  testCases: {
    pages: [
      {
        pageName: 'ColumnEventPage1',
        pageId: namespaceId,
        spreadsheets: [
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<2, 3>>{
            name: 'spreadsheet1',
            spreadsheetId,
            columns: [
              { ...column1, cells: [{ value: '1' }, { value: '3' }, { value: '5' }] },
              { ...column2, cells: [{ value: '2' }, { value: '4' }, { value: '6' }] }
            ]
          }
        ]
      }
    ],
    eventTestCases: [
      {
        definition: '=spreadsheet1.first',
        namespaceId,
        resultBefore: mockColumn('first', column1Id),
        events: []
      },
      {
        definition: '=spreadsheet1.first',
        namespaceId,
        resultBefore: mockColumn('first', column1Id),
        resultAfter: 'Column "first" not found',
        events: [['columnChange', { spreadsheetId, namespaceId, columns: [] }]]
      },
      ...[
        {
          definition: '=spreadsheet1.first',
          resultBefore: mockColumn('first', column1Id),
          resultAfter: mockColumn('first222', column1Id)
        },
        {
          definition: '=spreadsheet1.second',
          label: 'same',
          resultBefore: mockColumn('second', column2Id)
        }
      ].map(a => ({
        ...a,
        namespaceId,
        events: [
          [
            'columnChange',
            {
              spreadsheetId,
              namespaceId,
              columns: [{ ...column1, name: 'first222', title: 'first222' }, column2]
            }
          ] as DistributeEvents
        ]
      }))
    ]
  }
}
