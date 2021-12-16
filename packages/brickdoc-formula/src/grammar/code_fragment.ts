import { CstNode, IToken } from 'chevrotain'
import {
  CodeFragment,
  ErrorMessage,
  ContextInterface,
  FormulaType,
  Argument,
  VariableKind,
  VariableDependency,
  FunctionClause,
  buildFunctionKey,
  OtherCodeFragment,
  CodeFragmentResult,
  FormulaCheckType
} from '..'
import { BaseCstVisitor } from './parser'
interface InterpreterConfig {
  readonly formulaContext?: ContextInterface
}

const SpaceBeforeTypes = [
  'In',
  'ExactIn',
  'Semicolon',
  'RParen',
  'RBracket',
  'RBrace',
  'Plus',
  'Div',
  'Minus',
  'Multi',
  'Caret',
  'And',
  'Or',
  'Equal',
  'NotEqual',
  'Equal2',
  'NotEqual2',
  'LessThanEqual',
  'LessThan',
  'GreaterThan',
  'GreaterThanEqual'
]

const SpaceAfterTypes = [
  'In',
  'ExactIn',
  'Comma',
  'Colon',
  'Semicolon',
  'LParen',
  'LBracket',
  'LBrace',
  'Plus',
  'Div',
  'Minus',
  'Multi',
  'Caret',
  'And',
  'Or',
  'Equal',
  'NotEqual',
  'Equal2',
  'NotEqual2',
  'LessThanEqual',
  'LessThan',
  'GreaterThan',
  'GreaterThanEqual'
]

const token2fragment = (token: IToken, type: FormulaType): OtherCodeFragment => {
  const spaceBefore = SpaceBeforeTypes.includes(token.tokenType.name)
  const spaceAfter = SpaceAfterTypes.includes(token.tokenType.name)
  return { name: token.image, code: token.tokenType.name, errors: [], type, spaceBefore, spaceAfter, meta: undefined }
}

type ExpressionType = FormulaCheckType | undefined

interface ExpressionArgument {
  readonly type: ExpressionType
  readonly firstArgumentType?: FormulaType
}

const intersectType = (
  expectedArgumentType: ExpressionType,
  contextResultType: FormulaType
): { errorMessages: ErrorMessage[]; newType: FormulaType } => {
  if (expectedArgumentType === undefined) {
    return { errorMessages: [], newType: contextResultType }
  }

  if (expectedArgumentType === 'any') {
    return { errorMessages: [], newType: contextResultType }
  }

  if (contextResultType === 'any') {
    return {
      errorMessages: [],
      newType: expectedArgumentType instanceof Array ? expectedArgumentType[0] : expectedArgumentType
    }
  }

  if (expectedArgumentType instanceof Array && expectedArgumentType.includes(contextResultType)) {
    return { errorMessages: [], newType: contextResultType }
  }

  if (expectedArgumentType === contextResultType) {
    return { errorMessages: [], newType: expectedArgumentType }
  }

  if (expectedArgumentType === 'Predicate') {
    return { errorMessages: [], newType: contextResultType }
  }

  return {
    errorMessages: [{ type: 'type', message: `Expected ${expectedArgumentType} but got ${contextResultType}` }],
    newType: contextResultType
  }
}

export class CodeFragmentVisitor extends BaseCstVisitor {
  formulaContext?: ContextInterface
  variableDependencies: VariableDependency[] = []
  functionDependencies: Array<FunctionClause<any>> = []
  flattenVariableDependencies: Set<VariableDependency> = new Set()
  level: number = 0
  kind: VariableKind = 'constant'

  constructor({ formulaContext }: InterpreterConfig) {
    super()
    this.formulaContext = formulaContext
    this.validateVisitor()
  }

  startExpression(
    ctx: { expression: CstNode | CstNode[]; Equal: any },
    { type }: ExpressionArgument
  ): CodeFragmentResult {
    // const operator = ctx.Equal[0] as IToken
    // return [token2fragment(operator), ...this.visit(ctx.expression)]
    const { type: newType, codeFragments, image } = this.visit(ctx.expression, { type })
    return { type: newType, codeFragments, image: `${ctx.Equal[0].image}${image}` }
  }

