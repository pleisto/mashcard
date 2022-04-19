# Enumeration: ScopeLookupStrategy

[common/settings](../modules/common_settings.md).ScopeLookupStrategy

scope lookup strategy

## Table of contents

### Enumeration members

- [LOCAL\_STATIC](common_settings.ScopeLookupStrategy.md#local_static)
- [ROOT\_ONLY](common_settings.ScopeLookupStrategy.md#root_only)
- [USER\_BASED](common_settings.ScopeLookupStrategy.md#user_based)
- [WORKSPACE\_BASED](common_settings.ScopeLookupStrategy.md#workspace_based)

## Enumeration members

### <a id="local_static" name="local_static"></a> LOCAL\_STATIC

• **LOCAL\_STATIC** = `"local-static"`

Static item will not read/write from/to the database.
It's value will be get from the ConfigMap file directly.

reading order:
1. from the ConfigMap file

#### Defined in

[common/settings/settings.interface.ts:20](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L20)

___

### <a id="root_only" name="root_only"></a> ROOT\_ONLY

• **ROOT\_ONLY** = `"root-only"`

This is default strategy.
reading order:
1. from db with scope: 'root'
2. from the ConfigMap file

#### Defined in

[common/settings/settings.interface.ts:28](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L28)

___

### <a id="user_based" name="user_based"></a> USER\_BASED

• **USER\_BASED** = `"user-based"`

reading order:
1. from db with scope: 'user_*.workspace_*'
2. from db with scope: 'user_*'
3. from db with scope: 'workspace_*'
4. from db with scope: 'root'
5. from the ConfigMap file

#### Defined in

[common/settings/settings.interface.ts:46](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L46)

___

### <a id="workspace_based" name="workspace_based"></a> WORKSPACE\_BASED

• **WORKSPACE\_BASED** = `"workspace-based"`

reading order:
1. from db with scope: 'workspace_*.user_*'
2. from db with scope: 'workspace_*'
3. from db with scope: 'user_*'
4. from db with scope: 'root'
5. from the ConfigMap file

#### Defined in

[common/settings/settings.interface.ts:37](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L37)
