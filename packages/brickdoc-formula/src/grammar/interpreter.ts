import { CstElement, CstNode, IToken, tokenMatcher } from 'chevrotain'
import {
  buildFunctionKey,
  AnyTypeResult,
  ColumnResult,
  NullResult,
  SpreadsheetResult,
  NumberResult,
  BooleanResult,
  PredicateResult,
  ReferenceResult,
  PredicateOperator,
  Row,
  ErrorResult,
  Argument,
  extractSubType,
  FunctionContext
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
  ctx: FunctionContext
}

interface ExpressionArgument {
  lazy?: boolean
  chainArgs?: any
}

export class FormulaInterpreter extends BaseCstVisitor {
  ctx: FunctionContext
  lazy: boolean = false

  constructor({ ctx }: InterpreterConfig) {
    super()
    this.ctx = ctx
    // This helper will detect any missing or redundant methods on this visitor
    this.validateVisitor()
  }

  startExpression(ctx: { expression: CstNode | CstNode[] }, args: ExpressionArgument): AnyTypeResult {
    return this.visit(ctx.expression, args)
  }

  expression(ctx: { lhs: CstNode | CstNode[]; rhs: any }, args: ExpressionArgument): AnyTypeResult {
    let result = this.visit(ctx.lhs, args)

    if (!ctx.rhs) {
      return result
    }

    ctx.rhs.forEach((rhs: CstNode | CstNode[]) => {
      const newResult = this.visit(rhs, args)

      if (newResult.type === 'Function' && result.type === 'Function') {
        result = { type: 'Function', result: [...result.result, ...newResult.result] }
      } else {
        result = newResult
      }
    })

    return result
  }

