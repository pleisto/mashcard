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

[packages/formula/src/type/index.ts:316](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L316)

---

### <a id="fallbackvalue" name="fallbackvalue"></a> fallbackValue

• `Readonly` **fallbackValue**: `string`

#### Inherited from

BaseCompletion.fallbackValue

#### Defined in

[packages/formula/src/type/index.ts:315](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L315)

---

### <a id="flags" name="flags"></a> flags

• `Readonly` **flags**: [`CompletionFlag`](../README.md#completionflag)[]

#### Inherited from

BaseCompletion.flags

#### Defined in

[packages/formula/src/type/index.ts:313](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L313)

---

### <a id="kind" name="kind"></a> kind

• `Readonly` **kind**: `"column"`

#### Overrides

BaseCompletion.kind

#### Defined in

[packages/formula/src/type/index.ts:332](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L332)

---

### <a id="name" name="name"></a> name

• `Readonly` **name**: `string`

#### Inherited from

BaseCompletion.name

#### Defined in

[packages/formula/src/type/index.ts:317](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L317)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• `Optional` `Readonly` **namespaceId**: `string`

#### Inherited from

BaseCompletion.namespaceId

#### Defined in

[packages/formula/src/type/index.ts:319](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L319)

---

### <a id="preview" name="preview"></a> preview

• `Readonly` **preview**: [`ColumnType`](ColumnType.md)

#### Overrides

BaseCompletion.preview

#### Defined in

[packages/formula/src/type/index.ts:333](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L333)

---

### <a id="replacements" name="replacements"></a> replacements

• `Readonly` **replacements**: `CompletionReplacement`[]

#### Inherited from

BaseCompletion.replacements

#### Defined in

[packages/formula/src/type/index.ts:314](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L314)

---

### <a id="weight" name="weight"></a> weight

• `Readonly` **weight**: `number`

#### Inherited from

BaseCompletion.weight

#### Defined in

[packages/formula/src/type/index.ts:312](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L312)
