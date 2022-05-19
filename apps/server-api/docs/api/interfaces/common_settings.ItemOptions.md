# Interface: ItemOptions

[common/settings](../modules/common_settings.md).ItemOptions

ConfigMap item options

## Table of contents

### Properties

- [clientExposed](common_settings.ItemOptions.md#clientexposed)
- [encrypted](common_settings.ItemOptions.md#encrypted)
- [scope](common_settings.ItemOptions.md#scope)
- [validation](common_settings.ItemOptions.md#validation)

## Properties

### <a id="clientexposed" name="clientexposed"></a> clientExposed

• `Optional` **clientExposed**: `boolean`

The public fields will be exposed to the client.

#### Defined in

[common/settings/settings.interface.ts:70](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L70)

---

### <a id="encrypted" name="encrypted"></a> encrypted

• `Optional` **encrypted**: `boolean`

Enabled data at rest encryption.
if `clientExposed` is true or scope is`LOCAL_STATIC`, encrypted will be ignored.

#### Defined in

[common/settings/settings.interface.ts:76](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L76)

---

### <a id="scope" name="scope"></a> scope

• `Optional` **scope**: [`ScopeLookupStrategy`](../enums/common_settings.ScopeLookupStrategy.md)

Ordering strategy when recursively resolving scopes.
Defaults to `ScopeLookupStrategy.ROOT_ONLY`.

#### Defined in

[common/settings/settings.interface.ts:82](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L82)

---

### <a id="validation" name="validation"></a> validation

• `Optional` **validation**: `default`<`any`, `AnyObject`, `any`\>

yup schema for validation

#### Defined in

[common/settings/settings.interface.ts:87](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L87)
