import {
  ButtonType,
  Cell,
  CellType,
  Column,
  ColumnType,
  RangeType,
  Row,
  RowType,
  SpreadsheetClass,
  SpreadsheetType,
  SwitchType
} from '../controls'
import { dispatchFormulaBlockNameChange } from '../events'
import { AnyDisplayResult, AnyDumpResult, AnyTypeResult, UsedFormulaType } from '../type'
import { FormulaContext } from '../context/context'
import { cast, dump, display } from '../context/persist'
import { generateUUIDs, matchObject } from '../tests'
import { BlockClass } from '../controls/block'

const [
  namespaceId,
  unknownNamespaceId,
  spreadsheetId,
  firstColumnId,
  secondColumnId,
  thirdColumnId,
  firstRowId,
  secondRowId,
  thirdRowId,
  cell1VariableId,
  cell2VariableId,
  cell3VariableId,
  cell4VariableId,
  cell5VariableId,
  cell6VariableId,
  cell7VariableId,
  cell8VariableId,
  cell9VariableId
] = generateUUIDs()

const rows: Row[] = [
  { rowId: firstRowId, rowIndex: 0, spreadsheetId },
  { rowId: secondRowId, rowIndex: 1, spreadsheetId },
  { rowId: thirdRowId, rowIndex: 2, spreadsheetId }
]
const columns: Column[] = [
  {
    columnId: firstColumnId,
    spreadsheetId,
    sort: 0,
    title: 'first',
    displayIndex: 'A',
    name: 'first',
    index: 0
  },
  {
    columnId: secondColumnId,
    spreadsheetId,
    sort: 1,
    title: 'second',
    displayIndex: 'B',
    name: 'second',
    index: 1
  },
  {
    columnId: thirdColumnId,
    spreadsheetId,
    sort: 2,
    title: 'third',
    displayIndex: 'C',
    name: 'third',
    index: 2
  }
]

const cells: Cell[] = [
  {
    namespaceId,
    rowId: firstRowId,
    spreadsheetId,
    rowIndex: 0,
    columnIndex: 0,
    columnId: firstColumnId,
    value: '1',
    variableId: cell1VariableId,
    cellId: ''
  },
  {
    namespaceId,
    rowId: firstRowId,
    spreadsheetId,
    rowIndex: 0,
    columnIndex: 1,
    columnId: secondColumnId,
    value: '2',
    variableId: cell2VariableId,
    cellId: ''
  },
  {
    namespaceId,
    rowId: firstRowId,
    spreadsheetId,
    rowIndex: 0,
    columnIndex: 2,
    columnId: thirdColumnId,
    value: '3',
    variableId: cell3VariableId,
    cellId: ''
  },
  {
    namespaceId,
    rowId: secondRowId,
    spreadsheetId,
    rowIndex: 1,
    columnIndex: 0,
    columnId: firstColumnId,
    value: '3',
    variableId: cell4VariableId,
    cellId: ''
  },
  {
    namespaceId,
    rowId: secondRowId,
    spreadsheetId,
    rowIndex: 1,
    columnIndex: 1,
    columnId: secondColumnId,
    value: '4',
    variableId: cell5VariableId,
    cellId: ''
  },
  {
    namespaceId,
    rowId: secondRowId,
    spreadsheetId,
    rowIndex: 1,
    columnIndex: 2,
    columnId: thirdColumnId,
    value: '',
    variableId: cell6VariableId,
    cellId: ''
  },
  {
    namespaceId,
    rowId: thirdRowId,
    spreadsheetId,
    rowIndex: 2,
    columnIndex: 0,
    columnId: firstColumnId,
    value: '5',
    variableId: cell7VariableId,
    cellId: ''
  },
  {
    namespaceId,
    rowId: thirdRowId,
    spreadsheetId,
    rowIndex: 2,
    columnIndex: 1,
    columnId: secondColumnId,
    value: '6',
    variableId: cell8VariableId,
    cellId: ''
  },
  {
    namespaceId,
    rowId: thirdRowId,
    spreadsheetId,
    rowIndex: 2,
    columnIndex: 2,
    columnId: thirdColumnId,
    value: 'Foo',
    variableId: cell9VariableId,
    cellId: ''
  }
]

const formulaContext = FormulaContext.getInstance({ domain: 'test' })
void dispatchFormulaBlockNameChange({ id: namespaceId, name: 'Page1', username: 'test' })

const spreadsheet: SpreadsheetType = new SpreadsheetClass({
  name: 'MySpreadsheet',
  ctx: { formulaContext },
  dynamic: false,
  spreadsheetId,
  namespaceId,
  columns,
  rows,
  getCell: ({ rowId, columnId }) => {
    return cells.find(cell => cell.rowId === rowId && cell.columnId === columnId)!
  }
})

void formulaContext.setSpreadsheet(spreadsheet)

const columnTypes: ColumnType[] = [
  spreadsheet.findColumn({ type: 'name', value: 'first', namespaceId })!,
  spreadsheet.findColumn({ type: 'name', value: 'A', namespaceId })!,
  spreadsheet.findColumn({ type: 'id', value: firstColumnId, namespaceId })!
]

