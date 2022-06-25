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

| Name                    | Type                                                  |
| :---------------------- | :---------------------------------------------------- |
| `__namedParameters`     | `Object`                                              |
| `__namedParameters.ctx` | [`FunctionContext`](../interfaces/FunctionContext.md) |

#### Overrides

CodeFragmentCstVisitor.constructor

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:77](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L77)

## Properties

### <a id="async" name="async"></a> async

• **async**: `boolean` = `false`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:72](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L72)

---

### <a id="blockdependencies" name="blockdependencies"></a> blockDependencies

• **blockDependencies**: `string`[] = `[]`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:69](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L69)

---

### <a id="ctx" name="ctx"></a> ctx

• **ctx**: [`FunctionContext`](../interfaces/FunctionContext.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:64](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L64)

---

### <a id="effect" name="effect"></a> effect

• **effect**: `boolean` = `false`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:74](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L74)

---

### <a id="eventdependencies" name="eventdependencies"></a> eventDependencies

• **eventDependencies**: [`EventDependency`](../interfaces/EventDependency.md)<[`FormulaEventPayload`](../interfaces/FormulaEventPayload.md)<`any`\>\>[] = `[]`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:68](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L68)

---

### <a id="flattenvariabledependencies" name="flattenvariabledependencies"></a> flattenVariableDependencies

• **flattenVariableDependencies**: [`VariableDependency`](../interfaces/VariableDependency.md)[] = `[]`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:70](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L70)

---

### <a id="functiondependencies" name="functiondependencies"></a> functionDependencies

• **functionDependencies**: [`AnyFunctionClauseWithKeyAndExample`](../README.md#anyfunctionclausewithkeyandexample)[] = `[]`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:67](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L67)

---

### <a id="kind" name="kind"></a> kind

• **kind**: `"expression"` \| `"constant"` = `'constant'`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:71](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L71)

---

### <a id="namedependencies" name="namedependencies"></a> nameDependencies

• **nameDependencies**: [`NameDependency`](../interfaces/NameDependency.md)[] = `[]`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:66](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L66)

---

### <a id="persist" name="persist"></a> persist

• **persist**: `boolean` = `false`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:75](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L75)

---

### <a id="pure" name="pure"></a> pure

• **pure**: `boolean` = `true`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:73](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L73)

---

### <a id="variabledependencies" name="variabledependencies"></a> variableDependencies

• **variableDependencies**: [`VariableDependency`](../interfaces/VariableDependency.md)[] = `[]`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:65](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L65)

## Methods

### <a id="arguments" name="arguments"></a> Arguments

▸ **Arguments**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name                | Type                                                        |
| :------------------ | :---------------------------------------------------------- |
| `ctx`               | `Object`                                                    |
| `ctx.Comma`         | `IToken`[]                                                  |
| `ctx.expression`    | `any`[]                                                     |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:957](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L957)

---

### <a id="booleanliteralexpression" name="booleanliteralexpression"></a> BooleanLiteralExpression

▸ **BooleanLiteralExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name                 | Type                                                        |
| :------------------- | :---------------------------------------------------------- |
| `ctx`                | `Object`                                                    |
| `ctx.BooleanLiteral` | `IToken`[]                                                  |
| `args`               | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:702](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L702)

---

### <a id="functioncall" name="functioncall"></a> FunctionCall

▸ **FunctionCall**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name                | Type                                                        |
| :------------------ | :---------------------------------------------------------- |
| `ctx`               | `Object`                                                    |
| `ctx.Arguments`     | `CstNode` \| `CstNode`[]                                    |
| `ctx.FunctionName`  | { `image`: `any` }[]                                        |
| `ctx.LParen`        | `IToken`[]                                                  |
| `ctx.RParen`        | `IToken`[]                                                  |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:804](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L804)

---

### <a id="functionnameexpression" name="functionnameexpression"></a> FunctionNameExpression

▸ **FunctionNameExpression**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name                | Type                                                        |
| :------------------ | :---------------------------------------------------------- |
| `ctx`               | `any`                                                       |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:665](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L665)

---

### <a id="numberliteralexpression" name="numberliteralexpression"></a> NumberLiteralExpression

