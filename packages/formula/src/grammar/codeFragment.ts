import { CstNode, IToken } from 'chevrotain'
import {
  CodeFragment,
  ErrorMessage,
  FormulaType,
  Argument,
  CodeFragmentResult,
  FunctionContext,
  ExpressionType,
  SimpleCodeFragmentType,
  CodeFragmentAttrs,
  VariableParseResult,
  FormulaCheckType
} from '../type'
import { buildFunctionKey } from '../functions'
import { ParserInstance } from './parser'
import { intersectType, parseString } from './util'
import { block2codeFragment, function2attrs } from './convert'
import {
  additionOperator,
  arrayOperator,
  booleanOperator,
  combineOperator,
  compareOperator,
  concatOperator,
  equalCompareOperator,
  expressionOperator,
  inOperator,
  multiplicationOperator,
  nameOperator,
  notOperator,
  nullOperator,
  numberOperator,
  parenthesisOperator,
  rangeOperator,
  recordFieldOperator,
  recordOperator,
  stringOperator,
  thisRecordOperator,
  thisRowOperator
} from './operations'
import { parseByOperator } from './operator'
import { parseTrackBlock, parseTrackName } from './dependency'

export const token2fragment = (token: IToken, type: FormulaType, meta?: CodeFragment['meta']): CodeFragment => {
  return {
    code: token.tokenType.name as SimpleCodeFragmentType,
    errors: [],
    type,
    display: token.image,
    attrs: undefined,
    meta
  }
}

export interface CstVisitorArgument {
  readonly type: ExpressionType
  readonly firstArgumentType?: ExpressionType
  readonly clauseArguments?: Argument[]
  readonly meta?: CodeFragment['meta']
}

const CodeFragmentCstVisitor = ParserInstance.getBaseCstVisitorConstructor<CstVisitorArgument, CodeFragmentResult>()

export class CodeFragmentVisitor extends CodeFragmentCstVisitor {
  ctx: FunctionContext
  variableDependencies: VariableParseResult['variableDependencies'] = []
  nameDependencies: VariableParseResult['nameDependencies'] = []
  functionDependencies: VariableParseResult['functionDependencies'] = []
  eventDependencies: VariableParseResult['eventDependencies'] = []
  blockDependencies: VariableParseResult['blockDependencies'] = []
  flattenVariableDependencies: VariableParseResult['flattenVariableDependencies'] = []
  kind: 'constant' | 'expression' = 'constant'
  async: boolean = false
  pure: boolean = true
  effect: boolean = false
  persist: boolean = false

  constructor({ ctx }: { ctx: FunctionContext }) {
    super()
    this.ctx = ctx
    this.validateVisitor()
  }

  startExpression(ctx: { expression: CstNode | CstNode[] }, { type }: CstVisitorArgument): CodeFragmentResult {
    return this.visit(ctx.expression, { type })
  }

  expression(ctx: any, args: CstVisitorArgument): CodeFragmentResult {
    return parseByOperator({
      cstVisitor: this,
      operators: ctx.Semicolon,
      args,
      operator: expressionOperator,
      rhs: ctx.rhs,
      lhs: ctx.lhs
    })
  }

  combineExpression(ctx: any, args: CstVisitorArgument): CodeFragmentResult {
    return parseByOperator({
      cstVisitor: this,
      operators: ctx.CombineOperator,
      args,
      operator: combineOperator,
      rhs: ctx.rhs,
      lhs: ctx.lhs
    })
  }

  equalCompareExpression(ctx: any, args: CstVisitorArgument): CodeFragmentResult {
    return parseByOperator({
      cstVisitor: this,
      operators: ctx.EqualCompareOperator,
      args,
      operator: equalCompareOperator,
      rhs: ctx.rhs,
      lhs: ctx.lhs
    })
  }

