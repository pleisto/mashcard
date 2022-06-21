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
- [startTask](VariableClass.md#starttask)
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

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.formulaContext` | [`ContextInterface`](../interfaces/ContextInterface.md) |
| `__namedParameters.t` | [`VariableData`](../interfaces/VariableData.md) |

#### Defined in

[packages/formula/src/context/variable.ts:109](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L109)

## Properties

### <a id="builtineventlisteners" name="builtineventlisteners"></a> builtinEventListeners

• **builtinEventListeners**: `EventSubscribed`[] = `[]`

#### Defined in

[packages/formula/src/context/variable.ts:106](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L106)

___

### <a id="currentuuid" name="currentuuid"></a> currentUUID

• **currentUUID**: `string`

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[currentUUID](../interfaces/VariableInterface.md#currentuuid)

#### Defined in

[packages/formula/src/context/variable.ts:105](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L105)

___

### <a id="eventdependencies" name="eventdependencies"></a> eventDependencies

• **eventDependencies**: [`EventDependency`](../interfaces/EventDependency.md)<[`FormulaEventPayload`](../interfaces/FormulaEventPayload.md)<`any`\>\>[] = `[]`

#### Defined in

[packages/formula/src/context/variable.ts:107](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L107)

___

### <a id="eventlisteners" name="eventlisteners"></a> eventListeners

• **eventListeners**: `EventSubscribed`[] = `[]`

#### Defined in

[packages/formula/src/context/variable.ts:104](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L104)

___

### <a id="formulacontext" name="formulacontext"></a> formulaContext

• **formulaContext**: [`ContextInterface`](../interfaces/ContextInterface.md)

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[formulaContext](../interfaces/VariableInterface.md#formulacontext)

#### Defined in

[packages/formula/src/context/variable.ts:100](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L100)

___

### <a id="id" name="id"></a> id

• **id**: `string`

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[id](../interfaces/VariableInterface.md#id)

#### Defined in

[packages/formula/src/context/variable.ts:101](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L101)

___

### <a id="isnew" name="isnew"></a> isNew

• **isNew**: `boolean`

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[isNew](../interfaces/VariableInterface.md#isnew)

#### Defined in

[packages/formula/src/context/variable.ts:98](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L98)

___

### <a id="isreadyt" name="isreadyt"></a> isReadyT

• **isReadyT**: `boolean`

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[isReadyT](../interfaces/VariableInterface.md#isreadyt)

#### Defined in

[packages/formula/src/context/variable.ts:99](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L99)

___

### <a id="t" name="t"></a> t

• **t**: [`VariableData`](../interfaces/VariableData.md)

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[t](../interfaces/VariableInterface.md#t)

#### Defined in

[packages/formula/src/context/variable.ts:97](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L97)

___

### <a id="ticktimeout" name="ticktimeout"></a> tickTimeout

• **tickTimeout**: `number` = `100000`

#### Defined in

[packages/formula/src/context/variable.ts:103](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L103)

## Methods

### <a id="buildformula" name="buildformula"></a> buildFormula

▸ **buildFormula**(`input?`): [`Formula`](../README.md#formula)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input?` | [`FormulaDefinition`](../interfaces/FormulaDefinition.md) |

#### Returns

[`Formula`](../README.md#formula)

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[buildFormula](../interfaces/VariableInterface.md#buildformula)

#### Defined in

[packages/formula/src/context/variable.ts:311](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L311)

___

### <a id="cleanup" name="cleanup"></a> cleanup

▸ **cleanup**(): `void`

#### Returns

`void`

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[cleanup](../interfaces/VariableInterface.md#cleanup)

#### Defined in

[packages/formula/src/context/variable.ts:212](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L212)

___

### <a id="completetask" name="completetask"></a> completeTask

▸ `Private` **completeTask**(`__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.task` | [`VariableTask`](../README.md#variabletask) |

#### Returns

`void`

#### Defined in

[packages/formula/src/context/variable.ts:202](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L202)

___

### <a id="maybereparseandpersist" name="maybereparseandpersist"></a> maybeReparseAndPersist

▸ `Private` **maybeReparseAndPersist**(`source`, `sourceUuid`, `level`, `input?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` |
| `sourceUuid` | `string` |
| `level` | `number` |
| `input?` | [`FormulaDefinition`](../interfaces/FormulaDefinition.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/context/variable.ts:329](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L329)

___

### <a id="meta" name="meta"></a> meta

▸ **meta**(): [`VariableMetadata`](../interfaces/VariableMetadata.md)

#### Returns

[`VariableMetadata`](../interfaces/VariableMetadata.md)

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[meta](../interfaces/VariableInterface.md#meta)

#### Defined in

[packages/formula/src/context/variable.ts:274](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L274)

___

### <a id="namedependency" name="namedependency"></a> nameDependency

▸ **nameDependency**(): [`NameDependencyWithKind`](../interfaces/NameDependencyWithKind.md)

#### Returns

[`NameDependencyWithKind`](../interfaces/NameDependencyWithKind.md)

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[nameDependency](../interfaces/VariableInterface.md#namedependency)

#### Defined in

[packages/formula/src/context/variable.ts:285](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L285)

___

### <a id="namespacename" name="namespacename"></a> namespaceName

▸ **namespaceName**(`pageId`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pageId` | `string` |

#### Returns

`string`

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[namespaceName](../interfaces/VariableInterface.md#namespacename)

#### Defined in

[packages/formula/src/context/variable.ts:265](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L265)

___

### <a id="onupdate" name="onupdate"></a> onUpdate

▸ **onUpdate**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.level?` | `number` |
| `__namedParameters.skipPersist?` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[onUpdate](../interfaces/VariableInterface.md#onupdate)

#### Defined in

[packages/formula/src/context/variable.ts:152](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L152)

___

### <a id="save" name="save"></a> save

▸ **save**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[save](../interfaces/VariableInterface.md#save)

#### Defined in

[packages/formula/src/context/variable.ts:307](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L307)

___

### <a id="setupeventdependencies" name="setupeventdependencies"></a> setupEventDependencies

▸ `Private` **setupEventDependencies**(): `void`

#### Returns

`void`

#### Defined in

[packages/formula/src/context/variable.ts:386](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L386)

___

### <a id="starttask" name="starttask"></a> startTask

▸ `Private` **startTask**(`__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.task` | [`VariableTask`](../README.md#variabletask) |

#### Returns

`void`

#### Defined in

[packages/formula/src/context/variable.ts:195](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L195)

___

### <a id="subscribedependencies" name="subscribedependencies"></a> subscribeDependencies

▸ `Private` **subscribeDependencies**(): `void`

#### Returns

`void`

#### Defined in

[packages/formula/src/context/variable.ts:518](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L518)

___

### <a id="tick" name="tick"></a> tick

▸ `Private` **tick**(`uuid`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `uuid` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/context/variable.ts:181](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L181)

___

### <a id="trackdependency" name="trackdependency"></a> trackDependency

▸ **trackDependency**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[trackDependency](../interfaces/VariableInterface.md#trackdependency)

#### Defined in

[packages/formula/src/context/variable.ts:236](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L236)

___

### <a id="trackdirty" name="trackdirty"></a> trackDirty

▸ **trackDirty**(): `void`

#### Returns

`void`

#### Implementation of

VariableInterface.trackDirty

#### Defined in

[packages/formula/src/context/variable.ts:174](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L174)

___

### <a id="unsubscripeevents" name="unsubscripeevents"></a> unsubscripeEvents

▸ `Private` **unsubscripeEvents**(): `void`

#### Returns

`void`

#### Defined in

[packages/formula/src/context/variable.ts:552](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L552)

___

### <a id="updatedefinition" name="updatedefinition"></a> updateDefinition

▸ **updateDefinition**(`input`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`FormulaDefinition`](../interfaces/FormulaDefinition.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[updateDefinition](../interfaces/VariableInterface.md#updatedefinition)

#### Defined in

[packages/formula/src/context/variable.ts:382](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L382)
