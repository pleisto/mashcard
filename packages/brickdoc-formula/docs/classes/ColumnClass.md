# Class: ColumnClass

## Implements

- [`ColumnType`](../interfaces/ColumnType.md)

## Table of contents

### Constructors

- [constructor](ColumnClass.md#constructor)

### Properties

- [columnId](ColumnClass.md#columnid)
- [displayIndex](ColumnClass.md#displayindex)
- [findKey](ColumnClass.md#findkey)
- [index](ColumnClass.md#index)
- [logic](ColumnClass.md#logic)
- [name](ColumnClass.md#name)
- [namespaceId](ColumnClass.md#namespaceid)
- [sort](ColumnClass.md#sort)
- [spreadsheet](ColumnClass.md#spreadsheet)
- [spreadsheetId](ColumnClass.md#spreadsheetid)
- [title](ColumnClass.md#title)

### Methods

- [cells](ColumnClass.md#cells)
- [display](ColumnClass.md#display)
- [eventDependency](ColumnClass.md#eventdependency)
- [findCellByNumber](ColumnClass.md#findcellbynumber)
- [handleCodeFragments](ColumnClass.md#handlecodefragments)
- [handleInterpret](ColumnClass.md#handleinterpret)
- [key](ColumnClass.md#key)
- [newCell](ColumnClass.md#newcell)
- [persistence](ColumnClass.md#persistence)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new ColumnClass**(`spreadsheet`, `__namedParameters`, `logic`, `findKey`)

#### Parameters

| Name                | Type                                                  |
| :------------------ | :---------------------------------------------------- |
| `spreadsheet`       | [`SpreadsheetType`](../interfaces/SpreadsheetType.md) |
| `__namedParameters` | [`Column`](../interfaces/Column.md)                   |
| `logic`             | `boolean`                                             |
| `findKey`           | [`FindKey`](../interfaces/FindKey.md)                 |

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:33](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L33)

## Properties

### <a id="columnid" name="columnid"></a> columnId

• **columnId**: `string`

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[columnId](../interfaces/ColumnType.md#columnid)

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:21](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L21)

---

### <a id="displayindex" name="displayindex"></a> displayIndex

• **displayIndex**: `string`

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[displayIndex](../interfaces/ColumnType.md#displayindex)

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:29](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L29)

---

### <a id="findkey" name="findkey"></a> findKey

• **findKey**: [`FindKey`](../interfaces/FindKey.md)

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[findKey](../interfaces/ColumnType.md#findkey)

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:25](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L25)

---

### <a id="index" name="index"></a> index

• **index**: `number`

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[index](../interfaces/ColumnType.md#index)

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:26](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L26)

---

### <a id="logic" name="logic"></a> logic

• **logic**: `boolean`

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[logic](../interfaces/ColumnType.md#logic)

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:31](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L31)

---

### <a id="name" name="name"></a> name

• **name**: `string`

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[name](../interfaces/ColumnType.md#name)

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:22](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L22)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• **namespaceId**: `string`

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[namespaceId](../interfaces/ColumnType.md#namespaceid)

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:23](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L23)

---

### <a id="sort" name="sort"></a> sort

• **sort**: `number`

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[sort](../interfaces/ColumnType.md#sort)

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:27](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L27)

---

### <a id="spreadsheet" name="spreadsheet"></a> spreadsheet

• **spreadsheet**: [`SpreadsheetType`](../interfaces/SpreadsheetType.md)

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[spreadsheet](../interfaces/ColumnType.md#spreadsheet)

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:30](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L30)

---

### <a id="spreadsheetid" name="spreadsheetid"></a> spreadsheetId

• **spreadsheetId**: `string`

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[spreadsheetId](../interfaces/ColumnType.md#spreadsheetid)

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:24](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L24)

---

### <a id="title" name="title"></a> title

• **title**: `undefined` \| `string`

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[title](../interfaces/ColumnType.md#title)

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:28](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L28)

## Methods

### <a id="cells" name="cells"></a> cells

▸ **cells**(): [`Cell`](../interfaces/Cell.md)[]

#### Returns

[`Cell`](../interfaces/Cell.md)[]

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[cells](../interfaces/ColumnType.md#cells)

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:60](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L60)

---

### <a id="display" name="display"></a> display

▸ **display**(): `string`

#### Returns

`string`

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[display](../interfaces/ColumnType.md#display)

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:52](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L52)

---

### <a id="eventdependency" name="eventdependency"></a> eventDependency

▸ **eventDependency**(`__namedParameters`): [`EventDependency`](../interfaces/EventDependency.md)<[`SpreadsheetUpdateNameViaIdPayload`](../README.md#spreadsheetupdatenameviaidpayload)\>

#### Parameters

| Name                | Type                                                              |
| :------------------ | :---------------------------------------------------------------- |
| `__namedParameters` | [`getEventDependencyInput`](../README.md#geteventdependencyinput) |

#### Returns

[`EventDependency`](../interfaces/EventDependency.md)<[`SpreadsheetUpdateNameViaIdPayload`](../README.md#spreadsheetupdatenameviaidpayload)\>

#### Implementation of

ColumnType.eventDependency

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:111](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L111)

---

### <a id="findcellbynumber" name="findcellbynumber"></a> findCellByNumber

▸ `Private` **findCellByNumber**(`meta`, `name`): [`CellResult`](../interfaces/CellResult.md) \| [`ErrorResult`](../interfaces/ErrorResult.md)

#### Parameters

| Name   | Type                                                    |
| :----- | :------------------------------------------------------ |
| `meta` | [`VariableMetadata`](../interfaces/VariableMetadata.md) |
| `name` | `string`                                                |

#### Returns

[`CellResult`](../interfaces/CellResult.md) \| [`ErrorResult`](../interfaces/ErrorResult.md)

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:77](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L77)

---

### <a id="handlecodefragments" name="handlecodefragments"></a> handleCodeFragments

▸ **handleCodeFragments**(`visitor`, `name`, `codeFragments`): `Object`

#### Parameters

| Name            | Type                                            |
| :-------------- | :---------------------------------------------- |
| `visitor`       | [`CodeFragmentVisitor`](CodeFragmentVisitor.md) |
| `name`          | `string`                                        |
| `codeFragments` | [`CodeFragment`](../README.md#codefragment)[]   |

#### Returns

`Object`

| Name                | Type                                                                                                                                                                                                                                                                                                                                                                                                |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `codeFragments`     | [`CodeFragment`](../README.md#codefragment)[]                                                                                                                                                                                                                                                                                                                                                       |
| `errors`            | [`ErrorMessage`](../interfaces/ErrorMessage.md)[]                                                                                                                                                                                                                                                                                                                                                   |
| `firstArgumentType` | `undefined` \| `"string"` \| `"number"` \| `"boolean"` \| `"Block"` \| `"null"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"Button"` \| `"Switch"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"` \| `"void"` |

#### Implementation of

ColumnType.handleCodeFragments

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:142](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L142)

---

### <a id="handleinterpret" name="handleinterpret"></a> handleInterpret

▸ **handleInterpret**(`interpreter`, `name`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name          | Type                                          |
| :------------ | :-------------------------------------------- |
| `interpreter` | [`FormulaInterpreter`](FormulaInterpreter.md) |
| `name`        | `string`                                      |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Implementation of

ColumnType.handleInterpret

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:138](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L138)

---

### <a id="key" name="key"></a> key

▸ **key**(): `string`

#### Returns

`string`

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[key](../interfaces/ColumnType.md#key)

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:56](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L56)

---

### <a id="newcell" name="newcell"></a> newCell

▸ **newCell**(`cell`, `rowKey`): [`CellType`](../interfaces/CellType.md)

#### Parameters

| Name     | Type                            |
| :------- | :------------------------------ |
| `cell`   | [`Cell`](../interfaces/Cell.md) |
| `rowKey` | `string`                        |

#### Returns

[`CellType`](../interfaces/CellType.md)

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[newCell](../interfaces/ColumnType.md#newcell)

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:103](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L103)

---

### <a id="persistence" name="persistence"></a> persistence

▸ **persistence**(): [`Column`](../interfaces/Column.md) & { `findKey`: [`FindKey`](../interfaces/FindKey.md) }

#### Returns

[`Column`](../interfaces/Column.md) & { `findKey`: [`FindKey`](../interfaces/FindKey.md) }

#### Defined in

[packages/brickdoc-formula/src/controls/column.ts:64](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/column.ts#L64)
