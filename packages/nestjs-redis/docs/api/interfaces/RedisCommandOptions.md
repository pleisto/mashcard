# Interface: RedisCommandOptions

## Table of contents

### Properties

- [encrypted](RedisCommandOptions.md#encrypted)
- [getSet](RedisCommandOptions.md#getset)
- [hashedKey](RedisCommandOptions.md#hashedkey)
- [keepTTL](RedisCommandOptions.md#keepttl)
- [onlyExists](RedisCommandOptions.md#onlyexists)
- [onlyNotExists](RedisCommandOptions.md#onlynotexists)
- [ttl](RedisCommandOptions.md#ttl)
- [ttlTimestamp](RedisCommandOptions.md#ttltimestamp)

## Properties

### <a id="encrypted" name="encrypted"></a> encrypted

• **encrypted**: `boolean`

Auto encrypt/decrypt `key` and `value` by symmetric-key algorithm.
`ENV.SECRET_KEY_BASE` will be used as cipher key.
Excluding the namespaces prefix for `key`.

Applies to **all** methods.

**`defaultvalue`** false

#### Defined in

[packages/nestjs-redis/src/redis.interface.ts:72](https://github.com/brickdoc/brickdoc/blob/5e2ec65d/packages/nestjs-redis/src/redis.interface.ts#L72)

___

### <a id="getset" name="getset"></a> getSet

• `Optional` **getSet**: `boolean`

Return the old string stored at key, or nil if key did not exist.
An error is returned and SET aborted if the value stored at key is not a string.
Equals to Redis `GETSET` option.

Applies to `set` method.

#### Defined in

[packages/nestjs-redis/src/redis.interface.ts:112](https://github.com/brickdoc/brickdoc/blob/5e2ec65d/packages/nestjs-redis/src/redis.interface.ts#L112)

___

### <a id="hashedkey" name="hashedkey"></a> hashedKey

• **hashedKey**: `boolean`

Data masking by Hash algorithm for `key`.
Excluding the namespaces prefix.

Applies to **all** methods.

**`defaultvalue`** false

#### Defined in

[packages/nestjs-redis/src/redis.interface.ts:62](https://github.com/brickdoc/brickdoc/blob/5e2ec65d/packages/nestjs-redis/src/redis.interface.ts#L62)

___

### <a id="keepttl" name="keepttl"></a> keepTTL

• `Optional` **keepTTL**: `boolean`

Keep the key's TTL (time to live). Equals to Redis `KEEPTTL` option.

Applies to `set` method.

#### Defined in

[packages/nestjs-redis/src/redis.interface.ts:104](https://github.com/brickdoc/brickdoc/blob/5e2ec65d/packages/nestjs-redis/src/redis.interface.ts#L104)

___

### <a id="onlyexists" name="onlyexists"></a> onlyExists

• `Optional` **onlyExists**: `boolean`

Only set the key if it already exists. Equals to Redis `XX` option.

Applies to `set` method.

#### Defined in

[packages/nestjs-redis/src/redis.interface.ts:98](https://github.com/brickdoc/brickdoc/blob/5e2ec65d/packages/nestjs-redis/src/redis.interface.ts#L98)

___

### <a id="onlynotexists" name="onlynotexists"></a> onlyNotExists

• `Optional` **onlyNotExists**: `boolean`

Only set the key if it does not already exist. Equals to Redis `NX` option.

Applies to `set` method.

#### Defined in

[packages/nestjs-redis/src/redis.interface.ts:92](https://github.com/brickdoc/brickdoc/blob/5e2ec65d/packages/nestjs-redis/src/redis.interface.ts#L92)

___

### <a id="ttl" name="ttl"></a> ttl

• `Optional` **ttl**: `number`

Set the specified expire time, **in milliseconds**. Equals to Redis `PX` option.

Applies to `set` method.

#### Defined in

[packages/nestjs-redis/src/redis.interface.ts:79](https://github.com/brickdoc/brickdoc/blob/5e2ec65d/packages/nestjs-redis/src/redis.interface.ts#L79)

___

### <a id="ttltimestamp" name="ttltimestamp"></a> ttlTimestamp

• `Optional` **ttlTimestamp**: `number`

Set the specified Unix time at which the key will expire, **in milliseconds**.
Equals to Redis `PXAT` option.

Applies to `set` method.

#### Defined in

[packages/nestjs-redis/src/redis.interface.ts:86](https://github.com/brickdoc/brickdoc/blob/5e2ec65d/packages/nestjs-redis/src/redis.interface.ts#L86)
