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

| Name | Type |
| :------ | :------ |
| `input?` | [`FormulaDefinition`](FormulaDefinition.md) |

##### Returns

[`Formula`](../README.md#formula)

#### Defined in

[packages/formula/src/type/index.ts:744](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L744)

___

### <a id="cleanup" name="cleanup"></a> cleanup

• **cleanup**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/type/index.ts:745](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L745)

___

### <a id="currentuuid" name="currentuuid"></a> currentUUID

• **currentUUID**: `string`

#### Defined in

[packages/formula/src/type/index.ts:741](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L741)

___

### <a id="formulacontext" name="formulacontext"></a> formulaContext

• **formulaContext**: [`ContextInterface`](ContextInterface.md)

#### Defined in

[packages/formula/src/type/index.ts:742](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L742)

___

### <a id="id" name="id"></a> id

• **id**: `string`

#### Defined in

[packages/formula/src/type/index.ts:740](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L740)

___

### <a id="isnew" name="isnew"></a> isNew

• **isNew**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:739](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L739)

___

### <a id="isreadyt" name="isreadyt"></a> isReadyT

• **isReadyT**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:738](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L738)

___

### <a id="meta" name="meta"></a> meta

• **meta**: () => [`VariableMetadata`](VariableMetadata.md)

#### Type declaration

▸ (): [`VariableMetadata`](VariableMetadata.md)

##### Returns

[`VariableMetadata`](VariableMetadata.md)

#### Defined in

[packages/formula/src/type/index.ts:752](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L752)

___

### <a id="namedependency" name="namedependency"></a> nameDependency

• **nameDependency**: () => [`NameDependencyWithKind`](NameDependencyWithKind.md)

#### Type declaration

▸ (): [`NameDependencyWithKind`](NameDependencyWithKind.md)

##### Returns

[`NameDependencyWithKind`](NameDependencyWithKind.md)

#### Defined in

[packages/formula/src/type/index.ts:749](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L749)

___

### <a id="namespacename" name="namespacename"></a> namespaceName

• **namespaceName**: (`pageId`: `string`) => `string`

#### Type declaration

▸ (`pageId`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `pageId` | `string` |

##### Returns

`string`

#### Defined in

[packages/formula/src/type/index.ts:750](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L750)

___

### <a id="onupdate" name="onupdate"></a> onUpdate

• **onUpdate**: (`__namedParameters`: { `skipPersist?`: `boolean`  }) => `Promise`<`void`\>

#### Type declaration

▸ (`__namedParameters`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.skipPersist?` | `boolean` |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/type/index.ts:753](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L753)

___

### <a id="save" name="save"></a> save

• **save**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/type/index.ts:748](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L748)

___

### <a id="t" name="t"></a> t

• **t**: [`VariableData`](VariableData.md)

#### Defined in

[packages/formula/src/type/index.ts:737](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L737)

___

### <a id="trackdependency" name="trackdependency"></a> trackDependency

• **trackDependency**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/type/index.ts:746](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L746)

___

### <a id="trackdirty" name="trackdirty"></a> trackDirty

• **trackDirty**: `VoidFunction`

#### Defined in

[packages/formula/src/type/index.ts:747](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L747)

___

### <a id="updatedefinition" name="updatedefinition"></a> updateDefinition

• **updateDefinition**: (`input`: [`FormulaDefinition`](FormulaDefinition.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`input`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`FormulaDefinition`](FormulaDefinition.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/type/index.ts:751](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L751)
