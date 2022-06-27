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

[packages/formula/src/types/index.ts:705](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L705)

---

### <a id="display" name="display"></a> display

• `Readonly` **display**: `string`

#### Defined in

[packages/formula/src/types/index.ts:706](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L706)

---

### <a id="errors" name="errors"></a> errors

• `Readonly` **errors**: [`ErrorMessage`](ErrorMessage.md)[]

#### Defined in

[packages/formula/src/types/index.ts:710](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L710)

---

### <a id="meta" name="meta"></a> meta

• `Optional` `Readonly` **meta**: `any`

#### Defined in

[packages/formula/src/types/index.ts:711](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L711)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• `Optional` `Readonly` **namespaceId**: `string`

#### Defined in

[packages/formula/src/types/index.ts:708](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L708)

---

### <a id="replacements" name="replacements"></a> replacements

• `Optional` `Readonly` **replacements**: [`string`, ...string[]]

#### Defined in

[packages/formula/src/types/index.ts:707](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L707)

---

### <a id="type" name="type"></a> type

• `Readonly` **type**: `"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"Button"` \| `"Switch"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"` \| `"void"`

#### Defined in

[packages/formula/src/types/index.ts:709](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L709)
