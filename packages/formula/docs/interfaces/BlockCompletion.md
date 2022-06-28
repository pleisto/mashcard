# Interface: BlockCompletion

## Hierarchy

- `BaseCompletion`

  ↳ **`BlockCompletion`**

## Table of contents

### Properties

- [fallbackPositionOffset](BlockCompletion.md#fallbackpositionoffset)
- [fallbackValue](BlockCompletion.md#fallbackvalue)
- [flags](BlockCompletion.md#flags)
- [kind](BlockCompletion.md#kind)
- [name](BlockCompletion.md#name)
- [namespaceId](BlockCompletion.md#namespaceid)
- [preview](BlockCompletion.md#preview)
- [replacements](BlockCompletion.md#replacements)
- [weight](BlockCompletion.md#weight)

## Properties

### <a id="fallbackpositionoffset" name="fallbackpositionoffset"></a> fallbackPositionOffset

• `Optional` `Readonly` **fallbackPositionOffset**: `number`

#### Inherited from

BaseCompletion.fallbackPositionOffset

#### Defined in

[packages/formula/src/types/index.ts:452](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L452)

---

### <a id="fallbackvalue" name="fallbackvalue"></a> fallbackValue

• `Readonly` **fallbackValue**: `string`

#### Inherited from

BaseCompletion.fallbackValue

#### Defined in

[packages/formula/src/types/index.ts:451](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L451)

---

### <a id="flags" name="flags"></a> flags

• `Readonly` **flags**: [`CompletionFlag`](../README.md#completionflag)[]

#### Inherited from

BaseCompletion.flags

#### Defined in

[packages/formula/src/types/index.ts:449](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L449)

---

### <a id="kind" name="kind"></a> kind

• `Readonly` **kind**: `"block"`

#### Overrides

BaseCompletion.kind

#### Defined in

[packages/formula/src/types/index.ts:472](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L472)

---

### <a id="name" name="name"></a> name

• `Readonly` **name**: `string`

#### Inherited from

BaseCompletion.name

#### Defined in

[packages/formula/src/types/index.ts:453](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L453)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• `Optional` `Readonly` **namespaceId**: `string`

#### Inherited from

BaseCompletion.namespaceId

#### Defined in

[packages/formula/src/types/index.ts:455](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L455)

---

### <a id="preview" name="preview"></a> preview

• `Readonly` **preview**: [`BlockType`](BlockType.md)

#### Overrides

BaseCompletion.preview

#### Defined in

[packages/formula/src/types/index.ts:473](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L473)

---

### <a id="replacements" name="replacements"></a> replacements

• `Readonly` **replacements**: `CompletionReplacement`[]

#### Inherited from

BaseCompletion.replacements

#### Defined in

[packages/formula/src/types/index.ts:450](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L450)

---

### <a id="weight" name="weight"></a> weight

• `Readonly` **weight**: `number`

#### Inherited from

BaseCompletion.weight

#### Defined in

[packages/formula/src/types/index.ts:448](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L448)
