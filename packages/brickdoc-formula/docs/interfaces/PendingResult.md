# Interface: PendingResult

## Hierarchy

- [`BaseResult`](BaseResult.md)

  ↳ **`PendingResult`**

## Table of contents

### Properties

- [result](PendingResult.md#result)
- [subType](PendingResult.md#subtype)
- [type](PendingResult.md#type)
- [view](PendingResult.md#view)

## Properties

### <a id="result" name="result"></a> result

• **result**: `string`

#### Overrides

[BaseResult](BaseResult.md).[result](BaseResult.md#result)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:286](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L286)

---

### <a id="subtype" name="subtype"></a> subType

• `Optional` **subType**: `"string"` \| `"number"` \| `"boolean"` \| `"Block"` \| `"null"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"Button"` \| `"Switch"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"` \| `"void"`

#### Inherited from

[BaseResult](BaseResult.md).[subType](BaseResult.md#subtype)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:160](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L160)

---

### <a id="type" name="type"></a> type

• **type**: `"Pending"`

#### Overrides

[BaseResult](BaseResult.md).[type](BaseResult.md#type)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:287](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L287)

---

### <a id="view" name="view"></a> view

• `Optional` **view**: [`ViewData`](ViewData.md)<`string`\>

#### Inherited from

[BaseResult](BaseResult.md).[view](BaseResult.md#view)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:158](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L158)
