import { BlockType } from '../controls'
import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Block' as const
const ShortName = 'block' as const

export type FormulaBlockType = BaseResult<typeof TypeName, BlockType>

export const FormulaBlockAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: ({ result, ...rest }) => ({ ...rest, result: result.id }),
  cast: ({ result, ...rest }, ctx) => {
    const block = ctx.findBlockById(result)
    return block ? { ...rest, result: block } : { ...rest, result: `Block not found`, meta: 'deps', type: 'Error' }
  },
  display: ({ result, ...rest }) => ({ ...rest, result: result.name('') })
}
