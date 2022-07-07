import { uuid } from '@mashcard/active-support'
import { Column, Row, Cell, SpreadsheetInitializer, SpreadsheetClass } from '../../controls'
import { columnDisplayIndex } from '../../grammar'
import { FunctionContext, createFunctionClause, AnyTypeResult } from '../../type'

const Spreadsheet = (
  ctx: FunctionContext,
  { result, meta }: AnyTypeResult<'Array'>
): AnyTypeResult<'Spreadsheet' | 'Error'> => {
  const defaultData: Array<AnyTypeResult<'Record'>> = [
    {
      type: 'Record',
      meta: 'string',
      result: { Column1: { type: 'string', result: '1' }, Column2: { type: 'string', result: '2' } }
    },
    {
      type: 'Record',
      meta: 'string',
      result: { Column1: { type: 'string', result: '3' }, Column2: { type: 'string', result: '4' } }
    }
  ]

  const recordData: Array<AnyTypeResult<'Record'>> = result.length
    ? (result as Array<AnyTypeResult<'Record'>>)
    : defaultData

  if (!['void', 'Record'].includes(meta)) {
    return { type: 'Error', result: `Spreadsheet type unmatched: ${meta}`, meta: 'runtime' }
  }

  const spreadsheetId = uuid()
  const defaultName = 'Dynamic Spreadsheet'
  const columns: Column[] = []
  const rows: Row[] = []
  const cells: Cell[] = []

  if (recordData.length) {
    const data = recordData.map(e => e.result)
    const keys = Object.keys(data[0])
    const keyWithIds = keys.map(key => ({ key, uuid: uuid() }))

    keys.forEach((key, index) => {
      const column: Column = {
        spreadsheetId,
        columnId: keyWithIds.find(k => k.key === key)!.uuid,
        name: key,
        sort: index,
        title: key,
        displayIndex: columnDisplayIndex(index),
        index
      }

      columns.push(column)
    })

    data.forEach((row, rowIndex) => {
      const rowId = uuid()
      rows.push({ rowId, rowIndex, spreadsheetId })

      columns.forEach(({ name, columnId }, columnIndex) => {
        const cell: Cell = {
          namespaceId: ctx.meta.namespaceId,
          spreadsheetId,
          columnId,
          rowId,
          rowIndex,
          columnIndex,
          cellId: uuid(),
          variableId: uuid(),
          value: String(row[name]?.result ?? '')
        }
        cells.push(cell)
      })
    })
  }

  // devLog({ recordData, rows, columns })

  const spreadsheetDefinition: SpreadsheetInitializer = {
    ctx,
    spreadsheetId,
    namespaceId: ctx.meta.namespaceId,
    dynamic: true,
    name: defaultName,
    columns,
    rows,
    getCell: ({ rowId, columnId }) => {
      return cells.find(cell => cell.rowId === rowId && cell.columnId === columnId)!
    }
  }

  const spreadsheet = new SpreadsheetClass(spreadsheetDefinition)
  return { type: 'Spreadsheet', result: spreadsheet }
}

/**
 * @source
 */
export const spreadsheetSpreadsheet = createFunctionClause({
  name: 'Spreadsheet',
  async: false,
  pure: true,
  persist: false,
  lazy: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=123', output: null }],
  description: 'Creates a spreadsheet',
  group: 'core',
  args: [{ name: 'array', type: 'Array' }],
  returns: 'Spreadsheet',
  testCases: [],
  chain: true,
  reference: Spreadsheet
})
