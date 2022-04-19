/* eslint-disable max-nested-callbacks */
import { sql } from 'slonik'

import * as values from '../values.helper'

describe('values helpers', () => {
  describe('fromObject()', () => {
    it('should return the slonik construct for a set of object properties', () => {
      const actual = values.fromObject({
        first: 'first value',
        second: 222
      })

      expect(actual).toMatchSnapshot()
    })

    it('should return the slonik construct for a set of object properties with translation', () => {
      const actual = values.fromObject(
        {
          first: 'first value',
          specialType: { isaJson: true }
        },
        (column, value) => {
          if (column === 'specialType') {
            return sql.json(value)
          } else {
            return value
          }
        }
      )

      expect(actual).toMatchSnapshot()
    })

    it('should return the slonik construct for a set of object properties with translation that operates on the column name', () => {
      const actual = values.fromObject(
        {
          first: 'first value',
          specialType: { isaJson: true }
        },
        (column, value) => (column === 'specialType' ? ['special_type', sql.json(value)] : value)
      )

      expect(actual).toMatchSnapshot()
    })
  })

  describe('fromMap()', () => {
    it('should return the slonik construct for a map object', () => {
      const actual = values.fromMap(
        new Map<string, any>([
          ['first', 'first value'],
          ['second', 222]
        ])
      )

      expect(actual).toMatchSnapshot()
    })

    it('should return the slonik construct for a map object with translation', () => {
      const actual = values.fromMap(
        new Map<string, any>([
          ['first', 'first value'],
          ['specialType', { isaJson: true }]
        ]),
        (column, value) => {
          if (column === 'specialType') {
            return sql.json(value)
          } else {
            return value
          }
        }
      )

      expect(actual).toMatchSnapshot()
    })
  })
})
