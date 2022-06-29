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

[packages/formula/src/types/index.ts:650](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L650)

---

### <a id="args" name="args"></a> args

• `Readonly` **args**: [`Argument`](Argument.md)<`"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"Button"` \| `"Switch"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"`\>[]

#### Defined in

[packages/formula/src/types/index.ts:655](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L655)

---

### <a id="async" name="async"></a> async

• `Readonly` **async**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:643](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L643)

---

### <a id="chain" name="chain"></a> chain

• `Readonly` **chain**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:644](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L644)

---

### <a id="description" name="description"></a> description

• `Readonly` **description**: `string`

#### Defined in

[packages/formula/src/types/index.ts:651](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L651)

---

### <a id="effect" name="effect"></a> effect

• `Readonly` **effect**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:646](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L646)

---

### <a id="examples" name="examples"></a> examples

• `Readonly` **examples**: [`Example`<`T`\>, ...Example<T\>[]]

#### Defined in

[packages/formula/src/types/index.ts:653](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L653)

---

### <a id="feature" name="feature"></a> feature

• `Optional` `Readonly` **feature**: `string`

#### Defined in

[packages/formula/src/types/index.ts:648](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L648)

---

### <a id="group" name="group"></a> group

• `Readonly` **group**: `string`

#### Defined in

[packages/formula/src/types/index.ts:652](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L652)

---

### <a id="key" name="key"></a> key

• `Optional` `Readonly` **key**: `string`

#### Defined in

[packages/formula/src/types/index.ts:642](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L642)

---

### <a id="lazy" name="lazy"></a> lazy

• `Readonly` **lazy**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:649](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L649)

---

### <a id="name" name="name"></a> name

• `Readonly` **name**: `string`

#### Defined in

[packages/formula/src/types/index.ts:641](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L641)

---

### <a id="persist" name="persist"></a> persist

• `Readonly` **persist**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:647](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L647)

---

### <a id="pure" name="pure"></a> pure

• `Readonly` **pure**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:645](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L645)

---

### <a id="returns" name="returns"></a> returns

• `Readonly` **returns**: `T` \| readonly [`T`, `T`]

#### Defined in

[packages/formula/src/types/index.ts:654](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L654)

---

### <a id="testcases" name="testcases"></a> testCases

• `Readonly` **testCases**: { `input`: (`null` \| `string` \| `number` \| `boolean` \| [`NumberResult`](NumberResult.md) \| [`StringResult`](StringResult.md) \| [`RecordType`](RecordType.md) \| [`AnyResult`](../README.md#anyresult)[] \| `Date` \| [`ColumnType`](ColumnType.md) \| [`RowType`](RowType.md) \| [`RangeType`](RangeType.md) \| [`CellType`](CellType.md) \| [`SpreadsheetType`](SpreadsheetType.md) \| [`BlockType`](BlockType.md) \| [`ButtonType`](ButtonType.md) \| [`SwitchType`](SwitchType.md) \| [`FormulaFunction`, ...FormulaFunction[]] \| `CstNode` \| [`Reference`](../README.md#reference))[] ; `output`: [`AnyFunctionResult`](../README.md#anyfunctionresult)<`T`\> }[]

#### Defined in

[packages/formula/src/types/index.ts:656](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L656)

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
