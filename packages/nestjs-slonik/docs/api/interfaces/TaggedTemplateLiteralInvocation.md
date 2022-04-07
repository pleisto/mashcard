# Interface: TaggedTemplateLiteralInvocation<Result\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Result` | extends `UserQueryResultRow` = [`QueryResultRow`](../README.md#queryresultrow) |

## Hierarchy

- [`SqlSqlToken`](../README.md#sqlsqltoken)

  ↳ **`TaggedTemplateLiteralInvocation`**

## Table of contents

### Properties

- [sql](TaggedTemplateLiteralInvocation.md#sql)
- [type](TaggedTemplateLiteralInvocation.md#type)
- [values](TaggedTemplateLiteralInvocation.md#values)

## Properties

### <a id="sql" name="sql"></a> sql

• `Readonly` **sql**: `string`

#### Inherited from

SqlSqlToken.sql

#### Defined in

node_modules/slonik/dist/src/types.d.ts:235

___

### <a id="type" name="type"></a> type

• `Readonly` **type**: ``"SLONIK_TOKEN_SQL"``

#### Inherited from

SqlSqlToken.type

#### Defined in

node_modules/slonik/dist/src/types.d.ts:236

___

### <a id="values" name="values"></a> values

• `Readonly` **values**: readonly `PrimitiveValueExpression`[]

#### Inherited from

SqlSqlToken.values

#### Defined in

node_modules/slonik/dist/src/types.d.ts:237