  compareExpression(ctx: any, args: CstVisitorArgument): CodeFragmentResult {
    return parseByOperator({
      cstVisitor: this,
      operators: ctx.CompareOperator,
      args,
      operator: compareOperator,
      rhs: ctx.rhs,
      lhs: ctx.lhs
    })
  }

  inExpression(ctx: any, args: CstVisitorArgument): CodeFragmentResult {
    return parseByOperator({
      cstVisitor: this,
      operators: ctx.InOperator,
      args,
      operator: inOperator,
      rhs: ctx.rhs,
      lhs: ctx.lhs
    })
  }

  concatExpression(ctx: any, args: CstVisitorArgument): CodeFragmentResult {
    return parseByOperator({
      cstVisitor: this,
      operators: ctx.Ampersand,
      args,
      operator: concatOperator,
      rhs: ctx.rhs,
      lhs: ctx.lhs
    })
  }

  additionExpression(ctx: any, args: CstVisitorArgument): CodeFragmentResult {
    return parseByOperator({
      cstVisitor: this,
      operators: ctx.AdditionOperator,
      args,
      operator: additionOperator,
      rhs: ctx.rhs,
      lhs: ctx.lhs
    })
  }

  multiplicationExpression(ctx: any, args: CstVisitorArgument): CodeFragmentResult {
    return parseByOperator({
      cstVisitor: this,
      operators: ctx.MultiplicationOperator,
      args,
      operator: multiplicationOperator,
      rhs: ctx.rhs,
      lhs: ctx.lhs
    })
  }

  notExpression(ctx: any, args: CstVisitorArgument): CodeFragmentResult {
    return parseByOperator({
      cstVisitor: this,
      operators: ctx.rhs,
      args,
      operator: notOperator,
      rhs: ctx.rhs,
      lhs: ctx.lhs
    })
  }

