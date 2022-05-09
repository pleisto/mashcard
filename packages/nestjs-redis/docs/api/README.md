# @brickdoc/nestjs-redis

## Table of contents

### Classes

- [RedisModule](classes/RedisModule.md)
- [RedisService](classes/RedisService.md)

### Interfaces

- [CryptoService](interfaces/CryptoService.md)
- [RedisCommandOptions](interfaces/RedisCommandOptions.md)
- [RedisModuleAsyncOptions](interfaces/RedisModuleAsyncOptions.md)
- [RedisModuleOptions](interfaces/RedisModuleOptions.md)

### Type aliases

- [RedisClientType](README.md#redisclienttype)

### Variables

- [REDIS\_CLIENT](README.md#redis_client)
- [REDIS\_MODULE\_OPTIONS](README.md#redis_module_options)

## Type aliases

### <a id="redisclienttype" name="redisclienttype"></a> RedisClientType

Ƭ **RedisClientType**<`M`, `F`, `S`\>: `RedisClient`<`M`, `F`, `S`\> & `WithCommands` & `WithModules`<`M`\> & `WithFunctions`<`F`\> & `WithScripts`<`S`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `M` | extends `RedisModules` = `Record`<`string`, `never`\> |
| `F` | extends `RedisFunctions` = `Record`<`string`, `never`\> |
| `S` | extends `RedisScripts` = `Record`<`string`, `never`\> |

#### Defined in

node_modules/@redis/client/dist/lib/client/index.d.ts:43

## Variables

### <a id="redis_client" name="redis_client"></a> REDIS\_CLIENT

• `Const` **REDIS\_CLIENT**: typeof [`REDIS_CLIENT`](README.md#redis_client)

IoC Token for injecting Redis client

#### Defined in

[packages/nestjs-redis/src/redis.interface.ts:14](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-redis/src/redis.interface.ts#L14)

___

### <a id="redis_module_options" name="redis_module_options"></a> REDIS\_MODULE\_OPTIONS

• `Const` **REDIS\_MODULE\_OPTIONS**: typeof [`REDIS_MODULE_OPTIONS`](README.md#redis_module_options)

IoC Token for injecting Redis module options

#### Defined in

[packages/nestjs-redis/src/redis.interface.ts:9](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-redis/src/redis.interface.ts#L9)
