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

[packages/formula/src/type/index.ts:320](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L320)

---

### <a id="fallbackvalue" name="fallbackvalue"></a> fallbackValue

• `Readonly` **fallbackValue**: `string`

#### Inherited from

BaseCompletion.fallbackValue

#### Defined in

[packages/formula/src/type/index.ts:319](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L319)

---

### <a id="flags" name="flags"></a> flags

• `Readonly` **flags**: [`CompletionFlag`](../README.md#completionflag)[]

#### Inherited from

BaseCompletion.flags

#### Defined in

[packages/formula/src/type/index.ts:317](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L317)

---

### <a id="kind" name="kind"></a> kind

• `Readonly` **kind**: `"block"`

#### Overrides

BaseCompletion.kind

#### Defined in

[packages/formula/src/type/index.ts:340](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L340)

---

### <a id="name" name="name"></a> name

• `Readonly` **name**: `string`

#### Inherited from

BaseCompletion.name

#### Defined in

[packages/formula/src/type/index.ts:321](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L321)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• `Optional` `Readonly` **namespaceId**: `string`

#### Inherited from

BaseCompletion.namespaceId

#### Defined in

[packages/formula/src/type/index.ts:323](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L323)

---

### <a id="preview" name="preview"></a> preview

• `Readonly` **preview**: [`BlockType`](BlockType.md)

#### Overrides

BaseCompletion.preview

#### Defined in

[packages/formula/src/type/index.ts:341](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L341)

---

### <a id="replacements" name="replacements"></a> replacements

• `Readonly` **replacements**: `CompletionReplacement`[]

#### Inherited from

BaseCompletion.replacements

#### Defined in

[packages/formula/src/type/index.ts:318](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L318)

---

### <a id="weight" name="weight"></a> weight

• `Readonly` **weight**: `number`

#### Inherited from

BaseCompletion.weight

#### Defined in

[packages/formula/src/type/index.ts:316](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L316)