  accessExpression(ctx: any, { type }: CstVisitorArgument): CodeFragmentResult {
    if (!ctx.LBracket) {
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

    let firstArgumentType: FormulaCheckType = lhsType

    ctx.LBracket.forEach((dotOperand: CstNode | CstNode[], idx: number) => {
      const rhsCst = ctx.rhs?.[idx]
      const missingRhsErrors: ErrorMessage[] = rhsCst
        ? []
        : [{ message: 'errors.parse.missing.expression', type: 'syntax' }]
      const missingRBracketErrors: ErrorMessage[] = ctx.RBracket?.[idx]
        ? []
        : [{ message: 'errors.parse.missing.closing_bracket', type: 'syntax' }]

      codeFragments.push({
        ...token2fragment(ctx.LBracket[idx], 'any'),
        errors: [...missingRhsErrors, ...missingRBracketErrors]
      })
      images.push(ctx.LBracket[idx].image)

      if (!rhsCst) {
        return
      }

      // TODO type check
      const { codeFragments: rhsCodeFragments, image: rhsImage }: CodeFragmentResult = this.visit(rhsCst, {
        type: 'any',
        firstArgumentType
      })

      firstArgumentType = 'any'
      images.push(rhsImage)
      codeFragments.push(...rhsCodeFragments)

      if (ctx.RBracket?.[idx]) {
        codeFragments.push(token2fragment(ctx.RBracket[idx], 'any'))
        images.push(ctx.RBracket[idx].image)
      }
    })

    if (codeFragments.find(c => c.errors.length > 0)) {
      return {
        image: images.join(''),
        codeFragments,
        type: firstArgumentType
      }
    }

    const { errorMessages, newType } = intersectType(type, firstArgumentType, 'accessExpression', this.ctx)
    return {
      image: images.join(''),
      codeFragments: codeFragments.map(codeFragment => ({
        ...codeFragment,
        errors: [...codeFragment.errors, ...errorMessages]
      })),
      type: newType
    }
  }

  rangeExpression(ctx: any, args: CstVisitorArgument): CodeFragmentResult {
    return parseByOperator({
      cstVisitor: this,
      operators: ctx.Colon,
      args,
      operator: rangeOperator,
      rhs: ctx.rhs,
      lhs: ctx.lhs
    })
  }

  chainExpression(
    ctx: { Dot: any; lhs: CstNode | CstNode[]; rhs: any[] },
    { type }: CstVisitorArgument
  ): CodeFragmentResult {
    if (!ctx.Dot) {
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

    let firstArgumentType: FormulaCheckType = lhsType

    // eslint-disable-next-line complexity
    ctx.Dot.forEach((dotOperand: CstNode | CstNode[], idx: number) => {
      const rhsCst = ctx.rhs?.[idx]
      const missingRhsErrors: ErrorMessage[] = rhsCst
        ? []
        : [{ message: 'errors.parse.missing.expression', type: 'syntax' }]

      codeFragments.push({
        ...token2fragment(ctx.Dot[0], 'any'),
        errors: missingRhsErrors
      })
      images.push(ctx.Dot[0].image)

      if (!rhsCst) {
        return
      }

      if (rhsCst.name === 'FunctionCall') {
        const { codeFragments: rhsCodeFragments, image: rhsImage }: CodeFragmentResult = this.visit(rhsCst, {
          type: 'any',
          firstArgumentType
        })

        firstArgumentType = 'any'
        images.push(rhsImage)
        codeFragments.push(...rhsCodeFragments)
        return
      }

      if (rhsCst.name === 'keyExpression') {
        const extraErrorMessages: ErrorMessage[] = []
        const accessErrorMessages: ErrorMessage[] =
          (['null', 'string', 'boolean', 'number'] as const).some(r => [firstArgumentType].flat().includes(r)) &&
          type !== 'Reference'
            ? [{ type: 'syntax', message: 'Access error' }]
            : []
        const { codeFragments: rhsCodeFragments, image: rhsImage }: CodeFragmentResult =
          rhsCst.name === 'keyExpression'
            ? this.visit(rhsCst, { type: 'string' })
            : { codeFragments: [], image: rhsCst.image, type: 'any' }
        const name = parseString(rhsImage)

        let object

        if (firstArgumentType === 'Block') {
          const blockCodeFragment = codeFragments[codeFragments.length - 2]
          const namespaceId =
            // eslint-disable-next-line no-nested-ternary
            blockCodeFragment?.display === 'CurrentBlock'
              ? this.ctx.meta.namespaceId
              : blockCodeFragment?.code === 'UUID'
              ? blockCodeFragment?.display
              : blockCodeFragment?.attrs?.id ?? ''

          object = this.ctx.formulaContext.findBlockById(namespaceId)
          if (!object) {
            extraErrorMessages.push({ type: 'syntax', message: 'errors.parse.not_found.block' })
          }
        }

        if (firstArgumentType === 'Spreadsheet') {
          const attrs: CodeFragmentAttrs | undefined = codeFragments[codeFragments.length - 2]?.attrs
          if (attrs && attrs.kind === 'Spreadsheet') {
            object = this.ctx.formulaContext.findSpreadsheet(attrs.findKey)
          }
          if (!object) {
            extraErrorMessages.push({ type: 'syntax', message: 'errors.parse.not_found.spreadsheet' })
          }
        }

        if (firstArgumentType === 'Column') {
          const attrs: CodeFragmentAttrs | undefined = codeFragments[codeFragments.length - 2]?.attrs
          if (attrs && (attrs.kind === 'LogicColumn' || attrs.kind === 'Column')) {
            object = this.ctx.formulaContext.findColumn(attrs.namespaceId, attrs.findKey)
          }
          if (!object) {
            extraErrorMessages.push({ type: 'syntax', message: 'errors.parse.not_found.column' })
          }
        }

        if (firstArgumentType === 'Row') {
          const attrs: CodeFragmentAttrs | undefined = codeFragments[codeFragments.length - 2]?.attrs
          if (attrs && (attrs.kind === 'Row' || attrs.kind === 'LogicRow')) {
            object = this.ctx.formulaContext.findRow(attrs.namespaceId, attrs.findKey)
          }
          if (!object) {
            extraErrorMessages.push({ type: 'syntax', message: 'errors.parse.not_found.row' })
          }
        }

        const {
          codeFragments: finalCodeFragments,
          errors,
          firstArgumentType: newFirstArgumentType
        } = object?.handleCodeFragments(this, name, rhsCodeFragments) ?? {
          firstArgumentType: undefined,
          errors: [],
          codeFragments: rhsCodeFragments
        }

        if (newFirstArgumentType) {
          firstArgumentType = newFirstArgumentType
        } else {
          firstArgumentType = 'any'
        }

        codeFragments.push(
          ...finalCodeFragments.map(f => ({
            ...f,
            errors: [...errors, ...extraErrorMessages, ...accessErrorMessages, ...f.errors]
          }))
        )

        images.push(rhsImage)

        return
      }

      throw new Error(`Unexpected rhs type ${rhsCst.tokenType.name}`)
    })

    if (codeFragments.find(c => c.errors.length > 0)) {
      return {
        image: images.join(''),
        codeFragments,
        type: firstArgumentType
      }
    }

    const { errorMessages, newType } = intersectType(type, firstArgumentType, 'chainExpression', this.ctx)
    return {
      image: images.join(''),
      codeFragments: codeFragments.map(codeFragment => ({
        ...codeFragment,
        errors: [...codeFragment.errors, ...errorMessages]
      })),
      type: newType
    }
  }

  keyExpression(ctx: any, { type }: CstVisitorArgument): CodeFragmentResult {
    if (ctx.FunctionName) {
      return this.FunctionNameExpression(ctx, { type })
    } else if (ctx.StringLiteral) {
      return this.StringLiteralExpression(ctx, { type })
    } else if (ctx.NumberLiteral) {
      return this.NumberLiteralExpression(ctx, { type: 'number' })
    }

    return { codeFragments: [], type: 'any', image: '' }
  }

  simpleAtomicExpression(
    ctx: {
      parenthesisExpression: CstNode | CstNode[]
      arrayExpression: CstNode | CstNode[]
      recordExpression: CstNode | CstNode[]
      constantExpression: CstNode | CstNode[]
      FunctionCall: CstNode | CstNode[]
      lazyVariableExpression: CstNode | CstNode[]
      FunctionName: IToken[]
    },
    args: CstVisitorArgument
  ): CodeFragmentResult {
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
    } else if (ctx.FunctionName) {
      return parseByOperator({
        cstVisitor: this,
        operators: [],
        bodyToken: ctx.FunctionName,
        args,
        operator: nameOperator,
        rhs: [],
        lhs: undefined
      })
    }

    // console.log('debugAtomic', { ctx, args })
    return { codeFragments: [], type: 'any', image: '' }
  }

  atomicExpression(
    ctx: {
      simpleAtomicExpression: CstNode | CstNode[]
      referenceExpression: CstNode | CstNode[]
      blockExpression: CstNode | CstNode[]
      predicateExpression: CstNode | CstNode[]
    },
    { type }: CstVisitorArgument
  ): CodeFragmentResult {
    if (ctx.simpleAtomicExpression) {
      return this.visit(ctx.simpleAtomicExpression, { type })
    } else if (ctx.referenceExpression) {
      return this.visit(ctx.referenceExpression, { type })
    } else if (ctx.blockExpression) {
      return this.visit(ctx.blockExpression, { type })
    } else if (ctx.predicateExpression) {
      return this.visit(ctx.predicateExpression, { type })
    }

    // devLog('debugAtomic', {ctx, type})
    return { codeFragments: [], type: 'any', image: '' }
  }

  referenceExpression(ctx: any, { type }: CstVisitorArgument): CodeFragmentResult {
    const codeFragments: CodeFragment[] = []
    const images: string[] = []
    const parentType: FormulaType = 'Reference'
    // devLog('reference', { ctx })
    const token = ctx.Ampersand[0]

    images.push(token.image)
    const ampersandCodeFragment = token2fragment(ctx.Ampersand[0], 'any')
    const ampersandErrors: ErrorMessage[] = ctx.lazyVariableExpression
      ? []
      : [{ type: 'syntax', message: 'Missing variable' }] // NOTE: this is unused
    codeFragments.push({ ...ampersandCodeFragment, errors: ampersandErrors })

    if (ctx.lazyVariableExpression) {
      const { codeFragments: VariableCodeFragments, image }: CodeFragmentResult = this.visit(
        ctx.lazyVariableExpression,
        { type: 'any' }
      )

      codeFragments.push(...VariableCodeFragments)
      images.push(image)
    }

    const { errorMessages, newType } = intersectType(type, parentType, 'referenceExpression', this.ctx)
    return {
      image: images.join(''),
      codeFragments: codeFragments.map(codeFragment => ({
        ...codeFragment,
        errors: [...errorMessages, ...codeFragment.errors]
      })),
      type: newType
    }
  }

  predicateExpression(
    ctx: {
      EqualCompareOperator: IToken[]
      CompareOperator: IToken[]
      simpleAtomicExpression: CstNode | CstNode[]
    },
    { type }: CstVisitorArgument
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
    const { codeFragments: expressionCodeFragments, image }: CodeFragmentResult = this.visit(
      ctx.simpleAtomicExpression,
      { type: childrenType }
    )

    codeFragments.push(token2fragment(token, 'any'), ...expressionCodeFragments)
    images.push(token.image, image)

    const { errorMessages, newType } = intersectType(type, parentType, 'predicateExpression', this.ctx)
    return {
      image: images.join(''),
      codeFragments: codeFragments.map(codeFragment => ({
        ...codeFragment,
        errors: [...errorMessages, ...codeFragment.errors]
      })),
      type: newType
    }
  }

  arrayExpression(ctx: any, args: CstVisitorArgument): CodeFragmentResult {
    return parseByOperator({
      cstVisitor: this,
      operators: [],
      args,
      operator: arrayOperator,
      prefixToken: ctx.LBracket,
      suffixToken: ctx.RBracket,
      rhs: [],
      lhs: ctx.Arguments
    })
  }

  recordExpression(ctx: any, args: CstVisitorArgument): CodeFragmentResult {
    return parseByOperator({
      cstVisitor: this,
      operators: ctx.Comma ?? [],
      args,
      operator: recordOperator,
      prefixToken: ctx.LBrace,
      suffixToken: ctx.RBrace,
      rhs: ctx.recordField,
      lhs: []
    })
  }

  recordField(ctx: any, args: CstVisitorArgument): CodeFragmentResult {
    return parseByOperator({
      cstVisitor: this,
      operators: ctx.Colon,
      args,
      operator: recordFieldOperator,
      rhs: ctx.expression,
      lhs: ctx.keyExpression
    })
  }

  parenthesisExpression(ctx: any, args: CstVisitorArgument): CodeFragmentResult {
    return parseByOperator({
      cstVisitor: this,
      operators: [],
      args,
      operator: parenthesisOperator,
      prefixToken: ctx.LParen,
      suffixToken: ctx.RParen,
      rhs: [],
      lhs: ctx.expression
    })
  }

  constantExpression(
    ctx: {
      NumberLiteralExpression: CstNode | CstNode[]
      BooleanLiteralExpression: CstNode | CstNode[]
      StringLiteral: IToken[]
      NullLiteral: IToken[]
    },
    args: CstVisitorArgument
  ): CodeFragmentResult {
    if (ctx.NumberLiteralExpression) {
      return this.visit(ctx.NumberLiteralExpression, args)
    } else if (ctx.BooleanLiteralExpression) {
      return this.visit(ctx.BooleanLiteralExpression, args)
    } else if (ctx.NullLiteral) {
      return parseByOperator({
        cstVisitor: this,
        operators: [],
        bodyToken: ctx.NullLiteral,
        args,
        operator: nullOperator,
        rhs: [],
        lhs: undefined
      })
    } else if (ctx.StringLiteral) {
      return this.StringLiteralExpression(ctx, args)
    }

    // devLog('debugConstant', { ctx, type })
    return { codeFragments: [], type: 'any', image: '' }
  }

  FunctionNameExpression(ctx: any, { type }: CstVisitorArgument): CodeFragmentResult {
    const parentType = 'string'
    const { errorMessages } = intersectType(type, parentType, 'FunctionNameExpression', this.ctx)
    return {
      codeFragments: [{ ...token2fragment(ctx.FunctionName[0], parentType), errors: errorMessages }],
      type: parentType,
      image: ctx.FunctionName[0].image
    }
  }

  StringLiteralExpression(ctx: any, args: CstVisitorArgument): CodeFragmentResult {
    return parseByOperator({
      cstVisitor: this,
      operators: [],
      bodyToken: ctx.StringLiteral,
      args,
      operator: stringOperator,
      rhs: [],
      lhs: undefined
    })
  }

  NumberLiteralExpression(
    ctx: { Minus: IToken[]; NumberLiteral: IToken[]; Sign: IToken[]; DecimalLiteral: IToken[] },
    args: CstVisitorArgument
  ): CodeFragmentResult {
    return parseByOperator({
      cstVisitor: this,
      operators: [],
      bodyToken: [ctx.Minus?.[0], ctx.DecimalLiteral ? ctx.DecimalLiteral[0] : ctx.NumberLiteral?.[0], ctx.Sign?.[0]],
      args,
      operator: numberOperator,
      rhs: [],
      lhs: undefined
    })
  }

  BooleanLiteralExpression(ctx: { BooleanLiteral: IToken[] }, args: CstVisitorArgument): CodeFragmentResult {
    return parseByOperator({
      cstVisitor: this,
      operators: [],
      bodyToken: ctx.BooleanLiteral,
      args,
      operator: booleanOperator,
      rhs: [],
      lhs: undefined
    })
  }

  blockExpression(ctx: any, { type }: CstVisitorArgument): CodeFragmentResult {
    const SharpFragment = token2fragment(ctx.Sharp[0], 'any')
    const namespaceToken = ctx.UUID?.[0] ?? ctx.CurrentBlock?.[0]

    if (!namespaceToken) {
      return {
        codeFragments: [{ ...SharpFragment, errors: [{ message: 'errors.parse.missing.expression', type: 'syntax' }] }],
        image: SharpFragment.display,
        type: 'any'
      }
    }

    const namespaceId =
      namespaceToken.tokenType.name === 'CurrentBlock' ? this.ctx.meta.namespaceId : namespaceToken.image

    this.kind = 'expression'
    const block = this.ctx.formulaContext.findBlockById(namespaceId)

    if (block) {
      parseTrackBlock(this, block)
      const parentType: FormulaType = 'Block'
      const { errorMessages, newType } = intersectType(type, parentType, 'blockExpression', this.ctx)

      return {
        codeFragments: [
          {
            ...block2codeFragment(block, this.ctx.meta.namespaceId),
            ...(namespaceToken.tokenType.name === 'CurrentBlock' ? { display: '#CurrentBlock' } : {}),
            errors: errorMessages
          }
        ],
        image: `#${namespaceToken.image}`,
        type: newType
      }
    }

    return {
      codeFragments: [
        SharpFragment,
        {
          ...token2fragment(namespaceToken, 'any'),
          errors: [{ message: 'errors.parse.not_found.block', type: 'deps' }]
        }
      ],
      image: `#${namespaceToken.image}`,
      type: 'Block'
    }
  }

  lazyVariableExpression(ctx: any, args: CstVisitorArgument): CodeFragmentResult {
    if (ctx.Self) {
      return { codeFragments: [token2fragment(ctx.Self[0], 'Reference')], type: 'Reference', image: ctx.Self[0].image }
    } else if (ctx.Input) {
      return {
        codeFragments: [token2fragment(ctx.Input[0], 'Record')],
        type: 'Record',
        image: ctx.Input[0].image
      }
    } else if (ctx.ThisRow) {
      return parseByOperator({
        cstVisitor: this,
        operators: [],
        bodyToken: ctx.ThisRow,
        args,
        operator: thisRowOperator,
        rhs: [],
        lhs: undefined
      })
    } else if (ctx.ThisRecord) {
      return parseByOperator({
        cstVisitor: this,
        operators: [],
        bodyToken: ctx.ThisRecord,
        args,
        operator: thisRecordOperator,
        rhs: [],
        lhs: undefined
      })
    } else if (ctx.LambdaArgumentNumber) {
      return {
        codeFragments: [token2fragment(ctx.LambdaArgumentNumber[0], 'Reference')],
        type: 'Reference',
        image: ctx.LambdaArgumentNumber[0].image
      }
    } else {
      return { codeFragments: [], type: 'any', image: '' }
    }
  }

  // eslint-disable-next-line complexity
  FunctionCall(
    ctx: {
      FunctionName: Array<{ image: any }>
      Arguments: CstNode | CstNode[]
      LParen: IToken[]
      RParen: IToken[]
    },
    { type, firstArgumentType }: CstVisitorArgument
  ): CodeFragmentResult {
    const names = ctx.FunctionName.map(({ image }) => image)
    const [group, name] = names.length === 1 ? ['core', ...names] : names

    const images: string[] = []

    if (names.length === 1) {
      images.push(name)
    } else {
      images.push(group, '::', name)
    }

    const clause = this.ctx.formulaContext.findFunctionClause(group, name)
    const meta = clause ? { args: clause.args, endCode: 'RParen' } : {}

    const functionAttrs = clause ? function2attrs(clause) : undefined

    const functionKey = buildFunctionKey(group, name, true)

    const nameFragments: CodeFragment[] =
      names.length === 1
        ? [
            {
              code: 'Function',
              errors: [],
              type: 'any',
              display: functionKey,
              attrs: functionAttrs
            }
          ]
        : [
            {
              code: 'FunctionGroup',
              errors: [],
              type: 'any',
              display: `${group}::`,
              attrs: functionAttrs
            },
            {
              code: 'Function',
              errors: [],
              type: 'any',
              display: name,
              attrs: functionAttrs
            }
          ]

    if (!ctx.LParen) {
      parseTrackName(this, functionKey, this.ctx.meta.namespaceId)

      return {
        codeFragments: nameFragments.map(c => ({
          ...c,
          errors: [{ message: ['errors.parse.not_found.function', { key: functionKey }], type: 'syntax' }]
        })),
        image: images.join(''),
        type: 'any'
      }
    }

    const rParenErrorMessages: ErrorMessage[] = ctx.RParen
      ? []
      : [{ message: 'errors.parse.missing.closing_parenthesis', type: 'syntax' }]
    const rparenCodeFragments = ctx.RParen ? [token2fragment(ctx.RParen[0], clause ? clause.returns : 'any', meta)] : []

    const clauseErrorMessages: ErrorMessage[] = []
    if (!clause) {
      clauseErrorMessages.push({ message: ['errors.parse.not_found.function', { key: functionKey }], type: 'deps' })
    } else if (clause.feature && !this.ctx.formulaContext.features.includes(clause.feature)) {
      clauseErrorMessages.push({ message: `Feature ${clause.feature} not enabled`, type: 'deps' })
    }

    if (clauseErrorMessages.length === 0 && clause) {
      this.functionDependencies.push(clause)

      if (clause.effect || !clause.pure) {
        this.kind = 'expression'
      }

      if (clause.async) {
        this.async = true
      }
      if (clause.effect) {
        this.effect = true
      }
      if (clause.persist) {
        this.persist = true
      }
      if (!clause.pure) {
        this.pure = false
      }

      const chainError: ErrorMessage[] = []
      if (firstArgumentType && !clause.chain) {
        chainError.push({ message: `${group}::${name} is not chainable`, type: 'deps' })
      }

      let clauseArgs = clause.args
      if (firstArgumentType) {
        const firstType = clauseArgs[0].type

        const { errorMessages } = intersectType(firstType, firstArgumentType, 'FunctionCall', this.ctx)
        chainError.push(...errorMessages)
        clauseArgs = clause.args.slice(1)
      }
      const { codeFragments: argsCodeFragments, image } = ctx.Arguments
        ? (this.visit(ctx.Arguments, {
            type,
            firstArgumentType,
            clauseArguments: clauseArgs,
            meta
          }) as CodeFragmentResult)
        : { codeFragments: [], image: '' }
      const argsErrorMessages: ErrorMessage[] =
        clauseArgs.filter(a => !a.default).length > 0 && argsCodeFragments.length === 0
          ? [{ message: 'errors.parse.missing.argument', type: 'deps' }]
          : []

      images.push(ctx.LParen[0].image, image, ctx.RParen ? ctx.RParen[0].image : '')

      const { errorMessages, newType } = intersectType(type, clause.returns, 'FunctionCall', this.ctx)
      return {
        codeFragments: [
          ...nameFragments.map(c => ({
            ...c,
            errors: [...chainError, ...errorMessages, ...argsErrorMessages, ...c.errors]
          })),
          { ...token2fragment(ctx.LParen[0], 'any', meta), errors: rParenErrorMessages },
          ...argsCodeFragments,
          ...rparenCodeFragments
        ],
        image: images.join(''),
        type: newType
      }
    } else {
      const { codeFragments: argsCodeFragments, image } = ctx.Arguments
        ? (this.visit(ctx.Arguments, {
            type,
            firstArgumentType,
            clauseArguments: undefined,
            meta
          }) as CodeFragmentResult)
        : { codeFragments: [], image: '' }
      images.push(ctx.LParen[0].image, image, ctx.RParen ? ctx.RParen[0].image : '')

      return {
        codeFragments: [
          ...nameFragments.map(c => ({ ...c, errors: [...clauseErrorMessages, ...c.errors] })),
          { ...token2fragment(ctx.LParen[0], 'any', meta), errors: rParenErrorMessages },
          ...argsCodeFragments,
          ...rparenCodeFragments
        ],
        image: images.join(''),
        type: 'any'
      }
    }
  }

  Arguments(
    ctx: { expression: any[]; Comma: IToken[] },
    { clauseArguments: args, meta }: CstVisitorArgument
  ): CodeFragmentResult {
    const firstArgs = args?.[0]
    const argumentTypes = firstArgs?.spread
      ? Array(ctx.expression.length).fill(firstArgs.type)
      : args?.map(x => x.type) ?? []

    const nonDefaultArgumentCount = args ? args.filter(x => !x.default).length : 0

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
        codeFragments.push(token2fragment(ctx.Comma[commaIndex], 'any', meta))
        images.push(ctx.Comma[commaIndex].image)
        commaIndex += 1
      }
    })

    const expressionMatchErrorMessages: ErrorMessage[] =
      validExpressionCount === commaIndex + 1
        ? []
        : [{ message: 'errors.parse.mismatch.expression_count', type: 'syntax' }]

    const errorMessages: ErrorMessage[] =
      !!args && (ctx.expression.length > argumentTypes.length || ctx.expression.length < nonDefaultArgumentCount)
        ? [{ message: 'errors.parse.mismatch.argument_count', type: 'deps' }]
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

export const isKey = ({ code }: CodeFragment): boolean => {
  return ['StringLiteral', 'FunctionName', 'NumberLiteral'].includes(code)
}
