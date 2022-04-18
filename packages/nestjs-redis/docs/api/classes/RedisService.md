# Class: RedisService

## Table of contents

### Constructors

- [constructor](RedisService.md#constructor)

### Properties

- [cryptoService](RedisService.md#cryptoservice)
- [defaultOptions](RedisService.md#defaultoptions)

### Accessors

- [client](RedisService.md#client)

### Methods

- [del](RedisService.md#del)
- [get](RedisService.md#get)
- [ping](RedisService.md#ping)
- [redisKey](RedisService.md#rediskey)
- [set](RedisService.md#set)
- [extractKey](RedisService.md#extractkey)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new RedisService**(`redisClient`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `redisClient` | [`RedisClientType`](../README.md#redisclienttype)<`Record`<`string`, `never`\>, `Record`<`string`, `never`\>\> |

#### Defined in

[packages/nestjs-redis/src/redis.service.ts:20](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-redis/src/redis.service.ts#L20)

## Properties

### <a id="cryptoservice" name="cryptoservice"></a> cryptoService

• `Protected` **cryptoService**: `undefined` \| [`CryptoService`](../interfaces/CryptoService.md)

#### Defined in

[packages/nestjs-redis/src/redis.service.ts:26](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-redis/src/redis.service.ts#L26)

___

### <a id="defaultoptions" name="defaultoptions"></a> defaultOptions

▪ `Static` **defaultOptions**: [`RedisCommandOptions`](../interfaces/RedisCommandOptions.md)

#### Defined in

[packages/nestjs-redis/src/redis.service.ts:15](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-redis/src/redis.service.ts#L15)

## Accessors

### <a id="client" name="client"></a> client

• `get` **client**(): [`RedisClientType`](../README.md#redisclienttype)<`Record`<`string`, `never`\>, `Record`<`string`, `never`\>\>

Get node-redis client instance

**`see`** https://redis.js.org/

#### Returns

[`RedisClientType`](../README.md#redisclienttype)<`Record`<`string`, `never`\>, `Record`<`string`, `never`\>\>

#### Defined in

[packages/nestjs-redis/src/redis.service.ts:46](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-redis/src/redis.service.ts#L46)

## Methods

### <a id="del" name="del"></a> del

▸ **del**(`key`, `options?`): `Promise`<`boolean`\>

Delete by key

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `key` | `string` | `undefined` | redis key |
| `options` | [`RedisCommandOptions`](../interfaces/RedisCommandOptions.md) | `RedisService.defaultOptions` | - |

#### Returns

`Promise`<`boolean`\>

delete result

#### Defined in

[packages/nestjs-redis/src/redis.service.ts:110](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-redis/src/redis.service.ts#L110)

___

### <a id="get" name="get"></a> get

▸ **get**(`key`, `options?`): `Promise`<``null`` \| `string`\>

Get value from redis

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key |
| `options?` | [`RedisCommandOptions`](../interfaces/RedisCommandOptions.md) | RedisCommandOptions |

#### Returns

`Promise`<``null`` \| `string`\>

Promise<string>

#### Defined in

[packages/nestjs-redis/src/redis.service.ts:90](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-redis/src/redis.service.ts#L90)

▸ **get**<`T`\>(`key`, `options?`): `Promise`<``null`` \| `T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `options?` | [`RedisCommandOptions`](../interfaces/RedisCommandOptions.md) |

#### Returns

`Promise`<``null`` \| `T`\>

#### Defined in

[packages/nestjs-redis/src/redis.service.ts:91](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-redis/src/redis.service.ts#L91)

___

### <a id="ping" name="ping"></a> ping

▸ **ping**(): `Promise`<`string`\>

Ping redis

#### Returns

`Promise`<`string`\>

string - 'PONG'

#### Defined in

[packages/nestjs-redis/src/redis.service.ts:118](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-redis/src/redis.service.ts#L118)

___

### <a id="rediskey" name="rediskey"></a> redisKey

▸ `Protected` **redisKey**(`key`, `options`): `string`

Encode Redis key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | redis key |
| `options` | [`RedisCommandOptions`](../interfaces/RedisCommandOptions.md) | - |

#### Returns

`string`

masked key

#### Defined in

[packages/nestjs-redis/src/redis.service.ts:127](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-redis/src/redis.service.ts#L127)

___

### <a id="set" name="set"></a> set

▸ **set**(`key`, `value`, `options?`): `Promise`<``null`` \| `string`\>

Set value to redis

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key |
| `value` | `string` | Value. |
| `options?` | [`RedisCommandOptions`](../interfaces/RedisCommandOptions.md) | RedisCommandOptions |

#### Returns

`Promise`<``null`` \| `string`\>

Promise<boolean>

#### Defined in

[packages/nestjs-redis/src/redis.service.ts:57](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-redis/src/redis.service.ts#L57)

▸ **set**<`T`\>(`key`, `value`, `options?`): `Promise`<``null`` \| `string`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `T` |
| `options?` | [`RedisCommandOptions`](../interfaces/RedisCommandOptions.md) |

#### Returns

`Promise`<``null`` \| `string`\>

#### Defined in

[packages/nestjs-redis/src/redis.service.ts:58](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-redis/src/redis.service.ts#L58)

___

### <a id="extractkey" name="extractkey"></a> extractKey

▸ `Static` **extractKey**(`key`): `Object`

Extract namespace from key

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Object`

namespace and key

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `namespace` | `undefined` \| `string` |

#### Defined in

[packages/nestjs-redis/src/redis.service.ts:33](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-redis/src/redis.service.ts#L33)
