import { CstNode, IToken } from 'chevrotain'
import { TestCaseType } from '../tests'
import { AnyTypeResult, CodeFragment, CodeFragmentResult, ErrorMessage, FormulaCheckType, FormulaType } from '../types'
import { CodeFragmentVisitor, CstVisitorArgument, token2fragment } from './codeFragment'
import { InterpretArgument, FormulaInterpreter } from './interpreter'
import { intersectType, runtimeCheckType, shouldReturnEarly } from './util'

export type OperatorName =
  | 'name'
  | 'access'
  | 'addition'
  | 'arguments'
  | 'array'
  | 'block'
  | 'chain'
  | 'combine'
  | 'compare'
  | 'concat'
  | 'equalCompare'
  | 'expression'
  | 'in'
  | 'multiplication'
  | 'not'
  | 'parenthesis'
  | 'predicate'
  | 'range'
  | 'record'
  | 'recordField'
  | 'thisRecord'
  | 'thisRow'
export interface OperatorType {
  readonly name: OperatorName
  readonly skipReturnEarlyCheck?: boolean
  readonly skipReturnFinalCheck?: boolean
  readonly skipRhsCstParse?: boolean
  readonly reverseLhsAndRhs?: boolean
  readonly testCases?: TestCaseType
  readonly expressionType: FormulaType
  readonly lhsType: FormulaCheckType
  readonly dynamicInterpretLhs?: (
    lhsArgs: InterpretArgument,
    operators: IToken[],
    interpreter: FormulaInterpreter
  ) => Promise<AnyTypeResult>
  readonly dynamicParseValidator?: (cstVisitor: CodeFragmentVisitor, result: CodeFragmentResult) => CodeFragmentResult
  readonly dynamicParseType?: (lhsType: FormulaCheckType) => FormulaCheckType
  readonly dynamicInterpretRhsType?: ({
    result,
    cst,
    operator,
    args,
    index
  }: {
    result: AnyTypeResult
    cst: CstNode
    operator: IToken | undefined
    args: InterpretArgument
    index: number
  }) => InterpretArgument
  readonly packageInterpretResult?: (result: AnyTypeResult) => AnyTypeResult
  readonly dynamicParseRhsType?: (
    cst: CstNode,
    prevType: FormulaCheckType,
    args: CstVisitorArgument,
    index: number
  ) => CstVisitorArgument
  readonly rhsType: FormulaCheckType
  readonly parseRhs?: ({
    rhsCodeFragments,
    rhsImages,
    operatorTokenCodeFragments,
    rhsTokenCodeFragments,
    operatorTokenImage,
    rhsTokenImage
  }: {
    rhsCodeFragments: CodeFragment[]
    rhsImages: string[]
    operatorTokenCodeFragments: CodeFragment[]
    rhsTokenCodeFragments: CodeFragment[]
    operatorTokenImage: string
    rhsTokenImage: string
  }) => CodeFragmentResult
  readonly interpret: ({
    interpreter,
    lhs,
    rhs,
    operator,
    cst
  }: {
    interpreter: FormulaInterpreter
    lhs: AnyTypeResult
    rhs: AnyTypeResult | undefined
    operator: IToken
    cst: CstNode
  }) => Promise<AnyTypeResult>
}

