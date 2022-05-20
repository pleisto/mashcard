# Class: SettingsService

[common/settings](../modules/common_settings.md).SettingsService

## Table of contents

### Constructors

- [constructor](common_settings.SettingsService.md#constructor)

### Properties

- [cache](common_settings.SettingsService.md#cache)
- [configMap](common_settings.SettingsService.md#configmap)
- [explorer](common_settings.SettingsService.md#explorer)

### Methods

- [allExportedItemsCachedKey](common_settings.SettingsService.md#allexporteditemscachedkey)
- [allExposedItems](common_settings.SettingsService.md#allexposeditems)
- [batchDeleteCache](common_settings.SettingsService.md#batchdeletecache)
- [cachedKey](common_settings.SettingsService.md#cachedkey)
- [calculateScope](common_settings.SettingsService.md#calculatescope)
- [findItem](common_settings.SettingsService.md#finditem)
- [get](common_settings.SettingsService.md#get)
- [getLocalSync](common_settings.SettingsService.md#getlocalsync)
- [update](common_settings.SettingsService.md#update)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new SettingsService**(`explorer`, `kms`, `pool`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `explorer` | `ConfigMapExplorer` |
| `kms` | [`KMSService`](common_kms.KMSService.md) |
| `pool` | `DatabasePool` |

#### Defined in

[common/settings/settings.service.ts:22](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L22)

## Properties

### <a id="cache" name="cache"></a> cache

• `Protected` **cache**: `LRUCache`<`string`, `unknown`\>

#### Defined in

[common/settings/settings.service.ts:19](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L19)

___

### <a id="configmap" name="configmap"></a> configMap

• `Protected` **configMap**: [`SettingsItem`](../interfaces/common_settings.SettingsItem.md)<`any`\>[]

#### Defined in

[common/settings/settings.service.ts:20](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L20)

___

### <a id="explorer" name="explorer"></a> explorer

• `Readonly` **explorer**: `ConfigMapExplorer`

## Methods

### <a id="allexporteditemscachedkey" name="allexporteditemscachedkey"></a> allExportedItemsCachedKey

▸ `Protected` **allExportedItemsCachedKey**(`context?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`ScopeContext`](../interfaces/common_settings.ScopeContext.md) |

#### Returns

`string`

#### Defined in

[common/settings/settings.service.ts:209](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L209)

___

### <a id="allexposeditems" name="allexposeditems"></a> allExposedItems

▸ **allExposedItems**(`context?`): `Promise`<`Result`<[`SettingsItem`](../interfaces/common_settings.SettingsItem.md)<`unknown`\>[], `Error`\>\>

Get all setting items that are exposed to the client

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`ScopeContext`](../interfaces/common_settings.ScopeContext.md) |

#### Returns

`Promise`<`Result`<[`SettingsItem`](../interfaces/common_settings.SettingsItem.md)<`unknown`\>[], `Error`\>\>

#### Defined in

[common/settings/settings.service.ts:134](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L134)

___

### <a id="batchdeletecache" name="batchdeletecache"></a> batchDeleteCache

▸ `Protected` **batchDeleteCache**(`keyPrefix`): `void`

Batch delete cached items

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyPrefix` | `string` |

#### Returns

`void`

#### Defined in

[common/settings/settings.service.ts:217](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L217)

___

### <a id="cachedkey" name="cachedkey"></a> cachedKey

▸ `Protected` **cachedKey**(`key`, `scope`): `string`

generate a cache key for the given scope and key

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `scope` | `string` |

#### Returns

`string`

#### Defined in

[common/settings/settings.service.ts:205](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L205)

___

### <a id="calculatescope" name="calculatescope"></a> calculateScope

▸ `Protected` **calculateScope**(`strategy?`, `context`): [scope: string, fallbackScope?: string]

Calculate the scope based on the session context

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `strategy` | [`ScopeLookupStrategy`](../enums/common_settings.ScopeLookupStrategy.md) | `ScopeLookupStrategy.ROOT_ONLY` |
| `context` | [`ScopeContext`](../interfaces/common_settings.ScopeContext.md) | `undefined` |

#### Returns

[scope: string, fallbackScope?: string]

#### Defined in

[common/settings/settings.service.ts:172](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L172)

___

### <a id="finditem" name="finditem"></a> findItem

▸ `Protected` **findItem**<`T`\>(`key`): `undefined` \| [`SettingsItem`](../interfaces/common_settings.SettingsItem.md)<`T`\>

Find the config map item by key

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` \| [`SettingsItem`](../interfaces/common_settings.SettingsItem.md)<`T`\>

#### Defined in

[common/settings/settings.service.ts:165](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L165)

___

### <a id="get" name="get"></a> get

▸ **get**<`T`\>(`key`, `context?`): `Promise`<`Result`<`undefined` \| `T`, `Error`\>\>

Get a setting value

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `context` | [`ScopeContext`](../interfaces/common_settings.ScopeContext.md) |

#### Returns

`Promise`<`Result`<`undefined` \| `T`, `Error`\>\>

#### Defined in

[common/settings/settings.service.ts:58](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L58)

___

### <a id="getlocalsync" name="getlocalsync"></a> getLocalSync

▸ **getLocalSync**<`T`\>(`key`, `context?`): `Result`<`undefined` \| `T`, `Error`\>

Get a setting value where the scope is LOCAL_STATIC in a synchronous way

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `context` | [`ScopeContext`](../interfaces/common_settings.ScopeContext.md) |

#### Returns

`Result`<`undefined` \| `T`, `Error`\>

#### Defined in

[common/settings/settings.service.ts:39](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L39)

___

### <a id="update" name="update"></a> update

▸ **update**<`T`\>(`key`, `value`, `context?`): `Promise`<`Result`<``null``, `Error`\>\>

Update a setting value on the database

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `T` |
| `context` | [`ScopeContext`](../interfaces/common_settings.ScopeContext.md) |

#### Returns

`Promise`<`Result`<``null``, `Error`\>\>

#### Defined in

[common/settings/settings.service.ts:90](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L90)
