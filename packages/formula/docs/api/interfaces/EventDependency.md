# Interface: EventDependency<T\>

## Type parameters

| Name | Type                                                            |
| :--- | :-------------------------------------------------------------- |
| `T`  | extends [`FormulaEventPayload`](FormulaEventPayload.md)<`any`\> |

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

[packages/formula/src/type/index.ts:727](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L727)

---

### <a id="definitionhandler" name="definitionhandler"></a> definitionHandler

• `Optional` `Readonly` **definitionHandler**: (`deps`: [`EventDependency`](EventDependency.md)<`T`\>, `variable`: [`VariableInterface`](VariableInterface.md), `payload`: `T`) => `undefined` \| `string`

#### Type declaration

▸ (`deps`, `variable`, `payload`): `undefined` \| `string`

##### Parameters

| Name       | Type                                          |
| :--------- | :-------------------------------------------- |
| `deps`     | [`EventDependency`](EventDependency.md)<`T`\> |
| `variable` | [`VariableInterface`](VariableInterface.md)   |
| `payload`  | `T`                                           |

##### Returns

`undefined` \| `string`

#### Defined in

[packages/formula/src/type/index.ts:726](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L726)

---

### <a id="event" name="event"></a> event

• `Readonly` **event**: `EventType`<`T`, `Promise`<`void`\>\>

#### Defined in

[packages/formula/src/type/index.ts:721](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L721)

---

### <a id="eventid" name="eventid"></a> eventId

• `Readonly` **eventId**: `string`

#### Defined in

[packages/formula/src/type/index.ts:722](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L722)

---

### <a id="key" name="key"></a> key

• `Readonly` **key**: `string`

#### Defined in

[packages/formula/src/type/index.ts:724](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L724)

---

### <a id="kind" name="kind"></a> kind

• `Readonly` **kind**: `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Variable"` \| `"SpreadsheetName"` \| `"ColumnName"` \| `"NameChange"` \| `"NameRemove"` \| `"BlockRename"` \| `"BlockDelete"`

#### Defined in

[packages/formula/src/type/index.ts:709](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L709)

---

### <a id="scope" name="scope"></a> scope

• `Readonly` **scope**: [`EventScope`](EventScope.md)

#### Defined in

[packages/formula/src/type/index.ts:723](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L723)

---

### <a id="skipif" name="skipif"></a> skipIf

• `Optional` `Readonly` **skipIf**: (`variable`: [`VariableInterface`](VariableInterface.md), `payload`: `T`) => `boolean`

#### Type declaration

▸ (`variable`, `payload`): `boolean`

##### Parameters

| Name       | Type                                        |
| :--------- | :------------------------------------------ |
| `variable` | [`VariableInterface`](VariableInterface.md) |
| `payload`  | `T`                                         |

##### Returns

`boolean`

#### Defined in

[packages/formula/src/type/index.ts:725](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L725)
