# Class: KMSService

[common/kms](../modules/common_kms.md).KMSService

## Table of contents

### Constructors

- [constructor](common_kms.KMSService.md#constructor)

### Methods

- [dataMasking](common_kms.KMSService.md#datamasking)
- [subKey](common_kms.KMSService.md#subkey)
- [symmetricDecrypt](common_kms.KMSService.md#symmetricdecrypt)
- [symmetricEncrypt](common_kms.KMSService.md#symmetricencrypt)
- [symmetricKey](common_kms.KMSService.md#symmetrickey)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new KMSService**(`rootSecret`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootSecret` | `string` |

#### Defined in

[common/kms/kms.service.ts:8](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/kms/kms.service.ts#L8)

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

[common/kms/kms.service.ts:26](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/kms/kms.service.ts#L26)

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

[common/kms/kms.service.ts:16](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/kms/kms.service.ts#L16)

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

[common/kms/kms.service.ts:48](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/kms/kms.service.ts#L48)

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

[common/kms/kms.service.ts:38](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/kms/kms.service.ts#L38)

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

[common/kms/kms.service.ts:57](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/kms/kms.service.ts#L57)
