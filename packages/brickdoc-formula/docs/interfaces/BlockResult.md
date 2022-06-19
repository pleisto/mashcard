# Interface: BlockResult

## Hierarchy

- [`BaseResult`](BaseResult.md)

  ↳ **`BlockResult`**

## Table of contents

### Properties

- [result](BlockResult.md#result)
- [subType](BlockResult.md#subtype)
- [type](BlockResult.md#type)
- [view](BlockResult.md#view)

## Properties

### <a id="result" name="result"></a> result

• **result**: [`BlockType`](BlockType.md)

#### Overrides

[BaseResult](BaseResult.md).[result](BaseResult.md#result)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:239](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L239)

___

### <a id="subtype" name="subtype"></a> subType

• `Optional` **subType**: ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Date"`` \| ``"Block"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"`` \| ``"any"`` \| ``"void"``

#### Inherited from

[BaseResult](BaseResult.md).[subType](BaseResult.md#subtype)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:160](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L160)

___

### <a id="type" name="type"></a> type

• **type**: ``"Block"``

#### Overrides

[BaseResult](BaseResult.md).[type](BaseResult.md#type)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:240](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L240)

___

### <a id="view" name="view"></a> view

• `Optional` **view**: [`ViewData`](ViewData.md)<`string`\>

#### Inherited from

[BaseResult](BaseResult.md).[view](BaseResult.md#view)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:158](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L158)
