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

[packages/formula/src/type/index.ts:708](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L708)

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

[packages/formula/src/type/index.ts:707](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L707)

---

### <a id="event" name="event"></a> event

• `Readonly` **event**: `EventType`<`T`, `Promise`<`void`\>\>

#### Defined in

[packages/formula/src/type/index.ts:702](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L702)

---

### <a id="eventid" name="eventid"></a> eventId

• `Readonly` **eventId**: `string`

#### Defined in

[packages/formula/src/type/index.ts:703](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L703)

---

### <a id="key" name="key"></a> key

• `Readonly` **key**: `string`

#### Defined in

[packages/formula/src/type/index.ts:705](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L705)

---

### <a id="kind" name="kind"></a> kind

• `Readonly` **kind**: `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Variable"` \| `"SpreadsheetName"` \| `"ColumnName"` \| `"NameChange"` \| `"NameRemove"` \| `"BlockRename"` \| `"BlockDelete"`

#### Defined in

[packages/formula/src/type/index.ts:690](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L690)

---

### <a id="scope" name="scope"></a> scope

• `Readonly` **scope**: [`EventScope`](EventScope.md)

#### Defined in

[packages/formula/src/type/index.ts:704](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L704)

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

[packages/formula/src/type/index.ts:706](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L706)
