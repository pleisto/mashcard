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

[packages/brickdoc-formula/src/types/index.ts:879](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L879)

---

### <a id="formulacontext" name="formulacontext"></a> formulaContext

• **formulaContext**: [`ContextInterface`](ContextInterface.md)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:880](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L880)

---

### <a id="id" name="id"></a> id

• **id**: `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:878](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L878)

---

### <a id="isnew" name="isnew"></a> isNew

• **isNew**: `boolean`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:877](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L877)

---

### <a id="isreadyt" name="isreadyt"></a> isReadyT

• **isReadyT**: `boolean`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:876](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L876)

---

### <a id="t" name="t"></a> t

• **t**: [`VariableData`](VariableData.md)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:875](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L875)

---

### <a id="trackdirty" name="trackdirty"></a> trackDirty

• **trackDirty**: `VoidFunction`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:885](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L885)

## Methods

### <a id="buildformula" name="buildformula"></a> buildFormula

▸ **buildFormula**(`input?`): [`Formula`](../README.md#formula)

#### Parameters

| Name     | Type                                        |
| :------- | :------------------------------------------ |
| `input?` | [`FormulaDefinition`](FormulaDefinition.md) |

#### Returns

[`Formula`](../README.md#formula)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:882](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L882)

---

### <a id="cleanup" name="cleanup"></a> cleanup

▸ **cleanup**(): `void`

#### Returns

`void`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:883](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L883)

---

### <a id="meta" name="meta"></a> meta

▸ **meta**(): [`VariableMetadata`](VariableMetadata.md)

#### Returns

[`VariableMetadata`](VariableMetadata.md)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:890](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L890)

---

### <a id="namedependency" name="namedependency"></a> nameDependency

▸ **nameDependency**(): [`NameDependencyWithKind`](NameDependencyWithKind.md)

#### Returns

[`NameDependencyWithKind`](NameDependencyWithKind.md)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:887](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L887)

---

### <a id="namespacename" name="namespacename"></a> namespaceName

▸ **namespaceName**(`pageId`): `string`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `pageId` | `string` |

#### Returns

`string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:888](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L888)

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

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:891](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L891)

---

### <a id="save" name="save"></a> save

▸ **save**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:886](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L886)

---

### <a id="trackdependency" name="trackdependency"></a> trackDependency

▸ **trackDependency**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:884](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L884)

---

### <a id="updatedefinition" name="updatedefinition"></a> updateDefinition

▸ **updateDefinition**(`input`): `Promise`<`void`\>

#### Parameters

| Name    | Type                                        |
| :------ | :------------------------------------------ |
| `input` | [`FormulaDefinition`](FormulaDefinition.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:889](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/types/index.ts#L889)
