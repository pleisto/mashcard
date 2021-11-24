import { IToken } from 'chevrotain'
import { CodeFragment, ErrorMessage, ContextInterface } from '..'
import { BaseCstVisitor } from './parser'

interface InterpreterConfig {
  readonly formulaContext: ContextInterface
}

type result = CodeFragment[]

type CodeFragmentError = undefined | ErrorMessage

const token2fragment = (token: IToken): CodeFragment => {
  return { name: token.image, code: token.tokenType?.name }
}

export class CodeFragmentVisitor extends BaseCstVisitor {
  formulaContext: ContextInterface

  constructor({ formulaContext }: InterpreterConfig) {
    super()
    this.formulaContext = formulaContext
    this.validateVisitor()
  }

  startExpression(ctx): result {
    // const operator = ctx.Equal[0] as IToken
    // return [token2fragment(operator), ...this.visit(ctx.expression)]
    return this.visit(ctx.expression)
  }

  expression(ctx): result {
    return this.visit(ctx.combineExpression)
  }

  combineExpression(ctx): result {
    const result: result = this.visit(ctx.lhs)

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        const rhsValue = this.visit(rhsOperand)
        const operator = ctx.CombineOperator[idx] as IToken

        result.push(token2fragment(operator), ...rhsValue)
      })
    }

    return result
  }

  notExpression(ctx): result {
    const result: result = []
    if (ctx.lhs) {
      ctx.lhs.forEach(operator => {
        result.push(token2fragment(operator))
      })
    }
    return [...result, ...this.visit(ctx.rhs)]
  }

  compareExpression(ctx): result {
    const result: result = this.visit(ctx.lhs)

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        const rhsValue = this.visit(rhsOperand)
        const operator = ctx.CompareOperator[idx]

        result.push(token2fragment(operator), ...rhsValue)
      })
    }

    return result
  }

  additionExpression(ctx): result {
    const result: result = this.visit(ctx.lhs)

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        const rhsValue = this.visit(rhsOperand)
        const operator = ctx.AdditionOperator[idx]

        result.push(token2fragment(operator), ...rhsValue)
      })
    }

    return result
  }

  multiplicationExpression(ctx): result {
    const result: result = this.visit(ctx.lhs)

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        const rhsValue = this.visit(rhsOperand)
        const operator = ctx.MultiplicationOperator[idx]

        result.push(token2fragment(operator), ...rhsValue)
      })
    }

    return result
  }

  chainExpression(ctx): result {
    const result: result = this.visit(ctx.lhs)

    if (ctx.rhs) {
      ctx.rhs.forEach(cst => {
        result.push({ name: '.', code: 'Dot' }, ...this.visit(cst))
      })
    }

    return result
  }

  atomicExpression(ctx): result {
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
    }
  }

  parenthesisExpression(ctx): result {
    return [token2fragment(ctx.LParen[0]), ...this.visit(ctx.expression), token2fragment(ctx.RParen[0])]
  }

  constantExpression(ctx): result {
    if (ctx.NumberLiteralExpression) {
      return this.visit(ctx.NumberLiteralExpression)
    } else if (ctx.BooleanLiteralExpression) {
      return this.visit(ctx.BooleanLiteralExpression)
    } else if (ctx.StringLiteral) {
      return [token2fragment(ctx.StringLiteral[0])]
    }
  }

  columnExpression(ctx): result {
    return []
  }

  variableExpression(ctx): result {
    const dollarFragment = token2fragment(ctx.Dollar[0])
    const [namespaceToken, variableToken] = ctx.UUID

    const namespaceId = namespaceToken.image
    const variableId = variableToken.image

    const variableFragment = token2fragment(variableToken)

    const variable = this.formulaContext.findVariable(namespaceId, variableId)

    if (variable) {
      return [{ ...variableFragment, name: `$${variable.t.name}` }]
    } else {
      return [dollarFragment, { ...variableFragment, error: { message: `Variable not found: ${variableId}`, type: 'deps' } }]
    }
  }

  NumberLiteralExpression(ctx): result {
    return [token2fragment(ctx.NumberLiteral[0])]
  }

  BooleanLiteralExpression(ctx): result {
    return [token2fragment(ctx.BooleanLiteral[0])]
  }

  FunctionCall(ctx): result {
    const group = ctx.FunctionGroupName[0].image
    const name = ctx.FunctionName[0].image

    const clause = this.formulaContext.findFunctionClause(group, name)

    const nameFragment = { ...token2fragment(ctx.FunctionName[0]), name: `${group}::${name}` }

    const nameFragmentError: CodeFragmentError = clause ? undefined : { message: `Function ${group}.${name} not found`, type: 'deps' }

    const args = ctx.Arguments ? this.visit(ctx.Arguments) : []

    const result: result = [
      { ...nameFragment, error: nameFragmentError },
      token2fragment(ctx.LParen[0]),
      ...args,
      token2fragment(ctx.RParen[0])
    ]
    return result
  }

  Arguments(ctx): result {
    const result: result = []
    ctx.expression.forEach((arg, idx) => {
      if (idx === 0) {
        result.push(...this.visit(arg))
      } else {
        result.push(token2fragment(ctx.Comma[idx - 1]), ...this.visit(arg))
      }
    })

    return result
  }
}
