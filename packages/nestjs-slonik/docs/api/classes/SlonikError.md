# Class: SlonikError

## Hierarchy

- `default`

  ↳ **`SlonikError`**

  ↳↳ [`ConnectionError`](ConnectionError.md)

  ↳↳ [`DataIntegrityError`](DataIntegrityError.md)

  ↳↳ [`InvalidConfigurationError`](InvalidConfigurationError.md)

  ↳↳ [`InvalidInputError`](InvalidInputError.md)

  ↳↳ [`NotFoundError`](NotFoundError.md)

  ↳↳ [`UnexpectedStateError`](UnexpectedStateError.md)

## Table of contents

### Constructors

- [constructor](SlonikError.md#constructor)

### Properties

- [message](SlonikError.md#message)
- [name](SlonikError.md#name)
- [stack](SlonikError.md#stack)
- [prepareStackTrace](SlonikError.md#preparestacktrace)
- [stackTraceLimit](SlonikError.md#stacktracelimit)

### Methods

- [captureStackTrace](SlonikError.md#capturestacktrace)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new SlonikError**(`message?`)

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `message?` | `string` |

#### Inherited from

ExtendableError.constructor

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1034

## Properties

### <a id="message" name="message"></a> message

• **message**: `string`

#### Inherited from

ExtendableError.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1029

---

### <a id="name" name="name"></a> name

• **name**: `string`

#### Inherited from

ExtendableError.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1028

---

### <a id="stack" name="stack"></a> stack

• `Optional` **stack**: `string`

#### Inherited from

ExtendableError.stack

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

ExtendableError.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

---

### <a id="stacktracelimit" name="stacktracelimit"></a> stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

ExtendableError.stackTraceLimit

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

ExtendableError.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
