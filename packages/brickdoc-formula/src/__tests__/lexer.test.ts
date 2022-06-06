import { FormulaLexer, tokenVocabulary } from '../grammar/lexer'
import { tokenMatcher } from 'chevrotain'

const lexer = FormulaLexer

describe('lex', () => {
  it('Can Lex a simple input', () => {
    const inputText = '= 1 + 1'
    const lexingResult = lexer.tokenize(inputText)

    expect(lexingResult.errors).toEqual([])

    const tokens = lexingResult.tokens
    expect(tokens.length).toEqual(4)
    expect(tokens.map(token => token.image)).toEqual(['=', '1', '+', '1'])

    expect(tokenMatcher(tokens[0], (tokenVocabulary as any).Equal)).toEqual(true)
    expect(tokenMatcher(tokens[1], (tokenVocabulary as any).NumberLiteral)).toEqual(true)
    expect(tokenMatcher(tokens[2], (tokenVocabulary as any).Plus)).toEqual(true)
    expect(tokenMatcher(tokens[3], (tokenVocabulary as any).NumberLiteral)).toEqual(true)
  })
})
