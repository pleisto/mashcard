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
- [renderTokens](NameDependencyWithKind.md#rendertokens)

## Properties

### <a id="id" name="id"></a> id

• `Readonly` **id**: `string`

#### Defined in

[packages/formula/src/type/index.ts:625](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L625)

---

### <a id="kind" name="kind"></a> kind

• `Readonly` **kind**: `"Block"` \| `"Spreadsheet"` \| `"Variable"`

#### Defined in

[packages/formula/src/type/index.ts:626](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L626)

---

### <a id="name" name="name"></a> name

• `Readonly` **name**: `string`

#### Inherited from

[NameDependency](NameDependency.md).[name](NameDependency.md#name)

#### Defined in

[packages/formula/src/type/index.ts:621](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L621)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• `Readonly` **namespaceId**: `string`

#### Inherited from

[NameDependency](NameDependency.md).[namespaceId](NameDependency.md#namespaceid)

#### Defined in

[packages/formula/src/type/index.ts:620](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L620)

---

### <a id="rendertokens" name="rendertokens"></a> renderTokens

• `Readonly` **renderTokens**: (`namespaceIsExist`: `boolean`, `namespaceId`: `string`) => [`FormulaNameToken`](FormulaNameToken.md)[]

#### Type declaration

▸ (`namespaceIsExist`, `namespaceId`): [`FormulaNameToken`](FormulaNameToken.md)[]

##### Parameters

| Name               | Type      |
| :----------------- | :-------- |
| `namespaceIsExist` | `boolean` |
| `namespaceId`      | `string`  |

##### Returns

[`FormulaNameToken`](FormulaNameToken.md)[]

#### Defined in

[packages/formula/src/type/index.ts:627](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L627)
