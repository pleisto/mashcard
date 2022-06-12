import { pluralize, singularize } from '../inflections'

describe('.pluralize', () => {
  it('should return the plural form of a word', () => {
    expect(pluralize('word')).toEqual('words')
    expect(pluralize('datum')).toEqual('data')
    expect(pluralize('water')).toEqual('water')
  })
})
describe('.singularize', () => {
  it('should return the singular form of a word', () => {
    expect(singularize('words')).toEqual('word')
    expect(singularize('quizzes')).toEqual('quiz')
    expect(singularize('news')).toEqual('news')
    expect(singularize('are')).toEqual('is')
  })
})
