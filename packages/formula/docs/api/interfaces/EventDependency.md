# Interface: EventDependency<T\>

## Type parameters

| Name | Type                                                            |
| :--- | :-------------------------------------------------------------- |
| `T`  | extends [`FormulaEventPayload`](FormulaEventPayload.md)<`any`\> |

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

[packages/formula/src/types/index.ts:847](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L847)

---

### <a id="event" name="event"></a> event

• `Readonly` **event**: `EventType`<`T`, `Promise`<`void`\>\>

#### Defined in

[packages/formula/src/types/index.ts:841](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L841)

---

### <a id="eventid" name="eventid"></a> eventId

• `Readonly` **eventId**: `string`

#### Defined in

[packages/formula/src/types/index.ts:842](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L842)

---

### <a id="key" name="key"></a> key

• `Readonly` **key**: `string`

#### Defined in

[packages/formula/src/types/index.ts:844](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L844)

---

### <a id="kind" name="kind"></a> kind

• `Readonly` **kind**: `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Variable"` \| `"SpreadsheetName"` \| `"ColumnName"` \| `"NameChange"` \| `"NameRemove"` \| `"BlockRename"` \| `"BlockDelete"`

#### Defined in

[packages/formula/src/types/index.ts:829](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L829)

---

### <a id="scope" name="scope"></a> scope

• `Readonly` **scope**: [`EventScope`](EventScope.md)

#### Defined in

[packages/formula/src/types/index.ts:843](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L843)

## Methods

### <a id="definitionhandler" name="definitionhandler"></a> definitionHandler

▸ `Optional` `Readonly` **definitionHandler**(`deps`, `variable`, `payload`): `undefined` \| `string`

#### Parameters

| Name       | Type                                          |
| :--------- | :-------------------------------------------- |
| `deps`     | [`EventDependency`](EventDependency.md)<`T`\> |
| `variable` | [`VariableInterface`](VariableInterface.md)   |
| `payload`  | `T`                                           |

#### Returns

`undefined` \| `string`

---

### <a id="skipif" name="skipif"></a> skipIf

▸ `Optional` `Readonly` **skipIf**(`variable`, `payload`): `boolean`

#### Parameters

| Name       | Type                                        |
| :--------- | :------------------------------------------ |
| `variable` | [`VariableInterface`](VariableInterface.md) |
| `payload`  | `T`                                         |

#### Returns

`boolean`
