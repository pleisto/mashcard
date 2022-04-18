# Interface: ItemOptions

[common/settings](../modules/common_settings.md).ItemOptions

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

[common/settings/settings.interface.ts:38](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L38)

___

### <a id="encrypted" name="encrypted"></a> encrypted

• `Optional` **encrypted**: `boolean`

Enabled data at rest encryption.
if `static` is true, encrypted will be ignored.

#### Defined in

[common/settings/settings.interface.ts:44](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L44)

___

### <a id="scope" name="scope"></a> scope

• `Optional` **scope**: [`ScopeLookupStrategy`](../enums/common_settings.ScopeLookupStrategy.md)

Defaults to `ScopeLookupStrategy.ROOT_ONLY`.

#### Defined in

[common/settings/settings.interface.ts:49](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L49)

___

### <a id="validation" name="validation"></a> validation

• `Optional` **validation**: `default`<`any`, `AnyObject`, `any`\>

yup schema for validation

#### Defined in

[common/settings/settings.interface.ts:54](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/settings/settings.interface.ts#L54)
