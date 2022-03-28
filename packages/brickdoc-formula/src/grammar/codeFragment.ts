import { CstNode, IToken } from 'chevrotain'
import {
  CodeFragment,
  ErrorMessage,
  FormulaType,
  Argument,
  VariableDependency,
  FunctionClause,
  CodeFragmentResult,
  NamespaceId,
  FunctionContext,
  ExpressionType,
  SimpleCodeFragmentType,
  VariableNameDependency,
  CodeFragmentAttrs
} from '../types'
import { buildFunctionKey } from '../functions'
import { ParserInstance } from './parser'
import { intersectType, parseString } from './util'
import { BlockClass } from '../controls/block'
import { block2codeFragment, spreadsheet2codeFragment } from './convert'
import { PositionFragment } from './core'
import {
  additionOperator,
  arrayOperator,
  combineOperator,
  compareOperator,
  concatOperator,
  equalCompareOperator,
  expressionOperator,
  inOperator,
  multiplicationOperator,
  notOperator,
  parenthesisOperator,
  rangeOperator,
  recordFieldOperator,
  recordOperator
} from './operations'
import { parseByOperator } from './operator'

export const token2fragment = (token: IToken, type: FormulaType): CodeFragment => {
  return {
    value: token.image,
    code: token.tokenType.name as SimpleCodeFragmentType,
    errors: [],
    renderText: undefined,
    hide: false,
    type,
    display: token.image,
    attrs: undefined
  }
}

export interface CstVisitorArgument {
  readonly type: ExpressionType
  readonly firstArgumentType?: FormulaType
  readonly clauseArguments?: Argument[]
}

const CodeFragmentCstVisitor = ParserInstance.getBaseCstVisitorConstructor<CstVisitorArgument, CodeFragmentResult>()

export class CodeFragmentVisitor extends CodeFragmentCstVisitor {
  ctx: FunctionContext
  variableDependencies: VariableDependency[] = []
  variableNameDependencies: VariableNameDependency[] = []
  functionDependencies: Array<FunctionClause<any>> = []
  blockDependencies: NamespaceId[] = []
  flattenVariableDependencies: VariableDependency[] = []
  kind: 'constant' | 'expression' = 'constant'
  async: boolean = false
  pure: boolean = true
  effect: boolean = false
  persist: boolean = true

  constructor({ ctx }: { ctx: FunctionContext }) {
    super()
    this.ctx = ctx
    this.validateVisitor()
  }

