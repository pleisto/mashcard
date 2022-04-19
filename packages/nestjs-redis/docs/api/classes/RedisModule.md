# Class: RedisModule

## Table of contents

### Constructors

- [constructor](RedisModule.md#constructor)

### Methods

- [forRoot](RedisModule.md#forroot)
- [forRootAsync](RedisModule.md#forrootasync)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new RedisModule**()

## Methods

### <a id="forroot" name="forroot"></a> forRoot

▸ `Static` **forRoot**(`options`): `DynamicModule`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`RedisModuleOptions`](../interfaces/RedisModuleOptions.md) |

#### Returns

`DynamicModule`

#### Defined in

[packages/nestjs-redis/src/redis.module.ts:6](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-redis/src/redis.module.ts#L6)

___

### <a id="forrootasync" name="forrootasync"></a> forRootAsync

▸ `Static` **forRootAsync**(`options`): `DynamicModule`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`RedisModuleAsyncOptions`](../interfaces/RedisModuleAsyncOptions.md) |

#### Returns

`DynamicModule`

#### Defined in

[packages/nestjs-redis/src/redis.module.ts:13](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-redis/src/redis.module.ts#L13)
