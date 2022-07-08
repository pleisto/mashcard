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
- [meta](OtherCodeFragment.md#meta)
- [namespaceId](OtherCodeFragment.md#namespaceid)
- [replacements](OtherCodeFragment.md#replacements)
- [type](OtherCodeFragment.md#type)

## Properties

### <a id="attrs" name="attrs"></a> attrs

• `Readonly` **attrs**: `undefined`

#### Defined in

[packages/formula/src/type/index.ts:555](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L555)

___

### <a id="code" name="code"></a> code

• `Readonly` **code**: [`SimpleCodeFragmentType`](../README.md#simplecodefragmenttype) \| [`SpecialCodeFragmentType`](../README.md#specialcodefragmenttype)

#### Overrides

[BaseCodeFragment](BaseCodeFragment.md).[code](BaseCodeFragment.md#code)

#### Defined in

[packages/formula/src/type/index.ts:554](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L554)

___

### <a id="display" name="display"></a> display

• `Readonly` **display**: `string`

#### Inherited from

[BaseCodeFragment](BaseCodeFragment.md).[display](BaseCodeFragment.md#display)

#### Defined in

[packages/formula/src/type/index.ts:542](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L542)

___

### <a id="errors" name="errors"></a> errors

• `Readonly` **errors**: [`ErrorMessage`](ErrorMessage.md)[]

#### Inherited from

[BaseCodeFragment](BaseCodeFragment.md).[errors](BaseCodeFragment.md#errors)

#### Defined in

[packages/formula/src/type/index.ts:546](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L546)

___

### <a id="meta" name="meta"></a> meta

• `Optional` `Readonly` **meta**: `any`

#### Inherited from

[BaseCodeFragment](BaseCodeFragment.md).[meta](BaseCodeFragment.md#meta)

#### Defined in

[packages/formula/src/type/index.ts:547](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L547)

___

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• `Optional` `Readonly` **namespaceId**: `string`

#### Inherited from

[BaseCodeFragment](BaseCodeFragment.md).[namespaceId](BaseCodeFragment.md#namespaceid)

#### Defined in

[packages/formula/src/type/index.ts:544](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L544)

___

### <a id="replacements" name="replacements"></a> replacements

• `Optional` `Readonly` **replacements**: [`string`, ...string[]]

#### Inherited from

[BaseCodeFragment](BaseCodeFragment.md).[replacements](BaseCodeFragment.md#replacements)

#### Defined in

[packages/formula/src/type/index.ts:543](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L543)

___

### <a id="type" name="type"></a> type

• `Readonly` **type**: ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Block"`` \| ``"Date"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"`` \| ``"any"`` \| ``"void"``

#### Inherited from

[BaseCodeFragment](BaseCodeFragment.md).[type](BaseCodeFragment.md#type)

#### Defined in

[packages/formula/src/type/index.ts:545](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L545)
