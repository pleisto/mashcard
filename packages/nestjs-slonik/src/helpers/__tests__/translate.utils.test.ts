import { translateValue, getValueFromResult, getColumnNameFromResult } from '../translate.utils'

describe('translate', () => {
  describe('translateValue()', () => {
    it('returns the current value given the value is not a special type', () => {
      const actual = translateValue('myCol', 'just a string')
      expect(actual).toEqual(['myCol', 'just a string'])
    })
  })

  describe('getValueFromResult()', () => {
    it('returns the value expression given the translation result is an array', () => {
      const actual = getValueFromResult(['myCol', 'just a string'])
      expect(actual).toEqual('just a string')
    })
  })

  describe('getColumnNameFromResult()', () => {
    it('returns the column name given the translation result is an array', () => {
      const actual = getColumnNameFromResult(['myCol', 'just a string'])
      expect(actual).toEqual('myCol')
    })
  })
})
