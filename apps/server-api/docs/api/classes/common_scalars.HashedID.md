# Class: HashedID

[common/scalars](../modules/common_scalars.md).HashedID

## Implements

- `CustomScalar`<`string`, `number`\>

## Table of contents

### Constructors

- [constructor](common_scalars.HashedID.md#constructor)

### Properties

- [description](common_scalars.HashedID.md#description)

### Methods

- [key](common_scalars.HashedID.md#key)
- [parseLiteral](common_scalars.HashedID.md#parseliteral)
- [parseValue](common_scalars.HashedID.md#parsevalue)
- [serialize](common_scalars.HashedID.md#serialize)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new HashedID**(`kms`)

#### Parameters

| Name  | Type                                     |
| :---- | :--------------------------------------- |
| `kms` | [`KMSService`](common_kms.KMSService.md) |

#### Defined in

[common/scalars/hashedid.scalar.ts:8](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/scalars/hashedid.scalar.ts#L8)

## Properties

### <a id="description" name="description"></a> description

• **description**: `string` = `'Hashed IntID Scalar'`

#### Implementation of

CustomScalar.description

#### Defined in

[common/scalars/hashedid.scalar.ts:9](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/scalars/hashedid.scalar.ts#L9)

## Methods

### <a id="key" name="key"></a> key

▸ `Private` **key**(): `string`

#### Returns

`string`

#### Defined in

[common/scalars/hashedid.scalar.ts:26](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/scalars/hashedid.scalar.ts#L26)

---

### <a id="parseliteral" name="parseliteral"></a> parseLiteral

▸ **parseLiteral**(`ast`): `number`

#### Parameters

| Name  | Type        |
| :---- | :---------- |
| `ast` | `ValueNode` |

#### Returns

`number`

#### Implementation of

CustomScalar.parseLiteral

#### Defined in

[common/scalars/hashedid.scalar.ts:19](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/scalars/hashedid.scalar.ts#L19)

---

### <a id="parsevalue" name="parsevalue"></a> parseValue

▸ **parseValue**(`value`): `number`

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `value` | `unknown` |

#### Returns

`number`

#### Implementation of

CustomScalar.parseValue

#### Defined in

[common/scalars/hashedid.scalar.ts:11](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/scalars/hashedid.scalar.ts#L11)

---

### <a id="serialize" name="serialize"></a> serialize

▸ **serialize**(`value`): `string`

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `value` | `unknown` |

#### Returns

`string`

#### Implementation of

CustomScalar.serialize

#### Defined in

[common/scalars/hashedid.scalar.ts:15](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/scalars/hashedid.scalar.ts#L15)
