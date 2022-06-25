# Interface: AnyFunctionClause<T\>

## Type parameters

| Name | Type                              |
| :--- | :-------------------------------- |
| `T`  | extends `UsedFormulaType` = `any` |

## Table of contents

### Properties

- [acceptError](AnyFunctionClause.md#accepterror)
- [args](AnyFunctionClause.md#args)
- [async](AnyFunctionClause.md#async)
- [chain](AnyFunctionClause.md#chain)
- [description](AnyFunctionClause.md#description)
- [effect](AnyFunctionClause.md#effect)
- [examples](AnyFunctionClause.md#examples)
- [feature](AnyFunctionClause.md#feature)
- [group](AnyFunctionClause.md#group)
- [key](AnyFunctionClause.md#key)
- [lazy](AnyFunctionClause.md#lazy)
- [name](AnyFunctionClause.md#name)
- [persist](AnyFunctionClause.md#persist)
- [pure](AnyFunctionClause.md#pure)
- [returns](AnyFunctionClause.md#returns)
- [testCases](AnyFunctionClause.md#testcases)

### Methods

- [reference](AnyFunctionClause.md#reference)

## Properties

### <a id="accepterror" name="accepterror"></a> acceptError

• `Readonly` **acceptError**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:624](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L624)

---

### <a id="args" name="args"></a> args

• `Readonly` **args**: [`Argument`](Argument.md)<`"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"Button"` \| `"Switch"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"`\>[]

#### Defined in

[packages/formula/src/types/index.ts:629](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L629)

---

### <a id="async" name="async"></a> async

• `Readonly` **async**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:617](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L617)

---

### <a id="chain" name="chain"></a> chain

• `Readonly` **chain**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:618](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L618)

---

### <a id="description" name="description"></a> description

• `Readonly` **description**: `string`

#### Defined in

[packages/formula/src/types/index.ts:625](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L625)

---

### <a id="effect" name="effect"></a> effect

• `Readonly` **effect**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:620](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L620)

---

### <a id="examples" name="examples"></a> examples

• `Readonly` **examples**: [`Example`<`T`\>, ...Example<T\>[]]

#### Defined in

[packages/formula/src/types/index.ts:627](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L627)

---

### <a id="feature" name="feature"></a> feature

• `Optional` `Readonly` **feature**: `string`

#### Defined in

[packages/formula/src/types/index.ts:622](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L622)

---

### <a id="group" name="group"></a> group

• `Readonly` **group**: `string`

#### Defined in

[packages/formula/src/types/index.ts:626](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L626)

---

### <a id="key" name="key"></a> key

• `Optional` `Readonly` **key**: `string`

#### Defined in

[packages/formula/src/types/index.ts:616](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L616)

---

### <a id="lazy" name="lazy"></a> lazy

• `Readonly` **lazy**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:623](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L623)

---

### <a id="name" name="name"></a> name

• `Readonly` **name**: `string`

#### Defined in

[packages/formula/src/types/index.ts:615](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L615)

---

### <a id="persist" name="persist"></a> persist

• `Readonly` **persist**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:621](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L621)

---

### <a id="pure" name="pure"></a> pure

• `Readonly` **pure**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:619](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L619)

---

### <a id="returns" name="returns"></a> returns

• `Readonly` **returns**: `T` \| readonly [`T`, `T`]

#### Defined in

[packages/formula/src/types/index.ts:628](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L628)

---

### <a id="testcases" name="testcases"></a> testCases

• `Readonly` **testCases**: { `input`: (`null` \| `string` \| `number` \| `boolean` \| [`NumberResult`](NumberResult.md) \| [`StringResult`](StringResult.md) \| [`RecordType`](RecordType.md) \| [`AnyResult`](../README.md#anyresult)[] \| `Date` \| [`ColumnType`](ColumnType.md) \| [`RowType`](RowType.md) \| [`RangeType`](RangeType.md) \| [`CellType`](CellType.md) \| [`SpreadsheetType`](SpreadsheetType.md) \| [`BlockType`](BlockType.md) \| [`ButtonType`](ButtonType.md) \| [`SwitchType`](SwitchType.md) \| [`FormulaFunction`, ...FormulaFunction[]] \| `CstNode` \| [`Reference`](../README.md#reference))[] ; `output`: [`AnyFunctionResult`](../README.md#anyfunctionresult)<`T`\> }[]

#### Defined in

[packages/formula/src/types/index.ts:630](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L630)

## Methods

### <a id="reference" name="reference"></a> reference

▸ `Readonly` **reference**(`ctx`, ...`args`): [`AnyFunctionResult`](../README.md#anyfunctionresult)<`T`\> \| `Promise`<[`AnyFunctionResult`](../README.md#anyfunctionresult)<`T`\>\>

#### Parameters

| Name      | Type                                    |
| :-------- | :-------------------------------------- |
| `ctx`     | [`FunctionContext`](FunctionContext.md) |
| `...args` | `any`[]                                 |

#### Returns

[`AnyFunctionResult`](../README.md#anyfunctionresult)<`T`\> \| `Promise`<[`AnyFunctionResult`](../README.md#anyfunctionresult)<`T`\>\>

#### Defined in

[packages/formula/src/types/index.ts:634](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L634)
