# Interface: VariableCompletion

## Hierarchy

- `BaseCompletion`

  ↳ **`VariableCompletion`**

## Table of contents

### Properties

- [fallbackPositionOffset](VariableCompletion.md#fallbackpositionoffset)
- [fallbackValue](VariableCompletion.md#fallbackvalue)
- [flags](VariableCompletion.md#flags)
- [kind](VariableCompletion.md#kind)
- [name](VariableCompletion.md#name)
- [namespaceId](VariableCompletion.md#namespaceid)
- [preview](VariableCompletion.md#preview)
- [replacements](VariableCompletion.md#replacements)
- [weight](VariableCompletion.md#weight)

## Properties

### <a id="fallbackpositionoffset" name="fallbackpositionoffset"></a> fallbackPositionOffset

• `Optional` `Readonly` **fallbackPositionOffset**: `number`

#### Inherited from

BaseCompletion.fallbackPositionOffset

#### Defined in

[packages/formula/src/type/index.ts:320](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L320)

---

### <a id="fallbackvalue" name="fallbackvalue"></a> fallbackValue

• `Readonly` **fallbackValue**: `string`

#### Inherited from

BaseCompletion.fallbackValue

#### Defined in

[packages/formula/src/type/index.ts:319](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L319)

---

### <a id="flags" name="flags"></a> flags

• `Readonly` **flags**: [`CompletionFlag`](../README.md#completionflag)[]

#### Inherited from

BaseCompletion.flags

#### Defined in

[packages/formula/src/type/index.ts:317](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L317)

---

### <a id="kind" name="kind"></a> kind

• `Readonly` **kind**: `"variable"`

#### Overrides

BaseCompletion.kind

#### Defined in

[packages/formula/src/type/index.ts:331](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L331)

---

### <a id="name" name="name"></a> name

• `Readonly` **name**: `string`

#### Inherited from

BaseCompletion.name

#### Defined in

[packages/formula/src/type/index.ts:321](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L321)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• `Optional` `Readonly` **namespaceId**: `string`

#### Inherited from

BaseCompletion.namespaceId

#### Defined in

[packages/formula/src/type/index.ts:323](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L323)

---

### <a id="preview" name="preview"></a> preview

• `Readonly` **preview**: [`VariableInterface`](VariableInterface.md)

#### Overrides

BaseCompletion.preview

#### Defined in

[packages/formula/src/type/index.ts:332](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L332)

---

### <a id="replacements" name="replacements"></a> replacements

• `Readonly` **replacements**: `CompletionReplacement`[]

#### Inherited from

BaseCompletion.replacements

#### Defined in

[packages/formula/src/type/index.ts:318](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L318)

---

### <a id="weight" name="weight"></a> weight

• `Readonly` **weight**: `number`

#### Inherited from

BaseCompletion.weight

#### Defined in

[packages/formula/src/type/index.ts:316](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L316)
