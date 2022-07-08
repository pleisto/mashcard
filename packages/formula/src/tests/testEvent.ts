import {
  dispatchFormulaBlockNameChange,
  dispatchFormulaBlockSoftDelete,
  dispatchFormulaSpreadsheetColumnChange,
  dispatchFormulaSpreadsheetNameChange,
  dispatchFormulaSpreadsheetRemove,
  dispatchFormulaSpreadsheetRowChange
} from '../events'
import { generateVariable, interpret, parse } from '../grammar/core'
import { FormulaDefinition, FunctionContext, VariableInterface } from '../type'
import { BaseTestCase, ExtendedCtx } from './testType'

const interpretVariable = async (ctx: FunctionContext): Promise<VariableInterface> => {
  const parseResult = parse(ctx)
  const tempT = await interpret({ ctx, parseResult })
  const variable = generateVariable({ formulaContext: ctx.formulaContext, t: tempT })
  return variable
}

const variableInsertOnlyEvent = async (ctx: ExtendedCtx, args: BaseTestCase<{}>): Promise<void> => {
  const newCtx = { ...ctx, meta: ctx.buildMeta(args) }
  const variable = await interpretVariable(newCtx)
  await variable.save()
}

const variableInsertAndAwaitEvent = async (ctx: ExtendedCtx, args: BaseTestCase<{}>): Promise<void> => {
  const newCtx = { ...ctx, meta: ctx.buildMeta(args) }
  const variable = await interpretVariable(newCtx)
  await variable.t.task.variableValue
  await variable.save()
}

type OmitUsername<T extends (a: any) => any> = Omit<Parameters<T>[0], 'username'>

export const AllowEvents = {
  empty_sync: (ctx: ExtendedCtx, args: any) => {},
  empty_async: async (ctx: ExtendedCtx, args: any) => {},
  blockChangeName: async (ctx: ExtendedCtx, args: OmitUsername<typeof dispatchFormulaBlockNameChange>) =>
    await dispatchFormulaBlockNameChange({ ...args, username: ctx.formulaContext.domain }),
  blockDelete: async (ctx: ExtendedCtx, args: OmitUsername<typeof dispatchFormulaBlockSoftDelete>) =>
    await dispatchFormulaBlockSoftDelete({ ...args, username: ctx.formulaContext.domain }),
  spreadsheetChangeName: async (ctx: ExtendedCtx, args: OmitUsername<typeof dispatchFormulaSpreadsheetNameChange>) =>
    await dispatchFormulaSpreadsheetNameChange({ ...args, username: ctx.formulaContext.domain }),
  spreadsheetDelete: async (ctx: ExtendedCtx, args: OmitUsername<typeof dispatchFormulaSpreadsheetRemove>) =>
    await dispatchFormulaSpreadsheetRemove({ ...args, username: ctx.formulaContext.domain }),
  columnChange: async (ctx: ExtendedCtx, args: OmitUsername<typeof dispatchFormulaSpreadsheetColumnChange>) =>
    await dispatchFormulaSpreadsheetColumnChange({ ...args, username: ctx.formulaContext.domain }),
  rowChange: async (ctx: ExtendedCtx, args: OmitUsername<typeof dispatchFormulaSpreadsheetRowChange>) =>
    await dispatchFormulaSpreadsheetRowChange({ ...args, username: ctx.formulaContext.domain }),
  variableInsertOnly: async (ctx: ExtendedCtx, args: Parameters<typeof variableInsertOnlyEvent>[1]) =>
    await variableInsertOnlyEvent(ctx, args),
  variableInsertAndAwait: async (ctx: ExtendedCtx, args: Parameters<typeof variableInsertAndAwaitEvent>[1]) =>
    await variableInsertAndAwaitEvent(ctx, args),
  variableDelete: async (ctx: ExtendedCtx, args: {}) =>
    await ctx.formulaContext.removeVariable(ctx.meta.namespaceId, ctx.meta.variableId),
  variableUpdateDefinition: async (ctx: ExtendedCtx, args: FormulaDefinition) => {
    const variable = ctx.formulaContext.findVariableById(ctx.meta.namespaceId, ctx.meta.variableId)!
    await variable.updateDefinition(args)
  }
} as const
