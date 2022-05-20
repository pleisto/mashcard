# Class: URL

[common/scalars](../modules/common_scalars.md).URL

## Implements

- `CustomScalar`<`string`, `string`\>

## Table of contents

### Constructors

- [constructor](common_scalars.URL.md#constructor)

### Properties

- [description](common_scalars.URL.md#description)

### Methods

- [parseLiteral](common_scalars.URL.md#parseliteral)
- [parseValue](common_scalars.URL.md#parsevalue)
- [serialize](common_scalars.URL.md#serialize)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new URL**()

## Properties

### <a id="description" name="description"></a> description

• **description**: `string` = `'A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt'`

#### Implementation of

CustomScalar.description

#### Defined in

[common/scalars/url.scalar.ts:17](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/scalars/url.scalar.ts#L17)

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

[common/scalars/url.scalar.ts:28](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/scalars/url.scalar.ts#L28)

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

[common/scalars/url.scalar.ts:24](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/scalars/url.scalar.ts#L24)

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

[common/scalars/url.scalar.ts:20](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/scalars/url.scalar.ts#L20)
