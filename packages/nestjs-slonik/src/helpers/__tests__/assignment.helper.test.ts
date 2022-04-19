/* eslint-disable max-nested-callbacks */
import { sql } from 'slonik'

import * as assignment from '../assignment.helper'

describe('assignment helpers', () => {
  describe('fromObject()', () => {
    it('should return a constructed SqlTokenType', () => {
      const actual = assignment.fromObject({
        first: 'my first value'
      })

      expect(actual).toMatchSnapshot()
    })

    it('should return a constructed SqlTokenType with basic type assumptions', () => {
      const actual = assignment.fromObject({
        first: 'a string',
        second: 22
      })

      expect(actual).toMatchSnapshot()
    })

    describe('given a custom translate function', () => {
      it('should return a constructed SqlTokenType', () => {
        const actual = assignment.fromObject(
          {
            customType: { iamJson: true },
            customType2: ['one', 'two', 'three']
          },
          (column, value) => {
            if (column === 'customType') {
              return sql.json(value)
            } else if (column === 'customType2') {
              return sql.array(value, 'text')
            } else {
              return value
            }
          }
        )

        expect(actual).toMatchSnapshot()
      })

      it('should return a slonik construct including a column name translation', () => {
        const actual = assignment.fromObject(
          {
            customType: { iamJson: true },
            customType2: ['one', 'two', 'three']
          },
          (column, value) => {
            const newColumn = `${column}_translated`
            if (column === 'customType') {
              return [newColumn, sql.json(value)]
            } else if (column === 'customType2') {
              return [newColumn, sql.array(value, 'text')]
            } else {
              return [newColumn, value]
            }
          }
        )

        expect(actual).toMatchSnapshot()
      })

      it('should allow mixing return types in the custom translation', () => {
        const actual = assignment.fromObject(
          {
            customType: { iamJson: true },
            customType2: ['one', 'two', 'three']
          },
          (column, value) => {
            const newColumn = `${column}_translated`
            if (column === 'customType') {
              return [newColumn, sql.json(value)]
            } else {
              return value
            }
          }
        )

        expect(actual).toMatchSnapshot()
      })
    })
  })

  describe('fromMap()', () => {
    it('should return a constructed SqlTokenType', () => {
      const actual = assignment.fromMap(new Map([['first', 'my first value']]))

      expect(actual).toMatchSnapshot()
    })

    it('should return a constructed SqlTokenType with basic type assumptions', () => {
      const actual = assignment.fromMap(
        new Map<string, any>([
          ['first', 'a string'],
          ['second', 22]
        ])
      )

      expect(actual).toMatchSnapshot()
    })
  })
})
