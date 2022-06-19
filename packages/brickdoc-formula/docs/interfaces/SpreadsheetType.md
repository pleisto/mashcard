# Interface: SpreadsheetType

## Implemented by

- [`SpreadsheetClass`](../classes/SpreadsheetClass.md)

## Table of contents

### Properties

- [dynamic](SpreadsheetType.md#dynamic)
- [eventDependency](SpreadsheetType.md#eventdependency)
- [handleCodeFragments](SpreadsheetType.md#handlecodefragments)
- [handleInterpret](SpreadsheetType.md#handleinterpret)
- [namespaceId](SpreadsheetType.md#namespaceid)
- [persistence](SpreadsheetType.md#persistence)
- [spreadsheetId](SpreadsheetType.md#spreadsheetid)

### Methods

- [cleanup](SpreadsheetType.md#cleanup)
- [columnCount](SpreadsheetType.md#columncount)
- [findCellDisplayData](SpreadsheetType.md#findcelldisplaydata)
- [findCellValue](SpreadsheetType.md#findcellvalue)
- [findColumn](SpreadsheetType.md#findcolumn)
- [findRow](SpreadsheetType.md#findrow)
- [listCells](SpreadsheetType.md#listcells)
- [listColumns](SpreadsheetType.md#listcolumns)
- [listRows](SpreadsheetType.md#listrows)
- [name](SpreadsheetType.md#name)
- [nameDependency](SpreadsheetType.md#namedependency)
- [namespaceName](SpreadsheetType.md#namespacename)
- [persistAll](SpreadsheetType.md#persistall)
- [rowCount](SpreadsheetType.md#rowcount)
- [toArray](SpreadsheetType.md#toarray)
- [toRecord](SpreadsheetType.md#torecord)

## Properties

### <a id="dynamic" name="dynamic"></a> dynamic

• **dynamic**: `boolean`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:193](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L193)

---

### <a id="eventdependency" name="eventdependency"></a> eventDependency

• **eventDependency**: `getEventDependency`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:198](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L198)

---

### <a id="handlecodefragments" name="handlecodefragments"></a> handleCodeFragments

• **handleCodeFragments**: `handleCodeFragmentsType`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:196](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L196)

---

### <a id="handleinterpret" name="handleinterpret"></a> handleInterpret

• **handleInterpret**: `handleInterpretType`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:197](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L197)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• **namespaceId**: `string`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:191](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L191)

---

### <a id="persistence" name="persistence"></a> persistence

• `Optional` **persistence**: [`SpreadsheetDynamicPersistence`](SpreadsheetDynamicPersistence.md)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:195](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L195)

---

### <a id="spreadsheetid" name="spreadsheetid"></a> spreadsheetId

• **spreadsheetId**: `string`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:190](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L190)

## Methods

### <a id="cleanup" name="cleanup"></a> cleanup

▸ **cleanup**(): `void`

#### Returns

`void`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:194](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L194)

---

### <a id="columncount" name="columncount"></a> columnCount

▸ **columnCount**(): `number`

#### Returns

`number`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:200](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L200)

---

### <a id="findcelldisplaydata" name="findcelldisplaydata"></a> findCellDisplayData

▸ **findCellDisplayData**(`__namedParameters`): `undefined` \| [`VariableDisplayData`](VariableDisplayData.md)

#### Parameters

| Name                         | Type     |
| :--------------------------- | :------- |
| `__namedParameters`          | `Object` |
| `__namedParameters.columnId` | `string` |
| `__namedParameters.rowId`    | `string` |

#### Returns

`undefined` \| [`VariableDisplayData`](VariableDisplayData.md)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:207](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L207)

---

### <a id="findcellvalue" name="findcellvalue"></a> findCellValue

▸ **findCellValue**(`__namedParameters`): `undefined` \| `string`

#### Parameters

| Name                         | Type     |
| :--------------------------- | :------- |
| `__namedParameters`          | `Object` |
| `__namedParameters.columnId` | `string` |
| `__namedParameters.rowId`    | `string` |

#### Returns

`undefined` \| `string`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:206](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L206)

---

### <a id="findcolumn" name="findcolumn"></a> findColumn

▸ **findColumn**(`key`): `undefined` \| [`ColumnType`](ColumnType.md)

#### Parameters

| Name  | Type                    |
| :---- | :---------------------- |
| `key` | [`FindKey`](FindKey.md) |

#### Returns

`undefined` \| [`ColumnType`](ColumnType.md)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:209](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L209)

---

### <a id="findrow" name="findrow"></a> findRow

▸ **findRow**(`key`): `undefined` \| [`RowType`](RowType.md)

#### Parameters

| Name  | Type                    |
| :---- | :---------------------- |
| `key` | [`FindKey`](FindKey.md) |

#### Returns

`undefined` \| [`RowType`](RowType.md)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:208](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L208)

---

### <a id="listcells" name="listcells"></a> listCells

▸ **listCells**(`__namedParameters`): [`Cell`](Cell.md)[]

#### Parameters

| Name                          | Type     |
| :---------------------------- | :------- |
| `__namedParameters`           | `Object` |
| `__namedParameters.columnId?` | `string` |
| `__namedParameters.rowId?`    | `string` |

#### Returns

[`Cell`](Cell.md)[]

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:205](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L205)

---

### <a id="listcolumns" name="listcolumns"></a> listColumns

▸ **listColumns**(): [`Column`](Column.md)[]

#### Returns

[`Column`](Column.md)[]

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:203](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L203)

---

### <a id="listrows" name="listrows"></a> listRows

▸ **listRows**(): [`Row`](Row.md)[]

#### Returns

[`Row`](Row.md)[]

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:204](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L204)

---

### <a id="name" name="name"></a> name

▸ **name**(): `string`

#### Returns

`string`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:202](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L202)

---

### <a id="namedependency" name="namedependency"></a> nameDependency

▸ **nameDependency**(): [`NameDependencyWithKind`](NameDependencyWithKind.md)

#### Returns

[`NameDependencyWithKind`](NameDependencyWithKind.md)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:199](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L199)

---

### <a id="namespacename" name="namespacename"></a> namespaceName

▸ **namespaceName**(`pageId`): `string`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `pageId` | `string` |

#### Returns

`string`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:192](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L192)

---

### <a id="persistall" name="persistall"></a> persistAll

▸ **persistAll**(): [`SpreadsheetAllPersistence`](SpreadsheetAllPersistence.md)

#### Returns

[`SpreadsheetAllPersistence`](SpreadsheetAllPersistence.md)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:212](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L212)

---

### <a id="rowcount" name="rowcount"></a> rowCount

▸ **rowCount**(): `number`

#### Returns

`number`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:201](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L201)

---

### <a id="toarray" name="toarray"></a> toArray

▸ **toArray**(): `string`[][]

#### Returns

`string`[][]

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:210](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L210)

---

### <a id="torecord" name="torecord"></a> toRecord

▸ **toRecord**(): `Record`<`string`, [`StringResult`](StringResult.md)\>[]

#### Returns

`Record`<`string`, [`StringResult`](StringResult.md)\>[]

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:211](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L211)
