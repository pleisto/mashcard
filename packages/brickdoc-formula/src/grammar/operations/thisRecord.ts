import { SpreadsheetReloadViaId, SpreadsheetUpdateNameViaIdPayload } from '../../events'
import { mockCell, mockSpreadsheet } from '../../tests/testMock'
import { SpreadsheetInput } from '../../tests/testType'
import { CodeFragment, ErrorMessage, EventDependency } from '../../types'
import { spreadsheet2attrs, spreadsheet2codeFragment } from '../convert'
import { OperatorType } from '../operator'

const namespaceId = '55555555-5555-bbbb-5555-555555555555'
const spreadsheetId = '22222222-2222-bbbb-2222-222222222222'

const firstColumnId = '66666666-6666-bbbb-6666-666666666666'
const firstRowId = 'eeeeeeee-eeee-bbbb-bbbb-222222222222'
const secondCellId = 'cccccccc-cccc-bbbb-aaaa-222222222222'

const richType = { type: 'spreadsheet', meta: { spreadsheetId, columnId: firstColumnId, rowId: firstRowId } } as const

const unavailableMessage: ErrorMessage = {
  message: 'thisRecord is only available in spreadsheet',
  type: 'syntax'
}

export const thisRecordOperator: OperatorType = {
  name: 'thisRecord',
  expressionType: 'Spreadsheet',
  dynamicParseType: lhsType => lhsType,
  lhsType: 'any',
  rhsType: 'any',
  dynamicInterpretLhs: async (args, operators, interpreter) => {
    if (interpreter.ctx.meta.richType.type !== 'spreadsheet') {
      return { type: 'Error', result: unavailableMessage.message, errorKind: 'runtime' }
    }

    const {
      richType: {
        meta: { spreadsheetId }
      },
      namespaceId
    } = interpreter.ctx.meta

    const spreadsheet = interpreter.ctx.formulaContext.findSpreadsheet({
      namespaceId,
      value: spreadsheetId,
      type: 'id'
    })
    if (!spreadsheet) return { type: 'Error', result: `Spreadsheet ${spreadsheet} not found`, errorKind: 'runtime' }

    return { type: 'Spreadsheet', result: spreadsheet }
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
        meta: { spreadsheetId }
      },
      namespaceId
    } = cstVisitor.ctx.meta

    // TODO same as spreadsheet
    const spreadsheetReloadEventDependency: EventDependency<SpreadsheetUpdateNameViaIdPayload> = {
      eventId: `${namespaceId},${spreadsheetId}`,
      event: SpreadsheetReloadViaId,
      key: `Spreadsheet#${spreadsheetId}`,
      scope: {},
      kind: 'Spreadsheet'
    }

    cstVisitor.eventDependencies.push(spreadsheetReloadEventDependency)

    const spreadsheet = cstVisitor.ctx.formulaContext.findSpreadsheet({ namespaceId, type: 'id', value: spreadsheetId })
    if (!spreadsheet) {
      return {
        image,
        codeFragments: codeFragments.map(c => ({
          ...c,
          errors: [{ type: 'syntax', message: 'Spreadsheet not found' }, ...c.errors]
        })),
        type
      }
    }

    const finalCodeFragments: CodeFragment[] = [
      {
        ...spreadsheet2codeFragment(spreadsheet, namespaceId),
        display: codeFragments[0].display,
        code: 'ThisRecord',
        attrs: spreadsheet2attrs(spreadsheet)
      }
    ]

    const errorMessages: ErrorMessage[] = []
    return {
      image,
      codeFragments: finalCodeFragments.map(c => ({ ...c, errors: [...errorMessages, ...c.errors] })),
      type
    }
  },
  interpret: async ({ lhs }) => lhs,
  testCases: {
    pages: [
      {
        pageName: 'ThisRecordPage',
        pageId: namespaceId,
        spreadsheets: [
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<3, 3>>{
            name: 'thisRecord Spreadsheet',
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
      {
        definition: `=ThisRecord`,
        result: mockSpreadsheet('thisRecord Spreadsheet', spreadsheetId),
        richType,
        namespaceId
      },
      { definition: `=ThisRecord.B.1`, result: mockCell('2', secondCellId, 'B', '1'), richType, namespaceId }
    ],
    errorTestCases: [
      {
        definition: `=ThisRecord.A.1`,
        errorType: 'circular_dependency',
        errorMessage: 'Circular dependency found',
        richType,
        namespaceId
      },
      {
        definition: `=ThisRecord`,
        errorType: 'syntax',
        errorMessage: `thisRecord is only available in spreadsheet`,
        namespaceId
      }
    ]
  }
}
