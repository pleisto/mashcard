# Class: UUID

[common/scalars](../modules/common_scalars.md).UUID

## Implements

- `CustomScalar`<`string`, `string`\>

## Table of contents

### Constructors

- [constructor](common_scalars.UUID.md#constructor)

### Properties

- [description](common_scalars.UUID.md#description)

### Methods

- [parseLiteral](common_scalars.UUID.md#parseliteral)
- [parseValue](common_scalars.UUID.md#parsevalue)
- [serialize](common_scalars.UUID.md#serialize)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new UUID**()

## Properties

### <a id="description" name="description"></a> description

• **description**: `string` = `'A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier.'`

#### Implementation of

CustomScalar.description

#### Defined in

[common/scalars/uuid.scalar.ts:17](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/scalars/uuid.scalar.ts#L17)

## Methods

### <a id="parseliteral" name="parseliteral"></a> parseLiteral

▸ **parseLiteral**(`ast`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ast` | `ValueNode` |

#### Returns

`string`

#### Implementation of

CustomScalar.parseLiteral

#### Defined in

[common/scalars/uuid.scalar.ts:28](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/scalars/uuid.scalar.ts#L28)

___

### <a id="parsevalue" name="parsevalue"></a> parseValue

▸ **parseValue**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

`string`

#### Implementation of

CustomScalar.parseValue

#### Defined in

[common/scalars/uuid.scalar.ts:24](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/scalars/uuid.scalar.ts#L24)

___

### <a id="serialize" name="serialize"></a> serialize

▸ **serialize**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

`string`

#### Implementation of

CustomScalar.serialize

#### Defined in

[common/scalars/uuid.scalar.ts:20](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/scalars/uuid.scalar.ts#L20)
