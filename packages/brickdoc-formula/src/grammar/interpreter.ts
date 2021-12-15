import { CstNode, IToken, tokenMatcher } from 'chevrotain'
import {
  buildFunctionKey,
  ContextInterface,
  AnyTypeValue,
  ColumnResult,
  NullResult,
  SpreadsheetResult,
  NumberResult,
  BooleanResult,
  PredicateResult,
  PredicateOperator
} from '..'
import { BaseCstVisitor } from './parser'
import {
  Div,
  Equal2,
  Equal,
  GreaterThanEqual,
  GreaterThan,
  LessThanEqual,
  LessThan,
  Minus,
  Multi,
  NotEqual2,
  NotEqual,
  Plus,
  And,
  Or,
  Caret
} from './lexer'

interface InterpreterConfig {
  formulaContext: ContextInterface
}

export class FormulaInterpreter extends BaseCstVisitor {
  formulaContext: ContextInterface

  constructor({ formulaContext }: InterpreterConfig) {
    super()
    this.formulaContext = formulaContext
    // This helper will detect any missing or redundant methods on this visitor
    this.validateVisitor()
  }

  startExpression(ctx: { expression: CstNode | CstNode[] }): AnyTypeValue {
    return this.visit(ctx.expression)
  }

  multilineExpression(ctx: { lhs: CstNode | CstNode[]; rhs: any }): AnyTypeValue {
    let result = this.visit(ctx.lhs)

    if (!ctx.rhs) {
      return result
    }

    ctx.rhs.forEach((rhs: CstNode | CstNode[]) => {
      result = this.visit(rhs)
    })

    return result
  }

  expression(ctx: { combineExpression: CstNode | CstNode[] }): AnyTypeValue {
    return this.visit(ctx.combineExpression)
  }

