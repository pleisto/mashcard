import { CstParser, defaultParserErrorProvider, IParserErrorMessageProvider } from 'chevrotain'
import { Argument, ArgumentType, ContextInterface, FunctionClause, VariableDependency, VariableKind } from '..'
import {
  allTokens,
  AdditionOperator,
  MultiplicationOperator,
  NumberLiteral,
  LParen,
  RParen,
  Comma,
  At,
  CompareOperator,
  Equal,
  BooleanLiteral,
  Minus,
  CombineOperator,
  Not,
  StringLiteral,
  Sign,
  FunctionName,
  Dollar,
  UUID,
  Sharp,
  AllowTypes,
  FunctionGroupName,
  DoubleColon,
  Dot
} from './lexer'
import { FormulaContext } from '../context'

interface ParserConfig {
  readonly formulaContext: ContextInterface
}

interface parseTokenType {
  readonly name: string
}
interface ParseToken {
  readonly tokenType: parseTokenType
  readonly image: string
  readonly type?: ArgumentType
}

type ParseType = undefined | Argument

const errorProvider: IParserErrorMessageProvider = {
  buildMismatchTokenMessage(options) {
    return `TODO mismatch token ${options.ruleName}`
  },
  buildNotAllInputParsedMessage(options) {
    // changing the template of the error message #1
    return `TODO build not all input parsed :${options.firstRedundant.startOffset}`
  },

  buildNoViableAltMessage(options) {
    // defer to the default implementation for `buildNoViableAltMessage`
    return defaultParserErrorProvider.buildNoViableAltMessage(options)
  },

  buildEarlyExitMessage(options) {
    // translating the error message to Spanish
    return `TODO early exit: ${options.expectedIterationPaths[0][0].name}`
  }
}

export class FormulaParser extends CstParser {
  variableDependencies: VariableDependency[]
  functionDependencies: FunctionClause[]
  formulaContext: ContextInterface
  kind: VariableKind

  // Unfortunately no support for class fields with initializer in ES2015, only in esNext...
  // so the parsing rules are defined inside the constructor, as each parsing rule must be initialized by
  // invoking RULE(...)
  // see: https://github.com/jeffmo/es-class-fields-and-static-properties
  constructor(config: ParserConfig = { formulaContext: new FormulaContext() }) {
    super(allTokens, {
      maxLookahead: 3,
      errorMessageProvider: errorProvider,
      ...config
    })

    this.formulaContext = config.formulaContext
    this.variableDependencies = []
    this.functionDependencies = []
    this.kind = 'constant'
    this.performSelfAnalysis()
  }

  public startExpression = this.RULE('startExpression', () => {
    this.CONSUME(Equal)
    this.SUBRULE(this.expression)
  })

  public expression = this.RULE('expression', (type: ParseType) => {
    this.SUBRULE(this.combineExpression, { ARGS: [type] })
  })

  public combineExpression = this.RULE('combineExpression', (type: ParseType) => {
    this.SUBRULE(this.notExpression, { LABEL: 'lhs', ARGS: [type] })
    this.MANY(() => {
      const token = this.CONSUME(CombineOperator)
      const newType = this.intersectType(type, token)
      this.SUBRULE2(this.notExpression, { LABEL: 'rhs', ARGS: [newType] })
    })
  })

  public notExpression = this.RULE('notExpression', (type: ParseType) => {
    this.OR([
      { ALT: () => this.SUBRULE(this.compareExpression, { LABEL: 'rhs', ARGS: [type] }) },
      {
        ALT: () => {
          this.AT_LEAST_ONE(() => {
            this.CONSUME(Not, { LABEL: 'lhs' })
          })
          this.SUBRULE2(this.compareExpression, { LABEL: 'rhs', ARGS: type ? [{ ...type, type: 'any' }] : [undefined] })
        }
      }
    ])
  })

  public compareExpression = this.RULE('compareExpression', (type: ParseType) => {
    this.SUBRULE(this.additionExpression, { LABEL: 'lhs', ARGS: [type] })
    this.MANY(() => {
      const token = this.CONSUME(CompareOperator)
      const newType = this.intersectType(type, token)
      this.SUBRULE2(this.additionExpression, { LABEL: 'rhs', ARGS: [newType] })
    })
  })

