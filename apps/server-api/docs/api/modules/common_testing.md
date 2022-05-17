# Module: common/testing

## Table of contents

### Type aliases

- [CallBack](common_testing.md#callback)

### Functions

- [useAppInstance](common_testing.md#useappinstance)
- [useAppInstanceWithGraphQL](common_testing.md#useappinstancewithgraphql)
- [useAppInstanceWithHttp](common_testing.md#useappinstancewithhttp)

## Type aliases

### <a id="callback" name="callback"></a> CallBack

Ƭ **CallBack**: (`app`: `NestFastifyApplication`, `moduleRef`: `TestingModule`) => `Promise`<`void`\>

#### Type declaration

▸ (`app`, `moduleRef`): `Promise`<`void`\>

##### Parameters

| Name        | Type                     |
| :---------- | :----------------------- |
| `app`       | `NestFastifyApplication` |
| `moduleRef` | `TestingModule`          |

##### Returns

`Promise`<`void`\>

#### Defined in

[apps/server-api/src/common/testing/http.utils.ts:8](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/testing/http.utils.ts#L8)

## Functions

### <a id="useappinstance" name="useappinstance"></a> useAppInstance

▸ **useAppInstance**(`beforeAllCallback?`, `afterAllCallback?`): `Promise`<() => `NestFastifyApplication`\>

Create app module for testing

#### Parameters

| Name                 | Type                                     |
| :------------------- | :--------------------------------------- |
| `beforeAllCallback?` | [`CallBack`](common_testing.md#callback) |
| `afterAllCallback?`  | [`CallBack`](common_testing.md#callback) |

#### Returns

`Promise`<() => `NestFastifyApplication`\>

#### Defined in

[apps/server-api/src/common/testing/http.utils.ts:15](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/testing/http.utils.ts#L15)

---

### <a id="useappinstancewithgraphql" name="useappinstancewithgraphql"></a> useAppInstanceWithGraphQL

▸ **useAppInstanceWithGraphQL**(`beforeAllCallback?`, `afterAllCallback?`): `Promise`<() => [`ApolloServerBase`<`any`\>, `NestFastifyApplication`]\>

Create GraphQL server based on app module for testing

#### Parameters

| Name                 | Type                                     |
| :------------------- | :--------------------------------------- |
| `beforeAllCallback?` | [`CallBack`](common_testing.md#callback) |
| `afterAllCallback?`  | [`CallBack`](common_testing.md#callback) |

#### Returns

`Promise`<() => [`ApolloServerBase`<`any`\>, `NestFastifyApplication`]\>

#### Defined in

[apps/server-api/src/common/testing/graphql.utils.ts:12](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/testing/graphql.utils.ts#L12)

---

### <a id="useappinstancewithhttp" name="useappinstancewithhttp"></a> useAppInstanceWithHttp

▸ **useAppInstanceWithHttp**(`beforeAllCallback?`, `afterAllCallback?`): `Promise`<() => `NestFastifyApplication`\>

Create http server based on app module for testing

#### Parameters

| Name                 | Type                                     |
| :------------------- | :--------------------------------------- |
| `beforeAllCallback?` | [`CallBack`](common_testing.md#callback) |
| `afterAllCallback?`  | [`CallBack`](common_testing.md#callback) |

#### Returns

`Promise`<() => `NestFastifyApplication`\>

#### Defined in

[apps/server-api/src/common/testing/http.utils.ts:43](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/testing/http.utils.ts#L43)
