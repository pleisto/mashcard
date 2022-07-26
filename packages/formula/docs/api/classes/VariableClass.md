# Class: VariableClass

## Implements

- [`VariableInterface`](../interfaces/VariableInterface.md)

## Table of contents

### Constructors

- [constructor](VariableClass.md#constructor)

### Properties

- [builtinEventListeners](VariableClass.md#builtineventlisteners)
- [eventDependencies](VariableClass.md#eventdependencies)
- [eventListeners](VariableClass.md#eventlisteners)
- [formulaContext](VariableClass.md#formulacontext)
- [id](VariableClass.md#id)
- [isNew](VariableClass.md#isnew)
- [isReadyT](VariableClass.md#isreadyt)
- [t](VariableClass.md#t)
- [tickTimeout](VariableClass.md#ticktimeout)

### Methods

- [buildFormula](VariableClass.md#buildformula)
- [cleanup](VariableClass.md#cleanup)
- [completeTask](VariableClass.md#completetask)
- [maybeReparseAndPersist](VariableClass.md#maybereparseandpersist)
- [meta](VariableClass.md#meta)
- [nameDependency](VariableClass.md#namedependency)
- [namespaceName](VariableClass.md#namespacename)
- [onUpdate](VariableClass.md#onupdate)
- [save](VariableClass.md#save)
- [setupEventDependencies](VariableClass.md#setupeventdependencies)
- [subscribeDependencies](VariableClass.md#subscribedependencies)
- [tick](VariableClass.md#tick)
- [trackDependency](VariableClass.md#trackdependency)
- [trackDirty](VariableClass.md#trackdirty)
- [unsubscripeEvents](VariableClass.md#unsubscripeevents)
- [updateDefinition](VariableClass.md#updatedefinition)
- [wholeFlattenVariableDependencies](VariableClass.md#wholeflattenvariabledependencies)
- [wholeVariableDependencies](VariableClass.md#wholevariabledependencies)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new VariableClass**(`__namedParameters`)

#### Parameters

| Name                               | Type                                                    |
| :--------------------------------- | :------------------------------------------------------ |
| `__namedParameters`                | `Object`                                                |
| `__namedParameters.formulaContext` | [`ContextInterface`](../interfaces/ContextInterface.md) |
| `__namedParameters.t`              | [`VariableData`](../interfaces/VariableData.md)         |

#### Defined in

[packages/formula/src/context/variable.ts:118](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L118)

## Properties

### <a id="builtineventlisteners" name="builtineventlisteners"></a> builtinEventListeners

• **builtinEventListeners**: `EventSubscribed`[] = `[]`

#### Defined in

[packages/formula/src/context/variable.ts:115](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L115)

---

### <a id="eventdependencies" name="eventdependencies"></a> eventDependencies

• **eventDependencies**: [`EventDependency`](../interfaces/EventDependency.md)<[`FormulaEventPayload`](../interfaces/FormulaEventPayload.md)<`any`\>\>[] = `[]`

#### Defined in

[packages/formula/src/context/variable.ts:116](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L116)

---

### <a id="eventlisteners" name="eventlisteners"></a> eventListeners

• **eventListeners**: `EventSubscribed`[] = `[]`

#### Defined in

[packages/formula/src/context/variable.ts:114](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L114)

---

### <a id="formulacontext" name="formulacontext"></a> formulaContext

• **formulaContext**: [`ContextInterface`](../interfaces/ContextInterface.md)

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[formulaContext](../interfaces/VariableInterface.md#formulacontext)

#### Defined in

[packages/formula/src/context/variable.ts:110](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L110)

---

### <a id="id" name="id"></a> id

• **id**: `string`

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[id](../interfaces/VariableInterface.md#id)

#### Defined in

[packages/formula/src/context/variable.ts:111](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L111)

---

### <a id="isnew" name="isnew"></a> isNew

• **isNew**: `boolean`

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[isNew](../interfaces/VariableInterface.md#isnew)

#### Defined in

[packages/formula/src/context/variable.ts:108](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L108)

---

### <a id="isreadyt" name="isreadyt"></a> isReadyT

• **isReadyT**: `boolean`

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[isReadyT](../interfaces/VariableInterface.md#isreadyt)

#### Defined in

[packages/formula/src/context/variable.ts:109](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L109)

---

### <a id="t" name="t"></a> t

• **t**: [`VariableData`](../interfaces/VariableData.md)

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[t](../interfaces/VariableInterface.md#t)

#### Defined in

[packages/formula/src/context/variable.ts:107](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L107)

---

### <a id="ticktimeout" name="ticktimeout"></a> tickTimeout

• **tickTimeout**: `number` = `100000`

#### Defined in

[packages/formula/src/context/variable.ts:113](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L113)

## Methods

### <a id="buildformula" name="buildformula"></a> buildFormula

▸ **buildFormula**(`input?`): [`Formula`](../README.md#formula)

#### Parameters

| Name     | Type                                                      |
| :------- | :-------------------------------------------------------- |
| `input?` | [`FormulaDefinition`](../interfaces/FormulaDefinition.md) |

#### Returns

[`Formula`](../README.md#formula)

#### Implementation of

VariableInterface.buildFormula

#### Defined in

[packages/formula/src/context/variable.ts:422](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L422)

---

### <a id="cleanup" name="cleanup"></a> cleanup

▸ **cleanup**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

VariableInterface.cleanup

#### Defined in

[packages/formula/src/context/variable.ts:237](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L237)

---

### <a id="completetask" name="completetask"></a> completeTask

▸ `Private` **completeTask**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name                     | Type                                        |
| :----------------------- | :------------------------------------------ |
| `__namedParameters`      | `Object`                                    |
| `__namedParameters.task` | [`VariableTask`](../README.md#variabletask) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/context/variable.ts:229](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L229)

---

### <a id="maybereparseandpersist" name="maybereparseandpersist"></a> maybeReparseAndPersist

▸ `Private` **maybeReparseAndPersist**(`source`, `level`, `input?`): `Promise`<`void`\>

#### Parameters

| Name     | Type                                                                                                                                                                                                                        |
| :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `source` | { `id`: `string` ; `type`: `"nameChange"` \| `"dynamic"` \| `"dependencyUpdate"` \| `"reload"` \| `"nameDelete"` \| `"columnChange"` \| `"rowChange"` \| `"spreadsheetInitialize"` \| `"blockDelete"` \| `"cellUpdate"` }[] |
| `level`  | `number`                                                                                                                                                                                                                    |
| `input?` | [`FormulaDefinition`](../interfaces/FormulaDefinition.md)                                                                                                                                                                   |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/context/variable.ts:440](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L440)

---

### <a id="meta" name="meta"></a> meta

▸ **meta**(): [`VariableMetadata`](../interfaces/VariableMetadata.md)

#### Returns

[`VariableMetadata`](../interfaces/VariableMetadata.md)

#### Implementation of

VariableInterface.meta

#### Defined in

[packages/formula/src/context/variable.ts:363](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L363)

---

### <a id="namedependency" name="namedependency"></a> nameDependency

▸ **nameDependency**(): [`NameDependencyWithKind`](../interfaces/NameDependencyWithKind.md)

#### Returns

[`NameDependencyWithKind`](../interfaces/NameDependencyWithKind.md)

#### Implementation of

VariableInterface.nameDependency

#### Defined in

[packages/formula/src/context/variable.ts:374](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L374)

---

### <a id="namespacename" name="namespacename"></a> namespaceName

▸ **namespaceName**(`pageId`): `string`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `pageId` | `string` |

#### Returns

`string`

#### Implementation of

VariableInterface.namespaceName

#### Defined in

[packages/formula/src/context/variable.ts:354](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L354)

---

### <a id="onupdate" name="onupdate"></a> onUpdate

▸ **onUpdate**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name                             | Type                                                                                                                                                                                                                        |
| :------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__namedParameters`              | `Object`                                                                                                                                                                                                                    |
| `__namedParameters.level?`       | `number`                                                                                                                                                                                                                    |
| `__namedParameters.skipPersist?` | `boolean`                                                                                                                                                                                                                   |
| `__namedParameters.source?`      | { `id`: `string` ; `type`: `"nameChange"` \| `"dynamic"` \| `"dependencyUpdate"` \| `"reload"` \| `"nameDelete"` \| `"columnChange"` \| `"rowChange"` \| `"spreadsheetInitialize"` \| `"blockDelete"` \| `"cellUpdate"` }[] |

#### Returns

`Promise`<`void`\>

#### Implementation of

VariableInterface.onUpdate

#### Defined in

[packages/formula/src/context/variable.ts:149](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L149)

---

### <a id="save" name="save"></a> save

▸ **save**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

VariableInterface.save

#### Defined in

[packages/formula/src/context/variable.ts:396](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L396)

---

### <a id="setupeventdependencies" name="setupeventdependencies"></a> setupEventDependencies

▸ `Private` **setupEventDependencies**(): `void`

#### Returns

`void`

#### Defined in

[packages/formula/src/context/variable.ts:495](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L495)

---

### <a id="subscribedependencies" name="subscribedependencies"></a> subscribeDependencies

▸ `Private` **subscribeDependencies**(): `void`

#### Returns

`void`

#### Defined in

[packages/formula/src/context/variable.ts:627](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L627)

---

### <a id="tick" name="tick"></a> tick

▸ `Private` **tick**(`uuid`): `Promise`<`void`\>

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `uuid` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/context/variable.ts:217](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L217)

---

### <a id="trackdependency" name="trackdependency"></a> trackDependency

▸ **trackDependency**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

VariableInterface.trackDependency

#### Defined in

[packages/formula/src/context/variable.ts:295](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L295)

---

### <a id="trackdirty" name="trackdirty"></a> trackDirty

▸ **trackDirty**(): `void`

#### Returns

`void`

#### Implementation of

VariableInterface.trackDirty

#### Defined in

[packages/formula/src/context/variable.ts:210](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L210)

---

### <a id="unsubscripeevents" name="unsubscripeevents"></a> unsubscripeEvents

▸ `Private` **unsubscripeEvents**(): `void`

#### Returns

`void`

#### Defined in

[packages/formula/src/context/variable.ts:666](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L666)

---

### <a id="updatedefinition" name="updatedefinition"></a> updateDefinition

▸ **updateDefinition**(`input`): `Promise`<`void`\>

#### Parameters

| Name    | Type                                                      |
| :------ | :-------------------------------------------------------- |
| `input` | [`FormulaDefinition`](../interfaces/FormulaDefinition.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

VariableInterface.updateDefinition

#### Defined in

[packages/formula/src/context/variable.ts:491](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L491)

---

### <a id="wholeflattenvariabledependencies" name="wholeflattenvariabledependencies"></a> wholeFlattenVariableDependencies

▸ **wholeFlattenVariableDependencies**(): [`VariableDependency`](../interfaces/VariableDependency.md)[]

#### Returns

[`VariableDependency`](../interfaces/VariableDependency.md)[]

#### Implementation of

VariableInterface.wholeFlattenVariableDependencies

#### Defined in

[packages/formula/src/context/variable.ts:400](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L400)

---

### <a id="wholevariabledependencies" name="wholevariabledependencies"></a> wholeVariableDependencies

▸ **wholeVariableDependencies**(): [`VariableDependency`](../interfaces/VariableDependency.md)[]

#### Returns

[`VariableDependency`](../interfaces/VariableDependency.md)[]

#### Implementation of

VariableInterface.wholeVariableDependencies

#### Defined in

[packages/formula/src/context/variable.ts:412](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L412)
