# Class: HooksExplorer

[common/server-plugin](../modules/common_server_plugin.md).HooksExplorer

HooksExplorer could be used to discover server plugin hooks.

## Table of contents

### Constructors

- [constructor](common_server_plugin.HooksExplorer.md#constructor)

### Methods

- [findByType](common_server_plugin.HooksExplorer.md#findbytype)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new HooksExplorer**(`discoveryService`, `metadataAccessor`)

#### Parameters

| Name               | Type                   |
| :----------------- | :--------------------- |
| `discoveryService` | `DiscoveryService`     |
| `metadataAccessor` | `HookMetadataAccessor` |

#### Defined in

[apps/server-api/src/common/server-plugin/hooks.explorer.ts:12](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/server-plugin/hooks.explorer.ts#L12)

## Methods

### <a id="findbytype" name="findbytype"></a> findByType

▸ **findByType**<`T`\>(`type`): [`HookProvider`](../modules/common_server_plugin.md#hookprovider)<`T`\>[]

Find all hooks by type that have @ServerPluginHook() decorator

#### Type parameters

| Name | Type                                                            |
| :--- | :-------------------------------------------------------------- |
| `T`  | extends [`HookType`](../enums/common_server_plugin.HookType.md) |

#### Parameters

| Name   | Type |
| :----- | :--- |
| `type` | `T`  |

#### Returns

[`HookProvider`](../modules/common_server_plugin.md#hookprovider)<`T`\>[]

#### Defined in

[apps/server-api/src/common/server-plugin/hooks.explorer.ts:20](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/server-plugin/hooks.explorer.ts#L20)
