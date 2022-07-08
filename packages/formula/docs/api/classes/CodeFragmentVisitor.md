# Class: CodeFragmentVisitor

## Hierarchy

- `CodeFragmentCstVisitor`

  ↳ **`CodeFragmentVisitor`**

## Table of contents

### Constructors

- [constructor](CodeFragmentVisitor.md#constructor)

### Properties

- [async](CodeFragmentVisitor.md#async)
- [blockDependencies](CodeFragmentVisitor.md#blockdependencies)
- [ctx](CodeFragmentVisitor.md#ctx)
- [effect](CodeFragmentVisitor.md#effect)
- [eventDependencies](CodeFragmentVisitor.md#eventdependencies)
- [flattenVariableDependencies](CodeFragmentVisitor.md#flattenvariabledependencies)
- [functionDependencies](CodeFragmentVisitor.md#functiondependencies)
- [kind](CodeFragmentVisitor.md#kind)
- [nameDependencies](CodeFragmentVisitor.md#namedependencies)
- [persist](CodeFragmentVisitor.md#persist)
- [pure](CodeFragmentVisitor.md#pure)
- [variableDependencies](CodeFragmentVisitor.md#variabledependencies)

### Methods

- [Arguments](CodeFragmentVisitor.md#arguments)
- [BooleanLiteralExpression](CodeFragmentVisitor.md#booleanliteralexpression)
- [FunctionCall](CodeFragmentVisitor.md#functioncall)
- [FunctionNameExpression](CodeFragmentVisitor.md#functionnameexpression)
- [NumberLiteralExpression](CodeFragmentVisitor.md#numberliteralexpression)
- [StringLiteralExpression](CodeFragmentVisitor.md#stringliteralexpression)
- [accessExpression](CodeFragmentVisitor.md#accessexpression)
- [additionExpression](CodeFragmentVisitor.md#additionexpression)
- [arrayExpression](CodeFragmentVisitor.md#arrayexpression)
- [atomicExpression](CodeFragmentVisitor.md#atomicexpression)
- [blockExpression](CodeFragmentVisitor.md#blockexpression)
- [chainExpression](CodeFragmentVisitor.md#chainexpression)
- [combineExpression](CodeFragmentVisitor.md#combineexpression)
- [compareExpression](CodeFragmentVisitor.md#compareexpression)
- [concatExpression](CodeFragmentVisitor.md#concatexpression)
- [constantExpression](CodeFragmentVisitor.md#constantexpression)
- [equalCompareExpression](CodeFragmentVisitor.md#equalcompareexpression)
- [expression](CodeFragmentVisitor.md#expression)
- [inExpression](CodeFragmentVisitor.md#inexpression)
- [keyExpression](CodeFragmentVisitor.md#keyexpression)
- [lazyVariableExpression](CodeFragmentVisitor.md#lazyvariableexpression)
- [multiplicationExpression](CodeFragmentVisitor.md#multiplicationexpression)
- [notExpression](CodeFragmentVisitor.md#notexpression)
- [parenthesisExpression](CodeFragmentVisitor.md#parenthesisexpression)
- [predicateExpression](CodeFragmentVisitor.md#predicateexpression)
- [rangeExpression](CodeFragmentVisitor.md#rangeexpression)
- [recordExpression](CodeFragmentVisitor.md#recordexpression)
- [recordField](CodeFragmentVisitor.md#recordfield)
- [referenceExpression](CodeFragmentVisitor.md#referenceexpression)
- [simpleAtomicExpression](CodeFragmentVisitor.md#simpleatomicexpression)
- [startExpression](CodeFragmentVisitor.md#startexpression)
- [validateVisitor](CodeFragmentVisitor.md#validatevisitor)
- [visit](CodeFragmentVisitor.md#visit)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new CodeFragmentVisitor**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.ctx` | [`FunctionContext`](../interfaces/FunctionContext.md) |

#### Overrides

CodeFragmentCstVisitor.constructor

## Properties

### <a id="async" name="async"></a> async

• **async**: `boolean` = `false`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:74](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L74)

___

### <a id="blockdependencies" name="blockdependencies"></a> blockDependencies

• **blockDependencies**: `string`[] = `[]`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:71](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L71)

___

### <a id="ctx" name="ctx"></a> ctx

• **ctx**: [`FunctionContext`](../interfaces/FunctionContext.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:66](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L66)

___

### <a id="effect" name="effect"></a> effect

• **effect**: `boolean` = `false`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:76](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L76)

___

### <a id="eventdependencies" name="eventdependencies"></a> eventDependencies

• **eventDependencies**: [`EventDependency`](../interfaces/EventDependency.md)<[`FormulaEventPayload`](../interfaces/FormulaEventPayload.md)<`any`\>\>[] = `[]`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:70](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L70)

___

### <a id="flattenvariabledependencies" name="flattenvariabledependencies"></a> flattenVariableDependencies

• **flattenVariableDependencies**: [`VariableDependency`](../interfaces/VariableDependency.md)[] = `[]`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:72](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L72)

___

### <a id="functiondependencies" name="functiondependencies"></a> functionDependencies

• **functionDependencies**: [`AnyFunctionClauseWithKeyAndExample`](../README.md#anyfunctionclausewithkeyandexample)[] = `[]`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:69](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L69)

___

### <a id="kind" name="kind"></a> kind

• **kind**: ``"expression"`` \| ``"constant"`` = `'constant'`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:73](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L73)

___

### <a id="namedependencies" name="namedependencies"></a> nameDependencies

• **nameDependencies**: [`NameDependency`](../interfaces/NameDependency.md)[] = `[]`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:68](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L68)

___

### <a id="persist" name="persist"></a> persist

• **persist**: `boolean` = `false`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:77](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L77)

___

### <a id="pure" name="pure"></a> pure

• **pure**: `boolean` = `true`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:75](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L75)

___

### <a id="variabledependencies" name="variabledependencies"></a> variableDependencies

• **variableDependencies**: [`VariableDependency`](../interfaces/VariableDependency.md)[] = `[]`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:67](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L67)

## Methods

### <a id="arguments" name="arguments"></a> Arguments

▸ **Arguments**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.Comma` | `IToken`[] |
| `ctx.expression` | `any`[] |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="booleanliteralexpression" name="booleanliteralexpression"></a> BooleanLiteralExpression

▸ **BooleanLiteralExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.BooleanLiteral` | `IToken`[] |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="functioncall" name="functioncall"></a> FunctionCall

▸ **FunctionCall**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.Arguments` | `CstNode` \| `CstNode`[] |
| `ctx.FunctionName` | { `image`: `any`  }[] |
| `ctx.LParen` | `IToken`[] |
| `ctx.RParen` | `IToken`[] |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="functionnameexpression" name="functionnameexpression"></a> FunctionNameExpression

▸ **FunctionNameExpression**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="numberliteralexpression" name="numberliteralexpression"></a> NumberLiteralExpression

▸ **NumberLiteralExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.DecimalLiteral` | `IToken`[] |
| `ctx.Minus` | `IToken`[] |
| `ctx.NumberLiteral` | `IToken`[] |
| `ctx.Sign` | `IToken`[] |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="stringliteralexpression" name="stringliteralexpression"></a> StringLiteralExpression

▸ **StringLiteralExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="accessexpression" name="accessexpression"></a> accessExpression

▸ **accessExpression**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="additionexpression" name="additionexpression"></a> additionExpression

▸ **additionExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="arrayexpression" name="arrayexpression"></a> arrayExpression

▸ **arrayExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="atomicexpression" name="atomicexpression"></a> atomicExpression

▸ **atomicExpression**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.blockExpression` | `CstNode` \| `CstNode`[] |
| `ctx.predicateExpression` | `CstNode` \| `CstNode`[] |
| `ctx.referenceExpression` | `CstNode` \| `CstNode`[] |
| `ctx.simpleAtomicExpression` | `CstNode` \| `CstNode`[] |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="blockexpression" name="blockexpression"></a> blockExpression

▸ **blockExpression**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="chainexpression" name="chainexpression"></a> chainExpression

▸ **chainExpression**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.Dot` | `any` |
| `ctx.lhs` | `CstNode` \| `CstNode`[] |
| `ctx.rhs` | `any`[] |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="combineexpression" name="combineexpression"></a> combineExpression

▸ **combineExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="compareexpression" name="compareexpression"></a> compareExpression

▸ **compareExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="concatexpression" name="concatexpression"></a> concatExpression

▸ **concatExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="constantexpression" name="constantexpression"></a> constantExpression

▸ **constantExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.BooleanLiteralExpression` | `CstNode` \| `CstNode`[] |
| `ctx.NullLiteral` | `IToken`[] |
| `ctx.NumberLiteralExpression` | `CstNode` \| `CstNode`[] |
| `ctx.StringLiteral` | `IToken`[] |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="equalcompareexpression" name="equalcompareexpression"></a> equalCompareExpression

▸ **equalCompareExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="expression" name="expression"></a> expression

▸ **expression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="inexpression" name="inexpression"></a> inExpression

▸ **inExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="keyexpression" name="keyexpression"></a> keyExpression

▸ **keyExpression**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="lazyvariableexpression" name="lazyvariableexpression"></a> lazyVariableExpression

▸ **lazyVariableExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="multiplicationexpression" name="multiplicationexpression"></a> multiplicationExpression

▸ **multiplicationExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="notexpression" name="notexpression"></a> notExpression

▸ **notExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="parenthesisexpression" name="parenthesisexpression"></a> parenthesisExpression

▸ **parenthesisExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="predicateexpression" name="predicateexpression"></a> predicateExpression

▸ **predicateExpression**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.CompareOperator` | `IToken`[] |
| `ctx.EqualCompareOperator` | `IToken`[] |
| `ctx.simpleAtomicExpression` | `CstNode` \| `CstNode`[] |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="rangeexpression" name="rangeexpression"></a> rangeExpression

▸ **rangeExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="recordexpression" name="recordexpression"></a> recordExpression

▸ **recordExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="recordfield" name="recordfield"></a> recordField

▸ **recordField**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="referenceexpression" name="referenceexpression"></a> referenceExpression

▸ **referenceExpression**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="simpleatomicexpression" name="simpleatomicexpression"></a> simpleAtomicExpression

▸ **simpleAtomicExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.FunctionCall` | `CstNode` \| `CstNode`[] |
| `ctx.FunctionName` | `IToken`[] |
| `ctx.arrayExpression` | `CstNode` \| `CstNode`[] |
| `ctx.constantExpression` | `CstNode` \| `CstNode`[] |
| `ctx.lazyVariableExpression` | `CstNode` \| `CstNode`[] |
| `ctx.parenthesisExpression` | `CstNode` \| `CstNode`[] |
| `ctx.recordExpression` | `CstNode` \| `CstNode`[] |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="startexpression" name="startexpression"></a> startExpression

▸ **startExpression**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.Equal` | `any` |
| `ctx.expression` | `CstNode` \| `CstNode`[] |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

___

### <a id="validatevisitor" name="validatevisitor"></a> validateVisitor

▸ **validateVisitor**(): `void`

#### Returns

`void`

#### Inherited from

CodeFragmentCstVisitor.validateVisitor

___

### <a id="visit" name="visit"></a> visit

▸ **visit**(`cstNode`, `param?`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cstNode` | `CstNode` \| `CstNode`[] |
| `param?` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Inherited from

CodeFragmentCstVisitor.visit
