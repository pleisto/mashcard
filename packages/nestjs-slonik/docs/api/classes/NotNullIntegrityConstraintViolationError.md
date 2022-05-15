# Class: NotNullIntegrityConstraintViolationError

## Hierarchy

- [`IntegrityConstraintViolationError`](IntegrityConstraintViolationError.md)

  ↳ **`NotNullIntegrityConstraintViolationError`**

## Table of contents

### Constructors

- [constructor](NotNullIntegrityConstraintViolationError.md#constructor)

### Properties

- [constraint](NotNullIntegrityConstraintViolationError.md#constraint)
- [message](NotNullIntegrityConstraintViolationError.md#message)
- [name](NotNullIntegrityConstraintViolationError.md#name)
- [originalError](NotNullIntegrityConstraintViolationError.md#originalerror)
- [stack](NotNullIntegrityConstraintViolationError.md#stack)
- [prepareStackTrace](NotNullIntegrityConstraintViolationError.md#preparestacktrace)
- [stackTraceLimit](NotNullIntegrityConstraintViolationError.md#stacktracelimit)

### Methods

- [captureStackTrace](NotNullIntegrityConstraintViolationError.md#capturestacktrace)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new NotNullIntegrityConstraintViolationError**(`error`, `constraint`)

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `error`      | `Error`  |
| `constraint` | `string` |

#### Overrides

[IntegrityConstraintViolationError](IntegrityConstraintViolationError.md).[constructor](IntegrityConstraintViolationError.md#constructor)

#### Defined in

node_modules/slonik/dist/src/errors.d.ts:40

## Properties

### <a id="constraint" name="constraint"></a> constraint

• **constraint**: `string`

#### Inherited from

[IntegrityConstraintViolationError](IntegrityConstraintViolationError.md).[constraint](IntegrityConstraintViolationError.md#constraint)

#### Defined in

node_modules/slonik/dist/src/errors.d.ts:36

---

### <a id="message" name="message"></a> message

• `Readonly` **message**: `string`

#### Inherited from

[IntegrityConstraintViolationError](IntegrityConstraintViolationError.md).[message](IntegrityConstraintViolationError.md#message)

#### Defined in

node_modules/slonik/dist/src/errors.d.ts:5

---

### <a id="name" name="name"></a> name

• **name**: `string`

#### Inherited from

[IntegrityConstraintViolationError](IntegrityConstraintViolationError.md).[name](IntegrityConstraintViolationError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1028

---

### <a id="originalerror" name="originalerror"></a> originalError

• `Readonly` **originalError**: `Error`

#### Inherited from

[IntegrityConstraintViolationError](IntegrityConstraintViolationError.md).[originalError](IntegrityConstraintViolationError.md#originalerror)

#### Defined in

node_modules/slonik/dist/src/errors.d.ts:6

---

### <a id="stack" name="stack"></a> stack

• `Optional` **stack**: `string`

#### Inherited from

[IntegrityConstraintViolationError](IntegrityConstraintViolationError.md).[stack](IntegrityConstraintViolationError.md#stack)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1030

---

### <a id="preparestacktrace" name="preparestacktrace"></a> prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name          | Type         |
| :------------ | :----------- |
| `err`         | `Error`      |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

[IntegrityConstraintViolationError](IntegrityConstraintViolationError.md).[prepareStackTrace](IntegrityConstraintViolationError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

---

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

| Name              | Type       |
| :---------------- | :--------- |
| `targetObject`    | `object`   |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

[IntegrityConstraintViolationError](IntegrityConstraintViolationError.md).[captureStackTrace](IntegrityConstraintViolationError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:4
