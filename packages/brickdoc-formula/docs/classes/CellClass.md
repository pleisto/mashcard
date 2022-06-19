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
- [displayData](CellClass.md#displaydata)
- [namespaceId](CellClass.md#namespaceid)
- [rowId](CellClass.md#rowid)
- [rowIndex](CellClass.md#rowindex)
- [rowKey](CellClass.md#rowkey)
- [spreadsheet](CellClass.md#spreadsheet)
- [spreadsheetId](CellClass.md#spreadsheetid)
- [value](CellClass.md#value)

### Methods

- [eventDependency](CellClass.md#eventdependency)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new CellClass**(`spreadsheet`, `__namedParameters`, `__namedParameters`)

#### Parameters

| Name                                       | Type                                                                                                                                          |
| :----------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `spreadsheet`                              | [`SpreadsheetType`](../interfaces/SpreadsheetType.md)                                                                                         |
| `__namedParameters`                        | [`Cell`](../interfaces/Cell.md)                                                                                                               |
| `__namedParameters`                        | `Object`                                                                                                                                      |
| `__namedParameters.cleanupEventDependency` | [`EventDependency`](../interfaces/EventDependency.md)<[`SpreadsheetUpdateNameViaIdPayload`](../README.md#spreadsheetupdatenameviaidpayload)\> |
| `__namedParameters.columnKey`              | `string`                                                                                                                                      |
| `__namedParameters.rowKey`                 | `string`                                                                                                                                      |

#### Defined in

[packages/brickdoc-formula/src/controls/cell.ts:21](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/cell.ts#L21)

## Properties

### <a id="cellid" name="cellid"></a> cellId

• **cellId**: `string`

#### Implementation of

[CellType](../interfaces/CellType.md).[cellId](../interfaces/CellType.md#cellid)

#### Defined in

[packages/brickdoc-formula/src/controls/cell.ts:8](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/cell.ts#L8)

---

### <a id="cleanupeventdependency" name="cleanupeventdependency"></a> cleanupEventDependency

• **cleanupEventDependency**: [`EventDependency`](../interfaces/EventDependency.md)<[`SpreadsheetUpdateNameViaIdPayload`](../README.md#spreadsheetupdatenameviaidpayload)\>

#### Defined in

[packages/brickdoc-formula/src/controls/cell.ts:19](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/cell.ts#L19)

---

### <a id="columnid" name="columnid"></a> columnId

• **columnId**: `string`

#### Implementation of

[CellType](../interfaces/CellType.md).[columnId](../interfaces/CellType.md#columnid)

#### Defined in

[packages/brickdoc-formula/src/controls/cell.ts:9](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/cell.ts#L9)

---

### <a id="columnindex" name="columnindex"></a> columnIndex

• **columnIndex**: `number`

#### Implementation of

[CellType](../interfaces/CellType.md).[columnIndex](../interfaces/CellType.md#columnindex)

#### Defined in

[packages/brickdoc-formula/src/controls/cell.ts:11](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/cell.ts#L11)

---

### <a id="columnkey" name="columnkey"></a> columnKey

• **columnKey**: `string`

#### Implementation of

[CellType](../interfaces/CellType.md).[columnKey](../interfaces/CellType.md#columnkey)

#### Defined in

[packages/brickdoc-formula/src/controls/cell.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/cell.ts#L17)

---

### <a id="displaydata" name="displaydata"></a> displayData

• **displayData**: `undefined` \| [`VariableDisplayData`](../interfaces/VariableDisplayData.md)

#### Implementation of

[CellType](../interfaces/CellType.md).[displayData](../interfaces/CellType.md#displaydata)

#### Defined in

[packages/brickdoc-formula/src/controls/cell.ts:14](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/cell.ts#L14)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• **namespaceId**: `string`

#### Implementation of

[CellType](../interfaces/CellType.md).[namespaceId](../interfaces/CellType.md#namespaceid)

#### Defined in

[packages/brickdoc-formula/src/controls/cell.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/cell.ts#L6)

---

### <a id="rowid" name="rowid"></a> rowId

• **rowId**: `string`

#### Implementation of

[CellType](../interfaces/CellType.md).[rowId](../interfaces/CellType.md#rowid)

#### Defined in

[packages/brickdoc-formula/src/controls/cell.ts:10](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/cell.ts#L10)

---

### <a id="rowindex" name="rowindex"></a> rowIndex

• **rowIndex**: `number`

#### Implementation of

[CellType](../interfaces/CellType.md).[rowIndex](../interfaces/CellType.md#rowindex)

#### Defined in

[packages/brickdoc-formula/src/controls/cell.ts:12](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/cell.ts#L12)

---

### <a id="rowkey" name="rowkey"></a> rowKey

• **rowKey**: `string`

#### Implementation of

[CellType](../interfaces/CellType.md).[rowKey](../interfaces/CellType.md#rowkey)

#### Defined in

[packages/brickdoc-formula/src/controls/cell.ts:18](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/cell.ts#L18)

---

### <a id="spreadsheet" name="spreadsheet"></a> spreadsheet

• **spreadsheet**: [`SpreadsheetType`](../interfaces/SpreadsheetType.md)

#### Implementation of

[CellType](../interfaces/CellType.md).[spreadsheet](../interfaces/CellType.md#spreadsheet)

#### Defined in

[packages/brickdoc-formula/src/controls/cell.ts:16](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/cell.ts#L16)

---

### <a id="spreadsheetid" name="spreadsheetid"></a> spreadsheetId

• **spreadsheetId**: `string`

#### Implementation of

[CellType](../interfaces/CellType.md).[spreadsheetId](../interfaces/CellType.md#spreadsheetid)

#### Defined in

[packages/brickdoc-formula/src/controls/cell.ts:7](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/cell.ts#L7)

---

### <a id="value" name="value"></a> value

• **value**: `string`

#### Implementation of

[CellType](../interfaces/CellType.md).[value](../interfaces/CellType.md#value)

#### Defined in

[packages/brickdoc-formula/src/controls/cell.ts:13](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/cell.ts#L13)

## Methods

### <a id="eventdependency" name="eventdependency"></a> eventDependency

▸ **eventDependency**(): [`EventDependency`](../interfaces/EventDependency.md)<[`SpreadsheetUpdateNameViaIdPayload`](../README.md#spreadsheetupdatenameviaidpayload)\>

#### Returns

[`EventDependency`](../interfaces/EventDependency.md)<[`SpreadsheetUpdateNameViaIdPayload`](../README.md#spreadsheetupdatenameviaidpayload)\>

#### Implementation of

CellType.eventDependency

#### Defined in

[packages/brickdoc-formula/src/controls/cell.ts:47](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/cell.ts#L47)
