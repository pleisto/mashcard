# Interface: ArrayResult

## Hierarchy

- [`BaseResult`](BaseResult.md)

  ↳ **`ArrayResult`**

## Table of contents

### Properties

- [result](ArrayResult.md#result)
- [subType](ArrayResult.md#subtype)
- [type](ArrayResult.md#type)
- [view](ArrayResult.md#view)

## Properties

### <a id="result" name="result"></a> result

• **result**: [`AnyResult`](../README.md#anyresult)[]

#### Overrides

[BaseResult](BaseResult.md).[result](BaseResult.md#result)

#### Defined in

[packages/formula/src/types/index.ts:193](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L193)

---

### <a id="subtype" name="subtype"></a> subType

• **subType**: `"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"Button"` \| `"Switch"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"` \| `"void"`

#### Overrides

[BaseResult](BaseResult.md).[subType](BaseResult.md#subtype)

#### Defined in

[packages/formula/src/types/index.ts:195](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L195)

---

### <a id="type" name="type"></a> type

• **type**: `"Array"`

#### Overrides

[BaseResult](BaseResult.md).[type](BaseResult.md#type)

#### Defined in

[packages/formula/src/types/index.ts:194](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L194)

---

### <a id="view" name="view"></a> view

• `Optional` **view**: [`ViewData`](ViewData.md)<`string`\>

#### Inherited from

[BaseResult](BaseResult.md).[view](BaseResult.md#view)

#### Defined in

[packages/formula/src/types/index.ts:158](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L158)
