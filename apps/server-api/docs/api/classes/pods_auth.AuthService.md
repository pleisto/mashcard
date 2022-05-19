# Class: AuthService

[pods/auth](../modules/pods_auth.md).AuthService

## Table of contents

### Constructors

- [constructor](pods_auth.AuthService.md#constructor)

### Methods

- [createSession](pods_auth.AuthService.md#createsession)
- [validate](pods_auth.AuthService.md#validate)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new AuthService**(`logger`)

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `logger` | `Logger` |

#### Defined in

[pods/auth/auth.service.ts:10](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/pods/auth/auth.service.ts#L10)

## Methods

### <a id="createsession" name="createsession"></a> createSession

▸ **createSession**(`req`, `user`): `Promise`<`void`\>

Create session for user.

#### Parameters

| Name   | Type                                                                                                        |
| :----- | :---------------------------------------------------------------------------------------------------------- |
| `req`  | `FastifyRequest`<`RouteGenericInterface`, `Server`, `IncomingMessage`, `unknown`, `FastifyLoggerInstance`\> |
| `user` | [`UserSession`](../interfaces/pods_auth.UserSession.md)                                                     |

#### Returns

`Promise`<`void`\>

#### Defined in

[pods/auth/auth.service.ts:15](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/pods/auth/auth.service.ts#L15)

---

### <a id="validate" name="validate"></a> validate

▸ **validate**(`__namedParameters`): `Promise`<`null` \| [`User`](pods_users.User.md)\>

#### Parameters

| Name                | Type      |
| :------------------ | :-------- |
| `__namedParameters` | `Request` |

#### Returns

`Promise`<`null` \| [`User`](pods_users.User.md)\>

#### Defined in

[pods/auth/auth.service.ts:20](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/pods/auth/auth.service.ts#L20)
