# Module: common/utils

## Table of contents

### Variables

- [IS_DEV_MODE](common_utils.md#is_dev_mode)
- [IS_PROD_MODE](common_utils.md#is_prod_mode)
- [IS_TEST_MODE](common_utils.md#is_test_mode)
- [MONOREPO_ROOT](common_utils.md#monorepo_root)
- [SERVER_SRC_ROOT](common_utils.md#server_src_root)

### Functions

- [requestLoggingContext](common_utils.md#requestloggingcontext)
- [safeJsonParse](common_utils.md#safejsonparse)

## Variables

### <a id="is_dev_mode" name="is_dev_mode"></a> IS_DEV_MODE

• `Const` **IS_DEV_MODE**: `boolean`

#### Defined in

[apps/server-api/src/common/utils/constants.ts:7](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/utils/constants.ts#L7)

---

### <a id="is_prod_mode" name="is_prod_mode"></a> IS_PROD_MODE

• `Const` **IS_PROD_MODE**: `boolean`

#### Defined in

[apps/server-api/src/common/utils/constants.ts:8](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/utils/constants.ts#L8)

---

### <a id="is_test_mode" name="is_test_mode"></a> IS_TEST_MODE

• `Const` **IS_TEST_MODE**: `boolean`

#### Defined in

[apps/server-api/src/common/utils/constants.ts:9](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/utils/constants.ts#L9)

---

### <a id="monorepo_root" name="monorepo_root"></a> MONOREPO_ROOT

• `Const` **MONOREPO_ROOT**: `string`

#### Defined in

[apps/server-api/src/common/utils/constants.ts:5](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/utils/constants.ts#L5)

---

### <a id="server_src_root" name="server_src_root"></a> SERVER_SRC_ROOT

• `Const` **SERVER_SRC_ROOT**: `string`

#### Defined in

[apps/server-api/src/common/utils/constants.ts:4](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/utils/constants.ts#L4)

## Functions

### <a id="requestloggingcontext" name="requestloggingcontext"></a> requestLoggingContext

▸ **requestLoggingContext**(`req`): `Object`

#### Parameters

| Name  | Type                                                                                                        |
| :---- | :---------------------------------------------------------------------------------------------------------- |
| `req` | `FastifyRequest`<`RouteGenericInterface`, `Server`, `IncomingMessage`, `unknown`, `FastifyLoggerInstance`\> |

#### Returns

`Object`

| Name             | Type                    |
| :--------------- | :---------------------- |
| `acceptLanguage` | `undefined` \| `string` |
| `params`         | `unknown`               |
| `protocol`       | `"http"` \| `"https"`   |
| `referer`        | `undefined` \| `string` |
| `remoteIp`       | `string`                |
| `requestMethod`  | `string`                |
| `requestUrl`     | `string`                |
| `userAgent`      | `undefined` \| `string` |

#### Defined in

[apps/server-api/src/common/utils/logging.ts:4](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/utils/logging.ts#L4)

---

### <a id="safejsonparse" name="safejsonparse"></a> safeJsonParse

▸ **safeJsonParse**(...`args`): `Result`<`any`, `unknown`\>

JSON Parser with result wrapper

#### Parameters

| Name      | Type                               |
| :-------- | :--------------------------------- |
| `...args` | [text: string, reviver?: Function] |

#### Returns

`Result`<`any`, `unknown`\>

#### Defined in

[apps/server-api/src/common/utils/neverthrow.ts:6](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/utils/neverthrow.ts#L6)
