import { OperatorType } from '../operator'

export const blockOperator: OperatorType = {
  name: 'block',
  expressionType: 'Block',
  dynamicParseType: lhsType => lhsType,
  lhsType: 'any',
  rhsType: 'any',
  dynamicInterpretLhs: (args, operators, interpreter) => {
    const op = operators?.[0]
    if (!op) throw new Error('unsupported expression')
    const namespaceId = op.tokenType.name === 'CurrentBlock' ? interpreter.ctx.meta.namespaceId : op.image
    const block = interpreter.ctx.formulaContext.findBlockById(namespaceId)

    if (block) {
      return { type: 'Block', result: block }
    }

    return { type: 'Error', result: `Block ${namespaceId} not found`, errorKind: 'runtime' }
  },
  interpret: async ({ lhs }) => lhs
}