▸ **NumberLiteralExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name                 | Type                                                        |
| :------------------- | :---------------------------------------------------------- |
| `ctx`                | `Object`                                                    |
| `ctx.DecimalLiteral` | `IToken`[]                                                  |
| `ctx.Minus`          | `IToken`[]                                                  |
| `ctx.NumberLiteral`  | `IToken`[]                                                  |
| `ctx.Sign`           | `IToken`[]                                                  |
| `args`               | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:687](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L687)

---

### <a id="stringliteralexpression" name="stringliteralexpression"></a> StringLiteralExpression

▸ **StringLiteralExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `ctx`  | `any`                                                       |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:675](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L675)

---

### <a id="accessexpression" name="accessexpression"></a> accessExpression

▸ **accessExpression**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name                | Type                                                        |
| :------------------ | :---------------------------------------------------------- |
| `ctx`               | `any`                                                       |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:195](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L195)

---

### <a id="additionexpression" name="additionexpression"></a> additionExpression

▸ **additionExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `ctx`  | `any`                                                       |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:162](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L162)

---

### <a id="arrayexpression" name="arrayexpression"></a> arrayExpression

▸ **arrayExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `ctx`  | `any`                                                       |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:584](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L584)

---

### <a id="atomicexpression" name="atomicexpression"></a> atomicExpression

▸ **atomicExpression**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name                         | Type                                                        |
| :--------------------------- | :---------------------------------------------------------- |
| `ctx`                        | `Object`                                                    |
| `ctx.blockExpression`        | `CstNode` \| `CstNode`[]                                    |
| `ctx.predicateExpression`    | `CstNode` \| `CstNode`[]                                    |
| `ctx.referenceExpression`    | `CstNode` \| `CstNode`[]                                    |
| `ctx.simpleAtomicExpression` | `CstNode` \| `CstNode`[]                                    |
| `__namedParameters`          | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:485](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L485)

---

### <a id="blockexpression" name="blockexpression"></a> blockExpression

▸ **blockExpression**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name                | Type                                                        |
| :------------------ | :---------------------------------------------------------- |
| `ctx`               | `any`                                                       |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:714](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L714)

---

### <a id="chainexpression" name="chainexpression"></a> chainExpression

▸ **chainExpression**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name                | Type                                                        |
| :------------------ | :---------------------------------------------------------- |
| `ctx`               | `Object`                                                    |
| `ctx.Dot`           | `any`                                                       |
| `ctx.lhs`           | `CstNode` \| `CstNode`[]                                    |
| `ctx.rhs`           | `any`[]                                                     |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:275](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L275)

---

### <a id="combineexpression" name="combineexpression"></a> combineExpression

▸ **combineExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `ctx`  | `any`                                                       |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:107](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L107)

---

### <a id="compareexpression" name="compareexpression"></a> compareExpression

▸ **compareExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `ctx`  | `any`                                                       |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:129](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L129)

---

### <a id="concatexpression" name="concatexpression"></a> concatExpression

▸ **concatExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `ctx`  | `any`                                                       |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:151](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L151)

---

### <a id="constantexpression" name="constantexpression"></a> constantExpression

▸ **constantExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name                           | Type                                                        |
| :----------------------------- | :---------------------------------------------------------- |
| `ctx`                          | `Object`                                                    |
| `ctx.BooleanLiteralExpression` | `CstNode` \| `CstNode`[]                                    |
| `ctx.NullLiteral`              | `IToken`[]                                                  |
| `ctx.NumberLiteralExpression`  | `CstNode` \| `CstNode`[]                                    |
| `ctx.StringLiteral`            | `IToken`[]                                                  |
| `args`                         | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:634](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L634)

---

### <a id="equalcompareexpression" name="equalcompareexpression"></a> equalCompareExpression

▸ **equalCompareExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `ctx`  | `any`                                                       |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:118](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L118)

---

### <a id="expression" name="expression"></a> expression

▸ **expression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `ctx`  | `any`                                                       |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:96](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L96)

---

### <a id="inexpression" name="inexpression"></a> inExpression

▸ **inExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `ctx`  | `any`                                                       |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:140](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L140)

---

### <a id="keyexpression" name="keyexpression"></a> keyExpression

