# @brickdoc/server-api-crate

## Table of contents

### Functions

- [UUIDShorten](README.md#uuidshorten)
- [aeadDecrypt](README.md#aeaddecrypt)
- [aeadEncrypt](README.md#aeadencrypt)
- [anyAscii](README.md#anyascii)
- [base58Decode](README.md#base58decode)
- [base58Encode](README.md#base58encode)
- [base64UrlSafeDecode](README.md#base64urlsafedecode)
- [base64UrlSafeEncode](README.md#base64urlsafeencode)
- [deriveKey](README.md#derivekey)
- [genSlug](README.md#genslug)
- [generateKey](README.md#generatekey)
- [genericHash](README.md#generichash)
- [intDecrypt](README.md#intdecrypt)
- [intEncrypt](README.md#intencrypt)
- [passwordHash](README.md#passwordhash)
- [passwordHashVerify](README.md#passwordhashverify)
- [shortUUIDExpand](README.md#shortuuidexpand)
- [shortUUIDGen](README.md#shortuuidgen)
- [z85Decode](README.md#z85decode)
- [z85Encode](README.md#z85encode)

## Functions

### <a id="uuidshorten" name="uuidshorten"></a> UUIDShorten

▸ **UUIDShorten**(`uuidV4`): `string`

Make UUID v4 string shorted

#### Parameters

| Name | Type |
| :------ | :------ |
| `uuidV4` | `string` |

#### Returns

`string`

shorted UUID v4 string

#### Defined in

[index.d.ts:110](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L110)

___

### <a id="aeaddecrypt" name="aeaddecrypt"></a> aeadDecrypt

▸ **aeadDecrypt**(`cipher`, `key`): `Buffer`

Decrypts a message using XChaCha20-Poly1305-IETF

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cipher` | `string` | base64 url-safe encoded ciphertext with nonce |
| `key` | `string` | 32bytes encryption key |

#### Returns

`Buffer`

plaintext buffer

#### Defined in

[index.d.ts:72](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L72)

___

### <a id="aeadencrypt" name="aeadencrypt"></a> aeadEncrypt

▸ **aeadEncrypt**(`plain`, `key`): `string`

Encrypts a message using XChaCha20-Poly1305-IETF

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `plain` | `string` \| `Buffer` | plaintext |
| `key` | `string` | 32bytes encryption key |

#### Returns

`string`

ciphertext - base64 url-safe encoded ciphertext with nonce

#### Defined in

[index.d.ts:65](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L65)

___

### <a id="anyascii" name="anyascii"></a> anyAscii

▸ **anyAscii**(`input`): `string`

AnyAscii provides ASCII-only replacement strings for practically
all Unicode characters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | Any unicode string |

#### Returns

`string`

ASCII-only string

#### Defined in

[index.d.ts:79](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L79)

___

### <a id="base58decode" name="base58decode"></a> base58Decode

▸ **base58Decode**(`input`): `Buffer`

Base58 decoding (Bitcoin style)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | base58 encoded string |

#### Returns

`Buffer`

decoded buffer

#### Defined in

[index.d.ts:91](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L91)

___

### <a id="base58encode" name="base58encode"></a> base58Encode

▸ **base58Encode**(`input`): `string`

Base58 encoding (Bitcoin style)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` \| `Buffer` | string or buffer |

#### Returns

`string`

base58 encoded string

#### Defined in

[index.d.ts:85](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L85)

___

### <a id="base64urlsafedecode" name="base64urlsafedecode"></a> base64UrlSafeDecode

▸ **base64UrlSafeDecode**(`input`): `Buffer`

Base64 decoding (url safe)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | base64 encoded string |

#### Returns

`Buffer`

decoded buffer

#### Defined in

[index.d.ts:103](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L103)

___

### <a id="base64urlsafeencode" name="base64urlsafeencode"></a> base64UrlSafeEncode

▸ **base64UrlSafeEncode**(`input`): `string`

Base64 encoding (url safe)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` \| `Buffer` | string or buffer |

#### Returns

`string`

base64 encoded string

#### Defined in

[index.d.ts:97](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L97)

___

### <a id="derivekey" name="derivekey"></a> deriveKey

▸ **deriveKey**(`keySeed`, `subKeyId`, `context?`): `string`

Derive a new key from a master key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keySeed` | `string` \| `Buffer` | master key |
| `subKeyId` | `number` | sub key id |
| `context?` | `string` | It don't have to be secret and can have a low entropy |

#### Returns

`string`

#### Defined in

[index.d.ts:37](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L37)

___

### <a id="genslug" name="genslug"></a> genSlug

▸ **genSlug**(`name`): [preferred: string, alternative: string]

Generate a slug based on the User Name

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[preferred: string, alternative: string]

slugs

#### Defined in

[index.d.ts:139](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L139)

___

### <a id="generatekey" name="generatekey"></a> generateKey

▸ **generateKey**(): `string`

Generate a new master key.

#### Returns

`string`

hex encoded string

#### Defined in

[index.d.ts:42](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L42)

___

### <a id="generichash" name="generichash"></a> genericHash

▸ **genericHash**(`data`, `salt?`): `string`

Computes a fixed-length fingerprint of a string.
Suitable for most use cases other than hashing passwords.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` \| `Buffer` | Message String or Buffer to hash. |
| `salt?` | `string` | 32 bytes hex string. (string length must be 64) |

#### Returns

`string`

hex string

#### Defined in

[index.d.ts:30](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L30)

___

### <a id="intdecrypt" name="intdecrypt"></a> intDecrypt

▸ **intDecrypt**(`dataStr`, `keyStr`): `number`

Decrypt plain integer with key
That is safer alternative to hashids

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataStr` | `string` |
| `keyStr` | `string` |

#### Returns

`number`

original integer

#### Defined in

[index.d.ts:58](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L58)

___

### <a id="intencrypt" name="intencrypt"></a> intEncrypt

▸ **intEncrypt**(`data`, `keyStr`): `string`

Encrypt plain integer with key
That is safer alternative to hashids

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `number` |
| `keyStr` | `string` |

#### Returns

`string`

base58 encoded ciphertext

#### Defined in

[index.d.ts:50](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L50)

___

### <a id="passwordhash" name="passwordhash"></a> passwordHash

▸ **passwordHash**(`password`, `abortSignal?`): `Promise`<`string`\>

Generate a password hash and salt using Argon2id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `password` | `string` | password string to hash |
| `abortSignal?` | ``null`` \| `AbortSignal` | - |

#### Returns

`Promise`<`string`\>

password hash

#### Defined in

[index.d.ts:11](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L11)

___

### <a id="passwordhashverify" name="passwordhashverify"></a> passwordHashVerify

▸ **passwordHashVerify**(`hashed`, `password`, `abortSignal?`): `Promise`<`boolean`\>

Verifies a password hash generated by `passwordHash()`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hashed` | `string` | password hash |
| `password` | `string` | password string to verify |
| `abortSignal?` | ``null`` \| `AbortSignal` | - |

#### Returns

`Promise`<`boolean`\>

true if the password is correct

#### Defined in

[index.d.ts:18](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L18)

___

### <a id="shortuuidexpand" name="shortuuidexpand"></a> shortUUIDExpand

▸ **shortUUIDExpand**(`shortUuid`): `string`

Expand shorted UUID v4 string

#### Parameters

| Name | Type |
| :------ | :------ |
| `shortUuid` | `string` |

#### Returns

`string`

standard UUID v4 string

#### Defined in

[index.d.ts:121](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L121)

___

### <a id="shortuuidgen" name="shortuuidgen"></a> shortUUIDGen

▸ **shortUUIDGen**(): `string`

Generate shorted UUID v4 string

#### Returns

`string`

shorted UUID v4 string

#### Defined in

[index.d.ts:115](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L115)

___

### <a id="z85decode" name="z85decode"></a> z85Decode

▸ **z85Decode**(`input`): `Buffer`

Z85 decoding

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | z85 encoded string |

#### Returns

`Buffer`

decoded buffer

#### Defined in

[index.d.ts:133](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L133)

___

### <a id="z85encode" name="z85encode"></a> z85Encode

▸ **z85Encode**(`input`): `string`

Z85 encoding

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` \| `Buffer` | string or buffer |

#### Returns

`string`

z85 encoded string

#### Defined in

[index.d.ts:127](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L127)
