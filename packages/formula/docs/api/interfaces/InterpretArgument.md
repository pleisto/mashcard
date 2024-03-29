# Interface: InterpretArgument

## Table of contents

### Properties

- [chainArgs](InterpretArgument.md#chainargs)
- [finalTypes](InterpretArgument.md#finaltypes)
- [firstArgumentType](InterpretArgument.md#firstargumenttype)
- [lazy](InterpretArgument.md#lazy)
- [skipCheck](InterpretArgument.md#skipcheck)
- [type](InterpretArgument.md#type)

## Properties

### <a id="chainargs" name="chainargs"></a> chainArgs

• `Optional` **chainArgs**: `any`

#### Defined in

[packages/formula/src/grammar/interpreter.ts:44](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/interpreter.ts#L44)

---

### <a id="finaltypes" name="finaltypes"></a> finalTypes

• `Readonly` **finalTypes**: [`ExpressionType`](../README.md#expressiontype)[]

#### Defined in

[packages/formula/src/grammar/interpreter.ts:41](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/interpreter.ts#L41)

---

### <a id="firstargumenttype" name="firstargumenttype"></a> firstArgumentType

• `Optional` `Readonly` **firstArgumentType**: `"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Button"` \| `"Switch"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"` \| `"void"`

#### Defined in

[packages/formula/src/grammar/interpreter.ts:40](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/interpreter.ts#L40)

---

### <a id="lazy" name="lazy"></a> lazy

• `Optional` **lazy**: `boolean`

#### Defined in

[packages/formula/src/grammar/interpreter.ts:43](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/interpreter.ts#L43)

---

### <a id="skipcheck" name="skipcheck"></a> skipCheck

• `Optional` **skipCheck**: `boolean`

#### Defined in

[packages/formula/src/grammar/interpreter.ts:42](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/interpreter.ts#L42)

---

### <a id="type" name="type"></a> type

• `Readonly` **type**: [`ExpressionType`](../README.md#expressiontype)

#### Defined in

[packages/formula/src/grammar/interpreter.ts:39](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/grammar/interpreter.ts#L39)
