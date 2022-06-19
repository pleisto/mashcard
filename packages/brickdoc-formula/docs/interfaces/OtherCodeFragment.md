# Interface: OtherCodeFragment

## Hierarchy

- [`BaseCodeFragment`](BaseCodeFragment.md)

  ↳ **`OtherCodeFragment`**

## Table of contents

### Properties

- [attrs](OtherCodeFragment.md#attrs)
- [code](OtherCodeFragment.md#code)
- [display](OtherCodeFragment.md#display)
- [errors](OtherCodeFragment.md#errors)
- [namespaceId](OtherCodeFragment.md#namespaceid)
- [replacements](OtherCodeFragment.md#replacements)
- [type](OtherCodeFragment.md#type)

## Properties

### <a id="attrs" name="attrs"></a> attrs

• `Readonly` **attrs**: `undefined`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:693](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L693)

___

### <a id="code" name="code"></a> code

• `Readonly` **code**: [`SimpleCodeFragmentType`](../README.md#simplecodefragmenttype) \| [`SpecialCodeFragmentType`](../README.md#specialcodefragmenttype)

#### Overrides

[BaseCodeFragment](BaseCodeFragment.md).[code](BaseCodeFragment.md#code)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:692](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L692)

___

### <a id="display" name="display"></a> display

• `Readonly` **display**: `string`

#### Inherited from

[BaseCodeFragment](BaseCodeFragment.md).[display](BaseCodeFragment.md#display)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:681](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L681)

___

### <a id="errors" name="errors"></a> errors

• `Readonly` **errors**: [`ErrorMessage`](ErrorMessage.md)[]

#### Inherited from

[BaseCodeFragment](BaseCodeFragment.md).[errors](BaseCodeFragment.md#errors)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:685](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L685)

___

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• `Optional` `Readonly` **namespaceId**: `string`

#### Inherited from

[BaseCodeFragment](BaseCodeFragment.md).[namespaceId](BaseCodeFragment.md#namespaceid)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:683](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L683)

___

### <a id="replacements" name="replacements"></a> replacements

• `Optional` `Readonly` **replacements**: [`string`, ...string[]]

#### Inherited from

[BaseCodeFragment](BaseCodeFragment.md).[replacements](BaseCodeFragment.md#replacements)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:682](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L682)

___

### <a id="type" name="type"></a> type

• `Readonly` **type**: ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Date"`` \| ``"Block"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"`` \| ``"any"`` \| ``"void"``

#### Inherited from

[BaseCodeFragment](BaseCodeFragment.md).[type](BaseCodeFragment.md#type)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:684](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L684)
