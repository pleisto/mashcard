# Class: NotFoundError

## Hierarchy

- [`SlonikError`](SlonikError.md)

  ↳ **`NotFoundError`**

## Table of contents

### Constructors

- [constructor](NotFoundError.md#constructor)

### Properties

- [message](NotFoundError.md#message)
- [name](NotFoundError.md#name)
- [stack](NotFoundError.md#stack)
- [prepareStackTrace](NotFoundError.md#preparestacktrace)
- [stackTraceLimit](NotFoundError.md#stacktracelimit)

### Methods

- [captureStackTrace](NotFoundError.md#capturestacktrace)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new NotFoundError**()

#### Overrides

[SlonikError](SlonikError.md).[constructor](SlonikError.md#constructor)

#### Defined in

node_modules/slonik/dist/src/errors.d.ts:30

## Properties

### <a id="message" name="message"></a> message

• **message**: `string`

#### Inherited from

[SlonikError](SlonikError.md).[message](SlonikError.md#message)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1029

---

### <a id="name" name="name"></a> name

• **name**: `string`

#### Inherited from

[SlonikError](SlonikError.md).[name](SlonikError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1028

---

### <a id="stack" name="stack"></a> stack

• `Optional` **stack**: `string`

#### Inherited from

[SlonikError](SlonikError.md).[stack](SlonikError.md#stack)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1030

---

### <a id="preparestacktrace" name="preparestacktrace"></a> prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

Optional override for formatting stack traces

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

[SlonikError](SlonikError.md).[prepareStackTrace](SlonikError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

---

### <a id="stacktracelimit" name="stacktracelimit"></a> stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[SlonikError](SlonikError.md).[stackTraceLimit](SlonikError.md#stacktracelimit)

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

[SlonikError](SlonikError.md).[captureStackTrace](SlonikError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:4
