# Enumeration: HookType

[common/server-plugin](../modules/common_server_plugin.md).HookType

## Table of contents

### Enumeration members

- [COMMON_KMS_SEED_DECODER](common_server_plugin.HookType.md#common_kms_seed_decoder)
- [CORE_BLOBS_STORAGE_ADAPTOR](common_server_plugin.HookType.md#core_blobs_storage_adaptor)
- [CORE_INITIALIZER](common_server_plugin.HookType.md#core_initializer)

## Enumeration members

### <a id="common_kms_seed_decoder" name="common_kms_seed_decoder"></a> COMMON_KMS_SEED_DECODER

• **COMMON_KMS_SEED_DECODER** = `"common.kms.DECODER"`

KMS Seed Decoder Hook.
see /common/kms/decoder/decoder.provider.ts

#### Defined in

[common/server-plugin/server-plugin.interface.ts:22](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/server-plugin/server-plugin.interface.ts#L22)

---

### <a id="core_blobs_storage_adaptor" name="core_blobs_storage_adaptor"></a> CORE_BLOBS_STORAGE_ADAPTOR

• **CORE_BLOBS_STORAGE_ADAPTOR** = `"core.BLOBS_ADAPTOR"`

Blobs Adaptor Hook.
see /core/blobs/adaptors/adaptor.provider.ts

#### Defined in

[common/server-plugin/server-plugin.interface.ts:28](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/server-plugin/server-plugin.interface.ts#L28)

---

### <a id="core_initializer" name="core_initializer"></a> CORE_INITIALIZER

• **CORE_INITIALIZER** = `"core.INITIALIZER"`

Hook for server initialization.
see /core/initializers/index.ts

#### Defined in

[common/server-plugin/server-plugin.interface.ts:16](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/server-plugin/server-plugin.interface.ts#L16)
