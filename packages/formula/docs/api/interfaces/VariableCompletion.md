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

[packages/formula/src/type/index.ts:311](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L311)

___

### <a id="fallbackvalue" name="fallbackvalue"></a> fallbackValue

• `Readonly` **fallbackValue**: `string`

#### Inherited from

BaseCompletion.fallbackValue

#### Defined in

[packages/formula/src/type/index.ts:310](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L310)

___

### <a id="flags" name="flags"></a> flags

• `Readonly` **flags**: [`CompletionFlag`](../README.md#completionflag)[]

#### Inherited from

BaseCompletion.flags

#### Defined in

[packages/formula/src/type/index.ts:308](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L308)

___

### <a id="kind" name="kind"></a> kind

• `Readonly` **kind**: ``"variable"``

#### Overrides

BaseCompletion.kind

#### Defined in

[packages/formula/src/type/index.ts:322](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L322)

___

### <a id="name" name="name"></a> name

• `Readonly` **name**: `string`

#### Inherited from

BaseCompletion.name

#### Defined in

[packages/formula/src/type/index.ts:312](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L312)

___

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• `Optional` `Readonly` **namespaceId**: `string`

#### Inherited from

BaseCompletion.namespaceId

#### Defined in

[packages/formula/src/type/index.ts:314](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L314)

___

### <a id="preview" name="preview"></a> preview

• `Readonly` **preview**: [`VariableInterface`](VariableInterface.md)

#### Overrides

BaseCompletion.preview

#### Defined in

[packages/formula/src/type/index.ts:323](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L323)

___

### <a id="replacements" name="replacements"></a> replacements

• `Readonly` **replacements**: `CompletionReplacement`[]

#### Inherited from

BaseCompletion.replacements

#### Defined in

[packages/formula/src/type/index.ts:309](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L309)

___

### <a id="weight" name="weight"></a> weight

• `Readonly` **weight**: `number`

#### Inherited from

BaseCompletion.weight

#### Defined in

[packages/formula/src/type/index.ts:307](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L307)
