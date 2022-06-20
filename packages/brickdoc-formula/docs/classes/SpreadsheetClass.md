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

| Name                | Type                                                                |
| :------------------ | :------------------------------------------------------------------ |
| `__namedParameters` | [`SpreadsheetInitializer`](../interfaces/SpreadsheetInitializer.md) |

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:72](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L72)

## Properties

### <a id="_columns" name="_columns"></a> \_columns

• **\_columns**: [`Column`](../interfaces/Column.md)[]

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:68](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L68)

---

### <a id="_formulacontext" name="_formulacontext"></a> \_formulaContext

• **\_formulaContext**: [`ContextInterface`](../interfaces/ContextInterface.md)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:49](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L49)

---

### <a id="_name" name="_name"></a> \_name

• **\_name**: `string`

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:54](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L54)

---

### <a id="_rows" name="_rows"></a> \_rows

• **\_rows**: [`Row`](../interfaces/Row.md)[]

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:69](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L69)

---

### <a id="dynamic" name="dynamic"></a> dynamic

• **dynamic**: `boolean`

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[dynamic](../interfaces/SpreadsheetType.md#dynamic)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:52](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L52)

---

### <a id="eventlisteners" name="eventlisteners"></a> eventListeners

• **eventListeners**: `EventSubscribed`[] = `[]`

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:70](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L70)

---

### <a id="getcell" name="getcell"></a> getCell

• **getCell**: (`__namedParameters`: { `columnId`: `string` ; `columnIndex`: `number` ; `rowId`: `string` ; `rowIndex`: `number` }) => [`Cell`](../interfaces/Cell.md)

#### Type declaration

▸ (`__namedParameters`): [`Cell`](../interfaces/Cell.md)

##### Parameters

| Name                            | Type     |
| :------------------------------ | :------- |
| `__namedParameters`             | `Object` |
| `__namedParameters.columnId`    | `string` |
| `__namedParameters.columnIndex` | `number` |
| `__namedParameters.rowId`       | `string` |
| `__namedParameters.rowIndex`    | `number` |

##### Returns

[`Cell`](../interfaces/Cell.md)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:56](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L56)

---

### <a id="name" name="name"></a> name

• **name**: () => `string`

#### Type declaration

▸ (): `string`

##### Returns

