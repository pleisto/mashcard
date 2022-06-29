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

[packages/formula/src/types/index.ts:476](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L476)

---

### <a id="fallbackvalue" name="fallbackvalue"></a> fallbackValue

• `Readonly` **fallbackValue**: `string`

#### Inherited from

BaseCompletion.fallbackValue

#### Defined in

[packages/formula/src/types/index.ts:475](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L475)

---

### <a id="flags" name="flags"></a> flags

• `Readonly` **flags**: [`CompletionFlag`](../README.md#completionflag)[]

#### Inherited from

BaseCompletion.flags

#### Defined in

[packages/formula/src/types/index.ts:473](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L473)

---

### <a id="kind" name="kind"></a> kind

• `Readonly` **kind**: `"variable"`

#### Overrides

BaseCompletion.kind

#### Defined in

[packages/formula/src/types/index.ts:487](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L487)

---

### <a id="name" name="name"></a> name

• `Readonly` **name**: `string`

#### Inherited from

BaseCompletion.name

#### Defined in

[packages/formula/src/types/index.ts:477](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L477)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• `Optional` `Readonly` **namespaceId**: `string`

#### Inherited from

BaseCompletion.namespaceId

#### Defined in

[packages/formula/src/types/index.ts:479](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L479)

---

### <a id="preview" name="preview"></a> preview

• `Readonly` **preview**: [`VariableInterface`](VariableInterface.md)

#### Overrides

BaseCompletion.preview

#### Defined in

[packages/formula/src/types/index.ts:488](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L488)

---

### <a id="replacements" name="replacements"></a> replacements

• `Readonly` **replacements**: `CompletionReplacement`[]

#### Inherited from

BaseCompletion.replacements

#### Defined in

[packages/formula/src/types/index.ts:474](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L474)

---

### <a id="weight" name="weight"></a> weight

• `Readonly` **weight**: `number`

#### Inherited from

BaseCompletion.weight

#### Defined in

[packages/formula/src/types/index.ts:472](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L472)
