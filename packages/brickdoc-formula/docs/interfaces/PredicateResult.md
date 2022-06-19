# Interface: PredicateResult

## Hierarchy

- [`BaseResult`](BaseResult.md)

  ↳ **`PredicateResult`**

## Table of contents

### Properties

- [column](PredicateResult.md#column)
- [operator](PredicateResult.md#operator)
- [result](PredicateResult.md#result)
- [subType](PredicateResult.md#subtype)
- [type](PredicateResult.md#type)
- [view](PredicateResult.md#view)

## Properties

### <a id="column" name="column"></a> column

• `Optional` **column**: [`ColumnType`](ColumnType.md)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:252](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L252)

---

### <a id="operator" name="operator"></a> operator

• **operator**: [`PredicateOperator`](../README.md#predicateoperator)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:253](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L253)

---

### <a id="result" name="result"></a> result

• **result**: [`NumberResult`](NumberResult.md) \| [`StringResult`](StringResult.md)

#### Overrides

[BaseResult](BaseResult.md).[result](BaseResult.md#result)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:251](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L251)

---

### <a id="subtype" name="subtype"></a> subType

• `Optional` **subType**: `"string"` \| `"number"` \| `"boolean"` \| `"Block"` \| `"null"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"Button"` \| `"Switch"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"` \| `"void"`

#### Inherited from

[BaseResult](BaseResult.md).[subType](BaseResult.md#subtype)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:160](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L160)

---

### <a id="type" name="type"></a> type

• **type**: `"Predicate"`

#### Overrides

[BaseResult](BaseResult.md).[type](BaseResult.md#type)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:250](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L250)

---

### <a id="view" name="view"></a> view

• `Optional` **view**: [`ViewData`](ViewData.md)<`string`\>

#### Inherited from

[BaseResult](BaseResult.md).[view](BaseResult.md#view)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:158](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L158)
