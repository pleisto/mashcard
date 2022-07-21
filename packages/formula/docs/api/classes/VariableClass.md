# Class: VariableClass

## Implements

- [`VariableInterface`](../interfaces/VariableInterface.md)

## Table of contents

### Constructors

- [constructor](VariableClass.md#constructor)

### Properties

- [builtinEventListeners](VariableClass.md#builtineventlisteners)
- [currentUUID](VariableClass.md#currentuuid)
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

[packages/formula/src/context/variable.ts:116](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L116)

## Properties

### <a id="builtineventlisteners" name="builtineventlisteners"></a> builtinEventListeners

• **builtinEventListeners**: `EventSubscribed`[] = `[]`

#### Defined in

[packages/formula/src/context/variable.ts:113](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L113)

---

### <a id="currentuuid" name="currentuuid"></a> currentUUID

• **currentUUID**: `string`

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[currentUUID](../interfaces/VariableInterface.md#currentuuid)

#### Defined in

[packages/formula/src/context/variable.ts:112](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L112)

---

### <a id="eventdependencies" name="eventdependencies"></a> eventDependencies

• **eventDependencies**: [`EventDependency`](../interfaces/EventDependency.md)<[`FormulaEventPayload`](../interfaces/FormulaEventPayload.md)<`any`\>\>[] = `[]`

#### Defined in

[packages/formula/src/context/variable.ts:114](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L114)

---

### <a id="eventlisteners" name="eventlisteners"></a> eventListeners

• **eventListeners**: `EventSubscribed`[] = `[]`

#### Defined in

[packages/formula/src/context/variable.ts:111](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L111)

---

### <a id="formulacontext" name="formulacontext"></a> formulaContext

• **formulaContext**: [`ContextInterface`](../interfaces/ContextInterface.md)

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[formulaContext](../interfaces/VariableInterface.md#formulacontext)

#### Defined in

[packages/formula/src/context/variable.ts:107](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L107)

---

### <a id="id" name="id"></a> id

• **id**: `string`

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[id](../interfaces/VariableInterface.md#id)

#### Defined in

[packages/formula/src/context/variable.ts:108](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L108)

---

### <a id="isnew" name="isnew"></a> isNew

• **isNew**: `boolean`

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[isNew](../interfaces/VariableInterface.md#isnew)

#### Defined in

[packages/formula/src/context/variable.ts:105](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L105)

---

### <a id="isreadyt" name="isreadyt"></a> isReadyT

• **isReadyT**: `boolean`

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[isReadyT](../interfaces/VariableInterface.md#isreadyt)

#### Defined in

[packages/formula/src/context/variable.ts:106](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L106)

---

### <a id="t" name="t"></a> t

• **t**: [`VariableData`](../interfaces/VariableData.md)

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[t](../interfaces/VariableInterface.md#t)

#### Defined in

[packages/formula/src/context/variable.ts:104](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L104)

---

### <a id="ticktimeout" name="ticktimeout"></a> tickTimeout

• **tickTimeout**: `number` = `100000`

#### Defined in

[packages/formula/src/context/variable.ts:110](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L110)

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

[packages/formula/src/context/variable.ts:360](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L360)

---

### <a id="cleanup" name="cleanup"></a> cleanup

▸ **cleanup**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

VariableInterface.cleanup

#### Defined in

[packages/formula/src/context/variable.ts:197](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L197)

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

[packages/formula/src/context/variable.ts:189](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L189)

---

### <a id="maybereparseandpersist" name="maybereparseandpersist"></a> maybeReparseAndPersist

▸ `Private` **maybeReparseAndPersist**(`source`, `sourceUuid`, `level`, `input?`): `Promise`<`void`\>

#### Parameters

| Name         | Type                                                      |
| :----------- | :-------------------------------------------------------- |
| `source`     | `string`                                                  |
| `sourceUuid` | `string`                                                  |
| `level`      | `number`                                                  |
| `input?`     | [`FormulaDefinition`](../interfaces/FormulaDefinition.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/context/variable.ts:378](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L378)

---

### <a id="meta" name="meta"></a> meta

▸ **meta**(): [`VariableMetadata`](../interfaces/VariableMetadata.md)

#### Returns

[`VariableMetadata`](../interfaces/VariableMetadata.md)

#### Implementation of

VariableInterface.meta

#### Defined in

[packages/formula/src/context/variable.ts:323](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L323)

---

### <a id="namedependency" name="namedependency"></a> nameDependency

▸ **nameDependency**(): [`NameDependencyWithKind`](../interfaces/NameDependencyWithKind.md)

#### Returns

[`NameDependencyWithKind`](../interfaces/NameDependencyWithKind.md)

#### Implementation of

VariableInterface.nameDependency

#### Defined in

[packages/formula/src/context/variable.ts:334](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L334)

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

[packages/formula/src/context/variable.ts:314](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L314)

---

### <a id="onupdate" name="onupdate"></a> onUpdate

▸ **onUpdate**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name                             | Type      |
| :------------------------------- | :-------- |
| `__namedParameters`              | `Object`  |
| `__namedParameters.level?`       | `number`  |
| `__namedParameters.skipPersist?` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Implementation of

VariableInterface.onUpdate

#### Defined in

[packages/formula/src/context/variable.ts:147](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L147)

---

### <a id="save" name="save"></a> save

▸ **save**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

VariableInterface.save

#### Defined in

[packages/formula/src/context/variable.ts:356](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L356)

---

### <a id="setupeventdependencies" name="setupeventdependencies"></a> setupEventDependencies

▸ `Private` **setupEventDependencies**(): `void`

#### Returns

`void`

#### Defined in

[packages/formula/src/context/variable.ts:436](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L436)

---

### <a id="subscribedependencies" name="subscribedependencies"></a> subscribeDependencies

▸ `Private` **subscribeDependencies**(): `void`

#### Returns

`void`

#### Defined in

[packages/formula/src/context/variable.ts:568](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L568)

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

[packages/formula/src/context/variable.ts:177](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L177)

---

### <a id="trackdependency" name="trackdependency"></a> trackDependency

▸ **trackDependency**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

VariableInterface.trackDependency

#### Defined in

[packages/formula/src/context/variable.ts:255](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L255)

---

### <a id="trackdirty" name="trackdirty"></a> trackDirty

▸ **trackDirty**(): `void`

#### Returns

`void`

#### Implementation of

VariableInterface.trackDirty

#### Defined in

[packages/formula/src/context/variable.ts:170](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L170)

---

### <a id="unsubscripeevents" name="unsubscripeevents"></a> unsubscripeEvents

▸ `Private` **unsubscripeEvents**(): `void`

#### Returns

`void`

#### Defined in

[packages/formula/src/context/variable.ts:600](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L600)

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

[packages/formula/src/context/variable.ts:432](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L432)
