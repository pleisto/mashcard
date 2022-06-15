# Class: FormulaInterpreter

## Hierarchy

- `InterpretCstVisitor`

  ↳ **`FormulaInterpreter`**

## Table of contents

### Constructors

- [constructor](FormulaInterpreter.md#constructor)

### Properties

- [ctx](FormulaInterpreter.md#ctx)
- [lazy](FormulaInterpreter.md#lazy)
- [runtimeEventDependencies](FormulaInterpreter.md#runtimeeventdependencies)

### Methods

- [Arguments](FormulaInterpreter.md#arguments)
- [BooleanLiteralExpression](FormulaInterpreter.md#booleanliteralexpression)
- [FunctionCall](FormulaInterpreter.md#functioncall)
- [FunctionNameExpression](FormulaInterpreter.md#functionnameexpression)
- [NumberLiteralExpression](FormulaInterpreter.md#numberliteralexpression)
- [StringLiteralExpression](FormulaInterpreter.md#stringliteralexpression)
- [accessExpression](FormulaInterpreter.md#accessexpression)
- [additionExpression](FormulaInterpreter.md#additionexpression)
- [arrayExpression](FormulaInterpreter.md#arrayexpression)
- [atomicExpression](FormulaInterpreter.md#atomicexpression)
- [blockExpression](FormulaInterpreter.md#blockexpression)
- [chainExpression](FormulaInterpreter.md#chainexpression)
- [combineExpression](FormulaInterpreter.md#combineexpression)
- [compareExpression](FormulaInterpreter.md#compareexpression)
- [concatExpression](FormulaInterpreter.md#concatexpression)
- [constantExpression](FormulaInterpreter.md#constantexpression)
- [equalCompareExpression](FormulaInterpreter.md#equalcompareexpression)
- [expression](FormulaInterpreter.md#expression)
- [inExpression](FormulaInterpreter.md#inexpression)
- [keyExpression](FormulaInterpreter.md#keyexpression)
- [lazyVariableExpression](FormulaInterpreter.md#lazyvariableexpression)
- [multiplicationExpression](FormulaInterpreter.md#multiplicationexpression)
- [notExpression](FormulaInterpreter.md#notexpression)
- [parenthesisExpression](FormulaInterpreter.md#parenthesisexpression)
- [predicateExpression](FormulaInterpreter.md#predicateexpression)
- [rangeExpression](FormulaInterpreter.md#rangeexpression)
- [recordExpression](FormulaInterpreter.md#recordexpression)
- [recordField](FormulaInterpreter.md#recordfield)
- [referenceExpression](FormulaInterpreter.md#referenceexpression)
- [simpleAtomicExpression](FormulaInterpreter.md#simpleatomicexpression)
- [startExpression](FormulaInterpreter.md#startexpression)
- [validateVisitor](FormulaInterpreter.md#validatevisitor)
- [visit](FormulaInterpreter.md#visit)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new FormulaInterpreter**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.ctx` | [`FunctionContext`](../interfaces/FunctionContext.md) |

#### Overrides

InterpretCstVisitor.constructor

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:62](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L62)

## Properties

### <a id="ctx" name="ctx"></a> ctx

• **ctx**: [`FunctionContext`](../interfaces/FunctionContext.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:58](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L58)

___

### <a id="lazy" name="lazy"></a> lazy

• **lazy**: `boolean` = `false`

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:59](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L59)

___

### <a id="runtimeeventdependencies" name="runtimeeventdependencies"></a> runtimeEventDependencies

• **runtimeEventDependencies**: [`EventDependency`](../interfaces/EventDependency.md)<[`FormulaEventPayload`](../interfaces/FormulaEventPayload.md)<`any`\>\>[] = `[]`

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:60](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L60)

## Methods

### <a id="arguments" name="arguments"></a> Arguments

▸ **Arguments**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:569](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L569)

___

### <a id="booleanliteralexpression" name="booleanliteralexpression"></a> BooleanLiteralExpression

▸ **BooleanLiteralExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.BooleanLiteral` | `IToken`[] |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:463](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L463)

___

### <a id="functioncall" name="functioncall"></a> FunctionCall

▸ **FunctionCall**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.Arguments` | `CstNode`[] |
| `ctx.FunctionName` | { `image`: `any`  }[] |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:475](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L475)

___

### <a id="functionnameexpression" name="functionnameexpression"></a> FunctionNameExpression

▸ **FunctionNameExpression**(`ctx`, `args`): [`AnyResult`](../README.md#anyresult)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.FunctionName` | { `image`: `any`  }[] |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

[`AnyResult`](../README.md#anyresult)

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:346](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L346)

___

### <a id="numberliteralexpression" name="numberliteralexpression"></a> NumberLiteralExpression

▸ **NumberLiteralExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.DecimalLiteral?` | `IToken`[] |
| `ctx.Minus?` | `IToken`[] |
| `ctx.NumberLiteral?` | `IToken`[] |
| `ctx.Sign?` | `IToken`[] |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:449](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L449)

___

### <a id="stringliteralexpression" name="stringliteralexpression"></a> StringLiteralExpression

▸ **StringLiteralExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.StringLiteral` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:335](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L335)

___

### <a id="accessexpression" name="accessexpression"></a> accessExpression

▸ **accessExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:161](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L161)

___

### <a id="additionexpression" name="additionexpression"></a> additionExpression

▸ **additionExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:139](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L139)

___

### <a id="arrayexpression" name="arrayexpression"></a> arrayExpression

▸ **arrayExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:291](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L291)

___

### <a id="atomicexpression" name="atomicexpression"></a> atomicExpression

▸ **atomicExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.blockExpression` | `CstNode` \| `CstNode`[] |
| `ctx.predicateExpression` | `CstNode` \| `CstNode`[] |
| `ctx.referenceExpression` | `CstNode` \| `CstNode`[] |
| `ctx.simpleAtomicExpression` | `CstNode` \| `CstNode`[] |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:256](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L256)

___

### <a id="blockexpression" name="blockexpression"></a> blockExpression

▸ **blockExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:383](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L383)

___

### <a id="chainexpression" name="chainexpression"></a> chainExpression

▸ **chainExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:194](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L194)

___

### <a id="combineexpression" name="combineexpression"></a> combineExpression

▸ **combineExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:84](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L84)

___

### <a id="compareexpression" name="compareexpression"></a> compareExpression

▸ **compareExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:106](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L106)

___

### <a id="concatexpression" name="concatexpression"></a> concatExpression

▸ **concatExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:128](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L128)

___

### <a id="constantexpression" name="constantexpression"></a> constantExpression

▸ **constantExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.BooleanLiteralExpression` | `CstNode` \| `CstNode`[] |
| `ctx.NullLiteral` | `IToken`[] |
| `ctx.NumberLiteralExpression` | `CstNode` \| `CstNode`[] |
| `ctx.StringLiteral` | `IToken`[] |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:354](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L354)

___

### <a id="equalcompareexpression" name="equalcompareexpression"></a> equalCompareExpression

▸ **equalCompareExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:95](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L95)

___

### <a id="expression" name="expression"></a> expression

▸ **expression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:73](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L73)

___

### <a id="inexpression" name="inexpression"></a> inExpression

▸ **inExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:117](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L117)

___

### <a id="keyexpression" name="keyexpression"></a> keyExpression

▸ **keyExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:205](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L205)

___

### <a id="lazyvariableexpression" name="lazyvariableexpression"></a> lazyVariableExpression

▸ **lazyVariableExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:402](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L402)

___

### <a id="multiplicationexpression" name="multiplicationexpression"></a> multiplicationExpression

▸ **multiplicationExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:150](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L150)

___

### <a id="notexpression" name="notexpression"></a> notExpression

▸ **notExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:172](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L172)

___

### <a id="parenthesisexpression" name="parenthesisexpression"></a> parenthesisExpression

▸ **parenthesisExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:324](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L324)

___

### <a id="predicateexpression" name="predicateexpression"></a> predicateExpression

▸ **predicateExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:279](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L279)

___

### <a id="rangeexpression" name="rangeexpression"></a> rangeExpression

▸ **rangeExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:183](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L183)

___

### <a id="recordexpression" name="recordexpression"></a> recordExpression

▸ **recordExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:302](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L302)

___

### <a id="recordfield" name="recordfield"></a> recordField

▸ **recordField**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `any` |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:313](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L313)

___

### <a id="referenceexpression" name="referenceexpression"></a> referenceExpression

▸ **referenceExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.lazyVariableExpression` | `CstNode` \| `CstNode`[] |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:395](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L395)

___

### <a id="simpleatomicexpression" name="simpleatomicexpression"></a> simpleAtomicExpression

▸ **simpleAtomicExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

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
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:217](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L217)

___

### <a id="startexpression" name="startexpression"></a> startExpression

▸ **startExpression**(`ctx`, `args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Object` |
| `ctx.expression` | `CstNode` \| `CstNode`[] |
| `args` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/interpreter.ts:69](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/interpreter.ts#L69)

___

### <a id="validatevisitor" name="validatevisitor"></a> validateVisitor

▸ **validateVisitor**(): `void`

#### Returns

`void`

#### Inherited from

InterpretCstVisitor.validateVisitor

#### Defined in

node_modules/@chevrotain/types/api.d.ts:1897

___

### <a id="visit" name="visit"></a> visit

▸ **visit**(`cstNode`, `param?`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cstNode` | `CstNode` \| `CstNode`[] |
| `param?` | [`InterpretArgument`](../interfaces/InterpretArgument.md) |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Inherited from

InterpretCstVisitor.visit

#### Defined in

node_modules/@chevrotain/types/api.d.ts:1896
