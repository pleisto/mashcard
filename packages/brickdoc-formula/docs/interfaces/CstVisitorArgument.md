# Interface: CstVisitorArgument

## Table of contents

### Properties

- [clauseArguments](CstVisitorArgument.md#clausearguments)
- [firstArgumentType](CstVisitorArgument.md#firstargumenttype)
- [type](CstVisitorArgument.md#type)

## Properties

### <a id="clausearguments" name="clausearguments"></a> clauseArguments

• `Optional` `Readonly` **clauseArguments**: [`Argument`](Argument.md)<``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Date"`` \| ``"Block"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"``\>[]

#### Defined in

[packages/brickdoc-formula/src/grammar/codeFragment.ts:58](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/codeFragment.ts#L58)

___

### <a id="firstargumenttype" name="firstargumenttype"></a> firstArgumentType

• `Optional` `Readonly` **firstArgumentType**: [`ExpressionType`](../README.md#expressiontype)

#### Defined in

[packages/brickdoc-formula/src/grammar/codeFragment.ts:57](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/codeFragment.ts#L57)

___

### <a id="type" name="type"></a> type

• `Readonly` **type**: [`ExpressionType`](../README.md#expressiontype)

#### Defined in

[packages/brickdoc-formula/src/grammar/codeFragment.ts:56](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/codeFragment.ts#L56)