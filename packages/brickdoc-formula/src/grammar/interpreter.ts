import { tokenMatcher } from 'chevrotain'
import { ContextInterface, NormalFunctionClause, Result } from '..'
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

  startExpression(ctx): Result {
    return this.visit(ctx.expression)
  }

  expression(ctx): Result {
    return this.visit(ctx.combineExpression)
  }

  combineExpression(ctx): Result {
    let result = this.visit(ctx.lhs)

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
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

  notExpression(ctx): Result {
    let result = this.visit(ctx.rhs)
    if (ctx.lhs) {
      ctx.lhs.forEach(() => {
        result = !result
      })
    }
    return result
  }

  equalCompareExpression(ctx): Result {
    let result = this.visit(ctx.lhs)

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
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

  compareExpression(ctx): Result {
    let result = this.visit(ctx.lhs)

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
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

  concatExpression(ctx): Result {
    let result = this.visit(ctx.lhs)

    if (ctx.rhs) {
      ctx.rhs.forEach(rhsOperand => {
        result = result.concat(this.visit(rhsOperand))
      })
    }

    return result
  }

  additionExpression(ctx): Result {
    let result = this.visit(ctx.lhs)

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
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

  multiplicationExpression(ctx): Result {
    let result = this.visit(ctx.lhs)

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
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

  chainExpression(ctx): Result {
    let result = this.visit(ctx.lhs)

    if (ctx.rhs) {
      ctx.rhs.forEach(cst => {
        result = this.visit(cst, result)
      })
    }

    return result
  }

  atomicExpression(ctx): Result {
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

  parenthesisExpression(ctx): Result {
    return this.visit(ctx.expression)
  }

  constantExpression(ctx): Result {
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

  columnExpression(ctx): Result {
    const [namespaceId, columnId] = ctx.UUID.map(uuid => uuid.image)
    const column = this.formulaContext.findColumn(namespaceId, columnId)

    return column
  }

  blockExpression(ctx): Result {
    const namespaceId = ctx.UUID[0].image
    const database = this.formulaContext.findDatabase(namespaceId)

    return database
  }

  variableExpression(ctx): Result {
    const [namespaceId, variableId] = ctx.UUID.map(uuid => uuid.image)
    const variable = this.formulaContext.findVariable(namespaceId, variableId)
    if (!variable) {
      throw new Error(`Variable not found: ${variableId}`)
    }

    if (variable.t.kind === 'constant') {
      return variable.t.variableValue.value
    }

    return this.visit(variable.t.cst)
  }

  NumberLiteralExpression(ctx): Result {
    const number = Number(ctx.NumberLiteral[0].image)
    const numberAfterSign = ctx.Sign ? number * 0.01 : number

    return ctx.Minus ? numberAfterSign * -1 : numberAfterSign
  }

  BooleanLiteralExpression(ctx): Result {
    return ['true'].includes(ctx.BooleanLiteral[0].image)
  }

  FunctionCall(ctx, chainArgs): Result {
    const group = ctx.FunctionGroupName[0].image
    const name = ctx.FunctionName[0].image

    const clause = this.formulaContext.findFunctionClause(group, name)

    if (!clause) {
      throw new Error(`Function ${group}.${name} not found`)
    }

    const args = []

    if (ctx.Arguments) {
      args.push(...this.visit(ctx.Arguments))
    }

    if (clause.chain) {
      return clause.reference(this.formulaContext, chainArgs, ...args)
    } else {
      return (clause as NormalFunctionClause).reference(this.formulaContext, ...args)
    }
  }

  Arguments(ctx): Result {
    return ctx.expression.map(arg => this.visit(arg))
  }
}