export const interpretByOperator = async ({
  interpreter,
  operators,
  operator: {
    name,
    expressionType,
    dynamicInterpretRhsType,
    dynamicInterpretLhs,
    lhsType,
    rhsType,
    interpret,
    skipReturnEarlyCheck,
    skipReturnFinalCheck,
    packageInterpretResult
  },
  args,
  lhs,
  rhs
}: {
  interpreter: FormulaInterpreter
  operator: OperatorType
  operators: IToken[]
  args: InterpretArgument
  lhs: CstNode[] | undefined
  rhs: CstNode[] | undefined
}): Promise<AnyTypeResult> => {
  if (!rhs) {
    const result = dynamicInterpretLhs
      ? await dynamicInterpretLhs(args, operators, interpreter)
      : await interpreter.visit(lhs!, args)
    const typeErrorBefore = runtimeCheckType(args, result.type, `${name} before`, interpreter.ctx)
    if (shouldReturnEarly(typeErrorBefore)) return typeErrorBefore!
    return result
  }

  const typeErrorBefore = runtimeCheckType(args, expressionType, `${name} before`, interpreter.ctx)
  if (shouldReturnEarly(typeErrorBefore)) return typeErrorBefore!

  const lhsArgs: InterpretArgument = { ...args, type: lhsType, finalTypes: [] }
  // eslint-disable-next-line no-nested-ternary
  let result: AnyTypeResult = dynamicInterpretLhs
    ? await dynamicInterpretLhs(lhsArgs, operators, interpreter)
    : lhs
    ? await interpreter.visit(lhs, lhsArgs)
    : { type: 'null', result: null }
  if (shouldReturnEarly(result, skipReturnEarlyCheck)) return result

  for (const { rhsOperand, index } of rhs.map((rhsOperand, index: number) => ({ index, rhsOperand }))) {
    if (shouldReturnEarly(result, skipReturnEarlyCheck)) break
    const operator = operators[index]

    const rhsArgs: InterpretArgument = dynamicInterpretRhsType
      ? dynamicInterpretRhsType({ result, cst: rhsOperand, operator, args, index })
      : { ...args, type: rhsType, finalTypes: [] }

    const rhsValue = (rhsOperand as any).image ? undefined : await interpreter.visit(rhsOperand, rhsArgs)

    if (shouldReturnEarly(rhsValue, skipReturnEarlyCheck)) {
      result = rhsValue!
      break
    }

    if (!operator) {
      throw new Error(`Operator not found`)
    }

    result = await interpret({ interpreter, lhs: result, rhs: rhsValue, operator, cst: rhsOperand })
  }

  if (packageInterpretResult) {
    result = packageInterpretResult(result)
  }

  if (!skipReturnFinalCheck) {
    const typeErrorAfter = runtimeCheckType(args, result.type, `${name} after`, interpreter.ctx)
    if (shouldReturnEarly(typeErrorAfter)) return typeErrorAfter!
  }

  return result
}

interface ParseInput {
  cstVisitor: CodeFragmentVisitor
  operator: OperatorType
  operators: IToken[]
  args: CstVisitorArgument
  prefixToken?: IToken[]
  suffixToken?: IToken[]
  bodyToken?: IToken[]
  lhs: CstNode[] | undefined
  rhs: CstNode[] | undefined
}

export const parseByOperator = (input: ParseInput): CodeFragmentResult => {
  const { codeFragments, image, type } = innerParse(input) || {
    codeFragments: [],
    image: '',
    type: input.operator.expressionType
  }
  const finalImages = [image]

  const { prefixToken, suffixToken } = input

  if (prefixToken?.[0]) {
    codeFragments.unshift({
      ...token2fragment(prefixToken[0], 'any'),
      errors: suffixToken?.[0] ? [] : [{ message: 'Missing closing token', type: 'syntax' }]
    })
    finalImages.unshift(prefixToken[0].image)
  }

  if (suffixToken?.[0]) {
    codeFragments.push({
      ...token2fragment(suffixToken[0], 'any'),
      errors: prefixToken?.[0] ? [] : [{ message: 'Missing opening token', type: 'syntax' }]
    })
    finalImages.push(suffixToken[0].image)
  }

  return { codeFragments, image: finalImages.join(''), type }
}

