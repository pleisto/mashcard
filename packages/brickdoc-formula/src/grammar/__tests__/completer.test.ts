import { complete, FormulaLexer } from '..'
import { CodeFragment } from '../..'
import { FormulaContext } from '../../context'

const formulaContext = new FormulaContext({ functionClauses: [] })

describe('Complete', () => {
  it('work', () => {
    const input = '=123'
    const lexResult = FormulaLexer.tokenize(input)
    const tokens = lexResult.tokens
    const namespaceId = 'd986e871-cb85-4bd5-b675-87307f60b882'
    const codeFragments: CodeFragment[]= []

    const result = complete({ formulaContext, tokens, namespaceId, codeFragments })
    expect(result.length).not.toBe(0)
  })
})