  startExpression(
    ctx: { expression: CstNode | CstNode[]; Equal: any },
    { type }: CstVisitorArgument
  ): CodeFragmentResult {
    const operator = ctx.Equal[0] as IToken
    const { type: newType, codeFragments, image }: CodeFragmentResult = this.visit(ctx.expression, { type })
    return {
      type: newType,
      codeFragments: [token2fragment(operator, 'any'), ...codeFragments],
      image: `${ctx.Equal[0].image}${image}`
    }
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

    let firstArgumentType: FormulaType = lhsType

    ctx.Dot.forEach((dotOperand: CstNode | CstNode[], idx: number) => {
      const rhsCst = ctx.rhs?.[idx]
      const missingRhsErrors: ErrorMessage[] = rhsCst ? [] : [{ message: 'Missing expression', type: 'syntax' }]

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
          ['null', 'string', 'boolean', 'number'].includes(firstArgumentType) && type !== 'Reference'
            ? [{ type: 'syntax', message: 'Access error' }]
            : []
        const { codeFragments: rhsCodeFragments, image: rhsImage }: CodeFragmentResult = this.visit(rhsCst, {
          type: 'string'
        })
        const name = parseString(rhsImage)

        let object

        if (firstArgumentType === 'Block') {
          const blockCodeFragment = codeFragments[codeFragments.length - 2]
          const namespaceId =
            // eslint-disable-next-line no-nested-ternary
            blockCodeFragment?.display === 'CurrentBlock'
              ? this.ctx.meta.namespaceId
              : blockCodeFragment?.code === 'UUID'
              ? blockCodeFragment?.value
              : blockCodeFragment?.attrs?.id ?? ''

          object = new BlockClass(this.ctx.formulaContext, { id: namespaceId })
        }

        if (firstArgumentType === 'Spreadsheet') {
          const attrs: CodeFragmentAttrs | undefined = codeFragments[codeFragments.length - 2]?.attrs
          if (attrs) {
            object = this.ctx.formulaContext.findSpreadsheet(attrs.namespaceId)
          }
          if (!object) {
            extraErrorMessages.push({ type: 'syntax', message: 'Spreadsheet not found' })
          }
        }

        if (firstArgumentType === 'Column') {
          const attrs: CodeFragmentAttrs | undefined = codeFragments[codeFragments.length - 2]?.attrs
          if (attrs) {
            object = this.ctx.formulaContext.findColumnById(attrs.namespaceId, attrs.id)
          }
          if (!object) {
            extraErrorMessages.push({ type: 'syntax', message: 'Column not found' })
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

    let firstArgumentType: FormulaType = lhsType

    ctx.LBracket.forEach((dotOperand: CstNode | CstNode[], idx: number) => {
      const rhsCst = ctx.rhs?.[idx]
      const missingRhsErrors: ErrorMessage[] = rhsCst ? [] : [{ message: 'Missing expression', type: 'syntax' }]
      const missingRBracketErrors: ErrorMessage[] = ctx.RBracket?.[idx]
        ? []
        : [{ message: 'Missing closing bracket', type: 'syntax' }]

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
    },
    { type }: CstVisitorArgument
  ): CodeFragmentResult {
    if (ctx.parenthesisExpression) {
      return this.visit(ctx.parenthesisExpression, { type })
    } else if (ctx.arrayExpression) {
      return this.visit(ctx.arrayExpression, { type })
    } else if (ctx.recordExpression) {
      return this.visit(ctx.recordExpression, { type })
    } else if (ctx.constantExpression) {
      return this.visit(ctx.constantExpression, { type })
    } else if (ctx.FunctionCall) {
      return this.visit(ctx.FunctionCall, { type })
    } else if (ctx.lazyVariableExpression) {
      return this.visit(ctx.lazyVariableExpression, { type })
    }

    // devLog('debugAtomic', {ctx, type})
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
      : [{ type: 'syntax', message: 'Missing variable' }]
    codeFragments.push({ ...ampersandCodeFragment, errors: ampersandErrors })

    if (ctx.lazyVariableExpression) {
      const { codeFragments: VariableCodeFragments, image }: CodeFragmentResult = this.visit(
        ctx.lazyVariableExpression,
        {
          type: 'any'
        }
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
      {
        type: childrenType
      }
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
    { type }: CstVisitorArgument
  ): CodeFragmentResult {
    if (ctx.NumberLiteralExpression) {
      return this.visit(ctx.NumberLiteralExpression, { type })
    } else if (ctx.BooleanLiteralExpression) {
      return this.visit(ctx.BooleanLiteralExpression, { type })
    } else if (ctx.NullLiteral) {
      const parentType = 'null'
      const { errorMessages } = intersectType(type, parentType, 'constantExpression', this.ctx)

      return {
        codeFragments: [{ ...token2fragment(ctx.NullLiteral[0], 'null'), errors: errorMessages }],
        type: 'null',
        image: ctx.NullLiteral[0].image
      }
    } else if (ctx.StringLiteral) {
      return this.StringLiteralExpression(ctx, { type })
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

  StringLiteralExpression(ctx: any, { type }: CstVisitorArgument): CodeFragmentResult {
    const parentType = 'string'
    const { errorMessages } = intersectType(type, parentType, 'StringLiteralExpression', this.ctx)
    return {
      codeFragments: [{ ...token2fragment(ctx.StringLiteral[0], parentType), errors: errorMessages }],
      type: parentType,
      image: ctx.StringLiteral[0].image
    }
  }

  NumberLiteralExpression(
    ctx: { Minus: IToken[]; NumberLiteral: IToken[]; Sign: IToken[]; DecimalLiteral: IToken[] },
    { type }: CstVisitorArgument
  ): CodeFragmentResult {
    const parentType = 'number'

    const codeFragments: CodeFragment[] = []
    const images: string[] = []
    const errors: ErrorMessage[] = []

    if (ctx.Minus) {
      const errorMessages: ErrorMessage[] =
        ctx.NumberLiteral || ctx.DecimalLiteral ? [] : [{ message: 'Missing number', type: 'syntax' }]
      errors.push(...errorMessages)
      images.push(ctx.Minus[0].image)
    }

    const { errorMessages } = intersectType(type, parentType, 'NumberLiteralExpression', this.ctx)

    if (ctx.DecimalLiteral) {
      images.push(ctx.DecimalLiteral[0].image)
    } else if (ctx.NumberLiteral) {
      images.push(ctx.NumberLiteral[0].image)
    }

    const image = images.join('')

    codeFragments.push({
      value: image,
      code: 'NumberLiteral',
      errors,
      renderText: undefined,
      hide: false,
      type: 'number',
      display: image,
      attrs: undefined
    })

    if (ctx.Sign) {
      codeFragments.push({ ...token2fragment(ctx.Sign[0], 'any') })
      images.push(ctx.Sign[0].image)
    }

    return {
      codeFragments: codeFragments.map(codeFragment => ({
        ...codeFragment,
        errors: [...errorMessages, ...codeFragment.errors]
      })),
      type: parentType,
      image: images.join('')
    }
  }

  BooleanLiteralExpression(ctx: { BooleanLiteral: IToken[] }, { type }: CstVisitorArgument): CodeFragmentResult {
    const parentType = 'boolean'
    const { errorMessages } = intersectType(type, parentType, 'BooleanLiteralExpression', this.ctx)
    return {
      codeFragments: [{ ...token2fragment(ctx.BooleanLiteral[0], parentType), errors: errorMessages }],
      type: parentType,
      image: ctx.BooleanLiteral[0].image
    }
  }

  blockExpression(ctx: any, { type }: CstVisitorArgument): CodeFragmentResult {
    const SharpFragment = token2fragment(ctx.Sharp[0], 'any')
    const namespaceToken = ctx.UUID?.[0] ?? ctx.CurrentBlock?.[0]

    if (!namespaceToken) {
      return {
        codeFragments: [{ ...SharpFragment, errors: [{ message: `Miss expression`, type: 'syntax' }] }],
        image: SharpFragment.display,
        type: 'any'
      }
    }

    const namespaceId =
      namespaceToken.tokenType.name === 'CurrentBlock' ? this.ctx.meta.namespaceId : namespaceToken.image

    this.kind = 'expression'
    this.blockDependencies.push(namespaceId)
    const formulaName = this.ctx.formulaContext.findFormulaName(namespaceId)

    if (formulaName?.kind === 'Spreadsheet') {
      const spreadsheet = this.ctx.formulaContext.findSpreadsheet(namespaceId)
      if (spreadsheet) {
        const parentType: FormulaType = 'Spreadsheet'
        const { errorMessages, newType } = intersectType(type, parentType, 'blockExpression', this.ctx)
        return {
          codeFragments: [
            {
              ...token2fragment(namespaceToken, 'any'),
              ...spreadsheet2codeFragment(spreadsheet, this.ctx.meta.namespaceId),
              errors: errorMessages
            }
          ],
          image: `#${namespaceToken.image}`,
          type: newType
        }
      }
    }

    if (formulaName?.kind === 'Block') {
      const parentType: FormulaType = 'Block'
      const { errorMessages, newType } = intersectType(type, parentType, 'blockExpression', this.ctx)
      const block = new BlockClass(this.ctx.formulaContext, { id: namespaceId })
      const hide = namespaceId === this.ctx.meta.namespaceId

      return {
        codeFragments: [
          {
            ...token2fragment(namespaceToken, 'any'),
            ...block2codeFragment(block, this.ctx.meta.namespaceId),
            hide,
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
          errors: [{ message: `Block not found: ${namespaceId}`, type: 'deps' }]
        }
      ],
      image: `#${namespaceToken.image}`,
      type: 'Block'
    }
  }

  lazyVariableExpression(ctx: any, { type }: CstVisitorArgument): CodeFragmentResult {
    if (ctx.Self) {
      return { codeFragments: [token2fragment(ctx.Self[0], 'Reference')], type: 'Reference', image: ctx.Self[0].image }
    } else if (ctx.Input) {
      return {
        codeFragments: [token2fragment(ctx.Input[0], 'Record')],
        type: 'Record',
        image: ctx.Input[0].image
      }
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

    const functionKey = buildFunctionKey(group, name, true)

    const nameFragment: CodeFragment = {
      value: functionKey,
      code: 'FunctionName',
      errors: [],
      renderText: undefined,
      hide: false,
      type: 'any',
      display: functionKey,
      attrs: undefined
    }

    if (!ctx.LParen) {
      return {
        codeFragments: [
          {
            ...nameFragment,
            code: 'Function',
            errors: [{ message: `Unknown function ${functionKey}`, type: 'syntax' }]
          }
        ],
        image: images.join(''),
        type: 'any'
      }
    }

    const rParenErrorMessages: ErrorMessage[] = ctx.RParen
      ? []
      : [{ message: 'Missing closing parenthesis', type: 'syntax' }]
    const rparenCodeFragments = ctx.RParen ? [token2fragment(ctx.RParen[0], clause ? clause.returns : 'any')] : []

    const clauseErrorMessages: ErrorMessage[] = []
    if (!clause) {
      clauseErrorMessages.push({ message: `Function ${functionKey} not found`, type: 'deps' })
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
      if (!clause.persist) {
        this.persist = false
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
        ? (this.visit(ctx.Arguments, { type, firstArgumentType, clauseArguments: clauseArgs }) as CodeFragmentResult)
        : { codeFragments: [], image: '' }
      const argsErrorMessages: ErrorMessage[] =
        clauseArgs.filter(a => !a.default).length > 0 && argsCodeFragments.length === 0
          ? [{ message: 'Miss argument', type: 'deps' }]
          : []

      images.push(ctx.LParen[0].image, image, ctx.RParen ? ctx.RParen[0].image : '')

      const { errorMessages, newType } = intersectType(type, clause.returns, 'FunctionCall', this.ctx)
      return {
        codeFragments: [
          {
            ...nameFragment,
            code: 'Function',
            errors: [...chainError, ...errorMessages, ...argsErrorMessages]
          },
          { ...token2fragment(ctx.LParen[0], 'any'), errors: rParenErrorMessages },
          ...argsCodeFragments,
          ...rparenCodeFragments
        ],
        image: images.join(''),
        type: newType
      }
    } else {
      const { codeFragments: argsCodeFragments, image } = ctx.Arguments
        ? (this.visit(ctx.Arguments, { type, firstArgumentType, clauseArguments: undefined }) as CodeFragmentResult)
        : { codeFragments: [], image: '' }
      images.push(ctx.LParen[0].image, image, ctx.RParen ? ctx.RParen[0].image : '')

      return {
        codeFragments: [
          {
            ...nameFragment,
            code: 'Function',
            errors: clauseErrorMessages
          },
          { ...token2fragment(ctx.LParen[0], 'any'), errors: rParenErrorMessages },
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
    { clauseArguments: args }: CstVisitorArgument
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
        codeFragments.push(token2fragment(ctx.Comma[commaIndex], 'any'))
        images.push(ctx.Comma[commaIndex].image)
        commaIndex += 1
      }
    })

    const expressionMatchErrorMessages: ErrorMessage[] =
      validExpressionCount === commaIndex + 1 ? [] : [{ message: 'Expression count mismatch', type: 'syntax' }]

    const errorMessages: ErrorMessage[] =
      !!args && (ctx.expression.length > argumentTypes.length || ctx.expression.length < nonDefaultArgumentCount)
        ? [{ message: 'Argument count mismatch', type: 'deps' }]
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

export const codeFragment2string = ({ code, value }: CodeFragment): string => {
  if (code === 'StringLiteral') return parseString(value)
  if (code === 'NumberLiteral') return value
  if (code === 'FunctionName') return value

  return ''
}

export const hideDot = (
  codeFragments: CodeFragment[],
  positionFragment: PositionFragment
): { finalCodeFragments: CodeFragment[]; finalPositionFragment: PositionFragment } => {
  const finalCodeFragments: CodeFragment[] = []
  let finalPositionFragment = positionFragment
  codeFragments.forEach((c, idx) => {
    if (c.code === 'Dot' && !c.hide) {
      const prevCodeFragment = codeFragments[idx - 1]
      const nextCodeFragment = codeFragments[idx + 1]
      if (prevCodeFragment && nextCodeFragment && prevCodeFragment.code === 'Block' && prevCodeFragment.hide) {
        const nextErrors = nextCodeFragment.errors
        if (nextErrors.length === 0 || (nextErrors.length === 1 && nextErrors[0].type !== 'deps')) {
          finalCodeFragments.pop()
          if (finalPositionFragment.tokenIndex >= idx - 1) {
            finalPositionFragment = { ...finalPositionFragment, tokenIndex: finalPositionFragment.tokenIndex - 3 }
          }
          return
        }
      }
    }

    finalCodeFragments.push(c)
  })

  // console.log({ codeFragments, finalCodeFragments, positionFragment, finalPositionFragment })
  return { finalCodeFragments, finalPositionFragment }
}

export const addSpace = (
  codeFragments: CodeFragment[],
  input: string,
  positionFragment: PositionFragment
): { finalCodeFragments: CodeFragment[]; finalPositionFragment: PositionFragment } => {
  const finalCodeFragments: CodeFragment[] = []
  const spaceCodeFragment: CodeFragment = {
    code: 'Space',
    value: ' ',
    renderText: undefined,
    hide: false,
    type: 'any',
    display: ' ',
    errors: [],
    attrs: undefined
  }

  let restInput = input
  let error = false
  let image = ''
  codeFragments.forEach((codeFragment, idx) => {
    let match = false
    if (error) return
    image = codeFragment.value

    if (restInput.startsWith(image)) {
      finalCodeFragments.push(codeFragment)
      restInput = restInput.substring(image.length)
      match = true
    }

    const prefixSpaceCount = restInput.length - restInput.trimStart().length
    if (prefixSpaceCount > 0) {
      const spaceValue = ' '.repeat(prefixSpaceCount)
      finalCodeFragments.push({ ...spaceCodeFragment, value: spaceValue, display: spaceValue })
      restInput = restInput.substring(prefixSpaceCount)
    }

    if (!match) {
      error = true
    }
  })

  if (error) {
    // devWarning(true, 'addSpaceError', { input, codeFragments, restInput, finalCodeFragments, image })
    // const errorMessage = `[Parse Error] ${input}`
    // return [
    //   {
    //     code: 'other',
    //     value: errorMessage,
    //     type: 'any',
    //     renderText: undefined,
    //     display: errorMessage,
    //     errors: [],
    //     attrs: undefined
    //   }
    // ]

    return { finalCodeFragments: codeFragments, finalPositionFragment: positionFragment }
  }

  return { finalCodeFragments, finalPositionFragment: positionFragment }
}
