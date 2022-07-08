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

• `Readonly` **kind**: ``"function"``

#### Overrides

BaseCompletion.kind

#### Defined in

[packages/formula/src/type/index.ts:317](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L317)

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

• `Readonly` **preview**: [`AnyFunctionClause`](AnyFunctionClause.md)<`any`\>

#### Overrides

BaseCompletion.preview

#### Defined in

[packages/formula/src/type/index.ts:318](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L318)

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
