# Interface: ColumnType

## Hierarchy

- [`Column`](Column.md)

  ↳ **`ColumnType`**

## Implemented by

- [`ColumnClass`](../classes/ColumnClass.md)

## Table of contents

### Properties

- [columnId](ColumnType.md#columnid)
- [displayIndex](ColumnType.md#displayindex)
- [eventDependency](ColumnType.md#eventdependency)
- [findKey](ColumnType.md#findkey)
- [handleCodeFragments](ColumnType.md#handlecodefragments)
- [handleInterpret](ColumnType.md#handleinterpret)
- [index](ColumnType.md#index)
- [logic](ColumnType.md#logic)
- [name](ColumnType.md#name)
- [namespaceId](ColumnType.md#namespaceid)
- [sort](ColumnType.md#sort)
- [spreadsheet](ColumnType.md#spreadsheet)
- [spreadsheetId](ColumnType.md#spreadsheetid)
- [title](ColumnType.md#title)

### Methods

- [cells](ColumnType.md#cells)
- [display](ColumnType.md#display)
- [key](ColumnType.md#key)
- [newCell](ColumnType.md#newcell)

## Properties

### <a id="columnid" name="columnid"></a> columnId

• **columnId**: `string`

#### Inherited from

[Column](Column.md).[columnId](Column.md#columnid)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:79](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L79)

---

### <a id="displayindex" name="displayindex"></a> displayIndex

• **displayIndex**: `string`

#### Inherited from

[Column](Column.md).[displayIndex](Column.md#displayindex)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:83](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L83)

---

### <a id="eventdependency" name="eventdependency"></a> eventDependency

• **eventDependency**: `getEventDependency`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:97](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L97)

---

### <a id="findkey" name="findkey"></a> findKey

• **findKey**: [`FindKey`](FindKey.md)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:91](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L91)

---

### <a id="handlecodefragments" name="handlecodefragments"></a> handleCodeFragments

• **handleCodeFragments**: `handleCodeFragmentsType`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:95](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L95)

---

### <a id="handleinterpret" name="handleinterpret"></a> handleInterpret

• **handleInterpret**: `handleInterpretType`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:96](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L96)

---

### <a id="index" name="index"></a> index

• **index**: `number`

#### Inherited from

[Column](Column.md).[index](Column.md#index)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:84](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L84)

---

### <a id="logic" name="logic"></a> logic

• **logic**: `boolean`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:92](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L92)

---

### <a id="name" name="name"></a> name

• **name**: `string`

#### Inherited from

[Column](Column.md).[name](Column.md#name)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:81](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L81)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• **namespaceId**: `string`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:90](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L90)

---

### <a id="sort" name="sort"></a> sort

• **sort**: `number`

#### Inherited from

[Column](Column.md).[sort](Column.md#sort)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:85](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L85)

---

### <a id="spreadsheet" name="spreadsheet"></a> spreadsheet

• **spreadsheet**: [`SpreadsheetType`](SpreadsheetType.md)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:89](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L89)

---

### <a id="spreadsheetid" name="spreadsheetid"></a> spreadsheetId

• **spreadsheetId**: `string`

#### Inherited from

[Column](Column.md).[spreadsheetId](Column.md#spreadsheetid)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:80](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L80)

---

### <a id="title" name="title"></a> title

• **title**: `undefined` \| `string`

#### Inherited from

[Column](Column.md).[title](Column.md#title)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:82](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L82)

## Methods

### <a id="cells" name="cells"></a> cells

▸ **cells**(): [`Cell`](Cell.md)[]

#### Returns

[`Cell`](Cell.md)[]

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:99](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L99)

---

### <a id="display" name="display"></a> display

▸ **display**(): `string`

#### Returns

`string`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:93](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L93)

---

### <a id="key" name="key"></a> key

▸ **key**(): `string`

#### Returns

`string`

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:94](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L94)

---

### <a id="newcell" name="newcell"></a> newCell

▸ **newCell**(`cell`, `rowKey`): [`CellType`](CellType.md)

#### Parameters

| Name     | Type              |
| :------- | :---------------- |
| `cell`   | [`Cell`](Cell.md) |
| `rowKey` | `string`          |

#### Returns

[`CellType`](CellType.md)

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:98](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/types.ts#L98)
