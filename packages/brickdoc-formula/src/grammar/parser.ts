import { CstParser, defaultParserErrorProvider, IParserErrorMessageProvider } from 'chevrotain'
import { Argument, ContextInterface } from '..'
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
  FunctionGroupName,
  DoubleColon,
  Dot,
  Ampersand,
  EqualCompareOperator
} from './lexer'
import { FormulaContext } from '../context'

interface ParserConfig {
  readonly formulaContext: ContextInterface
}

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
  formulaContext: ContextInterface

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
    this.performSelfAnalysis()
  }

  public startExpression = this.RULE('startExpression', () => {
    this.CONSUME(Equal)
    this.SUBRULE(this.expression)
  })

  public expression = this.RULE('expression', () => {
    this.SUBRULE(this.combineExpression)
  })

  public combineExpression = this.RULE('combineExpression', () => {
    this.SUBRULE(this.notExpression, { LABEL: 'lhs' })
    this.MANY(() => {
      this.CONSUME(CombineOperator)
      this.SUBRULE2(this.notExpression, { LABEL: 'rhs' })
    })
  })

  public notExpression = this.RULE('notExpression', () => {
    this.MANY(() => {
      this.CONSUME(Not, { LABEL: 'lhs' })
    })

    this.SUBRULE(this.equalCompareExpression, { LABEL: 'rhs' })
  })

  public equalCompareExpression = this.RULE('equalCompareExpression', () => {
    this.SUBRULE(this.compareExpression, { LABEL: 'lhs' })
    this.MANY(() => {
      this.CONSUME(EqualCompareOperator)
      this.SUBRULE2(this.compareExpression, { LABEL: 'rhs' })
    })
  })

  public compareExpression = this.RULE('compareExpression', () => {
    this.SUBRULE(this.concatExpression, { LABEL: 'lhs' })
    this.MANY(() => {
      this.CONSUME(CompareOperator)
      this.SUBRULE2(this.concatExpression, { LABEL: 'rhs' })
    })
  })

  public concatExpression = this.RULE('concatExpression', () => {
    this.SUBRULE(this.additionExpression, { LABEL: 'lhs' })
    this.MANY(() => {
      this.CONSUME(Ampersand)
      this.SUBRULE2(this.additionExpression, { LABEL: 'rhs' })
    })
  })

  public additionExpression = this.RULE('additionExpression', () => {
    this.SUBRULE(this.multiplicationExpression, { LABEL: 'lhs' })
    this.MANY(() => {
      this.CONSUME(AdditionOperator)
      this.SUBRULE2(this.multiplicationExpression, { LABEL: 'rhs' })
    })
  })

  public multiplicationExpression = this.RULE('multiplicationExpression', () => {
    this.SUBRULE(this.chainExpression, { LABEL: 'lhs' })
    this.MANY(() => {
      this.CONSUME(MultiplicationOperator)
      this.SUBRULE2(this.chainExpression, { LABEL: 'rhs' })
    })
  })

  public chainExpression = this.RULE('chainExpression', () => {
    this.SUBRULE(this.atomicExpression, { LABEL: 'lhs' })
    this.MANY(() => {
      this.CONSUME(Dot)
      this.SUBRULE(this.FunctionCall, { LABEL: 'rhs' })
    })
  })

  public atomicExpression = this.RULE('atomicExpression', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.parenthesisExpression) },
      { ALT: () => this.SUBRULE(this.constantExpression) },
      { ALT: () => this.SUBRULE(this.variableExpression) },
      { ALT: () => this.SUBRULE(this.columnExpression) },
      { ALT: () => this.SUBRULE(this.blockExpression) },
      { ALT: () => this.SUBRULE(this.FunctionCall) }
    ])
  })

  public columnExpression = this.RULE('columnExpression', () => {
    this.CONSUME(Dollar)
    this.CONSUME(UUID)
    this.CONSUME(Sharp)
    this.CONSUME2(UUID)
  })

  public variableExpression = this.RULE('variableExpression', () => {
    this.CONSUME(Dollar)
    this.CONSUME(UUID)
    this.CONSUME(At)
    this.CONSUME2(UUID)
  })

  public blockExpression = this.RULE('blockExpression', () => {
    this.CONSUME(Dollar)
    this.CONSUME(UUID)
  })

  public constantExpression = this.RULE('constantExpression', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.NumberLiteralExpression) },
      { ALT: () => this.SUBRULE(this.BooleanLiteralExpression) },
      { ALT: () => this.CONSUME(StringLiteral) }
    ])
  })

  public parenthesisExpression = this.RULE('parenthesisExpression', () => {
    this.CONSUME(LParen)
    this.SUBRULE(this.expression)
    this.CONSUME(RParen)
  })

  public NumberLiteralExpression = this.RULE('NumberLiteralExpression', () => {
    this.OPTION(() => {
      this.CONSUME(Minus)
    })
    this.CONSUME(NumberLiteral)
    this.OPTION2(() => {
      this.CONSUME(Sign)
    })
  })

  public BooleanLiteralExpression = this.RULE('BooleanLiteralExpression', () => {
    this.CONSUME(BooleanLiteral)
  })

  public FunctionCall = this.RULE('FunctionCall', () => {
    this.OPTION(() => {
      this.CONSUME(FunctionGroupName)
      this.CONSUME(DoubleColon)
    })
    this.CONSUME(FunctionName)

    this.CONSUME2(LParen)
    this.OPTION2(() => {
      this.SUBRULE2(this.Arguments)
    })
    this.CONSUME2(RParen)
  })

  public Arguments = this.RULE('Arguments', (args: undefined | Argument[]) => {
    this.SUBRULE(this.expression)
    this.MANY(() => {
      this.CONSUME(Comma)
      this.SUBRULE2(this.expression)
    })
  })
}

export const ParserInstance = new FormulaParser()

export const BaseCstVisitor = ParserInstance.getBaseCstVisitorConstructor()
