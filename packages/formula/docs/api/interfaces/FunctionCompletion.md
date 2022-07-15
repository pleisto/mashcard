# Interface: FunctionCompletion

## Hierarchy

- `BaseCompletion`

  ↳ **`FunctionCompletion`**

## Table of contents

### Properties

- [fallbackPositionOffset](FunctionCompletion.md#fallbackpositionoffset)
- [fallbackValue](FunctionCompletion.md#fallbackvalue)
- [flags](FunctionCompletion.md#flags)
- [kind](FunctionCompletion.md#kind)
- [name](FunctionCompletion.md#name)
- [namespaceId](FunctionCompletion.md#namespaceid)
- [preview](FunctionCompletion.md#preview)
- [replacements](FunctionCompletion.md#replacements)
- [weight](FunctionCompletion.md#weight)

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

• `Readonly` **kind**: `"function"`

#### Overrides

BaseCompletion.kind

#### Defined in

[packages/formula/src/type/index.ts:322](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L322)

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

• `Readonly` **preview**: [`AnyFunctionClause`](AnyFunctionClause.md)<`any`\>

#### Overrides

BaseCompletion.preview

#### Defined in

[packages/formula/src/type/index.ts:323](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L323)

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