  combineExpression(ctx: {
    lhs: CstNode | CstNode[]
    rhs: any[]
    CombineOperator: { [x: string]: any }
  }): AnyTypeValue {
    let result = this.visit(ctx.lhs)

    if (!ctx.rhs) {
      return result
    }

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      const rhsValue = this.visit(rhsOperand)
      const operator = ctx.CombineOperator[idx]

      if (tokenMatcher(operator, And)) {
        result = { result: result.result && rhsValue.result, type: 'boolean' }
      } else if (tokenMatcher(operator, Or)) {
        result = { result: result.result || rhsValue.result, type: 'boolean' }
      } else {
        throw new Error(`Unexpected operator ${operator.image}`)
      }
    })

    return result
  }

  notExpression(ctx: { rhs: CstNode | CstNode[]; lhs: any[] }): AnyTypeValue {
    let result = this.visit(ctx.rhs)

    if (!ctx.lhs) {
      return result
    }

    ctx.lhs.forEach(() => {
      result = { result: !result.result, type: 'boolean' }
    })

    return result
  }

  equalCompareExpression(ctx: {
    lhs: CstNode | CstNode[]
    rhs: any[]
    EqualCompareOperator: { [x: string]: any }
  }): AnyTypeValue {
    let result = this.visit(ctx.lhs)

    if (!ctx.rhs) {
      return result
    }

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      const rhsValue = this.visit(rhsOperand)
      const operator = ctx.EqualCompareOperator[idx]

      if (tokenMatcher(operator, Equal) || tokenMatcher(operator, Equal2)) {
        result = { result: result.result === rhsValue.result, type: 'boolean' }
      } else if (tokenMatcher(operator, NotEqual) || tokenMatcher(operator, NotEqual2)) {
        result = { result: result.result !== rhsValue.result, type: 'boolean' }
      } else {
        throw new Error(`Unexpected operator ${operator.image}`)
      }
    })

    return result
  }

  compareExpression(ctx: {
    lhs: CstNode | CstNode[]
    rhs: any[]
    CompareOperator: { [x: string]: any }
  }): AnyTypeValue {
    let result = this.visit(ctx.lhs)

    if (!ctx.rhs) {
      return result
    }

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      // there will be one operator for each rhs operand
      const rhsValue = this.visit(rhsOperand)
      const operator = ctx.CompareOperator[idx]

      if (tokenMatcher(operator, GreaterThan)) {
        result = { result: result.result > rhsValue.result, type: 'boolean' }
      } else if (tokenMatcher(operator, LessThan)) {
        result = { result: result.result < rhsValue.result, type: 'boolean' }
      } else if (tokenMatcher(operator, GreaterThanEqual)) {
        result = { result: result.result >= rhsValue.result, type: 'boolean' }
      } else if (tokenMatcher(operator, LessThanEqual)) {
        result = { result: result.result <= rhsValue.result, type: 'boolean' }
      } else {
        throw new Error(`Unexpected operator ${operator.image}`)
      }
    })

    return result
  }

  concatExpression(ctx: { lhs: CstNode | CstNode[]; rhs: any[] }): AnyTypeValue {
    let result = this.visit(ctx.lhs)

    if (!ctx.rhs) {
      return result
    }

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[]) => {
      result = { result: result.result.concat(this.visit(rhsOperand).result), type: 'string' }
    })

    return result
  }

  additionExpression(ctx: {
    lhs: CstNode | CstNode[]
    rhs: any[]
    AdditionOperator: { [x: string]: any }
  }): AnyTypeValue {
    let result = this.visit(ctx.lhs)

    if (!ctx.rhs) {
      return result
    }

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      const rhsValue = this.visit(rhsOperand)
      const operator = ctx.AdditionOperator[idx]

      if (tokenMatcher(operator, Plus)) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        result = { result: result.result + rhsValue.result, type: 'number' }
      } else if (tokenMatcher(operator, Minus)) {
        result = { result: result.result - rhsValue.result, type: 'number' }
      } else {
        throw new Error(`Unexpected operator ${operator.image}`)
      }
    })

    return result
  }

  multiplicationExpression(ctx: {
    lhs: CstNode | CstNode[]
    rhs: any[]
    MultiplicationOperator: { [x: string]: any }
  }): AnyTypeValue {
    let result = this.visit(ctx.lhs)

    if (!ctx.rhs) {
      return result
    }

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      const rhsValue = this.visit(rhsOperand)
      const operator = ctx.MultiplicationOperator[idx]

      if (tokenMatcher(operator, Multi)) {
        result = { result: result.result * rhsValue.result, type: 'number' }
      } else if (tokenMatcher(operator, Div)) {
        result = { result: result.result / rhsValue.result, type: 'number' }
      } else if (tokenMatcher(operator, Caret)) {
        result = { result: result.result ** rhsValue.result, type: 'number' }
      } else {
        throw new Error(`Unexpected operator ${operator.image}`)
      }
    })

    return result
  }

  chainExpression(ctx: { lhs: CstNode | CstNode[]; rhs: any[] }): AnyTypeValue {
    let result = this.visit(ctx.lhs)

    if (!ctx.rhs) {
      return result
    }

    ctx.rhs.forEach((cst: CstNode | CstNode[]) => {
      result = this.visit(cst, result)
    })

    return result
  }

  atomicExpression(ctx: {
    parenthesisExpression: CstNode | CstNode[]
    constantExpression: CstNode | CstNode[]
    FunctionCall: CstNode | CstNode[]
    variableExpression: CstNode | CstNode[]
    columnExpression: CstNode | CstNode[]
    spreadsheetExpression: CstNode | CstNode[]
    predicateExpression: CstNode | CstNode[]
  }): AnyTypeValue {
    if (ctx.parenthesisExpression) {
      return this.visit(ctx.parenthesisExpression)
    } else if (ctx.constantExpression) {
      return this.visit(ctx.constantExpression)
    } else if (ctx.FunctionCall) {
      return this.visit(ctx.FunctionCall)
    } else if (ctx.variableExpression) {
      return this.visit(ctx.variableExpression)
    } else if (ctx.columnExpression) {
      return this.visit(ctx.columnExpression)
    } else if (ctx.spreadsheetExpression) {
      return this.visit(ctx.spreadsheetExpression)
    } else if (ctx.predicateExpression) {
      return this.visit(ctx.predicateExpression)
    } else {
      throw new Error('unsupported expression')
    }
  }

  predicateExpression(ctx: {
    EqualCompareOperator: IToken[]
    CompareOperator: IToken[]
    atomicExpression: CstNode | CstNode[]
  }): PredicateResult {
    let operator: PredicateOperator
    let token: IToken
    if (ctx.EqualCompareOperator) {
      token = ctx.EqualCompareOperator[0]
    } else {
      token = ctx.CompareOperator[0]
    }

    if (tokenMatcher(token, Equal) || tokenMatcher(token, Equal2)) {
      operator = 'equal'
    } else if (tokenMatcher(token, NotEqual) || tokenMatcher(token, NotEqual2)) {
      operator = 'notEqual'
    } else if (tokenMatcher(token, LessThan)) {
      operator = 'lessThan'
    } else if (tokenMatcher(token, GreaterThan)) {
      operator = 'greaterThan'
    } else if (tokenMatcher(token, LessThanEqual)) {
      operator = 'lessThanEqual'
    } else if (tokenMatcher(token, GreaterThanEqual)) {
      operator = 'greaterThanEqual'
    } else {
      throw new Error(`Unexpected operator ${token.image}`)
    }

    const result = this.visit(ctx.atomicExpression)
    return { type: 'Predicate', result, operator }
  }

  parenthesisExpression(ctx: { expression: CstNode | CstNode[] }): AnyTypeValue {
    return this.visit(ctx.expression)
  }

  constantExpression(ctx: {
    NumberLiteralExpression: CstNode | CstNode[]
    BooleanLiteralExpression: CstNode | CstNode[]
    StringLiteral: Array<{ image: any }>
  }): AnyTypeValue {
    if (ctx.NumberLiteralExpression) {
      return this.visit(ctx.NumberLiteralExpression)
    } else if (ctx.BooleanLiteralExpression) {
      return this.visit(ctx.BooleanLiteralExpression)
    } else if (ctx.StringLiteral) {
      // TODO: dirty hack to get the string literal value
      const str = ctx.StringLiteral[0].image
      return { result: str.substring(1, str.length - 1).replace(/""/g, '"'), type: 'string' }
    } else {
      throw new Error('unsupported expression')
    }
  }

  columnExpression(ctx: { UUID: { map: (arg0: (uuid: any) => any) => [any, any] } }): ColumnResult | NullResult {
    const [namespaceId, columnId] = ctx.UUID.map((uuid: { image: any }) => uuid.image)
    const column = this.formulaContext.findColumn(namespaceId, columnId)

    if (column) {
      return { type: 'Column', result: column }
    } else {
      return { type: 'null', result: null }
    }
  }

  spreadsheetExpression(ctx: { UUID: Array<{ image: any }> }): SpreadsheetResult | NullResult {
    const namespaceId = ctx.UUID[0].image
    const database = this.formulaContext.findDatabase(namespaceId)

    if (database) {
      return { type: 'Spreadsheet', result: database }
    } else {
      return { type: 'null', result: null }
    }
  }

  variableExpression(ctx: { UUID: { map: (arg0: (uuid: any) => any) => [any, any] } }): AnyTypeValue {
    const [namespaceId, variableId] = ctx.UUID.map((uuid: { image: any }) => uuid.image)
    const variable = this.formulaContext.findVariable(namespaceId, variableId)
    if (!variable) {
      throw new Error(`Variable not found: ${variableId}`)
    }

    if (variable.t.kind === 'constant') {
      return variable.t.variableValue.result
    }

    return this.visit(variable.t.cst!)
  }

  NumberLiteralExpression(ctx: { NumberLiteral: Array<{ image: any }>; Sign: any; Minus: any }): NumberResult {
    const number = Number(ctx.NumberLiteral[0].image)
    const numberAfterSign = ctx.Sign ? number * 0.01 : number

    return { result: ctx.Minus ? numberAfterSign * -1 : numberAfterSign, type: 'number' }
  }

  BooleanLiteralExpression(ctx: { BooleanLiteral: Array<{ image: string }> }): BooleanResult {
    return { result: ['true'].includes(ctx.BooleanLiteral[0].image), type: 'boolean' }
  }

  FunctionCall(
    ctx: {
      FunctionName: Array<{ image: any }>
      Arguments: CstNode | CstNode[]
    },
    chainArgs: any
  ): AnyTypeValue {
    const names = ctx.FunctionName.map(group => group.image)
    const [group, name] = names.length === 1 ? ['core', ...names] : names

    const clause = this.formulaContext.findFunctionClause(group, name)

    const functionKey = buildFunctionKey(group, name)

    if (!clause) {
      throw new Error(`Function ${functionKey} not found`)
    }

    const args: AnyTypeValue[] = []

    if (clause.chain && chainArgs) {
      args.push(chainArgs)
    }

    if (ctx.Arguments) {
      args.push(...this.visit(ctx.Arguments))
    }

    const argsTypes = clause.args[0]?.spread
      ? Array(args.length).fill(clause.args[0].type)
      : clause.args.map(arg => arg.type)

    const newArgs = args.map((arg, index) => {
      const argType = argsTypes[index]

      if (argType === 'Predicate' && arg.type !== 'Predicate') {
        return { type: 'Predicate', result: arg, operator: 'equal' }
      } else {
        return arg
      }
    })

    return clause.reference(this.formulaContext, ...newArgs)
  }

  Arguments(ctx: { expression: any[] }): AnyTypeValue[] {
    return ctx.expression.map((arg: CstNode | CstNode[]) => this.visit(arg))
  }
}