const rowTypes: RowType[] = [
  spreadsheet.findRow({ type: 'id', value: firstRowId, namespaceId })!,
  spreadsheet.findRow({ type: 'name', value: '1', namespaceId })!
]

const cellTypes: CellType[] = [
  ...columnTypes.flatMap(c => [c.newCell(cells[0], '1'), c.newCell(cells[0], firstRowId)]),
  ...rowTypes.flatMap(r => [r.newCell(cells[0], 'first'), r.newCell(cells[0], 'A'), r.newCell(cells[0], firstColumnId)])
]

const testCases: {
  [P in UsedFormulaType]: Array<{
    testCase: AnyTypeResult<P>
    dumpResult?: AnyDumpResult<P>
    matchTestCase?: AnyTypeResult<P | 'Error'>
    displayResult: AnyDisplayResult<P> | null
    snapshot?: true
    todoMessage?: string
  }>
} = {
  null: [
    {
      testCase: { type: 'null', result: null },
      displayResult: { type: 'null', result: 'null' },
      dumpResult: { type: 'null', result: null }
    }
  ],
  boolean: [
    {
      testCase: { type: 'boolean', result: true },
      displayResult: { type: 'boolean', result: 'true' },
      dumpResult: { type: 'boolean', result: true }
    }
  ],
  number: [
    {
      testCase: { type: 'number', result: 1 },
      displayResult: { type: 'number', result: '1' },
      dumpResult: { type: 'number', result: 1 }
    }
  ],
  string: [
    {
      testCase: { type: 'string', result: '1', view: { type: '', attrs: {} } },
      displayResult: { type: 'string', result: '1', view: { type: '', attrs: {} } },
      dumpResult: { type: 'string', result: '1', view: { type: '', attrs: {} } }
    }
  ],
  literal: [
    {
      testCase: { type: 'literal', result: '1123' },
      displayResult: { type: 'literal', result: '1123' },
      dumpResult: { type: 'literal', result: '1123' }
    }
  ],
  Cst: [
    {
      testCase: { type: 'Cst', result: { name: '', children: {} } },
      dumpResult: { result: 'other.not_supported', type: 'Cst' },
      displayResult: { type: 'Cst', result: '#<Cst>' },
      matchTestCase: { result: { message: 'other.not_supported', type: 'runtime' }, type: 'Error' }
    }
  ],
  Reference: [
    {
      testCase: { type: 'Reference', result: { kind: 'self' } },
      dumpResult: { result: 'other.not_supported', type: 'Reference' },
      displayResult: { type: 'Reference', result: '#<Reference>' },
      matchTestCase: { result: { message: 'other.not_supported', type: 'runtime' }, type: 'Error' }
    }
  ],
  Function: [
    {
      testCase: { type: 'Function', result: [{ name: 'Set', args: [] }] },
      dumpResult: { result: 'other.not_supported', type: 'Function' },
      displayResult: { type: 'Function', result: '#<Function>' },
      matchTestCase: { result: { message: 'other.not_supported', type: 'runtime' }, type: 'Error' }
    }
  ],
  Predicate: [
    {
      testCase: { type: 'Predicate', result: 123, meta: { operator: 'equal' } },
      dumpResult: { result: 'other.not_supported', type: 'Predicate' },
      displayResult: { type: 'Predicate', result: '[equal] 123' },
      matchTestCase: { result: { message: 'other.not_supported', type: 'runtime' }, type: 'Error' }
    }
  ],
  Button: [
    {
      testCase: { type: 'Button', result: null as unknown as ButtonType },
      dumpResult: { result: 'other.not_supported', type: 'Button' },
      displayResult: { type: 'Button', result: '#<Button>' },
      matchTestCase: { result: { message: 'other.not_supported', type: 'runtime' }, type: 'Error' }
    }
  ],
  Switch: [
    {
      testCase: { type: 'Switch', result: null as unknown as SwitchType },
      dumpResult: { result: 'other.not_supported', type: 'Switch' },
      displayResult: { type: 'Switch', result: '#<Switch>' },
      matchTestCase: { result: { message: 'other.not_supported', type: 'runtime' }, type: 'Error' }
    }
  ],
  NoPersist: [
    {
      testCase: { type: 'NoPersist', result: null },
      displayResult: { type: 'NoPersist', result: '#<NoPersist>' },
      dumpResult: { type: 'NoPersist', result: null }
    }
  ],
  Blank: [
    {
      testCase: { type: 'Blank', result: 'Blank' },
      displayResult: { type: 'Blank', result: 'Blank' },
      dumpResult: { type: 'Blank', result: 'Blank' }
    }
  ],
  Pending: [
    {
      testCase: { type: 'Pending', result: 'Pending' },
      displayResult: { type: 'Pending', result: '#<Pending>' },
      dumpResult: { type: 'Pending', result: 'Pending' }
    }
  ],
  Waiting: [
    {
      testCase: { type: 'Waiting', result: 'Waiting' },
      displayResult: { type: 'Waiting', result: '#<Waiting>' },
      dumpResult: { type: 'Waiting', result: 'Waiting' }
    }
  ],
  Date: [
    { testCase: { type: 'Date', result: new Date() }, displayResult: null, dumpResult: undefined },
    {
      testCase: { type: 'Date', result: new Date('') },
      dumpResult: { type: 'Date', result: 'Invalid Date' },
      displayResult: { type: 'Date', result: 'Invalid Date' },
      snapshot: true
    },
    {
      testCase: { type: 'Date', result: new Date('foo bar') },
      dumpResult: { type: 'Date', result: 'Invalid Date' },
      displayResult: { type: 'Date', result: 'Invalid Date' },
      snapshot: true
    }
  ],
  Error: [
    {
      testCase: { type: 'Error', result: { message: 'bang!', type: 'runtime' } },
      displayResult: { type: 'Error', result: '#<Error> bang!' },
      dumpResult: { type: 'Error', result: { message: 'bang!', type: 'runtime' } }
    }
  ],
  Array: [
    {
      testCase: { type: 'Array', result: [{ type: 'number', result: 1 }], meta: 'number' },
      displayResult: { type: 'Array', result: '[1]' },
      dumpResult: { type: 'Array', result: [{ type: 'number', result: 1 }] }
    },
    {
      testCase: { type: 'Array', result: [], meta: 'void' },
      displayResult: { type: 'Array', result: '[]' },
      dumpResult: { type: 'Array', result: [] }
    }
  ],
  Record: [
    {
      testCase: { type: 'Record', result: { foo: { type: 'number', result: 1 } }, meta: 'number' },
      displayResult: { type: 'Record', result: '{foo: 1}' },
      dumpResult: { type: 'Record', result: { foo: { type: 'number', result: 1 } } }
    },
    {
      testCase: { type: 'Record', result: {}, meta: 'void' },
      displayResult: { type: 'Record', result: '{}' },
      dumpResult: { type: 'Record', result: {} }
    }
  ],
  Block: [
    {
      testCase: { type: 'Block', result: formulaContext.findBlockById(namespaceId)! },
      displayResult: { type: 'Block', result: 'Page1' },
      dumpResult: { type: 'Block', result: namespaceId }
    },
    {
      testCase: { type: 'Block', result: new BlockClass(formulaContext, { id: unknownNamespaceId, name: 'Page2' }) },
      dumpResult: { type: 'Block', result: unknownNamespaceId },
      displayResult: { type: 'Block', result: 'Page2' },
      matchTestCase: { result: { message: `Block not found`, type: 'deps' }, type: 'Error' }
    }
  ],
  Spreadsheet: [
    {
      testCase: { type: 'Spreadsheet', result: spreadsheet },
      displayResult: { type: 'Spreadsheet', result: 'MySpreadsheet' },
      dumpResult: { type: 'Spreadsheet', result: [spreadsheet.namespaceId, spreadsheet.spreadsheetId] }
    }
  ],
  Column: columnTypes.map(c => ({
    testCase: { type: 'Column', result: c },
    displayResult: { type: 'Column', result: `MySpreadsheet.${c.display()}` },
    dumpResult: { type: 'Column', result: [c.spreadsheetId, c.findKey] }
  })),
  Row: rowTypes.map(c => ({
    testCase: { type: 'Row', result: c },
    displayResult: { type: 'Row', result: `Row[${c.rowIndex}]` },
    dumpResult: { type: 'Row', result: [c.spreadsheetId, c.findKey] }
  })),
  Cell: cellTypes.map(c => ({
    testCase: { type: 'Cell', result: c },
    displayResult: { type: 'Cell', result: c.getValue() },
    dumpResult: { type: 'Cell', result: [c.spreadsheetId, c.via, c._cell] }
  })),
  Range: [
    {
      testCase: { type: 'Range', result: null as unknown as RangeType },
      dumpResult: { result: 'other.not_supported', type: 'Range' },
      displayResult: { type: 'Range', result: '#<Range>' },
      matchTestCase: { result: { message: 'other.not_supported', type: 'runtime' }, type: 'Error' }
    }
  ]
}

describe('persist', () => {
  const input = Object.entries(testCases).flatMap(([k, cases]) => {
    return cases.map((c, index) => ({ index, type: k, jestTitle: `dump ${k} ${index}`, ...c }))
  })

  it.todo('RowClass and CellClass cast check.')
  it.todo('Date invalid')

  it.each(input)('$jestTitle', async ({ testCase, dumpResult, snapshot, matchTestCase, displayResult }) => {
    const dumpedvalue = dump(testCase)

    if (dumpResult) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(dumpedvalue).toMatchObject(dumpResult)
    }

    const castedValue = cast(dumpedvalue, formulaContext)
    const castedResult = matchTestCase ?? testCase

    if (snapshot) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(castedValue).toMatchSnapshot()
    } else if (castedValue.type === 'Row' || castedValue.type === 'Cell') {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(matchObject(castedValue)).toMatchObject(matchObject(castedResult))
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(castedValue).toMatchObject(castedResult)
    }

    const displayValue = display(testCase)
    if (displayResult !== null) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(displayValue).toEqual(displayResult)
    }
  })
})
