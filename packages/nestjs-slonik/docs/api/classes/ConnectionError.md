# Class: ConnectionError

## Hierarchy

- [`SlonikError`](SlonikError.md)

  ↳ **`ConnectionError`**

## Table of contents

### Constructors

- [constructor](ConnectionError.md#constructor)

### Properties

- [message](ConnectionError.md#message)
- [name](ConnectionError.md#name)
- [stack](ConnectionError.md#stack)
- [prepareStackTrace](ConnectionError.md#preparestacktrace)
- [stackTraceLimit](ConnectionError.md#stacktracelimit)

### Methods

- [captureStackTrace](ConnectionError.md#capturestacktrace)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new ConnectionError**(`message?`)

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `message?` | `string` |

#### Inherited from

[SlonikError](SlonikError.md).[constructor](SlonikError.md#constructor)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1034

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
