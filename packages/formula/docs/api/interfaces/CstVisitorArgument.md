# Interface: CstVisitorArgument

## Table of contents

### Properties

- [clauseArguments](CstVisitorArgument.md#clausearguments)
- [firstArgumentType](CstVisitorArgument.md#firstargumenttype)
- [meta](CstVisitorArgument.md#meta)
- [type](CstVisitorArgument.md#type)

## Properties

### <a id="clausearguments" name="clausearguments"></a> clauseArguments

• `Optional` `Readonly` **clauseArguments**: [`Argument`](Argument.md)<`"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Button"` \| `"Switch"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"`\>[]

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:59](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L59)

---

### <a id="firstargumenttype" name="firstargumenttype"></a> firstArgumentType

• `Optional` `Readonly` **firstArgumentType**: [`ExpressionType`](../README.md#expressiontype)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:58](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L58)

---

### <a id="meta" name="meta"></a> meta

• `Optional` `Readonly` **meta**: `any`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:60](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L60)

---

### <a id="type" name="type"></a> type

• `Readonly` **type**: [`ExpressionType`](../README.md#expressiontype)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:57](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L57)
