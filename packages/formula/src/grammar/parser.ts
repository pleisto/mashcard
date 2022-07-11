import { CstParser, IParserErrorMessageProvider } from 'chevrotain'
import {
  allTokens,
  AdditionOperator,
  MultiplicationOperator,
  NumberLiteral,
  LParen,
  RParen,
  Comma,
  CompareOperator,
  BooleanLiteral,
  Minus,
  CombineOperator,
  Not,
  StringLiteral,
  Sign,
  UUID,
  Sharp,
  FunctionName,
  DoubleColon,
  Dot,
  Ampersand,
  EqualCompareOperator,
  Semicolon,
  InOperator,
  LBracket,
  RBracket,
  NullLiteral,
  LBrace,
  RBrace,
  Colon,
  Self,
  Input,
  LambdaArgumentNumber,
  CurrentBlock,
  DecimalLiteral,
  ThisRow,
  ThisRecord
} from './lexer'

const errorProvider: IParserErrorMessageProvider = {
  buildMismatchTokenMessage(options) {
    return `TODO mismatch token ${options.ruleName}`
  },
  buildNotAllInputParsedMessage(options) {
    // changing the template of the error message #1
    return `Not all input parsed: ${options.firstRedundant.image}`
  },

  buildNoViableAltMessage(options) {
    return `Parse error: ${JSON.stringify(options.actual[0].image)}`
    // devLog(options)
    // defer to the default implementation for `buildNoViableAltMessage`
    // return defaultParserErrorProvider.buildNoViableAltMessage(options)
  },

  buildEarlyExitMessage(options) {
    // translating the error message to Spanish
    return `TODO early exit: ${options.expectedIterationPaths[0][0].name}`
  }
}

export class FormulaParser extends CstParser {
  // Unfortunately no support for class fields with initializer in ES2015, only in esNext...
  // so the parsing rules are defined inside the constructor, as each parsing rule must be initialized by
  // invoking RULE(...)
  // see: https://github.com/jeffmo/es-class-fields-and-static-properties
  constructor() {
    const tokens = allTokens
    super(tokens, {
      maxLookahead: 5,
      recoveryEnabled: true,
      errorMessageProvider: errorProvider
    })

    this.performSelfAnalysis()
  }

  public startExpression = this.RULE('startExpression', () => {
    // this.CONSUME(Equal)
    this.SUBRULE(this.expression)
  })

  public expression = this.RULE('expression', () => {
    this.SUBRULE(this.combineExpression, { LABEL: 'lhs' })
    this.MANY(() => {
      this.CONSUME(Semicolon)
      this.SUBRULE2(this.combineExpression, { LABEL: 'rhs' })
    })
  })

  public combineExpression = this.RULE('combineExpression', () => {
    this.SUBRULE(this.equalCompareExpression, { LABEL: 'lhs' })
    this.MANY(() => {
      this.CONSUME(CombineOperator)
      this.SUBRULE2(this.equalCompareExpression, { LABEL: 'rhs' })
    })
  })

  public equalCompareExpression = this.RULE('equalCompareExpression', () => {
    this.SUBRULE(this.compareExpression, { LABEL: 'lhs' })
    this.MANY(() => {
      this.CONSUME(EqualCompareOperator)
      this.SUBRULE2(this.compareExpression, { LABEL: 'rhs' })
    })
  })

  public compareExpression = this.RULE('compareExpression', () => {
    this.SUBRULE(this.inExpression, { LABEL: 'lhs' })
    this.MANY(() => {
      this.CONSUME(CompareOperator)
      this.SUBRULE2(this.inExpression, { LABEL: 'rhs' })
    })
  })

