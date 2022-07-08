# Interface: EventDependency<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FormulaEventPayload`](FormulaEventPayload.md)<`any`\> |

## Table of contents

### Properties

- [cleanup](EventDependency.md#cleanup)
- [definitionHandler](EventDependency.md#definitionhandler)
- [event](EventDependency.md#event)
- [eventId](EventDependency.md#eventid)
- [key](EventDependency.md#key)
- [kind](EventDependency.md#kind)
- [scope](EventDependency.md#scope)
- [skipIf](EventDependency.md#skipif)

## Properties

### <a id="cleanup" name="cleanup"></a> cleanup

• `Optional` `Readonly` **cleanup**: [`EventDependency`](EventDependency.md)<[`FormulaEventPayload`](FormulaEventPayload.md)<`any`\>\>

#### Defined in

[packages/formula/src/type/index.ts:681](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L681)

___

### <a id="definitionhandler" name="definitionhandler"></a> definitionHandler

• `Optional` `Readonly` **definitionHandler**: (`deps`: [`EventDependency`](EventDependency.md)<`T`\>, `variable`: [`VariableInterface`](VariableInterface.md), `payload`: `T`) => `undefined` \| `string`

#### Type declaration

▸ (`deps`, `variable`, `payload`): `undefined` \| `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `deps` | [`EventDependency`](EventDependency.md)<`T`\> |
| `variable` | [`VariableInterface`](VariableInterface.md) |
| `payload` | `T` |

##### Returns

`undefined` \| `string`

#### Defined in

[packages/formula/src/type/index.ts:680](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L680)

___

### <a id="event" name="event"></a> event

• `Readonly` **event**: `EventType`<`T`, `Promise`<`void`\>\>

#### Defined in

[packages/formula/src/type/index.ts:675](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L675)

___

### <a id="eventid" name="eventid"></a> eventId

• `Readonly` **eventId**: `string`

#### Defined in

[packages/formula/src/type/index.ts:676](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L676)

___

### <a id="key" name="key"></a> key

• `Readonly` **key**: `string`

#### Defined in

[packages/formula/src/type/index.ts:678](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L678)

___

### <a id="kind" name="kind"></a> kind

• `Readonly` **kind**: ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Variable"`` \| ``"SpreadsheetName"`` \| ``"ColumnName"`` \| ``"NameChange"`` \| ``"NameRemove"`` \| ``"BlockRename"`` \| ``"BlockDelete"``

#### Defined in

[packages/formula/src/type/index.ts:663](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L663)

___

### <a id="scope" name="scope"></a> scope

• `Readonly` **scope**: [`EventScope`](EventScope.md)

#### Defined in

[packages/formula/src/type/index.ts:677](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L677)

___

### <a id="skipif" name="skipif"></a> skipIf

• `Optional` `Readonly` **skipIf**: (`variable`: [`VariableInterface`](VariableInterface.md), `payload`: `T`) => `boolean`

#### Type declaration

▸ (`variable`, `payload`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `variable` | [`VariableInterface`](VariableInterface.md) |
| `payload` | `T` |

##### Returns

`boolean`

#### Defined in

[packages/formula/src/type/index.ts:679](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L679)
