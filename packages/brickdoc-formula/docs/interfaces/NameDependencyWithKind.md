# Interface: NameDependencyWithKind

## Hierarchy

- [`NameDependency`](NameDependency.md)

  ↳ **`NameDependencyWithKind`**

## Table of contents

### Properties

- [id](NameDependencyWithKind.md#id)
- [kind](NameDependencyWithKind.md#kind)
- [name](NameDependencyWithKind.md#name)
- [namespaceId](NameDependencyWithKind.md#namespaceid)

### Methods

- [renderTokens](NameDependencyWithKind.md#rendertokens)

## Properties

### <a id="id" name="id"></a> id

• `Readonly` **id**: `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:734](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L734)

___

### <a id="kind" name="kind"></a> kind

• `Readonly` **kind**: ``"Block"`` \| ``"Spreadsheet"`` \| ``"Variable"``

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:735](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L735)

___

### <a id="name" name="name"></a> name

• `Readonly` **name**: `string`

#### Inherited from

[NameDependency](NameDependency.md).[name](NameDependency.md#name)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:730](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L730)

___

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• `Readonly` **namespaceId**: `string`

#### Inherited from

[NameDependency](NameDependency.md).[namespaceId](NameDependency.md#namespaceid)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:729](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L729)

## Methods

### <a id="rendertokens" name="rendertokens"></a> renderTokens

▸ `Readonly` **renderTokens**(`namespaceIsExist`, `namespaceId`): [`FormulaNameToken`](FormulaNameToken.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceIsExist` | `boolean` |
| `namespaceId` | `string` |

#### Returns

[`FormulaNameToken`](FormulaNameToken.md)[]

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:736](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L736)
