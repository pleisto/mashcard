# Enumeration: HookType

[common/server-plugin](../modules/common_server_plugin.md).HookType

## Table of contents

### Enumeration members

- [COMMON_BLOBS_STORAGE_ADAPTOR](common_server_plugin.HookType.md#common_blobs_storage_adaptor)
- [COMMON_KMS_SEED_DECODER](common_server_plugin.HookType.md#common_kms_seed_decoder)
- [CORE_INITIALIZER](common_server_plugin.HookType.md#core_initializer)

## Enumeration members

### <a id="common_blobs_storage_adaptor" name="common_blobs_storage_adaptor"></a> COMMON_BLOBS_STORAGE_ADAPTOR

• **COMMON_BLOBS_STORAGE_ADAPTOR** = `"common.BLOBS_ADAPTOR"`

Blobs Adaptor Hook.
see /common/blobs/adaptors/adaptor.provider.ts

#### Defined in

[apps/server-api/src/common/server-plugin/server-plugin.interface.ts:28](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/server-plugin/server-plugin.interface.ts#L28)

---

### <a id="common_kms_seed_decoder" name="common_kms_seed_decoder"></a> COMMON_KMS_SEED_DECODER

• **COMMON_KMS_SEED_DECODER** = `"common.kms.DECODER"`

KMS Seed Decoder Hook.
see /common/kms/decoder/decoder.provider.ts

#### Defined in

[apps/server-api/src/common/server-plugin/server-plugin.interface.ts:22](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/server-plugin/server-plugin.interface.ts#L22)

---

### <a id="core_initializer" name="core_initializer"></a> CORE_INITIALIZER

• **CORE_INITIALIZER** = `"core.INITIALIZER"`

Hook for server initialization.
see /core/initializers/index.ts

#### Defined in

[apps/server-api/src/common/server-plugin/server-plugin.interface.ts:16](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/server-plugin/server-plugin.interface.ts#L16)
