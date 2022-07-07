# Interface: SpreadsheetCompletion

## Hierarchy

- `BaseCompletion`

  ↳ **`SpreadsheetCompletion`**

## Table of contents

### Properties

- [fallbackPositionOffset](SpreadsheetCompletion.md#fallbackpositionoffset)
- [fallbackValue](SpreadsheetCompletion.md#fallbackvalue)
- [flags](SpreadsheetCompletion.md#flags)
- [kind](SpreadsheetCompletion.md#kind)
- [name](SpreadsheetCompletion.md#name)
- [namespaceId](SpreadsheetCompletion.md#namespaceid)
- [preview](SpreadsheetCompletion.md#preview)
- [replacements](SpreadsheetCompletion.md#replacements)
- [weight](SpreadsheetCompletion.md#weight)

## Properties

### <a id="fallbackpositionoffset" name="fallbackpositionoffset"></a> fallbackPositionOffset

• `Optional` `Readonly` **fallbackPositionOffset**: `number`

#### Inherited from

BaseCompletion.fallbackPositionOffset

#### Defined in

[packages/formula/src/types/index.ts:482](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L482)

---

### <a id="fallbackvalue" name="fallbackvalue"></a> fallbackValue

• `Readonly` **fallbackValue**: `string`

#### Inherited from

BaseCompletion.fallbackValue

#### Defined in

[packages/formula/src/types/index.ts:481](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L481)

---

### <a id="flags" name="flags"></a> flags

• `Readonly` **flags**: [`CompletionFlag`](../README.md#completionflag)[]

#### Inherited from

BaseCompletion.flags

#### Defined in

[packages/formula/src/types/index.ts:479](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L479)

---

### <a id="kind" name="kind"></a> kind

• `Readonly` **kind**: `"spreadsheet"`

#### Overrides

BaseCompletion.kind

#### Defined in

[packages/formula/src/types/index.ts:506](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L506)

---

### <a id="name" name="name"></a> name

• `Readonly` **name**: `string`

#### Inherited from

BaseCompletion.name

#### Defined in

[packages/formula/src/types/index.ts:483](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L483)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• `Optional` `Readonly` **namespaceId**: `string`

#### Inherited from

BaseCompletion.namespaceId

#### Defined in

[packages/formula/src/types/index.ts:485](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L485)

---

### <a id="preview" name="preview"></a> preview

• `Readonly` **preview**: [`SpreadsheetType`](SpreadsheetType.md)

#### Overrides

BaseCompletion.preview

#### Defined in

[packages/formula/src/types/index.ts:507](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L507)

---

### <a id="replacements" name="replacements"></a> replacements

• `Readonly` **replacements**: `CompletionReplacement`[]

#### Inherited from

BaseCompletion.replacements

#### Defined in

[packages/formula/src/types/index.ts:480](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L480)

---

### <a id="weight" name="weight"></a> weight

• `Readonly` **weight**: `number`

#### Inherited from

BaseCompletion.weight

#### Defined in

[packages/formula/src/types/index.ts:478](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L478)
