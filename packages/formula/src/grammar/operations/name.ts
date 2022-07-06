import { BlockType, ColumnType, SpreadsheetType } from '../../controls'
import { FunctionContext, VariableInterface } from '../../type'
import { OperatorType } from '../operator'
import { block2codeFragment, column2codeFragment, spreadsheet2codeFragment, variable2codeFragment } from '../convert'
import { fetchResult } from '../../context/variable'
import {
  parseTrackBlock,
  parseTrackColumn,
  parseTrackName,
  parseTrackSpreadsheet,
  parseTrackSpreadsheetLoad,
  parseTrackVariable
} from '../dependency'
import { mockBlock, mockColumn, mockSpreadsheet } from '../../tests/testMock'
import { SpreadsheetInput } from '../../tests/testType'
import { CodeFragmentVisitor } from '../codeFragment'

const namespaceId = 'cccccccc-5555-bbbb-6666-777777777777'
const spreadsheet1Id = 'cccccccc-5555-bbbb-6666-888888888888'
const spreadsheet2Id = 'cccccccc-5555-bbbb-6666-999999999999'
const firstColumnId = 'cccccccc-6666-aaaa-6666-666666666666'
const firstRowId = 'cccccccc-eeee-aaaa-bbbb-222222222222'
const richType = {
  type: 'spreadsheet',
  meta: { spreadsheetId: spreadsheet1Id, columnId: firstColumnId, rowId: firstRowId }
} as const

const findToken = (
  ctx: FunctionContext,
  name: string
):
  | [undefined, undefined | ((visitor: CodeFragmentVisitor) => void)]
  | ['Block', BlockType]
  | ['Variable', VariableInterface]
  | ['Column', ColumnType]
  | ['Spreadsheet', SpreadsheetType] => {
  const obj = ctx.formulaContext.findNames(ctx.meta.namespaceId, name)[0]
  if (obj) {
    switch (obj.kind) {
      case 'Block':
        return [obj.kind, ctx.formulaContext.findBlockById(obj.id)!]
      case 'Variable':
        return [obj.kind, ctx.formulaContext.findVariableById(ctx.meta.namespaceId, obj.id)!]
      case 'Spreadsheet':
        return [
          obj.kind,
          ctx.formulaContext.findSpreadsheet({ namespaceId: ctx.meta.namespaceId, type: 'id', value: obj.id })!
        ]
    }
  }

  if (ctx.meta.richType.type === 'spreadsheet') {
    const {
      namespaceId,
      richType: {
        meta: { spreadsheetId }
      }
    } = ctx.meta
    const spreadsheet = ctx.formulaContext.findSpreadsheet({ namespaceId, type: 'id', value: spreadsheetId })
    if (!spreadsheet) return [undefined, visitor => parseTrackSpreadsheetLoad(visitor, namespaceId, spreadsheetId)]

    const column = spreadsheet.findColumn({ type: 'name', value: name, namespaceId })
    if (!column) return [undefined, undefined]

    return ['Column', column]
  }

  return [undefined, undefined]
}

const buildNotFoundMessage = (name: string): string => `"${name}" not found`

export const nameOperator: OperatorType = {
  name: 'name',
  expressionType: 'any',
  dynamicParseType: lhsType => lhsType,
  lhsType: 'any',
  rhsType: 'any',
  dynamicInterpretLhs: async ({ operators, interpreter }) => {
    const image = operators[0]!.image
    const [kind, result] = findToken(interpreter.ctx, image)
    if (!kind) return { type: 'Error', result: buildNotFoundMessage(image), meta: 'deps' }

    switch (kind) {
      case 'Block':
        return { type: 'Block', result }
      case 'Spreadsheet':
        return { type: 'Spreadsheet', result }
      case 'Column':
        return { type: 'Column', result }
      case 'Variable':
        return (await result.t.task.variableValue).result
    }
  },
  dynamicParseValidator: (cstVisitor, { image, codeFragments, type }) => {
    const [kind, result] = findToken(cstVisitor.ctx, image)
    if (!kind) {
      result?.(cstVisitor)
      parseTrackName(cstVisitor, image, cstVisitor.ctx.meta.namespaceId)
      return {
        image,
        codeFragments: codeFragments.map(c => ({
          ...c,
          errors: [{ message: buildNotFoundMessage(image), type: 'syntax' }]
        })),
        type
      }
    }
    switch (kind) {
      case 'Block':
        parseTrackBlock(cstVisitor, result)
        return {
          codeFragments: [block2codeFragment(result, cstVisitor.ctx.meta.namespaceId)],
          image,
          type: 'Block'
        }
      case 'Spreadsheet':
        parseTrackSpreadsheet(cstVisitor, result)
        return {
          codeFragments: [spreadsheet2codeFragment(result, cstVisitor.ctx.meta.namespaceId)],
          image,
          type: 'Spreadsheet'
        }
      case 'Column':
        parseTrackColumn(cstVisitor, result)
        return {
          codeFragments: [column2codeFragment(result, cstVisitor.ctx.meta.namespaceId)],
          image,
          type: 'Column'
        }
      case 'Variable':
        parseTrackVariable(cstVisitor, result, cstVisitor.ctx.meta.namespaceId)
        return {
          codeFragments: [variable2codeFragment(result, cstVisitor.ctx.meta.namespaceId)],
          image,
          type: fetchResult(result.t).type
        }
    }
  },
  interpret: async ({ lhs }) => lhs,
  testCases: {
    pages: [
      {
        pageName: 'NamePage',
        pageId: namespaceId,
        variables: [{ variableName: 'foo', definition: '=1' }],
        spreadsheets: [
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<0, 0>>{
            name: 'Spreadsheet 2',
            spreadsheetId: spreadsheet2Id,
            columns: []
          },
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<3, 3>>{
            name: 'Spreadsheet1',
            spreadsheetId: spreadsheet1Id,
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
                cells: [{ value: '2' }, { value: '4' }, { value: '6' }]
              },
              {
                name: 'third column',
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
      { definition: '=NamePage', result: mockBlock('NamePage', namespaceId) },
      { definition: '=foo', result: 1, namespaceId },
      { definition: '=NamePage.foo', result: 1 },
      { definition: '=NamePage."Spreadsheet 2"', result: mockSpreadsheet('Spreadsheet 2', spreadsheet2Id) },
      { definition: '=Spreadsheet1', result: mockSpreadsheet('Spreadsheet1', spreadsheet1Id), namespaceId },
      {
        definition: '=NamePage."Spreadsheet1"',
        newAbbrevInput: '=NamePage.Spreadsheet1',
        result: mockSpreadsheet('Spreadsheet1', spreadsheet1Id)
      },
      { definition: '=NamePage.Spreadsheet1', result: mockSpreadsheet('Spreadsheet1', spreadsheet1Id) },
      { definition: `=A`, result: mockColumn('A', firstColumnId), richType, namespaceId },
      { definition: `=first`, result: mockColumn('first', firstColumnId), richType, namespaceId }
    ],
    errorTestCases: [
      { definition: '=foo', errorMessage: '"foo" not found', errorType: 'syntax' },
      { definition: '=A', errorMessage: '"A" not found', errorType: 'syntax', namespaceId },
      {
        definition: '=A.1',
        errorMessage: 'Circular dependency found',
        errorType: 'circular_dependency',
        richType,
        namespaceId
      },
      { definition: '=first', errorMessage: '"first" not found', errorType: 'syntax', namespaceId }
    ]
  }
}
