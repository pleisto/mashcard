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

[common/settings/settings.service.ts:14](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L14)

## Properties

### <a id="cache" name="cache"></a> cache

• `Protected` **cache**: `LRUCache`<`string`, `unknown`\>

#### Defined in

[common/settings/settings.service.ts:11](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L11)

___

### <a id="configmap" name="configmap"></a> configMap

• `Protected` **configMap**: [`SettingsItem`](../interfaces/common_settings.SettingsItem.md)<`any`\>[]

#### Defined in

[common/settings/settings.service.ts:12](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L12)

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

[common/settings/settings.service.ts:165](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L165)

___

### <a id="allexposeditems" name="allexposeditems"></a> allExposedItems

▸ **allExposedItems**(`context?`): `Promise`<`undefined` \| [`SettingsItem`](../interfaces/common_settings.SettingsItem.md)<`unknown`\>[]\>

Get all setting items that are exposed to the client

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`ScopeContext`](../interfaces/common_settings.ScopeContext.md) |

#### Returns

`Promise`<`undefined` \| [`SettingsItem`](../interfaces/common_settings.SettingsItem.md)<`unknown`\>[]\>

#### Defined in

[common/settings/settings.service.ts:102](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L102)

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

[common/settings/settings.service.ts:173](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L173)

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

[common/settings/settings.service.ts:161](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L161)

___

### <a id="calculatescope" name="calculatescope"></a> calculateScope

▸ `Protected` **calculateScope**(`strategy?`, `context`): `string`

calculate the scope based on the session context

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `strategy` | [`ScopeLookupStrategy`](../enums/common_settings.ScopeLookupStrategy.md) | `ScopeLookupStrategy.ROOT_ONLY` |
| `context` | [`ScopeContext`](../interfaces/common_settings.ScopeContext.md) | `undefined` |

#### Returns

`string`

#### Defined in

[common/settings/settings.service.ts:136](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L136)

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

[common/settings/settings.service.ts:129](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L129)

___

### <a id="get" name="get"></a> get

▸ **get**<`I`, `K`\>(`key`, `context?`): `Promise`<`undefined` \| `K`\>

Get a setting value

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `I` |
| `K` | extends `string` \| `number` \| `symbol` = keyof `I` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |
| `context` | [`ScopeContext`](../interfaces/common_settings.ScopeContext.md) |

#### Returns

`Promise`<`undefined` \| `K`\>

#### Defined in

[common/settings/settings.service.ts:31](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L31)

___

### <a id="update" name="update"></a> update

▸ **update**<`I`, `K`\>(`key`, `value`, `context?`): `Promise`<`boolean`\>

Update a setting value on the database

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `I` |
| `K` | extends `string` \| `number` \| `symbol` = keyof `I` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |
| `value` | `I`[`K`] |
| `context` | [`ScopeContext`](../interfaces/common_settings.ScopeContext.md) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[common/settings/settings.service.ts:62](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.service.ts#L62)
