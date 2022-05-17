# Module: core/initializers

## Table of contents

### Functions

- [loadInitializers](core_initializers.md#loadinitializers)

## Functions

### <a id="loadinitializers" name="loadinitializers"></a> loadInitializers

▸ **loadInitializers**(`app`, `log`): `Promise`<`void`\>

loadInitializers will be called by `/main.ts` when the application is bootstrapped and listening for connections.

#### Parameters

| Name  | Type                     |
| :---- | :----------------------- |
| `app` | `NestFastifyApplication` |
| `log` | `Logger`                 |

#### Returns

`Promise`<`void`\>

#### Defined in

[apps/server-api/src/core/initializers/index.ts:21](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/core/initializers/index.ts#L21)
