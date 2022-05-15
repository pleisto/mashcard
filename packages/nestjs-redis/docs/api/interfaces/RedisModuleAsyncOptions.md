# Interface: RedisModuleAsyncOptions

## Hierarchy

- `Pick`<`ModuleMetadata`, `"imports"`\>

  ↳ **`RedisModuleAsyncOptions`**

## Table of contents

### Properties

- [imports](RedisModuleAsyncOptions.md#imports)
- [inject](RedisModuleAsyncOptions.md#inject)

### Methods

- [useFactory](RedisModuleAsyncOptions.md#usefactory)

## Properties

### <a id="imports" name="imports"></a> imports

• `Optional` **imports**: (`Type`<`any`\> \| `DynamicModule` \| `Promise`<`DynamicModule`\> \| `ForwardReference`<`any`\>)[]

Optional list of imported modules that export the providers which are
required in this module.

#### Inherited from

Pick.imports

#### Defined in

node_modules/@nestjs/common/interfaces/modules/module-metadata.interface.d.ts:18

---

### <a id="inject" name="inject"></a> inject

• `Optional` **inject**: `any`[]

#### Defined in

[packages/nestjs-redis/src/redis.interface.ts:51](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-redis/src/redis.interface.ts#L51)

## Methods

### <a id="usefactory" name="usefactory"></a> useFactory

▸ **useFactory**(...`args`): [`RedisModuleOptions`](RedisModuleOptions.md) \| `Promise`<[`RedisModuleOptions`](RedisModuleOptions.md)\>

#### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

#### Returns

[`RedisModuleOptions`](RedisModuleOptions.md) \| `Promise`<[`RedisModuleOptions`](RedisModuleOptions.md)\>

#### Defined in

[packages/nestjs-redis/src/redis.interface.ts:50](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-redis/src/redis.interface.ts#L50)
