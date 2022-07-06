import { SpreadsheetReloadViaId, SpreadsheetUpdateNamePayload } from '../../events'
import { mockCell, mockRow } from '../../tests/testMock'
import { SpreadsheetInput } from '../../tests/testType'
import { CodeFragment, ErrorMessage, EventDependency } from '../../types'
import { row2attrs, row2codeFragment } from '../convert'
import { OperatorType } from '../operator'

const unavailableMessage: ErrorMessage = {
  message: 'thisRow is only available in spreadsheet',
  type: 'syntax'
}

const namespaceId = '55555555-5555-aaaa-5555-555555555555'
const spreadsheetId = '22222222-2222-aaaa-2222-222222222222'

const firstColumnId = '66666666-6666-aaaa-6666-666666666666'
const firstRowId = 'eeeeeeee-eeee-aaaa-aaaa-222222222222'
const secondCellId = 'cccccccc-cccc-aaaa-aaaa-222222222222'

const richType = { type: 'spreadsheet', meta: { spreadsheetId, columnId: firstColumnId, rowId: firstRowId } } as const

export const thisRowOperator: OperatorType = {
  name: 'thisRow',
  expressionType: 'Row',
  dynamicParseType: lhsType => lhsType,
  lhsType: 'any',
  rhsType: 'any',
  dynamicInterpretLhs: async ({ interpreter }) => {
    if (interpreter.ctx.meta.richType.type !== 'spreadsheet') {
      return { type: 'Error', result: unavailableMessage.message, meta: 'runtime' }
    }

    const {
      richType: {
        meta: { spreadsheetId, rowId }
      },
      namespaceId
    } = interpreter.ctx.meta

    const row = interpreter.ctx.formulaContext.findRow(spreadsheetId, {
      namespaceId,
      type: 'id',
      value: rowId
    })
    if (!row) return { type: 'Error', result: `Row ${rowId} not found`, meta: 'runtime' }

    return { type: 'Row', result: row }
  },
  dynamicParseValidator: (cstVisitor, { image, codeFragments, type }) => {
    if (cstVisitor.ctx.meta.richType.type !== 'spreadsheet') {
      return {
        image,
        codeFragments: codeFragments.map(c => ({ ...c, errors: [unavailableMessage, ...c.errors] })),
        type
      }
    }
    const {
      richType: {
        meta: { spreadsheetId, rowId }
      },
      namespaceId
    } = cstVisitor.ctx.meta

    // TODO same as row
    const rowDependencyEvent: EventDependency<SpreadsheetUpdateNamePayload> = {
      kind: 'Row',
      event: SpreadsheetReloadViaId,
      key: `Spreadsheet#Row#${spreadsheetId}#${rowId}`,
      eventId: `${namespaceId},${spreadsheetId}`,
      scope: { rows: [rowId] }
    }
    cstVisitor.eventDependencies.push(rowDependencyEvent)

    const row = cstVisitor.ctx.formulaContext.findRow(spreadsheetId, {
      namespaceId,
      type: 'id',
      value: rowId
    })
    if (!row) {
      return {
        image,
        codeFragments: codeFragments.map(c => ({
          ...c,
          errors: [{ type: 'syntax', message: `Row ${rowId} not found` }, ...c.errors]
        })),
        type
      }
    }

    const finalCodeFragments: CodeFragment[] = [
      {
        ...row2codeFragment(row, cstVisitor.ctx.meta.namespaceId),
        display: codeFragments[0].display,
        code: 'ThisRow',
        attrs: row2attrs(row)
      }
    ]

    return { image, codeFragments: finalCodeFragments, type }
  },
  interpret: async ({ lhs }) => lhs,
  testCases: {
    pages: [
      {
        pageName: 'ThisRowPage',
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
                cells: [{ value: '1' }, { value: '3' }, { value: '5' }]
              },
              {
                name: 'second',
                displayIndex: 'B',
                cells: [{ value: '2', cellId: secondCellId }, { value: '4' }, { value: '6' }]
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
      { definition: `=thisrow`, result: mockRow('1'), richType, namespaceId },
      { definition: `=ThisRow.B`, result: mockCell('2', secondCellId, 'B', firstRowId), richType, namespaceId },
      { definition: `=ROW(ThisRow)`, result: 1, richType, namespaceId },
      { definition: `=ROW(ThisRow.B)`, result: 1, richType, namespaceId },
      { definition: `=ThisRow["B"]`, result: mockCell('2', secondCellId, 'B', firstRowId), richType, namespaceId },
      {
        definition: `=ThisRow.second`,
        result: mockCell('2', secondCellId, 'second', firstRowId),
        richType,
        namespaceId
      },
      {
        definition: `=ThisRow["second"]`,
        result: mockCell('2', secondCellId, 'second', firstRowId),
        richType,
        namespaceId
      },
      { definition: `=ThisRow["second"] + 1`, result: 3, richType, namespaceId }
    ],
    errorTestCases: [
      { definition: `=ThisRow`, errorType: 'syntax', errorMessage: `thisRow is only available in spreadsheet` },
      {
        definition: `=ThisRow.A`,
        errorType: 'circular_dependency',
        errorMessage: 'Circular dependency found',
        richType,
        namespaceId
      }
    ]
  }
}
