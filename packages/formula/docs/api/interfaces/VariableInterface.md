# Interface: VariableInterface

## Implemented by

- [`VariableClass`](../classes/VariableClass.md)

## Table of contents

### Properties

- [currentUUID](VariableInterface.md#currentuuid)
- [formulaContext](VariableInterface.md#formulacontext)
- [id](VariableInterface.md#id)
- [isNew](VariableInterface.md#isnew)
- [isReadyT](VariableInterface.md#isreadyt)
- [t](VariableInterface.md#t)
- [trackDirty](VariableInterface.md#trackdirty)

### Methods

- [buildFormula](VariableInterface.md#buildformula)
- [cleanup](VariableInterface.md#cleanup)
- [meta](VariableInterface.md#meta)
- [nameDependency](VariableInterface.md#namedependency)
- [namespaceName](VariableInterface.md#namespacename)
- [onUpdate](VariableInterface.md#onupdate)
- [save](VariableInterface.md#save)
- [trackDependency](VariableInterface.md#trackdependency)
- [updateDefinition](VariableInterface.md#updatedefinition)

## Properties

### <a id="currentuuid" name="currentuuid"></a> currentUUID

• **currentUUID**: `string`

#### Defined in

[packages/formula/src/types/index.ts:906](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L906)

---

### <a id="formulacontext" name="formulacontext"></a> formulaContext

• **formulaContext**: [`ContextInterface`](ContextInterface.md)

#### Defined in

[packages/formula/src/types/index.ts:907](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L907)

---

### <a id="id" name="id"></a> id

• **id**: `string`

#### Defined in

[packages/formula/src/types/index.ts:905](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L905)

---

### <a id="isnew" name="isnew"></a> isNew

• **isNew**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:904](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L904)

---

### <a id="isreadyt" name="isreadyt"></a> isReadyT

• **isReadyT**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:903](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L903)

---

### <a id="t" name="t"></a> t

• **t**: [`VariableData`](VariableData.md)

#### Defined in

[packages/formula/src/types/index.ts:902](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L902)

---

### <a id="trackdirty" name="trackdirty"></a> trackDirty

• **trackDirty**: `VoidFunction`

#### Defined in

[packages/formula/src/types/index.ts:912](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L912)

## Methods

### <a id="buildformula" name="buildformula"></a> buildFormula

▸ **buildFormula**(`input?`): [`Formula`](../README.md#formula)

#### Parameters

| Name     | Type                                        |
| :------- | :------------------------------------------ |
| `input?` | [`FormulaDefinition`](FormulaDefinition.md) |

#### Returns

[`Formula`](../README.md#formula)

---

### <a id="cleanup" name="cleanup"></a> cleanup

▸ **cleanup**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

---

### <a id="meta" name="meta"></a> meta

▸ **meta**(): [`VariableMetadata`](VariableMetadata.md)

#### Returns

[`VariableMetadata`](VariableMetadata.md)

---

### <a id="namedependency" name="namedependency"></a> nameDependency

▸ **nameDependency**(): [`NameDependencyWithKind`](NameDependencyWithKind.md)

#### Returns

[`NameDependencyWithKind`](NameDependencyWithKind.md)

---

### <a id="namespacename" name="namespacename"></a> namespaceName

▸ **namespaceName**(`pageId`): `string`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `pageId` | `string` |

#### Returns

`string`

---

### <a id="onupdate" name="onupdate"></a> onUpdate

▸ **onUpdate**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name                             | Type      |
| :------------------------------- | :-------- |
| `__namedParameters`              | `Object`  |
| `__namedParameters.skipPersist?` | `boolean` |

#### Returns

`Promise`<`void`\>

---

### <a id="save" name="save"></a> save

▸ **save**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

---

### <a id="trackdependency" name="trackdependency"></a> trackDependency

▸ **trackDependency**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

---

### <a id="updatedefinition" name="updatedefinition"></a> updateDefinition

▸ **updateDefinition**(`input`): `Promise`<`void`\>

#### Parameters

| Name    | Type                                        |
| :------ | :------------------------------------------ |
| `input` | [`FormulaDefinition`](FormulaDefinition.md) |

#### Returns

`Promise`<`void`\>
