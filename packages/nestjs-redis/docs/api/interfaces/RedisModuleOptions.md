# Interface: RedisModuleOptions

## Hierarchy

- `RedisClientOptions`<`never`, `Record`<`string`, `never`\>\>

  ↳ **`RedisModuleOptions`**

## Table of contents

### Properties

- [commandsQueueMaxLength](RedisModuleOptions.md#commandsqueuemaxlength)
- [cryptoService](RedisModuleOptions.md#cryptoservice)
- [database](RedisModuleOptions.md#database)
- [disableOfflineQueue](RedisModuleOptions.md#disableofflinequeue)
- [functions](RedisModuleOptions.md#functions)
- [isolationPoolOptions](RedisModuleOptions.md#isolationpooloptions)
- [legacyMode](RedisModuleOptions.md#legacymode)
- [modules](RedisModuleOptions.md#modules)
- [name](RedisModuleOptions.md#name)
- [password](RedisModuleOptions.md#password)
- [readonly](RedisModuleOptions.md#readonly)
- [scripts](RedisModuleOptions.md#scripts)
- [socket](RedisModuleOptions.md#socket)
- [url](RedisModuleOptions.md#url)
- [username](RedisModuleOptions.md#username)

## Properties

### <a id="commandsqueuemaxlength" name="commandsqueuemaxlength"></a> commandsQueueMaxLength

• `Optional` **commandsQueueMaxLength**: `number`

#### Inherited from

RedisClientOptions.commandsQueueMaxLength

#### Defined in

node_modules/@redis/client/dist/lib/client/index.d.ts:21

___

### <a id="cryptoservice" name="cryptoservice"></a> cryptoService

• `Optional` **cryptoService**: [`CryptoService`](CryptoService.md)

Crypto service to use for encrypting and decrypting data.
If not provided, data will be stored in plain text.

#### Defined in

[packages/nestjs-redis/src/redis.interface.ts:46](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-redis/src/redis.interface.ts#L46)

___

### <a id="database" name="database"></a> database

• `Optional` **database**: `number`

#### Inherited from

RedisClientOptions.database

#### Defined in

node_modules/@redis/client/dist/lib/client/index.d.ts:20

___

### <a id="disableofflinequeue" name="disableofflinequeue"></a> disableOfflineQueue

• `Optional` **disableOfflineQueue**: `boolean`

#### Inherited from

RedisClientOptions.disableOfflineQueue

#### Defined in

node_modules/@redis/client/dist/lib/client/index.d.ts:22

___

### <a id="functions" name="functions"></a> functions

• `Optional` **functions**: `Record`<`string`, `never`\>

#### Inherited from

RedisClientOptions.functions

#### Defined in

node_modules/@redis/client/dist/lib/commands/index.d.ts:45

___

### <a id="isolationpooloptions" name="isolationpooloptions"></a> isolationPoolOptions

• `Optional` **isolationPoolOptions**: `Options`

#### Inherited from

RedisClientOptions.isolationPoolOptions

#### Defined in

node_modules/@redis/client/dist/lib/client/index.d.ts:25

___

### <a id="legacymode" name="legacymode"></a> legacyMode

• `Optional` **legacyMode**: `boolean`

#### Inherited from

RedisClientOptions.legacyMode

#### Defined in

node_modules/@redis/client/dist/lib/client/index.d.ts:24

___

### <a id="modules" name="modules"></a> modules

• `Optional` **modules**: `undefined`

#### Inherited from

RedisClientOptions.modules

#### Defined in

node_modules/@redis/client/dist/lib/commands/index.d.ts:44

___

### <a id="name" name="name"></a> name

• `Optional` **name**: `string`

#### Inherited from

RedisClientOptions.name

#### Defined in

node_modules/@redis/client/dist/lib/client/index.d.ts:19

___

### <a id="password" name="password"></a> password

• `Optional` **password**: `string`

#### Inherited from

RedisClientOptions.password

#### Defined in

node_modules/@redis/client/dist/lib/client/index.d.ts:18

___

### <a id="readonly" name="readonly"></a> readonly

• `Optional` **readonly**: `boolean`

#### Inherited from

RedisClientOptions.readonly

#### Defined in

node_modules/@redis/client/dist/lib/client/index.d.ts:23

___

### <a id="scripts" name="scripts"></a> scripts

• `Optional` **scripts**: `RedisScripts`

#### Inherited from

RedisClientOptions.scripts

#### Defined in

node_modules/@redis/client/dist/lib/commands/index.d.ts:46

___

### <a id="socket" name="socket"></a> socket

• `Optional` **socket**: `RedisSocketOptions`

#### Inherited from

RedisClientOptions.socket

#### Defined in

node_modules/@redis/client/dist/lib/client/index.d.ts:16

___

### <a id="url" name="url"></a> url

• `Optional` **url**: `string`

#### Inherited from

RedisClientOptions.url

#### Defined in

node_modules/@redis/client/dist/lib/client/index.d.ts:15

___

### <a id="username" name="username"></a> username

• `Optional` **username**: `string`

#### Inherited from

RedisClientOptions.username

#### Defined in

node_modules/@redis/client/dist/lib/client/index.d.ts:17
