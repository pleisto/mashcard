# Interface: ColumnCompletion

## Hierarchy

- `BaseCompletion`

  ↳ **`ColumnCompletion`**

## Table of contents

### Properties

- [fallbackPositionOffset](ColumnCompletion.md#fallbackpositionoffset)
- [fallbackValue](ColumnCompletion.md#fallbackvalue)
- [flags](ColumnCompletion.md#flags)
- [kind](ColumnCompletion.md#kind)
- [name](ColumnCompletion.md#name)
- [namespaceId](ColumnCompletion.md#namespaceid)
- [preview](ColumnCompletion.md#preview)
- [replacements](ColumnCompletion.md#replacements)
- [weight](ColumnCompletion.md#weight)

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

• `Readonly` **kind**: `"column"`

#### Overrides

BaseCompletion.kind

#### Defined in

[packages/formula/src/type/index.ts:336](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L336)

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

• `Readonly` **preview**: [`ColumnType`](ColumnType.md)

#### Overrides

BaseCompletion.preview

#### Defined in

[packages/formula/src/type/index.ts:337](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L337)

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