  public additionExpression = this.RULE('additionExpression', (type: ParseType) => {
    this.SUBRULE(this.multiplicationExpression, { LABEL: 'lhs', ARGS: [type] })
    this.MANY(() => {
      const token = this.CONSUME(AdditionOperator)
      const newType = this.intersectType(type, token)
      this.SUBRULE2(this.multiplicationExpression, { LABEL: 'rhs', ARGS: [newType] })
    })
  })

  public multiplicationExpression = this.RULE('multiplicationExpression', (type: ParseType) => {
    this.SUBRULE(this.chainExpression, { LABEL: 'lhs', ARGS: [type] })
    this.MANY(() => {
      const token = this.CONSUME(MultiplicationOperator)
      const newType = this.intersectType(type, token)
      this.SUBRULE2(this.chainExpression, { LABEL: 'rhs', ARGS: [newType] })
    })
  })

  public chainExpression = this.RULE('chainExpression', (type: ParseType) => {
    this.SUBRULE(this.atomicExpression, { LABEL: 'lhs', ARGS: [type] })
    this.MANY(() => {
      this.CONSUME(Dot)
      this.SUBRULE(this.FunctionCall, { LABEL: 'rhs', ARGS: [type] })
    })
  })

  public atomicExpression = this.RULE('atomicExpression', (type: ParseType) => {
    this.OR([
      { ALT: () => this.SUBRULE(this.parenthesisExpression, { ARGS: [type] }) },
      { ALT: () => this.SUBRULE(this.constantExpression, { ARGS: [type] }) },
      { ALT: () => this.SUBRULE(this.variableExpression, { ARGS: [type] }) },
      { ALT: () => this.SUBRULE(this.columnExpression, { ARGS: [type] }) },
      { ALT: () => this.SUBRULE(this.blockExpression, { ARGS: [type] }) },
      { ALT: () => this.SUBRULE(this.FunctionCall, { ARGS: [type] }) }
    ])
  })

  public columnExpression = this.RULE('columnExpression', (type: ParseType) => {
    this.CONSUME(Dollar)
    const namespaceToken = this.CONSUME(UUID)
    this.CONSUME(Sharp)
    const columnToken = this.CONSUME2(UUID)

    const namespaceId = namespaceToken.image
    const columnId = columnToken.image

    if (!this.RECORDING_PHASE) {
      this.kind = 'expression'
      const database = this.formulaContext.findDatabase(namespaceId)

      if (database) {
        const column = database.getColumn(columnId)
        if (column) {
          const columnType: ArgumentType = 'Column'
          const parseToken = { image: column.name, tokenType: { name: 'Column' }, type: columnType }
          this.intersectType(type, parseToken)
        }
      }
    }
  })

  public variableExpression = this.RULE('variableExpression', (type: ParseType) => {
    this.CONSUME(Dollar)
    const namespaceToken = this.CONSUME(UUID)
    this.CONSUME(At)
    const variableToken = this.CONSUME2(UUID)

    const namespaceId = namespaceToken.image
    const variableId = variableToken.image

    if (!this.RECORDING_PHASE) {
      this.kind = 'expression'
      const variable = this.formulaContext.findVariable(namespaceId, variableId)
      if (variable) {
        const parseToken = { image: variable.t.name, tokenType: { name: 'Variable' }, type: variable.t.variableValue.type }
        this.intersectType(type, parseToken)

        this.variableDependencies.push({ namespaceId, variableId })
      }
    }
  })

  public blockExpression = this.RULE('blockExpression', (type: ParseType) => {
    this.CONSUME(Dollar)
    const namespaceToken = this.CONSUME(UUID)

    const namespaceId = namespaceToken.image

    if (!this.RECORDING_PHASE) {
      this.kind = 'expression'
      const database = this.formulaContext.findDatabase(namespaceId)
      if (database) {
        const tableType: ArgumentType = 'Table'
        const parseToken = { image: database.name(), tokenType: { name: 'Table' }, type: tableType }
        this.intersectType(type, parseToken)
      }
    }
  })

