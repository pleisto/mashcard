import { CstNode, tokenMatcher } from 'chevrotain'
import { buildFunctionKey, ContextInterface, NormalFunctionClause, Result } from '..'
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

  startExpression(ctx: { expression: CstNode | CstNode[] }): Result {
    return this.visit(ctx.expression)
  }

  expression(ctx: { combineExpression: CstNode | CstNode[] }): Result {
    return this.visit(ctx.combineExpression)
  }

  combineExpression(ctx: { lhs: CstNode | CstNode[]; rhs: any[]; CombineOperator: { [x: string]: any } }): Result {
    let result = this.visit(ctx.lhs)

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
        const rhsValue = this.visit(rhsOperand)
        const operator = ctx.CombineOperator[idx]

        if (tokenMatcher(operator, And)) {
          result = result && rhsValue
        } else if (tokenMatcher(operator, Or)) {
          result = result || rhsValue
        } else {
          throw new Error(`Unexpected operator ${operator.image}`)
        }
      })
    }

    return result
  }

  notExpression(ctx: { rhs: CstNode | CstNode[]; lhs: any[] }): Result {
    let result = this.visit(ctx.rhs)
    if (ctx.lhs) {
      ctx.lhs.forEach(() => {
        result = !result
      })
    }
    return result
  }

  equalCompareExpression(ctx: { lhs: CstNode | CstNode[]; rhs: any[]; EqualCompareOperator: { [x: string]: any } }): Result {
    let result = this.visit(ctx.lhs)

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
        const rhsValue = this.visit(rhsOperand)
        const operator = ctx.EqualCompareOperator[idx]

        if (tokenMatcher(operator, Equal) || tokenMatcher(operator, Equal2)) {
          result = result === rhsValue
        } else if (tokenMatcher(operator, NotEqual) || tokenMatcher(operator, NotEqual2)) {
          result = result !== rhsValue
        } else {
          throw new Error(`Unexpected operator ${operator.image}`)
        }
      })
    }

    return result
  }

  compareExpression(ctx: { lhs: CstNode | CstNode[]; rhs: any[]; CompareOperator: { [x: string]: any } }): Result {
    let result = this.visit(ctx.lhs)

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
        // there will be one operator for each rhs operand
        const rhsValue = this.visit(rhsOperand)
        const operator = ctx.CompareOperator[idx]

        if (tokenMatcher(operator, GreaterThan)) {
          result = result > rhsValue
        } else if (tokenMatcher(operator, LessThan)) {
          result = result < rhsValue
        } else if (tokenMatcher(operator, GreaterThanEqual)) {
          result = result >= rhsValue
        } else if (tokenMatcher(operator, LessThanEqual)) {
          result = result <= rhsValue
        } else {
          throw new Error(`Unexpected operator ${operator.image}`)
        }
      })
    }

    return result
  }

  concatExpression(ctx: { lhs: CstNode | CstNode[]; rhs: any[] }): Result {
    let result = this.visit(ctx.lhs)

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand: CstNode | CstNode[]) => {
        result = result.concat(this.visit(rhsOperand))
      })
    }

    return result
  }

  additionExpression(ctx: { lhs: CstNode | CstNode[]; rhs: any[]; AdditionOperator: { [x: string]: any } }): Result {
    let result = this.visit(ctx.lhs)

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
        const rhsValue = this.visit(rhsOperand)
        const operator = ctx.AdditionOperator[idx]

        if (tokenMatcher(operator, Plus)) {
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          result += rhsValue
        } else if (tokenMatcher(operator, Minus)) {
          result -= rhsValue
        } else {
          throw new Error(`Unexpected operator ${operator.image}`)
        }
      })
    }

    return result
  }

  multiplicationExpression(ctx: { lhs: CstNode | CstNode[]; rhs: any[]; MultiplicationOperator: { [x: string]: any } }): Result {
    let result = this.visit(ctx.lhs)

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
        const rhsValue = this.visit(rhsOperand)
        const operator = ctx.MultiplicationOperator[idx]

        if (tokenMatcher(operator, Multi)) {
          result *= rhsValue
        } else if (tokenMatcher(operator, Div)) {
          result /= rhsValue
        } else if (tokenMatcher(operator, Caret)) {
          result **= rhsValue
        } else {
          throw new Error(`Unexpected operator ${operator.image}`)
        }
      })
    }

    return result
  }

  chainExpression(ctx: { lhs: CstNode | CstNode[]; rhs: any[] }): Result {
    let result = this.visit(ctx.lhs)

    if (ctx.rhs) {
      ctx.rhs.forEach((cst: CstNode | CstNode[]) => {
        result = this.visit(cst, result)
      })
    }

    return result
  }

  atomicExpression(ctx: {
    parenthesisExpression: CstNode | CstNode[]
    constantExpression: CstNode | CstNode[]
    FunctionCall: CstNode | CstNode[]
    variableExpression: CstNode | CstNode[]
    columnExpression: CstNode | CstNode[]
    blockExpression: CstNode | CstNode[]
  }): Result {
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
    } else if (ctx.blockExpression) {
      return this.visit(ctx.blockExpression)
    }
  }

  parenthesisExpression(ctx: { expression: CstNode | CstNode[] }): Result {
    return this.visit(ctx.expression)
  }

  constantExpression(ctx: {
    NumberLiteralExpression: CstNode | CstNode[]
    BooleanLiteralExpression: CstNode | CstNode[]
    StringLiteral: Array<{ image: any }>
  }): Result {
    if (ctx.NumberLiteralExpression) {
      return this.visit(ctx.NumberLiteralExpression)
    } else if (ctx.BooleanLiteralExpression) {
      return this.visit(ctx.BooleanLiteralExpression)
    } else if (ctx.StringLiteral) {
      // TODO: dirty hack to get the string literal value
      const str = ctx.StringLiteral[0].image
      return str.substring(1, str.length - 1).replace(/""/g, '"')
    }
  }

  columnExpression(ctx: { UUID: { map: (arg0: (uuid: any) => any) => [any, any] } }): Result {
    const [namespaceId, columnId] = ctx.UUID.map((uuid: { image: any }) => uuid.image)
    const column = this.formulaContext.findColumn(namespaceId, columnId)

    return column
  }

  blockExpression(ctx: { UUID: Array<{ image: any }> }): Result {
    const namespaceId = ctx.UUID[0].image
    const database = this.formulaContext.findDatabase(namespaceId)

    return database
  }

  variableExpression(ctx: { UUID: { map: (arg0: (uuid: any) => any) => [any, any] } }): Result {
    const [namespaceId, variableId] = ctx.UUID.map((uuid: { image: any }) => uuid.image)
    const variable = this.formulaContext.findVariable(namespaceId, variableId)
    if (!variable) {
      throw new Error(`Variable not found: ${variableId}`)
    }

    if (variable.t.kind === 'constant') {
      return variable.t.variableValue.value
    }

    return this.visit(variable.t.cst!)
  }

  NumberLiteralExpression(ctx: { NumberLiteral: Array<{ image: any }>; Sign: any; Minus: any }): Result {
    const number = Number(ctx.NumberLiteral[0].image)
    const numberAfterSign = ctx.Sign ? number * 0.01 : number

    return ctx.Minus ? numberAfterSign * -1 : numberAfterSign
  }

  BooleanLiteralExpression(ctx: { BooleanLiteral: Array<{ image: string }> }): Result {
    return ['true'].includes(ctx.BooleanLiteral[0].image)
  }

  FunctionCall(
    ctx: { FunctionGroupName: Array<{ image: any }>; FunctionName: Array<{ image: any }>; Arguments: CstNode | CstNode[] },
    chainArgs: any
  ): Result {
    const group = ctx.FunctionGroupName?.[0].image ?? 'core'
    const name = ctx.FunctionName[0].image

    const clause = this.formulaContext.findFunctionClause(group, name)

    const functionKey = buildFunctionKey(group, name)

    if (!clause) {
      throw new Error(`Function ${functionKey} not found`)
    }

    const args: Result[] = []

    if (ctx.Arguments) {
      args.push(...this.visit(ctx.Arguments))
    }

    if (clause.chain) {
      return clause.reference(this.formulaContext, chainArgs, ...args).result
    } else {
      return (clause as NormalFunctionClause<'any'>).reference(this.formulaContext, ...args).result
    }
  }

  Arguments(ctx: { expression: any[] }): Result[] {
    return ctx.expression.map((arg: CstNode | CstNode[]) => this.visit(arg))
  }
}
