# Interface: ColumnType

## Hierarchy

- [`Column`](Column.md)

  ↳ **`ColumnType`**

## Implemented by

- [`ColumnClass`](../classes/ColumnClass.md)

## Table of contents

### Properties

- [cells](ColumnType.md#cells)
- [columnId](ColumnType.md#columnid)
- [display](ColumnType.md#display)
- [displayIndex](ColumnType.md#displayindex)
- [eventDependency](ColumnType.md#eventdependency)
- [findKey](ColumnType.md#findkey)
- [handleCodeFragments](ColumnType.md#handlecodefragments)
- [handleInterpret](ColumnType.md#handleinterpret)
- [index](ColumnType.md#index)
- [key](ColumnType.md#key)
- [logic](ColumnType.md#logic)
- [name](ColumnType.md#name)
- [namespaceId](ColumnType.md#namespaceid)
- [newCell](ColumnType.md#newcell)
- [sort](ColumnType.md#sort)
- [spreadsheet](ColumnType.md#spreadsheet)
- [spreadsheetId](ColumnType.md#spreadsheetid)
- [title](ColumnType.md#title)

## Properties

### <a id="cells" name="cells"></a> cells

• **cells**: () => [`Cell`](Cell.md)[]

#### Type declaration

▸ (): [`Cell`](Cell.md)[]

##### Returns

[`Cell`](Cell.md)[]

#### Defined in

[packages/formula/src/controls/types.ts:97](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L97)

___

### <a id="columnid" name="columnid"></a> columnId

• **columnId**: `string`

#### Inherited from

[Column](Column.md).[columnId](Column.md#columnid)

#### Defined in

[packages/formula/src/controls/types.ts:77](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L77)

___

### <a id="display" name="display"></a> display

• **display**: () => `string`

#### Type declaration

▸ (): `string`

##### Returns

`string`

#### Defined in

[packages/formula/src/controls/types.ts:91](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L91)

___

### <a id="displayindex" name="displayindex"></a> displayIndex

• **displayIndex**: `string`

#### Inherited from

[Column](Column.md).[displayIndex](Column.md#displayindex)

#### Defined in

[packages/formula/src/controls/types.ts:81](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L81)

___

### <a id="eventdependency" name="eventdependency"></a> eventDependency

• **eventDependency**: `getEventDependency`

#### Defined in

[packages/formula/src/controls/types.ts:95](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L95)

___

### <a id="findkey" name="findkey"></a> findKey

• **findKey**: [`FindKey`](FindKey.md)

#### Defined in

[packages/formula/src/controls/types.ts:89](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L89)

___

### <a id="handlecodefragments" name="handlecodefragments"></a> handleCodeFragments

• **handleCodeFragments**: `handleCodeFragmentsType`

#### Defined in

[packages/formula/src/controls/types.ts:93](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L93)

___

### <a id="handleinterpret" name="handleinterpret"></a> handleInterpret

• **handleInterpret**: `handleInterpretType`

#### Defined in

[packages/formula/src/controls/types.ts:94](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L94)

___

### <a id="index" name="index"></a> index

• **index**: `number`

#### Inherited from

[Column](Column.md).[index](Column.md#index)

#### Defined in

[packages/formula/src/controls/types.ts:82](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L82)

___

### <a id="key" name="key"></a> key

• **key**: () => `string`

#### Type declaration

▸ (): `string`

##### Returns

`string`

#### Defined in

[packages/formula/src/controls/types.ts:92](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L92)

___

### <a id="logic" name="logic"></a> logic

• **logic**: `boolean`

#### Defined in

[packages/formula/src/controls/types.ts:90](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L90)

___

### <a id="name" name="name"></a> name

• **name**: `string`

#### Inherited from

[Column](Column.md).[name](Column.md#name)

#### Defined in

[packages/formula/src/controls/types.ts:79](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L79)

___

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• **namespaceId**: `string`

#### Defined in

[packages/formula/src/controls/types.ts:88](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L88)

___

### <a id="newcell" name="newcell"></a> newCell

• **newCell**: (`cell`: [`Cell`](Cell.md), `rowKey`: `string`) => [`CellType`](CellType.md)

#### Type declaration

▸ (`cell`, `rowKey`): [`CellType`](CellType.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `cell` | [`Cell`](Cell.md) |
| `rowKey` | `string` |

##### Returns

[`CellType`](CellType.md)

#### Defined in

[packages/formula/src/controls/types.ts:96](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L96)

___

### <a id="sort" name="sort"></a> sort

• **sort**: `number`

#### Inherited from

[Column](Column.md).[sort](Column.md#sort)

#### Defined in

[packages/formula/src/controls/types.ts:83](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L83)

___

### <a id="spreadsheet" name="spreadsheet"></a> spreadsheet

• **spreadsheet**: [`SpreadsheetType`](SpreadsheetType.md)

#### Defined in

[packages/formula/src/controls/types.ts:87](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L87)

___

### <a id="spreadsheetid" name="spreadsheetid"></a> spreadsheetId

• **spreadsheetId**: `string`

#### Inherited from

[Column](Column.md).[spreadsheetId](Column.md#spreadsheetid)

#### Defined in

[packages/formula/src/controls/types.ts:78](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L78)

___

### <a id="title" name="title"></a> title

• **title**: `undefined` \| `string`

#### Inherited from

[Column](Column.md).[title](Column.md#title)

#### Defined in

[packages/formula/src/controls/types.ts:80](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L80)
