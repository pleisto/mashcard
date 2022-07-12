import { OperatorType } from '../operator'
import { accessAttribute } from './access'

export const chainOperator: OperatorType = {
  name: 'chain',
  expressionType: 'any',
  lhsType: 'any',
  rhsType: 'any',
  dynamicInterpretRhsType: ({ result, cst, args }) => {
    if (cst.name === 'keyExpression') {
      return { ...args, type: 'any' }
    }

    if (cst.name === 'FunctionCall') {
      return { ...args, chainArgs: result }
    }

    return args
  },
  interpret: async ({ lhs, rhs, cst, interpreter }) => {
    if (cst.name === 'FunctionCall') {
      return rhs!
    }

    if (cst.name === 'keyExpression') {
      return await accessAttribute(interpreter, lhs, String(rhs!.result) as string)
    }

    throw new Error(`Unexpected cst type ${cst.name}`)
  },
  testCases: {
    successTestCases: [
      { definition: '={a:1} . a', result: 1 },
      { definition: '={a:1}.b', result: 'Key b not found' },
      { definition: '=[1,2,3].1', result: 1 },
      { definition: '=[123].b', result: 'Need a number: b' },
      { definition: '={a:1}."a"', result: 1 },
      { definition: '=[2, "foo", true].2', result: 'foo' },
      { definition: '=[2, "foo", true].4', result: 'Index 4 out of bounds' },
      { definition: '=[2, "foo", true].foo', result: 'Need a number: foo' },
      // Function call
      { definition: '=1.T()', result: 1 },
      { definition: '=1 . T()', result: 1 },
      { definition: '="FOO".T().T()', result: 'FOO' },
      { definition: '=(1+1).TYPE()', result: 'number' },
      { definition: '=[1,false,"foo"].toString()', result: '[1, false, "foo"]' },
      { definition: '="foobar".START_WITH("foo")', result: true },
      { definition: '="foobar".START_WITH("bar")', result: false }
    ],
    errorTestCases: [
      { definition: '=1.a', errorType: 'syntax', errorMessage: 'Access error' },
      { definition: '=1."a"', errorType: 'syntax', errorMessage: 'Access error' },
      { definition: '=true.a', errorType: 'syntax', errorMessage: 'Access error' },
      // Function call
      { definition: '=1.START_WITH("123")', errorType: 'type', errorMessage: 'Expected string but got number' },
      { definition: '=123.ABS()', errorType: 'deps', errorMessage: 'core::ABS is not chainable' },

      { definition: '=ABS(1).', errorType: 'syntax', errorMessage: 'errors.parse.missing.expression' },
      { definition: '="FOO".', errorType: 'syntax', errorMessage: 'errors.parse.missing.expression' },
      { definition: '="FOO".T', errorType: 'syntax', errorMessage: 'Access error' },
      { definition: '="foo".START_WITH(123)', errorType: 'type', errorMessage: 'Expected string but got number' },
      { definition: '=true.START_WITH("123")', errorType: 'type', errorMessage: 'Expected string but got boolean' },
      { definition: '="123".LEN()', errorType: 'deps', errorMessage: 'core::LEN is not chainable' },

      // Visit
      { definition: '=#CurrentBlock.', errorType: 'syntax', errorMessage: 'errors.parse.missing.expression' }
    ]
  }
}
