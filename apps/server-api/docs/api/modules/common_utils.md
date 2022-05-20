# Module: common/utils

## Table of contents

### Variables

- [IS\_DEV\_MODE](common_utils.md#is_dev_mode)
- [IS\_PROD\_MODE](common_utils.md#is_prod_mode)
- [IS\_TEST\_MODE](common_utils.md#is_test_mode)
- [MONOREPO\_ROOT](common_utils.md#monorepo_root)
- [SERVER\_SRC\_ROOT](common_utils.md#server_src_root)

### Functions

- [requestLoggingContext](common_utils.md#requestloggingcontext)

## Variables

### <a id="is_dev_mode" name="is_dev_mode"></a> IS\_DEV\_MODE

• `Const` **IS\_DEV\_MODE**: `boolean`

#### Defined in

[common/utils/constants.ts:7](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/utils/constants.ts#L7)

___

### <a id="is_prod_mode" name="is_prod_mode"></a> IS\_PROD\_MODE

• `Const` **IS\_PROD\_MODE**: `boolean`

#### Defined in

[common/utils/constants.ts:8](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/utils/constants.ts#L8)

___

### <a id="is_test_mode" name="is_test_mode"></a> IS\_TEST\_MODE

• `Const` **IS\_TEST\_MODE**: `boolean`

#### Defined in

[common/utils/constants.ts:9](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/utils/constants.ts#L9)

___

### <a id="monorepo_root" name="monorepo_root"></a> MONOREPO\_ROOT

• `Const` **MONOREPO\_ROOT**: `string`

#### Defined in

[common/utils/constants.ts:5](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/utils/constants.ts#L5)

___

### <a id="server_src_root" name="server_src_root"></a> SERVER\_SRC\_ROOT

• `Const` **SERVER\_SRC\_ROOT**: `string`

#### Defined in

[common/utils/constants.ts:4](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/utils/constants.ts#L4)

## Functions

### <a id="requestloggingcontext" name="requestloggingcontext"></a> requestLoggingContext

▸ **requestLoggingContext**(`req`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `FastifyRequest`<`RouteGenericInterface`, `Server`, `IncomingMessage`, `unknown`, `FastifyLoggerInstance`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `acceptLanguage` | `undefined` \| `string` |
| `params` | `unknown` |
| `protocol` | ``"http"`` \| ``"https"`` |
| `referer` | `undefined` \| `string` |
| `remoteIp` | `string` |
| `requestMethod` | `string` |
| `requestUrl` | `string` |
| `userAgent` | `undefined` \| `string` |
| `userId` | `number` |

#### Defined in

[common/utils/logging.ts:5](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/utils/logging.ts#L5)
