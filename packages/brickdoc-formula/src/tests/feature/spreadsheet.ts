import { mockCell, mockColumn, mockRow } from '../testMock'
import { SpreadsheetInput, TestCaseInterface } from '../testType'

const namespaceId = '55555555-5555-4444-5555-555555555555'
const spreadsheetId = '22222222-2222-4444-3333-222222222222'

const firstColumnId = '66666666-6666-4444-6666-666666666666'
const firstRowId = 'eeeeeeee-eeee-4444-aaaa-222222222222'
const firstCellId = '33333333-3333-4444-3333-333333333333'
const spreadsheetToken = 'SpreadsheetPage.spreadsheet'

export const SpreadsheetTestCase: TestCaseInterface = {
  name: 'spreadsheet',
  testCases: {
    pages: [
      {
        pageName: 'SpreadsheetPage',
        pageId: namespaceId,
        spreadsheets: [
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<3, 3>>{
            name: 'spreadsheet',
            spreadsheetId,
            columns: [
              {
                name: 'first',
                columnId: firstColumnId,
                displayIndex: 'A',
                cells: [{ value: '1', cellId: firstCellId }, { value: '3' }, { value: '5' }]
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
            rows: [{ rowId: firstRowId }, {}, {}]
          }
        ]
      }
    ],
    successTestCases: [
      { definition: `=${spreadsheetToken}."first"`, result: mockColumn('first', firstColumnId) },
      { definition: `=${spreadsheetToken}."first"`, result: mockColumn('first', firstColumnId) },
      { definition: `=${spreadsheetToken}["first"]`, result: mockColumn('first', firstColumnId) },
      { definition: `=${spreadsheetToken}.A`, result: mockColumn('A', firstColumnId) },
      { definition: `=${spreadsheetToken}.1`, result: mockRow('1') },
      { definition: `=ROW(${spreadsheetToken}.3)`, result: 3 },
      { definition: `=ROW(${spreadsheetToken}.3.A)`, result: 3 },
      { definition: `=${spreadsheetToken}[1]`, result: mockRow('1') },
      { definition: `=${spreadsheetToken}.1.A`, result: mockCell('1', firstCellId, 'A', '1') },
      { definition: `=${spreadsheetToken}.1.A.toString()`, result: '1' },
      { definition: `=${spreadsheetToken}.1.first`, result: mockCell('1', firstCellId, 'first', '1') },
      { definition: `=${spreadsheetToken}[1]["first"]`, result: mockCell('1', firstCellId, 'first', '1') },
      { definition: `=${spreadsheetToken}.1["first"]`, result: mockCell('1', firstCellId, 'first', '1') },
      { definition: `=${spreadsheetToken}.1["A"]`, result: mockCell('1', firstCellId, 'A', '1') },
      { definition: `=${spreadsheetToken}[1]["A"]`, result: mockCell('1', firstCellId, 'A', '1') },
      { definition: `=${spreadsheetToken}.A.1`, result: mockCell('1', firstCellId, 'A', '1') },
      { definition: `=${spreadsheetToken}."first".1`, result: mockCell('1', firstCellId, firstColumnId, '1') },
      { definition: `=${spreadsheetToken}."first"[1]`, result: mockCell('1', firstCellId, firstColumnId, '1') },
      { definition: `=${spreadsheetToken}["A"][1]`, result: mockCell('1', firstCellId, 'A', '1') },
      { definition: `=${spreadsheetToken}["first"][1]`, result: mockCell('1', firstCellId, firstColumnId, '1') },
      // { label: 'Range 1', definition: `=${spreadsheetToken}.first.1:${spreadsheetToken}.first.2`, result: RANGE_FLAG },
      // { label: 'toArray', definition: `=${spreadsheetToken}.toArray()`, result: SNAPSHOT_FLAG },
      // { label: 'toRecordArray', definition: `=${spreadsheetToken}.toRecordArray()`, result: SNAPSHOT_FLAG },
      // { label: 'Spreadsheet', definition: `=Spreadsheet([]).toArray()`, result: SNAPSHOT_FLAG },
      // { label: 'Spreadsheet', definition: `=Spreadsheet([1,2,3]).toArray()`, result: SNAPSHOT_FLAG },
      // { label: 'Spreadsheet', definition: `=Spreadsheet([{a: 1}, {a: 2}]).toArray()`, result: SNAPSHOT_FLAG },
      { label: 'COLUMN_COUNT', definition: `=${spreadsheetToken}.COLUMN_COUNT()`, result: 3 },
      { label: 'SUM', definition: `=${spreadsheetToken}.first.SUM()`, result: 1 + 3 + 5 },
      { label: 'MAX', definition: `=${spreadsheetToken}.first.MAX()`, result: 5 },
      { label: 'COUNTA', definition: `=${spreadsheetToken}.first.COUNTA()`, result: 3 },
      { label: 'COUNTA', definition: `=${spreadsheetToken}.third.COUNTA()`, result: 2 },
      {
        definition: `=SUMPRODUCT(${spreadsheetToken}.first, ${spreadsheetToken}.second)`,
        result: 1 * 2 + 3 * 4 + 5 * 6
      },
      { definition: `=SUMIFS(${spreadsheetToken}.first, ${spreadsheetToken}.second, >3)`, result: 3 + 5 },
      { definition: `=SUMIFS(${spreadsheetToken}.first, ${spreadsheetToken}.second, 4)`, result: 3 },
      { definition: `=AVERAGEIFS(${spreadsheetToken}.first, ${spreadsheetToken}.second, >3)`, result: 4 },
      {
        definition: `=AVERAGEIFS(${spreadsheetToken}.first, ${spreadsheetToken}.second, >100)`,
        result: 'No matching values'
      },
      { definition: `=COUNTIFS(${spreadsheetToken}.first, >2)`, result: 2 },
      { definition: `=COUNTIFS(${spreadsheetToken}.first, 3)`, result: 1 },
      { definition: `=VLOOKUP("", ${spreadsheetToken}, ${spreadsheetToken}.second)`, result: 'Not found' },
      {
        definition: `=VLOOKUP("", ${spreadsheetToken}, ${spreadsheetToken}.first)`,
        result: 'Column cannot be the same as the first column'
      },
      { definition: `=VLOOKUP("1", ${spreadsheetToken}, ${spreadsheetToken}.second)`, result: '2' },
      { definition: `=VLOOKUP("2", ${spreadsheetToken}, ${spreadsheetToken}.second, false)`, result: 'Not found' },
      { definition: `=VLOOKUP("2", ${spreadsheetToken}, ${spreadsheetToken}.second)`, result: '2' },
      { definition: `=VLOOKUP("2", ${spreadsheetToken}, ${spreadsheetToken}.second, true)`, result: '2' },
      { definition: `=VLOOKUP("1", ${spreadsheetToken}, ${spreadsheetToken}.second, true)`, result: '2' },
      { definition: `=VLOOKUP("1", ${spreadsheetToken}, ${spreadsheetToken}.second, false)`, result: '2' },
      { definition: `=VLOOKUP("1", ${spreadsheetToken}, ${spreadsheetToken}.second)`, result: '2' },
      { definition: `=XLOOKUP("1", ${spreadsheetToken}.first, ${spreadsheetToken}.second)`, result: '2' },
      { definition: `=XLOOKUP("123", ${spreadsheetToken}.first, ${spreadsheetToken}.second, "100")`, result: '100' }
    ],
    errorTestCases: [
      { definition: `=${spreadsheetToken}.Z`, errorType: 'deps', errorMessage: `Column "Z" not found` },
      { definition: `=${spreadsheetToken}.100`, errorType: 'deps', errorMessage: 'Row "100" not found' },
      {
        definition: `=${spreadsheetToken}[1].A`,
        errorType: 'parse',
        errorMessage: 'Not all input parsed: .',
        valid: false
      },
      {
        definition: `=${spreadsheetToken}[1].first`,
        errorType: 'parse',
        errorMessage: 'Not all input parsed: .',
        valid: false
      },
      {
        definition: `=${spreadsheetToken}["A"].1`,
        errorType: 'parse',
        errorMessage: 'Not all input parsed: .',
        valid: false
      },
      { definition: `=${spreadsheetToken}."first".foobar`, errorType: 'syntax', errorMessage: 'Need a number: foobar' },
      { definition: `=${spreadsheetToken}."first".100`, errorType: 'runtime', errorMessage: 'Cell out of range: 3' }
    ]
  }
}
