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

[packages/formula/src/type/index.ts:701](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L701)

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

[packages/formula/src/type/index.ts:700](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L700)

---

### <a id="event" name="event"></a> event

• `Readonly` **event**: `EventType`<`T`, `Promise`<`void`\>\>

#### Defined in

[packages/formula/src/type/index.ts:695](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L695)

---

### <a id="eventid" name="eventid"></a> eventId

• `Readonly` **eventId**: `string`

#### Defined in

[packages/formula/src/type/index.ts:696](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L696)

---

### <a id="key" name="key"></a> key

• `Readonly` **key**: `string`

#### Defined in

[packages/formula/src/type/index.ts:698](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L698)

---

### <a id="kind" name="kind"></a> kind

• `Readonly` **kind**: `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Variable"` \| `"SpreadsheetName"` \| `"ColumnName"` \| `"NameChange"` \| `"NameRemove"` \| `"BlockRename"` \| `"BlockDelete"`

#### Defined in

[packages/formula/src/type/index.ts:683](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L683)

---

### <a id="scope" name="scope"></a> scope

• `Readonly` **scope**: [`EventScope`](EventScope.md)

#### Defined in

[packages/formula/src/type/index.ts:697](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L697)

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

[packages/formula/src/type/index.ts:699](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L699)
