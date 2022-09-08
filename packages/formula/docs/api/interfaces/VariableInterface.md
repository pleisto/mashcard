# Interface: VariableInterface

## Implemented by

- [`VariableClass`](../classes/VariableClass.md)

## Table of contents

### Properties

- [buildFormula](VariableInterface.md#buildformula)
- [cleanup](VariableInterface.md#cleanup)
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
- [wholeFlattenVariableDependencies](VariableInterface.md#wholeflattenvariabledependencies)

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

[packages/formula/src/type/index.ts:790](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L790)

---

### <a id="cleanup" name="cleanup"></a> cleanup

• **cleanup**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/type/index.ts:791](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L791)

---

### <a id="formulacontext" name="formulacontext"></a> formulaContext

• **formulaContext**: [`ContextInterface`](ContextInterface.md)

#### Defined in

[packages/formula/src/type/index.ts:787](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L787)

---

### <a id="id" name="id"></a> id

• **id**: `string`

#### Defined in

[packages/formula/src/type/index.ts:786](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L786)

---

### <a id="isnew" name="isnew"></a> isNew

• **isNew**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:785](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L785)

---

### <a id="isreadyt" name="isreadyt"></a> isReadyT

• **isReadyT**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:784](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L784)

---

### <a id="meta" name="meta"></a> meta

• **meta**: () => [`VariableMetadata`](VariableMetadata.md)

#### Type declaration

▸ (): [`VariableMetadata`](VariableMetadata.md)

##### Returns

[`VariableMetadata`](VariableMetadata.md)

#### Defined in

[packages/formula/src/type/index.ts:798](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L798)

---

### <a id="namedependency" name="namedependency"></a> nameDependency

• **nameDependency**: () => [`NameDependencyWithKind`](NameDependencyWithKind.md)

#### Type declaration

▸ (): [`NameDependencyWithKind`](NameDependencyWithKind.md)

##### Returns

[`NameDependencyWithKind`](NameDependencyWithKind.md)

#### Defined in

[packages/formula/src/type/index.ts:795](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L795)

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

[packages/formula/src/type/index.ts:796](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L796)

---

### <a id="onupdate" name="onupdate"></a> onUpdate

• **onUpdate**: (`__namedParameters`: { `level?`: `number` ; `skipPersist?`: `boolean` ; `source?`: { `id`: `string` ; `type`: `"nameChange"` \| `"dynamic"` \| `"dependencyUpdate"` \| `"reload"` \| `"variableSave"` \| `"variableDelete"` \| `"nameDelete"` \| `"columnChange"` \| `"rowChange"` \| `"spreadsheetInitialize"` \| `"blockDelete"` \| `"cellUpdate"` }[] }) => `Promise`<`void`\>

#### Type declaration

▸ (`__namedParameters`): `Promise`<`void`\>

##### Parameters

| Name                             | Type                                                                                                                                                                                                                                                                  |
| :------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__namedParameters`              | `Object`                                                                                                                                                                                                                                                              |
| `__namedParameters.level?`       | `number`                                                                                                                                                                                                                                                              |
| `__namedParameters.skipPersist?` | `boolean`                                                                                                                                                                                                                                                             |
| `__namedParameters.source?`      | { `id`: `string` ; `type`: `"nameChange"` \| `"dynamic"` \| `"dependencyUpdate"` \| `"reload"` \| `"variableSave"` \| `"variableDelete"` \| `"nameDelete"` \| `"columnChange"` \| `"rowChange"` \| `"spreadsheetInitialize"` \| `"blockDelete"` \| `"cellUpdate"` }[] |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/type/index.ts:799](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L799)

---

### <a id="save" name="save"></a> save

• **save**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/type/index.ts:794](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L794)

---

### <a id="t" name="t"></a> t

• **t**: [`VariableData`](VariableData.md)

#### Defined in

[packages/formula/src/type/index.ts:783](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L783)

---

### <a id="trackdependency" name="trackdependency"></a> trackDependency

• **trackDependency**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/type/index.ts:792](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L792)

---

### <a id="trackdirty" name="trackdirty"></a> trackDirty

• **trackDirty**: `VoidFunction`

#### Defined in

[packages/formula/src/type/index.ts:793](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L793)

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

[packages/formula/src/type/index.ts:797](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L797)

---

### <a id="wholeflattenvariabledependencies" name="wholeflattenvariabledependencies"></a> wholeFlattenVariableDependencies

• **wholeFlattenVariableDependencies**: () => [`VariableDependency`](VariableDependency.md)[]

#### Type declaration

▸ (): [`VariableDependency`](VariableDependency.md)[]

##### Returns

[`VariableDependency`](VariableDependency.md)[]

#### Defined in

[packages/formula/src/type/index.ts:788](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/type/index.ts#L788)