▸ **keyExpression**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name                | Type                                                        |
| :------------------ | :---------------------------------------------------------- |
| `ctx`               | `any`                                                       |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:433](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L433)

---

### <a id="lazyvariableexpression" name="lazyvariableexpression"></a> lazyVariableExpression

▸ **lazyVariableExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `ctx`  | `any`                                                       |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:763](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L763)

---

### <a id="multiplicationexpression" name="multiplicationexpression"></a> multiplicationExpression

▸ **multiplicationExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `ctx`  | `any`                                                       |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:173](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L173)

---

### <a id="notexpression" name="notexpression"></a> notExpression

▸ **notExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `ctx`  | `any`                                                       |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:184](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L184)

---

### <a id="parenthesisexpression" name="parenthesisexpression"></a> parenthesisExpression

▸ **parenthesisExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `ctx`  | `any`                                                       |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:621](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L621)

---

### <a id="predicateexpression" name="predicateexpression"></a> predicateExpression

▸ **predicateExpression**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name                         | Type                                                        |
| :--------------------------- | :---------------------------------------------------------- |
| `ctx`                        | `Object`                                                    |
| `ctx.CompareOperator`        | `IToken`[]                                                  |
| `ctx.EqualCompareOperator`   | `IToken`[]                                                  |
| `ctx.simpleAtomicExpression` | `CstNode` \| `CstNode`[]                                    |
| `__namedParameters`          | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:543](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L543)

---

### <a id="rangeexpression" name="rangeexpression"></a> rangeExpression

▸ **rangeExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `ctx`  | `any`                                                       |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:264](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L264)

---

### <a id="recordexpression" name="recordexpression"></a> recordExpression

▸ **recordExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `ctx`  | `any`                                                       |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:597](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L597)

---

### <a id="recordfield" name="recordfield"></a> recordField

▸ **recordField**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `ctx`  | `any`                                                       |
| `args` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:610](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L610)

---

### <a id="referenceexpression" name="referenceexpression"></a> referenceExpression

▸ **referenceExpression**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name                | Type                                                        |
| :------------------ | :---------------------------------------------------------- |
| `ctx`               | `any`                                                       |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:508](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L508)

---

### <a id="simpleatomicexpression" name="simpleatomicexpression"></a> simpleAtomicExpression

▸ **simpleAtomicExpression**(`ctx`, `args`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name                         | Type                                                        |
| :--------------------------- | :---------------------------------------------------------- |
| `ctx`                        | `Object`                                                    |
| `ctx.FunctionCall`           | `CstNode` \| `CstNode`[]                                    |
| `ctx.FunctionName`           | `IToken`[]                                                  |
| `ctx.arrayExpression`        | `CstNode` \| `CstNode`[]                                    |
| `ctx.constantExpression`     | `CstNode` \| `CstNode`[]                                    |
| `ctx.lazyVariableExpression` | `CstNode` \| `CstNode`[]                                    |
| `ctx.parenthesisExpression`  | `CstNode` \| `CstNode`[]                                    |
| `ctx.recordExpression`       | `CstNode` \| `CstNode`[]                                    |
| `args`                       | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:445](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L445)

---

### <a id="startexpression" name="startexpression"></a> startExpression

▸ **startExpression**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name                | Type                                                        |
| :------------------ | :---------------------------------------------------------- |
| `ctx`               | `Object`                                                    |
| `ctx.Equal`         | `any`                                                       |
| `ctx.expression`    | `CstNode` \| `CstNode`[]                                    |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:83](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L83)

---

### <a id="validatevisitor" name="validatevisitor"></a> validateVisitor

▸ **validateVisitor**(): `void`

#### Returns

`void`

#### Inherited from

CodeFragmentCstVisitor.validateVisitor

#### Defined in

node_modules/@chevrotain/types/api.d.ts:1897

---

### <a id="visit" name="visit"></a> visit

▸ **visit**(`cstNode`, `param?`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name      | Type                                                        |
| :-------- | :---------------------------------------------------------- |
| `cstNode` | `CstNode` \| `CstNode`[]                                    |
| `param?`  | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Inherited from

CodeFragmentCstVisitor.visit

#### Defined in

node_modules/@chevrotain/types/api.d.ts:1896
