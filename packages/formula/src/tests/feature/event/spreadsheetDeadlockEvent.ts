import { sampleSize } from '@mashcard/active-support'
import { Cell, Column, Row } from '../../../controls'
import { generateUUIDs } from '../../testHelper'
import { mockCell } from '../../testMock'
import { DistributeEvents, SpreadsheetInput, TestCaseInterface } from '../../testType'

const [
  namespaceId,
  spreadsheetId,
  column1Id,
  column2Id,
  column3Id,
  row1Id,
  row2Id,
  row3Id,
  CELL_A1_ID,
  CELL_B1_ID,
  CELL_C1_ID,
  CELL_A2_ID,
  CELL_A3_ID,
  newColumnId,
  newRowId,
  cellxId,
  cellyId,
  variablexId,
  variableyId
] = generateUUIDs()

const A1CellRichType = {
  type: 'spreadsheet',
  meta: { spreadsheetId, columnId: column1Id, rowId: row1Id }
} as const

const B1CellRichType = {
  type: 'spreadsheet',
  meta: { spreadsheetId, columnId: column2Id, rowId: row1Id }
} as const

const A2CellRichType = {
  type: 'spreadsheet',
  meta: { spreadsheetId, columnId: column1Id, rowId: row2Id }
} as const

const PARSE_ERROR = {
  message: 'errors.parse.circular_dependency.spreadsheet',
  type: 'circular_dependency'
} as const

const INTERPRET_ERROR = {
  message: 'errors.interpret.circular_dependency.spreadsheet',
  type: 'circular_dependency'
} as const

const [column1, column2, column3]: Column[] = [
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
  },
  {
    spreadsheetId,
    name: 'third',
    columnId: column3Id,
    title: 'third',
    displayIndex: 'C',
    index: 2,
    sort: 2
  }
]

const [row1, row2, row3]: Row[] = [
  { spreadsheetId, rowId: row1Id, rowIndex: 0 },
  { spreadsheetId, rowId: row2Id, rowIndex: 1 },
  { spreadsheetId, rowId: row3Id, rowIndex: 2 }
]

const columnNew: Pick<Column, 'spreadsheetId' | 'name' | 'title' | 'columnId' | 'sort'> = {
  spreadsheetId,
  name: 'second',
  columnId: newColumnId,
  title: 'second',
  sort: 1
}

const rowNew: Pick<Row, 'spreadsheetId' | 'rowId'> = {
  spreadsheetId,
  rowId: newRowId
}

const CELLS_MAP: Record<`${string},${string}`, Pick<Cell, 'value' | 'variableId' | 'cellId'>> = {
  [`${newColumnId},${row1Id}`]: {
    cellId: cellxId,
    variableId: variablexId,
    value: 'newColumnCell'
  },
  [`${column1Id},${newRowId}`]: {
    cellId: cellyId,
    variableId: variableyId,
    value: 'newRowCell'
  }
}

const prependColumnEvent: DistributeEvents = [
  'columnChange',
  {
    spreadsheetId,
    namespaceId,
    columns: [
      { ...columnNew, displayIndex: 'A', index: 0 },
      { ...column1, displayIndex: 'B', index: 1 },
      { ...column2, displayIndex: 'C', index: 2 },
      { ...column3, displayIndex: 'D', index: 3 }
    ]
  }
]

const deleteFirstColumnEvent: DistributeEvents = [
  'columnChange',
  {
    spreadsheetId,
    namespaceId,
    columns: [
      { ...column2, index: 0, displayIndex: 'A' },
      { ...column3, index: 1, displayIndex: 'B' }
    ]
  }
]

const prependRowEvent: DistributeEvents = [
  'rowChange',
  {
    spreadsheetId,
    namespaceId,
    rows: [
      { ...rowNew, rowIndex: 0 },
      { ...row1, rowIndex: 1 },
      { ...row2, rowIndex: 2 },
      { ...row3, rowIndex: 3 }
    ]
  }
]

const deleteFirstRowEvent: DistributeEvents = [
  'rowChange',
  {
    spreadsheetId,
    namespaceId,
    rows: [
      { ...row2, rowIndex: 0 },
      { ...row3, rowIndex: 1 }
    ]
  }
]

// TODO jest test speed is too slow.
const definitionCases: (column: string, row: string) => Array<{ definition: string; logicRow?: true; error: any }> = (
  column,
  row
) =>
  sampleSize(
    [
      { definition: `=${column}.${row}`, error: PARSE_ERROR },
      { definition: `=spreadsheet1.${column}.${row}`, error: PARSE_ERROR },
      { definition: `=ThisRecord.${column}.${row}`, error: PARSE_ERROR },
      { definition: `=ThisRow.${column}`, logicRow: true, error: PARSE_ERROR },

      { definition: `=${column}[${row}]`, error: INTERPRET_ERROR },
      { definition: `=spreadsheet1.${column}[${row}]`, error: INTERPRET_ERROR },
      { definition: `=ThisRecord.${column}[${row}]`, error: INTERPRET_ERROR },
      { definition: `=spreadsheet1["${column}"][${row}]`, error: INTERPRET_ERROR },
      { definition: `=ThisRecord["${column}"][${row}]`, error: INTERPRET_ERROR },
      { definition: `=ThisRow["${column}"]`, logicRow: true, error: INTERPRET_ERROR }
    ],
    1
  )

