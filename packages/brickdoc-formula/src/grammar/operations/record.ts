import { CodeFragment, ErrorMessage, RecordResult } from '../../types'
import { codeFragment2string } from '../convert'
import { OperatorType } from '../operator'
import { extractSubType } from '../util'

export const recordOperator: OperatorType = {
  name: 'record',
  expressionType: 'Record',
  skipReturnEarlyCheck: true,
  dynamicInterpretLhs: () => ({ type: 'Record', subType: 'void', result: {} }),
  lhsType: 'any',
  rhsType: 'any',
  parseRhs: ({
    rhsCodeFragments,
    operatorTokenCodeFragments,
    rhsTokenCodeFragments,
    operatorTokenImage,
    rhsTokenImage
  }) => {
    const nameDuplicateErrors: ErrorMessage[] = []
    const keyFragments = rhsTokenCodeFragments[0]
    if (keyFragments) {
      const key = codeFragment2string(keyFragments)
      const keyArray = rhsCodeFragments.map(c => codeFragment2string(c))
      if (key && keyArray.includes(key)) {
        nameDuplicateErrors.push({ message: 'Record key duplicated', type: 'syntax' })
      }
    }

    const codeFragments: CodeFragment[] = [
      ...rhsTokenCodeFragments.map(c => ({ ...c, errors: [...nameDuplicateErrors, ...c.errors] })),
      ...operatorTokenCodeFragments
    ]
    const images: string[] = [rhsTokenImage, operatorTokenImage]

    return {
      codeFragments,
      image: images.join(''),
      type: 'any'
    }
  },
  interpret: async ({ lhs, rhs }) => {
    const { result: lhsResult, type, subType } = lhs as RecordResult
    const {
      result: { key, value }
    } = rhs as RecordResult

    return { type, subType, result: { ...lhsResult, [key.result as string]: value } }
  },
  packageInterpretResult: ({ result: inputResult }) => {
    const result = inputResult as RecordResult['result']
    return { type: 'Record', subType: extractSubType(Object.values(result)), result }
  }
}
