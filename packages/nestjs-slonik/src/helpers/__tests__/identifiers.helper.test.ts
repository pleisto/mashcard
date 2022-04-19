import * as identifiers from '../identifiers.helper'

describe('identifier helpers', () => {
  describe('fromArray()', () => {
    it('should return the list of identifiers without a table name', () => {
      const actual = identifiers.fromArray(['first', 'secondIdent', 'third_ident'])
      expect(actual).toMatchSnapshot()
    })

    it('should return the list of identifiers with a table name', () => {
      const actual = identifiers.fromArray(['first', 'secondIdent', 'third_ident'], 'my_table')
      expect(actual).toMatchSnapshot()
    })
  })

  describe('fromObject()', () => {
    it('should return the list of identifiers based on object keys', () => {
      const actual = identifiers.fromObject({
        first: 'first!',
        secondIdent: 'second',
        third_ident: 'thirdsies'
      })

      expect(actual).toMatchSnapshot()
    })

    it('should return the list of identifiers based on object keys including a table name', () => {
      const actual = identifiers.fromObject(
        {
          first: 'first!',
          secondIdent: 'second',
          third_ident: 'thirdsies'
        },
        'my_table'
      )

      expect(actual).toMatchSnapshot()
    })
  })

  describe('fromSet()', () => {
    it('should return the list of identifiers without a table name', () => {
      const actual = identifiers.fromSet(new Set(['first', 'secondIdent', 'third_ident']))
      expect(actual).toMatchSnapshot()
    })

    it('should return the list of identifiers with a table name', () => {
      const actual = identifiers.fromSet(new Set(['first', 'secondIdent', 'third_ident']), 'my_table')
      expect(actual).toMatchSnapshot()
    })
  })
})