const innerParse = ({
  cstVisitor,
  operators,
  operator: {
    name,
    expressionType,
    lhsType,
    rhsType,
    skipRhsCstParse,
    reverseLhsAndRhs,
    dynamicParseRhsType,
    dynamicParseType,
    dynamicParseValidator,
    parseRhs
  },
  args,
  lhs,
  rhs,
  bodyToken
}: ParseInput): CodeFragmentResult => {
  if (!rhs) {
    return cstVisitor.visit(lhs!, args)
  }

  const rhsCodeFragments: CodeFragment[] = []
  const rhsImages: string[] = []

  const bodyTokenCodeFragments: CodeFragment[] = []
  const bodyTokenImages: string[] = []

  const {
    codeFragments: lhsCodeFragments,
    image: lhsImage,
    type: lhsDataType
  }: CodeFragmentResult = lhs && lhs.length > 0
    ? cstVisitor.visit(lhs, {
        ...args,
        type: lhsType
      })
    : { codeFragments: [], image: '', type: expressionType }
  let prevType = lhsDataType

  rhs.forEach((rhsOperand, idx: number) => {
    const missingTokenErrorMessages: ErrorMessage[] = []

    if (skipRhsCstParse) {
      const operator = operators[idx]
      if (operator) {
        rhsCodeFragments.push({ ...token2fragment(operator, expressionType), errors: missingTokenErrorMessages })
        rhsImages.push(operator.image)
      }
      return
    }

    const rhsArgs = dynamicParseRhsType
      ? dynamicParseRhsType(rhsOperand, prevType, args, idx)
      : { ...args, type: rhsType }
    const {
      codeFragments: rhsValue,
      image: rhsImage,
      type: rhsDataType
    }: CodeFragmentResult = cstVisitor.visit(rhsOperand, rhsArgs)
    prevType = rhsDataType

    if (!rhsValue.length) {
      missingTokenErrorMessages.push({ message: 'Missing expression', type: 'syntax' })
    }

    let operatorTokenCodeFragments: CodeFragment[] = []
    let operatorTokenImage = ''
    let rhsTokenCodeFragments: CodeFragment[] = []
    let rhsTokenImage = ''

    const operator = operators[idx]
    if (operator) {
      operatorTokenCodeFragments = [
        {
          ...token2fragment(operator, expressionType),
          errors: missingTokenErrorMessages
        }
      ]
      operatorTokenImage = operator.image
    }

    rhsTokenCodeFragments = rhsValue
    rhsTokenImage = rhsImage

    if (parseRhs) {
      const { codeFragments: rhsFinalCodeFragments, image: rhsFinalImage } = parseRhs({
        rhsCodeFragments,
        rhsImages,
        operatorTokenCodeFragments,
        rhsTokenCodeFragments,
        operatorTokenImage,
        rhsTokenImage
      })
      rhsCodeFragments.push(...rhsFinalCodeFragments)
      rhsImages.push(rhsFinalImage)
    } else {
      rhsCodeFragments.push(...operatorTokenCodeFragments, ...rhsTokenCodeFragments)
      rhsImages.push(operatorTokenImage, rhsTokenImage)
    }
  })

  if (bodyToken?.[0]) {
    bodyTokenCodeFragments.push(token2fragment(bodyToken[0], 'any'))
    bodyTokenImages.push(bodyToken[0].image)
  }

  const finalCodeFragments: CodeFragment[] = reverseLhsAndRhs
    ? [...rhsCodeFragments, ...bodyTokenCodeFragments, ...lhsCodeFragments]
    : [...lhsCodeFragments, ...bodyTokenCodeFragments, ...rhsCodeFragments]
  const finalImages: string[] = reverseLhsAndRhs
    ? [...rhsImages, ...bodyTokenImages, lhsImage]
    : [lhsImage, ...bodyTokenImages, ...rhsImages]

  const finalType = dynamicParseType ? dynamicParseType(prevType) : expressionType

  const { errorMessages, newType } = intersectType(args.type, finalType, name, cstVisitor.ctx)
  const result = {
    image: finalImages.join(''),
    codeFragments: finalCodeFragments.map(c => ({ ...c, errors: [...errorMessages, ...c.errors] })),
    type: newType
  }

  if (dynamicParseValidator) {
    return dynamicParseValidator(cstVisitor, result)
  }
  return result
}
