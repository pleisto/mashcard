import { BlockType, SpreadsheetType } from '../../controls'
import { FunctionContext, VariableInterface } from '../../types'
import { OperatorType } from '../operator'
import { block2codeFragment, spreadsheet2codeFragment, variable2codeFragment } from '../convert'
import { fetchResult } from '../../context/variable'
import { parseTrackBlock, parseTrackName, parseTrackSpreadsheet, parseTrackVariable } from '../dependency'

const findToken = (
  ctx: FunctionContext,
  name: string
):
  | undefined
  | { kind: 'Block'; data: BlockType }
  | { kind: 'Variable'; data: VariableInterface }
  | { kind: 'Spreadsheet'; data: SpreadsheetType } => {
  const obj = ctx.formulaContext.findNames(ctx.meta.namespaceId, name)[0]
  if (!obj) return undefined

  switch (obj.kind) {
    case 'Block':
      return { kind: obj.kind, data: ctx.formulaContext.findBlockById(obj.id)! }
    case 'Variable':
      return { kind: obj.kind, data: ctx.formulaContext.findVariableById(ctx.meta.namespaceId, obj.id)! }
    case 'Spreadsheet':
      return {
        kind: obj.kind,
        data: ctx.formulaContext.findSpreadsheet({ namespaceId: ctx.meta.namespaceId, type: 'id', value: obj.id })!
      }
  }
}

const buildNotFoundMessage = (name: string): string => `"${name}" not found`

export const nameOperator: OperatorType = {
  name: 'name',
  expressionType: 'any',
  dynamicParseType: lhsType => lhsType,
  lhsType: 'any',
  rhsType: 'any',
  dynamicInterpretLhs: async (args, operators, interpreter) => {
    const image = operators[0].image
    const result = findToken(interpreter.ctx, image)
    if (!result) return { type: 'Error', result: buildNotFoundMessage(image), errorKind: 'deps' }

    switch (result.kind) {
      case 'Block':
        return { type: 'Block', result: result.data }
      case 'Spreadsheet':
        return { type: 'Spreadsheet', result: result.data }
      case 'Variable':
        return (await result.data.t.task.variableValue).result
    }
  },
  dynamicParseValidator: (cstVisitor, { image, codeFragments, type }) => {
    const result = findToken(cstVisitor.ctx, image)
    if (!result) {
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
    switch (result.kind) {
      case 'Block':
        parseTrackBlock(cstVisitor, result.data)
        return {
          codeFragments: [block2codeFragment(result.data, cstVisitor.ctx.meta.namespaceId)],
          image,
          type: 'Block'
        }
      case 'Spreadsheet':
        parseTrackSpreadsheet(cstVisitor, result.data)
        return {
          codeFragments: [spreadsheet2codeFragment(result.data, cstVisitor.ctx.meta.namespaceId)],
          image,
          type: 'Spreadsheet'
        }
      case 'Variable':
        parseTrackVariable(cstVisitor, result.data, cstVisitor.ctx.meta.namespaceId)
        return {
          codeFragments: [variable2codeFragment(result.data, cstVisitor.ctx.meta.namespaceId)],
          image,
          type: fetchResult(result.data.t).type
        }
    }
  },
  interpret: async ({ lhs }) => lhs,
  testCases: {
    pages: []
  }
}
