# Interface: ButtonResult

## Hierarchy

- [`BaseResult`](BaseResult.md)

  ↳ **`ButtonResult`**

## Table of contents

### Properties

- [result](ButtonResult.md#result)
- [subType](ButtonResult.md#subtype)
- [type](ButtonResult.md#type)
- [view](ButtonResult.md#view)

## Properties

### <a id="result" name="result"></a> result

• **result**: [`ButtonType`](ButtonType.md)

#### Overrides

[BaseResult](BaseResult.md).[result](BaseResult.md#result)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:277](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L277)

___

### <a id="subtype" name="subtype"></a> subType

• `Optional` **subType**: ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Date"`` \| ``"Block"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"`` \| ``"any"`` \| ``"void"``

#### Inherited from

[BaseResult](BaseResult.md).[subType](BaseResult.md#subtype)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:160](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L160)

___

### <a id="type" name="type"></a> type

• **type**: ``"Button"``

#### Overrides

[BaseResult](BaseResult.md).[type](BaseResult.md#type)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:276](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L276)

___

### <a id="view" name="view"></a> view

• `Optional` **view**: [`ViewData`](ViewData.md)<`string`\>

#### Inherited from

[BaseResult](BaseResult.md).[view](BaseResult.md#view)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:158](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L158)
