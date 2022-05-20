# Class: CheckIntegrityConstraintViolationError

## Hierarchy

- [`IntegrityConstraintViolationError`](IntegrityConstraintViolationError.md)

  ↳ **`CheckIntegrityConstraintViolationError`**

## Table of contents

### Constructors

- [constructor](CheckIntegrityConstraintViolationError.md#constructor)

### Properties

- [constraint](CheckIntegrityConstraintViolationError.md#constraint)
- [message](CheckIntegrityConstraintViolationError.md#message)
- [name](CheckIntegrityConstraintViolationError.md#name)
- [originalError](CheckIntegrityConstraintViolationError.md#originalerror)
- [stack](CheckIntegrityConstraintViolationError.md#stack)
- [prepareStackTrace](CheckIntegrityConstraintViolationError.md#preparestacktrace)
- [stackTraceLimit](CheckIntegrityConstraintViolationError.md#stacktracelimit)

### Methods

- [captureStackTrace](CheckIntegrityConstraintViolationError.md#capturestacktrace)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new CheckIntegrityConstraintViolationError**(`error`, `constraint`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |
| `constraint` | `string` |

#### Overrides

[IntegrityConstraintViolationError](IntegrityConstraintViolationError.md).[constructor](IntegrityConstraintViolationError.md#constructor)

#### Defined in

node_modules/slonik/dist/src/errors.d.ts:49

## Properties

### <a id="constraint" name="constraint"></a> constraint

• **constraint**: `string`

#### Inherited from

[IntegrityConstraintViolationError](IntegrityConstraintViolationError.md).[constraint](IntegrityConstraintViolationError.md#constraint)

#### Defined in

node_modules/slonik/dist/src/errors.d.ts:36

___

### <a id="message" name="message"></a> message

• `Readonly` **message**: `string`

#### Inherited from

[IntegrityConstraintViolationError](IntegrityConstraintViolationError.md).[message](IntegrityConstraintViolationError.md#message)

#### Defined in

node_modules/slonik/dist/src/errors.d.ts:5

___

### <a id="name" name="name"></a> name

• **name**: `string`

#### Inherited from

[IntegrityConstraintViolationError](IntegrityConstraintViolationError.md).[name](IntegrityConstraintViolationError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1028

___

### <a id="originalerror" name="originalerror"></a> originalError

• `Readonly` **originalError**: `Error`

#### Inherited from

[IntegrityConstraintViolationError](IntegrityConstraintViolationError.md).[originalError](IntegrityConstraintViolationError.md#originalerror)

#### Defined in

node_modules/slonik/dist/src/errors.d.ts:6

___

### <a id="stack" name="stack"></a> stack

• `Optional` **stack**: `string`

#### Inherited from

[IntegrityConstraintViolationError](IntegrityConstraintViolationError.md).[stack](IntegrityConstraintViolationError.md#stack)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1030

___

### <a id="preparestacktrace" name="preparestacktrace"></a> prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

Optional override for formatting stack traces

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

[IntegrityConstraintViolationError](IntegrityConstraintViolationError.md).[prepareStackTrace](IntegrityConstraintViolationError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### <a id="stacktracelimit" name="stacktracelimit"></a> stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[IntegrityConstraintViolationError](IntegrityConstraintViolationError.md).[stackTraceLimit](IntegrityConstraintViolationError.md#stacktracelimit)

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### <a id="capturestacktrace" name="capturestacktrace"></a> captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

[IntegrityConstraintViolationError](IntegrityConstraintViolationError.md).[captureStackTrace](IntegrityConstraintViolationError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:4
