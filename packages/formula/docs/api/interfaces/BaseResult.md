# Interface: BaseResult

## Hierarchy

- **`BaseResult`**

  ↳ [`NumberResult`](NumberResult.md)

  ↳ [`BooleanResult`](BooleanResult.md)

  ↳ [`StringResult`](StringResult.md)

  ↳ [`LiteralResult`](LiteralResult.md)

  ↳ [`NullResult`](NullResult.md)

  ↳ [`BlankResult`](BlankResult.md)

  ↳ [`ArrayResult`](ArrayResult.md)

  ↳ [`RecordResult`](RecordResult.md)

  ↳ [`DateResult`](DateResult.md)

  ↳ [`ColumnResult`](ColumnResult.md)

  ↳ [`RowResult`](RowResult.md)

  ↳ [`CellResult`](CellResult.md)

  ↳ [`RangeResult`](RangeResult.md)

  ↳ [`SpreadsheetResult`](SpreadsheetResult.md)

  ↳ [`BlockResult`](BlockResult.md)

  ↳ [`ErrorResult`](ErrorResult.md)

  ↳ [`PredicateResult`](PredicateResult.md)

  ↳ [`FunctionResult`](FunctionResult.md)

  ↳ [`CstResult`](CstResult.md)

  ↳ [`ReferenceResult`](ReferenceResult.md)

  ↳ [`ButtonResult`](ButtonResult.md)

  ↳ [`SwitchResult`](SwitchResult.md)

  ↳ [`PendingResult`](PendingResult.md)

  ↳ [`WaitingResult`](WaitingResult.md)

  ↳ [`NoPersistResult`](NoPersistResult.md)

## Table of contents

### Properties

- [result](BaseResult.md#result)
- [subType](BaseResult.md#subtype)
- [type](BaseResult.md#type)
- [view](BaseResult.md#view)

## Properties

### <a id="result" name="result"></a> result

• **result**: `any`

#### Defined in

[packages/formula/src/types/index.ts:157](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L157)

---

### <a id="subtype" name="subtype"></a> subType

• `Optional` **subType**: `"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"Button"` \| `"Switch"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"` \| `"void"`

#### Defined in

[packages/formula/src/types/index.ts:160](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L160)

---

### <a id="type" name="type"></a> type

• **type**: `"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"Button"` \| `"Switch"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"`

#### Defined in

[packages/formula/src/types/index.ts:159](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L159)

---

### <a id="view" name="view"></a> view

• `Optional` **view**: [`ViewData`](ViewData.md)<`string`\>

#### Defined in

[packages/formula/src/types/index.ts:158](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L158)
