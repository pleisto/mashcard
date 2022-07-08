# Interface: FunctionClause<T, Async, Chain, AcceptError, Arguments\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`UsedFormulaType`](../README.md#usedformulatype) |
| `Async` | extends `boolean` |
| `Chain` | extends `boolean` |
| `AcceptError` | extends `boolean` |
| `Arguments` | extends `FormulaArgumentsType`<`Chain`\> = `FormulaArgumentsType`<`Chain`\> |

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

[packages/formula/src/type/index.ts:514](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L514)

___

### <a id="args" name="args"></a> args

• `Readonly` **args**: `Arguments`

#### Defined in

[packages/formula/src/type/index.ts:519](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L519)

___

### <a id="async" name="async"></a> async

• `Readonly` **async**: `Async`

#### Defined in

[packages/formula/src/type/index.ts:507](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L507)

___

### <a id="chain" name="chain"></a> chain

• `Readonly` **chain**: `Chain`

#### Defined in

[packages/formula/src/type/index.ts:508](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L508)

___

### <a id="description" name="description"></a> description

• `Readonly` **description**: `string`

#### Defined in

[packages/formula/src/type/index.ts:515](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L515)

___

### <a id="effect" name="effect"></a> effect

• `Readonly` **effect**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:510](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L510)

___

### <a id="examples" name="examples"></a> examples

• `Readonly` **examples**: [`Example`<`T`\>, ...Example<T\>[]]

#### Defined in

[packages/formula/src/type/index.ts:517](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L517)

___

### <a id="feature" name="feature"></a> feature

• `Optional` `Readonly` **feature**: `string`

#### Defined in

[packages/formula/src/type/index.ts:512](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L512)

___

### <a id="group" name="group"></a> group

• `Readonly` **group**: `string`

#### Defined in

[packages/formula/src/type/index.ts:516](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L516)

___

### <a id="key" name="key"></a> key

• `Optional` `Readonly` **key**: `string`

#### Defined in

[packages/formula/src/type/index.ts:506](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L506)

___

### <a id="lazy" name="lazy"></a> lazy

• `Readonly` **lazy**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:513](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L513)

___

### <a id="name" name="name"></a> name

• `Readonly` **name**: `string`

#### Defined in

[packages/formula/src/type/index.ts:505](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L505)

___

### <a id="persist" name="persist"></a> persist

• `Readonly` **persist**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:511](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L511)

___

### <a id="pure" name="pure"></a> pure

• `Readonly` **pure**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:509](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L509)

___

### <a id="reference" name="reference"></a> reference

• `Readonly` **reference**: (`ctx`: [`FunctionContext`](FunctionContext.md), ...`args`: `ArgumentArrayToResultTypeArray`<`Arguments`, `AcceptError`, []\>) => `Async` extends ``true`` ? `Promise`<`AnyFunctionResult`<`T`\>\> : `AnyFunctionResult`<`T`\>

#### Type declaration

▸ (`ctx`, ...`args`): `Async` extends ``true`` ? `Promise`<`AnyFunctionResult`<`T`\>\> : `AnyFunctionResult`<`T`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FunctionContext`](FunctionContext.md) |
| `...args` | `ArgumentArrayToResultTypeArray`<`Arguments`, `AcceptError`, []\> |

##### Returns

`Async` extends ``true`` ? `Promise`<`AnyFunctionResult`<`T`\>\> : `AnyFunctionResult`<`T`\>

#### Defined in

[packages/formula/src/type/index.ts:521](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L521)

___

### <a id="returns" name="returns"></a> returns

• `Readonly` **returns**: `T` \| readonly [`T`, `T`]

#### Defined in

[packages/formula/src/type/index.ts:518](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L518)

___

### <a id="testcases" name="testcases"></a> testCases

• `Readonly` **testCases**: `TestCase`<`T`, `ArgumentArrayToDataTypeArray`<`Arguments`, `AcceptError`, []\>\>[]

#### Defined in

[packages/formula/src/type/index.ts:520](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L520)
