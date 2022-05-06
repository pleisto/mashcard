# Namespace: identifiers

## Table of contents

### Functions

- [fromArray](identifiers.md#fromarray)
- [fromObject](identifiers.md#fromobject)
- [fromSet](identifiers.md#fromset)

## Functions

### <a id="fromarray" name="fromarray"></a> fromArray

▸ **fromArray**(`identifiers`, `tableName?`): [`ListSqlToken`](../README.md#listsqltoken)

Create a set of identifiers from an array of strings.

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifiers` | `string`[] |
| `tableName?` | `string` |

#### Returns

[`ListSqlToken`](../README.md#listsqltoken)

#### Defined in

[packages/nestjs-slonik/src/helpers/identifiers.helper.ts:9](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-slonik/src/helpers/identifiers.helper.ts#L9)

___

### <a id="fromobject" name="fromobject"></a> fromObject

▸ **fromObject**(`obj`, `tableName?`): [`ListSqlToken`](../README.md#listsqltoken)

Create a set of identifiers from an object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Record`<`string`, `any`\> |
| `tableName?` | `string` |

#### Returns

[`ListSqlToken`](../README.md#listsqltoken)

#### Defined in

[packages/nestjs-slonik/src/helpers/identifiers.helper.ts:28](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-slonik/src/helpers/identifiers.helper.ts#L28)

___

### <a id="fromset" name="fromset"></a> fromSet

▸ **fromSet**(`identifiers`, `tableName?`): [`ListSqlToken`](../README.md#listsqltoken)

Create a set of identifiers from a Set<string>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifiers` | `Set`<`string`\> |
| `tableName?` | `string` |

#### Returns

[`ListSqlToken`](../README.md#listsqltoken)

#### Defined in

[packages/nestjs-slonik/src/helpers/identifiers.helper.ts:38](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-slonik/src/helpers/identifiers.helper.ts#L38)
