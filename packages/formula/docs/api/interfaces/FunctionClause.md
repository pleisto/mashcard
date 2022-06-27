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

[packages/formula/src/types/index.ts:678](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L678)

---

### <a id="args" name="args"></a> args

• `Readonly` **args**: `Arguments`

#### Defined in

[packages/formula/src/types/index.ts:683](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L683)

---

### <a id="async" name="async"></a> async

• `Readonly` **async**: `Async`

#### Defined in

[packages/formula/src/types/index.ts:671](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L671)

---

### <a id="chain" name="chain"></a> chain

• `Readonly` **chain**: `Chain`

#### Defined in

[packages/formula/src/types/index.ts:672](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L672)

---

### <a id="description" name="description"></a> description

• `Readonly` **description**: `string`

#### Defined in

[packages/formula/src/types/index.ts:679](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L679)

---

### <a id="effect" name="effect"></a> effect

• `Readonly` **effect**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:674](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L674)

---

### <a id="examples" name="examples"></a> examples

• `Readonly` **examples**: [`Example`<`T`\>, ...Example<T\>[]]

#### Defined in

[packages/formula/src/types/index.ts:681](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L681)

---

### <a id="feature" name="feature"></a> feature

• `Optional` `Readonly` **feature**: `string`

#### Defined in

[packages/formula/src/types/index.ts:676](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L676)

---

### <a id="group" name="group"></a> group

• `Readonly` **group**: `string`

#### Defined in

[packages/formula/src/types/index.ts:680](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L680)

---

### <a id="key" name="key"></a> key

• `Optional` `Readonly` **key**: `string`

#### Defined in

[packages/formula/src/types/index.ts:670](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L670)

---

### <a id="lazy" name="lazy"></a> lazy

• `Readonly` **lazy**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:677](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L677)

---

### <a id="name" name="name"></a> name

• `Readonly` **name**: `string`

#### Defined in

[packages/formula/src/types/index.ts:669](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L669)

---

### <a id="persist" name="persist"></a> persist

• `Readonly` **persist**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:675](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L675)

---

### <a id="pure" name="pure"></a> pure

• `Readonly` **pure**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:673](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L673)

---

### <a id="returns" name="returns"></a> returns

• `Readonly` **returns**: `T` \| readonly [`T`, `T`]

#### Defined in

[packages/formula/src/types/index.ts:682](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L682)

---

### <a id="testcases" name="testcases"></a> testCases

• `Readonly` **testCases**: `TestCase`<`T`, `ArgumentArrayToDataTypeArray`<`Arguments`, `AcceptError`, []\>\>[]

#### Defined in

[packages/formula/src/types/index.ts:684](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L684)

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
