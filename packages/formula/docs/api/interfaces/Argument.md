# Interface: Argument<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`UsedFormulaType`](../README.md#usedformulatype) = [`UsedFormulaType`](../README.md#usedformulatype) |

## Table of contents

### Properties

- [default](Argument.md#default)
- [name](Argument.md#name)
- [spread](Argument.md#spread)
- [type](Argument.md#type)

## Properties

### <a id="default" name="default"></a> default

• `Optional` `Readonly` **default**: [`AnyTypeResult`](../README.md#anytyperesult)<`T`\>

#### Defined in

[packages/formula/src/type/index.ts:208](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L208)

___

### <a id="name" name="name"></a> name

• `Readonly` **name**: `string`

#### Defined in

[packages/formula/src/type/index.ts:206](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L206)

___

### <a id="spread" name="spread"></a> spread

• `Optional` `Readonly` **spread**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:209](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L209)

___

### <a id="type" name="type"></a> type

• `Readonly` **type**: `T` \| readonly [`T`, `T`]

#### Defined in

[packages/formula/src/type/index.ts:207](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L207)
