# Interface: RowType

## Hierarchy

- [`Row`](Row.md)

  ↳ **`RowType`**

## Implemented by

- [`RowClass`](../classes/RowClass.md)

## Table of contents

### Properties

- [display](RowType.md#display)
- [eventDependency](RowType.md#eventdependency)
- [findKey](RowType.md#findkey)
- [handleCodeFragments](RowType.md#handlecodefragments)
- [handleInterpret](RowType.md#handleinterpret)
- [key](RowType.md#key)
- [listCells](RowType.md#listcells)
- [logic](RowType.md#logic)
- [namespaceId](RowType.md#namespaceid)
- [newCell](RowType.md#newcell)
- [rowId](RowType.md#rowid)
- [rowIndex](RowType.md#rowindex)
- [spreadsheet](RowType.md#spreadsheet)
- [spreadsheetId](RowType.md#spreadsheetid)

## Properties

### <a id="display" name="display"></a> display

• **display**: () => `string`

#### Type declaration

▸ (): `string`

##### Returns

`string`

#### Defined in

[packages/formula/src/controls/types.ts:112](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L112)

___

### <a id="eventdependency" name="eventdependency"></a> eventDependency

• **eventDependency**: `getEventDependency`

#### Defined in

[packages/formula/src/controls/types.ts:117](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L117)

___

### <a id="findkey" name="findkey"></a> findKey

• **findKey**: [`FindKey`](FindKey.md)

#### Defined in

[packages/formula/src/controls/types.ts:109](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L109)

___

### <a id="handlecodefragments" name="handlecodefragments"></a> handleCodeFragments

• **handleCodeFragments**: `handleCodeFragmentsType`

#### Defined in

[packages/formula/src/controls/types.ts:115](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L115)

___

### <a id="handleinterpret" name="handleinterpret"></a> handleInterpret

• **handleInterpret**: `handleInterpretType`

#### Defined in

[packages/formula/src/controls/types.ts:116](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L116)

___

### <a id="key" name="key"></a> key

• **key**: () => `string`

#### Type declaration

▸ (): `string`

##### Returns

`string`

#### Defined in

[packages/formula/src/controls/types.ts:113](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L113)

___

### <a id="listcells" name="listcells"></a> listCells

• **listCells**: () => [`Cell`](Cell.md)[]

#### Type declaration

▸ (): [`Cell`](Cell.md)[]

##### Returns

[`Cell`](Cell.md)[]

#### Defined in

[packages/formula/src/controls/types.ts:110](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L110)

___

### <a id="logic" name="logic"></a> logic

• **logic**: `boolean`

#### Defined in

[packages/formula/src/controls/types.ts:111](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L111)

___

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• **namespaceId**: `string`

#### Defined in

[packages/formula/src/controls/types.ts:108](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L108)

___

### <a id="newcell" name="newcell"></a> newCell

• **newCell**: (`cell`: [`Cell`](Cell.md), `columnKey`: `string`) => [`CellType`](CellType.md)

#### Type declaration

▸ (`cell`, `columnKey`): [`CellType`](CellType.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `cell` | [`Cell`](Cell.md) |
| `columnKey` | `string` |

##### Returns

[`CellType`](CellType.md)

#### Defined in

[packages/formula/src/controls/types.ts:114](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L114)

___

### <a id="rowid" name="rowid"></a> rowId

• **rowId**: `string`

#### Inherited from

[Row](Row.md).[rowId](Row.md#rowid)

#### Defined in

[packages/formula/src/controls/types.ts:102](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L102)

___

### <a id="rowindex" name="rowindex"></a> rowIndex

• **rowIndex**: `number`

#### Inherited from

[Row](Row.md).[rowIndex](Row.md#rowindex)

#### Defined in

[packages/formula/src/controls/types.ts:103](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L103)

___

### <a id="spreadsheet" name="spreadsheet"></a> spreadsheet

• **spreadsheet**: [`SpreadsheetType`](SpreadsheetType.md)

#### Defined in

[packages/formula/src/controls/types.ts:107](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L107)

___

### <a id="spreadsheetid" name="spreadsheetid"></a> spreadsheetId

• **spreadsheetId**: `string`

#### Inherited from

[Row](Row.md).[spreadsheetId](Row.md#spreadsheetid)

#### Defined in

[packages/formula/src/controls/types.ts:101](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L101)
