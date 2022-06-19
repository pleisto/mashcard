# Interface: FunctionClause<T, Async, Chain, AcceptError, Arguments\>

## Type parameters

| Name          | Type                                                                        |
| :------------ | :-------------------------------------------------------------------------- |
| `T`           | extends `UsedFormulaType`                                                   |
| `Async`       | extends `boolean`                                                           |
| `Chain`       | extends `boolean`                                                           |
| `AcceptError` | extends `boolean`                                                           |
| `Arguments`   | extends `FormulaArgumentsType`<`Chain`\> = `FormulaArgumentsType`<`Chain`\> |

## Table of contents

### Properties

- [acceptError](FunctionClause.md#accepterror)
- [args](FunctionClause.md#args)
- [async](FunctionClause.md#async)
- [chain](FunctionClause.md#chain)
- [description](FunctionClause.md#description)
- [effect](FunctionClause.md#effect)
- [examples](FunctionClause.md#examples)
- [feature](FunctionClause.md#feature)
- [group](FunctionClause.md#group)
- [key](FunctionClause.md#key)
- [lazy](FunctionClause.md#lazy)
- [name](FunctionClause.md#name)
- [persist](FunctionClause.md#persist)
- [pure](FunctionClause.md#pure)
- [returns](FunctionClause.md#returns)
- [testCases](FunctionClause.md#testcases)

### Methods

- [reference](FunctionClause.md#reference)

## Properties

### <a id="accepterror" name="accepterror"></a> acceptError

• `Readonly` **acceptError**: `AcceptError`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:653](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L653)

---

### <a id="args" name="args"></a> args

• `Readonly` **args**: `Arguments`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:658](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L658)

---

### <a id="async" name="async"></a> async

• `Readonly` **async**: `Async`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:646](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L646)

---

### <a id="chain" name="chain"></a> chain

• `Readonly` **chain**: `Chain`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:647](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L647)

---

### <a id="description" name="description"></a> description

• `Readonly` **description**: `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:654](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L654)

---

### <a id="effect" name="effect"></a> effect

• `Readonly` **effect**: `boolean`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:649](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L649)

---

### <a id="examples" name="examples"></a> examples

• `Readonly` **examples**: [`Example`<`T`\>, ...Example<T\>[]]

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:656](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L656)

---

### <a id="feature" name="feature"></a> feature

• `Optional` `Readonly` **feature**: `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:651](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L651)

---

### <a id="group" name="group"></a> group

• `Readonly` **group**: `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:655](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L655)

---

### <a id="key" name="key"></a> key

• `Optional` `Readonly` **key**: `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:645](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L645)

---

### <a id="lazy" name="lazy"></a> lazy

• `Readonly` **lazy**: `boolean`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:652](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L652)

---

### <a id="name" name="name"></a> name

• `Readonly` **name**: `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:644](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L644)

---

### <a id="persist" name="persist"></a> persist

• `Readonly` **persist**: `boolean`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:650](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L650)

---

### <a id="pure" name="pure"></a> pure

• `Readonly` **pure**: `boolean`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:648](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L648)

---

### <a id="returns" name="returns"></a> returns

• `Readonly` **returns**: `T` \| readonly [`T`, `T`]

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:657](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L657)

---

### <a id="testcases" name="testcases"></a> testCases

• `Readonly` **testCases**: `TestCase`<`T`, `ArgumentArrayToDataTypeArray`<`Arguments`, `AcceptError`, []\>\>[]

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:659](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L659)

## Methods

### <a id="reference" name="reference"></a> reference

▸ `Readonly` **reference**(`ctx`, ...`args`): `Async` extends `true` ? `Promise`<[`AnyFunctionResult`](../README.md#anyfunctionresult)<`T`\>\> : [`AnyFunctionResult`](../README.md#anyfunctionresult)<`T`\>

#### Parameters

| Name      | Type                                                              |
| :-------- | :---------------------------------------------------------------- |
| `ctx`     | [`FunctionContext`](FunctionContext.md)                           |
| `...args` | `ArgumentArrayToResultTypeArray`<`Arguments`, `AcceptError`, []\> |

#### Returns

`Async` extends `true` ? `Promise`<[`AnyFunctionResult`](../README.md#anyfunctionresult)<`T`\>\> : [`AnyFunctionResult`](../README.md#anyfunctionresult)<`T`\>

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:660](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L660)
