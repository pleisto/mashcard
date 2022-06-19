# Interface: ErrorResult

## Hierarchy

- [`BaseResult`](BaseResult.md)

  ↳ **`ErrorResult`**

## Table of contents

### Properties

- [errorKind](ErrorResult.md#errorkind)
- [result](ErrorResult.md#result)
- [subType](ErrorResult.md#subtype)
- [type](ErrorResult.md#type)
- [view](ErrorResult.md#view)

## Properties

### <a id="errorkind" name="errorkind"></a> errorKind

• **errorKind**: [`ErrorType`](../README.md#errortype)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:246](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L246)

---

### <a id="result" name="result"></a> result

• **result**: `string`

#### Overrides

[BaseResult](BaseResult.md).[result](BaseResult.md#result)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:244](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L244)

---

### <a id="subtype" name="subtype"></a> subType

• `Optional` **subType**: `"string"` \| `"number"` \| `"boolean"` \| `"Block"` \| `"null"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"Button"` \| `"Switch"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"` \| `"void"`

#### Inherited from

[BaseResult](BaseResult.md).[subType](BaseResult.md#subtype)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:160](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L160)

---

### <a id="type" name="type"></a> type

• **type**: `"Error"`

#### Overrides

[BaseResult](BaseResult.md).[type](BaseResult.md#type)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:245](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L245)

---

### <a id="view" name="view"></a> view

• `Optional` **view**: [`ViewData`](ViewData.md)<`string`\>

#### Inherited from

[BaseResult](BaseResult.md).[view](BaseResult.md#view)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:158](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L158)
