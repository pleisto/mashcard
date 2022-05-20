# Class: StatementCancelledError

## Hierarchy

- `WrappedPGError`

  ↳ **`StatementCancelledError`**

  ↳↳ [`StatementTimeoutError`](StatementTimeoutError.md)

## Table of contents

### Constructors

- [constructor](StatementCancelledError.md#constructor)

### Properties

- [message](StatementCancelledError.md#message)
- [name](StatementCancelledError.md#name)
- [originalError](StatementCancelledError.md#originalerror)
- [stack](StatementCancelledError.md#stack)
- [prepareStackTrace](StatementCancelledError.md#preparestacktrace)
- [stackTraceLimit](StatementCancelledError.md#stacktracelimit)

### Methods

- [captureStackTrace](StatementCancelledError.md#capturestacktrace)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new StatementCancelledError**(`error`, `message?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |
| `message?` | `string` |

#### Overrides

WrappedPGError.constructor

#### Defined in

node_modules/slonik/dist/src/errors.d.ts:18

## Properties

### <a id="message" name="message"></a> message

• `Readonly` **message**: `string`

#### Inherited from

WrappedPGError.message

#### Defined in

node_modules/slonik/dist/src/errors.d.ts:5

___

### <a id="name" name="name"></a> name

• **name**: `string`

#### Inherited from

WrappedPGError.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1028

___

### <a id="originalerror" name="originalerror"></a> originalError

• `Readonly` **originalError**: `Error`

#### Inherited from

WrappedPGError.originalError

#### Defined in

node_modules/slonik/dist/src/errors.d.ts:6

___

### <a id="stack" name="stack"></a> stack

• `Optional` **stack**: `string`

#### Inherited from

WrappedPGError.stack

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

WrappedPGError.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### <a id="stacktracelimit" name="stacktracelimit"></a> stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

WrappedPGError.stackTraceLimit

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

WrappedPGError.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
