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

[packages/formula/src/grammar/codeFragment.ts:79](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L79)

## Properties

### <a id="async" name="async"></a> async

• **async**: `boolean` = `false`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:74](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L74)

---

### <a id="blockdependencies" name="blockdependencies"></a> blockDependencies

• **blockDependencies**: `string`[] = `[]`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:71](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L71)

---

### <a id="ctx" name="ctx"></a> ctx

• **ctx**: [`FunctionContext`](../interfaces/FunctionContext.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:66](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L66)

---

### <a id="effect" name="effect"></a> effect

• **effect**: `boolean` = `false`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:76](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L76)

---

### <a id="eventdependencies" name="eventdependencies"></a> eventDependencies

• **eventDependencies**: [`EventDependency`](../interfaces/EventDependency.md)<[`FormulaEventPayload`](../interfaces/FormulaEventPayload.md)<`any`\>\>[] = `[]`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:70](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L70)

---

### <a id="flattenvariabledependencies" name="flattenvariabledependencies"></a> flattenVariableDependencies

• **flattenVariableDependencies**: [`VariableDependency`](../interfaces/VariableDependency.md)[] = `[]`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:72](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L72)

---

### <a id="functiondependencies" name="functiondependencies"></a> functionDependencies

• **functionDependencies**: [`AnyFunctionClauseWithKeyAndExample`](../README.md#anyfunctionclausewithkeyandexample)[] = `[]`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:69](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L69)

---

### <a id="kind" name="kind"></a> kind

• **kind**: `"expression"` \| `"constant"` = `'constant'`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:73](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L73)

---

### <a id="namedependencies" name="namedependencies"></a> nameDependencies

• **nameDependencies**: [`NameDependency`](../interfaces/NameDependency.md)[] = `[]`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:68](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L68)

---

### <a id="persist" name="persist"></a> persist

• **persist**: `boolean` = `false`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:77](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L77)

---

### <a id="pure" name="pure"></a> pure

• **pure**: `boolean` = `true`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:75](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L75)

---

### <a id="variabledependencies" name="variabledependencies"></a> variableDependencies

• **variableDependencies**: [`VariableDependency`](../interfaces/VariableDependency.md)[] = `[]`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:67](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L67)

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

[packages/formula/src/grammar/codeFragment.ts:970](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L970)

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

[packages/formula/src/grammar/codeFragment.ts:699](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L699)

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

[packages/formula/src/grammar/codeFragment.ts:801](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L801)

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

[packages/formula/src/grammar/codeFragment.ts:662](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L662)

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

[packages/formula/src/grammar/codeFragment.ts:684](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L684)

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

[packages/formula/src/grammar/codeFragment.ts:672](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L672)

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

[packages/formula/src/grammar/codeFragment.ts:188](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L188)

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

[packages/formula/src/grammar/codeFragment.ts:155](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L155)

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

[packages/formula/src/grammar/codeFragment.ts:581](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L581)

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

[packages/formula/src/grammar/codeFragment.ts:482](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L482)

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

[packages/formula/src/grammar/codeFragment.ts:711](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L711)

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

[packages/formula/src/grammar/codeFragment.ts:270](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L270)

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

[packages/formula/src/grammar/codeFragment.ts:100](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L100)

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

[packages/formula/src/grammar/codeFragment.ts:122](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L122)

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

[packages/formula/src/grammar/codeFragment.ts:144](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L144)

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

[packages/formula/src/grammar/codeFragment.ts:631](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L631)

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

[packages/formula/src/grammar/codeFragment.ts:111](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L111)

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

[packages/formula/src/grammar/codeFragment.ts:89](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L89)

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

[packages/formula/src/grammar/codeFragment.ts:133](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L133)

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

[packages/formula/src/grammar/codeFragment.ts:430](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L430)

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

[packages/formula/src/grammar/codeFragment.ts:760](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L760)

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

[packages/formula/src/grammar/codeFragment.ts:166](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L166)

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

[packages/formula/src/grammar/codeFragment.ts:177](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L177)

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

[packages/formula/src/grammar/codeFragment.ts:618](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L618)

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

[packages/formula/src/grammar/codeFragment.ts:540](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L540)

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

[packages/formula/src/grammar/codeFragment.ts:259](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L259)

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

[packages/formula/src/grammar/codeFragment.ts:594](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L594)

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

[packages/formula/src/grammar/codeFragment.ts:607](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L607)

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

[packages/formula/src/grammar/codeFragment.ts:505](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L505)

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

[packages/formula/src/grammar/codeFragment.ts:442](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L442)

---

### <a id="startexpression" name="startexpression"></a> startExpression

▸ **startExpression**(`ctx`, `__namedParameters`): [`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Parameters

| Name                | Type                                                        |
| :------------------ | :---------------------------------------------------------- |
| `ctx`               | `Object`                                                    |
| `ctx.expression`    | `CstNode` \| `CstNode`[]                                    |
| `__namedParameters` | [`CstVisitorArgument`](../interfaces/CstVisitorArgument.md) |

#### Returns

[`CodeFragmentResult`](../interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:85](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L85)

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