  combineExpression(
    ctx: {
      lhs: CstNode | CstNode[]
      rhs: any[]
      CombineOperator: { [x: string]: any }
    },
    args: ExpressionArgument
  ): AnyTypeResult {
    let result = this.visit(ctx.lhs, args)

    if (!ctx.rhs || result.type === 'Error') {
      return result
    }

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      if (result.type === 'Error') {
        return
      }

      const rhsValue = this.visit(rhsOperand, args)
      const operator = ctx.CombineOperator[idx]

      if (rhsValue.type === 'Error') {
        result = rhsValue
        return
      }

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

  notExpression(ctx: { rhs: CstNode | CstNode[]; lhs: any[] }, args: ExpressionArgument): AnyTypeResult {
    let result = this.visit(ctx.rhs, args)

    if (!ctx.lhs || result.type === 'Error') {
      return result
    }

    ctx.lhs.forEach(() => {
      result = { result: !result.result, type: 'boolean' }
    })

    return result
  }

  equalCompareExpression(
    ctx: {
      lhs: CstNode | CstNode[]
      rhs: any[]
      EqualCompareOperator: { [x: string]: any }
    },
    args: ExpressionArgument
  ): AnyTypeResult {
    let result = this.visit(ctx.lhs, args)

    if (!ctx.rhs || result.type === 'Error') {
      return result
    }

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      if (result.type === 'Error') {
        return
      }
      const rhsValue = this.visit(rhsOperand, args)
      const operator = ctx.EqualCompareOperator[idx]

      if (rhsValue.type === 'Error') {
        result = rhsValue
        return
      }

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

  compareExpression(
    ctx: {
      lhs: CstNode | CstNode[]
      rhs: any[]
      CompareOperator: { [x: string]: any }
    },
    args: ExpressionArgument
  ): AnyTypeResult {
    let result = this.visit(ctx.lhs, args)

    if (!ctx.rhs || result.type === 'Error') {
      return result
    }

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      if (result.type === 'Error') {
        return
      }
      // there will be one operator for each rhs operand
      const rhsValue = this.visit(rhsOperand, args)

      if (rhsValue.type === 'Error') {
        result = rhsValue
        return
      }

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

  inExpression(
    ctx: {
      lhs: CstNode | CstNode[]
      rhs: CstNode | CstNode[]
      InOperator: Array<{ tokenType: { name: any } }>
    },
    args: ExpressionArgument
  ): AnyTypeResult {
    const result = this.visit(ctx.lhs, args)

    if (!ctx.rhs || result.type === 'Error') {
      return result
    }

    const operator = ctx.InOperator[0].tokenType.name

    const result2 = this.visit(ctx.rhs, args)

    if (result2.type === 'Error') {
      return result2
    }

    if (result2.type === 'Spreadsheet') {
      const match = String(result.result)
      const database = result2.result

      const columns = database.listColumns()

      const firstColumn = columns[0]
      if (!firstColumn) {
        return { type: 'Error', result: 'Database is empty', errorKind: 'runtime' }
      }

      const row = database.listRows().find((row: Row) => {
        if (operator === 'ExactIn') {
          return row[firstColumn.columnId] === match
        } else {
          return row[firstColumn.columnId].toUpperCase() === match.toUpperCase()
        }
      })

      return { type: 'boolean', result: !!row }
    }

    if (result2.type === 'Column') {
      const match = String(result.result)
      const column = result2.result
      const database = this.ctx.formulaContext.findDatabase(column.namespaceId)
      if (!database) {
        return { type: 'Error', result: 'Database not found', errorKind: 'runtime' }
      }

      const row = database.listRows().find((row: Row) => {
        if (operator === 'ExactIn') {
          return row[column.columnId] === match
        } else {
          return row[column.columnId].toUpperCase() === match.toUpperCase()
        }
      })

      return { type: 'boolean', result: !!row }
    }

    if (operator === 'ExactIn' || result.type !== 'string') {
      const checkResult = result2.type === 'Array' ? result2.result.map((e: AnyTypeResult) => e.result) : result2.result
      return { result: checkResult.includes(result.result), type: 'boolean' }
    }

    if (result2.type === 'string') {
      const finalResult = result2.result.toUpperCase().includes(result.result.toUpperCase())
      return { result: finalResult, type: 'boolean' }
    } else {
      const match = result.result.toUpperCase()
      const finalresult = result2.result
        .filter((e: AnyTypeResult) => e.type === 'string')
        .map((e: AnyTypeResult) => e.result.toUpperCase())

      return { result: finalresult.includes(match), type: 'boolean' }
    }
  }

  concatExpression(ctx: { lhs: CstNode | CstNode[]; rhs: any[] }, args: ExpressionArgument): AnyTypeResult {
    let result = this.visit(ctx.lhs, args)

    if (!ctx.rhs || result.type === 'Error') {
      return result
    }

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[]) => {
      if (result.type === 'Error') {
        return
      }

      const rhsValue = this.visit(rhsOperand, args)

      if (rhsValue.type === 'Error') {
        result = rhsValue
        return
      }

      result = { result: result.result.concat(rhsValue.result), type: 'string' }
    })

    return result
  }

  additionExpression(
    ctx: {
      lhs: CstNode | CstNode[]
      rhs: any[]
      AdditionOperator: { [x: string]: any }
    },
    args: ExpressionArgument
  ): AnyTypeResult {
    let result = this.visit(ctx.lhs, args)

    if (!ctx.rhs || result.type === 'Error') {
      return result
    }

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      if (result.type === 'Error') {
        return
      }
      const rhsValue = this.visit(rhsOperand, args)

      if (rhsValue.type === 'Error') {
        result = rhsValue
        return
      }

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

  multiplicationExpression(
    ctx: {
      lhs: CstNode | CstNode[]
      rhs: any[]
      MultiplicationOperator: { [x: string]: any }
    },
    args: ExpressionArgument
  ): AnyTypeResult {
    let result = this.visit(ctx.lhs, args)

    if (!ctx.rhs || result.type === 'Error') {
      return result
    }

    ctx.rhs.forEach((rhsOperand: CstNode | CstNode[], idx: string | number) => {
      if (result.type === 'Error') {
        return
      }
      const rhsValue = this.visit(rhsOperand, args)

      if (rhsValue.type === 'Error') {
        result = rhsValue
        return
      }
      const operator = ctx.MultiplicationOperator[idx]

      if (tokenMatcher(operator, Multi)) {
        result = { result: result.result * rhsValue.result, type: 'number' }
      } else if (tokenMatcher(operator, Div)) {
        if (rhsValue.result === 0) {
          result = { type: 'Error', result: 'Division by zero', errorKind: 'runtime' }
        } else {
          result = { result: result.result / rhsValue.result, type: 'number' }
        }
      } else if (tokenMatcher(operator, Caret)) {
        result = { result: result.result ** rhsValue.result, type: 'number' }
      } else {
        throw new Error(`Unexpected operator ${operator.image}`)
      }
    })

    return result
  }

  chainExpression(ctx: { lhs: CstNode | CstNode[]; rhs: any[] }, args: ExpressionArgument): AnyTypeResult {
    let result = this.visit(ctx.lhs, args)

    if (!ctx.rhs) {
      return result
    }

    ctx.rhs.forEach(cst => {
      if (cst.name === 'FunctionCall') {
        if (result.type === 'Error') {
          return
        }
        result = this.visit(cst, { ...args, chainArgs: result })
      } else {
        const { result: key } = this.visit(cst, args)

        if (result.type === 'Error' && ['errorKind', 'result'].includes(key)) {
          result = { type: 'string', result: result[key] }
        } else if (result.type === 'Record') {
          const value = result.result[key]
          if (value) {
            result = value
          } else {
            result = { type: 'Error', result: `Key ${key} not found`, errorKind: 'runtime' }
          }
        } else if (result.type === 'Reference') {
          result = { type: 'Reference', result: { ...result.result, attribute: key } }
        } else {
          result = { type: 'Error', result: `Access not supported for ${result.type}`, errorKind: 'runtime' }
        }
      }
    })

    return result
  }

  keyExpression(ctx: any, args: ExpressionArgument): AnyTypeResult {
    if (ctx.FunctionName) {
      return this.FunctionNameExpression(ctx)
    } else if (ctx.StringLiteral) {
      return this.StringLiteralExpression(ctx)
    } else {
      throw new Error('Unexpected key expression')
    }
  }

  simpleAtomicExpression(
    ctx: {
      parenthesisExpression: CstNode | CstNode[]
      arrayExpression: CstNode | CstNode[]
      recordExpression: CstNode | CstNode[]
      constantExpression: CstNode | CstNode[]
      FunctionCall: CstNode | CstNode[]
      lazyVariableExpression: CstNode | CstNode[]
    },
    args: ExpressionArgument
  ): AnyTypeResult {
    if (ctx.parenthesisExpression) {
      return this.visit(ctx.parenthesisExpression, args)
    } else if (ctx.arrayExpression) {
      return this.visit(ctx.arrayExpression, args)
    } else if (ctx.recordExpression) {
      return this.visit(ctx.recordExpression, args)
    } else if (ctx.constantExpression) {
      return this.visit(ctx.constantExpression, args)
    } else if (ctx.FunctionCall) {
      return this.visit(ctx.FunctionCall, args)
    } else if (ctx.lazyVariableExpression) {
      return this.visit(ctx.lazyVariableExpression, args)
    } else {
      // console.log({ ctx })
      throw new Error('unsupported expression')
    }
  }

  atomicExpression(
    ctx: {
      simpleAtomicExpression: CstNode | CstNode[]
      columnExpression: CstNode | CstNode[]
      spreadsheetExpression: CstNode | CstNode[]
      referenceExpression: CstNode | CstNode[]
      predicateExpression: CstNode | CstNode[]
    },
    args: ExpressionArgument
  ): AnyTypeResult {
    if (ctx.simpleAtomicExpression) {
      return this.visit(ctx.simpleAtomicExpression, args)
    } else if (ctx.columnExpression) {
      return this.visit(ctx.columnExpression, args)
    } else if (ctx.referenceExpression) {
      return this.visit(ctx.referenceExpression, args)
    } else if (ctx.spreadsheetExpression) {
      return this.visit(ctx.spreadsheetExpression, args)
    } else if (ctx.predicateExpression) {
      return this.visit(ctx.predicateExpression, args)
    } else {
      // console.log({ ctx })
      throw new Error('unsupported expression')
    }
  }

  predicateExpression(
    ctx: {
      EqualCompareOperator: IToken[]
      CompareOperator: IToken[]
      columnExpression: CstNode | CstNode[]
      simpleAtomicExpression: CstNode | CstNode[]
    },
    args: ExpressionArgument
  ): PredicateResult | ErrorResult {
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

    const result = this.visit(ctx.simpleAtomicExpression, args)
    if (result.type === 'Error') {
      return result
    }

    if (!ctx.columnExpression) {
      return { type: 'Predicate', result, operator }
    }

    const { type, result: column } = this.visit(ctx.columnExpression, args)
    if (type === 'null') {
      return { type: 'Error', result: 'Column not found', errorKind: 'runtime' }
    }

    return { type: 'Predicate', result, operator, column }
  }

  arrayExpression(ctx: { Arguments: CstNode | CstNode[] }, a: ExpressionArgument): AnyTypeResult {
    const args: AnyTypeResult[] = []

    if (ctx.Arguments) {
      args.push(...this.visit(ctx.Arguments, a))
    }

    return { type: 'Array', subType: extractSubType(args), result: args }
  }

  recordExpression(ctx: any, type: ExpressionArgument): AnyTypeResult {
    if (!ctx.recordField) {
      return { type: 'Record', subType: 'void', result: {} }
    }

    const result: Record<string, AnyTypeResult> = {}
    ctx.recordField.forEach((c: CstNode | CstNode[]) => {
      const { key, value } = this.visit(c, type)
      result[key] = value
    })

    return { type: 'Record', subType: extractSubType(Object.values(result)), result }
  }

  recordField(ctx: any, args: ExpressionArgument): { key: string; value: AnyTypeResult } {
    const { result: key } = this.visit(ctx.keyExpression, args)
    const value = this.visit(ctx.expression, args)

    return { key, value }
  }

  parenthesisExpression(ctx: { expression: CstNode | CstNode[] }, args: ExpressionArgument): AnyTypeResult {
    return this.visit(ctx.expression, args)
  }

  StringLiteralExpression(ctx: {
    NumberLiteralExpression?: CstNode | CstNode[]
    BooleanLiteralExpression?: CstNode | CstNode[]
    NullLiteral?: CstNode | CstNode[]
    StringLiteral: any
  }): AnyTypeResult {
    // TODO: dirty hack to get the string literal value
    const str = ctx.StringLiteral[0].image
    return { result: str.substring(1, str.length - 1).replace(/""/g, '"'), type: 'string' }
  }

  FunctionNameExpression(ctx: { FunctionName: Array<{ image: any }> }): AnyTypeResult {
    return { result: ctx.FunctionName[0].image, type: 'string' }
  }

  constantExpression(ctx: {
    NumberLiteralExpression: CstNode | CstNode[]
    BooleanLiteralExpression: CstNode | CstNode[]
    NullLiteral: CstNode | CstNode[]
    StringLiteral: Array<{ image: any }>
  }): AnyTypeResult {
    if (ctx.NumberLiteralExpression) {
      return this.visit(ctx.NumberLiteralExpression)
    } else if (ctx.BooleanLiteralExpression) {
      return this.visit(ctx.BooleanLiteralExpression)
    } else if (ctx.NullLiteral) {
      return { type: 'null', result: null }
    } else if (ctx.StringLiteral) {
      return this.StringLiteralExpression(ctx)
    } else {
      throw new Error('unsupported expression')
    }
  }

  columnExpression(
    ctx: { UUID: { map: (arg0: (uuid: any) => any) => [any, any] } },
    args: ExpressionArgument
  ): ColumnResult | NullResult {
    const [namespaceId, columnId] = ctx.UUID.map((uuid: { image: any }) => uuid.image)
    const column = this.ctx.formulaContext.findColumn(namespaceId, columnId)

    if (column) {
      return { type: 'Column', result: column }
    } else {
      return { type: 'null', result: null }
    }
  }

  spreadsheetExpression(
    ctx: { UUID: Array<{ image: any }> },
    args: ExpressionArgument
  ): SpreadsheetResult | NullResult {
    const namespaceId = ctx.UUID[0].image
    const database = this.ctx.formulaContext.findDatabase(namespaceId)

    if (database) {
      return { type: 'Spreadsheet', result: database }
    } else {
      return { type: 'null', result: null }
    }
  }

  referenceExpression(ctx: { lazyVariableExpression: CstNode | CstNode[] }, args: ExpressionArgument): ReferenceResult {
    return this.visit(ctx.lazyVariableExpression, { lazy: true })
  }

  lazyVariableExpression(ctx: any, args: ExpressionArgument): AnyTypeResult {
    if (ctx.variableExpression) {
      return this.visit(ctx.variableExpression, args)
    } else if (ctx.Self) {
      return { type: 'Reference', result: { kind: 'self' } }
    } else if (ctx.LambdaArgumentNumber) {
      const number = Number(ctx.LambdaArgumentNumber[0].image.substring(1))
      const result = this.ctx.interpretContext.arguments[number - 1]

      if (result) {
        return result
      }
      return { type: 'Error', result: `Argument ${number} not found`, errorKind: 'runtime' }
    } else if (ctx.Input) {
      return {
        type: 'Record',
        subType: extractSubType(Object.values(this.ctx.interpretContext.ctx)),
        result: this.ctx.interpretContext.ctx
      }
    } else {
      // console.log({ ctx })
      throw new Error('unsupported expression')
    }
  }

  variableExpression(
    ctx: { UUID: { map: (arg0: (uuid: any) => any) => [any, any] } },
    a: ExpressionArgument
  ): AnyTypeResult {
    const [namespaceId, variableId] = ctx.UUID.map((uuid: { image: any }) => uuid.image)

    if (a?.lazy) {
      return { type: 'Reference', result: { kind: 'variable', namespaceId, variableId } }
    }

    const variable = this.ctx.formulaContext.findVariable(namespaceId, variableId)
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
      Arguments: CstNode[]
    },
    a: ExpressionArgument
  ): AnyTypeResult | Promise<AnyTypeResult> {
    const chainArgs = a?.chainArgs
    const names = ctx.FunctionName.map(group => group.image)
    const [group, name] = names.length === 1 ? ['core', ...names] : names

    const clause = this.ctx.formulaContext.findFunctionClause(group, name)

    const functionKey = buildFunctionKey(group, name)

    if (!clause) {
      throw new Error(`Function ${functionKey} not found`)
    }

    if (clause.feature && !this.ctx.formulaContext.features.includes(clause.feature)) {
      throw new Error(`Feature ${clause.feature} not enabled`)
    }

    let args: AnyTypeResult[] = []

    if (clause.chain && chainArgs) {
      args.push(chainArgs)
    }

    if (clause.lazy) {
      const argsTypes = clause.args.map(arg => arg.type)

      if (!ctx.Arguments || !ctx.Arguments[0].children?.expression) {
        return { type: 'Error', result: 'Function is empty', errorKind: 'runtime' }
      }

      ctx.Arguments[0].children?.expression.forEach((e: CstElement, index: number) => {
        const argType = argsTypes[clause.chain && chainArgs ? index + 1 : index]

        const element = e as CstNode

        if (argType === 'Cst') {
          this.lazy = true
          args.push({ type: 'Cst', result: element })
        } else {
          args.push(this.visit(element, { lazy: argType === 'Reference' }))
        }
      })
    } else {
      if (ctx.Arguments) {
        const argResult = this.visit(ctx.Arguments, a)
        args.push(...argResult)
      }

      const argsTypes: Argument[] = clause.args[0]?.spread ? Array(args.length).fill(clause.args[0]) : clause.args

      if (!clause.acceptError) {
        const errorArgs = args.find(a => a.type === 'Error')
        if (errorArgs) {
          return errorArgs as AnyTypeResult
        }
      }

      args = argsTypes.map((argType, index) => {
        const v = args[index] || argType.default
        if (!v) {
          throw new Error(`Argument ${index} is not defined`)
        }

        if (argType.type === 'Predicate' && v.type !== 'Predicate') {
          return { type: 'Predicate', result: v, operator: 'equal' }
        } else {
          return v
        }
      })
    }

    // console.log({ args })

    return clause.reference(this.ctx, ...args)
  }

  Arguments(ctx: { expression: any[] }, a: ExpressionArgument): AnyTypeResult[] {
    return ctx.expression.map((arg: CstNode | CstNode[]) => this.visit(arg, a))
  }
}
