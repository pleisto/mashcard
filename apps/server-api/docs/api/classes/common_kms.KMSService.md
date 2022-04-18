# Class: KMSService

[common/kms](../modules/common_kms.md).KMSService

## Table of contents

### Constructors

- [constructor](common_kms.KMSService.md#constructor)

### Accessors

- [rootSecret](common_kms.KMSService.md#rootsecret)

### Methods

- [dataMasking](common_kms.KMSService.md#datamasking)
- [subKey](common_kms.KMSService.md#subkey)
- [symmetricDecrypt](common_kms.KMSService.md#symmetricdecrypt)
- [symmetricEncrypt](common_kms.KMSService.md#symmetricencrypt)
- [symmetricKey](common_kms.KMSService.md#symmetrickey)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new KMSService**(`seedDecoder`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `seedDecoder` | `SeedDecoder` |

#### Defined in

[common/kms/kms.service.ts:9](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/kms/kms.service.ts#L9)

## Accessors

### <a id="rootsecret" name="rootsecret"></a> rootSecret

• `get` **rootSecret**(): `string`

#### Returns

`string`

#### Defined in

[common/kms/kms.service.ts:11](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/kms/kms.service.ts#L11)

## Methods

### <a id="datamasking" name="datamasking"></a> dataMasking

▸ **dataMasking**(`data`, `length?`): `string`

Data masking

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `data` | `string` | `undefined` | The data to mask |
| `length` | `number` | `32` | The length of the hash |

#### Returns

`string`

The hashed data string

#### Defined in

[common/kms/kms.service.ts:31](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/kms/kms.service.ts#L31)

___

### <a id="subkey" name="subkey"></a> subKey

▸ **subKey**(`subKeyType`, `context?`): `string`

Get a new sub key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subKeyType` | [`SecretSubKey`](../enums/common_kms.SecretSubKey.md) | the type of sub key to generate |
| `context?` | `string` | It don't have to be secret and can have a low entropy |

#### Returns

`string`

#### Defined in

[common/kms/kms.service.ts:21](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/kms/kms.service.ts#L21)

___

### <a id="symmetricdecrypt" name="symmetricdecrypt"></a> symmetricDecrypt

▸ **symmetricDecrypt**(`data`, `context`): `string`

Symmetric-key decryption

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |
| `context` | `string` |

#### Returns

`string`

#### Defined in

[common/kms/kms.service.ts:53](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/kms/kms.service.ts#L53)

___

### <a id="symmetricencrypt" name="symmetricencrypt"></a> symmetricEncrypt

▸ **symmetricEncrypt**(`data`, `context`): `string`

Symmetric-key encryption

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |
| `context` | `string` |

#### Returns

`string`

#### Defined in

[common/kms/kms.service.ts:43](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/kms/kms.service.ts#L43)

___

### <a id="symmetrickey" name="symmetrickey"></a> symmetricKey

▸ `Private` **symmetricKey**(`context`): `string`

Get a symmetric key

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `string` |

#### Returns

`string`

#### Defined in

[common/kms/kms.service.ts:62](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/kms/kms.service.ts#L62)
