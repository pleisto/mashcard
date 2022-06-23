import { buildEvent, generateUUIDs } from '../../testHelper'
import { mockColumn } from '../../testMock'
import { SpreadsheetInput, TestCaseInterface } from '../../testType'

const [page0Id, column1Id] = generateUUIDs()

export const ColumnEventTestCase: TestCaseInterface = {
  name: 'columnEvent',
  testCases: {
    pages: [
      {
        pageName: 'ColumnEventPage1',
        pageId: page0Id,
        spreadsheets: [
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<3, 3>>{
            name: 'spreadsheet1',
            columns: [
              {
                name: 'first',
                columnId: column1Id,
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
    eventTestCases: [
      {
        definition: '=spreadsheet1.first',
        namespaceId: page0Id,
        resultBefore: mockColumn('first', column1Id),
        resultAfter: mockColumn('first', column1Id),
        event: buildEvent([])
      }
      // {
      //   definition: '=spreadsheet1.first',
      //   namespaceId: page0Id,
      //   resultBefore: mockColumn('first', column1Id),
      //   resultAfter: mockColumn('first222', column1Id),
      //   event: buildEvent([['columnChange', { spreadsheetId: '', namespaceId: '', columns: [] }]])
      // }
    ]
  }
}
