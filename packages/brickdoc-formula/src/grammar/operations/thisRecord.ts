import { SpreadsheetReloadViaId } from '../../events'
import { CodeFragment, ErrorMessage, EventDependency } from '../../types'
import { spreadsheet2attrs, spreadsheet2codeFragment } from '../convert'
import { OperatorType } from '../operator'

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
  dynamicInterpretLhs: (args, operators, interpreter) => {
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
    const spreadsheetReloadEventDependency: EventDependency = {
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
  interpret: async ({ lhs }) => lhs
}
