# Interface: VariableInterface

## Implemented by

- [`VariableClass`](../classes/VariableClass.md)

## Table of contents

### Properties

- [buildFormula](VariableInterface.md#buildformula)
- [cleanup](VariableInterface.md#cleanup)
- [currentUUID](VariableInterface.md#currentuuid)
- [formulaContext](VariableInterface.md#formulacontext)
- [id](VariableInterface.md#id)
- [isNew](VariableInterface.md#isnew)
- [isReadyT](VariableInterface.md#isreadyt)
- [meta](VariableInterface.md#meta)
- [nameDependency](VariableInterface.md#namedependency)
- [namespaceName](VariableInterface.md#namespacename)
- [onUpdate](VariableInterface.md#onupdate)
- [save](VariableInterface.md#save)
- [t](VariableInterface.md#t)
- [trackDependency](VariableInterface.md#trackdependency)
- [trackDirty](VariableInterface.md#trackdirty)
- [updateDefinition](VariableInterface.md#updatedefinition)

## Properties

### <a id="buildformula" name="buildformula"></a> buildFormula

• **buildFormula**: (`input?`: [`FormulaDefinition`](FormulaDefinition.md)) => [`Formula`](../README.md#formula)

#### Type declaration

▸ (`input?`): [`Formula`](../README.md#formula)

##### Parameters

| Name     | Type                                        |
| :------- | :------------------------------------------ |
| `input?` | [`FormulaDefinition`](FormulaDefinition.md) |

##### Returns

[`Formula`](../README.md#formula)

#### Defined in

[packages/formula/src/types/index.ts:915](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L915)

---

### <a id="cleanup" name="cleanup"></a> cleanup

• **cleanup**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/types/index.ts:916](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L916)

---

### <a id="currentuuid" name="currentuuid"></a> currentUUID

• **currentUUID**: `string`

#### Defined in

[packages/formula/src/types/index.ts:912](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L912)

---

### <a id="formulacontext" name="formulacontext"></a> formulaContext

• **formulaContext**: [`ContextInterface`](ContextInterface.md)

#### Defined in

[packages/formula/src/types/index.ts:913](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L913)

---

### <a id="id" name="id"></a> id

• **id**: `string`

#### Defined in

[packages/formula/src/types/index.ts:911](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L911)

---

### <a id="isnew" name="isnew"></a> isNew

• **isNew**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:910](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L910)

---

### <a id="isreadyt" name="isreadyt"></a> isReadyT

• **isReadyT**: `boolean`

#### Defined in

[packages/formula/src/types/index.ts:909](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L909)

---

### <a id="meta" name="meta"></a> meta

• **meta**: () => [`VariableMetadata`](VariableMetadata.md)

#### Type declaration

▸ (): [`VariableMetadata`](VariableMetadata.md)

##### Returns

[`VariableMetadata`](VariableMetadata.md)

#### Defined in

[packages/formula/src/types/index.ts:923](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L923)

---

### <a id="namedependency" name="namedependency"></a> nameDependency

• **nameDependency**: () => [`NameDependencyWithKind`](NameDependencyWithKind.md)

#### Type declaration

▸ (): [`NameDependencyWithKind`](NameDependencyWithKind.md)

##### Returns

[`NameDependencyWithKind`](NameDependencyWithKind.md)

#### Defined in

[packages/formula/src/types/index.ts:920](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L920)

---

### <a id="namespacename" name="namespacename"></a> namespaceName

• **namespaceName**: (`pageId`: `string`) => `string`

#### Type declaration

▸ (`pageId`): `string`

##### Parameters

| Name     | Type     |
| :------- | :------- |
| `pageId` | `string` |

##### Returns

`string`

#### Defined in

[packages/formula/src/types/index.ts:921](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L921)

---

### <a id="onupdate" name="onupdate"></a> onUpdate

• **onUpdate**: (`__namedParameters`: { `skipPersist?`: `boolean` }) => `Promise`<`void`\>

#### Type declaration

▸ (`__namedParameters`): `Promise`<`void`\>

##### Parameters

| Name                             | Type      |
| :------------------------------- | :-------- |
| `__namedParameters`              | `Object`  |
| `__namedParameters.skipPersist?` | `boolean` |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/types/index.ts:924](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L924)

---

### <a id="save" name="save"></a> save

• **save**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/types/index.ts:919](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L919)

---

### <a id="t" name="t"></a> t

• **t**: [`VariableData`](VariableData.md)

#### Defined in

[packages/formula/src/types/index.ts:908](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L908)

---

### <a id="trackdependency" name="trackdependency"></a> trackDependency

• **trackDependency**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/types/index.ts:917](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L917)

---

### <a id="trackdirty" name="trackdirty"></a> trackDirty

• **trackDirty**: `VoidFunction`

#### Defined in

[packages/formula/src/types/index.ts:918](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L918)

---

### <a id="updatedefinition" name="updatedefinition"></a> updateDefinition

• **updateDefinition**: (`input`: [`FormulaDefinition`](FormulaDefinition.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`input`): `Promise`<`void`\>

##### Parameters

| Name    | Type                                        |
| :------ | :------------------------------------------ |
| `input` | [`FormulaDefinition`](FormulaDefinition.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/types/index.ts:922](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L922)
