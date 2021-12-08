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
  buildFunctionKey
} from '..'
import { BaseCstVisitor } from './parser'

interface InterpreterConfig {
  readonly formulaContext: ContextInterface
}

const SpaceBeforeTypes = [
  'Comma',
  'RParen',
  'Plus',
  'Div',
  'Minus',
  'Multi',
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
  'Comma',
  'LParen',
  'Plus',
  'Div',
  'Minus',
  'Multi',
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

const token2fragment = (token: IToken, type: FormulaType): CodeFragment => {
  const spaceBefore = SpaceBeforeTypes.includes(token.tokenType.name)
  const spaceAfter = SpaceAfterTypes.includes(token.tokenType.name)
  return { name: token.image, code: token.tokenType.name, errors: [], type, spaceBefore, spaceAfter, meta: {} }
}

type ExpressionType = FormulaType | undefined

interface result {
  readonly codeFragments: CodeFragment[]
  readonly type: FormulaType
}

interface ExpressionArgument {
  readonly type: ExpressionType
  readonly firstArgumentType?: ExpressionType
}

const intersectType = (argumentType: ExpressionType, contextType: FormulaType): { errorMessages: ErrorMessage[]; newType: FormulaType } => {
  if (argumentType === undefined) {
    return { errorMessages: [], newType: contextType }
  }

  if (argumentType === 'any') {
    return { errorMessages: [], newType: contextType }
  }

  if (contextType === 'any') {
    return { errorMessages: [], newType: argumentType }
  }

  if (argumentType === contextType) {
    return { errorMessages: [], newType: argumentType }
  }

  return {
    errorMessages: [{ type: 'type', message: `Expected ${argumentType} but got ${contextType}` }],
    newType: contextType
  }
}

export class CodeFragmentVisitor extends BaseCstVisitor {
  formulaContext: ContextInterface
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

  startExpression(ctx: { expression: CstNode | CstNode[] }, { type }: ExpressionArgument): result {
    // const operator = ctx.Equal[0] as IToken
    // return [token2fragment(operator), ...this.visit(ctx.expression)]
    return this.visit(ctx.expression, { type })
  }

  expression(ctx: { combineExpression: CstNode | CstNode[] }, { type }: ExpressionArgument): result {
    return this.visit(ctx.combineExpression, { type })
  }

  combineExpression(
    ctx: { rhs: any[]; lhs: CstNode | CstNode[]; CombineOperator: { [x: string]: IToken } },
    { type }: ExpressionArgument
  ): result {
    if (!ctx.rhs) {
      return this.visit(ctx.lhs, { type })
    }

    const codeFragments: CodeFragment[] = []
    const parentType: FormulaType = 'boolean'
    const childrenType: FormulaType = 'boolean'

    const { codeFragments: lhsCodeFragments }: result = this.visit(ctx.lhs, { type: childrenType })
    codeFragments.push(...lhsCodeFragments)

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      const operator = ctx.CombineOperator[idx] as IToken
      const { codeFragments: rhsValue }: result = this.visit(rhsOperand, { type: childrenType })

      codeFragments.push(token2fragment(operator, parentType), ...rhsValue)
    })

    const { errorMessages, newType } = intersectType(type, parentType)
    return {
      codeFragments: codeFragments.map(codeFragment => ({ ...codeFragment, errors: [...errorMessages, ...codeFragment.errors] })),
      type: newType
    }
  }

  notExpression(ctx: { lhs: any[]; rhs: CstNode | CstNode[] }, { type }: ExpressionArgument): result {
    if (!ctx.lhs) {
      return this.visit(ctx.rhs, { type })
    }

    const codeFragments: CodeFragment[] = []
    const parentType: FormulaType = 'boolean'
    const childrenType: FormulaType = 'any'

    ctx.lhs.forEach((operator: IToken) => {
      codeFragments.push(token2fragment(operator, parentType))
    })

    const { errorMessages, newType } = intersectType(type, parentType)
    const { codeFragments: rhsCodeFragments }: result = this.visit(ctx.rhs, { type: childrenType })

    return {
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
  ): result {
    if (!ctx.rhs) {
      return this.visit(ctx.lhs, { type })
    }

    const codeFragments: CodeFragment[] = []
    const parentType: FormulaType = 'boolean'
    const childrenType: FormulaType = 'any'

    const { codeFragments: lhsCodeFragments }: result = this.visit(ctx.lhs, { type: childrenType })
    codeFragments.push(...lhsCodeFragments)

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      const { codeFragments: rhsValue }: result = this.visit(rhsOperand, { type: childrenType })
      const operator = ctx.EqualCompareOperator[idx]
      codeFragments.push(token2fragment(operator, parentType), ...rhsValue)
    })

    const { errorMessages, newType } = intersectType(type, parentType)
    return {
      codeFragments: codeFragments.map(codeFragment => ({ ...codeFragment, errors: [...errorMessages, ...codeFragment.errors] })),
      type: newType
    }
  }

  compareExpression(
    ctx: { rhs: any[]; lhs: CstNode | CstNode[]; CompareOperator: { [x: string]: any } },
    { type }: ExpressionArgument
  ): result {
    if (!ctx.rhs) {
      return this.visit(ctx.lhs, { type })
    }

    const codeFragments: CodeFragment[] = []
    const parentType: FormulaType = 'boolean'
    const childrenType: FormulaType = 'number'

    const { codeFragments: lhsCodeFragments }: result = this.visit(ctx.lhs, { type: childrenType })
    codeFragments.push(...lhsCodeFragments)

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      const { codeFragments: rhsValue }: result = this.visit(rhsOperand, { type: childrenType })
      const operator = ctx.CompareOperator[idx]
      codeFragments.push(token2fragment(operator, parentType), ...rhsValue)
    })

    const { errorMessages, newType } = intersectType(type, parentType)
    return {
      codeFragments: codeFragments.map(codeFragment => ({ ...codeFragment, errors: [...errorMessages, ...codeFragment.errors] })),
      type: newType
    }
  }

  concatExpression(ctx: { rhs: any[]; lhs: CstNode | CstNode[] }, { type }: ExpressionArgument): result {
    if (!ctx.rhs) {
      return this.visit(ctx.lhs, { type })
    }

    const codeFragments: CodeFragment[] = []
    const parentType: FormulaType = 'string'
    const childrenType: FormulaType = 'string'

    const { codeFragments: lhsCodeFragments }: result = this.visit(ctx.lhs, { type: childrenType })
    codeFragments.push(...lhsCodeFragments)

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[]) => {
      const { codeFragments: rhsValue }: result = this.visit(rhsOperand, { type: childrenType })
      codeFragments.push(
        { name: '&', code: 'Ampersand', type: 'any', errors: [], spaceBefore: true, spaceAfter: true, meta: {} },
        ...rhsValue
      )
    })

    const { errorMessages, newType } = intersectType(type, parentType)
    return {
      codeFragments: codeFragments.map(codeFragment => ({ ...codeFragment, errors: [...errorMessages, ...codeFragment.errors] })),
      type: newType
    }
  }

  additionExpression(
    ctx: { rhs: any[]; lhs: CstNode | CstNode[]; AdditionOperator: { [x: string]: any } },
    { type }: ExpressionArgument
  ): result {
    if (!ctx.rhs) {
      return this.visit(ctx.lhs, { type })
    }

    const codeFragments: CodeFragment[] = []
    const parentType: FormulaType = 'number'
    const childrenType: FormulaType = 'number'

    const { codeFragments: lhsCodeFragments }: result = this.visit(ctx.lhs, { type: childrenType })
    codeFragments.push(...lhsCodeFragments)

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      const { codeFragments: rhsValue }: result = this.visit(rhsOperand, { type: childrenType })
      const operator = ctx.AdditionOperator[idx]
      codeFragments.push(token2fragment(operator, parentType), ...rhsValue)
    })

    const { errorMessages, newType } = intersectType(type, parentType)
    return {
      codeFragments: codeFragments.map(codeFragment => ({ ...codeFragment, errors: [...errorMessages, ...codeFragment.errors] })),
      type: newType
    }
  }

  multiplicationExpression(
    ctx: { rhs: any[]; lhs: CstNode | CstNode[]; MultiplicationOperator: { [x: string]: any } },
    { type }: ExpressionArgument
  ): result {
    if (!ctx.rhs) {
      return this.visit(ctx.lhs, { type })
    }

    const codeFragments: CodeFragment[] = []
    const parentType: FormulaType = 'number'
    const childrenType: FormulaType = 'number'

    const { codeFragments: lhsCodeFragments }: result = this.visit(ctx.lhs, { type: childrenType })
    codeFragments.push(...lhsCodeFragments)

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      const { codeFragments: rhsValue }: result = this.visit(rhsOperand, { type: childrenType })
      const operator = ctx.MultiplicationOperator[idx]
      codeFragments.push(token2fragment(operator, parentType), ...rhsValue)
    })

    const { errorMessages, newType } = intersectType(type, parentType)
    return {
      codeFragments: codeFragments.map(codeFragment => ({ ...codeFragment, errors: [...errorMessages, ...codeFragment.errors] })),
      type: newType
    }
  }

  chainExpression(ctx: { rhs: any[]; lhs: CstNode | CstNode[] }, { type }: ExpressionArgument): result {
    if (!ctx.rhs) {
      return this.visit(ctx.lhs, { type })
    }

    const codeFragments: CodeFragment[] = []
    const { codeFragments: lhsCodeFragments, type: lhsType }: result = this.visit(ctx.lhs, { type: 'any' })
    codeFragments.push(...lhsCodeFragments)

    let firstArgumentType = lhsType

    ctx.rhs.forEach((cst: CstNode | CstNode[]) => {
      const { codeFragments: rhsCodeFragments, type: rhsType }: result = this.visit(cst, { type: 'any', firstArgumentType })
      codeFragments.push(
        { name: '.', code: 'Dot', type: 'any', errors: [], spaceBefore: false, spaceAfter: false, meta: {} },
        ...rhsCodeFragments
      )
      firstArgumentType = rhsType
    })

    const { errorMessages, newType } = intersectType(type, firstArgumentType)
    return {
      codeFragments: codeFragments.map(codeFragment => ({ ...codeFragment, errors: [...errorMessages, ...codeFragment.errors] })),
      type: newType
    }
  }

  atomicExpression(
    ctx: {
      parenthesisExpression: CstNode | CstNode[]
      constantExpression: CstNode | CstNode[]
      FunctionCall: CstNode | CstNode[]
      variableExpression: CstNode | CstNode[]
      columnExpression: CstNode | CstNode[]
      blockExpression: CstNode | CstNode[]
    },
    { type }: ExpressionArgument
  ): result {
    if (ctx.parenthesisExpression) {
      return this.visit(ctx.parenthesisExpression, { type })
    } else if (ctx.constantExpression) {
      return this.visit(ctx.constantExpression, { type })
    } else if (ctx.FunctionCall) {
      return this.visit(ctx.FunctionCall, { type })
    } else if (ctx.variableExpression) {
      return this.visit(ctx.variableExpression, { type })
    } else if (ctx.columnExpression) {
      return this.visit(ctx.columnExpression, { type })
    } else if (ctx.blockExpression) {
      return this.visit(ctx.blockExpression, { type })
    }

    throw new Error('Unsupported atomic expression')
  }

  parenthesisExpression(
    ctx: { expression: CstNode | CstNode[]; LParen: IToken[]; RParen: IToken[] },
    { type }: ExpressionArgument
  ): result {
    const { codeFragments, type: expressionType }: result = this.visit(ctx.expression, { type })
    return {
      codeFragments: [token2fragment(ctx.LParen[0], 'any'), ...codeFragments, token2fragment(ctx.RParen[0], 'any')],
      type: expressionType
    }
  }

  constantExpression(
    ctx: { NumberLiteralExpression: CstNode | CstNode[]; BooleanLiteralExpression: CstNode | CstNode[]; StringLiteral: IToken[] },
    { type }: ExpressionArgument
  ): result {
    if (ctx.NumberLiteralExpression) {
      return this.visit(ctx.NumberLiteralExpression, { type })
    } else if (ctx.BooleanLiteralExpression) {
      return this.visit(ctx.BooleanLiteralExpression, { type })
    } else if (ctx.StringLiteral) {
      const parentType = 'string'
      const { errorMessages } = intersectType(type, parentType)
      return { codeFragments: [{ ...token2fragment(ctx.StringLiteral[0], parentType), errors: errorMessages }], type: parentType }
    }

    throw new Error('Unsupported constant expression')
  }

  NumberLiteralExpression(ctx: { NumberLiteral: IToken[] }, { type }: ExpressionArgument): result {
    const parentType = 'number'
    const { errorMessages } = intersectType(type, parentType)
    return { codeFragments: [{ ...token2fragment(ctx.NumberLiteral[0], parentType), errors: errorMessages }], type: parentType }
  }

  BooleanLiteralExpression(ctx: { BooleanLiteral: IToken[] }, { type }: ExpressionArgument): result {
    const parentType = 'boolean'
    const { errorMessages } = intersectType(type, parentType)
    return { codeFragments: [{ ...token2fragment(ctx.BooleanLiteral[0], parentType), errors: errorMessages }], type: parentType }
  }

  columnExpression(ctx: { Dollar: IToken[]; UUID: [any, any] }, { type }: ExpressionArgument): result {
    const dollarFragment = token2fragment(ctx.Dollar[0], 'any')
    const [namespaceToken, columnToken] = ctx.UUID

    const namespaceId = namespaceToken.image
    const columnId = columnToken.image

    const columnFragment = token2fragment(columnToken, 'any')

    const column = this.formulaContext.findColumn(namespaceId, columnId)

    const parentType: ExpressionType = 'Column'

    this.kind = 'expression'

    if (column) {
      const { errorMessages, newType } = intersectType(type, parentType)
      return { codeFragments: [{ ...columnFragment, name: `$${column.name}`, errors: errorMessages }], type: newType }
    } else {
      return {
        codeFragments: [
          dollarFragment,
          { ...columnFragment, name: `${namespaceId}#${columnId}`, errors: [{ message: `Column not found: ${columnId}`, type: 'deps' }] }
        ],
        type: parentType
      }
    }
  }

  blockExpression(ctx: { Dollar: IToken[]; UUID: any[] }, { type }: ExpressionArgument): result {
    const dollarFragment = token2fragment(ctx.Dollar[0], 'any')
    const namespaceToken = ctx.UUID[0]
    const namespaceId = namespaceToken.image

    const database = this.formulaContext.findDatabase(namespaceId)

    const parentType: FormulaType = 'Block'

    this.kind = 'expression'

    if (database) {
      const { errorMessages, newType } = intersectType(type, parentType)
      return {
        codeFragments: [{ ...token2fragment(namespaceToken, 'any'), name: `$${database.name()}`, errors: errorMessages }],
        type: newType
      }
    } else {
      return {
        codeFragments: [
          dollarFragment,
          { ...token2fragment(namespaceToken, 'any'), errors: [{ message: `Database not found: ${namespaceId}`, type: 'deps' }] }
        ],
        type: parentType
      }
    }
  }

  variableExpression(ctx: { Dollar: IToken[]; UUID: [any, any] }, { type }: ExpressionArgument): result {
    const dollarFragment = token2fragment(ctx.Dollar[0], 'any')
    const [namespaceToken, variableToken] = ctx.UUID

    const namespaceId = namespaceToken.image
    const variableId = variableToken.image

    const variableFragment = token2fragment(variableToken, 'any')

    const variable = this.formulaContext.findVariable(namespaceId, variableId)

    this.kind = 'expression'

    if (variable) {
      this.variableDependencies.push({ namespaceId, variableId })
      this.flattenVariableDependencies = new Set([
        { namespaceId, variableId },
        ...this.flattenVariableDependencies,
        ...variable.t.flattenVariableDependencies
      ])
      this.level = Math.max(this.level, variable.t.level + 1)

      const { errorMessages, newType } = intersectType(type, variable.t.variableValue.type ?? 'any')
      return {
        codeFragments: [
          {
            ...variableFragment,
            code: 'Variable',
            meta: { name: variable.t.name },
            name: `$${namespaceId}@${variableId}`,
            errors: errorMessages
          }
        ],
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
        type: 'any'
      }
    }
  }

  FunctionCall(
    ctx: {
      FunctionGroupName: Array<{ image: any }>
      FunctionName: IToken[]
      Arguments: CstNode | CstNode[]
      LParen: IToken[]
      RParen: IToken[]
    },
    { type, firstArgumentType }: ExpressionArgument
  ): result {
    const group = ctx.FunctionGroupName?.[0].image ?? 'core'
    const name = ctx.FunctionName[0].image

    const clause = this.formulaContext.findFunctionClause(group, name)

    this.kind = 'expression'

    const functionKey = buildFunctionKey(group, name)

    const nameFragment = { ...token2fragment(ctx.FunctionName[0], 'any'), name: functionKey }

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
      const args = ctx.Arguments ? (this.visit(ctx.Arguments, clauseArgs) as result).codeFragments : []
      const argsErrorMessages: ErrorMessage[] =
        clauseArgs.length > 0 && args.length === 0 ? [{ message: 'Miss argument', type: 'deps' }] : []

      const { errorMessages, newType } = intersectType(type, clause.returns)
      return {
        codeFragments: [
          { ...nameFragment, code: 'Function', errors: [...chainError, ...errorMessages, ...argsErrorMessages] },
          token2fragment(ctx.LParen[0], 'any'),
          ...args,
          token2fragment(ctx.RParen[0], 'any')
        ],
        type: newType
      }
    } else {
      const args = ctx.Arguments ? (this.visit(ctx.Arguments, null) as result).codeFragments : []
      return {
        codeFragments: [
          { ...nameFragment, code: 'Function', errors: [{ message: `Function ${functionKey} not found`, type: 'deps' }] },
          token2fragment(ctx.LParen[0], 'any'),
          ...args,
          token2fragment(ctx.RParen[0], 'any')
        ],
        type: 'any'
      }
    }
  }

  Arguments(ctx: { expression: any[]; Comma: IToken[] }, args: Argument[] | null): result {
    const firstArgs = args?.[0]
    const argumentTypes = firstArgs?.spread ? Array(ctx.expression.length).fill(firstArgs.type) : args?.map(x => x.type) ?? []

    const codeFragments: CodeFragment[] = []

    ctx.expression.forEach((arg: CstNode | CstNode[], idx: number) => {
      const { codeFragments: argFragments }: result = this.visit(arg, { type: argumentTypes[idx] || 'any' })
      if (idx === 0) {
        codeFragments.push(...argFragments)
      } else {
        codeFragments.push(token2fragment(ctx.Comma[idx - 1], 'any'), ...argFragments)
      }
    })

    const errorMessages: ErrorMessage[] =
      !!args && ctx.expression.length !== argumentTypes.length ? [{ message: 'Argument count mismatch', type: 'deps' }] : []
    return {
      codeFragments: codeFragments.map(codeFragment => ({ ...codeFragment, errors: [...errorMessages, ...codeFragment.errors] })),
      type: 'any'
    }
  }
}
