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

[packages/formula/src/type/index.ts:771](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L771)

---

### <a id="cleanup" name="cleanup"></a> cleanup

• **cleanup**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/type/index.ts:772](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L772)

---

### <a id="currentuuid" name="currentuuid"></a> currentUUID

• **currentUUID**: `string`

#### Defined in

[packages/formula/src/type/index.ts:768](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L768)

---

### <a id="formulacontext" name="formulacontext"></a> formulaContext

• **formulaContext**: [`ContextInterface`](ContextInterface.md)

#### Defined in

[packages/formula/src/type/index.ts:769](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L769)

---

### <a id="id" name="id"></a> id

• **id**: `string`

#### Defined in

[packages/formula/src/type/index.ts:767](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L767)

---

### <a id="isnew" name="isnew"></a> isNew

• **isNew**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:766](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L766)

---

### <a id="isreadyt" name="isreadyt"></a> isReadyT

• **isReadyT**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:765](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L765)

---

### <a id="meta" name="meta"></a> meta

• **meta**: () => [`VariableMetadata`](VariableMetadata.md)

#### Type declaration

▸ (): [`VariableMetadata`](VariableMetadata.md)

##### Returns

[`VariableMetadata`](VariableMetadata.md)

#### Defined in

[packages/formula/src/type/index.ts:779](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L779)

---

### <a id="namedependency" name="namedependency"></a> nameDependency

• **nameDependency**: () => [`NameDependencyWithKind`](NameDependencyWithKind.md)

#### Type declaration

▸ (): [`NameDependencyWithKind`](NameDependencyWithKind.md)

##### Returns

[`NameDependencyWithKind`](NameDependencyWithKind.md)

#### Defined in

[packages/formula/src/type/index.ts:776](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L776)

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

[packages/formula/src/type/index.ts:777](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L777)

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

[packages/formula/src/type/index.ts:780](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L780)

---

### <a id="save" name="save"></a> save

• **save**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/type/index.ts:775](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L775)

---

### <a id="t" name="t"></a> t

• **t**: [`VariableData`](VariableData.md)

#### Defined in

[packages/formula/src/type/index.ts:764](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L764)

---

### <a id="trackdependency" name="trackdependency"></a> trackDependency

• **trackDependency**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/type/index.ts:773](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L773)

---

### <a id="trackdirty" name="trackdirty"></a> trackDirty

• **trackDirty**: `VoidFunction`

#### Defined in

[packages/formula/src/type/index.ts:774](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L774)

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

[packages/formula/src/type/index.ts:778](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L778)
