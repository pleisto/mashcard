# Interface: RowType

## Hierarchy

- [`Row`](Row.md)

  ↳ **`RowType`**

## Implemented by

- [`RowClass`](../classes/RowClass.md)

## Table of contents

### Properties

- [eventDependency](RowType.md#eventdependency)
- [findKey](RowType.md#findkey)
- [handleCodeFragments](RowType.md#handlecodefragments)
- [handleInterpret](RowType.md#handleinterpret)
- [logic](RowType.md#logic)
- [namespaceId](RowType.md#namespaceid)
- [rowId](RowType.md#rowid)
- [rowIndex](RowType.md#rowindex)
- [spreadsheet](RowType.md#spreadsheet)
- [spreadsheetId](RowType.md#spreadsheetid)

### Methods

- [display](RowType.md#display)
- [key](RowType.md#key)
- [listCells](RowType.md#listcells)
- [newCell](RowType.md#newcell)

## Properties

### <a id="eventdependency" name="eventdependency"></a> eventDependency

• **eventDependency**: `getEventDependency`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:119](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L119)

---

### <a id="findkey" name="findkey"></a> findKey

• **findKey**: [`FindKey`](FindKey.md)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:111](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L111)

---

### <a id="handlecodefragments" name="handlecodefragments"></a> handleCodeFragments

• **handleCodeFragments**: `handleCodeFragmentsType`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:117](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L117)

---

### <a id="handleinterpret" name="handleinterpret"></a> handleInterpret

• **handleInterpret**: `handleInterpretType`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:118](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L118)

---

### <a id="logic" name="logic"></a> logic

• **logic**: `boolean`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:113](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L113)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• **namespaceId**: `string`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:110](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L110)

---

### <a id="rowid" name="rowid"></a> rowId

• **rowId**: `string`

#### Inherited from

[Row](Row.md).[rowId](Row.md#rowid)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:104](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L104)

---

### <a id="rowindex" name="rowindex"></a> rowIndex

• **rowIndex**: `number`

#### Inherited from

[Row](Row.md).[rowIndex](Row.md#rowindex)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:105](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L105)

---

### <a id="spreadsheet" name="spreadsheet"></a> spreadsheet

• **spreadsheet**: [`SpreadsheetType`](SpreadsheetType.md)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:109](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L109)

---

### <a id="spreadsheetid" name="spreadsheetid"></a> spreadsheetId

• **spreadsheetId**: `string`

#### Inherited from

[Row](Row.md).[spreadsheetId](Row.md#spreadsheetid)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:103](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L103)

## Methods

### <a id="display" name="display"></a> display

▸ **display**(): `string`

#### Returns

`string`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:114](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L114)

---

### <a id="key" name="key"></a> key

▸ **key**(): `string`

#### Returns

`string`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:115](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L115)

---

### <a id="listcells" name="listcells"></a> listCells

▸ **listCells**(): [`Cell`](Cell.md)[]

#### Returns

[`Cell`](Cell.md)[]

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:112](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L112)

---

### <a id="newcell" name="newcell"></a> newCell

▸ **newCell**(`cell`, `columnKey`): [`CellType`](CellType.md)

#### Parameters

| Name        | Type              |
| :---------- | :---------------- |
| `cell`      | [`Cell`](Cell.md) |
| `columnKey` | `string`          |

#### Returns

[`CellType`](CellType.md)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:116](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L116)