  public constantExpression = this.RULE('constantExpression', (type: ParseType) => {
    this.OR([
      {
        ALT: () => this.SUBRULE(this.NumberLiteralExpression, { ARGS: [type] })
      },
      {
        ALT: () => this.SUBRULE(this.BooleanLiteralExpression, { ARGS: [type] })
      },
      {
        ALT: () => {
          const token = this.CONSUME(StringLiteral)
          this.intersectType(type, token)
        }
      }
    ])
  })

  public parenthesisExpression = this.RULE('parenthesisExpression', (type: ParseType) => {
    this.CONSUME(LParen)
    this.SUBRULE(this.expression, { ARGS: [type] })
    this.CONSUME(RParen)
  })

  public NumberLiteralExpression = this.RULE('NumberLiteralExpression', (type: ParseType) => {
    this.OPTION(() => {
      this.CONSUME(Minus)
    })
    const token = this.CONSUME(NumberLiteral)
    this.intersectType(type, token)
    this.OPTION2(() => {
      this.CONSUME(Sign)
    })
  })

  public BooleanLiteralExpression = this.RULE('BooleanLiteralExpression', (type: ParseType) => {
    const token = this.CONSUME(BooleanLiteral)
    this.intersectType(type, token)
  })

  public FunctionCall = this.RULE('FunctionCall', (type: ParseType) => {
    const functionGroupName = this.CONSUME(FunctionGroupName)
    this.CONSUME(DoubleColon)
    const functionName = this.CONSUME(FunctionName)
    const functionClause = this.formulaContext.findFunctionClause(functionGroupName.image, functionName.image)

    if (functionClause) {
      // TODO Check effect
      this.kind = 'expression'

      this.intersectType(type, { image: functionName.image, tokenType: { name: 'Function' }, type: functionClause.returns })
      this.functionDependencies.push(functionClause)
    }

    // TODO chain type check

    this.OR([
      {
        // Not found or chain
        GATE: () => functionClause === undefined || functionClause.chain,
        ALT: () => {
          this.CONSUME(LParen)
          this.OPTION(() => {
            this.SUBRULE(this.Arguments, { ARGS: [] })
          })
          this.CONSUME(RParen)
        }
      },
      {
        // No params
        GATE: () => functionClause.args.length === 0,
        ALT: () => {
          this.CONSUME2(LParen)
          this.CONSUME2(RParen)
        }
      },
      {
        GATE: () => functionClause.args.length > 0,
        ALT: () => {
          this.CONSUME3(LParen)
          this.SUBRULE2(this.Arguments, { ARGS: functionClause ? [functionClause.args] : [] })
          this.CONSUME3(RParen)
        }
      }
    ])
  })

  public Arguments = this.RULE('Arguments', (args: undefined | Argument[]) => {
    if (args) {
      const [first, ...rest] = args
      this.SUBRULE(this.expression, { ARGS: [first] })
      // First argument is spread type
      if (first.spread) {
        this.MANY(() => {
          this.CONSUME(Comma)
          this.SUBRULE2(this.expression, { ARGS: [first] })
        })
      } else {
        rest.forEach(arg => {
          if (arg.spread) {
            throw new Error('Spread argument must be the first argument')
          }
          this.CONSUME(Comma)
          this.SUBRULE(this.expression, { ARGS: [arg] })
        })
      }
    } else {
      this.SUBRULE(this.expression)
      this.MANY(() => {
        this.CONSUME(Comma)
        this.SUBRULE2(this.expression)
      })
    }
  })

  private readonly intersectType = (arg: ParseType, token: ParseToken): ParseType => {
    if (this.RECORDING_PHASE) {
      return arg
    }
    const targetType: ArgumentType = token.type || AllowTypes[token.tokenType.name]
    if (targetType === undefined) {
      throw new Error(`Unexpected token type: ${token.tokenType.name}`)
    }

    if (arg === undefined) {
      return { name: 'context', type: targetType }
    }

    if (targetType === 'any') {
      return arg
    }

    if (arg.type === 'any') {
      return { ...arg, type: targetType }
    }

    if (targetType === arg.type) {
      return arg
    }

    throw new TypeError(`[${token.tokenType.name}, ${token.image}] Expected ${arg.type} but got ${targetType}`)
  }
}

export const ParserInstance = new FormulaParser()

export const BaseCstVisitor = ParserInstance.getBaseCstVisitorConstructor()
