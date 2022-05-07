# Module: common/settings

## Table of contents

### Enumerations

- [ScopeLookupStrategy](../enums/common_settings.ScopeLookupStrategy.md)

### Classes

- [SettingsModule](../classes/common_settings.SettingsModule.md)
- [SettingsService](../classes/common_settings.SettingsService.md)

### Interfaces

- [ConfigMapProviders](../interfaces/common_settings.ConfigMapProviders.md)
- [ItemOptions](../interfaces/common_settings.ItemOptions.md)
- [ScopeContext](../interfaces/common_settings.ScopeContext.md)
- [SettingsItem](../interfaces/common_settings.SettingsItem.md)

### Variables

- [CONFIG\_MAP\_NAMESPACE\_METADATA](common_settings.md#config_map_namespace_metadata)
- [ITEM\_OPTIONS\_METADATA](common_settings.md#item_options_metadata)
- [SCOPE\_ROOT\_NODE](common_settings.md#scope_root_node)

### Functions

- [ConfigMap](common_settings.md#configmap)
- [Item](common_settings.md#item)

## Variables

### <a id="config_map_namespace_metadata" name="config_map_namespace_metadata"></a> CONFIG\_MAP\_NAMESPACE\_METADATA

• `Const` **CONFIG\_MAP\_NAMESPACE\_METADATA**: `string`

#### Defined in

[common/settings/settings.interface.ts:5](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L5)

___

### <a id="item_options_metadata" name="item_options_metadata"></a> ITEM\_OPTIONS\_METADATA

• `Const` **ITEM\_OPTIONS\_METADATA**: `string`

#### Defined in

[common/settings/settings.interface.ts:6](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L6)

___

### <a id="scope_root_node" name="scope_root_node"></a> SCOPE\_ROOT\_NODE

• `Const` **SCOPE\_ROOT\_NODE**: ``"root"``

#### Defined in

[common/settings/settings.interface.ts:7](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L7)

## Functions

### <a id="configmap" name="configmap"></a> ConfigMap

▸ **ConfigMap**(`namespace`): `ClassDecorator`

Decorator for declaring config map class.
ConfigMap is inspired by Kubernetes ConfigMap, it is a way to distribute stored configurations schemas.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `namespace` | `string` | Config map namespace (e.g. 'plugins.plugin-name') |

#### Returns

`ClassDecorator`

#### Defined in

[common/settings/config-map.decorator.ts:9](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/config-map.decorator.ts#L9)

___

### <a id="item" name="item"></a> Item

▸ **Item**(`options`): `PropertyDecorator`

Decorator for declaring config map item.
Item is a field of config map, that defines metadata about item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ItemOptions`](../interfaces/common_settings.ItemOptions.md) |

#### Returns

`PropertyDecorator`

#### Defined in

[common/settings/item.decorator.ts:7](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/item.decorator.ts#L7)
