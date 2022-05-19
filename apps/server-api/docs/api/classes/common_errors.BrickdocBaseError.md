# Class: BrickdocBaseError

[common/errors](../modules/common_errors.md).BrickdocBaseError

The base error class for all errors in the application.

## Hierarchy

- `Error`

  ↳ **`BrickdocBaseError`**

## Indexable

▪ [key: `string`]: `any`

Append additional details to the error for server-side logging.

## Table of contents

### Constructors

- [constructor](common_errors.BrickdocBaseError.md#constructor)

### Properties

- [code](common_errors.BrickdocBaseError.md#code)
- [details](common_errors.BrickdocBaseError.md#details)
- [message](common_errors.BrickdocBaseError.md#message)
- [name](common_errors.BrickdocBaseError.md#name)
- [originalError](common_errors.BrickdocBaseError.md#originalerror)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new BrickdocBaseError**(`name`, `message`, `originalError?`)

#### Parameters

| Name             | Type     |
| :--------------- | :------- |
| `name`           | `string` |
| `message`        | `string` |
| `originalError?` | `Error`  |

#### Overrides

Error.constructor

#### Defined in

[common/errors/base.error.ts:43](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/errors/base.error.ts#L43)

## Properties

### <a id="code" name="code"></a> code

• **code**: [`ErrorCode`](../enums/common_errors.ErrorCode.md) = `ErrorCode.INTERNAL_SERVER_ERROR`

It may be exposed to the client.

#### Defined in

[common/errors/base.error.ts:22](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/errors/base.error.ts#L22)

---

### <a id="details" name="details"></a> details

• **details**: `Object`

DO NOT STORE SENSITIVE DATA HERE. It may be exposed to the client.
And client could use it and name to generate a localized error message.
So it is recommended that all variables used in the `message` be stored there.

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[common/errors/base.error.ts:29](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/errors/base.error.ts#L29)

---

### <a id="message" name="message"></a> message

• **message**: `string`

It's developer-facing and must be in English.
And it's will be exposed to client.

#### Overrides

Error.message

#### Defined in

[common/errors/base.error.ts:17](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/errors/base.error.ts#L17)

---

### <a id="name" name="name"></a> name

• **name**: `string`

Unique error name, must be globally unique.
e.g. `apiSrv.kms.INVALID_KEY_FORMAT`

#### Overrides

Error.name

#### Defined in

[common/errors/base.error.ts:11](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/errors/base.error.ts#L11)

---

### <a id="originalerror" name="originalerror"></a> originalError

• **originalError**: `undefined` \| `Error`

originalError is used to store the original error that was thrown

#### Defined in

[common/errors/base.error.ts:36](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/errors/base.error.ts#L36)