  multilineExpression(
    ctx: {
      rhs: Array<CstNode | CstNode[]>
      lhs: CstNode | CstNode[]
      Equal: Array<{ image: any }>
      Semicolon: { [x: string]: IToken }
    },
    { type }: ExpressionArgument
  ): CodeFragmentResult {
    if (!ctx.rhs) {
      const { type: newType, codeFragments, image } = this.visit(ctx.lhs, { type })
      return { type: newType, codeFragments, image: `${ctx.Equal[0].image}${image}` }
    }

    const codeFragments: CodeFragment[] = []
    const images: string[] = [ctx.Equal[0].image]
    let parentType: FormulaType
    const childrenType: FormulaType = 'any'

    const {
      codeFragments: lhsCodeFragments,
      image: lhsImage,
      type: firstType
    }: CodeFragmentResult = this.visit(ctx.lhs, {
      type: childrenType
    })
    parentType = firstType
    codeFragments.push(...lhsCodeFragments)
    images.push(lhsImage)

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      const operator = ctx.Semicolon[idx] as IToken
      const {
        codeFragments: rhsValue,
        image: rhsImage,
        type: newType
      }: CodeFragmentResult = this.visit(rhsOperand, {
        type: childrenType
      })

      const errorMessages: ErrorMessage[] = rhsImage ? [] : [{ type: 'syntax', message: 'Missing expression' }]

      codeFragments.push({ ...token2fragment(operator, 'any'), errors: errorMessages }, ...rhsValue)
      parentType = newType
      images.push(operator.image, rhsImage)
    })

    const { errorMessages, newType } = intersectType(type, parentType)
    return {
      image: images.join(''),
      codeFragments: codeFragments.map(codeFragment => ({
        ...codeFragment,
        errors: [...errorMessages, ...codeFragment.errors]
      })),
      type: newType
    }
  }

  expression(ctx: { combineExpression: CstNode | CstNode[] }, { type }: ExpressionArgument): CodeFragmentResult {
    return this.visit(ctx.combineExpression, { type })
  }

  combineExpression(
    ctx: { rhs: any[]; lhs: CstNode | CstNode[]; CombineOperator: { [x: string]: IToken } },
    { type }: ExpressionArgument
  ): CodeFragmentResult {
    if (!ctx.rhs) {
      return this.visit(ctx.lhs, { type })
    }

    const codeFragments: CodeFragment[] = []
    const images: string[] = []
    const parentType: FormulaType = 'boolean'
    const childrenType: FormulaType = 'boolean'

    const { codeFragments: lhsCodeFragments, image: lhsImage }: CodeFragmentResult = this.visit(ctx.lhs, {
      type: childrenType
    })
    codeFragments.push(...lhsCodeFragments)
    images.push(lhsImage)

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      const operator = ctx.CombineOperator[idx] as IToken
      const { codeFragments: rhsValue, image: rhsImage }: CodeFragmentResult = this.visit(rhsOperand, {
        type: childrenType
      })

      codeFragments.push(token2fragment(operator, parentType), ...rhsValue)
      images.push(operator.image, rhsImage)
    })

    const { errorMessages, newType } = intersectType(type, parentType)
    return {
      image: images.join(''),
      codeFragments: codeFragments.map(codeFragment => ({
        ...codeFragment,
        errors: [...errorMessages, ...codeFragment.errors]
      })),
      type: newType
    }
  }

  notExpression(ctx: { lhs: any[]; rhs: CstNode | CstNode[] }, { type }: ExpressionArgument): CodeFragmentResult {
    if (!ctx.lhs) {
      return this.visit(ctx.rhs, { type })
    }

    const codeFragments: CodeFragment[] = []
    const images: string[] = []
    const parentType: FormulaType = 'boolean'
    const childrenType: FormulaType = 'any'

    ctx.lhs.forEach((operator: IToken) => {
      codeFragments.push(token2fragment(operator, parentType))
      images.push(operator.image)
    })

    const { errorMessages, newType } = intersectType(type, parentType)
    const { codeFragments: rhsCodeFragments, image }: CodeFragmentResult = this.visit(ctx.rhs, { type: childrenType })
    images.push(image)

    return {
      image: images.join(''),
      codeFragments: [...codeFragments, ...rhsCodeFragments].map(codeFragment => ({
        ...codeFragment,
        errors: [...errorMessages, ...codeFragment.errors]
      })),
      type: newType
    }
  }

  equalCompareExpression(
    ctx: { rhs: any[]; lhs: CstNode | CstNode[]; EqualCompareOperator: { [x: string]: any } },
    { type }: ExpressionArgument
  ): CodeFragmentResult {
    if (!ctx.rhs) {
      return this.visit(ctx.lhs, { type })
    }

    const codeFragments: CodeFragment[] = []
    const images: string[] = []
    const parentType: FormulaType = 'boolean'
    const childrenType: FormulaType = 'any'

    const { codeFragments: lhsCodeFragments, image }: CodeFragmentResult = this.visit(ctx.lhs, { type: childrenType })
    images.push(image)
    codeFragments.push(...lhsCodeFragments)

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      const { codeFragments: rhsValue, image }: CodeFragmentResult = this.visit(rhsOperand, { type: childrenType })
      const operator = ctx.EqualCompareOperator[idx]
      codeFragments.push(token2fragment(operator, parentType), ...rhsValue)
      images.push(operator.image, image)
    })

    const { errorMessages, newType } = intersectType(type, parentType)
    return {
      image: images.join(''),
      codeFragments: codeFragments.map(codeFragment => ({
        ...codeFragment,
        errors: [...errorMessages, ...codeFragment.errors]
      })),
      type: newType
    }
  }

  compareExpression(
    ctx: { rhs: any[]; lhs: CstNode | CstNode[]; CompareOperator: { [x: string]: any } },
    { type }: ExpressionArgument
  ): CodeFragmentResult {
    if (!ctx.rhs) {
      return this.visit(ctx.lhs, { type })
    }

    const codeFragments: CodeFragment[] = []
    const images: string[] = []
    const parentType: FormulaType = 'boolean'
    const childrenType: FormulaType = 'number'

    const { codeFragments: lhsCodeFragments, image }: CodeFragmentResult = this.visit(ctx.lhs, { type: childrenType })
    codeFragments.push(...lhsCodeFragments)
    images.push(image)

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      const { codeFragments: rhsValue, image }: CodeFragmentResult = this.visit(rhsOperand, { type: childrenType })
      const operator = ctx.CompareOperator[idx]
      codeFragments.push(token2fragment(operator, parentType), ...rhsValue)
      images.push(operator.image, image)
    })

    const { errorMessages, newType } = intersectType(type, parentType)
    return {
      image: images.join(''),
      codeFragments: codeFragments.map(codeFragment => ({
        ...codeFragment,
        errors: [...errorMessages, ...codeFragment.errors]
      })),
      type: newType
    }
  }

  inExpression(
    ctx: { rhs: CstNode | CstNode[]; lhs: CstNode | CstNode[]; InOperator: IToken[] },
    { type }: ExpressionArgument
  ): CodeFragmentResult {
    if (!ctx.rhs) {
      return this.visit(ctx.lhs, { type })
    }

    const codeFragments: CodeFragment[] = []
    const images: string[] = []
    const parentType: FormulaType = 'boolean'
    const childrenLhsType: FormulaCheckType = ['string', 'number', 'boolean', 'null']

    const {
      codeFragments: lhsCodeFragments,
      image: lhsImage,
      type: newLhsType
    }: CodeFragmentResult = this.visit(ctx.lhs, {
      type: childrenLhsType
    })
    codeFragments.push(...lhsCodeFragments)
    images.push(lhsImage)

    const childrenRhsType: FormulaCheckType = ['string', 'number'].includes(newLhsType)
      ? ['string', 'Array', 'Spreadsheet', 'Column']
      : ['Array']

    const { codeFragments: rhsCodeFragments, image: rhsImage }: CodeFragmentResult = this.visit(ctx.rhs, {
      type: childrenRhsType
    })

    const inErrorMessages: ErrorMessage[] = rhsCodeFragments.length
      ? []
      : [{ message: 'Missing right expression', type: 'syntax' }]
    codeFragments.push({ ...token2fragment(ctx.InOperator[0], 'any'), errors: inErrorMessages })
    images.push(ctx.InOperator[0].image)

    codeFragments.push(...rhsCodeFragments)
    images.push(rhsImage)

    const { errorMessages, newType } = intersectType(type, parentType)
    return {
      image: images.join(''),
      codeFragments: codeFragments.map(codeFragment => ({
        ...codeFragment,
        errors: [...errorMessages, ...codeFragment.errors]
      })),
      type: newType
    }
  }

  concatExpression(ctx: { rhs: any[]; lhs: CstNode | CstNode[] }, { type }: ExpressionArgument): CodeFragmentResult {
    if (!ctx.rhs) {
      return this.visit(ctx.lhs, { type })
    }

    const codeFragments: CodeFragment[] = []
    const images: string[] = []
    const parentType: FormulaType = 'string'
    const childrenType: FormulaType = 'string'

    const { codeFragments: lhsCodeFragments, image }: CodeFragmentResult = this.visit(ctx.lhs, { type: childrenType })
    codeFragments.push(...lhsCodeFragments)
    images.push(image)

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[]) => {
      const { codeFragments: rhsValue, image }: CodeFragmentResult = this.visit(rhsOperand, { type: childrenType })
      codeFragments.push(
        { name: '&', code: 'Ampersand', type: 'any', errors: [], spaceBefore: true, spaceAfter: true, meta: undefined },
        ...rhsValue
      )
      images.push('&', image)
    })

    const { errorMessages, newType } = intersectType(type, parentType)
    return {
      image: images.join(''),
      codeFragments: codeFragments.map(codeFragment => ({
        ...codeFragment,
        errors: [...errorMessages, ...codeFragment.errors]
      })),
      type: newType
    }
  }

  additionExpression(
    ctx: { rhs: any[]; lhs: CstNode | CstNode[]; AdditionOperator: { [x: string]: any } },
    { type }: ExpressionArgument
  ): CodeFragmentResult {
    if (!ctx.rhs) {
      return this.visit(ctx.lhs, { type })
    }

    const codeFragments: CodeFragment[] = []
    const images: string[] = []
    const parentType: FormulaType = 'number'
    const childrenType: FormulaType = 'number'

    const { codeFragments: lhsCodeFragments, image }: CodeFragmentResult = this.visit(ctx.lhs, { type: childrenType })
    codeFragments.push(...lhsCodeFragments)
    images.push(image)

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      const { codeFragments: rhsValue, image }: CodeFragmentResult = this.visit(rhsOperand, { type: childrenType })
      const operator = ctx.AdditionOperator[idx]
      codeFragments.push(token2fragment(operator, parentType), ...rhsValue)
      images.push(operator.image, image)
    })

    const { errorMessages, newType } = intersectType(type, parentType)
    return {
      image: images.join(''),
      codeFragments: codeFragments.map(codeFragment => ({
        ...codeFragment,
        errors: [...errorMessages, ...codeFragment.errors]
      })),
      type: newType
    }
  }

  multiplicationExpression(
    ctx: { rhs: any[]; lhs: CstNode | CstNode[]; MultiplicationOperator: { [x: string]: any } },
    { type }: ExpressionArgument
  ): CodeFragmentResult {
    if (!ctx.rhs) {
      return this.visit(ctx.lhs, { type })
    }

    const codeFragments: CodeFragment[] = []
    const images: string[] = []
    const parentType: FormulaType = 'number'
    const childrenType: FormulaType = 'number'

    const { codeFragments: lhsCodeFragments, image }: CodeFragmentResult = this.visit(ctx.lhs, { type: childrenType })
    codeFragments.push(...lhsCodeFragments)
    images.push(image)

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      const { codeFragments: rhsValue, image }: CodeFragmentResult = this.visit(rhsOperand, { type: childrenType })
      const operator = ctx.MultiplicationOperator[idx]
      codeFragments.push(token2fragment(operator, parentType), ...rhsValue)
      images.push(operator.image, image)
    })

    const { errorMessages, newType } = intersectType(type, parentType)
    return {
      image: images.join(''),
      codeFragments: codeFragments.map(codeFragment => ({
        ...codeFragment,
        errors: [...errorMessages, ...codeFragment.errors]
      })),
      type: newType
    }
  }

  chainExpression(ctx: { rhs: any[]; lhs: CstNode | CstNode[] }, { type }: ExpressionArgument): CodeFragmentResult {
    if (!ctx.rhs) {
      return this.visit(ctx.lhs, { type })
    }

    const codeFragments: CodeFragment[] = []
    const images: string[] = []
    const {
      codeFragments: lhsCodeFragments,
      type: lhsType,
      image
    }: CodeFragmentResult = this.visit(ctx.lhs, { type: 'any' })
    codeFragments.push(...lhsCodeFragments)
    images.push(image)

    let firstArgumentType = lhsType

    ctx.rhs.forEach((cst: CstNode | CstNode[]) => {
      const {
        codeFragments: rhsCodeFragments,
        type: rhsType,
        image
      }: CodeFragmentResult = this.visit(cst, {
        type: 'any',
        firstArgumentType
      })
      codeFragments.push(
        { name: '.', code: 'Dot', type: 'any', errors: [], spaceBefore: false, spaceAfter: false, meta: undefined },
        ...rhsCodeFragments
      )
      images.push('.', image)
      firstArgumentType = rhsType
    })

    const { errorMessages, newType } = intersectType(type, firstArgumentType)
    return {
      image: images.join(''),
      codeFragments: codeFragments.map(codeFragment => ({
        ...codeFragment,
        errors: [...errorMessages, ...codeFragment.errors]
      })),
      type: newType
    }
  }

  atomicExpression(
    ctx: {
      parenthesisExpression: CstNode | CstNode[]
      arrayExpression: CstNode | CstNode[]
      recordExpression: CstNode | CstNode[]
      constantExpression: CstNode | CstNode[]
      FunctionCall: CstNode | CstNode[]
      variableExpression: CstNode | CstNode[]
      columnExpression: CstNode | CstNode[]
      spreadsheetExpression: CstNode | CstNode[]
      predicateExpression: CstNode | CstNode[]
    },
    { type }: ExpressionArgument
  ): CodeFragmentResult {
    if (ctx.parenthesisExpression) {
      return this.visit(ctx.parenthesisExpression, { type })
    } else if (ctx.arrayExpression) {
      return this.visit(ctx.arrayExpression, { type })
    } else if (ctx.recordExpression) {
      return this.visit(ctx.recordExpression, { type })
    } else if (ctx.constantExpression) {
      return this.visit(ctx.constantExpression, { type })
    } else if (ctx.FunctionCall) {
      return this.visit(ctx.FunctionCall, { type })
    } else if (ctx.variableExpression) {
      return this.visit(ctx.variableExpression, { type })
    } else if (ctx.columnExpression) {
      return this.visit(ctx.columnExpression, { type })
    } else if (ctx.spreadsheetExpression) {
      return this.visit(ctx.spreadsheetExpression, { type })
    } else if (ctx.predicateExpression) {
      return this.visit(ctx.predicateExpression, { type })
    }

    // console.log('debugAtomic', {ctx, type})
    return { codeFragments: [], type: 'any', image: '' }
  }

  predicateExpression(
    ctx: { EqualCompareOperator: IToken[]; CompareOperator: IToken[]; atomicExpression: CstNode | CstNode[] },
    { type }: ExpressionArgument
  ): CodeFragmentResult {
    let token: IToken
    let childrenType: FormulaType
    if (ctx.EqualCompareOperator) {
      token = ctx.EqualCompareOperator[0]
      childrenType = 'any'
    } else {
      token = ctx.CompareOperator[0]
      childrenType = 'number'
    }

    const codeFragments: CodeFragment[] = []
    const images: string[] = []
    const parentType: FormulaType = 'Predicate'
    const { codeFragments: expressionCodeFragments, image }: CodeFragmentResult = this.visit(ctx.atomicExpression, {
      type: childrenType
    })

    codeFragments.push(
      {
        name: token.image,
        code: token.tokenType.name,
        errors: [],
        meta: undefined,
        spaceBefore: false,
        spaceAfter: false,
        type: 'any'
      },
      ...expressionCodeFragments
    )
    images.push(token.image, image)

    const { errorMessages, newType } = intersectType(type, parentType)
    return {
      image: images.join(''),
      codeFragments: codeFragments.map(codeFragment => ({
        ...codeFragment,
        errors: [...errorMessages, ...codeFragment.errors]
      })),
      type: newType
    }
  }

  arrayExpression(
    ctx: { LBracket: IToken[]; RBracket: IToken[]; Arguments: CstNode | CstNode[] },
    { type }: ExpressionArgument
  ): CodeFragmentResult {
    if (!ctx.LBracket) {
      return { codeFragments: [], type: 'any', image: '' }
    }
    const parentType = 'Array'
    const rParenErrorMessages: ErrorMessage[] = ctx.RBracket
      ? []
      : [{ message: 'Missing closing parenthesis', type: 'syntax' }]
    const { codeFragments, image } = ctx.Arguments
      ? (this.visit(ctx.Arguments) as CodeFragmentResult)
      : { codeFragments: [], image: '' }
    const rBracketCodeFragments = ctx.RBracket ? [token2fragment(ctx.RBracket[0], 'any')] : []
    const finalImage = ctx.RBracket ? `[${image}]` : `[${image}`

    const { errorMessages, newType } = intersectType(type, parentType)

    return {
      codeFragments: [
        { ...token2fragment(ctx.LBracket[0], 'any'), errors: rParenErrorMessages },
        ...codeFragments,
        ...rBracketCodeFragments
      ].map(codeFragment => ({
        ...codeFragment,
        errors: [...errorMessages, ...codeFragment.errors]
      })),
      type: newType,
      image: finalImage
    }
  }

  recordExpression(
    ctx: { LBrace: IToken[]; RBrace: IToken[]; recordField: Array<CstNode | CstNode[]>; Comma: IToken[] },
    { type }: ExpressionArgument
  ): CodeFragmentResult {
    if (!ctx.LBrace) {
      return { codeFragments: [], type: 'any', image: '' }
    }

    const images: string[] = []
    const codeFragments: CodeFragment[] = []

    images.push('{')
    const rBraceErrorMessages: ErrorMessage[] = ctx.RBrace
      ? []
      : [{ message: 'Missing closing parenthesis', type: 'syntax' }]
    codeFragments.push({ ...token2fragment(ctx.LBrace[0], 'any'), errors: rBraceErrorMessages })

    const parentType = 'Record'
    const childrenType = 'any'

    let expressionMatchErrorMessages: ErrorMessage[] = []
    if (ctx.recordField) {
      let commaIndex = 0
      let validExpressionCount = 0
      const keyArray: string[] = []

      ctx.recordField.forEach((arg: CstNode | CstNode[], idx: number) => {
        const { codeFragments: fieldCodeFragments, image: fieldImage } = this.visit(arg, { type: childrenType })
        let nameDuplicateErrors: ErrorMessage[] = []
        if (fieldCodeFragments[0]) {
          const str = fieldCodeFragments[0].name
          const finalStr =
            fieldCodeFragments[0].code === 'StringLiteral' ? str.substring(1, str.length - 1).replace(/""/g, '"') : str
          if (keyArray.includes(finalStr)) {
            nameDuplicateErrors = [{ message: 'Record key duplicated', type: 'syntax' }]
          }
          keyArray.push(finalStr)
        }

        images.push(fieldImage)
        codeFragments.push(
          ...fieldCodeFragments.map((c: CodeFragment) => ({ ...c, errors: [...nameDuplicateErrors, ...c.errors] }))
        )

        if (fieldCodeFragments.length > 0) {
          validExpressionCount += 1
        }

        if (ctx.Comma?.[commaIndex]) {
          codeFragments.push(token2fragment(ctx.Comma[commaIndex], 'any'))
          commaIndex += 1
          images.push(',')
        }
      })

      if (validExpressionCount !== commaIndex + 1) {
        expressionMatchErrorMessages = [{ message: 'Expression count mismatch', type: 'syntax' }]
      }
    }

    if (ctx.RBrace) {
      codeFragments.push(token2fragment(ctx.RBrace[0], 'any'))
      images.push('}')
    }

    const { errorMessages, newType } = intersectType(type, parentType)

    return {
      codeFragments: codeFragments.map(codeFragment => ({
        ...codeFragment,
        errors: [...errorMessages, ...codeFragment.errors, ...expressionMatchErrorMessages]
      })),
      type: newType,
      image: images.join('')
    }
  }

  recordField(
    ctx: {
      Colon: IToken[]
      FunctionName: IToken[]
      StringLiteral: IToken[]
      expression: CstNode | CstNode[]
    },
    { type }: ExpressionArgument
  ): CodeFragmentResult {
    const images: string[] = []
    const codeFragments: CodeFragment[] = []
    let key: string
    const missingColonErrors: ErrorMessage[] = ctx.Colon ? [] : [{ message: 'Missing colon', type: 'syntax' }]
    if (ctx.FunctionName) {
      key = ctx.FunctionName[0].image
      codeFragments.push({
        name: key,
        code: ctx.FunctionName[0].tokenType.name,
        errors: missingColonErrors,
        meta: undefined,
        spaceBefore: false,
        spaceAfter: false,
        type: 'any'
      })
    } else if (ctx.StringLiteral) {
      key = ctx.StringLiteral[0].image
      codeFragments.push({
        name: key,
        code: ctx.StringLiteral[0].tokenType.name,
        errors: missingColonErrors,
        meta: undefined,
        spaceBefore: false,
        spaceAfter: false,
        type: 'any'
      })
    } else {
      return { codeFragments: [], type: 'any', image: '' }
    }
    images.push(key)

    if (ctx.Colon) {
      images.push(':')
      codeFragments.push(token2fragment(ctx.Colon[0], 'any'))
    }

    if (ctx.expression) {
      const { codeFragments: expressionCodeFragments, image } = this.visit(ctx.expression, { type: 'any' })
      images.push(image)
      codeFragments.push(...expressionCodeFragments)
    }

    return {
      codeFragments,
      type: 'any',
      image: images.join('')
    }
  }

  parenthesisExpression(
    ctx: { expression: CstNode | CstNode[]; LParen: IToken[]; RParen: IToken[] },
    { type }: ExpressionArgument
  ): CodeFragmentResult {
    if (!ctx.LParen) {
      return { codeFragments: [], type: 'any', image: '' }
    }
    const rParenErrorMessages: ErrorMessage[] = ctx.RParen
      ? []
      : [{ message: 'Missing closing parenthesis', type: 'syntax' }]
    const { codeFragments, type: expressionType, image }: CodeFragmentResult = this.visit(ctx.expression, { type })
    const rparenCodeFragments = ctx.RParen ? [token2fragment(ctx.RParen[0], 'any')] : []
    const finalImage = ctx.RParen ? `(${image})` : `(${image}`

    return {
      codeFragments: [
        { ...token2fragment(ctx.LParen[0], 'any'), errors: rParenErrorMessages },
        ...codeFragments,
        ...rparenCodeFragments
      ],
      type: expressionType,
      image: finalImage
    }
  }

  constantExpression(
    ctx: {
      NumberLiteralExpression: CstNode | CstNode[]
      BooleanLiteralExpression: CstNode | CstNode[]
      StringLiteral: IToken[]
      NullLiteral: IToken[]
    },
    { type }: ExpressionArgument
  ): CodeFragmentResult {
    if (ctx.NumberLiteralExpression) {
      return this.visit(ctx.NumberLiteralExpression, { type })
    } else if (ctx.BooleanLiteralExpression) {
      return this.visit(ctx.BooleanLiteralExpression, { type })
    } else if (ctx.NullLiteral) {
      const parentType = 'null'
      const { errorMessages } = intersectType(type, parentType)

      return {
        codeFragments: [{ ...token2fragment(ctx.NullLiteral[0], 'null'), errors: errorMessages }],
        type: 'null',
        image: ctx.NullLiteral[0].image
      }
    } else if (ctx.StringLiteral) {
      const parentType = 'string'
      const { errorMessages } = intersectType(type, parentType)
      return {
        codeFragments: [{ ...token2fragment(ctx.StringLiteral[0], parentType), errors: errorMessages }],
        type: parentType,
        image: ctx.StringLiteral[0].image
      }
    }

    // console.log('debugConstant', { ctx, type })
    return { codeFragments: [], type: 'any', image: '' }
  }

  NumberLiteralExpression(
    ctx: { Minus: IToken[]; NumberLiteral: IToken[]; Sign: IToken[] },
    { type }: ExpressionArgument
  ): CodeFragmentResult {
    const parentType = 'number'

    const codeFragments: CodeFragment[] = []
    const images: string[] = []

    if (ctx.Minus) {
      const errorMessages: ErrorMessage[] = ctx.NumberLiteral ? [] : [{ message: 'Missing number', type: 'syntax' }]
      codeFragments.push({ ...token2fragment(ctx.Minus[0], 'any'), spaceAfter: false, errors: errorMessages })
      images.push('-')
    }

    const { errorMessages } = intersectType(type, parentType)

    if (ctx.NumberLiteral) {
      codeFragments.push({ ...token2fragment(ctx.NumberLiteral[0], parentType) })
      images.push(ctx.NumberLiteral[0].image)
    }

    if (ctx.Sign) {
      codeFragments.push({ ...token2fragment(ctx.Sign[0], 'any') })
      images.push(ctx.Sign[0].image)
    }

    return {
      codeFragments: codeFragments.map(codeFragment => ({
        ...codeFragment,
        errors: [...errorMessages, ...codeFragment.errors]
      })),
      type: parentType,
      image: images.join('')
    }
  }

  BooleanLiteralExpression(ctx: { BooleanLiteral: IToken[] }, { type }: ExpressionArgument): CodeFragmentResult {
    const parentType = 'boolean'
    const { errorMessages } = intersectType(type, parentType)
    return {
      codeFragments: [{ ...token2fragment(ctx.BooleanLiteral[0], parentType), errors: errorMessages }],
      type: parentType,
      image: ctx.BooleanLiteral[0].image
    }
  }

  columnExpression(ctx: { Dollar: IToken[]; UUID: [any, any] }, { type }: ExpressionArgument): CodeFragmentResult {
    const dollarFragment = token2fragment(ctx.Dollar[0], 'any')
    const [namespaceToken, columnToken] = ctx.UUID

    const namespaceId = namespaceToken.image
    const columnId = columnToken.image

    const columnFragment = token2fragment(columnToken, 'any')

    const column = this.formulaContext?.findColumn(namespaceId, columnId)

    const parentType: ExpressionType = 'Column'

    this.kind = 'expression'

    if (column) {
      const { errorMessages, newType } = intersectType(type, parentType)
      return {
        codeFragments: [
          {
            ...columnFragment,
            code: 'Column',
            type: parentType,
            name: `$${namespaceId}#${columnId}`,
            meta: { name: column.name, spreadsheetName: column.spreadsheetName },
            errors: errorMessages
          }
        ],
        type: newType,
        image: `$${namespaceId}#${columnId}`
      }
    } else {
      return {
        codeFragments: [
          dollarFragment,
          {
            ...columnFragment,
            name: `$${namespaceId}#${columnId}`,
            errors: [{ message: `Column not found: ${columnId}`, type: 'deps' }]
          }
        ],
        type: parentType,
        image: `$${namespaceId}#${columnId}`
      }
    }
  }

  spreadsheetExpression(ctx: { Dollar: IToken[]; UUID: any[] }, { type }: ExpressionArgument): CodeFragmentResult {
    const dollarFragment = token2fragment(ctx.Dollar[0], 'any')
    const namespaceToken = ctx.UUID[0]
    const namespaceId = namespaceToken.image

    const database = this.formulaContext?.findDatabase(namespaceId)

    const parentType: FormulaType = 'Spreadsheet'

    this.kind = 'expression'

    if (database) {
      const { errorMessages, newType } = intersectType(type, parentType)
      return {
        codeFragments: [
          {
            ...token2fragment(namespaceToken, 'any'),
            code: 'Spreadsheet',
            type: parentType,
            meta: { name: database.name(), blockId: database.blockId },
            name: `$${namespaceId}`,
            errors: errorMessages
          }
        ],
        image: `$${namespaceId}`,
        type: newType
      }
    } else {
      return {
        codeFragments: [
          dollarFragment,
          {
            ...token2fragment(namespaceToken, 'any'),
            errors: [{ message: `Database not found: ${namespaceId}`, type: 'deps' }]
          }
        ],
        image: `$${namespaceId}`,
        type: parentType
      }
    }
  }

  variableExpression(ctx: { Dollar: IToken[]; UUID: [any, any] }, { type }: ExpressionArgument): CodeFragmentResult {
    const dollarFragment = token2fragment(ctx.Dollar[0], 'any')
    const [namespaceToken, variableToken] = ctx.UUID

    const namespaceId = namespaceToken.image
    const variableId = variableToken.image

    const variableFragment = token2fragment(variableToken, 'any')

    const variable = this.formulaContext?.findVariable(namespaceId, variableId)

    this.kind = 'expression'

    if (variable) {
      this.variableDependencies.push({ namespaceId, variableId })
      this.flattenVariableDependencies = new Set([
        { namespaceId, variableId },
        ...this.flattenVariableDependencies,
        ...variable.t.flattenVariableDependencies
      ])
      this.level = Math.max(this.level, variable.t.level + 1)

      const { errorMessages, newType } = intersectType(type, variable.t.variableValue.result.type ?? 'any')
      return {
        codeFragments: [
          {
            ...variableFragment,
            code: 'Variable',
            type: newType,
            meta: { name: variable.t.name, namespace: variable.t.namespaceId, namespaceId: variable.t.namespaceId },
            name: `$${namespaceId}@${variableId}`,
            errors: errorMessages
          }
        ],
        image: `$${namespaceId}@${variableId}`,
        type: newType
      }
    } else {
      return {
        codeFragments: [
          dollarFragment,
          {
            ...variableFragment,
            code: 'Variable',
            name: `$${namespaceId}@${variableId}`,
            errors: [{ message: `Variable not found: ${variableId}`, type: 'deps' }]
          }
        ],
        image: `$${namespaceId}@${variableId}`,
        type: 'any'
      }
    }
  }

  FunctionCall(
    ctx: {
      FunctionName: Array<{ image: any }>
      Arguments: CstNode | CstNode[]
      LParen: IToken[]
      RParen: IToken[]
    },
    { type, firstArgumentType }: ExpressionArgument
  ): CodeFragmentResult {
    if (!ctx.LParen) {
      return { codeFragments: [], type: 'any', image: '' }
    }

    const names = ctx.FunctionName.map(({ image }) => image)
    const [group, name] = names.length === 1 ? ['core', ...names] : names

    const images: string[] = []

    if (names.length === 1) {
      images.push(name)
    } else {
      images.push(group, '::', name)
    }

    const clause = this.formulaContext?.findFunctionClause(group, name)

    this.kind = 'expression'

    const functionKey = buildFunctionKey(group, name)

    const nameFragment: CodeFragment = {
      name: functionKey,
      code: 'FunctionName',
      errors: [],
      type: 'any',
      spaceBefore: false,
      spaceAfter: false,
      meta: undefined
    }

    const rParenErrorMessages: ErrorMessage[] = ctx.RParen
      ? []
      : [{ message: 'Missing closing parenthesis', type: 'syntax' }]
    const rparenCodeFragments = ctx.RParen ? [token2fragment(ctx.RParen[0], clause ? clause.returns : 'any')] : []

    if (clause) {
      this.functionDependencies.push(clause)

      const chainError: ErrorMessage[] = []
      if (firstArgumentType && !clause.chain) {
        chainError.push({ message: `${group}::${name} is not chainable`, type: 'deps' })
      }

      let clauseArgs = clause.args
      if (firstArgumentType) {
        const firstType = clauseArgs[0].type

        const { errorMessages } = intersectType(firstType, firstArgumentType)
        chainError.push(...errorMessages)
        clauseArgs = clause.args.slice(1)
      }
      const { codeFragments: argsCodeFragments, image } = ctx.Arguments
        ? (this.visit(ctx.Arguments, clauseArgs) as CodeFragmentResult)
        : { codeFragments: [], image: '' }
      const argsErrorMessages: ErrorMessage[] =
        clauseArgs.length > 0 && argsCodeFragments.length === 0 ? [{ message: 'Miss argument', type: 'deps' }] : []

      images.push('(', image, ctx.RParen ? ')' : '')

      const { errorMessages, newType } = intersectType(type, clause.returns)
      return {
        codeFragments: [
          {
            ...nameFragment,
            code: 'Function',
            errors: [...rParenErrorMessages, ...chainError, ...errorMessages, ...argsErrorMessages]
          },
          { ...token2fragment(ctx.LParen[0], 'any'), errors: rParenErrorMessages },
          ...argsCodeFragments,
          ...rparenCodeFragments
        ],
        image: images.join(''),
        type: newType
      }
    } else {
      const { codeFragments: argsCodeFragments, image } = ctx.Arguments
        ? (this.visit(ctx.Arguments, null) as CodeFragmentResult)
        : { codeFragments: [], image: '' }
      images.push('(', image, ctx.RParen ? ')' : '')

      return {
        codeFragments: [
          {
            ...nameFragment,
            code: 'Function',
            errors: [{ message: `Function ${functionKey} not found`, type: 'deps' }]
          },
          { ...token2fragment(ctx.LParen[0], 'any'), errors: rParenErrorMessages },
          ...argsCodeFragments,
          ...rparenCodeFragments
        ],
        image: images.join(''),
        type: 'any'
      }
    }
  }

  Arguments(ctx: { expression: any[]; Comma: IToken[] }, args: Argument[] | null): CodeFragmentResult {
    const firstArgs = args?.[0]
    const argumentTypes = firstArgs?.spread
      ? Array(ctx.expression.length).fill(firstArgs.type)
      : args?.map(x => x.type) ?? []

    const codeFragments: CodeFragment[] = []
    const images: string[] = []

    let commaIndex = 0
    let validExpressionCount = 0

    ctx.expression.forEach((arg: CstNode | CstNode[], idx: number) => {
      const { codeFragments: argFragments, image }: CodeFragmentResult = this.visit(arg, {
        type: argumentTypes[idx] || 'any'
      })

      if (argFragments.length > 0) {
        validExpressionCount += 1
      }

      codeFragments.push(...argFragments)
      images.push(image)

      if (ctx.Comma?.[commaIndex]) {
        codeFragments.push(token2fragment(ctx.Comma[commaIndex], 'any'))
        commaIndex += 1
        images.push(',')
      }
    })

    const expressionMatchErrorMessages: ErrorMessage[] =
      validExpressionCount === commaIndex + 1 ? [] : [{ message: 'Expression count mismatch', type: 'syntax' }]

    const errorMessages: ErrorMessage[] =
      !!args && ctx.expression.length !== argumentTypes.length
        ? [{ message: 'Argument count mismatch', type: 'deps' }]
        : []
    return {
      image: images.join(''),
      codeFragments: codeFragments.map(codeFragment => ({
        ...codeFragment,
        errors: [...expressionMatchErrorMessages, ...errorMessages, ...codeFragment.errors]
      })),
      type: 'any'
    }
  }
}
