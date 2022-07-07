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
- [reference](FunctionClause.md#reference)
- [returns](FunctionClause.md#returns)
- [testCases](FunctionClause.md#testcases)

## Properties

### <a id="accepterror" name="accepterror"></a> acceptError

• `Readonly` **acceptError**: `AcceptError`

#### Defined in

[packages/formula/src/types/index.ts:685](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L685)

---

### <a id="args" name="args"></a> args

• `Readonly` **args**: `Arguments`

#### Defined in

[packages/formula/src/types/index.ts:690](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L690)

---

### <a id="async" name="async"></a> async

• `Readonly` **async**: `Async`

#### Defined in

[packages/formula/src/types/index.ts:678](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L678)

---

### <a id="chain" name="chain"></a> chain

• `Readonly` **chain**: `Chain`

#### Defined in

[packages/formula/src/types/index.ts:679](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L679)

---

### <a id="description" name="description"></a> description

• `Readonly` **description**: `string`

#### Defined in

[packages/formula/src/types/index.ts:686](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L686)

---

### <a id="effect" name="effect"></a> effect

• `Readonly` **effect**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:681](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L681)

---

### <a id="examples" name="examples"></a> examples

• `Readonly` **examples**: [`Example`<`T`\>, ...Example<T\>[]]

#### Defined in

[packages/formula/src/types/index.ts:688](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L688)

---

### <a id="feature" name="feature"></a> feature

• `Optional` `Readonly` **feature**: `string`

#### Defined in

[packages/formula/src/types/index.ts:683](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L683)

---

### <a id="group" name="group"></a> group

• `Readonly` **group**: `string`

#### Defined in

[packages/formula/src/types/index.ts:687](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L687)

---

### <a id="key" name="key"></a> key

• `Optional` `Readonly` **key**: `string`

#### Defined in

[packages/formula/src/types/index.ts:677](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L677)

---

### <a id="lazy" name="lazy"></a> lazy

• `Readonly` **lazy**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:684](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L684)

---

### <a id="name" name="name"></a> name

• `Readonly` **name**: `string`

#### Defined in

[packages/formula/src/types/index.ts:676](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L676)

---

### <a id="persist" name="persist"></a> persist

• `Readonly` **persist**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:682](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L682)

---

### <a id="pure" name="pure"></a> pure

• `Readonly` **pure**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:680](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L680)

---

### <a id="reference" name="reference"></a> reference

• `Readonly` **reference**: (`ctx`: [`FunctionContext`](FunctionContext.md), ...`args`: `ArgumentArrayToResultTypeArray`<`Arguments`, `AcceptError`, []\>) => `Async` extends `true` ? `Promise`<[`AnyFunctionResult`](../README.md#anyfunctionresult)<`T`\>\> : [`AnyFunctionResult`](../README.md#anyfunctionresult)<`T`\>

#### Type declaration

▸ (`ctx`, ...`args`): `Async` extends `true` ? `Promise`<[`AnyFunctionResult`](../README.md#anyfunctionresult)<`T`\>\> : [`AnyFunctionResult`](../README.md#anyfunctionresult)<`T`\>

##### Parameters

| Name      | Type                                                              |
| :-------- | :---------------------------------------------------------------- |
| `ctx`     | [`FunctionContext`](FunctionContext.md)                           |
| `...args` | `ArgumentArrayToResultTypeArray`<`Arguments`, `AcceptError`, []\> |

##### Returns

`Async` extends `true` ? `Promise`<[`AnyFunctionResult`](../README.md#anyfunctionresult)<`T`\>\> : [`AnyFunctionResult`](../README.md#anyfunctionresult)<`T`\>

#### Defined in

[packages/formula/src/types/index.ts:692](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L692)

---

### <a id="returns" name="returns"></a> returns

• `Readonly` **returns**: `T` \| readonly [`T`, `T`]

#### Defined in

[packages/formula/src/types/index.ts:689](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L689)

---

### <a id="testcases" name="testcases"></a> testCases

• `Readonly` **testCases**: `TestCase`<`T`, `ArgumentArrayToDataTypeArray`<`Arguments`, `AcceptError`, []\>\>[]

#### Defined in

[packages/formula/src/types/index.ts:691](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L691)
