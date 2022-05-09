# Enumeration: ScopeLookupStrategy

[common/settings](../modules/common_settings.md).ScopeLookupStrategy

Scope lookup strategy for config item.

## Table of contents

### Enumeration members

- [LOCAL\_STATIC](common_settings.ScopeLookupStrategy.md#local_static)
- [ROOT\_ONLY](common_settings.ScopeLookupStrategy.md#root_only)
- [SPACE\_BASED](common_settings.ScopeLookupStrategy.md#space_based)
- [USER\_BASED](common_settings.ScopeLookupStrategy.md#user_based)

## Enumeration members

### <a id="local_static" name="local_static"></a> LOCAL\_STATIC

• **LOCAL\_STATIC** = `"local-static"`

LOCAL_STATIC means that config value is use static value and don't support modification.

reading order:
1. from the ConfigMap file

#### Defined in

[common/settings/settings.interface.ts:19](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L19)

___

### <a id="root_only" name="root_only"></a> ROOT\_ONLY

• **ROOT\_ONLY** = `"root-only"`

This is default strategy.
ROOT_ONLY means that values will try to be read from database,
or use default value defined in ConfigMap as fallback.
In database this value is global, and can be used by multiple tenants(scope context).

reading order:
1. from db with scope: 'root'
2. from the ConfigMap default value

#### Defined in

[common/settings/settings.interface.ts:31](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L31)

___

### <a id="space_based" name="space_based"></a> SPACE\_BASED

• **SPACE\_BASED** = `"space-based"`

SPACE_BASED means that values will try to be read from database,
and could override the value for different tenants(scope context).
If the scope context has both spaceId and userId, it will allow to
set different value for different users in the same space.

reading order if scopeContext is `{user:x, space:y}`:
1. from db with scope: 'space_y.user_x'
2. from db with scope: 'space_y'
3. from db with scope: 'user_x'
4. from db with scope: 'root'
5. from the ConfigMap default value

#### Defined in

[common/settings/settings.interface.ts:45](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L45)

___

### <a id="user_based" name="user_based"></a> USER\_BASED

• **USER\_BASED** = `"user-based"`

USER_BASED means that values will try to be read from database,
and could override the value for different tenants(scope context).
If the scope context has both spaceId and userId, it will allow to
set different value for different spaces in the same user.

reading order if scopeContext is `{user:x, space:y}`:
1. from db with scope: 'user_x.space_y'
2. from db with scope: 'user_x'
3. from db with scope: 'space_y'
4. from db with scope: 'root'
5. from the ConfigMap default value

#### Defined in

[common/settings/settings.interface.ts:59](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L59)
