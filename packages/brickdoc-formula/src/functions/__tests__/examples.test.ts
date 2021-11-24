/* eslint-disable @typescript-eslint/no-misused-promises */
import { BUILTIN_CLAUSES } from '..'
import { FormulaContext } from '../../context'
import { NormalFunctionClause } from '../..'

const ctx = new FormulaContext()

describe('clause examples', () => {
  ;(BUILTIN_CLAUSES as NormalFunctionClause[]).forEach(({ name, examples, reference }) => {
    it(`${name} examples`, () => {
      // eslint-disable-next-line max-nested-callbacks
      examples.forEach(async ({ input, output }) => {
        const result = await reference(ctx, ...input)
        expect(result).toEqual(output)
      })
    })
  })
})
