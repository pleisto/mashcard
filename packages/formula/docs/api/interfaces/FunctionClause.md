# Interface: FunctionClause<T, Async, Chain, AcceptError, Arguments\>

## Type parameters

| Name          | Type                                                                        |
| :------------ | :-------------------------------------------------------------------------- |
| `T`           | extends [`UsedFormulaType`](../README.md#usedformulatype)                   |
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

[packages/formula/src/type/index.ts:527](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L527)

---

### <a id="args" name="args"></a> args

• `Readonly` **args**: `Arguments`

#### Defined in

[packages/formula/src/type/index.ts:532](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L532)

---

### <a id="async" name="async"></a> async

• `Readonly` **async**: `Async`

#### Defined in

[packages/formula/src/type/index.ts:520](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L520)

---

### <a id="chain" name="chain"></a> chain

• `Readonly` **chain**: `Chain`

#### Defined in

[packages/formula/src/type/index.ts:521](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L521)

---

### <a id="description" name="description"></a> description

• `Readonly` **description**: `string`

#### Defined in

[packages/formula/src/type/index.ts:528](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L528)

---

### <a id="effect" name="effect"></a> effect

• `Readonly` **effect**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:523](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L523)

---

### <a id="examples" name="examples"></a> examples

• `Readonly` **examples**: [`Example`<`T`\>, ...Example<T\>[]]

#### Defined in

[packages/formula/src/type/index.ts:530](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L530)

---

### <a id="feature" name="feature"></a> feature

• `Optional` `Readonly` **feature**: `string`

#### Defined in

[packages/formula/src/type/index.ts:525](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L525)

---

### <a id="group" name="group"></a> group

• `Readonly` **group**: `string`

#### Defined in

[packages/formula/src/type/index.ts:529](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L529)

---

### <a id="key" name="key"></a> key

• `Optional` `Readonly` **key**: `string`

#### Defined in

[packages/formula/src/type/index.ts:519](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L519)

---

### <a id="lazy" name="lazy"></a> lazy

• `Readonly` **lazy**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:526](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L526)

---

### <a id="name" name="name"></a> name

• `Readonly` **name**: `string`

#### Defined in

[packages/formula/src/type/index.ts:518](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L518)

---

### <a id="persist" name="persist"></a> persist

• `Readonly` **persist**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:524](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L524)

---

### <a id="pure" name="pure"></a> pure

• `Readonly` **pure**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:522](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L522)

---

### <a id="reference" name="reference"></a> reference

• `Readonly` **reference**: (`ctx`: [`FunctionContext`](FunctionContext.md), ...`args`: `ArgumentArrayToResultTypeArray`<`Arguments`, `AcceptError`, []\>) => `Async` extends `true` ? `Promise`<`AnyFunctionResult`<`T`\>\> : `AnyFunctionResult`<`T`\>

#### Type declaration

▸ (`ctx`, ...`args`): `Async` extends `true` ? `Promise`<`AnyFunctionResult`<`T`\>\> : `AnyFunctionResult`<`T`\>

##### Parameters

| Name      | Type                                                              |
| :-------- | :---------------------------------------------------------------- |
| `ctx`     | [`FunctionContext`](FunctionContext.md)                           |
| `...args` | `ArgumentArrayToResultTypeArray`<`Arguments`, `AcceptError`, []\> |

##### Returns

`Async` extends `true` ? `Promise`<`AnyFunctionResult`<`T`\>\> : `AnyFunctionResult`<`T`\>

#### Defined in

[packages/formula/src/type/index.ts:534](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L534)

---

### <a id="returns" name="returns"></a> returns

• `Readonly` **returns**: `T` \| readonly [`T`, `T`]

#### Defined in

[packages/formula/src/type/index.ts:531](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L531)

---

### <a id="testcases" name="testcases"></a> testCases

• `Readonly` **testCases**: `TestCase`<`T`, `ArgumentArrayToDataTypeArray`<`Arguments`, `AcceptError`, []\>\>[]

#### Defined in

[packages/formula/src/type/index.ts:533](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L533)
