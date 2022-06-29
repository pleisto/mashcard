# Interface: StringResult

## Hierarchy

- [`BaseResult`](BaseResult.md)

  ↳ **`StringResult`**

## Table of contents

### Properties

- [result](StringResult.md#result)
- [subType](StringResult.md#subtype)
- [type](StringResult.md#type)
- [view](StringResult.md#view)

## Properties

### <a id="result" name="result"></a> result

• **result**: `string`

#### Overrides

[BaseResult](BaseResult.md).[result](BaseResult.md#result)

#### Defined in

[packages/formula/src/types/index.ts:173](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L173)

---

### <a id="subtype" name="subtype"></a> subType

• `Optional` **subType**: `"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"Button"` \| `"Switch"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"` \| `"void"`

#### Inherited from

[BaseResult](BaseResult.md).[subType](BaseResult.md#subtype)

#### Defined in

[packages/formula/src/types/index.ts:160](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L160)

---

### <a id="type" name="type"></a> type

• **type**: `"string"`

#### Overrides

[BaseResult](BaseResult.md).[type](BaseResult.md#type)

#### Defined in

[packages/formula/src/types/index.ts:174](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L174)

---

### <a id="view" name="view"></a> view

• `Optional` **view**: [`ViewData`](ViewData.md)<`string`\>

#### Inherited from

[BaseResult](BaseResult.md).[view](BaseResult.md#view)

#### Defined in

[packages/formula/src/types/index.ts:158](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L158)
