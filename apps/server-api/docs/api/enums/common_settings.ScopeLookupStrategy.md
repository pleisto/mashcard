# Enumeration: ScopeLookupStrategy

[common/settings](../modules/common_settings.md).ScopeLookupStrategy

scope lookup strategy

## Table of contents

### Enumeration members

- [LOCAL\_STATIC](common_settings.ScopeLookupStrategy.md#local_static)
- [ROOT\_ONLY](common_settings.ScopeLookupStrategy.md#root_only)
- [USER\_FIRST](common_settings.ScopeLookupStrategy.md#user_first)
- [WORKSPACE\_FIRST](common_settings.ScopeLookupStrategy.md#workspace_first)

## Enumeration members

### <a id="local_static" name="local_static"></a> LOCAL\_STATIC

• **LOCAL\_STATIC** = `"local-static"`

Static item will not read/write from/to the database.
It's value will be get from the ConfigMap file directly.

#### Defined in

[common/settings/settings.interface.ts:17](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L17)

___

### <a id="root_only" name="root_only"></a> ROOT\_ONLY

• **ROOT\_ONLY** = `"root-only"`

scope: 'root'.

#### Defined in

[common/settings/settings.interface.ts:22](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L22)

___

### <a id="user_first" name="user_first"></a> USER\_FIRST

• **USER\_FIRST** = `"user-first"`

scope: `root.workspace_*.user_*`

#### Defined in

[common/settings/settings.interface.ts:30](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L30)

___

### <a id="workspace_first" name="workspace_first"></a> WORKSPACE\_FIRST

• **WORKSPACE\_FIRST** = `"workspace-first"`

scope: `root.user_.*.workspace_*`

#### Defined in

[common/settings/settings.interface.ts:26](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L26)
