# Class: CellClass

## Implements

- [`CellType`](../interfaces/CellType.md)

## Table of contents

### Constructors

- [constructor](CellClass.md#constructor)

### Properties

- [cellId](CellClass.md#cellid)
- [cleanupEventDependency](CellClass.md#cleanupeventdependency)
- [columnId](CellClass.md#columnid)
- [columnIndex](CellClass.md#columnindex)
- [columnKey](CellClass.md#columnkey)
- [namespaceId](CellClass.md#namespaceid)
- [rowId](CellClass.md#rowid)
- [rowIndex](CellClass.md#rowindex)
- [rowKey](CellClass.md#rowkey)
- [spreadsheet](CellClass.md#spreadsheet)
- [spreadsheetId](CellClass.md#spreadsheetid)
- [value](CellClass.md#value)
- [variableId](CellClass.md#variableid)

### Methods

- [eventDependency](CellClass.md#eventdependency)
- [getValue](CellClass.md#getvalue)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new CellClass**(`spreadsheet`, `__namedParameters`, `__namedParameters`)

#### Parameters

| Name                                       | Type                                                                                                                                |
| :----------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `spreadsheet`                              | [`SpreadsheetType`](../interfaces/SpreadsheetType.md)                                                                               |
| `__namedParameters`                        | [`Cell`](../interfaces/Cell.md)                                                                                                     |
| `__namedParameters`                        | `Object`                                                                                                                            |
| `__namedParameters.cleanupEventDependency` | [`EventDependency`](../interfaces/EventDependency.md)<[`SpreadsheetUpdateNamePayload`](../README.md#spreadsheetupdatenamepayload)\> |
| `__namedParameters.columnKey`              | `string`                                                                                                                            |
| `__namedParameters.rowKey`                 | `string`                                                                                                                            |

## Properties

### <a id="cellid" name="cellid"></a> cellId

• **cellId**: `string`

#### Implementation of

[CellType](../interfaces/CellType.md).[cellId](../interfaces/CellType.md#cellid)

#### Defined in

[packages/formula/src/controls/cell.ts:8](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/cell.ts#L8)

---

### <a id="cleanupeventdependency" name="cleanupeventdependency"></a> cleanupEventDependency

• **cleanupEventDependency**: [`EventDependency`](../interfaces/EventDependency.md)<[`SpreadsheetUpdateNamePayload`](../README.md#spreadsheetupdatenamepayload)\>

#### Defined in

[packages/formula/src/controls/cell.ts:18](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/cell.ts#L18)

---

### <a id="columnid" name="columnid"></a> columnId

• **columnId**: `string`

#### Implementation of

[CellType](../interfaces/CellType.md).[columnId](../interfaces/CellType.md#columnid)

#### Defined in

[packages/formula/src/controls/cell.ts:9](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/cell.ts#L9)

---

### <a id="columnindex" name="columnindex"></a> columnIndex

• **columnIndex**: `number`

#### Implementation of

[CellType](../interfaces/CellType.md).[columnIndex](../interfaces/CellType.md#columnindex)

#### Defined in

[packages/formula/src/controls/cell.ts:12](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/cell.ts#L12)

---

### <a id="columnkey" name="columnkey"></a> columnKey

• **columnKey**: `string`

#### Implementation of

[CellType](../interfaces/CellType.md).[columnKey](../interfaces/CellType.md#columnkey)

#### Defined in

[packages/formula/src/controls/cell.ts:16](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/cell.ts#L16)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• **namespaceId**: `string`

#### Implementation of

[CellType](../interfaces/CellType.md).[namespaceId](../interfaces/CellType.md#namespaceid)

#### Defined in

[packages/formula/src/controls/cell.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/cell.ts#L6)

---

### <a id="rowid" name="rowid"></a> rowId

• **rowId**: `string`

#### Implementation of

[CellType](../interfaces/CellType.md).[rowId](../interfaces/CellType.md#rowid)

#### Defined in

[packages/formula/src/controls/cell.ts:10](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/cell.ts#L10)

---

### <a id="rowindex" name="rowindex"></a> rowIndex

• **rowIndex**: `number`

#### Implementation of

[CellType](../interfaces/CellType.md).[rowIndex](../interfaces/CellType.md#rowindex)

#### Defined in

[packages/formula/src/controls/cell.ts:13](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/cell.ts#L13)

---

### <a id="rowkey" name="rowkey"></a> rowKey

• **rowKey**: `string`

#### Implementation of

[CellType](../interfaces/CellType.md).[rowKey](../interfaces/CellType.md#rowkey)

#### Defined in

[packages/formula/src/controls/cell.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/cell.ts#L17)

---

### <a id="spreadsheet" name="spreadsheet"></a> spreadsheet

• **spreadsheet**: [`SpreadsheetType`](../interfaces/SpreadsheetType.md)

#### Implementation of

[CellType](../interfaces/CellType.md).[spreadsheet](../interfaces/CellType.md#spreadsheet)

#### Defined in

[packages/formula/src/controls/cell.ts:15](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/cell.ts#L15)

---

### <a id="spreadsheetid" name="spreadsheetid"></a> spreadsheetId

• **spreadsheetId**: `string`

#### Implementation of

[CellType](../interfaces/CellType.md).[spreadsheetId](../interfaces/CellType.md#spreadsheetid)

#### Defined in

[packages/formula/src/controls/cell.ts:7](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/cell.ts#L7)

---

### <a id="value" name="value"></a> value

• **value**: `string`

#### Implementation of

[CellType](../interfaces/CellType.md).[value](../interfaces/CellType.md#value)

#### Defined in

[packages/formula/src/controls/cell.ts:14](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/cell.ts#L14)

---

### <a id="variableid" name="variableid"></a> variableId

• **variableId**: `string`

#### Implementation of

[CellType](../interfaces/CellType.md).[variableId](../interfaces/CellType.md#variableid)

#### Defined in

[packages/formula/src/controls/cell.ts:11](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/cell.ts#L11)

## Methods

### <a id="eventdependency" name="eventdependency"></a> eventDependency

▸ **eventDependency**(): [`EventDependency`](../interfaces/EventDependency.md)<[`SpreadsheetUpdateNamePayload`](../README.md#spreadsheetupdatenamepayload)\>

#### Returns

[`EventDependency`](../interfaces/EventDependency.md)<[`SpreadsheetUpdateNamePayload`](../README.md#spreadsheetupdatenamepayload)\>

#### Implementation of

CellType.eventDependency

---

### <a id="getvalue" name="getvalue"></a> getValue

▸ **getValue**(): `string`

#### Returns

`string`

#### Implementation of

CellType.getValue
