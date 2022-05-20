# Class: StatementTimeoutError

## Hierarchy

- [`StatementCancelledError`](StatementCancelledError.md)

  ↳ **`StatementTimeoutError`**

## Table of contents

### Constructors

- [constructor](StatementTimeoutError.md#constructor)

### Properties

- [message](StatementTimeoutError.md#message)
- [name](StatementTimeoutError.md#name)
- [originalError](StatementTimeoutError.md#originalerror)
- [stack](StatementTimeoutError.md#stack)
- [prepareStackTrace](StatementTimeoutError.md#preparestacktrace)
- [stackTraceLimit](StatementTimeoutError.md#stacktracelimit)

### Methods

- [captureStackTrace](StatementTimeoutError.md#capturestacktrace)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new StatementTimeoutError**(`error`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |

#### Overrides

[StatementCancelledError](StatementCancelledError.md).[constructor](StatementCancelledError.md#constructor)

#### Defined in

node_modules/slonik/dist/src/errors.d.ts:21

## Properties

### <a id="message" name="message"></a> message

• `Readonly` **message**: `string`

#### Inherited from

[StatementCancelledError](StatementCancelledError.md).[message](StatementCancelledError.md#message)

#### Defined in

node_modules/slonik/dist/src/errors.d.ts:5

___

### <a id="name" name="name"></a> name

• **name**: `string`

#### Inherited from

[StatementCancelledError](StatementCancelledError.md).[name](StatementCancelledError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1028

___

### <a id="originalerror" name="originalerror"></a> originalError

• `Readonly` **originalError**: `Error`

#### Inherited from

[StatementCancelledError](StatementCancelledError.md).[originalError](StatementCancelledError.md#originalerror)

#### Defined in

node_modules/slonik/dist/src/errors.d.ts:6

___

### <a id="stack" name="stack"></a> stack

• `Optional` **stack**: `string`

#### Inherited from

[StatementCancelledError](StatementCancelledError.md).[stack](StatementCancelledError.md#stack)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1030

___

### <a id="preparestacktrace" name="preparestacktrace"></a> prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

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

[StatementCancelledError](StatementCancelledError.md).[prepareStackTrace](StatementCancelledError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### <a id="stacktracelimit" name="stacktracelimit"></a> stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[StatementCancelledError](StatementCancelledError.md).[stackTraceLimit](StatementCancelledError.md#stacktracelimit)

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

[StatementCancelledError](StatementCancelledError.md).[captureStackTrace](StatementCancelledError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:4
