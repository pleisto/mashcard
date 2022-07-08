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

| Name | Type |
| :------ | :------ |
| `spreadsheet` | [`SpreadsheetType`](../interfaces/SpreadsheetType.md) |
| `__namedParameters` | [`Column`](../interfaces/Column.md) |
| `logic` | `boolean` |
| `findKey` | [`FindKey`](../interfaces/FindKey.md) |

## Properties

### <a id="columnid" name="columnid"></a> columnId

• **columnId**: `string`

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[columnId](../interfaces/ColumnType.md#columnid)

#### Defined in

[packages/formula/src/controls/column.ts:19](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/column.ts#L19)

___

### <a id="displayindex" name="displayindex"></a> displayIndex

• **displayIndex**: `string`

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[displayIndex](../interfaces/ColumnType.md#displayindex)

#### Defined in

[packages/formula/src/controls/column.ts:27](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/column.ts#L27)

___

### <a id="findkey" name="findkey"></a> findKey

• **findKey**: [`FindKey`](../interfaces/FindKey.md)

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[findKey](../interfaces/ColumnType.md#findkey)

#### Defined in

[packages/formula/src/controls/column.ts:23](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/column.ts#L23)

___

### <a id="index" name="index"></a> index

• **index**: `number`

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[index](../interfaces/ColumnType.md#index)

#### Defined in

[packages/formula/src/controls/column.ts:24](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/column.ts#L24)

___

### <a id="logic" name="logic"></a> logic

• **logic**: `boolean`

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[logic](../interfaces/ColumnType.md#logic)

#### Defined in

[packages/formula/src/controls/column.ts:29](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/column.ts#L29)

___

### <a id="name" name="name"></a> name

• **name**: `string`

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[name](../interfaces/ColumnType.md#name)

#### Defined in

[packages/formula/src/controls/column.ts:20](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/column.ts#L20)

___

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• **namespaceId**: `string`

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[namespaceId](../interfaces/ColumnType.md#namespaceid)

#### Defined in

[packages/formula/src/controls/column.ts:21](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/column.ts#L21)

___

### <a id="sort" name="sort"></a> sort

• **sort**: `number`

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[sort](../interfaces/ColumnType.md#sort)

#### Defined in

[packages/formula/src/controls/column.ts:25](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/column.ts#L25)

___

### <a id="spreadsheet" name="spreadsheet"></a> spreadsheet

• **spreadsheet**: [`SpreadsheetType`](../interfaces/SpreadsheetType.md)

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[spreadsheet](../interfaces/ColumnType.md#spreadsheet)

#### Defined in

[packages/formula/src/controls/column.ts:28](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/column.ts#L28)

___

### <a id="spreadsheetid" name="spreadsheetid"></a> spreadsheetId

• **spreadsheetId**: `string`

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[spreadsheetId](../interfaces/ColumnType.md#spreadsheetid)

#### Defined in

[packages/formula/src/controls/column.ts:22](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/column.ts#L22)

___

### <a id="title" name="title"></a> title

• **title**: `undefined` \| `string`

#### Implementation of

[ColumnType](../interfaces/ColumnType.md).[title](../interfaces/ColumnType.md#title)

#### Defined in

[packages/formula/src/controls/column.ts:26](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/column.ts#L26)

## Methods

### <a id="cells" name="cells"></a> cells

▸ **cells**(): [`Cell`](../interfaces/Cell.md)[]

#### Returns

[`Cell`](../interfaces/Cell.md)[]

#### Implementation of

ColumnType.cells

___

### <a id="display" name="display"></a> display

▸ **display**(): `string`

#### Returns

`string`

#### Implementation of

ColumnType.display

___

### <a id="eventdependency" name="eventdependency"></a> eventDependency

▸ **eventDependency**(`__namedParameters`): [`EventDependency`](../interfaces/EventDependency.md)<[`SpreadsheetUpdateNamePayload`](../README.md#spreadsheetupdatenamepayload)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`getEventDependencyInput`](../README.md#geteventdependencyinput) |

#### Returns

[`EventDependency`](../interfaces/EventDependency.md)<[`SpreadsheetUpdateNamePayload`](../README.md#spreadsheetupdatenamepayload)\>

#### Implementation of

ColumnType.eventDependency

___

### <a id="findcellbynumber" name="findcellbynumber"></a> findCellByNumber

▸ `Private` **findCellByNumber**(`meta`, `name`): `Omit`<`FormulaErrorType`, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](../README.md#cellvia), [`Cell`](../interfaces/Cell.md)] ; `result`: [`CellType`](../interfaces/CellType.md) ; `type`: ``"Cell"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `meta` | [`VariableMetadata`](../interfaces/VariableMetadata.md) |
| `name` | `string` |

#### Returns

`Omit`<`FormulaErrorType`, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](../README.md#cellvia), [`Cell`](../interfaces/Cell.md)] ; `result`: [`CellType`](../interfaces/CellType.md) ; `type`: ``"Cell"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\>

___

### <a id="handlecodefragments" name="handlecodefragments"></a> handleCodeFragments

▸ **handleCodeFragments**(`visitor`, `name`, `codeFragments`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `visitor` | [`CodeFragmentVisitor`](CodeFragmentVisitor.md) |
| `name` | `string` |
| `codeFragments` | [`CodeFragment`](../README.md#codefragment)[] |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `codeFragments` | [`CodeFragment`](../README.md#codefragment)[] |
| `errors` | [`ErrorMessage`](../interfaces/ErrorMessage.md)[] |
| `firstArgumentType` | `undefined` \| ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Block"`` \| ``"Date"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"`` \| ``"any"`` \| ``"void"`` |

#### Implementation of

ColumnType.handleCodeFragments

___

### <a id="handleinterpret" name="handleinterpret"></a> handleInterpret

▸ **handleInterpret**(`interpreter`, `name`): `Promise`<`Omit`<`FormulaRecordType`, ``"dump"``\> \| `Omit`<`FormulaErrorType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"string"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: ``"number"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: ``"boolean"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"null"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](../interfaces/BlockType.md) ; `type`: ``"Block"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: ``"Date"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``"#N/A"`` ; `result`: ``"Blank"`` ; `type`: ``"Blank"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaArrayType`, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](../interfaces/SpreadsheetType.md) ; `type`: ``"Spreadsheet"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`RowType`](../interfaces/RowType.md) ; `type`: ``"Row"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](../README.md#cellvia), [`Cell`](../interfaces/Cell.md)] ; `result`: [`CellType`](../interfaces/CellType.md) ; `type`: ``"Cell"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`ColumnType`](../interfaces/ColumnType.md) ; `type`: ``"Column"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](../interfaces/RangeType.md) ; `type`: ``"Range"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: ``"Cst"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: ``"Reference"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: ``"Function"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaPredicateType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](../interfaces/ButtonType.md) ; `type`: ``"Button"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](../interfaces/SwitchType.md) ; `type`: ``"Switch"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"literal"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Pending"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Waiting"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"NoPersist"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `interpreter` | [`FormulaInterpreter`](FormulaInterpreter.md) |
| `name` | `string` |

#### Returns

`Promise`<`Omit`<`FormulaRecordType`, ``"dump"``\> \| `Omit`<`FormulaErrorType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"string"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: ``"number"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: ``"boolean"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"null"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](../interfaces/BlockType.md) ; `type`: ``"Block"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: ``"Date"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``"#N/A"`` ; `result`: ``"Blank"`` ; `type`: ``"Blank"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaArrayType`, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](../interfaces/SpreadsheetType.md) ; `type`: ``"Spreadsheet"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`RowType`](../interfaces/RowType.md) ; `type`: ``"Row"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](../README.md#cellvia), [`Cell`](../interfaces/Cell.md)] ; `result`: [`CellType`](../interfaces/CellType.md) ; `type`: ``"Cell"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`ColumnType`](../interfaces/ColumnType.md) ; `type`: ``"Column"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](../interfaces/RangeType.md) ; `type`: ``"Range"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: ``"Cst"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: ``"Reference"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: ``"Function"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaPredicateType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](../interfaces/ButtonType.md) ; `type`: ``"Button"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](../interfaces/SwitchType.md) ; `type`: ``"Switch"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"literal"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Pending"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Waiting"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"NoPersist"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\>\>

#### Implementation of

ColumnType.handleInterpret

___

### <a id="key" name="key"></a> key

▸ **key**(): `string`

#### Returns

`string`

#### Implementation of

ColumnType.key

___

### <a id="newcell" name="newcell"></a> newCell

▸ **newCell**(`cell`, `rowKey`): [`CellType`](../interfaces/CellType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cell` | [`Cell`](../interfaces/Cell.md) |
| `rowKey` | `string` |

#### Returns

[`CellType`](../interfaces/CellType.md)

#### Implementation of

ColumnType.newCell

___

### <a id="persistence" name="persistence"></a> persistence

▸ **persistence**(): [`Column`](../interfaces/Column.md) & { `findKey`: [`FindKey`](../interfaces/FindKey.md)  }

#### Returns

[`Column`](../interfaces/Column.md) & { `findKey`: [`FindKey`](../interfaces/FindKey.md)  }
