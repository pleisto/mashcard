# Interface: LiteralResult

## Hierarchy

- [`BaseResult`](BaseResult.md)

  ↳ **`LiteralResult`**

## Table of contents

### Properties

- [result](LiteralResult.md#result)
- [subType](LiteralResult.md#subtype)
- [type](LiteralResult.md#type)
- [view](LiteralResult.md#view)

## Properties

### <a id="result" name="result"></a> result

• **result**: `string`

#### Overrides

[BaseResult](BaseResult.md).[result](BaseResult.md#result)

#### Defined in

[packages/formula/src/types/index.ts:178](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L178)

___

### <a id="subtype" name="subtype"></a> subType

• `Optional` **subType**: ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"Block"`` \| ``"null"`` \| ``"Date"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"`` \| ``"any"`` \| ``"void"``

#### Inherited from

[BaseResult](BaseResult.md).[subType](BaseResult.md#subtype)

#### Defined in

[packages/formula/src/types/index.ts:160](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L160)

___

### <a id="type" name="type"></a> type

• **type**: ``"literal"``

#### Overrides

[BaseResult](BaseResult.md).[type](BaseResult.md#type)

#### Defined in

[packages/formula/src/types/index.ts:179](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L179)

___

### <a id="view" name="view"></a> view

• `Optional` **view**: [`ViewData`](ViewData.md)<`string`\>

#### Inherited from

[BaseResult](BaseResult.md).[view](BaseResult.md#view)

#### Defined in

[packages/formula/src/types/index.ts:158](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L158)
