# Class: RowClass

## Implements

- [`RowType`](../interfaces/RowType.md)

## Table of contents

### Constructors

- [constructor](RowClass.md#constructor)

### Properties

- [findKey](RowClass.md#findkey)
- [listCells](RowClass.md#listcells)
- [logic](RowClass.md#logic)
- [namespaceId](RowClass.md#namespaceid)
- [rowId](RowClass.md#rowid)
- [rowIndex](RowClass.md#rowindex)
- [spreadsheet](RowClass.md#spreadsheet)
- [spreadsheetId](RowClass.md#spreadsheetid)

### Methods

- [display](RowClass.md#display)
- [eventDependency](RowClass.md#eventdependency)
- [handleCodeFragments](RowClass.md#handlecodefragments)
- [handleInterpret](RowClass.md#handleinterpret)
- [key](RowClass.md#key)
- [newCell](RowClass.md#newcell)
- [persistence](RowClass.md#persistence)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new RowClass**(`spreadsheet`, `__namedParameters`, `logic`, `findKey`)

#### Parameters

| Name                | Type                                                  |
| :------------------ | :---------------------------------------------------- |
| `spreadsheet`       | [`SpreadsheetType`](../interfaces/SpreadsheetType.md) |
| `__namedParameters` | [`Row`](../interfaces/Row.md)                         |
| `logic`             | `boolean`                                             |
| `findKey`           | [`FindKey`](../interfaces/FindKey.md)                 |

#### Defined in

[packages/formula/src/controls/row.ts:27](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/row.ts#L27)

## Properties

### <a id="findkey" name="findkey"></a> findKey

• **findKey**: [`FindKey`](../interfaces/FindKey.md)

#### Implementation of

[RowType](../interfaces/RowType.md).[findKey](../interfaces/RowType.md#findkey)

#### Defined in

[packages/formula/src/controls/row.ts:23](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/row.ts#L23)

---

### <a id="listcells" name="listcells"></a> listCells

• **listCells**: () => [`Cell`](../interfaces/Cell.md)[]

#### Type declaration

▸ (): [`Cell`](../interfaces/Cell.md)[]

##### Returns

[`Cell`](../interfaces/Cell.md)[]

#### Implementation of

[RowType](../interfaces/RowType.md).[listCells](../interfaces/RowType.md#listcells)

#### Defined in

[packages/formula/src/controls/row.ts:46](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/row.ts#L46)

---

### <a id="logic" name="logic"></a> logic

• **logic**: `boolean`

#### Implementation of

[RowType](../interfaces/RowType.md).[logic](../interfaces/RowType.md#logic)

#### Defined in

[packages/formula/src/controls/row.ts:25](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/row.ts#L25)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• **namespaceId**: `string`

#### Implementation of

[RowType](../interfaces/RowType.md).[namespaceId](../interfaces/RowType.md#namespaceid)

#### Defined in

[packages/formula/src/controls/row.ts:20](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/row.ts#L20)

---

### <a id="rowid" name="rowid"></a> rowId

• **rowId**: `string`

#### Implementation of

[RowType](../interfaces/RowType.md).[rowId](../interfaces/RowType.md#rowid)

#### Defined in

[packages/formula/src/controls/row.ts:21](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/row.ts#L21)

---

### <a id="rowindex" name="rowindex"></a> rowIndex

• **rowIndex**: `number`

#### Implementation of

[RowType](../interfaces/RowType.md).[rowIndex](../interfaces/RowType.md#rowindex)

#### Defined in

[packages/formula/src/controls/row.ts:22](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/row.ts#L22)

---

### <a id="spreadsheet" name="spreadsheet"></a> spreadsheet

• **spreadsheet**: [`SpreadsheetType`](../interfaces/SpreadsheetType.md)

#### Implementation of

[RowType](../interfaces/RowType.md).[spreadsheet](../interfaces/RowType.md#spreadsheet)

#### Defined in

[packages/formula/src/controls/row.ts:24](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/row.ts#L24)

---

### <a id="spreadsheetid" name="spreadsheetid"></a> spreadsheetId

• **spreadsheetId**: `string`

#### Implementation of

[RowType](../interfaces/RowType.md).[spreadsheetId](../interfaces/RowType.md#spreadsheetid)

#### Defined in

[packages/formula/src/controls/row.ts:19](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/row.ts#L19)

## Methods

### <a id="display" name="display"></a> display

▸ **display**(): `string`

#### Returns

`string`

#### Implementation of

RowType.display

#### Defined in

[packages/formula/src/controls/row.ts:38](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/row.ts#L38)

---

### <a id="eventdependency" name="eventdependency"></a> eventDependency

▸ **eventDependency**(`__namedParameters`): [`EventDependency`](../interfaces/EventDependency.md)<[`SpreadsheetUpdateNamePayload`](../README.md#spreadsheetupdatenamepayload)\>

#### Parameters

| Name                | Type                                                              |
| :------------------ | :---------------------------------------------------------------- |
| `__namedParameters` | [`getEventDependencyInput`](../README.md#geteventdependencyinput) |

#### Returns

[`EventDependency`](../interfaces/EventDependency.md)<[`SpreadsheetUpdateNamePayload`](../README.md#spreadsheetupdatenamepayload)\>

#### Implementation of

RowType.eventDependency

#### Defined in

[packages/formula/src/controls/row.ts:59](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/row.ts#L59)

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
| `firstArgumentType` | `undefined` \| `"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Button"` \| `"Switch"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"` \| `"void"` |

#### Implementation of

RowType.handleCodeFragments

#### Defined in

[packages/formula/src/controls/row.ts:106](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/row.ts#L106)

---

### <a id="handleinterpret" name="handleinterpret"></a> handleInterpret

▸ **handleInterpret**(`interpreter`, `name`): `Promise`<`Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](../interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](../interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](../interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](../interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](../interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](../interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`RowType`](../interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](../README.md#cellvia), [`Cell`](../interfaces/Cell.md)] ; `result`: [`CellType`](../interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`ColumnType`](../interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](../interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\>\>

#### Parameters

| Name          | Type                                          |
| :------------ | :-------------------------------------------- |
| `interpreter` | [`FormulaInterpreter`](FormulaInterpreter.md) |
| `name`        | `string`                                      |

#### Returns

`Promise`<`Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](../interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](../interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](../interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](../interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](../interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](../interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`RowType`](../interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](../README.md#cellvia), [`Cell`](../interfaces/Cell.md)] ; `result`: [`CellType`](../interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`ColumnType`](../interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](../interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\>\>

#### Implementation of

RowType.handleInterpret

#### Defined in

[packages/formula/src/controls/row.ts:74](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/row.ts#L74)

---

### <a id="key" name="key"></a> key

▸ **key**(): `string`

#### Returns

`string`

#### Implementation of

RowType.key

#### Defined in

[packages/formula/src/controls/row.ts:42](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/row.ts#L42)

---

### <a id="newcell" name="newcell"></a> newCell

▸ **newCell**(`cell`, `columnKey`): [`CellType`](../interfaces/CellType.md)

#### Parameters

| Name        | Type                            |
| :---------- | :------------------------------ |
| `cell`      | [`Cell`](../interfaces/Cell.md) |
| `columnKey` | `string`                        |

#### Returns

[`CellType`](../interfaces/CellType.md)

#### Implementation of

RowType.newCell

#### Defined in

[packages/formula/src/controls/row.ts:98](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/row.ts#L98)

---

### <a id="persistence" name="persistence"></a> persistence

▸ **persistence**(): [`Row`](../interfaces/Row.md) & { `findKey`: [`FindKey`](../interfaces/FindKey.md) }

#### Returns

[`Row`](../interfaces/Row.md) & { `findKey`: [`FindKey`](../interfaces/FindKey.md) }

#### Defined in

[packages/formula/src/controls/row.ts:50](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/row.ts#L50)
