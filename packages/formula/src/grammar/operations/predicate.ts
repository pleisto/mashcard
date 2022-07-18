import { tokenMatcher } from 'chevrotain'
import { AnyTypeResult } from '../../type'
import { PredicateOperator } from '../../types/predicate'
import { Equal, Equal2, NotEqual, NotEqual2, LessThan, GreaterThan, LessThanEqual, GreaterThanEqual } from '../lexer'
import { OperatorType } from '../operator'

export const predicateOperator: OperatorType = {
  name: 'predicate',
  expressionType: 'Predicate',
  lhsType: ['number', 'string'],
  rhsType: 'any',
  interpret: async ({ lhs, operator }) => {
    const result = lhs as AnyTypeResult<'number' | 'string'>
    let image: PredicateOperator
    if (tokenMatcher(operator, Equal) || tokenMatcher(operator, Equal2)) {
      image = 'equal'
    } else if (tokenMatcher(operator, NotEqual) || tokenMatcher(operator, NotEqual2)) {
      image = 'notEqual'
    } else if (tokenMatcher(operator, LessThan)) {
      image = 'lessThan'
    } else if (tokenMatcher(operator, GreaterThan)) {
      image = 'greaterThan'
    } else if (tokenMatcher(operator, LessThanEqual)) {
      image = 'lessThanEqual'
    } else if (tokenMatcher(operator, GreaterThanEqual)) {
      image = 'greaterThanEqual'
    } else {
      throw new Error(`Unexpected operator ${operator.image}`)
    }

    return { type: 'Predicate', result: result.result, meta: { operator: image } }
  },
  testCases: {
    successTestCases: [
      { definition: '= =1', result: 1 },
      { definition: '=>=3', result: 3 },
      { definition: '=!="foo"', result: 'foo' },
      { definition: '=<>"123"', result: '123' },
      { definition: '= <= (1+1)', result: 2 }
    ],
    errorTestCases: [
      {
        definition: '=>=true',
        errorType: 'type',
        errorMessage: ['errors.parse.mismatch.type', { expected: 'number', got: 'boolean' }]
      }
    ]
  }
}