export const SpreadsheetDeadlockEventTestCase: TestCaseInterface = {
  name: 'spreadsheetDeadlockEvent',
  testCases: {
    pages: [
      {
        pageName: 'SpreadsheetDeadLockEventPage1',
        pageId: namespaceId,
        spreadsheets: [
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<3, 3>>{
            getCell: ({ columnId, rowId, rowIndex, columnIndex }) => {
              const cell = CELLS_MAP[`${columnId},${rowId}`]
              if (!cell) return null!
              return { ...cell, rowIndex, columnIndex, columnId, rowId, spreadsheetId, namespaceId }
            },
            name: 'spreadsheet1',
            spreadsheetId,
            columns: [
              {
                ...column1,
                cells: [
                  { value: '1', cellId: CELL_A1_ID },
                  { value: '3', cellId: CELL_A2_ID },
                  { value: '5', cellId: CELL_A3_ID }
                ]
              },
              { ...column2, cells: [{ value: '2', cellId: CELL_B1_ID }, { value: '4' }, { value: '6' }] },
              { ...column3, cells: [{ value: '3', cellId: CELL_C1_ID }, { value: '5' }, { value: '7' }] }
            ],
            rows: [row1, row2, row3]
          }
        ]
      }
    ],
    eventTestCases: [
      ...definitionCases('A', '1').flatMap<NonNullable<TestCaseInterface['testCases']['eventTestCases']>[0]>(a => [
        {
          label: '[cell A.1] [prepend column] deadlock to normal',
          namespaceId,
          richType: A1CellRichType,
          resultBefore: a.error,
          resultAfter: mockCell('newColumnCell', cellxId, 'A', a.logicRow ? row1Id : '1'),
          events: [prependColumnEvent],
          ...a
        },
        {
          label: '[cell B.1] [delete column] normal to deadlock',
          namespaceId,
          richType: B1CellRichType,
          resultBefore: mockCell('1', CELL_A1_ID, 'A', a.logicRow ? row1Id : '1'),
          resultAfter: a.error,
          events: [deleteFirstColumnEvent],
          ...a
        },
        {
          label: '[cell A.1] [prepend row] deadlock to normal',
          namespaceId,
          richType: A1CellRichType,
          resultBefore: a.error,
          resultAfter: a.logicRow ? a.error : mockCell('newRowCell', cellyId, 'A', '1'),
          events: [prependRowEvent],
          ...a
        },
        {
          label: '[cell A.2] [delete row] normal to deadlock',
          namespaceId,
          richType: A2CellRichType,
          resultBefore: a.logicRow ? a.error : mockCell('1', CELL_A1_ID, 'A', '1'),
          resultAfter: a.error,
          events: [deleteFirstRowEvent],
          ...a
        }
      ]),
      ...definitionCases('B', '1').flatMap<NonNullable<TestCaseInterface['testCases']['eventTestCases']>[0]>(a => [
        {
          label: '[cell A.1] [prepend column] normal to deadlock',
          namespaceId,
          richType: A1CellRichType,
          resultBefore: mockCell('2', CELL_B1_ID, 'B', a.logicRow ? row1Id : '1'),
          resultAfter: a.error,
          events: [prependColumnEvent],
          ...a
        },
        {
          label: '[cell B.1] [delete column] deadlock to normal',
          namespaceId,
          richType: B1CellRichType,
          resultBefore: a.error,
          resultAfter: mockCell('3', CELL_C1_ID, 'B', a.logicRow ? row1Id : '1'),
          events: [deleteFirstColumnEvent],
          ...a
        }
      ]),
      ...definitionCases('A', '2').flatMap<NonNullable<TestCaseInterface['testCases']['eventTestCases']>[0]>(a => [
        {
          label: '[cell A.1] [prepend row] normal to deadlock',
          namespaceId,
          richType: A1CellRichType,
          resultBefore: a.logicRow ? a.error : mockCell('3', CELL_A2_ID, 'A', '2'),
          resultAfter: a.error,
          events: [prependRowEvent],
          ...a
        },
        {
          label: '[cell A.2] [delete row] deadlock to normal',
          namespaceId,
          richType: A2CellRichType,
          resultBefore: a.error,
          resultAfter: a.logicRow ? a.error : mockCell('5', CELL_A3_ID, 'A', '2'),
          events: [deleteFirstRowEvent],
          ...a
        }
      ])
    ]
  }
}
