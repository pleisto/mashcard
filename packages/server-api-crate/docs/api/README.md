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

| Name     | Type     |
| :------- | :------- |
| `uuidV4` | `string` |

#### Returns

`string`

shorted UUID v4 string

#### Defined in

[index.d.ts:94](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L94)

---

### <a id="aeaddecrypt" name="aeaddecrypt"></a> aeadDecrypt

▸ **aeadDecrypt**(`cipher`, `key`): `Buffer`

Decrypts a message using XChaCha20-Poly1305-IETF

#### Parameters

| Name     | Type     | Description                                   |
| :------- | :------- | :-------------------------------------------- |
| `cipher` | `string` | base64 url-safe encoded ciphertext with nonce |
| `key`    | `string` | 32bytes encryption key                        |

#### Returns

`Buffer`

plaintext buffer

#### Defined in

[index.d.ts:68](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L68)

---

### <a id="aeadencrypt" name="aeadencrypt"></a> aeadEncrypt

▸ **aeadEncrypt**(`plain`, `key`): `string`

Encrypts a message using XChaCha20-Poly1305-IETF

#### Parameters

| Name    | Type                 | Description            |
| :------ | :------------------- | :--------------------- |
| `plain` | `string` \| `Buffer` | plaintext              |
| `key`   | `string`             | 32bytes encryption key |

#### Returns

`string`

ciphertext - base64 url-safe encoded ciphertext with nonce

#### Defined in

[index.d.ts:61](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L61)

---

### <a id="anyascii" name="anyascii"></a> anyAscii

▸ **anyAscii**(`input`): `string`

AnyAscii provides ASCII-only replacement strings for practically
all Unicode characters.

#### Parameters

| Name    | Type     | Description        |
| :------ | :------- | :----------------- |
| `input` | `string` | Any unicode string |

#### Returns

`string`

ASCII-only string

#### Defined in

[index.d.ts:75](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L75)

---

### <a id="base58decode" name="base58decode"></a> base58Decode

▸ **base58Decode**(`input`): `Buffer`

Base58 decoding (Bitcoin style)

#### Parameters

| Name    | Type     | Description           |
| :------ | :------- | :-------------------- |
| `input` | `string` | base58 encoded string |

#### Returns

`Buffer`

decoded buffer

#### Defined in

[index.d.ts:87](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L87)

---

### <a id="base58encode" name="base58encode"></a> base58Encode

▸ **base58Encode**(`input`): `string`

Base58 encoding (Bitcoin style)

#### Parameters

| Name    | Type                 | Description      |
| :------ | :------------------- | :--------------- |
| `input` | `string` \| `Buffer` | string or buffer |

#### Returns

`string`

base58 encoded string

#### Defined in

[index.d.ts:81](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L81)

---

### <a id="base64urlsafedecode" name="base64urlsafedecode"></a> base64UrlSafeDecode

▸ **base64UrlSafeDecode**(`input`): `Buffer`

Base64 decoding (url safe)

#### Parameters

| Name    | Type     | Description           |
| :------ | :------- | :-------------------- |
| `input` | `string` | base64 encoded string |

#### Returns

`Buffer`

decoded buffer

#### Defined in

[index.d.ts:129](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L129)

---

### <a id="base64urlsafeencode" name="base64urlsafeencode"></a> base64UrlSafeEncode

▸ **base64UrlSafeEncode**(`input`): `string`

Base64 encoding (url safe)

#### Parameters

| Name    | Type                 | Description      |
| :------ | :------------------- | :--------------- |
| `input` | `string` \| `Buffer` | string or buffer |

#### Returns

`string`

base64 encoded string

#### Defined in

[index.d.ts:123](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L123)

---

### <a id="derivekey" name="derivekey"></a> deriveKey

▸ **deriveKey**(`keySeed`, `subKeyId`, `context?`): `string`

Derive a new key from a master key.

#### Parameters

| Name       | Type                 | Description                                           |
| :--------- | :------------------- | :---------------------------------------------------- |
| `keySeed`  | `string` \| `Buffer` | master key                                            |
| `subKeyId` | `number`             | sub key id                                            |
| `context?` | `string`             | It don't have to be secret and can have a low entropy |

#### Returns

`string`

#### Defined in

[index.d.ts:33](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L33)

---

### <a id="genslug" name="genslug"></a> genSlug

▸ **genSlug**(`name`): [preferred: string, alternative: string]

