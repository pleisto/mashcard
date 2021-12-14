import { PredicateFunction, PredicateResult } from '..'

export const buildPredicate = ({ result: { result }, operator }: PredicateResult): PredicateFunction => {
  switch (operator) {
    case 'equal':
      return input => input === result
    case 'notEqual':
      return input => input !== result
    case 'greaterThan':
      return input => input > result
    case 'greaterThanEqual':
      return input => input >= result
    case 'lessThan':
      return input => input < result
    case 'lessThanEqual':
      return input => input <= result
  }
}
