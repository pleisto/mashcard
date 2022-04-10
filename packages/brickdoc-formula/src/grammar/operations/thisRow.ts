import { SpreadsheetReloadViaId } from '@brickdoc/schema'
import { CodeFragment, ErrorMessage, EventDependency } from '../../types'
import { row2attrs, row2codeFragment } from '../convert'
import { OperatorType } from '../operator'

const unavailableMessage: ErrorMessage = {
  message: 'thisRow is only available in spreadsheet',
  type: 'syntax'
}

export const thisRowOperator: OperatorType = {
  name: 'thisRow',
  expressionType: 'Row',
  dynamicParseType: lhsType => lhsType,
  lhsType: 'any',
  rhsType: 'any',
  dynamicInterpretLhs: (args, operators, interpreter) => {
    if (interpreter.ctx.meta.richType.type !== 'spreadsheet') {
      return { type: 'Error', result: unavailableMessage.message, errorKind: 'runtime' }
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
    if (!row) return { type: 'Error', result: `Row ${rowId} not found`, errorKind: 'runtime' }

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
    const rowDependencyEvent: EventDependency = {
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

    const errorMessages: ErrorMessage[] = []
    return {
      image,
      codeFragments: finalCodeFragments.map(c => ({ ...c, errors: [...errorMessages, ...c.errors] })),
      type
    }
  },
  interpret: async ({ lhs }) => lhs
}
