# Interface: BaseCodeFragment

## Hierarchy

- **`BaseCodeFragment`**

  ↳ [`SpecialCodeFragment`](SpecialCodeFragment.md)

  ↳ [`OtherCodeFragment`](OtherCodeFragment.md)

## Table of contents

### Properties

- [code](BaseCodeFragment.md#code)
- [display](BaseCodeFragment.md#display)
- [errors](BaseCodeFragment.md#errors)
- [meta](BaseCodeFragment.md#meta)
- [namespaceId](BaseCodeFragment.md#namespaceid)
- [replacements](BaseCodeFragment.md#replacements)
- [type](BaseCodeFragment.md#type)

## Properties

### <a id="code" name="code"></a> code

• `Readonly` **code**: [`CodeFragmentCodes`](../README.md#codefragmentcodes)

#### Defined in

[packages/formula/src/type/index.ts:541](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L541)

___

### <a id="display" name="display"></a> display

• `Readonly` **display**: `string`

#### Defined in

[packages/formula/src/type/index.ts:542](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L542)

___

### <a id="errors" name="errors"></a> errors

• `Readonly` **errors**: [`ErrorMessage`](ErrorMessage.md)[]

#### Defined in

[packages/formula/src/type/index.ts:546](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L546)

___

### <a id="meta" name="meta"></a> meta

• `Optional` `Readonly` **meta**: `any`

#### Defined in

[packages/formula/src/type/index.ts:547](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L547)

___

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• `Optional` `Readonly` **namespaceId**: `string`

#### Defined in

[packages/formula/src/type/index.ts:544](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L544)

___

### <a id="replacements" name="replacements"></a> replacements

• `Optional` `Readonly` **replacements**: [`string`, ...string[]]

#### Defined in

[packages/formula/src/type/index.ts:543](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L543)

___

### <a id="type" name="type"></a> type

• `Readonly` **type**: ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Block"`` \| ``"Date"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"`` \| ``"any"`` \| ``"void"``

#### Defined in

[packages/formula/src/type/index.ts:545](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L545)
