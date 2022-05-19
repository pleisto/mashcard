# Class: UserService

[pods/users](../modules/pods_users.md).UserService

## Table of contents

### Constructors

- [constructor](pods_users.UserService.md#constructor)

### Methods

- [findOrCreateUser](pods_users.UserService.md#findorcreateuser)
- [getUserById](pods_users.UserService.md#getuserbyid)
- [getUserBySlug](pods_users.UserService.md#getuserbyslug)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new UserService**(`pool`)

#### Parameters

| Name   | Type           |
| :----- | :------------- |
| `pool` | `DatabasePool` |

#### Defined in

[pods/users/user.service.ts:9](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/pods/users/user.service.ts#L9)

## Methods

### <a id="findorcreateuser" name="findorcreateuser"></a> findOrCreateUser

▸ **findOrCreateUser**(`credential`): `Promise`<`Result`<[`User`](pods_users.User.md), `Error`\>\>

Find or create a user by credential

#### Parameters

| Name         | Type                                                                                                  |
| :----------- | :---------------------------------------------------------------------------------------------------- |
| `credential` | [`UserCredentialInput`](../interfaces/pods_users.UserCredentialInput.md)<`Record`<`string`, `any`\>\> |

#### Returns

`Promise`<`Result`<[`User`](pods_users.User.md), `Error`\>\>

#### Defined in

[pods/users/user.service.ts:15](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/pods/users/user.service.ts#L15)

---

### <a id="getuserbyid" name="getuserbyid"></a> getUserById

▸ **getUserById**(`id`): `Promise`<`Result`<[`User`](pods_users.User.md), `Error`\>\>

Get a user by id

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `number` |

#### Returns

`Promise`<`Result`<[`User`](pods_users.User.md), `Error`\>\>

#### Defined in

[pods/users/user.service.ts:32](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/pods/users/user.service.ts#L32)

---

### <a id="getuserbyslug" name="getuserbyslug"></a> getUserBySlug

▸ **getUserBySlug**(`slug`): `Promise`<`Result`<[`User`](pods_users.User.md), `Error`\>\>

Get a user by slug

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `slug` | `string` |

#### Returns

`Promise`<`Result`<[`User`](pods_users.User.md), `Error`\>\>

#### Defined in

[pods/users/user.service.ts:39](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/pods/users/user.service.ts#L39)
