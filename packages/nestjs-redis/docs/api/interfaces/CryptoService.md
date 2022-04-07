# Interface: CryptoService

## Table of contents

### Methods

- [dataMasking](CryptoService.md#datamasking)
- [symmetricDecrypt](CryptoService.md#symmetricdecrypt)
- [symmetricEncrypt](CryptoService.md#symmetricencrypt)

## Methods

### <a id="datamasking" name="datamasking"></a> dataMasking

▸ **dataMasking**(`data`): `string`

Implement this method to provide a hashing algorithm

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` | string to hash |

#### Returns

`string`

hashed string

#### Defined in

[packages/nestjs-redis/src/redis.interface.ts:38](https://github.com/brickdoc/brickdoc/blob/5e2ec65d/packages/nestjs-redis/src/redis.interface.ts#L38)

___

### <a id="symmetricdecrypt" name="symmetricdecrypt"></a> symmetricDecrypt

▸ **symmetricDecrypt**(`data`, `key`): `string`

Implement this method to decrypt data by key after retrieving it from redis

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` | Data to decrypt |
| `key` | `string` | Encryption key |

#### Returns

`string`

Decrypted data as string

#### Defined in

[packages/nestjs-redis/src/redis.interface.ts:31](https://github.com/brickdoc/brickdoc/blob/5e2ec65d/packages/nestjs-redis/src/redis.interface.ts#L31)

___

### <a id="symmetricencrypt" name="symmetricencrypt"></a> symmetricEncrypt

▸ **symmetricEncrypt**(`data`, `key`): `string`

Implement this method to encrypt data by key before storing it in redis

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` | Data to encrypt |
| `key` | `string` | Encryption key |

#### Returns

`string`

Encrypted data as string

#### Defined in

[packages/nestjs-redis/src/redis.interface.ts:23](https://github.com/brickdoc/brickdoc/blob/5e2ec65d/packages/nestjs-redis/src/redis.interface.ts#L23)
