# Class: UserService

[pods/users](../modules/pods_users.md).UserService

## Table of contents

### Constructors

- [constructor](pods_users.UserService.md#constructor)

### Methods

- [findOrCreateUser](pods_users.UserService.md#findorcreateuser)
- [findUserApprearance](pods_users.UserService.md#finduserapprearance)
- [findUserById](pods_users.UserService.md#finduserbyid)
- [findUserBySlug](pods_users.UserService.md#finduserbyslug)
- [updateUserAppearance](pods_users.UserService.md#updateuserappearance)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new UserService**(`pool`, `settingService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pool` | `DatabasePool` |
| `settingService` | [`SettingsService`](common_settings.SettingsService.md) |

#### Defined in

[pods/users/user.service.ts:13](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/pods/users/user.service.ts#L13)

## Methods

### <a id="findorcreateuser" name="findorcreateuser"></a> findOrCreateUser

▸ **findOrCreateUser**(`credential`): `Promise`<`Result`<[`User`](pods_users.User.md), `Error`\>\>

Find or create a user by credential

#### Parameters

| Name | Type |
| :------ | :------ |
| `credential` | [`UserCredentialInput`](../interfaces/pods_users.UserCredentialInput.md)<`Record`<`string`, `any`\>\> |

#### Returns

`Promise`<`Result`<[`User`](pods_users.User.md), `Error`\>\>

#### Defined in

[pods/users/user.service.ts:19](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/pods/users/user.service.ts#L19)

___

### <a id="finduserapprearance" name="finduserapprearance"></a> findUserApprearance

▸ **findUserApprearance**(`user`): `Promise`<`Result`<`UserAppearance`, `Error`\>\>

Find user appearance

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`UserSession`](../interfaces/pods_auth.UserSession.md) |

#### Returns

`Promise`<`Result`<`UserAppearance`, `Error`\>\>

#### Defined in

[pods/users/user.service.ts:50](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/pods/users/user.service.ts#L50)

___

### <a id="finduserbyid" name="finduserbyid"></a> findUserById

▸ **findUserById**(`id`): `Promise`<`Result`<[`User`](pods_users.User.md), `Error`\>\>

Get a user by id

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

`Promise`<`Result`<[`User`](pods_users.User.md), `Error`\>\>

#### Defined in

[pods/users/user.service.ts:36](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/pods/users/user.service.ts#L36)

___

### <a id="finduserbyslug" name="finduserbyslug"></a> findUserBySlug

▸ **findUserBySlug**(`slug`): `Promise`<`Result`<[`User`](pods_users.User.md), `Error`\>\>

Get a user by slug

#### Parameters

| Name | Type |
| :------ | :------ |
| `slug` | `string` |

#### Returns

`Promise`<`Result`<[`User`](pods_users.User.md), `Error`\>\>

#### Defined in

[pods/users/user.service.ts:43](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/pods/users/user.service.ts#L43)

___

### <a id="updateuserappearance" name="updateuserappearance"></a> updateUserAppearance

▸ **updateUserAppearance**(`user`, `input`): `Promise`<`Result`<`boolean`, `Error`\>\>

Update user appearance

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`UserSession`](../interfaces/pods_auth.UserSession.md) |
| `input` | `UserAppearanceUpdateInput` |

#### Returns

`Promise`<`Result`<`boolean`, `Error`\>\>

#### Defined in

[pods/users/user.service.ts:65](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/pods/users/user.service.ts#L65)