`string`

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[name](../interfaces/SpreadsheetType.md#name)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:55](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L55)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• **namespaceId**: `string`

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[namespaceId](../interfaces/SpreadsheetType.md#namespaceid)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:51](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L51)

---

### <a id="persistence" name="persistence"></a> persistence

• `Optional` **persistence**: [`SpreadsheetDynamicPersistence`](../interfaces/SpreadsheetDynamicPersistence.md)

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[persistence](../interfaces/SpreadsheetType.md#persistence)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:53](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L53)

---

### <a id="spreadsheetid" name="spreadsheetid"></a> spreadsheetId

• **spreadsheetId**: `string`

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[spreadsheetId](../interfaces/SpreadsheetType.md#spreadsheetid)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:50](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L50)

## Methods

### <a id="cleanup" name="cleanup"></a> cleanup

▸ **cleanup**(): `void`

#### Returns

`void`

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[cleanup](../interfaces/SpreadsheetType.md#cleanup)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:205](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L205)

---

### <a id="columncount" name="columncount"></a> columnCount

▸ **columnCount**(): `number`

#### Returns

`number`

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[columnCount](../interfaces/SpreadsheetType.md#columncount)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:385](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L385)

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

SpreadsheetType.eventDependency

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:250](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L250)

---

### <a id="findcelldisplaydata" name="findcelldisplaydata"></a> findCellDisplayData

▸ **findCellDisplayData**(`__namedParameters`): `undefined` \| [`VariableDisplayData`](../interfaces/VariableDisplayData.md)

#### Parameters

| Name                         | Type     |
| :--------------------------- | :------- |
| `__namedParameters`          | `Object` |
| `__namedParameters.columnId` | `string` |
| `__namedParameters.rowId`    | `string` |

#### Returns

`undefined` \| [`VariableDisplayData`](../interfaces/VariableDisplayData.md)

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[findCellDisplayData](../interfaces/SpreadsheetType.md#findcelldisplaydata)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:431](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L431)

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

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[findCellValue](../interfaces/SpreadsheetType.md#findcellvalue)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:422](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L422)

---

### <a id="findcolumn" name="findcolumn"></a> findColumn

▸ **findColumn**(`key`): `undefined` \| [`ColumnType`](../interfaces/ColumnType.md)

#### Parameters

| Name  | Type                                  |
| :---- | :------------------------------------ |
| `key` | [`FindKey`](../interfaces/FindKey.md) |

#### Returns

`undefined` \| [`ColumnType`](../interfaces/ColumnType.md)

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[findColumn](../interfaces/SpreadsheetType.md#findcolumn)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:405](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L405)

---

### <a id="findrow" name="findrow"></a> findRow

▸ **findRow**(`key`): `undefined` \| [`RowType`](../interfaces/RowType.md)

#### Parameters

| Name  | Type                                  |
| :---- | :------------------------------------ |
| `key` | [`FindKey`](../interfaces/FindKey.md) |

#### Returns

`undefined` \| [`RowType`](../interfaces/RowType.md)

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[findRow](../interfaces/SpreadsheetType.md#findrow)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:393](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L393)

---

### <a id="handlecodefragments" name="handlecodefragments"></a> handleCodeFragments

▸ **handleCodeFragments**(`visitor`, `name`, `codeFragments`): [`handleCodeFragmentsResult`](../interfaces/handleCodeFragmentsResult.md)

#### Parameters

| Name            | Type                                            |
| :-------------- | :---------------------------------------------- |
| `visitor`       | [`CodeFragmentVisitor`](CodeFragmentVisitor.md) |
| `name`          | `string`                                        |
| `codeFragments` | [`CodeFragment`](../README.md#codefragment)[]   |

#### Returns

[`handleCodeFragmentsResult`](../interfaces/handleCodeFragmentsResult.md)

#### Implementation of

SpreadsheetType.handleCodeFragments

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:289](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L289)

---

### <a id="handlecodefragmentscolumn" name="handlecodefragmentscolumn"></a> handleCodeFragmentsColumn

▸ `Private` **handleCodeFragmentsColumn**(`visitor`, `name`, `codeFragments`): [`handleCodeFragmentsResult`](../interfaces/handleCodeFragmentsResult.md)

#### Parameters

| Name            | Type                                            |
| :-------------- | :---------------------------------------------- |
| `visitor`       | [`CodeFragmentVisitor`](CodeFragmentVisitor.md) |
| `name`          | `string`                                        |
| `codeFragments` | [`CodeFragment`](../README.md#codefragment)[]   |

#### Returns

[`handleCodeFragmentsResult`](../interfaces/handleCodeFragmentsResult.md)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:331](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L331)

---

### <a id="handlecodefragmentsrow" name="handlecodefragmentsrow"></a> handleCodeFragmentsRow

▸ `Private` **handleCodeFragmentsRow**(`visitor`, `number`, `codeFragments`): [`handleCodeFragmentsResult`](../interfaces/handleCodeFragmentsResult.md)

#### Parameters

| Name            | Type                                            |
| :-------------- | :---------------------------------------------- |
| `visitor`       | [`CodeFragmentVisitor`](CodeFragmentVisitor.md) |
| `number`        | `number`                                        |
| `codeFragments` | [`CodeFragment`](../README.md#codefragment)[]   |

#### Returns

[`handleCodeFragmentsResult`](../interfaces/handleCodeFragmentsResult.md)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:301](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L301)

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

SpreadsheetType.handleInterpret

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:234](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L234)

---

### <a id="handleinterpretcolumn" name="handleinterpretcolumn"></a> handleInterpretColumn

▸ `Private` **handleInterpretColumn**(`interpreter`, `name`): [`AnyResult`](../README.md#anyresult)

#### Parameters

| Name          | Type                                          |
| :------------ | :-------------------------------------------- |
| `interpreter` | [`FormulaInterpreter`](FormulaInterpreter.md) |
| `name`        | `string`                                      |

#### Returns

[`AnyResult`](../README.md#anyresult)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:242](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L242)

---

### <a id="handleinterpretrow" name="handleinterpretrow"></a> handleInterpretRow

▸ `Private` **handleInterpretRow**(`number`): [`AnyResult`](../README.md#anyresult)

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `number` | `number` |

#### Returns

[`AnyResult`](../README.md#anyresult)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:280](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L280)

---

### <a id="listcells" name="listcells"></a> listCells

▸ **listCells**(`__namedParameters`): [`Cell`](../interfaces/Cell.md)[]

#### Parameters

| Name                          | Type     |
| :---------------------------- | :------- |
| `__namedParameters`           | `Object` |
| `__namedParameters.columnId?` | `string` |
| `__namedParameters.rowId?`    | `string` |

#### Returns

[`Cell`](../interfaces/Cell.md)[]

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[listCells](../interfaces/SpreadsheetType.md#listcells)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:192](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L192)

---

### <a id="listcolumns" name="listcolumns"></a> listColumns

▸ **listColumns**(): [`Column`](../interfaces/Column.md)[]

#### Returns

[`Column`](../interfaces/Column.md)[]

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[listColumns](../interfaces/SpreadsheetType.md#listcolumns)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:184](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L184)

---

### <a id="listrows" name="listrows"></a> listRows

▸ **listRows**(): [`Row`](../interfaces/Row.md)[]

#### Returns

[`Row`](../interfaces/Row.md)[]

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[listRows](../interfaces/SpreadsheetType.md#listrows)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:188](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L188)

---

### <a id="namedependency" name="namedependency"></a> nameDependency

▸ **nameDependency**(): [`NameDependencyWithKind`](../interfaces/NameDependencyWithKind.md)

#### Returns

[`NameDependencyWithKind`](../interfaces/NameDependencyWithKind.md)

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[nameDependency](../interfaces/SpreadsheetType.md#namedependency)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:212](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L212)

---

### <a id="namespacename" name="namespacename"></a> namespaceName

▸ **namespaceName**(`pageId`): `string`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `pageId` | `string` |

#### Returns

`string`

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[namespaceName](../interfaces/SpreadsheetType.md#namespacename)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:175](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L175)

---

### <a id="persistall" name="persistall"></a> persistAll

▸ **persistAll**(): [`SpreadsheetAllPersistence`](../interfaces/SpreadsheetAllPersistence.md)

#### Returns

[`SpreadsheetAllPersistence`](../interfaces/SpreadsheetAllPersistence.md)

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[persistAll](../interfaces/SpreadsheetType.md#persistall)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:375](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L375)

---

### <a id="persistdynamic" name="persistdynamic"></a> persistDynamic

▸ **persistDynamic**(): [`SpreadsheetDynamicPersistence`](../interfaces/SpreadsheetDynamicPersistence.md)

#### Returns

[`SpreadsheetDynamicPersistence`](../interfaces/SpreadsheetDynamicPersistence.md)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:364](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L364)

---

### <a id="rowcount" name="rowcount"></a> rowCount

▸ **rowCount**(): `number`

#### Returns

`number`

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[rowCount](../interfaces/SpreadsheetType.md#rowcount)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:389](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L389)

---

### <a id="toarray" name="toarray"></a> toArray

▸ **toArray**(): `string`[][]

#### Returns

`string`[][]

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[toArray](../interfaces/SpreadsheetType.md#toarray)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:440](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L440)

---

### <a id="torecord" name="torecord"></a> toRecord

▸ **toRecord**(): `Record`<`string`, [`StringResult`](../interfaces/StringResult.md)\>[]

#### Returns

`Record`<`string`, [`StringResult`](../interfaces/StringResult.md)\>[]

#### Implementation of

[SpreadsheetType](../interfaces/SpreadsheetType.md).[toRecord](../interfaces/SpreadsheetType.md#torecord)

#### Defined in

[packages/brickdoc-formula/src/controls/spreadsheet.ts:459](https://github.com/mashcard/mashcard/blob/main/packages/brickdoc-formula/src/controls/spreadsheet.ts#L459)
