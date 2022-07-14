# Class: SpreadsheetClass

## Implements

- [`SpreadsheetType`](../interfaces/SpreadsheetType.md)

## Table of contents

### Constructors

- [constructor](SpreadsheetClass.md#constructor)

### Properties

- [\_columns](SpreadsheetClass.md#_columns)
- [\_formulaContext](SpreadsheetClass.md#_formulacontext)
- [\_name](SpreadsheetClass.md#_name)
- [\_rows](SpreadsheetClass.md#_rows)
- [dynamic](SpreadsheetClass.md#dynamic)
- [eventListeners](SpreadsheetClass.md#eventlisteners)
- [getCell](SpreadsheetClass.md#getcell)
- [name](SpreadsheetClass.md#name)
- [namespaceId](SpreadsheetClass.md#namespaceid)
- [persistence](SpreadsheetClass.md#persistence)
- [spreadsheetId](SpreadsheetClass.md#spreadsheetid)

### Methods

- [cleanup](SpreadsheetClass.md#cleanup)
- [columnCount](SpreadsheetClass.md#columncount)
- [eventDependency](SpreadsheetClass.md#eventdependency)
- [findCellDisplayData](SpreadsheetClass.md#findcelldisplaydata)
- [findCellValue](SpreadsheetClass.md#findcellvalue)
- [findColumn](SpreadsheetClass.md#findcolumn)
- [findRow](SpreadsheetClass.md#findrow)
- [handleCodeFragments](SpreadsheetClass.md#handlecodefragments)
- [handleCodeFragmentsColumn](SpreadsheetClass.md#handlecodefragmentscolumn)
- [handleCodeFragmentsRow](SpreadsheetClass.md#handlecodefragmentsrow)
- [handleInterpret](SpreadsheetClass.md#handleinterpret)
- [handleInterpretColumn](SpreadsheetClass.md#handleinterpretcolumn)
- [handleInterpretRow](SpreadsheetClass.md#handleinterpretrow)
- [listCells](SpreadsheetClass.md#listcells)
- [listColumns](SpreadsheetClass.md#listcolumns)
- [listRows](SpreadsheetClass.md#listrows)
- [nameDependency](SpreadsheetClass.md#namedependency)
- [namespaceName](SpreadsheetClass.md#namespacename)
- [persistAll](SpreadsheetClass.md#persistall)
- [persistDynamic](SpreadsheetClass.md#persistdynamic)
- [rowCount](SpreadsheetClass.md#rowcount)
- [toArray](SpreadsheetClass.md#toarray)
- [toRecord](SpreadsheetClass.md#torecord)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new SpreadsheetClass**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`SpreadsheetInitializer`](../interfaces/SpreadsheetInitializer.md) |

## Properties

### <a id="_columns" name="_columns"></a> \_columns

• **\_columns**: [`Column`](../interfaces/Column.md)[]

#### Defined in

[packages/formula/src/controls/spreadsheet.ts:69](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/spreadsheet.ts#L69)

___

### <a id="_formulacontext" name="_formulacontext"></a> \_formulaContext

• **\_formulaContext**: [`ContextInterface`](../interfaces/ContextInterface.md)

#### Defined in

[packages/formula/src/controls/spreadsheet.ts:50](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/spreadsheet.ts#L50)

___

### <a id="_name" name="_name"></a> \_name

• **\_name**: `string`

#### Defined in

[packages/formula/src/controls/spreadsheet.ts:55](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/spreadsheet.ts#L55)

___

### <a id="_rows" name="_rows"></a> \_rows

• **\_rows**: [`Row`](../interfaces/Row.md)[]

#### Defined in

[packages/formula/src/controls/spreadsheet.ts:70](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/spreadsheet.ts#L70)

___

### <a id="dynamic" name="dynamic"></a> dynamic

• **dynamic**: `boolean`

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[dynamic](../interfaces/SpreadsheetType.md#dynamic)

#### Defined in

[packages/formula/src/controls/spreadsheet.ts:53](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/spreadsheet.ts#L53)

___

### <a id="eventlisteners" name="eventlisteners"></a> eventListeners

• **eventListeners**: `EventSubscribed`[] = `[]`

#### Defined in

[packages/formula/src/controls/spreadsheet.ts:71](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/spreadsheet.ts#L71)

___

### <a id="getcell" name="getcell"></a> getCell

• **getCell**: (`__namedParameters`: { `columnId`: `string` ; `columnIndex`: `number` ; `rowId`: `string` ; `rowIndex`: `number`  }) => [`Cell`](../interfaces/Cell.md)

#### Type declaration

▸ (`__namedParameters`): [`Cell`](../interfaces/Cell.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.columnId` | `string` |
| `__namedParameters.columnIndex` | `number` |
| `__namedParameters.rowId` | `string` |
| `__namedParameters.rowIndex` | `number` |

##### Returns

[`Cell`](../interfaces/Cell.md)

#### Defined in

[packages/formula/src/controls/spreadsheet.ts:57](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/spreadsheet.ts#L57)

___

### <a id="name" name="name"></a> name

• **name**: () => `string`

#### Type declaration

▸ (): `string`

##### Returns

`string`

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[name](../interfaces/SpreadsheetType.md#name)

#### Defined in

[packages/formula/src/controls/spreadsheet.ts:56](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/spreadsheet.ts#L56)

___

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• **namespaceId**: `string`

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[namespaceId](../interfaces/SpreadsheetType.md#namespaceid)

#### Defined in

[packages/formula/src/controls/spreadsheet.ts:52](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/spreadsheet.ts#L52)

___

### <a id="persistence" name="persistence"></a> persistence

• `Optional` **persistence**: [`SpreadsheetDynamicPersistence`](../interfaces/SpreadsheetDynamicPersistence.md)

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[persistence](../interfaces/SpreadsheetType.md#persistence)

#### Defined in

[packages/formula/src/controls/spreadsheet.ts:54](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/spreadsheet.ts#L54)

___

### <a id="spreadsheetid" name="spreadsheetid"></a> spreadsheetId

• **spreadsheetId**: `string`

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[spreadsheetId](../interfaces/SpreadsheetType.md#spreadsheetid)

#### Defined in

[packages/formula/src/controls/spreadsheet.ts:51](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/spreadsheet.ts#L51)

## Methods

### <a id="cleanup" name="cleanup"></a> cleanup

▸ **cleanup**(): `void`

#### Returns

`void`

#### Implementation of

SpreadsheetType.cleanup

___

### <a id="columncount" name="columncount"></a> columnCount

▸ **columnCount**(): `number`

#### Returns

`number`

#### Implementation of

SpreadsheetType.columnCount

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

SpreadsheetType.eventDependency

___

### <a id="findcelldisplaydata" name="findcelldisplaydata"></a> findCellDisplayData

▸ **findCellDisplayData**(`__namedParameters`): `undefined` \| [`VariableDisplayData`](../interfaces/VariableDisplayData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.columnId` | `string` |
| `__namedParameters.rowId` | `string` |

#### Returns

`undefined` \| [`VariableDisplayData`](../interfaces/VariableDisplayData.md)

#### Implementation of

SpreadsheetType.findCellDisplayData

___

### <a id="findcellvalue" name="findcellvalue"></a> findCellValue

▸ **findCellValue**(`__namedParameters`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.columnId` | `string` |
| `__namedParameters.rowId` | `string` |

#### Returns

`undefined` \| `string`

#### Implementation of

SpreadsheetType.findCellValue

___

### <a id="findcolumn" name="findcolumn"></a> findColumn

▸ **findColumn**(`key`): `undefined` \| [`ColumnType`](../interfaces/ColumnType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | [`FindKey`](../interfaces/FindKey.md) |

#### Returns

`undefined` \| [`ColumnType`](../interfaces/ColumnType.md)

#### Implementation of

SpreadsheetType.findColumn

___

### <a id="findrow" name="findrow"></a> findRow

▸ **findRow**(`key`): `undefined` \| [`RowType`](../interfaces/RowType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | [`FindKey`](../interfaces/FindKey.md) |

#### Returns

`undefined` \| [`RowType`](../interfaces/RowType.md)

#### Implementation of

SpreadsheetType.findRow

___

### <a id="handlecodefragments" name="handlecodefragments"></a> handleCodeFragments

▸ **handleCodeFragments**(`visitor`, `name`, `codeFragments`): [`handleCodeFragmentsResult`](../interfaces/handleCodeFragmentsResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `visitor` | [`CodeFragmentVisitor`](CodeFragmentVisitor.md) |
| `name` | `string` |
| `codeFragments` | [`CodeFragment`](../README.md#codefragment)[] |

#### Returns

[`handleCodeFragmentsResult`](../interfaces/handleCodeFragmentsResult.md)

#### Implementation of

SpreadsheetType.handleCodeFragments

___

### <a id="handlecodefragmentscolumn" name="handlecodefragmentscolumn"></a> handleCodeFragmentsColumn

▸ `Private` **handleCodeFragmentsColumn**(`visitor`, `name`, `codeFragments`): [`handleCodeFragmentsResult`](../interfaces/handleCodeFragmentsResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `visitor` | [`CodeFragmentVisitor`](CodeFragmentVisitor.md) |
| `name` | `string` |
| `codeFragments` | [`CodeFragment`](../README.md#codefragment)[] |

#### Returns

[`handleCodeFragmentsResult`](../interfaces/handleCodeFragmentsResult.md)

___

### <a id="handlecodefragmentsrow" name="handlecodefragmentsrow"></a> handleCodeFragmentsRow

▸ `Private` **handleCodeFragmentsRow**(`visitor`, `number`, `codeFragments`): [`handleCodeFragmentsResult`](../interfaces/handleCodeFragmentsResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `visitor` | [`CodeFragmentVisitor`](CodeFragmentVisitor.md) |
| `number` | `number` |
| `codeFragments` | [`CodeFragment`](../README.md#codefragment)[] |

#### Returns

[`handleCodeFragmentsResult`](../interfaces/handleCodeFragmentsResult.md)

___

### <a id="handleinterpret" name="handleinterpret"></a> handleInterpret

▸ **handleInterpret**(`interpreter`, `name`): `Promise`<`Omit`<`FormulaRecordType`, ``"dump"``\> \| `Omit`<`FormulaErrorType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"string"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: ``"number"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: ``"boolean"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"null"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](../interfaces/BlockType.md) ; `type`: ``"Block"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](../interfaces/ButtonType.md) ; `type`: ``"Button"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](../interfaces/SwitchType.md) ; `type`: ``"Switch"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: ``"Date"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``"Blank"`` ; `result`: ``"Blank"`` ; `type`: ``"Blank"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaArrayType`, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](../interfaces/SpreadsheetType.md) ; `type`: ``"Spreadsheet"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`RowType`](../interfaces/RowType.md) ; `type`: ``"Row"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](../README.md#cellvia), [`Cell`](../interfaces/Cell.md)] ; `result`: [`CellType`](../interfaces/CellType.md) ; `type`: ``"Cell"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`ColumnType`](../interfaces/ColumnType.md) ; `type`: ``"Column"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](../interfaces/RangeType.md) ; `type`: ``"Range"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: ``"Cst"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: ``"Reference"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: ``"Function"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaPredicateType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"literal"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Pending"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Waiting"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"NoPersist"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `interpreter` | [`FormulaInterpreter`](FormulaInterpreter.md) |
| `name` | `string` |

#### Returns

`Promise`<`Omit`<`FormulaRecordType`, ``"dump"``\> \| `Omit`<`FormulaErrorType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"string"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: ``"number"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: ``"boolean"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"null"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](../interfaces/BlockType.md) ; `type`: ``"Block"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](../interfaces/ButtonType.md) ; `type`: ``"Button"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](../interfaces/SwitchType.md) ; `type`: ``"Switch"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: ``"Date"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``"Blank"`` ; `result`: ``"Blank"`` ; `type`: ``"Blank"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaArrayType`, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](../interfaces/SpreadsheetType.md) ; `type`: ``"Spreadsheet"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`RowType`](../interfaces/RowType.md) ; `type`: ``"Row"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](../README.md#cellvia), [`Cell`](../interfaces/Cell.md)] ; `result`: [`CellType`](../interfaces/CellType.md) ; `type`: ``"Cell"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`ColumnType`](../interfaces/ColumnType.md) ; `type`: ``"Column"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](../interfaces/RangeType.md) ; `type`: ``"Range"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: ``"Cst"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: ``"Reference"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: ``"Function"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaPredicateType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"literal"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Pending"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Waiting"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"NoPersist"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\>\>

#### Implementation of

SpreadsheetType.handleInterpret

___

### <a id="handleinterpretcolumn" name="handleinterpretcolumn"></a> handleInterpretColumn

▸ `Private` **handleInterpretColumn**(`interpreter`, `name`): `Omit`<`FormulaRecordType`, ``"dump"``\> \| `Omit`<`FormulaErrorType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"string"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: ``"number"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: ``"boolean"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"null"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](../interfaces/BlockType.md) ; `type`: ``"Block"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](../interfaces/ButtonType.md) ; `type`: ``"Button"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](../interfaces/SwitchType.md) ; `type`: ``"Switch"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: ``"Date"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``"Blank"`` ; `result`: ``"Blank"`` ; `type`: ``"Blank"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaArrayType`, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](../interfaces/SpreadsheetType.md) ; `type`: ``"Spreadsheet"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`RowType`](../interfaces/RowType.md) ; `type`: ``"Row"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](../README.md#cellvia), [`Cell`](../interfaces/Cell.md)] ; `result`: [`CellType`](../interfaces/CellType.md) ; `type`: ``"Cell"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`ColumnType`](../interfaces/ColumnType.md) ; `type`: ``"Column"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](../interfaces/RangeType.md) ; `type`: ``"Range"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: ``"Cst"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: ``"Reference"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: ``"Function"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaPredicateType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"literal"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Pending"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Waiting"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"NoPersist"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `interpreter` | [`FormulaInterpreter`](FormulaInterpreter.md) |
| `name` | `string` |

#### Returns

`Omit`<`FormulaRecordType`, ``"dump"``\> \| `Omit`<`FormulaErrorType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"string"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: ``"number"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: ``"boolean"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"null"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](../interfaces/BlockType.md) ; `type`: ``"Block"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](../interfaces/ButtonType.md) ; `type`: ``"Button"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](../interfaces/SwitchType.md) ; `type`: ``"Switch"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: ``"Date"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``"Blank"`` ; `result`: ``"Blank"`` ; `type`: ``"Blank"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaArrayType`, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](../interfaces/SpreadsheetType.md) ; `type`: ``"Spreadsheet"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`RowType`](../interfaces/RowType.md) ; `type`: ``"Row"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](../README.md#cellvia), [`Cell`](../interfaces/Cell.md)] ; `result`: [`CellType`](../interfaces/CellType.md) ; `type`: ``"Cell"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`ColumnType`](../interfaces/ColumnType.md) ; `type`: ``"Column"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](../interfaces/RangeType.md) ; `type`: ``"Range"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: ``"Cst"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: ``"Reference"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: ``"Function"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaPredicateType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"literal"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Pending"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Waiting"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"NoPersist"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\>

___

### <a id="handleinterpretrow" name="handleinterpretrow"></a> handleInterpretRow

▸ `Private` **handleInterpretRow**(`number`): `Omit`<`FormulaRecordType`, ``"dump"``\> \| `Omit`<`FormulaErrorType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"string"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: ``"number"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: ``"boolean"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"null"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](../interfaces/BlockType.md) ; `type`: ``"Block"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](../interfaces/ButtonType.md) ; `type`: ``"Button"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](../interfaces/SwitchType.md) ; `type`: ``"Switch"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: ``"Date"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``"Blank"`` ; `result`: ``"Blank"`` ; `type`: ``"Blank"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaArrayType`, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](../interfaces/SpreadsheetType.md) ; `type`: ``"Spreadsheet"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`RowType`](../interfaces/RowType.md) ; `type`: ``"Row"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](../README.md#cellvia), [`Cell`](../interfaces/Cell.md)] ; `result`: [`CellType`](../interfaces/CellType.md) ; `type`: ``"Cell"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`ColumnType`](../interfaces/ColumnType.md) ; `type`: ``"Column"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](../interfaces/RangeType.md) ; `type`: ``"Range"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: ``"Cst"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: ``"Reference"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: ``"Function"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaPredicateType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"literal"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Pending"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Waiting"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"NoPersist"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `number` | `number` |

#### Returns

`Omit`<`FormulaRecordType`, ``"dump"``\> \| `Omit`<`FormulaErrorType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"string"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: ``"number"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: ``"boolean"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"null"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](../interfaces/BlockType.md) ; `type`: ``"Block"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](../interfaces/ButtonType.md) ; `type`: ``"Button"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](../interfaces/SwitchType.md) ; `type`: ``"Switch"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: ``"Date"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``"Blank"`` ; `result`: ``"Blank"`` ; `type`: ``"Blank"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaArrayType`, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](../interfaces/SpreadsheetType.md) ; `type`: ``"Spreadsheet"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`RowType`](../interfaces/RowType.md) ; `type`: ``"Row"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](../README.md#cellvia), [`Cell`](../interfaces/Cell.md)] ; `result`: [`CellType`](../interfaces/CellType.md) ; `type`: ``"Cell"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`ColumnType`](../interfaces/ColumnType.md) ; `type`: ``"Column"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](../interfaces/RangeType.md) ; `type`: ``"Range"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: ``"Cst"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: ``"Reference"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: ``"Function"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaPredicateType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"literal"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Pending"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Waiting"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"NoPersist"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\>

___

### <a id="listcells" name="listcells"></a> listCells

▸ **listCells**(`__namedParameters`): [`Cell`](../interfaces/Cell.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.columnId?` | `string` |
| `__namedParameters.rowId?` | `string` |

#### Returns

[`Cell`](../interfaces/Cell.md)[]

#### Implementation of

SpreadsheetType.listCells

___

### <a id="listcolumns" name="listcolumns"></a> listColumns

▸ **listColumns**(): [`Column`](../interfaces/Column.md)[]

#### Returns

[`Column`](../interfaces/Column.md)[]

#### Implementation of

SpreadsheetType.listColumns

___

### <a id="listrows" name="listrows"></a> listRows

▸ **listRows**(): [`Row`](../interfaces/Row.md)[]

#### Returns

[`Row`](../interfaces/Row.md)[]

#### Implementation of

SpreadsheetType.listRows

___

### <a id="namedependency" name="namedependency"></a> nameDependency

▸ **nameDependency**(): [`NameDependencyWithKind`](../interfaces/NameDependencyWithKind.md)

#### Returns

[`NameDependencyWithKind`](../interfaces/NameDependencyWithKind.md)

#### Implementation of

SpreadsheetType.nameDependency

___

### <a id="namespacename" name="namespacename"></a> namespaceName

▸ **namespaceName**(`pageId`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pageId` | `string` |

#### Returns

`string`

#### Implementation of

SpreadsheetType.namespaceName

___

### <a id="persistall" name="persistall"></a> persistAll

▸ **persistAll**(): [`SpreadsheetAllPersistence`](../interfaces/SpreadsheetAllPersistence.md)

#### Returns

[`SpreadsheetAllPersistence`](../interfaces/SpreadsheetAllPersistence.md)

#### Implementation of

SpreadsheetType.persistAll

___

### <a id="persistdynamic" name="persistdynamic"></a> persistDynamic

▸ **persistDynamic**(): [`SpreadsheetDynamicPersistence`](../interfaces/SpreadsheetDynamicPersistence.md)

#### Returns

[`SpreadsheetDynamicPersistence`](../interfaces/SpreadsheetDynamicPersistence.md)

___

### <a id="rowcount" name="rowcount"></a> rowCount

▸ **rowCount**(): `number`

#### Returns

`number`

#### Implementation of

SpreadsheetType.rowCount

___

### <a id="toarray" name="toarray"></a> toArray

▸ **toArray**(): `string`[][]

#### Returns

`string`[][]

#### Implementation of

SpreadsheetType.toArray

___

### <a id="torecord" name="torecord"></a> toRecord

▸ **toRecord**(): `Record`<`string`, `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"string"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\>\>[]

#### Returns

`Record`<`string`, `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"string"`` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\>  }, ``"dump"``\>\>[]

#### Implementation of

SpreadsheetType.toRecord
