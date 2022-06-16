# Interface: EventDependency<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FormulaEventPayload`](FormulaEventPayload.md)<`any`\> |

## Table of contents

### Properties

- [cleanup](EventDependency.md#cleanup)
- [event](EventDependency.md#event)
- [eventId](EventDependency.md#eventid)
- [key](EventDependency.md#key)
- [kind](EventDependency.md#kind)
- [scope](EventDependency.md#scope)

### Methods

- [definitionHandler](EventDependency.md#definitionhandler)
- [skipIf](EventDependency.md#skipif)

## Properties

### <a id="cleanup" name="cleanup"></a> cleanup

• `Optional` `Readonly` **cleanup**: [`EventDependency`](EventDependency.md)<[`FormulaEventPayload`](FormulaEventPayload.md)<`any`\>\>

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:819](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L819)

___

### <a id="event" name="event"></a> event

• `Readonly` **event**: `EventType`<`T`, `Promise`<`void`\>\>

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:813](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L813)

___

### <a id="eventid" name="eventid"></a> eventId

• `Readonly` **eventId**: `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:814](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L814)

___

### <a id="key" name="key"></a> key

• `Readonly` **key**: `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:816](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L816)

___

### <a id="kind" name="kind"></a> kind

• `Readonly` **kind**: ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Variable"`` \| ``"SpreadsheetName"`` \| ``"ColumnName"`` \| ``"NameChange"`` \| ``"NameRemove"`` \| ``"BlockRename"`` \| ``"BlockDelete"``

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:801](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L801)

___

### <a id="scope" name="scope"></a> scope

• `Readonly` **scope**: [`EventScope`](EventScope.md)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:815](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L815)

## Methods

### <a id="definitionhandler" name="definitionhandler"></a> definitionHandler

▸ `Optional` `Readonly` **definitionHandler**(`deps`, `variable`, `payload`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deps` | [`EventDependency`](EventDependency.md)<`T`\> |
| `variable` | [`VariableInterface`](VariableInterface.md) |
| `payload` | `T` |

#### Returns

`undefined` \| `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:818](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L818)

___

### <a id="skipif" name="skipif"></a> skipIf

▸ `Optional` `Readonly` **skipIf**(`variable`, `payload`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `variable` | [`VariableInterface`](VariableInterface.md) |
| `payload` | `T` |

#### Returns

`boolean`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:817](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L817)
