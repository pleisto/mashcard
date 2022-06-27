# Interface: SpecialCodeFragment

## Hierarchy

- [`BaseCodeFragment`](BaseCodeFragment.md)

  ↳ **`SpecialCodeFragment`**

## Table of contents

### Properties

- [attrs](SpecialCodeFragment.md#attrs)
- [code](SpecialCodeFragment.md#code)
- [display](SpecialCodeFragment.md#display)
- [errors](SpecialCodeFragment.md#errors)
- [meta](SpecialCodeFragment.md#meta)
- [namespaceId](SpecialCodeFragment.md#namespaceid)
- [replacements](SpecialCodeFragment.md#replacements)
- [type](SpecialCodeFragment.md#type)

## Properties

### <a id="attrs" name="attrs"></a> attrs

• `Readonly` **attrs**: [`CodeFragmentAttrs`](CodeFragmentAttrs.md)

#### Defined in

[packages/formula/src/types/index.ts:715](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L715)

---

### <a id="code" name="code"></a> code

• `Readonly` **code**: [`ComplexCodeFragmentType`](../README.md#complexcodefragmenttype)

#### Overrides

[BaseCodeFragment](BaseCodeFragment.md).[code](BaseCodeFragment.md#code)

#### Defined in

[packages/formula/src/types/index.ts:714](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L714)

---

### <a id="display" name="display"></a> display

• `Readonly` **display**: `string`

#### Inherited from

[BaseCodeFragment](BaseCodeFragment.md).[display](BaseCodeFragment.md#display)

#### Defined in

[packages/formula/src/types/index.ts:706](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L706)

---

### <a id="errors" name="errors"></a> errors

• `Readonly` **errors**: [`ErrorMessage`](ErrorMessage.md)[]

#### Inherited from

[BaseCodeFragment](BaseCodeFragment.md).[errors](BaseCodeFragment.md#errors)

#### Defined in

[packages/formula/src/types/index.ts:710](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L710)

---

### <a id="meta" name="meta"></a> meta

• `Optional` `Readonly` **meta**: `any`

#### Inherited from

[BaseCodeFragment](BaseCodeFragment.md).[meta](BaseCodeFragment.md#meta)

#### Defined in

[packages/formula/src/types/index.ts:711](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L711)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• `Optional` `Readonly` **namespaceId**: `string`

#### Inherited from

[BaseCodeFragment](BaseCodeFragment.md).[namespaceId](BaseCodeFragment.md#namespaceid)

#### Defined in

[packages/formula/src/types/index.ts:708](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L708)

---

### <a id="replacements" name="replacements"></a> replacements

• `Optional` `Readonly` **replacements**: [`string`, ...string[]]

#### Inherited from

[BaseCodeFragment](BaseCodeFragment.md).[replacements](BaseCodeFragment.md#replacements)

#### Defined in

[packages/formula/src/types/index.ts:707](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L707)

---

### <a id="type" name="type"></a> type

• `Readonly` **type**: `"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"Button"` \| `"Switch"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"` \| `"void"`

#### Inherited from

[BaseCodeFragment](BaseCodeFragment.md).[type](BaseCodeFragment.md#type)

#### Defined in

[packages/formula/src/types/index.ts:709](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L709)