  public inExpression = this.RULE('inExpression', () => {
    this.SUBRULE(this.concatExpression, { LABEL: 'lhs' })
    this.OPTION(() => {
      this.CONSUME(InOperator)
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
    this.SUBRULE(this.accessExpression, { LABEL: 'lhs' })
    this.MANY(() => {
      this.CONSUME(MultiplicationOperator)
      this.SUBRULE2(this.accessExpression, { LABEL: 'rhs' })
    })
  })

  public accessExpression = this.RULE('accessExpression', () => {
    this.SUBRULE(this.notExpression, { LABEL: 'lhs' })
    this.MANY(() => {
      this.CONSUME(LBracket)
      this.SUBRULE2(this.expression, { LABEL: 'rhs' })
      this.CONSUME(RBracket)
    })
  })

  public notExpression = this.RULE('notExpression', () => {
    this.MANY(() => {
      this.CONSUME(Not, { LABEL: 'rhs' })
    })

    this.SUBRULE(this.rangeExpression, { LABEL: 'lhs' })
  })

  public rangeExpression = this.RULE('rangeExpression', () => {
    this.SUBRULE(this.chainExpression, { LABEL: 'lhs' })
    this.OPTION(() => {
      this.CONSUME(Colon)
      this.SUBRULE2(this.chainExpression, { LABEL: 'rhs' })
    })
  })

  public chainExpression = this.RULE('chainExpression', () => {
    this.SUBRULE(this.atomicExpression, { LABEL: 'lhs' })
    this.MANY(() => {
      this.CONSUME(Dot)

      this.OR([
        { ALT: () => this.SUBRULE(this.FunctionCall, { LABEL: 'rhs' }) },
        { ALT: () => this.SUBRULE(this.keyExpression, { LABEL: 'rhs' }) }
      ])
    })
  })

  public keyExpression = this.RULE('keyExpression', () => {
    this.OR([
      { ALT: () => this.CONSUME(StringLiteral) },
      { ALT: () => this.CONSUME(NumberLiteral) },
      { ALT: () => this.CONSUME(FunctionName) }
    ])
  })

  public simpleAtomicExpression = this.RULE('simpleAtomicExpression', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.parenthesisExpression) },
      { ALT: () => this.SUBRULE(this.arrayExpression) },
      { ALT: () => this.SUBRULE(this.recordExpression) },
      { ALT: () => this.SUBRULE(this.constantExpression) },
      { ALT: () => this.SUBRULE(this.lazyVariableExpression) },
      { ALT: () => this.SUBRULE(this.FunctionCall) },
      { ALT: () => this.CONSUME(FunctionName) }
    ])
  })

  public atomicExpression = this.RULE('atomicExpression', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.predicateExpression) },
      { ALT: () => this.SUBRULE(this.referenceExpression) },
      { ALT: () => this.SUBRULE(this.simpleAtomicExpression) },
      { ALT: () => this.SUBRULE(this.blockExpression) }
    ])
  })

  public arrayExpression = this.RULE('arrayExpression', () => {
    this.CONSUME(LBracket)
    this.OPTION(() => {
      this.SUBRULE2(this.Arguments)
    })
    this.CONSUME(RBracket)
  })

  public recordExpression = this.RULE('recordExpression', () => {
    this.CONSUME(LBrace)

    this.MANY_SEP({
      SEP: Comma,
      DEF: () => {
        this.SUBRULE(this.recordField)
      }
    })

    this.CONSUME(RBrace)
  })

  public recordField = this.RULE('recordField', () => {
    this.SUBRULE(this.keyExpression)
    this.CONSUME(Colon)
    this.SUBRULE(this.expression)
  })

  public predicateExpression = this.RULE('predicateExpression', () => {
    // this.OPTION(() => {
    //   this.SUBRULE(this.variableExpression)
    // })
    this.OR([{ ALT: () => this.CONSUME(EqualCompareOperator) }, { ALT: () => this.CONSUME(CompareOperator) }])

    this.SUBRULE(this.simpleAtomicExpression)
  })

  public referenceExpression = this.RULE('referenceExpression', () => {
    this.CONSUME(Ampersand)
    this.SUBRULE(this.lazyVariableExpression)
  })

  public lazyVariableExpression = this.RULE('lazyVariableExpression', () => {
    this.OR([
      // { ALT: () => this.SUBRULE(this.variableExpression) },
      { ALT: () => this.CONSUME(LambdaArgumentNumber) },
      { ALT: () => this.CONSUME(Self) },
      { ALT: () => this.CONSUME(Input) },
      { ALT: () => this.CONSUME(ThisRow) },
      { ALT: () => this.CONSUME(ThisRecord) }
    ])
  })

  public blockExpression = this.RULE('blockExpression', () => {
    this.CONSUME(Sharp)
    this.OR([{ ALT: () => this.CONSUME(UUID) }, { ALT: () => this.CONSUME(CurrentBlock) }])
  })

  public constantExpression = this.RULE('constantExpression', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.NumberLiteralExpression) },
      { ALT: () => this.SUBRULE(this.BooleanLiteralExpression) },
      { ALT: () => this.CONSUME(StringLiteral) },
      { ALT: () => this.CONSUME(NullLiteral) }
    ])
  })

  public parenthesisExpression = this.RULE('parenthesisExpression', () => {
    this.CONSUME(LParen)
    // this.OPTION(() => {
    this.SUBRULE(this.expression)
    // })
    this.CONSUME(RParen)
  })

  public NumberLiteralExpression = this.RULE('NumberLiteralExpression', () => {
    this.OPTION(() => {
      this.CONSUME(Minus)
    })

    this.OR([{ ALT: () => this.CONSUME(NumberLiteral) }, { ALT: () => this.CONSUME(DecimalLiteral) }])
    this.OPTION3(() => {
      this.CONSUME(Sign)
    })
  })

  public BooleanLiteralExpression = this.RULE('BooleanLiteralExpression', () => {
    this.CONSUME(BooleanLiteral)
  })

  public FunctionCall = this.RULE('FunctionCall', () => {
    this.OPTION(() => {
      this.CONSUME(FunctionName)
      this.CONSUME(DoubleColon)
    })
    this.CONSUME2(FunctionName)

    this.CONSUME2(LParen)
    this.OPTION2(() => {
      this.SUBRULE2(this.Arguments)
    })
    this.CONSUME2(RParen)
  })

  public Arguments = this.RULE('Arguments', () => {
    this.SUBRULE(this.expression)
    this.MANY(() => {
      this.CONSUME(Comma)
      this.SUBRULE2(this.expression)
    })
  })
}

export const ParserInstance = new FormulaParser()