Generate a slug based on the User Name

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

[preferred: string, alternative: string]

slugs

#### Defined in

[index.d.ts:135](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L135)

---

### <a id="generatekey" name="generatekey"></a> generateKey

▸ **generateKey**(): `string`

Generate a new master key.

#### Returns

`string`

hex encoded string

#### Defined in

[index.d.ts:38](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L38)

---

### <a id="generichash" name="generichash"></a> genericHash

▸ **genericHash**(`data`, `salt?`): `string`

Computes a fixed-length fingerprint of a string.
Suitable for most use cases other than hashing passwords.

#### Parameters

| Name    | Type                 | Description                                     |
| :------ | :------------------- | :---------------------------------------------- |
| `data`  | `string` \| `Buffer` | Message String or Buffer to hash.               |
| `salt?` | `string`             | 32 bytes hex string. (string length must be 64) |

#### Returns

`string`

hex string

#### Defined in

[index.d.ts:26](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L26)

---

### <a id="intdecrypt" name="intdecrypt"></a> intDecrypt

▸ **intDecrypt**(`dataStr`, `keyStr`): `number`

Decrypt plain integer with key
That is safer alternative to hashids

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `dataStr` | `string` |
| `keyStr`  | `string` |

#### Returns

`number`

original integer

#### Defined in

[index.d.ts:54](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L54)

---

### <a id="intencrypt" name="intencrypt"></a> intEncrypt

▸ **intEncrypt**(`data`, `keyStr`): `string`

Encrypt plain integer with key
That is safer alternative to hashids

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `data`   | `number` |
| `keyStr` | `string` |

#### Returns

`string`

base58 encoded ciphertext

#### Defined in

[index.d.ts:46](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L46)

---

### <a id="passwordhash" name="passwordhash"></a> passwordHash

▸ **passwordHash**(`password`, `abortSignal?`): `Promise`<`string`\>

Generate a password hash and salt using Argon2id.

#### Parameters

| Name           | Type                    | Description             |
| :------------- | :---------------------- | :---------------------- |
| `password`     | `string`                | password string to hash |
| `abortSignal?` | `null` \| `AbortSignal` | -                       |

#### Returns

`Promise`<`string`\>

password hash

#### Defined in

[index.d.ts:11](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L11)

---

### <a id="passwordhashverify" name="passwordhashverify"></a> passwordHashVerify

▸ **passwordHashVerify**(`hashed`, `password`, `abortSignal?`): `Promise`<`boolean`\>

Verifies a password hash generated by `passwordHash()`

#### Parameters

| Name           | Type                    | Description               |
| :------------- | :---------------------- | :------------------------ |
| `hashed`       | `string`                | password hash             |
| `password`     | `string`                | password string to verify |
| `abortSignal?` | `null` \| `AbortSignal` | -                         |

#### Returns

`Promise`<`boolean`\>

true if the password is correct

#### Defined in

[index.d.ts:18](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L18)

---

### <a id="shortuuidexpand" name="shortuuidexpand"></a> shortUUIDExpand

▸ **shortUUIDExpand**(`shortUuid`): `string`

Expand shorted UUID v4 string

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `shortUuid` | `string` |

#### Returns

`string`

standard UUID v4 string

#### Defined in

[index.d.ts:105](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L105)

---

### <a id="shortuuidgen" name="shortuuidgen"></a> shortUUIDGen

▸ **shortUUIDGen**(): `string`

Generate shorted UUID v4 string

#### Returns

`string`

shorted UUID v4 string

#### Defined in

[index.d.ts:99](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L99)

---

### <a id="z85decode" name="z85decode"></a> z85Decode

▸ **z85Decode**(`input`): `Buffer`

Z85 decoding

#### Parameters

| Name    | Type     | Description        |
| :------ | :------- | :----------------- |
| `input` | `string` | z85 encoded string |

#### Returns

`Buffer`

decoded buffer

#### Defined in

[index.d.ts:117](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L117)

---

### <a id="z85encode" name="z85encode"></a> z85Encode

▸ **z85Encode**(`input`): `string`

Z85 encoding

#### Parameters

| Name    | Type                 | Description      |
| :------ | :------------------- | :--------------- |
| `input` | `string` \| `Buffer` | string or buffer |

#### Returns

`string`

z85 encoded string

#### Defined in

[index.d.ts:111](https://github.com/brickdoc/brickdoc/blob/master/packages/server-api-crate/index.d.ts#L111)
