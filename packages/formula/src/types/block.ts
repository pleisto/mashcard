import { BlockType } from '../controls'
import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Block' as const

export type FormulaBlockType = BaseResult<typeof TypeName, BlockType>

export const FormulaBlockAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: ({ result, ...rest }) => ({ ...rest, result: result.id }),
  cast: ({ result, ...rest }, ctx) => {
    const block = ctx.findBlockById(result)
    return block ? { ...rest, result: block } : { ...rest, result: `Block not found`, meta: 'deps', type: 'Error' }
  }
}
