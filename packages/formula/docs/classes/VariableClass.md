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

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.formulaContext` | [`ContextInterface`](../interfaces/ContextInterface.md) |
| `__namedParameters.t` | [`VariableData`](../interfaces/VariableData.md) |

#### Defined in

[packages/formula/src/context/variable.ts:108](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L108)

## Properties

### <a id="builtineventlisteners" name="builtineventlisteners"></a> builtinEventListeners

• **builtinEventListeners**: `EventSubscribed`[] = `[]`

#### Defined in

[packages/formula/src/context/variable.ts:105](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L105)

___

### <a id="currentuuid" name="currentuuid"></a> currentUUID

• **currentUUID**: `string`

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[currentUUID](../interfaces/VariableInterface.md#currentuuid)

#### Defined in

[packages/formula/src/context/variable.ts:104](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L104)

___

### <a id="eventdependencies" name="eventdependencies"></a> eventDependencies

• **eventDependencies**: [`EventDependency`](../interfaces/EventDependency.md)<[`FormulaEventPayload`](../interfaces/FormulaEventPayload.md)<`any`\>\>[] = `[]`

#### Defined in

[packages/formula/src/context/variable.ts:106](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L106)

___

### <a id="eventlisteners" name="eventlisteners"></a> eventListeners

• **eventListeners**: `EventSubscribed`[] = `[]`

#### Defined in

[packages/formula/src/context/variable.ts:103](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L103)

___

### <a id="formulacontext" name="formulacontext"></a> formulaContext

• **formulaContext**: [`ContextInterface`](../interfaces/ContextInterface.md)

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[formulaContext](../interfaces/VariableInterface.md#formulacontext)

#### Defined in

[packages/formula/src/context/variable.ts:99](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L99)

___

### <a id="id" name="id"></a> id

• **id**: `string`

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[id](../interfaces/VariableInterface.md#id)

#### Defined in

[packages/formula/src/context/variable.ts:100](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L100)

___

### <a id="isnew" name="isnew"></a> isNew

• **isNew**: `boolean`

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[isNew](../interfaces/VariableInterface.md#isnew)

#### Defined in

[packages/formula/src/context/variable.ts:97](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L97)

___

### <a id="isreadyt" name="isreadyt"></a> isReadyT

• **isReadyT**: `boolean`

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[isReadyT](../interfaces/VariableInterface.md#isreadyt)

#### Defined in

[packages/formula/src/context/variable.ts:98](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L98)

___

### <a id="t" name="t"></a> t

• **t**: [`VariableData`](../interfaces/VariableData.md)

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[t](../interfaces/VariableInterface.md#t)

#### Defined in

[packages/formula/src/context/variable.ts:96](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L96)

___

### <a id="ticktimeout" name="ticktimeout"></a> tickTimeout

• **tickTimeout**: `number` = `100000`

#### Defined in

[packages/formula/src/context/variable.ts:102](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L102)

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

[packages/formula/src/context/variable.ts:288](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L288)

___

### <a id="cleanup" name="cleanup"></a> cleanup

▸ **cleanup**(): `void`

#### Returns

`void`

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[cleanup](../interfaces/VariableInterface.md#cleanup)

#### Defined in

[packages/formula/src/context/variable.ts:189](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L189)

___

### <a id="completetask" name="completetask"></a> completeTask

▸ `Private` **completeTask**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.task` | [`VariableTask`](../README.md#variabletask) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/context/variable.ts:181](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L181)

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

[packages/formula/src/context/variable.ts:306](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L306)

___

### <a id="meta" name="meta"></a> meta

▸ **meta**(): [`VariableMetadata`](../interfaces/VariableMetadata.md)

#### Returns

[`VariableMetadata`](../interfaces/VariableMetadata.md)

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[meta](../interfaces/VariableInterface.md#meta)

#### Defined in

[packages/formula/src/context/variable.ts:251](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L251)

___

### <a id="namedependency" name="namedependency"></a> nameDependency

▸ **nameDependency**(): [`NameDependencyWithKind`](../interfaces/NameDependencyWithKind.md)

#### Returns

[`NameDependencyWithKind`](../interfaces/NameDependencyWithKind.md)

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[nameDependency](../interfaces/VariableInterface.md#namedependency)

#### Defined in

[packages/formula/src/context/variable.ts:262](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L262)

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

[packages/formula/src/context/variable.ts:242](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L242)

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

[packages/formula/src/context/variable.ts:139](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L139)

___

### <a id="save" name="save"></a> save

▸ **save**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[save](../interfaces/VariableInterface.md#save)

#### Defined in

[packages/formula/src/context/variable.ts:284](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L284)

___

### <a id="setupeventdependencies" name="setupeventdependencies"></a> setupEventDependencies

▸ `Private` **setupEventDependencies**(): `void`

#### Returns

`void`

#### Defined in

[packages/formula/src/context/variable.ts:363](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L363)

___

### <a id="subscribedependencies" name="subscribedependencies"></a> subscribeDependencies

▸ `Private` **subscribeDependencies**(): `void`

#### Returns

`void`

#### Defined in

[packages/formula/src/context/variable.ts:495](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L495)

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

[packages/formula/src/context/variable.ts:169](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L169)

___

### <a id="trackdependency" name="trackdependency"></a> trackDependency

▸ **trackDependency**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

[VariableInterface](../interfaces/VariableInterface.md).[trackDependency](../interfaces/VariableInterface.md#trackdependency)

#### Defined in

[packages/formula/src/context/variable.ts:213](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L213)

___

### <a id="trackdirty" name="trackdirty"></a> trackDirty

▸ **trackDirty**(): `void`

#### Returns

`void`

#### Implementation of

VariableInterface.trackDirty

#### Defined in

[packages/formula/src/context/variable.ts:162](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L162)

___

### <a id="unsubscripeevents" name="unsubscripeevents"></a> unsubscripeEvents

▸ `Private` **unsubscripeEvents**(): `void`

#### Returns

`void`

#### Defined in

[packages/formula/src/context/variable.ts:527](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L527)

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

[packages/formula/src/context/variable.ts:359](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L359)
