# Module: common/server-plugin

## Table of contents

### Enumerations

- [HookType](../enums/common_server_plugin.HookType.md)

### Classes

- [HooksExplorer](../classes/common_server_plugin.HooksExplorer.md)
- [ServerPluginModule](../classes/common_server_plugin.ServerPluginModule.md)

### Interfaces

- [ServerPluginMeta](../interfaces/common_server_plugin.ServerPluginMeta.md)

### Type aliases

- [HookProvider](common_server_plugin.md#hookprovider)

### Variables

- [SERVER\_PLUGIN\_HOOK\_OPTIONS\_METADATA](common_server_plugin.md#server_plugin_hook_options_metadata)

### Functions

- [ServerPluginHook](common_server_plugin.md#serverpluginhook)

## Type aliases

### <a id="hookprovider" name="hookprovider"></a> HookProvider

Ƭ **HookProvider**<`T`\>: `HookProviders`[`T`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`HookType`](../enums/common_server_plugin.HookType.md) |

#### Defined in

[common/server-plugin/server-plugin.interface.ts:25](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/server-plugin/server-plugin.interface.ts#L25)

## Variables

### <a id="server_plugin_hook_options_metadata" name="server_plugin_hook_options_metadata"></a> SERVER\_PLUGIN\_HOOK\_OPTIONS\_METADATA

• `Const` **SERVER\_PLUGIN\_HOOK\_OPTIONS\_METADATA**: ``"brickdoc-server-plugin:hook"``

#### Defined in

[common/server-plugin/server-plugin.interface.ts:7](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/server-plugin/server-plugin.interface.ts#L7)

## Functions

### <a id="serverpluginhook" name="serverpluginhook"></a> ServerPluginHook

▸ **ServerPluginHook**(`type`): `ClassDecorator`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`HookType`](../enums/common_server_plugin.HookType.md) |

#### Returns

`ClassDecorator`

#### Defined in

[common/server-plugin/hook.decorator.ts:4](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/server-plugin/hook.decorator.ts#L4)
